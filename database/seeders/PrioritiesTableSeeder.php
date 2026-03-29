<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrioritiesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('priorities')->insert([
            [
                'name' => 'Baixa',
                'level' => 1,
                'description' => 'Prioritat baixa',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mitjana',
                'level' => 2,
                'description' => 'Prioritat mitjana',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Alta',
                'level' => 3,
                'description' => 'Prioritat alta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
