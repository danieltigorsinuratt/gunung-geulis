<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Store a new user.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', Password::min(8)],
            'phone'    => ['nullable', 'string', 'max:20'],
            'divisi'   => ['required', 'string', Rule::in(['Tim Logistik', 'Tim Legal', 'Sekretaris', 'Superadmin'])],
            'jabatan'  => ['required', 'string', 'max:255'],
            'status'   => ['sometimes', Rule::in(['Active', 'Inactive'])],
        ]);

        User::create([
            'name'      => $validated['name'],
            'email'     => $validated['email'],
            'password'  => Hash::make($validated['password']),
            'phone'     => $validated['phone'] ?? null,
            'divisi'    => $validated['divisi'],
            'jabatan'   => $validated['jabatan'],
            'status'    => $validated['status'] ?? 'Active',
            'role_type' => 'admin',
        ]);

        return redirect()->route('settings')->with('success', 'User berhasil ditambahkan.');
    }

    /**
     * Update an existing user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', Password::min(8)],
            'phone'    => ['nullable', 'string', 'max:20'],
            'divisi'   => ['required', 'string', Rule::in(['Tim Logistik', 'Tim Legal', 'Sekretaris', 'Superadmin'])],
            'jabatan'  => ['required', 'string', 'max:255'],
            'status'   => ['required', Rule::in(['Active', 'Inactive'])],
        ]);

        $updateData = [
            'name'    => $validated['name'],
            'email'   => $validated['email'],
            'phone'   => $validated['phone'] ?? null,
            'divisi'  => $validated['divisi'],
            'jabatan' => $validated['jabatan'],
            'status'  => $validated['status'],
        ];

        // Only update password if a new one was provided
        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return redirect()->route('settings')->with('success', 'User berhasil diperbarui.');
    }

    /**
     * Delete a user.
     */
    public function destroy(User $user): RedirectResponse
    {
        // Prevent deleting the currently authenticated user
        if ($user->id === auth()->id()) {
            return redirect()->route('settings')->with('error', 'Tidak dapat menghapus akun Anda sendiri.');
        }

        $user->delete();

        return redirect()->route('settings')->with('success', 'User berhasil dihapus.');
    }
}
