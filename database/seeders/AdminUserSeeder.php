<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRoleId = DB::table('roles')->where('name', 'admin')->value('id');
        $comunicacioAreaId = DB::table('areas')->where('name', 'Comunicació')->value('id');

        User::updateOrCreate(
            ['email' => 'admin@gestordemandes.local'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('admin12345'),
                'role_id' => $adminRoleId,
                'area_id' => $comunicacioAreaId,
                'active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
