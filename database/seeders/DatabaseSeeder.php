<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Super Admin
        User::updateOrCreate(
            ['email' => 'superadmin@gununggeulis.farm'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_type' => 'superadmin',
                'divisi' => 'Superadmin',
                'jabatan' => 'Super Admin',
                'status' => 'Active',
            ]
        );

        // Manajer - Tim Logistik
        User::updateOrCreate(
            ['email' => 'manajer.logistik@gununggeulis.farm'],
            [
                'name' => 'Supardi',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_type' => 'manajer',
                'divisi' => 'Tim Logistik',
                'jabatan' => 'Manajer Logistik',
                'status' => 'Active',
            ]
        );

        // Manajer - Tim Legal
        User::updateOrCreate(
            ['email' => 'manajer.legal@gununggeulis.farm'],
            [
                'name' => 'Siti Aminah',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_type' => 'manajer',
                'divisi' => 'Tim Legal',
                'jabatan' => 'Manajer Legal',
                'status' => 'Active',
            ]
        );

        // Staff - Tim Logistik
        User::updateOrCreate(
            ['email' => 'andi@gununggeulis.farm'],
            [
                'name' => 'Andi Saputra',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_type' => 'staff',
                'divisi' => 'Tim Logistik',
                'jabatan' => 'Staff Logistik',
                'status' => 'Active',
            ]
        );

        // Staff - Tim Legal
        User::updateOrCreate(
            ['email' => 'rizki@gununggeulis.farm'],
            [
                'name' => 'Rizki Pratama',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_type' => 'staff',
                'divisi' => 'Tim Legal',
                'jabatan' => 'Staff Legal',
                'status' => 'Active',
            ]
        );

        // Staff - Sekretaris
        User::updateOrCreate(
            ['email' => 'dewi@gununggeulis.farm'],
            [
                'name' => 'Dewi Lestari',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role_type' => 'staff',
                'divisi' => 'Sekretaris',
                'jabatan' => 'Sekretaris Utama',
                'status' => 'Active',
            ]
        );
    }
}
