<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    /**
     * The brands shown on the "Shop by Popular Brands" section.
     * Add/remove brands here to control what appears on the homepage.
     */
    private const FEATURED_BRANDS = [
        ['name' => 'Toyota',       'color' => 'from-red-500 to-red-600'],
        ['name' => 'Nissan',       'color' => 'from-blue-500 to-blue-600'],
        ['name' => 'Honda',        'color' => 'from-red-600 to-red-700'],
        ['name' => 'Mazda',        'color' => 'from-blue-600 to-indigo-600'],
        ['name' => 'BMW',          'color' => 'from-blue-700 to-blue-800'],
        ['name' => 'Mercedes',     'color' => 'from-neutral-700 to-neutral-800'],
        ['name' => 'Audi',         'color' => 'from-red-700 to-red-800'],
        ['name' => 'Volkswagen',   'color' => 'from-blue-500 to-cyan-500'],
        ['name' => 'Subaru',       'color' => 'from-blue-600 to-blue-700'],
        ['name' => 'Mitsubishi',   'color' => 'from-red-600 to-orange-600'],
        ['name' => 'Lexus',        'color' => 'from-neutral-800 to-neutral-900'],
        ['name' => 'Porsche',      'color' => 'from-yellow-600 to-orange-600'],
    ];

    /**
     * Display the welcome page.
     */
    public function __invoke()
    {
        $featuredCars = Car::featured()
            ->with(['primaryImage'])
            ->get()
            ->map(function ($car) {
                $enginePart = $car->engine_size ? "{$car->engine_size}L " : '';
                return [
                    'id'    => $car->id,
                    'name'  => "{$car->make} {$car->model} {$car->year}",
                    'price' => $car->formatted_price,
                    'details' => "{$enginePart}{$car->fuel_type} • {$car->transmission} • " . number_format($car->mileage) . " km",
                    'ref'   => $car->ref_number,
                    'image' => $car->primaryImage ? '/storage/' . $car->primaryImage->image_path : '/images/default-car.png',
                    'badge' => $car->created_at->diffInDays(now()) < 7 ? 'New Arrival' : null,
                ];
            });

        // Fetch hero settings
        $heroSettings = \App\Models\SiteSetting::where('group', 'hero')->get()->mapWithKeys(function ($item) {
            return [$item->key => $item->value];
        });

        // Count available cars per featured brand from the real database
        $brandNames = collect(self::FEATURED_BRANDS)->pluck('name')->toArray();
        $carCountsByMake = Car::where('status', 'available')
            ->whereIn('make', $brandNames)
            ->select('make', DB::raw('COUNT(*) as count'))
            ->groupBy('make')
            ->pluck('count', 'make');

        // Build brands array with real counts
        $popularBrands = collect(self::FEATURED_BRANDS)->map(function ($brand) use ($carCountsByMake) {
            return [
                'name'  => $brand['name'],
                'color' => $brand['color'],
                'count' => $carCountsByMake->get($brand['name'], 0),
            ];
        })->values();

        // Fetch hot deals
        $hotDeals = Car::hotDeals()
            ->with(['primaryImage'])
            ->get()
            ->map(function ($car) {
                $enginePart = $car->engine_size ? "{$car->engine_size}L " : '';
                
                // Calculate discount percentage
                $originalPrice = (float) $car->price;
                $salePrice = (float) $car->sale_price;
                $discountPercent = $originalPrice > 0 ? round((($originalPrice - $salePrice) / $originalPrice) * 100) : 0;
                
                // Calculate time left
                $daysLeft = $car->deal_ends_at ? max(0, (int) round(now()->floatDiffInDays($car->deal_ends_at))) : 0;
                $timeLeftStr = $daysLeft > 0 ? "{$daysLeft} " . ($daysLeft === 1 ? "Day" : "Days") . " Left" : "Ends Today";
                
                // Calculate savings
                $savings = $originalPrice - $salePrice;
                $savingsFormatted = '$' . number_format($savings, 0);

                return [
                    'id'    => $car->id,
                    'name'  => "{$car->make} {$car->model} {$car->year}",
                    'originalPrice' => $car->formatted_price,
                    'salePrice' => $car->formatted_sale_price,
                    'discount' => "{$discountPercent}%",
                    'details' => "{$enginePart}{$car->fuel_type} • {$car->transmission} • " . number_format($car->mileage) . " km",
                    'ref'   => $car->ref_number,
                    'image' => $car->primaryImage ? '/storage/' . $car->primaryImage->image_path : '/images/default-car.png',
                    'badge' => $car->deal_badge ?? 'Hot Deal',
                    'timeLeft' => $timeLeftStr,
                    'savings' => $savingsFormatted
                ];
            });

        return Inertia::render('Welcome', [
            'canRegister'   => Features::enabled(Features::registration()),
            'featuredCars'  => $featuredCars,
            'heroSettings'  => $heroSettings,
            'popularBrands' => $popularBrands,
            'hotDeals'      => $hotDeals,
        ]);
    }
}
