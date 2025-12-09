<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page.
     */
    public function __invoke()
    {
        $featuredCars = Car::featured()
            ->with(['primaryImage'])
            ->get()
            ->map(function ($car) {
                return [
                    'id' => $car->id,
                    'name' => "{$car->make} {$car->model} {$car->year}",
                    'price' => $car->formatted_price,
                    'details' => "{$car->engine_size}L {$car->fuel_type} • {$car->transmission} • " . number_format($car->mileage) . " km",
                    'ref' => $car->ref_number,
                    'image' => $car->primaryImage ? '/storage/' . $car->primaryImage->image_path : '/images/placeholder-car.png',
                    'badge' => $car->created_at->diffInDays(now()) < 7 ? 'New Arrival' : null,
                ];
            });

        // Fetch hero settings
        $heroSettings = \App\Models\SiteSetting::where('group', 'hero')->get()->mapWithKeys(function ($item) {
            return [$item->key => $item->value];
        });

        return Inertia::render('Welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'featuredCars' => $featuredCars,
            'heroSettings' => $heroSettings,
        ]);
    }
}
