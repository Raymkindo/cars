<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSettingsController extends Controller
{
    private const SETTINGS_KEYS = [
        'site_name', 'contact_email', 'contact_phone',
        'currency', 'items_per_page', 'footer_text',
    ];

    public function index()
    {
        $settings = SiteSetting::where('group', 'general')
            ->whereIn('key', self::SETTINGS_KEYS)
            ->get()
            ->mapWithKeys(fn($s) => [$s->key => $s->value]);

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'site_name'      => 'required|string|max:100',
            'contact_email'  => 'required|email|max:255',
            'contact_phone'  => 'nullable|string|max:30',
            'currency'       => 'required|string|max:10',
            'items_per_page' => 'required|integer|min:4|max:100',
            'footer_text'    => 'nullable|string|max:500',
        ]);

        foreach ($data as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => 'general']
            );
        }

        return back()->with('success', 'Settings saved successfully.');
    }
}
