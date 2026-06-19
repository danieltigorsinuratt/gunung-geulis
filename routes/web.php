<?php

use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DispositionController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TemplateController;
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

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/documents', [DocumentController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('documents.index');

Route::get('/documents/{id}', [DocumentController::class, 'show'])
    ->middleware(['auth', 'verified'])->name('documents.show');

Route::get('/create', [DocumentController::class, 'create'])
    ->middleware(['auth', 'verified'])->name('documents.create');

Route::post('/create', [DocumentController::class, 'store'])
    ->middleware(['auth', 'verified'])->name('documents.store');

Route::get('/documents/{id}/edit', [DocumentController::class, 'edit'])
    ->middleware(['auth', 'verified'])->name('documents.edit');

Route::put('/documents/{id}', [DocumentController::class, 'update'])
    ->middleware(['auth', 'verified'])->name('documents.update');

Route::post('/documents/{id}/archive', [DocumentController::class, 'archive'])
    ->middleware(['auth', 'verified'])->name('documents.archive');

Route::post('/documents/{id}/restore', [DocumentController::class, 'restore'])
    ->middleware(['auth', 'verified'])->name('documents.restore');

Route::delete('/documents/{id}', [DocumentController::class, 'destroy'])
    ->middleware(['auth', 'verified'])->name('documents.destroy');

Route::patch('/documents/{id}/status', [DocumentController::class, 'updateStatus'])
    ->middleware(['auth', 'verified'])->name('documents.updateStatus');

// Replies
Route::get('/documents/{documentId}/reply', [ReplyController::class, 'create'])
    ->middleware(['auth', 'verified'])->name('replies.create');

Route::post('/documents/{documentId}/reply', [ReplyController::class, 'store'])
    ->middleware(['auth', 'verified'])->name('replies.store');

Route::delete('/documents/{documentId}/replies/{replyId}', [ReplyController::class, 'destroy'])
    ->middleware(['auth', 'verified'])->name('replies.destroy');

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
    $filename = request()->query('name', basename($path));
    $download = request()->query('download', 'false');

    header('Content-Type: ' . $mime);
    header('Content-Length: ' . $size);

    // Jika request download=true, paksa download. Jika PDF, tampilkan inline.
    if ($download === 'true' || $mime !== 'application/pdf') {
        header('Content-Disposition: attachment; filename="' . $filename . '"');
    } else {
        header('Content-Disposition: inline; filename="' . $filename . '"');
    }

    readfile($fullPath);
    exit;
})->where('path', '.*');

Route::get('/users', function () {
    $users = User::orderBy('created_at', 'desc')->get()->map(function ($user) {
        return [
            'id'          => $user->id,
            'nama'        => $user->name,
            'email'       => $user->email,
            'divisi'      => $user->divisi ?? '-',
            'role'        => $user->jabatan ?? '-',
            'status'      => $user->status ?? 'Active',
            'isOnline'    => $user->isOnline(),
            'lastLoginAt' => $user->last_login_at ? $user->last_login_at->timestamp : null,
            'avatar'      => $user->avatar,
            'phone'       => $user->phone ?? '-',
            'role_type'   => $user->role_type ?? 'staff',
        ];
    });

    return Inertia::render('Users/Index', [
        'users' => $users,
    ]);
})->middleware(['auth', 'verified'])->name('users.index');

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->middleware(['auth', 'verified'])->name('settings');

Route::get('/numbering', function () {
    return Inertia::render('Numbering/Index');
})->middleware(['auth', 'verified'])->name('numbering');

// Cash Management
Route::get('/cash', [\App\Http\Controllers\CashController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('cash.dashboard');

Route::post('/cash', [\App\Http\Controllers\CashController::class, 'store'])
    ->middleware(['auth', 'verified'])->name('cash.store');

Route::post('/cash/{transaction}/approve', [\App\Http\Controllers\CashController::class, 'approve'])
    ->middleware(['auth', 'verified'])->name('cash.approve');

Route::post('/cash/{transaction}/reject', [\App\Http\Controllers\CashController::class, 'reject'])
    ->middleware(['auth', 'verified'])->name('cash.reject');

Route::get('/cash/ledger', [\App\Http\Controllers\CashController::class, 'ledger'])
    ->middleware(['auth', 'verified'])->name('cash.ledger');

Route::get('/cash/create', function () {
    $jenis = request()->query('jenis', 'pemasukan');
    return Inertia::render('Cash/Create', ['jenis' => $jenis]);
})->middleware(['auth', 'verified'])->name('cash.create');

Route::get('/cash/approval', function () {
    $user = auth()->user();
    $transactions = \App\Models\Transaction::pending()->with('creator')->orderByDesc('tanggal')->get()
        ->map(fn($t) => [
            'id' => $t->id,
            'tanggal' => $t->tanggal->format('d/m/Y'),
            'referensi' => $t->referensi,
            'deskripsi' => $t->deskripsi,
            'jenis' => $t->jenis,
            'nominal' => (float) $t->nominal,
            'status' => $t->status,
            'pihak' => $t->pihak,
            'kategori' => $t->kategori,
        ]);

    $stats = [
        'pending' => \App\Models\Transaction::pending()->count(),
        'approved' => \App\Models\Transaction::approved()->count(),
        'rejected' => \App\Models\Transaction::where('status', 'rejected')->count(),
    ];

    return Inertia::render('Cash/Approval', [
        'transactions' => $transactions,
        'stats' => $stats,
    ]);
})->middleware(['auth', 'verified'])->name('cash.approval');

// Approval Page
Route::get('/approval', function () {
    $user = auth()->user();

    // Manager melihat semua dokumen yang perlu di-approve
    $query = \App\Models\Document::with(['creator', 'approvals.approver'])
        ->whereHas('approvals', function ($q) use ($user) {
            $q->where('approver_id', $user->id);
        });

    $documents = $query->orderBy('created_at', 'desc')->get()->map(function ($doc) use ($user) {
        $approval = $doc->approvals->where('approver_id', $user->id)->first();
        return [
            'id' => $approval?->id,
            'documentId' => $doc->id,
            'status' => $approval?->status ?? 'pending',
            'createdAt' => $doc->created_at->format('d/m/Y H:i'),
            'createdBy' => $doc->creator->name ?? '-',
            'document' => [
                'judul' => $doc->perihal,
                'perihal' => $doc->catatan ?? '-',
                'nomor' => $doc->nomor_surat,
                'jenis' => $doc->jenis ?? '-',
            ],
        ];
    });

    $stats = [
        'pending' => $documents->where('status', 'pending')->count(),
        'approved' => $documents->where('status', 'approved')->count(),
        'rejected' => $documents->where('status', 'rejected')->count(),
    ];

    return Inertia::render('Approval/Index', [
        'approvals' => $documents,
        'stats' => $stats,
    ]);
})->middleware(['auth', 'verified'])->name('approval');

// User Management (superadmin only)
Route::middleware(['auth', 'superadmin'])->group(function () {
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

// Template Management (superadmin only)
Route::middleware(['auth', 'superadmin'])->group(function () {
    Route::get('/templates', [TemplateController::class, 'index'])->name('templates.index');
    Route::post('/templates', [TemplateController::class, 'store'])->name('templates.store');
    Route::put('/templates/{template}', [TemplateController::class, 'update'])->name('templates.update');
    Route::delete('/templates/{template}', [TemplateController::class, 'destroy'])->name('templates.destroy');
});

// Laporan (manager and admin)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
});

// Approval pending count for sidebar badge
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/approval/pending-count', function () {
        $user = auth()->user();
        $count = \App\Models\Document::whereHas('approvals', function ($q) use ($user) {
            $q->where('approver_id', $user->id)->where('status', 'pending');
        })->count();

        return response()->json(['count' => $count]);
    })->name('approval.pendingCount');
});

// Approval Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/documents/{document}/submit-approval', [ApprovalController::class, 'submit'])->name('documents.submitApproval');
    Route::post('/documents/{document}/approve', [ApprovalController::class, 'approve'])->name('documents.approve');
    Route::post('/documents/{document}/reject', [ApprovalController::class, 'reject'])->name('documents.reject');
});

// Disposition Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/documents/{document}/disposition', [DispositionController::class, 'store'])->name('documents.disposition');
    Route::patch('/dispositions/{disposition}', [DispositionController::class, 'update'])->name('dispositions.update');
});

// Notification Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount'])->name('notifications.unreadCount');
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
});

Route::middleware('auth')->group(function () {
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.photo.update');
    Route::delete('/profile/photo', [ProfileController::class, 'deletePhoto'])->name('profile.photo.delete');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
