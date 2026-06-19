<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'jenis',
        'referensi',
        'deskripsi',
        'kategori',
        'nominal',
        'status',
        'metode_bayar',
        'pihak',
        'divisi',
        'tanggal',
        'file_bukti',
        'file_bukti_original',
        'surat_referensi',
        'catatan',
        'rejection_notes',
        'created_by',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'nominal' => 'decimal:2',
        'tanggal' => 'date',
        'approved_at' => 'datetime',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Scopes
    public function scopePemasukan($query)
    {
        return $query->where('jenis', 'pemasukan');
    }

    public function scopePengeluaran($query)
    {
        return $query->where('jenis', 'pengeluaran');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth('tanggal', now()->month)
                      ->whereYear('tanggal', now()->year);
    }

    // Accessors
    public function getNominalFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->nominal, 0, ',', '.');
    }
}
