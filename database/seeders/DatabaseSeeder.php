<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Order matters: UserSeeder must run before CarSeeder so that
     * dealer accounts exist when cars are assigned.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class, // creates super_admin, dealers, buyers
            CarSeeder::class,  // assigns 50 cars across dealer accounts
        ]);
    }
}
