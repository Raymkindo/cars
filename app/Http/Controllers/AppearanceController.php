<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AppearanceController extends Controller
{
    private const HERO_KEYS = [
        'hero_title',
        'hero_subtitle',
        'hero_cta_text',
        'hero_badge',
        'hero_cta_secondary_text',
        'hero_stat_1_val',
        'hero_stat_1_lbl',
        'hero_stat_2_val',
        'hero_stat_2_lbl',
        'hero_stat_3_val',
        'hero_stat_3_lbl',
        'hero_featured_badge',
        'hero_featured_title',
        'hero_featured_subtitle',
        'hero_featured_spec_1_val',
        'hero_featured_spec_1_lbl',
        'hero_featured_spec_2_val',
        'hero_featured_spec_2_lbl',
        'hero_featured_spec_3_val',
        'hero_featured_spec_3_lbl',
        'hero_featured_price',
        'hero_featured_availability',
        'hero_featured_car_id',
        'hero_bg_overlay',
    ];

    public function index()
    {
        $hero   = SiteSetting::where('group', 'hero')->get()->mapWithKeys(fn($s) => [$s->key => $s->value]);
        $colors = SiteSetting::where('group', 'colors')->get()->mapWithKeys(fn($s) => [$s->key => $s->value]);
        $cars   = Car::orderBy('make')->orderBy('model')->get(['id', 'make', 'model', 'year', 'price', 'ref_number']);

        return Inertia::render('admin/appearance/index', [
            'settings' => $hero,
            'colors'   => $colors,
            'cars'     => $cars,
        ]);
    }

    public function update(Request $request)
    {
        $rules = [
            'hero_image'                 => 'nullable|image|max:5120',
            'hero_bg_image'              => 'nullable|image|max:5120',
            'color_primary'              => 'nullable|string|max:20',
            'color_secondary'            => 'nullable|string|max:20',
            'color_accent'               => 'nullable|string|max:20',
        ];

        foreach (self::HERO_KEYS as $key) {
            $rules[$key] = 'nullable|string';
        }

        $data = $request->validate($rules);

        // Handle showcase image upload
        if ($request->hasFile('hero_image')) {
            $path = $request->file('hero_image')->store('appearance', 'public');
            SiteSetting::updateOrCreate(
                ['key' => 'hero_image'],
                ['value' => "/storage/{$path}", 'group' => 'hero']
            );
        }

        // Handle background wallpaper image upload
        if ($request->hasFile('hero_bg_image')) {
            $path = $request->file('hero_bg_image')->store('appearance', 'public');
            SiteSetting::updateOrCreate(
                ['key' => 'hero_bg_image'],
                ['value' => "/storage/{$path}", 'group' => 'hero']
            );
        }

        // Text hero settings
        foreach (self::HERO_KEYS as $key) {
            if (isset($data[$key])) {
                SiteSetting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $data[$key] ?? '', 'group' => 'hero']
                );
            }
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
