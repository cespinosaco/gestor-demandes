<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketStatus extends Model
{
    protected $table = 'ticket_statuses';

    protected $fillable = [
        'name',
        'description',
        'active',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'status_id');
    }
}
