<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Category;
use App\Models\Ticket;
use App\Models\TicketStatus;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $total = Ticket::count();

        $open = Ticket::whereHas('status', function ($q) {
            $q->whereIn('name', ['Obert', 'En curs', 'Pendent d\'informació']);
        })->count();

        $closed = Ticket::whereHas('status', function ($q) {
            $q->whereIn('name', ['Resolt', 'Tancat']);
        })->count();

        $resolutionRate = $total > 0
            ? round(($closed / $total) * 100, 1)
            : 0;

        $byStatus = TicketStatus::withCount('tickets')
            ->orderByDesc('tickets_count')
            ->get();

        $byCategory = Category::withCount('tickets')
            ->orderByDesc('tickets_count')
            ->get();

        $byArea = Area::withCount('tickets')
            ->orderByDesc('tickets_count')
            ->get();

        return Inertia::render('Dashboard/Tickets', [
            'stats' => [
                'total' => $total,
                'open' => $open,
                'closed' => $closed,
                'resolutionRate' => $resolutionRate,
            ],
            'byStatus' => $byStatus,
            'byCategory' => $byCategory,
            'byArea' => $byArea,
        ]);
    }
}