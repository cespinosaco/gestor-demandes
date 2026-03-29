<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Category;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with([
            'creator',
            'assignee',
            'area',
            'category',
            'status',
            'priority',
        ])
        ->latest()
        ->get();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function create()
    {
        return Inertia::render('Tickets/Create', [
            'areas' => Area::orderBy('name')->get(),
            'categories' => Category::where('active', true)->orderBy('name')->get(),
            'priorities' => Priority::orderBy('level')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'description' => ['required', 'string'],
            'area_id' => ['required', 'exists:areas,id'],
            'category_id' => ['required', 'exists:categories,id'],
            'priority_id' => ['required', 'exists:priorities,id'],
        ]);

        $openStatusId = TicketStatus::where('name', 'Obert')->value('id');

        Ticket::create([
            'created_by' => auth()->id(),
            'assigned_to' => null,
            'area_id' => $validated['area_id'],
            'category_id' => $validated['category_id'],
            'status_id' => $openStatusId,
            'priority_id' => $validated['priority_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        return redirect()->route('tickets.index');
    }

    public function show(Ticket $ticket)
    {
        $ticket->load([
            'creator',
            'assignee',
            'area',
            'category',
            'status',
            'priority',
            'comments.user',
        ]);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
            'statuses' => TicketStatus::where('active', true)->orderBy('id')->get(),
        ]);
    }

    public function updateStatus(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'status_id' => ['required', 'exists:ticket_statuses,id'],
        ]);

        $ticket->status_id = $validated['status_id'];

        $closedStatusId = TicketStatus::where('name', 'Tancat')->value('id');
        $resolvedStatusId = TicketStatus::where('name', 'Resolt')->value('id');

        if (in_array($validated['status_id'], [$closedStatusId, $resolvedStatusId])) {
            $ticket->closed_at = now();
        } else {
            $ticket->closed_at = null;
        }

        $ticket->save();

        return redirect()->route('tickets.show', $ticket->id, status: 303);
    }
}