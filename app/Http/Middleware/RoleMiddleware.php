<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = auth()->user();

        if (!$user) {
            abort(403);
        }

        if (!$user->role || !in_array($user->role->name, $roles)) {
            abort(403);
        }

        return $next($request);
    }
}
