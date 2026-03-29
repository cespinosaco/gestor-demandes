<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'name' => 'editor',
                'description' => 'Editor o editora d\'àrea',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'unitat_web',
                'description' => 'Personal de la Unitat Web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin',
                'description' => 'Administrador o administradora del sistema',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
