<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', \App\Http\Controllers\WelcomeController::class)->name('home');

Route::get('/about', function () {
    return Inertia::render('AboutUs');
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Public API routes for cars (returns View)
Route::get('/cars', [\App\Http\Controllers\PublicCarController::class, 'index'])->name('cars.index');
Route::get('/cars/{car}', [\App\Http\Controllers\PublicCarController::class, 'show'])->name('cars.show');

// Public API routes for cars (no authentication required)
Route::prefix('api')->group(function () {
    Route::get('/cars', [\App\Http\Controllers\CarController::class, 'index'])->name('api.cars.index');
    Route::get('/cars/{car}', [\App\Http\Controllers\CarController::class, 'show'])->name('api.cars.show');
});

// Car management routes (requires moderator or super admin)
Route::middleware(['auth', 'verified', 'moderator'])->group(function () {
    Route::post('/cars', [\App\Http\Controllers\CarController::class, 'store'])->name('cars.store');
    Route::put('/cars/{car}', [\App\Http\Controllers\CarController::class, 'update'])->name('cars.update');
    Route::delete('/cars/{car}', [\App\Http\Controllers\CarController::class, 'destroy'])->name('cars.destroy');
    
    // Image management
    Route::post('/cars/{car}/images', [\App\Http\Controllers\CarController::class, 'uploadImages'])->name('cars.images.upload');
    Route::delete('/cars/images/{image}', [\App\Http\Controllers\CarController::class, 'deleteImage'])->name('cars.images.delete');
    Route::put('/cars/images/{image}/primary', [\App\Http\Controllers\CarController::class, 'setPrimaryImage'])->name('cars.images.primary');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
    
    // Car management for super admins
    Route::get('/cars', [\App\Http\Controllers\CarController::class, 'manage'])->name('cars.index');
    Route::get('/cars/create', [\App\Http\Controllers\CarController::class, 'create'])->name('cars.create');
    Route::get('/cars/{car}/edit', [\App\Http\Controllers\CarController::class, 'edit'])->name('cars.edit');
});

// Moderator dashboard (car dealers)
Route::middleware(['auth', 'verified', 'moderator'])->prefix('moderator')->name('moderator.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\CarController::class, 'dashboard'])->name('dashboard');
    Route::get('/cars', [\App\Http\Controllers\CarController::class, 'manage'])->name('cars.index');
    Route::get('/cars/create', [\App\Http\Controllers\CarController::class, 'create'])->name('cars.create');
    Route::get('/cars/{car}/edit', [\App\Http\Controllers\CarController::class, 'edit'])->name('cars.edit');
});

// Debug route - remove in production
Route::middleware(['auth'])->get('/debug-user', function () {
    $user = auth()->user();
    return response()->json([
        'authenticated' => true,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ],
        'permissions' => [
            'is_admin' => $user->isAdmin(),
            'is_moderator' => $user->isModerator(),
            'can_manage_cars' => $user->canManageCars(),
        ],
        'access' => [
            'admin_dashboard' => route('admin.dashboard'),
            'admin_cars' => route('admin.cars.index'),
            'moderator_dashboard' => route('moderator.dashboard'),
            'moderator_cars' => route('moderator.cars.index'),
        ]
    ]);
});

require __DIR__.'/settings.php';
