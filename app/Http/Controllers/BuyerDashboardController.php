<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;

class BuyerDashboardController extends Controller
{
    /**
     * Buyer Dashboard.
     * Shows platform overview stats and a prompt to browse available cars.
     */
    public function index()
    {
        $user = auth()->user();

        // ── Platform stats visible to buyers ───────────────────
        $availableCars = Car::where('status', 'available')->count();
        $totalMakes    = Car::where('status', 'available')
            ->distinct('make')
            ->count('make');
        $lowestPrice   = Car::where('status', 'available')->min('price');
        $highestPrice  = Car::where('status', 'available')->max('price');

        // ── Featured / newest cars ──────────────────────────────
        $featuredCars = Car::with('primaryImage')
            ->where('status', 'available')
            ->latest()
            ->take(6)
            ->get()
            ->map(fn($car) => [
                'id'            => $car->id,
                'ref_number'    => $car->ref_number,
                'make'          => $car->make,
                'model'         => $car->model,
                'year'          => $car->year,
                'price'         => $car->price,
                'body_type'     => $car->body_type,
                'fuel_type'     => $car->fuel_type,
                'mileage'       => $car->mileage,
                'primary_image' => $car->primaryImage,
            ]);

        return Inertia::render('buyer/dashboard', [
            'stats' => [
                'available_cars' => $availableCars,
                'total_makes'    => $totalMakes,
                'lowest_price'   => $lowestPrice,
                'highest_price'  => $highestPrice,
            ],
            'featuredCars' => $featuredCars,
            'user'         => ['name' => $user->name],
        ]);
    }
}
