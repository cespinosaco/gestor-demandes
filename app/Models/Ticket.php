<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'created_by',
        'assigned_to',
        'area_id',
        'category_id',
        'status_id',
        'priority_id',
        'title',
        'description',
        'closed_at',
    ];

    protected $casts = [
        'closed_at' => 'datetime',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function status()
    {
        return $this->belongsTo(TicketStatus::class, 'status_id');
    }

    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function history()
{
    return $this->hasMany(TicketHistory::class)->latest();
}
}
