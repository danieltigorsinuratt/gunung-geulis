<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // First update existing data: 'manajer' -> 'manager', 'staff' -> 'admin'
        DB::statement("UPDATE users SET role_type = 'manager' WHERE role_type = 'manajer'");
        DB::statement("UPDATE users SET role_type = 'admin' WHERE role_type = 'staff'");
        DB::statement("ALTER TABLE users MODIFY COLUMN role_type ENUM('superadmin', 'admin', 'manager') DEFAULT 'admin'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN role_type ENUM('superadmin', 'admin', 'manajer', 'staff') DEFAULT 'staff'");
        DB::statement("UPDATE users SET role_type = 'manajer' WHERE role_type = 'manager'");
        DB::statement("UPDATE users SET role_type = 'staff' WHERE role_type = 'admin' AND divisi IS NOT NULL");
    }
};
