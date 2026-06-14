<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'nomor_surat',
        'isi_balasan',
        'file_path',
        'file_original_name',
        'file_mime',
        'file_size',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
        ];
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Auto-generate nomor surat balasan
     */
    public static function generateNomorSurat(): string
    {
        $today = now()->format('Y-m-d');
        $count = self::whereDate('created_at', $today)->count() + 1;
        return 'BAL-' . now()->format('Ymd') . '-' . str_pad($count, 3, '0', STR_PAD_LEFT);
    }
}
