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
                'file_url'          => $doc->file_path ? '/files/documents/' . $doc->file_path : null,
                'file_name'         => $doc->file_original_name,
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
        $doc = Document::with(['creator', 'replies.creator', 'approvals.approver', 'dispositions.fromUser', 'dispositions.toUser'])->findOrFail($id);
        $user = $request->user();
        $isSuperAdmin = $user->role_type === 'superadmin';
        $isManajer = $user->role_type === 'manajer';
        $canReply = $isSuperAdmin || $isManajer || $user->divisi === $doc->ditugaskan_ke;
        $canApprove = $isSuperAdmin || $isManajer;

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
            'approvals' => $doc->approvals->map(fn($approval) => [
                'id' => $approval->id,
                'approver' => $approval->approver->name ?? '-',
                'status' => $approval->status,
                'notes' => $approval->notes,
                'decidedAt' => $approval->decided_at?->format('d/m/Y H:i'),
            ]),
            'dispositions' => $doc->dispositions->map(fn($disp) => [
                'id' => $disp->id,
                'from' => $disp->fromUser->name ?? '-',
                'to' => $disp->toUser->name ?? '-',
                'catatan' => $disp->catatan,
                'deadline' => $disp->deadline?->format('d/m/Y H:i'),
                'status' => $disp->status,
            ]),
            'replies' => $doc->replies->map(fn($reply) => [
                'id'         => $reply->id,
                'nama'       => $reply->creator->name ?? '-',
                'isi_balasan' => $reply->isi_balasan,
                'nomor_surat' => $reply->nomor_surat,
                'file' => $reply->file_path ? [
                    'nama'   => $reply->file_original_name,
                    'ukuran' => $reply->file_size ? round($reply->file_size / 1024, 1) . ' KB' : '-',
                    'url'    => '/files/replies/' . $reply->file_path,
                ] : null,
                'waktu' => $reply->created_at->format('d/m/Y H:i'),
            ]),
            'canReply'  => $canReply,
            'isSuperAdmin' => $isSuperAdmin,
            'isManajer' => $isManajer,
            'canApprove' => $canApprove,
            'userDivisi' => $user->divisi,
            'users' => \App\Models\User::where('role_type', '!=', 'superadmin')->get()->map(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'divisi' => $u->divisi,
            ]),
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
     * Show the form for editing a document.
     */
    public function edit(Request $request, string $id): Response
    {
        $doc = Document::findOrFail($id);
        $user = $request->user();

        $users = \App\Models\User::select('id', 'name', 'divisi')
            ->where('status', 'Active')
            ->get()
            ->groupBy('divisi')
            ->map(function ($users) {
                return $users->map(fn($u) => ['id' => $u->id, 'name' => $u->name])->values();
            });

        return Inertia::render('Documents/Edit', [
            'document' => [
                'id'             => $doc->id,
                'nomor_surat'    => $doc->nomor_surat,
                'perihal'        => $doc->perihal,
                'jenis'          => $doc->jenis,
                'instansi'       => $doc->instansi,
                'penerima'       => $doc->pengirim,
                'ditugaskan_ke'  => $doc->ditugaskan_ke,
                'catatan'        => $doc->catatan,
                'tanggal_dokumen' => $doc->tanggal_dokumen?->format('Y-m-d'),
                'batas_waktu'    => $doc->batas_waktu?->format('Y-m-d\TH:i'),
                'masa_berlaku'   => $doc->masa_berlaku,
                'file_path'      => $doc->file_path,
                'file_original_name' => $doc->file_original_name,
            ],
            'usersByDivisi' => $users,
        ]);
    }

    /**
     * Update a document.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $doc = Document::findOrFail($id);

        $validated = $request->validate([
            'nomor_surat'   => ['required', 'string', 'max:255', \Illuminate\Validation\Rule::unique('documents', 'nomor_surat')->ignore($id)],
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
            'file'          => ['nullable', 'file', 'mimes:pdf,xlsx,xls', 'max:15360'],
        ]);

        $updateData = [
            'nomor_surat'     => $validated['nomor_surat'],
            'perihal'         => $validated['perihal'],
            'jenis'           => $validated['jenis'] === 'lainnya' ? ($validated['jenis_lainnya'] ?? null) : ($validated['jenis'] ?? null),
            'instansi'        => $validated['instansi'] ?? null,
            'pengirim'        => $validated['penerima'],
            'ditugaskan_ke'   => $validated['ditugaskan_ke'],
            'catatan'         => $validated['catatan'] ?? null,
            'tanggal_dokumen' => $validated['tanggal_dokumen'] ?? null,
            'batas_waktu'     => $validated['batas_waktu'] ?? null,
            'masa_berlaku'    => $validated['masa_berlaku'] ?? false,
        ];

        // Update file jika ada
        if ($request->hasFile('file')) {
            // Hapus file lama
            if ($doc->file_path) {
                Storage::disk('public')->delete('documents/' . $doc->file_path);
            }
            $file = $request->file('file');
            $filename = time() . '_' . $request->user()->id . '.' . $file->getClientOriginalExtension();
            $file->storeAs('documents', $filename, 'public');

            $updateData['file_path'] = $filename;
            $updateData['file_original_name'] = $file->getClientOriginalName();
            $updateData['file_mime'] = $file->getMimeType();
            $updateData['file_size'] = $file->getSize();
        }

        $doc->update($updateData);

        return redirect()->route('documents.show', $id)->with('success', 'Dokumen berhasil diperbarui.');
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

        $doc->update([
            'archived_at' => now(),
            'status' => 'Diarsip',
            'status_before_archive' => $doc->status,
        ]);

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

        $doc->update([
            'archived_at' => null,
            'status' => $doc->status_before_archive ?? 'Pending',
            'status_before_archive' => null,
        ]);

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
     * Update document status.
     */
    public function updateStatus(Request $request, string $id)
    {
        $doc = Document::findOrFail($id);

        $validated = $request->validate([
            'status' => ['required', 'string', \Illuminate\Validation\Rule::in(['Pending', 'Diproses', 'Selesai', 'Diarsip'])],
        ]);

        $doc->update(['status' => $validated['status']]);

        return response()->json([
            'success' => true,
            'status' => $doc->fresh()->status,
        ]);
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

        // Dokumen yang belum diarsipkan (bisa dipilih untuk diarsipkan)
        $availableQuery = Document::whereNull('archived_at');
        if (!$isSuperAdmin) {
            $availableQuery->where('ditugaskan_ke', $user->divisi);
        }
        $availableDocuments = $availableQuery->orderBy('created_at', 'desc')->get()->map(fn($doc) => [
            'id'     => $doc->id,
            'nomor'  => $doc->nomor_surat,
            'perihal' => $doc->perihal,
            'status' => $doc->status,
        ]);

        return Inertia::render('Documents/Archived', [
            'documents'           => $documents,
            'availableDocuments'  => $availableDocuments,
            'isSuperAdmin'        => $isSuperAdmin,
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

        // Superadmin: export semua, Admin: export divisi sendiri
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

        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Style header
        $headerStyle = [
            'font' => ['bold' => true, 'size' => 11],
            'alignment' => ['horizontal' => 'center', 'vertical' => 'center'],
            'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '173901']],
            'font' => ['bold' => true, 'size' => 11, 'color' => ['rgb' => 'FFFFFF']],
            'borders' => [
                'allBorders' => ['borderStyle' => 'thin', 'color' => ['rgb' => '000000']],
            ],
        ];

        // Header
        $cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        $headers = ['No', 'Tanggal', 'Nama Dokumen', 'Nomor Dokumen', 'Jenis Laporan', 'Divisi', 'Status', 'File Dokumen'];
        foreach ($headers as $col => $header) {
            $sheet->setCellValue($cols[$col] . '1', $header);
            $sheet->getStyle($cols[$col] . '1')->applyFromArray($headerStyle);
        }

        // Data
        $no = 1;
        foreach ($documents as $doc) {
            $row = $no + 1;
            $sheet->setCellValue('A' . $row, $no++);
            $sheet->setCellValue('B' . $row, $doc->created_at->format('d/m/Y'));
            $sheet->setCellValue('C' . $row, $doc->perihal);
            $sheet->setCellValue('D' . $row, $doc->nomor_surat);
            $sheet->setCellValue('E' . $row, $doc->jenis ?? '-');
            $sheet->setCellValue('F' . $row, $doc->ditugaskan_ke);
            $sheet->setCellValue('G' . $row, $doc->status);
            if ($doc->file_path) {
                $fileUrl = url('/files/documents/' . $doc->file_path);
                $sheet->setCellValue('H' . $row, $doc->file_original_name ?? 'Lihat File');
                $sheet->getHyperlink('H' . $row)->setUrl($fileUrl);
                $sheet->getStyle('H' . $row)->getFont()->setUnderline('single');
                $sheet->getStyle('H' . $row)->getFont()->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('1D4ED8'));
            } else {
                $sheet->setCellValue('H' . $row, '-');
            }
        }

        // Auto-width
        foreach (range('A', 'H') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Border untuk semua cell
        $lastRow = $sheet->getHighestRow();
        $sheet->getStyle("A1:H{$lastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => ['borderStyle' => 'thin', 'color' => ['rgb' => 'CCCCCC']],
            ],
        ]);

        $filename = 'laporan_dokumen_' . now()->format('Y-m-d_His') . '.xlsx';

        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
        $tempFile = tempnam(sys_get_temp_dir(), 'laporan_');
        $writer->save($tempFile);

        return response()->download($tempFile, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ])->deleteFileAfterSend(true);
    }
}
