<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminAnalyticsController extends Controller
{
    public function index()
    {
        // Cars by make (top 10)
        $carsByMake = Car::select('make', DB::raw('COUNT(*) as count'))
            ->groupBy('make')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        // Cars by body type
        $carsByBodyType = Car::select('body_type', DB::raw('COUNT(*) as count'))
            ->groupBy('body_type')
            ->orderByDesc('count')
            ->get();

        // Cars by fuel type
        $carsByFuelType = Car::select('fuel_type', DB::raw('COUNT(*) as count'))
            ->groupBy('fuel_type')
            ->orderByDesc('count')
            ->get();

        // Cars by status
        $carsByStatus = Car::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        // Monthly listings (last 6 months)
        $monthlyListings = Car::select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Top dealers by listing count
        $topDealers = User::where('role', 'dealer')
            ->withCount('cars')
            ->withSum('cars', 'price')
            ->orderByDesc('cars_count')
            ->limit(5)
            ->get()
            ->map(fn($d) => [
                'name'        => $d->name,
                'cars_count'  => $d->cars_count,
                'total_value' => $d->cars_sum_price ?? 0,
            ]);

        // Summary stats
        $summary = [
            'total_cars'     => Car::count(),
            'available_cars' => Car::where('status', 'available')->count(),
            'sold_cars'      => Car::where('status', 'sold')->count(),
            'total_value'    => Car::where('status', 'available')->sum('price'),
            'total_users'    => User::count(),
            'total_dealers'  => User::where('role', 'dealer')->count(),
        ];

        return Inertia::render('admin/analytics/index', [
            'summary'         => $summary,
            'carsByMake'      => $carsByMake,
            'carsByBodyType'  => $carsByBodyType,
            'carsByFuelType'  => $carsByFuelType,
            'carsByStatus'    => $carsByStatus,
            'monthlyListings' => $monthlyListings,
            'topDealers'      => $topDealers,
        ]);
    }
}
