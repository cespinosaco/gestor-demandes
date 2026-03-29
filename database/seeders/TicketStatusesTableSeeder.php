<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketStatusesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ticket_statuses')->insert([
            [
                'name' => 'Obert',
                'description' => 'Ticket creat pendent de revisió',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'En curs',
                'description' => 'Ticket en procés de gestió',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pendent d\'informació',
                'description' => 'Cal més informació per continuar',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Resolt',
                'description' => 'Ticket resolt',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tancat',
                'description' => 'Ticket tancat definitivament',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}