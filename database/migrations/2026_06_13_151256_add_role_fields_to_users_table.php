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
            $table->string('role_type')->default('staff')->after('email');
            $table->string('divisi')->nullable()->after('role_type');
            $table->string('jabatan')->nullable()->after('divisi');
            $table->string('status')->default('Active')->after('jabatan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role_type', 'divisi', 'jabatan', 'status']);
        });
    }
};
