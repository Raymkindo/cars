<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DealerMiddleware
{
    /**
     * Allow only users with the 'dealer' role.
     * Super admins are NOT permitted here — they have their own /admin/* routes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || ! $request->user()->isDealer()) {
            abort(403, 'Access restricted to dealers only.');
        }

        return $next($request);
    }
}
