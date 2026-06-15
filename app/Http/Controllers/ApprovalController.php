<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Document;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ApprovalController extends Controller
{
    /**
     * Approve document.
     */
    public function approve(Request $request, Document $document)
    {
        $user = Auth::user();

        // Only manager/superadmin can approve
        if (!$user->canApprove()) {
            abort(403);
        }

        $request->validate([
            'notes' => 'nullable|string|max:500',
        ]);

        DB::transaction(function () use ($document, $user, $request) {
            // Update approval record
            $approval = Approval::where('document_id', $document->id)
                ->where('approver_id', $user->id)
                ->where('status', 'pending')
                ->first();

            if ($approval) {
                $approval->update([
                    'status' => 'approved',
                    'notes' => $request->notes,
                    'decided_at' => now(),
                ]);
            }

            // Update document status to approved
            $document->update(['status' => 'approved']);

            // Notify creator
            Notification::create([
                'user_id' => $document->created_by,
                'type' => 'approved',
                'title' => 'Surat Disetujui',
                'message' => "Surat {$document->nomor_surat} - {$document->perihal} telah disetujui.",
                'link' => "/documents/{$document->id}",
            ]);
        });

        return back()->with('success', 'Dokumen berhasil disetujui.');
    }

    /**
     * Reject document.
     */
    public function reject(Request $request, Document $document)
    {
        $user = Auth::user();

        // Only manager/superadmin can reject
        if (!$user->canApprove()) {
            abort(403);
        }

        $request->validate([
            'notes' => 'required|string|max:500',
        ]);

        DB::transaction(function () use ($document, $user, $request) {
            // Update approval record
            $approval = Approval::where('document_id', $document->id)
                ->where('approver_id', $user->id)
                ->where('status', 'pending')
                ->first();

            if ($approval) {
                $approval->update([
                    'status' => 'rejected',
                    'notes' => $request->notes,
                    'decided_at' => now(),
                ]);
            }

            // Update document status to rejected
            $document->update(['status' => 'rejected']);

            // Notify creator
            Notification::create([
                'user_id' => $document->created_by,
                'type' => 'rejected',
                'title' => 'Surat Ditolak',
                'message' => "Surat {$document->nomor_surat} - {$document->perihal} ditolak. Alasan: {$request->notes}",
                'link' => "/documents/{$document->id}",
            ]);
        });

        return back()->with('success', 'Dokumen telah ditolak.');
    }
}
