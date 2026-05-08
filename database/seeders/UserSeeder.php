<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed users across all three roles:
     *  - super_admin : full platform access (manage users, cars, settings)
     *  - dealer      : can list, edit and delete their OWN cars
     *  - buyer       : can browse cars and send enquiries
     *
     * All passwords default to: password
     */
    public function run(): void
    {
        // ── 1. Super Admin ──────────────────────────────────────────────────
        // Has unrestricted access to the entire platform: manage all users,
        // approve/remove any car listing, and configure site settings.
        User::firstOrCreate(
            ['email' => 'admin@carsmarket.com'],
            [
                'name'              => 'Super Admin',
                'password'          => Hash::make('password'),
                'role'              => 'super_admin',
                'email_verified_at' => now(),
            ]
        );

        // ── 2. Dealers / Sellers ─────────────────────────────────────────────
        // Dealers can:
        //   • Create new car listings (make, model, price, images, etc.)
        //   • Edit or delete their OWN listings
        //   • View enquiries submitted by buyers on their listings
        //   • Cannot access admin panel or manage other users

        User::firstOrCreate(
            ['email' => 'alice.dealer@carsmarket.com'],
            [
                'name'              => 'Alice Motors',
                'password'          => Hash::make('password'),
                'role'              => 'dealer',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'bob.dealer@carsmarket.com'],
            [
                'name'              => 'Bob Auto Group',
                'password'          => Hash::make('password'),
                'role'              => 'dealer',
                'email_verified_at' => now(),
            ]
        );

        // ── 3. Buyers / Normal Users ─────────────────────────────────────────
        // Buyers can:
        //   • Browse all available car listings
        //   • Search and filter by make, model, price, year, etc.
        //   • Send enquiries / contact a dealer about a specific car
        //   • Save favourite listings to a watchlist
        //   • Cannot create or manage car listings

        User::firstOrCreate(
            ['email' => 'carol.buyer@carsmarket.com'],
            [
                'name'              => 'Carol Johnson',
                'password'          => Hash::make('password'),
                'role'              => 'buyer',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'david.buyer@carsmarket.com'],
            [
                'name'              => 'David Smith',
                'password'          => Hash::make('password'),
                'role'              => 'buyer',
                'email_verified_at' => now(),
            ]
        );
    }
}
