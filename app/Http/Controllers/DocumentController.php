<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    /**
     * Display a listing of documents.
     * Semua user: lihat semua dokumen
     * Superadmin: bisa filter semua divisi
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $isSuperAdmin = $user->role_type === 'superadmin';

        $query = Document::with('creator')->whereNull('archived_at');

        // Filter by divisi (lokasi) - hanya superadmin
        if ($isSuperAdmin && $request->filled('divisi')) {
            $query->where('ditugaskan_ke', $request->divisi);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by jenis
        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        $documents = $query->orderBy('created_at', 'desc')->get()->map(function ($doc) {
            return [
                'id'                => $doc->id,
                'nomor'             => $doc->nomor_surat,
                'perihal'           => $doc->perihal,
                'jenis'             => strtoupper($doc->jenis ?? '-'),
                'status'            => $doc->status,
                'tanggal'           => $doc->tanggal_dokumen?->format('d/m/Y') ?? '-',
                'lokasi'            => $doc->ditugaskan_ke,
                'ditugaskan_ke'     => $doc->ditugaskan_ke,
                'pengirim'          => $doc->pengirim ?? '-',
                'instansi'          => $doc->instansi ?? '-',
                'catatan'           => $doc->catatan ?? '-',
                'batas_waktu'       => $doc->batas_waktu?->format('d/m/Y H:i'),
                'masa_berlaku'      => $doc->masa_berlaku,
                'file_path'         => $doc->file_path ? '/files/documents/' . $doc->file_path : null,
                'file_original_name' => $doc->file_original_name,
                'prioritas'         => $doc->prioritas,
                'created_by'        => $doc->creator->name ?? '-',
                'created_at'        => $doc->created_at->format('d/m/Y H:i'),
            ];
        });

        return Inertia::render('Documents/Index', [
            'documents'     => $documents,
            'isSuperAdmin'  => $isSuperAdmin,
            'userDivisi'    => $user->divisi,
        ]);
    }

    /**
     * Display the specified document.
     */
    public function show(Request $request, string $id): Response
    {
        $doc = Document::with('creator')->findOrFail($id);
        $user = $request->user();
        $isSuperAdmin = $user->role_type === 'superadmin';
        $canReply = $isSuperAdmin || $user->divisi === $doc->ditugaskan_ke;

        return Inertia::render('Documents/Show', [
            'document' => [
                'id'                => $doc->id,
                'nomor'             => $doc->nomor_surat,
                'judul'             => $doc->perihal,
                'pengirim'          => $doc->pengirim ?? '-',
                'tanggalDiterima'   => $doc->created_at->format('d/m/Y'),
                'kategori'          => $doc->jenis ?? '-',
                'prioritas'         => $doc->prioritas,
                'deskripsi'         => $doc->catatan ?? '-',
                'lokasiArsip'       => $doc->ditugaskan_ke,
                'status'            => $doc->status,
                'file' => [
                    'nama'    => $doc->file_original_name,
                    'ukuran'  => $doc->file_size ? round($doc->file_size / 1024, 1) . ' KB' : '-',
                    'url'     => $doc->file_path ? '/files/documents/' . $doc->file_path : null,
                ],
                'createdBy' => $doc->creator->name ?? '-',
                'isArchived' => $doc->archived_at !== null,
                'riwayat' => [
                    [
                        'id'          => 1,
                        'judul'       => 'Dokumen Dibuat',
                        'deskripsi'   => 'Dokumen berhasil diunggah ke sistem',
                        'waktu'       => $doc->created_at->format('d/m/Y H:i'),
                        'icon'        => 'upload',
                    ],
                ],
            ],
            'canReply'  => $canReply,
            'userDivisi' => $user->divisi,
        ]);
    }

    /**
     * Show the form for creating a new document.
     */
    public function create(): Response
    {
        $users = \App\Models\User::select('id', 'name', 'divisi')
            ->where('status', 'Active')
            ->get()
            ->groupBy('divisi')
            ->map(function ($users) {
                return $users->map(fn($u) => ['id' => $u->id, 'name' => $u->name])->values();
            });

        return Inertia::render('Documents/Create', [
            'usersByDivisi' => $users,
        ]);
    }

    /**
     * Store a newly created document in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nomor_surat'   => ['required', 'string', 'max:255', 'unique:documents,nomor_surat'],
            'perihal'       => ['required', 'string', 'max:255'],
            'jenis'         => ['nullable', 'string', Rule::in(['surat-jalan', 'invois', 'laporan', 'izin', 'memo', 'kontrak', 'lainnya'])],
            'jenis_lainnya' => ['required_if:jenis,lainnya', 'nullable', 'string', 'max:255'],
            'instansi'      => ['nullable', 'string', 'max:255'],
            'penerima'      => ['required', 'string', 'max:255'],
            'ditugaskan_ke' => ['required', 'string', Rule::in(['Tim Logistik', 'Tim Legal', 'Sekretaris', 'Superadmin'])],
            'catatan'       => ['nullable', 'string'],
            'tanggal_dokumen' => ['nullable', 'date'],
            'batas_waktu'   => ['nullable', 'date'],
            'masa_berlaku'  => ['boolean'],
            'file'          => ['required', 'file', 'mimes:pdf,xlsx,xls', 'max:15360'],
        ]);

        // Simpan file upload
        $file = $request->file('file');
        $filename = time() . '_' . $request->user()->id . '.' . $file->getClientOriginalExtension();
        $file->storeAs('documents', $filename, 'public');

        // Simpan data dokumen
        Document::create([
            'nomor_surat'       => $validated['nomor_surat'],
            'perihal'           => $validated['perihal'],
            'jenis'             => $validated['jenis'] === 'lainnya' ? ($validated['jenis_lainnya'] ?? null) : ($validated['jenis'] ?? null),
            'instansi'          => $validated['instansi'] ?? null,
            'pengirim'          => $validated['penerima'],
            'ditugaskan_ke'     => $validated['ditugaskan_ke'],
            'catatan'           => $validated['catatan'] ?? null,
            'tanggal_dokumen'   => $validated['tanggal_dokumen'] ?? null,
            'batas_waktu'       => $validated['batas_waktu'] ?? null,
            'masa_berlaku'      => $validated['masa_berlaku'] ?? false,
            'file_path'         => $filename,
            'file_original_name' => $file->getClientOriginalName(),
            'file_mime'         => $file->getMimeType(),
            'file_size'         => $file->getSize(),
            'status'            => 'Pending',
            'prioritas'         => 'NORMAL',
            'created_by'        => $request->user()->id,
        ]);

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil disimpan dan dikirim ke ' . $validated['ditugaskan_ke'] . '.');
    }

    /**
     * Archive a document.
     * Hanya divisi terkait + superadmin yang bisa arsip.
     */
    public function archive(Request $request, string $id): RedirectResponse
    {
        $doc = Document::findOrFail($id);
        $user = $request->user();
        $isSuperAdmin = $user->role_type === 'superadmin';

        // Cek hak akses
        if (!$isSuperAdmin && $user->divisi !== $doc->ditugaskan_ke) {
            abort(403, 'Anda tidak memiliki akses untuk mengarsipkan dokumen ini.');
        }

        $doc->update(['archived_at' => now()]);

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil diarsipkan.');
    }

    /**
     * Restore a document from archive.
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        $doc = Document::findOrFail($id);
        $user = $request->user();
        $isSuperAdmin = $user->role_type === 'superadmin';

        if (!$isSuperAdmin && $user->divisi !== $doc->ditugaskan_ke) {
            abort(403, 'Anda tidak memiliki akses untuk mengembalikan dokumen ini.');
        }

        $doc->update(['archived_at' => null]);

        return redirect()->route('documents.archived')->with('success', 'Dokumen berhasil dikembalikan ke daftar dokumen.');
    }

    /**
     * Delete a document permanently.
     * Hanya superadmin yang bisa hapus.
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        $user = $request->user();

        if ($user->role_type !== 'superadmin') {
            abort(403, 'Hanya superadmin yang dapat menghapus dokumen.');
        }

        $doc = Document::findOrFail($id);

        // Hapus file dari storage
        if ($doc->file_path) {
            Storage::disk('public')->delete('documents/' . $doc->file_path);
        }

        $doc->delete();

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil dihapus secara permanen.');
    }

    /**
     * Display archived documents.
     */
    public function archived(Request $request): Response
    {
        $user = $request->user();
        $isSuperAdmin = $user->role_type === 'superadmin';

        $query = Document::with('creator')->whereNotNull('archived_at');

        if (!$isSuperAdmin) {
            $query->where('ditugaskan_ke', $user->divisi);
        }

        $documents = $query->orderBy('archived_at', 'desc')->get()->map(function ($doc) {
            return [
                'id'                => $doc->id,
                'nomor'             => $doc->nomor_surat,
                'perihal'           => $doc->perihal,
                'jenis'             => strtoupper($doc->jenis ?? '-'),
                'status'            => $doc->status,
                'tanggal'           => $doc->tanggal_dokumen?->format('d/m/Y') ?? '-',
                'lokasi'            => $doc->ditugaskan_ke,
                'pengirim'          => $doc->pengirim ?? '-',
                'archived_at'       => $doc->archived_at->format('d/m/Y H:i'),
                'created_at'        => $doc->created_at->format('d/m/Y H:i'),
            ];
        });

        return Inertia::render('Documents/Archived', [
            'documents'    => $documents,
            'isSuperAdmin' => $isSuperAdmin,
        ]);
    }

    /**
     * Export documents as CSV.
     */
    public function export(Request $request)
    {
        $user = $request->user();
        $isSuperAdmin = $user->role_type === 'superadmin';

        $query = Document::with('creator');

        if (!$isSuperAdmin) {
            $query->where('ditugaskan_ke', $user->divisi);
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $documents = $query->orderBy('created_at', 'desc')->get();

        $filename = 'laporan_dokumen_' . now()->format('Y-m-d_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($documents) {
            $file = fopen('php://output', 'w');

            // Header CSV
            fputcsv($file, [
                'No',
                'Nomor Surat',
                'Perihal',
                'Jenis',
                'Pengirim',
                'Ditugaskan Ke',
                'Status',
                'Prioritas',
                'Tanggal Dokumen',
                'Batas Waktu',
                'Dibuat Oleh',
                'Tanggal Input',
            ]);

            // Data
            $no = 1;
            foreach ($documents as $doc) {
                fputcsv($file, [
                    $no++,
                    $doc->nomor_surat,
                    $doc->perihal,
                    $doc->jenis ?? '-',
                    $doc->pengirim ?? '-',
                    $doc->ditugaskan_ke,
                    $doc->status,
                    $doc->prioritas,
                    $doc->tanggal_dokumen?->format('d/m/Y') ?? '-',
                    $doc->batas_waktu?->format('d/m/Y H:i') ?? '-',
                    $doc->creator->name ?? '-',
                    $doc->created_at->format('d/m/Y H:i'),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
