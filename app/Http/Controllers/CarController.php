<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Models\Car;
use App\Models\CarImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarController extends Controller
{
    /**
     * Display admin/moderator dashboard.
     */
    public function dashboard()
    {
        $user = auth()->user();
        
        // Get cars based on role
        if ($user->isAdmin()) {
            $totalCars = Car::count();
            $availableCars = Car::where('status', 'available')->count();
            $soldCars = Car::where('status', 'sold')->count();
        } else {
            $totalCars = $user->cars()->count();
            $availableCars = $user->cars()->where('status', 'available')->count();
            $soldCars = $user->cars()->where('status', 'sold')->count();
        }

        $recentCars = $user->isAdmin() 
            ? Car::with(['primaryImage', 'user'])->latest()->take(5)->get()
            : $user->cars()->with('primaryImage')->latest()->take(5)->get();

        return Inertia::render('admin/cars/dashboard', [
            'stats' => [
                'total' => $totalCars,
                'available' => $availableCars,
                'sold' => $soldCars,
            ],
            'recentCars' => $recentCars,
        ]);
    }

    /**
     * Display car management page.
     */
    public function manage(Request $request)
    {
        $user = auth()->user();
        
        $query = Car::with(['primaryImage', 'user']);
        
        // Moderators only see their own cars
        if (!$user->isAdmin()) {
            $query->where('user_id', $user->id);
        }

        // Apply search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('make', 'like', '%' . $search . '%')
                  ->orWhere('model', 'like', '%' . $search . '%')
                  ->orWhere('ref_number', 'like', '%' . $search . '%');
            });
        }

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $cars = $query->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('admin/cars/index', [
            'cars' => $cars,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show create car form.
     */
    public function create()
    {
        return Inertia::render('admin/cars/create');
    }

    /**
     * Show edit car form.
     */
    public function edit(Car $car)
    {
        // Check authorization
        if (!auth()->user()->isAdmin() && $car->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $car->load('images');

        return Inertia::render('admin/cars/edit', [
            'car' => $car,
        ]);
    }
    /**
     * Display a listing of cars.
     */
    public function index(Request $request)
    {
        $query = Car::with(['primaryImage', 'images'])
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

        if ($request->has('body_type')) {
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
            ->paginate(12);

        return response()->json($cars);
    }

    /**
     * Display the specified car.
     */
    public function show(Car $car)
    {
        $car->load(['images', 'user']);
        
        return response()->json($car);
    }

    /**
     * Store a newly created car.
     */
    public function store(StoreCarRequest $request)
    {
        $validated = $request->validated();
        
        // Create the car
        $car = $request->user()->cars()->create($validated);

        // Handle image uploads
        if ($request->hasFile('images')) {
            $this->handleImageUploads($car, $request->file('images'));
        }

        return redirect()->back()->with('success', 'Car added successfully.');
    }

    /**
     * Update the specified car.
     */
    public function update(UpdateCarRequest $request, Car $car)
    {
        $validated = $request->validated();
        
        $car->update($validated);

        // Handle new image uploads
        if ($request->hasFile('images')) {
            $this->handleImageUploads($car, $request->file('images'));
        }

        return redirect()->back()->with('success', 'Car updated successfully.');
    }

    /**
     * Remove the specified car.
     */
    public function destroy(Car $car)
    {
        // Check authorization
        if (!auth()->user()->isAdmin() && $car->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // Delete all images from storage
        foreach ($car->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $car->delete();

        return redirect()->back()->with('success', 'Car deleted successfully.');
    }

    /**
     * Upload additional images to a car.
     */
    public function uploadImages(Request $request, Car $car)
    {
        $request->validate([
            'images' => 'required|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        // Check authorization
        if (!auth()->user()->isAdmin() && $car->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $this->handleImageUploads($car, $request->file('images'));

        return redirect()->back()->with('success', 'Images uploaded successfully.');
    }

    /**
     * Delete a specific car image.
     */
    public function deleteImage(CarImage $image)
    {
        $car = $image->car;

        // Check authorization
        if (!auth()->user()->isAdmin() && $car->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // Delete from storage
        Storage::disk('public')->delete($image->image_path);

        // If this was the primary image, set another image as primary
        $wasPrimary = $image->is_primary;
        $image->delete();

        if ($wasPrimary) {
            $newPrimary = $car->images()->first();
            if ($newPrimary) {
                $newPrimary->update(['is_primary' => true]);
            }
        }

        return redirect()->back()->with('success', 'Image deleted successfully.');
    }

    /**
     * Set a specific image as primary.
     */
    public function setPrimaryImage(CarImage $image)
    {
        $car = $image->car;

        // Check authorization
        if (!auth()->user()->isAdmin() && $car->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // Remove primary flag from all images
        $car->images()->update(['is_primary' => false]);

        // Set this image as primary
        $image->update(['is_primary' => true]);

        return redirect()->back()->with('success', 'Primary image updated successfully.');
    }

    /**
     * Handle image uploads for a car.
     */
    private function handleImageUploads(Car $car, array $images)
    {
        $existingImagesCount = $car->images()->count();
        $order = $existingImagesCount;

        foreach ($images as $index => $image) {
            $path = $image->store('cars', 'public');
            
            $car->images()->create([
                'image_path' => $path,
                'is_primary' => $existingImagesCount === 0 && $index === 0, // First image is primary if no images exist
                'order' => $order++,
            ]);
        }
    }
}
