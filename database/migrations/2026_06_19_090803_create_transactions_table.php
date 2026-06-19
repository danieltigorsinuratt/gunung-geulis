<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->enum('jenis', ['pemasukan', 'pengeluaran']);
            $table->string('referensi')->unique(); // Nomor invoice/kwitansi
            $table->string('deskripsi');
            $table->string('kategori'); // Contoh: 'Penjualan Hewan Qurban', 'Pembelian Pakan'
            $table->decimal('nominal', 15, 2);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('metode_bayar')->nullable(); // Transfer, Tunai, Cek
            $table->string('pihak')->nullable(); // Nama pelanggan/vendor
            $table->string('divisi')->nullable(); // Divisi terkait
            $table->date('tanggal');
            $table->string('file_bukti')->nullable(); // Path file bukti bayar
            $table->string('file_bukti_original')->nullable();
            $table->string('surat_referensi')->nullable(); // Nomor surat terkait
            $table->text('catatan')->nullable();
            $table->text('rejection_notes')->nullable(); // Catatan reject dari manager
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
