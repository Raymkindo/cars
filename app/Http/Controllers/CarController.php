<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CarController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|integer|min:0',
            'vin' => 'nullable|string|max:255',
            'body_type' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'transmission' => 'required|string|max:255',
            'drive_type' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'condition' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $request->user()->cars()->create($validated);

        return redirect()->back()->with('success', 'Car added successfully.');
    }
}
