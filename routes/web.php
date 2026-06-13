<?php

use App\Http\Controllers\DocumentController;
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

Route::get('/documents', [DocumentController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('documents.index');

Route::get('/documents/{id}', [DocumentController::class, 'show'])
    ->middleware(['auth', 'verified'])->name('documents.show');

Route::get('/create', [DocumentController::class, 'create'])
    ->middleware(['auth', 'verified'])->name('documents.create');

Route::post('/create', [DocumentController::class, 'store'])
    ->middleware(['auth', 'verified'])->name('documents.store');

Route::post('/documents/{id}/archive', [DocumentController::class, 'archive'])
    ->middleware(['auth', 'verified'])->name('documents.archive');

Route::post('/documents/{id}/restore', [DocumentController::class, 'restore'])
    ->middleware(['auth', 'verified'])->name('documents.restore');

Route::delete('/documents/{id}', [DocumentController::class, 'destroy'])
    ->middleware(['auth', 'verified'])->name('documents.destroy');

Route::get('/documents-arsip', [DocumentController::class, 'archived'])
    ->middleware(['auth', 'verified'])->name('documents.archived');

Route::get('/documents-export', [DocumentController::class, 'export'])
    ->middleware(['auth', 'verified'])->name('documents.export');

// Serve uploaded files (fallback untuk Windows symlink)
Route::get('/files/{path}', function ($path) {
    $fullPath = storage_path('app/public/' . $path);
    if (!file_exists($fullPath)) {
        abort(404);
    }
    $mime = mime_content_type($fullPath);
    $size = filesize($fullPath);
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . $size);
    header('Content-Disposition: inline; filename="' . basename($path) . '"');
    readfile($fullPath);
    exit;
})->where('path', '.*');

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
            'avatar'      => $user->avatar,
            'phone'       => $user->phone ?? '-',
            'role_type'   => $user->role_type ?? 'admin',
        ];
    });

    return Inertia::render('Settings', [
        'users' => $users,
    ]);
})->middleware(['auth', 'verified'])->name('settings');

// User Management (superadmin only)
Route::middleware(['auth', 'superadmin'])->group(function () {
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

Route::middleware('auth')->group(function () {
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.photo.update');
    Route::delete('/profile/photo', [ProfileController::class, 'deletePhoto'])->name('profile.photo.delete');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
