<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ClearAllTablesSeeder extends Seeder
{
    /**
     * Hapus semua isi tabel (truncate) tanpa drop struktur,
     * lalu isi ulang user default.
     */
    public function run(): void
    {
        // Nonaktifkan foreign key checks sementara
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $tables = [
            'notifications',
            'dispositions',
            'approvals',
            'replies',
            'documents',
            'transactions',
            'templates',
            'users',
            'sessions',
            'cache',
            'jobs',
            'job_batches',
            'failed_jobs',
        ];

        foreach ($tables as $table) {
            if (DB::getSchemaBuilder()->hasTable($table)) {
                DB::table($table)->truncate();
                $this->command->info("✅ Truncated: {$table}");
            } else {
                $this->command->warn("⚠️  Skipped (not found): {$table}");
            }
        }

        // Aktifkan kembali foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->newLine();
        $this->command->info('🔄 Re-seeding default users...');

        // Super Admin
        DB::table('users')->insert([
            'name'       => 'Super Admin',
            'email'      => 'superadmin@gmail.com',
            'password'   => Hash::make('password'),
            'role_type'  => 'superadmin',
            'status'     => 'Active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Manager
        DB::table('users')->insert([
            'name'       => 'Manager Utama',
            'email'      => 'manager@gmail.com',
            'password'   => Hash::make('password'),
            'role_type'  => 'manager',
            'divisi'     => null,
            'jabatan'    => 'Manajer Utama',
            'status'     => 'Active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Admin Logistik
        DB::table('users')->insert([
            'name'       => 'Admin Logistik',
            'email'      => 'logistik@gmail.com',
            'password'   => Hash::make('password'),
            'role_type'  => 'admin',
            'divisi'     => 'Tim Logistik',
            'jabatan'    => 'Staff Logistik',
            'status'     => 'Active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Admin Legal
        DB::table('users')->insert([
            'name'       => 'Admin Legal',
            'email'      => 'legal@gmail.com',
            'password'   => Hash::make('password'),
            'role_type'  => 'admin',
            'divisi'     => 'Tim Legal',
            'jabatan'    => 'Staff Legal',
            'status'     => 'Active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Admin Sekretaris
        DB::table('users')->insert([
            'name'       => 'Admin Sekretaris',
            'email'      => 'sekretaris@gmail.com',
            'password'   => Hash::make('password'),
            'role_type'  => 'admin',
            'divisi'     => 'Sekretaris',
            'jabatan'    => 'Staff Sekretaris',
            'status'     => 'Active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->newLine();
        $this->command->info('✅ Semua tabel berhasil dibersihkan & user default telah dibuat.');
        $this->command->table(
            ['Email', 'Role', 'Password'],
            [
                ['superadmin@gmail.com', 'superadmin', 'password'],
                ['manager@gmail.com',    'manager',    'password'],
                ['logistik@gmail.com',   'admin',      'password'],
                ['legal@gmail.com',      'admin',      'password'],
                ['sekretaris@gmail.com', 'admin',      'password'],
            ]
        );
    }
}
