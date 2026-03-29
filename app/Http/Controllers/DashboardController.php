<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketStatus;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $total = Ticket::count();

        $byStatus = TicketStatus::withCount('tickets')->get();

        $open = Ticket::whereHas('status', function ($q) {
            $q->where('name', 'Obert')
              ->orWhere('name', 'En curs')
              ->orWhere('name', 'Pendent d\'informació');
        })->count();

        $closed = Ticket::whereHas('status', function ($q) {
            $q->where('name', 'Tancat')
              ->orWhere('name', 'Resolt');
        })->count();

        return Inertia::render('Dashboard/Tickets', [
            'total' => $total,
            'open' => $open,
            'closed' => $closed,
            'byStatus' => $byStatus,
        ]);
    }
}