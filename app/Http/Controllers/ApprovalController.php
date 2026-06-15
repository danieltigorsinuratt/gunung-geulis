<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Document;
use App\Models\Notification;
use App\Services\NumberingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ApprovalController extends Controller
{
    /**
     * Submit document for approval.
     */
    public function submit(Request $request, Document $document)
    {
        $user = Auth::user();

        // Only creator can submit
        if ($document->created_by !== $user->id && !$user->isSuperAdmin()) {
            abort(403);
        }

        // Only draft or rejected documents can be submitted
        if (!in_array($document->status, ['Draft', 'rejected'])) {
            return back()->with('error', 'Dokumen tidak dapat diajukan untuk approval.');
        }

        DB::transaction(function () use ($document, $user) {
            // Update status
            $document->update(['status' => 'pending_approval']);

            // Find manajer to approve
            $manajers = \App\Models\User::where('role_type', 'manajer')->get();

            foreach ($manajers as $manajer) {
                // Create approval record
                Approval::create([
                    'document_id' => $document->id,
                    'approver_id' => $manajer->id,
                    'status' => 'pending',
                ]);

                // Create notification
                Notification::create([
                    'user_id' => $manajer->id,
                    'type' => 'approval_submitted',
                    'title' => 'Surat Menunggu Approval',
                    'message' => "Surat {$document->nomor_surat} - {$document->perihal} menunggu persetujuan Anda.",
                    'link' => "/documents/{$document->id}",
                ]);
            }
        });

        return back()->with('success', 'Dokumen berhasil diajukan untuk approval.');
    }

    /**
     * Approve document.
     */
    public function approve(Request $request, Document $document)
    {
        $user = Auth::user();

        // Only manajer/superadmin can approve
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

            // Generate nomor surat resmi
            $numberingService = new NumberingService();
            $nomorSurat = $numberingService->generateNomorSurat($document->jenis);

            // Update document status
            $document->update([
                'status' => 'approved',
                'nomor_surat' => $nomorSurat,
            ]);

            // Notify creator
            Notification::create([
                'user_id' => $document->created_by,
                'type' => 'approved',
                'title' => 'Surat Disetujui',
                'message' => "Surat {$document->nomor_surat} - {$document->perihal} telah disetujui. Nomor surat: {$nomorSurat}",
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

        // Only manajer/superadmin can reject
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

            // Update document status
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
