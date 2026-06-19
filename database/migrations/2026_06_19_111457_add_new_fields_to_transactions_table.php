<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->string('metode_bayar')->nullable()->after('nominal');
            $table->string('file_bukti')->nullable()->after('catatan');
            $table->string('file_bukti_original')->nullable()->after('file_bukti');
            $table->string('surat_referensi')->nullable()->after('file_bukti_original');
            $table->text('rejection_notes')->nullable()->after('catatan');
            $table->foreignId('approved_by')->nullable()->after('created_by');
            $table->timestamp('approved_at')->nullable()->after('approved_by');
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['metode_bayar', 'file_bukti', 'file_bukti_original', 'surat_referensi', 'rejection_notes', 'approved_by', 'approved_at']);
        });
    }
};
