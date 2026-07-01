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
        // Columns divisi, jabatan, status already added in 2026_06_13_134746_add_profile_fields_to_users_table
        // This migration is kept for historical purposes only
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Nothing to drop
    }
};
