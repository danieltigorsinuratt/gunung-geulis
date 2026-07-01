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
        User::updateOrCreate(
            ['email' => 'superadmin@gmail.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role_type' => 'superadmin',
                'status' => 'Active',
            ]
        );

        // Manager
        User::updateOrCreate(
            ['email' => 'manager@gmail.com'],
            [
                'name' => 'Manager Utama',
                'password' => Hash::make('password'),
                'role_type' => 'manager',
                'divisi' => 'Tim Logistik',
                'jabatan' => 'Manajer Utama',
                'status' => 'Active',
            ]
        );

        // Admin Logistik
        User::updateOrCreate(
            ['email' => 'logistik@gmail.com'],
            [
                'name' => 'Admin Logistik',
                'password' => Hash::make('password'),
                'role_type' => 'admin',
                'divisi' => 'Tim Logistik',
                'jabatan' => 'Staff Logistik',
                'status' => 'Active',
            ]
        );

        // Admin Legal
        User::updateOrCreate(
            ['email' => 'legal@gmail.com'],
            [
                'name' => 'Admin Legal',
                'password' => Hash::make('password'),
                'role_type' => 'admin',
                'divisi' => 'Tim Legal',
                'jabatan' => 'Staff Legal',
                'status' => 'Active',
            ]
        );

        // Admin Sekretaris
        User::updateOrCreate(
            ['email' => 'sekretaris@gmail.com'],
            [
                'name' => 'Admin Sekretaris',
                'password' => Hash::make('password'),
                'role_type' => 'admin',
                'divisi' => 'Sekretaris',
                'jabatan' => 'Staff Sekretaris',
                'status' => 'Active',
            ]
        );
    }
}
