<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Ticket;
use App\Models\TicketHistory;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'content' => ['required', 'string'],
            'is_internal' => ['nullable', 'boolean'],
        ]);

        $user = auth()->user();
        $role = $user->role?->name;

        $isInternalAllowed = in_array($role, ['unitat_web', 'admin']);

        Comment::create([
            'ticket_id' => $ticket->id,
            'user_id' => $user->id,
            'content' => $validated['content'],
            'is_internal' => $isInternalAllowed ? ($validated['is_internal'] ?? false) : false,
        ]);

        TicketHistory::create([
            'ticket_id' => $ticket->id,
            'user_id' => auth()->id(),
            'action_type' => 'comment_added',
            'description' => 'S’ha afegit un comentari al ticket.',
        ]);

        return redirect()->route('tickets.show', $ticket->id, status: 303);
    }
}
