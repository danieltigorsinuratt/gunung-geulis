<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('password'),
            'role_type' => 'superadmin',
            'status' => 'Active',
        ]);

        // Manager
        User::create([
            'name' => 'Manager Utama',
            'email' => 'manager@gmail.com',
            'password' => Hash::make('password'),
            'role_type' => 'manager',
            'status' => 'Active',
        ]);

        // Admin Logistik
        User::create([
            'name' => 'Admin Logistik',
            'email' => 'logistik@gmail.com',
            'password' => Hash::make('password'),
            'role_type' => 'admin',
            'divisi' => 'Tim Logistik',
            'jabatan' => 'Staff Logistik',
            'status' => 'Active',
        ]);

        // Admin Legal
        User::create([
            'name' => 'Admin Legal',
            'email' => 'legal@gmail.com',
            'password' => Hash::make('password'),
            'role_type' => 'admin',
            'divisi' => 'Tim Legal',
            'jabatan' => 'Staff Legal',
            'status' => 'Active',
        ]);

        // Admin Sekretasi
        User::create([
            'name' => 'Admin Sekretasi',
            'email' => 'sekretaris@gmail.com',
            'password' => Hash::make('password'),
            'role_type' => 'admin',
            'divisi' => 'Sekretaris',
            'jabatan' => 'Staff Sekretasi',
            'status' => 'Active',
        ]);
    }
}
