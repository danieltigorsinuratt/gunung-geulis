<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_surat')->unique();
            $table->string('perihal');
            $table->string('jenis')->nullable();
            $table->string('instansi')->nullable();
            $table->string('pengirim')->nullable();
            $table->string('ditugaskan_ke');
            $table->text('catatan')->nullable();
            $table->date('tanggal_dokumen')->nullable();
            $table->datetime('batas_waktu')->nullable();
            $table->boolean('masa_berlaku')->default(false);
            $table->string('file_path')->nullable();
            $table->string('file_original_name')->nullable();
            $table->string('file_mime')->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->string('status')->default('Pending');
            $table->string('prioritas')->default('NORMAL');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
