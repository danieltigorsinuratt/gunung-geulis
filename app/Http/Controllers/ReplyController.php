<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Reply;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ReplyController extends Controller
{
    /**
     * Show the reply form.
     */
    public function create(Request $request, string $documentId): Response
    {
        $document = Document::findOrFail($documentId);

        $nomorBalasan = Reply::generateNomorSurat();

        return Inertia::render('Documents/Reply', [
            'document' => [
                'id'             => $document->id,
                'nomor_surat'    => $document->nomor_surat,
                'perihal'        => $document->perihal,
                'pengirim'       => $document->pengirim ?? '-',
                'ditugaskan_ke'  => $document->ditugaskan_ke,
            ],
            'nomorBalasan' => $nomorBalasan,
        ]);
    }

    /**
     * Store the reply.
     */
    public function store(Request $request, string $documentId): RedirectResponse
    {
        $document = Document::findOrFail($documentId);

        $validated = $request->validate([
            'nomor_surat' => ['required', 'string', 'max:255'],
            'isi_balasan' => ['required', 'string'],
            'file'        => ['nullable', 'file', 'mimes:pdf,xlsx,xls,doc,docx', 'max:15360'],
        ]);

        $data = [
            'document_id'   => $document->id,
            'nomor_surat'   => $validated['nomor_surat'],
            'isi_balasan'   => $validated['isi_balasan'],
            'created_by'    => $request->user()->id,
        ];

        // Simpan file jika ada
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_reply_' . $request->user()->id . '.' . $file->getClientOriginalExtension();
            $file->storeAs('replies', $filename, 'public');

            $data['file_path'] = $filename;
            $data['file_original_name'] = $file->getClientOriginalName();
            $data['file_mime'] = $file->getMimeType();
            $data['file_size'] = $file->getSize();
        }

        Reply::create($data);

        return redirect()->route('documents.show', $document->id)
            ->with('success', 'Balasan berhasil dikirim.');
    }

    /**
     * Delete a reply.
     * Hanya superadmin yang bisa hapus.
     */
    public function destroy(Request $request, string $documentId, string $replyId)
    {
        $user = $request->user();

        if ($user->role_type !== 'superadmin') {
            abort(403, 'Hanya superadmin yang dapat menghapus balasan.');
        }

        $reply = Reply::findOrFail($replyId);

        // Hapus file jika ada
        if ($reply->file_path) {
            Storage::disk('public')->delete('replies/' . $reply->file_path);
        }

        $reply->delete();

        return back()->with('success', 'Balasan berhasil dihapus.');
    }
}
