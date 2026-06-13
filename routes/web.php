<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/documents', function () {
    return Inertia::render('Documents/Index');
})->middleware(['auth', 'verified'])->name('documents.index');

Route::get('/documents/{id}', function () {
    return Inertia::render('Documents/Show');
})->middleware(['auth', 'verified'])->name('documents.show');

Route::get('/create', function () {
    return Inertia::render('Documents/Create');
})->middleware(['auth', 'verified'])->name('documents.create');

Route::get('/settings', function () {
    $users = User::orderBy('created_at', 'desc')->get()->map(function ($user) {
        return [
            'id'          => $user->id,
            'nama'        => $user->name,
            'email'       => $user->email,
            'divisi'      => $user->divisi ?? '-',
            'role'        => $user->jabatan ?? '-',
            'status'      => $user->status ?? 'Active',
            'isOnline'    => $user->isOnline(),
            'lastLoginAt' => $user->last_login_at
                                ? $user->last_login_at->timestamp
                                : null,
            'role_type'   => $user->role_type ?? 'admin',
        ];
    });

    return Inertia::render('Settings', [
        'users' => $users,
    ]);
})->middleware(['auth', 'verified'])->name('settings');

// User Management (superadmin only in the future, for now auth only)
Route::middleware(['auth'])->group(function () {
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
