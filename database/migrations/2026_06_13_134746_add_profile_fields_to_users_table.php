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
        Schema::table('users', function (Blueprint $table) {
            $table->string('divisi')->nullable()->after('name');
            $table->string('jabatan')->nullable()->after('divisi');
            $table->enum('status', ['Active', 'Inactive'])->default('Active')->after('jabatan');
            $table->timestamp('last_active_at')->nullable()->after('status');
            $table->enum('role_type', ['superadmin', 'admin'])->default('admin')->after('last_active_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['divisi', 'jabatan', 'status', 'last_active_at', 'role_type']);
        });
    }
};
