<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Diagnostic route to check user info
Route::middleware(['auth'])->get('/debug-user', function () {
    $user = auth()->user();
    
    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $user->role,
        'is_admin' => method_exists($user, 'isAdmin') ? $user->isAdmin() : 'method not found',
        'can_manage_cars' => method_exists($user, 'canManageCars') ? $user->canManageCars() : 'method not found',
    ]);
});
