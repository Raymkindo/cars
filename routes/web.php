<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Public routes ────────────────────────────────────────────────────────────
Route::get('/', \App\Http\Controllers\WelcomeController::class)->name('home');

Route::get('/about', function () {
    return Inertia::render('AboutUs');
})->name('about');

Route::get('/cars', [\App\Http\Controllers\PublicCarController::class, 'index'])->name('cars.index');
Route::get('/cars/{car}', [\App\Http\Controllers\PublicCarController::class, 'show'])->name('cars.show');

// ── Public API (no auth required) ────────────────────────────────────────────
Route::prefix('api')->group(function () {
    Route::get('/cars', [\App\Http\Controllers\CarController::class, 'index'])->name('api.cars.index');
    Route::get('/cars/{car}', [\App\Http\Controllers\CarController::class, 'show'])->name('api.cars.show');
});

// ── Smart dashboard redirect (post-login) ────────────────────────────────────
// Redirects the user to their role-specific dashboard after logging in.
Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    $user = auth()->user();

    if ($user->isAdmin() || $user->isModerator()) {
        return redirect()->route('admin.dashboard');
    }

    if ($user->isDealer()) {
        return redirect()->route('dealer.dashboard');
    }

    // buyer or any other role
    return redirect()->route('buyer.dashboard');
})->name('dashboard');

// ── Super Admin routes ────────────────────────────────────────────────────────
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        // Dashboard
        Route::get('/dashboard', [\App\Http\Controllers\AdminDashboardController::class, 'index'])
            ->name('dashboard');

        // Car management (all cars)
        Route::get('/cars', [\App\Http\Controllers\CarController::class, 'manage'])->name('cars.index');
        Route::get('/cars/create', [\App\Http\Controllers\CarController::class, 'create'])->name('cars.create');
        Route::get('/cars/{car}/edit', [\App\Http\Controllers\CarController::class, 'edit'])->name('cars.edit');

        // Appearance / Site settings
        Route::get('/appearance', [\App\Http\Controllers\AppearanceController::class, 'index'])->name('appearance.index');
        Route::post('/appearance', [\App\Http\Controllers\AppearanceController::class, 'update'])->name('appearance.update');
    });

// ── Dealer routes ─────────────────────────────────────────────────────────────
// Dealers manage their OWN car listings only.
Route::middleware(['auth', 'verified', 'dealer'])
    ->prefix('dealer')
    ->name('dealer.')
    ->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\DealerDashboardController::class, 'index'])
            ->name('dashboard');

        // Dealer car management (scoped to own cars inside the controller)
        Route::get('/cars', [\App\Http\Controllers\CarController::class, 'manage'])->name('cars.index');
        Route::get('/cars/create', [\App\Http\Controllers\CarController::class, 'create'])->name('cars.create');
        Route::get('/cars/{car}/edit', [\App\Http\Controllers\CarController::class, 'edit'])->name('cars.edit');
    });

// ── Buyer routes ──────────────────────────────────────────────────────────────
// Buyers browse cars and manage their own profile.
Route::middleware(['auth', 'verified'])
    ->prefix('buyer')
    ->name('buyer.')
    ->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\BuyerDashboardController::class, 'index'])
            ->name('dashboard');
    });

// ── Car write operations (dealer OR admin) ────────────────────────────────────
Route::middleware(['auth', 'verified', 'moderator'])->group(function () {
    Route::post('/cars', [\App\Http\Controllers\CarController::class, 'store'])->name('cars.store');
    Route::put('/cars/{car}', [\App\Http\Controllers\CarController::class, 'update'])->name('cars.update');
    Route::delete('/cars/{car}', [\App\Http\Controllers\CarController::class, 'destroy'])->name('cars.destroy');

    Route::post('/cars/{car}/images', [\App\Http\Controllers\CarController::class, 'uploadImages'])->name('cars.images.upload');
    Route::delete('/cars/images/{image}', [\App\Http\Controllers\CarController::class, 'deleteImage'])->name('cars.images.delete');
    Route::put('/cars/images/{image}/primary', [\App\Http\Controllers\CarController::class, 'setPrimaryImage'])->name('cars.images.primary');
});

// ── Moderator dashboard (legacy — kept for backwards compat) ──────────────────
Route::middleware(['auth', 'verified', 'moderator'])
    ->prefix('moderator')
    ->name('moderator.')
    ->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\CarController::class, 'dashboard'])->name('dashboard');
        Route::get('/cars', [\App\Http\Controllers\CarController::class, 'manage'])->name('cars.index');
        Route::get('/cars/create', [\App\Http\Controllers\CarController::class, 'create'])->name('cars.create');
        Route::get('/cars/{car}/edit', [\App\Http\Controllers\CarController::class, 'edit'])->name('cars.edit');
    });

// ── Debug (remove in production) ─────────────────────────────────────────────
Route::middleware(['auth'])->get('/debug-user', function () {
    $user = auth()->user();
    return response()->json([
        'user'        => $user->only(['id', 'name', 'email', 'role']),
        'permissions' => [
            'is_admin'       => $user->isAdmin(),
            'is_dealer'      => $user->isDealer(),
            'is_buyer'       => $user->isBuyer(),
            'can_manage_cars'=> $user->canManageCars(),
        ],
    ]);
});

require __DIR__.'/settings.php';
