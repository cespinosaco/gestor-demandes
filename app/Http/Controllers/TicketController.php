<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Category;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketHistory;
use App\Models\TicketStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $role = $user->role?->name;

        $query = Ticket::with([
            'creator',
            'assignee',
            'area',
            'category',
            'status',
            'priority',
        ])->latest();

        // Permisos
        if ($role === 'editor') {
        $query->where('created_by', $user->id);
        }

        // Filtres
        if ($request->filled('status_id')) {
            $query->where('status_id', $request->status_id);
        }

        if ($request->filled('area_id')) {
            $query->where('area_id', $request->area_id);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('assigned_to')) {
            if ($request->assigned_to === 'unassigned') {
                $query->whereNull('assigned_to');
            } else {
                $query->where('assigned_to', $request->assigned_to);
            }
        }

        $tickets = $query->get();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => [
                'status_id' => $request->status_id ?? '',
                'area_id' => $request->area_id ?? '',
                'category_id' => $request->category_id ?? '',
                'assigned_to' => $request->assigned_to ?? '',
            ],
            'statuses' => TicketStatus::where('active', true)->orderBy('name')->get(),
            'areas' => Area::orderBy('name')->get(),
            'categories' => Category::where('active', true)->orderBy('name')->get(),
            'users' => User::whereHas('role', function ($q) {
                $q->where('name', 'unitat_web');
            })->orderBy('name')->get(),
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
        $user = auth()->user();
        $role = $user->role?->name;

        if ($role === 'editor' && $ticket->created_by !== $user->id) {
            abort(403);
        }
        $ticket->load([
            'creator',
            'assignee',
            'area',
            'category',
            'status',
            'priority',
            'comments.user',
            'history.user',
        ]);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
            'statuses' => TicketStatus::where('active', true)->orderBy('id')->get(),

            // NOMÉS usuaris de la Unitat Web
            'users' => User::whereHas('role', function ($q) {
                $q->where('name', 'unitat_web');
            })->get(),
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

        $statusName = TicketStatus::where('id', $validated['status_id'])->value('name');

        TicketHistory::create([
            'ticket_id' => $ticket->id,
            'user_id' => auth()->id(),
            'action_type' => 'status_changed',
            'description' => 'S’ha canviat l’estat del ticket a: ' . $statusName,
        ]);

        return redirect()->route('tickets.show', $ticket->id, status: 303);
    }

    // assignació
    public function assign(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'assigned_to' => ['nullable', 'exists:users,id'],
        ]);

        $ticket->assigned_to = $validated['assigned_to'];
        $ticket->save();

        $assignedUserName = null;

        if ($validated['assigned_to']) {
            $assignedUserName = User::where('id', $validated['assigned_to'])->value('name');
        }

        TicketHistory::create([
            'ticket_id' => $ticket->id,
            'user_id' => auth()->id(),
            'action_type' => 'assigned',
            'description' => $assignedUserName
                ? 'S’ha assignat el ticket a: ' . $assignedUserName
                : 'S’ha desassignat el ticket',
        ]);

        return redirect()->route('tickets.show', $ticket->id, status: 303);
    }
}