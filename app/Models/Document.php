<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'instansi',
        'pengirim',
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
}
