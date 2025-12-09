<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AppearanceController extends Controller
{
    /**
     * Display appearance settings.
     */
    public function index()
    {
        // Fetch all hero settings
        $settings = SiteSetting::where('group', 'hero')->get()->mapWithKeys(function ($item) {
            return [$item->key => $item->value];
        });

        return Inertia::render('admin/appearance/index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update appearance settings.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'hero_title' => 'required|string',
            'hero_subtitle' => 'required|string',
            'hero_cta_text' => 'required|string',
            'hero_image' => 'nullable|image|max:5120', // Limit to 5MB
        ]);

        // Handle image upload
        if ($request->hasFile('hero_image')) {
            $path = $request->file('hero_image')->store('appearance', 'public');
            
            SiteSetting::updateOrCreate(
                ['key' => 'hero_image'],
                ['value' => "/storage/{$path}", 'group' => 'hero']
            );
        }

        // Update text settings
        $textSettings = ['hero_title', 'hero_subtitle', 'hero_cta_text'];
        foreach ($textSettings as $key) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $data[$key], 'group' => 'hero']
            );
        }

        return redirect()->back()->with('success', 'Appearance updated successfully.');
    }
}
