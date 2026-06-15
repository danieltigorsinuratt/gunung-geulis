<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nomor_surat',
        'perihal',
        'jenis',
        'kategori',
        'instansi',
        'pengirim',
        'kepada',
        'ditugaskan_ke',
        'catatan',
        'tanggal_dokumen',
        'batas_waktu',
        'masa_berlaku',
        'file_path',
        'file_original_name',
        'file_mime',
        'file_size',
        'status',
        'prioritas',
        'created_by',
        'status_before_archive',
        'archived_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'masa_berlaku'   => 'boolean',
            'tanggal_dokumen' => 'date',
            'batas_waktu'    => 'datetime',
            'file_size'      => 'integer',
            'archived_at'    => 'datetime',
        ];
    }

    /**
     * Get the user who created this document.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the replies for this document.
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Reply::class)->orderBy('created_at', 'asc');
    }

    /**
     * Get the approvals for this document.
     */
    public function approvals(): HasMany
    {
        return $this->hasMany(Approval::class);
    }

    /**
     * Get the dispositions for this document.
     */
    public function dispositions(): HasMany
    {
        return $this->hasMany(Disposition::class);
    }

    /**
     * Check if document needs approval.
     */
    public function needsApproval(): bool
    {
        return $this->status === 'pending_approval';
    }

    /**
     * Check if document is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }
}
