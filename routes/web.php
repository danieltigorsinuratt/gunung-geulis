<?php

use App\Http\Controllers\ProfileController;
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
    return Inertia::render('Settings');
})->middleware(['auth', 'verified'])->name('settings');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
