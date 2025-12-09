<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicCarController extends Controller
{
    public function index(Request $request)
    {
        $query = Car::with(['primaryImage'])
            ->available();

        // Apply filters
        if ($request->has('make')) {
            $query->where('make', $request->make);
        }

        if ($request->has('model')) {
            $query->where('model', 'like', '%' . $request->model . '%');
        }

        if ($request->has('year_from')) {
            $query->where('year', '>=', $request->year_from);
        }

        if ($request->has('year_to')) {
            $query->where('year', '<=', $request->year_to);
        }

        if ($request->has('body_type') && $request->body_type !== 'Body Type') {
            $query->where('body_type', $request->body_type);
        }

        if ($request->has('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }
        
        if ($request->has('search')) {
             $search = $request->search;
             $query->where(function($q) use ($search) {
                 $q->where('make', 'like', '%' . $search . '%')
                   ->orWhere('model', 'like', '%' . $search . '%')
                   ->orWhere('ref_number', 'like', '%' . $search . '%');
             });
         }

        $cars = $query->orderBy('created_at', 'desc')
            ->paginate(12)
            ->through(function ($car) {
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

        return Inertia::render('Cars/Index', [
            'cars' => $cars,
            'filters' => $request->all(),
        ]);
    }

    public function show(Car $car)
    {
        if ($car->status !== 'available') {
            abort(404);
        }

        $car->load(['images', 'user']);

        return Inertia::render('Cars/Show', [
            'car' => $car,
             // Format for display if needed, or do it in JS
        ]);
    }
}
