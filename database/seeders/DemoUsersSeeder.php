<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $editorRole = Role::where('name', 'editor')->first();
        $webRole = Role::where('name', 'unitat_web')->first();
        $area = Area::first();

        User::updateOrCreate(
            ['email' => 'admin@gestordemandes.local'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('admin12345'),
                'role_id' => $adminRole?->id,
                'area_id' => $area?->id,
                'active' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'editor@gestordemandes.local'],
            [
                'name' => 'Usuari Editor',
                'password' => Hash::make('editor12345'),
                'role_id' => $editorRole?->id,
                'area_id' => $area?->id,
                'active' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'web@gestordemandes.local'],
            [
                'name' => 'Usuari Unitat Web',
                'password' => Hash::make('web12345'),
                'role_id' => $webRole?->id,
                'area_id' => $area?->id,
                'active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}