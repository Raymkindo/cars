<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;

class DealerDashboardController extends Controller
{
    /**
     * Dealer Dashboard.
     * Shows the logged-in dealer's own inventory stats and recent listings.
     */
    public function index()
    {
        $user = auth()->user();

        // ── Stats scoped to this dealer ─────────────────────────
        $totalCars     = $user->cars()->count();
        $availableCars = $user->cars()->where('status', 'available')->count();
        $soldCars      = $user->cars()->where('status', 'sold')->count();
        $totalValue    = $user->cars()->where('status', 'available')->sum('price');

        // ── Recent listings ─────────────────────────────────────
        $recentCars = $user->cars()
            ->with('primaryImage')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($car) => [
                'id'            => $car->id,
                'ref_number'    => $car->ref_number,
                'make'          => $car->make,
                'model'         => $car->model,
                'year'          => $car->year,
                'price'         => $car->price,
                'status'        => $car->status,
                'primary_image' => $car->primaryImage,
            ]);

        return Inertia::render('dealer/dashboard', [
            'stats' => [
                'total_cars'     => $totalCars,
                'available_cars' => $availableCars,
                'sold_cars'      => $soldCars,
                'total_value'    => $totalValue,
            ],
            'recentCars' => $recentCars,
        ]);
    }
}
