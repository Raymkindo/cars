<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'key' => 'hero_title',
                'value' => 'Find Your Dream Car <br /> <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">From Japan</span>',
                'group' => 'hero',
            ],
            [
                'key' => 'hero_subtitle',
                'value' => 'Premium quality used cars with global shipping. <span className="text-yellow-400 font-semibold">Over 10,000+ vehicles</span> in stock.',
                'group' => 'hero',
            ],
            [
                'key' => 'hero_image',
                'value' => '/images/hero-port-cars-v3.png',
                'group' => 'hero',
            ],
            [
                'key' => 'hero_cta_text',
                'value' => 'Browse Stock',
                'group' => 'hero',
            ],
        ];

        foreach ($settings as $setting) {
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
