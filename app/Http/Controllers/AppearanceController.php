<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AppearanceController extends Controller
{
    public function index()
    {
        $hero   = SiteSetting::where('group', 'hero')->get()->mapWithKeys(fn($s) => [$s->key => $s->value]);
        $colors = SiteSetting::where('group', 'colors')->get()->mapWithKeys(fn($s) => [$s->key => $s->value]);

        return Inertia::render('admin/appearance/index', [
            'settings' => $hero,
            'colors'   => $colors,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'hero_title'       => 'required|string',
            'hero_subtitle'    => 'required|string',
            'hero_cta_text'    => 'required|string',
            'hero_image'       => 'nullable|image|max:5120',
            'color_primary'    => 'nullable|string|max:20',
            'color_secondary'  => 'nullable|string|max:20',
            'color_accent'     => 'nullable|string|max:20',
        ]);

        // Handle image upload
        if ($request->hasFile('hero_image')) {
            $path = $request->file('hero_image')->store('appearance', 'public');
            SiteSetting::updateOrCreate(
                ['key' => 'hero_image'],
                ['value' => "/storage/{$path}", 'group' => 'hero']
            );
        }

        // Text hero settings
        foreach (['hero_title', 'hero_subtitle', 'hero_cta_text'] as $key) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $data[$key], 'group' => 'hero']
            );
        }

        // Brand colors
        foreach (['color_primary', 'color_secondary', 'color_accent'] as $key) {
            if (!empty($data[$key])) {
                SiteSetting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $data[$key], 'group' => 'colors']
                );
            }
        }

        return redirect()->back()->with('success', 'Appearance updated successfully.');
    }
}
