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
        $user = auth()->user();
        $role = $user->role?->name;

        $isEditor = $role === 'editor';

        $baseQuery = Ticket::query();

        if ($isEditor) {
            $baseQuery->where('created_by', $user->id);
        }

        $total = (clone $baseQuery)->count();

        $open = (clone $baseQuery)
            ->whereHas('status', function ($q) {
                $q->whereIn('name', ['Obert', 'En curs', 'Pendent d\'informació']);
            })
            ->count();

        $closed = (clone $baseQuery)
            ->whereHas('status', function ($q) {
                $q->whereIn('name', ['Resolt', 'Tancat']);
            })
            ->count();

        $resolutionRate = $total > 0
            ? round(($closed / $total) * 100, 1)
            : 0;

        // Tickets últims 30 dies
$last30Days = (clone $baseQuery)
    ->where('created_at', '>=', now()->subDays(30))
    ->count();

// Temps mitjà resolució
$resolvedTickets = (clone $baseQuery)
    ->whereNotNull('closed_at')
    ->get();

$averageResolutionHours = 0;

if ($resolvedTickets->count() > 0) {
    $totalHours = $resolvedTickets->sum(function ($ticket) {
        return $ticket->created_at->diffInHours($ticket->closed_at);
    });

    $averageResolutionHours = round(
        $totalHours / $resolvedTickets->count(),
        1
    );
}

// Percentatge oberts
$openPercentage = $total > 0
    ? round(($open / $total) * 100, 1)
    : 0;

        $byStatus = TicketStatus::withCount([
            'tickets' => function ($q) use ($isEditor, $user) {
                if ($isEditor) {
                    $q->where('created_by', $user->id);
                }
            }
        ])
            ->orderByDesc('tickets_count')
            ->get();

        $byCategory = Category::withCount([
            'tickets' => function ($q) use ($isEditor, $user) {
                if ($isEditor) {
                    $q->where('created_by', $user->id);
                }
            }
        ])
            ->orderByDesc('tickets_count')
            ->get();

        $byArea = Area::withCount([
            'tickets' => function ($q) use ($isEditor, $user) {
                if ($isEditor) {
                    $q->where('created_by', $user->id);
                }
            }
        ])
            ->orderByDesc('tickets_count')
            ->get();

        return Inertia::render('Dashboard/Tickets', [
            'stats' => [
    'total' => $total,
    'open' => $open,
    'closed' => $closed,
    'resolutionRate' => $resolutionRate,
    'last30Days' => $last30Days,
    'averageResolutionHours' => $averageResolutionHours,
    'openPercentage' => $openPercentage,
],
            'byStatus' => $byStatus,
            'byCategory' => $byCategory,
            'byArea' => $byArea,
            'currentUserRole' => $role,
        ]);
    }
}