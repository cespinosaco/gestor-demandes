<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolesTableSeeder::class,
            AreasTableSeeder::class,
            CategoriesTableSeeder::class,
            TicketStatusesTableSeeder::class,
            PrioritiesTableSeeder::class,
            AdminUserSeeder::class,
        ]);
    }
}
