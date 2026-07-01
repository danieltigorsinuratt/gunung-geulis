<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // All columns (metode_bayar, file_bukti, file_bukti_original, surat_referensi,
        // rejection_notes, approved_by, approved_at) are already included in
        // 2026_06_19_090803_create_transactions_table.php
        // This migration is kept for historical purposes only.
    }

    public function down(): void
    {
        // Nothing to drop
    }
};
