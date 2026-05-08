<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Super Admin Dashboard.
     * Shows platform-wide stats: all cars, users by role, revenue summary.
     */
    public function index()
    {
        // ── Car stats ──────────────────────────────────────────
        $totalCars     = Car::count();
        $availableCars = Car::where('status', 'available')->count();
        $soldCars      = Car::where('status', 'sold')->count();
        $totalValue    = Car::where('status', 'available')->sum('price');

        // ── User stats ─────────────────────────────────────────
        $totalUsers   = User::count();
        $totalDealers = User::where('role', 'dealer')->count();
        $totalBuyers  = User::where('role', 'buyer')->count();

        // ── Recent listings (all dealers) ──────────────────────
        $recentCars = Car::with(['primaryImage', 'user'])
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
                'status'        => $car->status,
                'dealer'        => $car->user?->name,
                'primary_image' => $car->primaryImage,
            ]);

        // ── Dealers summary ────────────────────────────────────
        $dealers = User::where('role', 'dealer')
            ->withCount('cars')
            ->withSum('cars', 'price')
            ->get()
            ->map(fn($d) => [
                'id'         => $d->id,
                'name'       => $d->name,
                'email'      => $d->email,
                'cars_count' => $d->cars_count,
                'total_value'=> $d->cars_sum_price ?? 0,
            ]);

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_cars'     => $totalCars,
                'available_cars' => $availableCars,
                'sold_cars'      => $soldCars,
                'total_value'    => $totalValue,
                'total_users'    => $totalUsers,
                'total_dealers'  => $totalDealers,
                'total_buyers'   => $totalBuyers,
            ],
            'recentCars' => $recentCars,
            'dealers'    => $dealers,
        ]);
    }
}
