<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreasTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('areas')->insert([
            [
                'name' => 'Comunicació',
                'description' => 'Àrea de Comunicació',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cultura',
                'description' => 'Àrea de Cultura',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Esports',
                'description' => 'Àrea d\'Esports',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Turisme',
                'description' => 'Àrea de Turisme',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Transparència',
                'description' => 'Àrea de Transparència',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
