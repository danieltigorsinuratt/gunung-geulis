<?php

namespace App\Http\Controllers;

use App\Models\Disposition;
use App\Models\Document;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DispositionController extends Controller
{
    /**
     * Store new disposition.
     */
    public function store(Request $request, Document $document)
    {
        $user = Auth::user();

        // Only manajer/superadmin can create disposition
        if (!$user->canApprove()) {
            abort(403);
        }

        $request->validate([
            'to_user_id' => 'required|exists:users,id',
            'catatan' => 'nullable|string|max:1000',
            'deadline' => 'nullable|date|after:now',
        ]);

        $disposition = Disposition::create([
            'document_id' => $document->id,
            'from_user_id' => $user->id,
            'to_user_id' => $request->to_user_id,
            'catatan' => $request->catatan,
            'deadline' => $request->deadline,
            'status' => 'pending',
        ]);

        // Notify recipient
        $toUser = User::find($request->to_user_id);
        Notification::create([
            'user_id' => $request->to_user_id,
            'type' => 'disposition',
            'title' => 'Surat Didisposisikan',
            'message' => "Anda mendapat disposisi surat {$document->nomor_surat} - {$document->perihal} dari {$user->name}.",
            'link' => "/documents/{$document->id}",
        ]);

        return back()->with('success', 'Disposisi berhasil dibuat.');
    }

    /**
     * Update disposition status.
     */
    public function update(Request $request, Disposition $disposition)
    {
        $user = Auth::user();

        // Only assigned user can update
        if ($disposition->to_user_id !== $user->id) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:in_progress,completed',
        ]);

        $disposition->update(['status' => $request->status]);

        return response()->json(['success' => true]);
    }
}
