<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $rules = [
            'name'  => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
        ];

        // Hanya superadmin yang boleh ubah email
        if ($request->has('email') && $user->role_type === 'superadmin') {
            $rules['email'] = ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id];
        }

        $validated = $request->validate($rules);

        $user->name = $validated['name'];
        $user->phone = $validated['phone'] ?? null;

        // Update email hanya jika superadmin
        if (isset($validated['email']) && $user->role_type === 'superadmin') {
            $user->email = $validated['email'];
        }

        $user->save();

        return redirect()->route('settings', ['tab' => 'profil'])->with('success', 'Profil berhasil diperbarui.');
    }

    /**
     * Upload foto profil.
     */
    public function updatePhoto(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        $user = $request->user();

        // Hapus foto lama jika ada
        if ($user->avatar) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
        }

        // Simpan foto baru
        $file = $request->file('avatar');
        $filename = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
        $file->storeAs('avatars', $filename, 'public');

        $user->update(['avatar' => $filename]);

        return redirect()->route('settings', ['tab' => 'profil'])->with('success', 'Foto profil berhasil diunggah.');
    }

    /**
     * Hapus foto profil.
     */
    public function deletePhoto(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->avatar) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
            $user->update(['avatar' => null]);
        }

        return redirect()->route('settings', ['tab' => 'profil'])->with('success', 'Foto profil berhasil dihapus.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Hapus foto profil jika ada
        if ($user->avatar) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
