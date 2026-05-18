<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Allows only users who can manage cars (super_admin, moderator, dealer).
 * This replaces the old ModeratorMiddleware which had a misleading name.
 * The route alias 'can_manage_cars' is registered in bootstrap/app.php.
 */
class CanManageCarsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || ! $request->user()->canManageCars()) {
            abort(403, 'Unauthorized action. Only admins, moderators, and dealers can manage cars.');
        }

        return $next($request);
    }
}
