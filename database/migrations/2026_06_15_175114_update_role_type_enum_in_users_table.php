<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("UPDATE users SET role_type = 'admin' WHERE role_type = 'staff'");
        DB::statement("ALTER TABLE users MODIFY COLUMN role_type ENUM('superadmin', 'admin', 'manajer') DEFAULT 'admin'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN role_type ENUM('superadmin', 'admin') DEFAULT 'admin'");
    }
};
