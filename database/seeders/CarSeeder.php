<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Seeds 50 realistic car listings distributed evenly across all dealer accounts.
     */
    public function run(): void
    {
        // Distribute cars across all dealer accounts.
        // Falls back to the first user if no dealers exist.
        $dealerIds = User::where('role', 'dealer')->pluck('id')->toArray();

        if (empty($dealerIds)) {
            $dealerIds = [User::first()?->id ?? 1];
        }

        $cars = [
            ['make' => 'Toyota',      'model' => 'Camry',           'year' => 2022, 'price' => 24500,  'mileage' => 18000,  'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'FWD', 'color' => 'White',        'condition' => 'Used',      'description' => 'Well-maintained Toyota Camry with full service history.'],
            ['make' => 'Honda',       'model' => 'Civic',           'year' => 2023, 'price' => 21000,  'mileage' => 5000,   'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'FWD', 'color' => 'Silver',       'condition' => 'Used',      'description' => 'Like-new Honda Civic, barely driven.'],
            ['make' => 'Ford',        'model' => 'F-150',           'year' => 2021, 'price' => 38000,  'mileage' => 32000,  'body_type' => 'Truck',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'Black',        'condition' => 'Used',      'description' => 'Powerful F-150 with tow package and bed liner.'],
            ['make' => 'Chevrolet',   'model' => 'Silverado 1500',  'year' => 2020, 'price' => 34000,  'mileage' => 45000,  'body_type' => 'Truck',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'Red',          'condition' => 'Used',      'description' => 'Dependable Silverado with crew cab and V8 engine.'],
            ['make' => 'BMW',         'model' => '3 Series',        'year' => 2022, 'price' => 44000,  'mileage' => 12000,  'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'RWD', 'color' => 'Blue',         'condition' => 'Used',      'description' => 'Sporty BMW 3 Series with premium sound system.'],
            ['make' => 'Mercedes',    'model' => 'C-Class',         'year' => 2021, 'price' => 47000,  'mileage' => 20000,  'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'RWD', 'color' => 'Gunmetal',     'condition' => 'Used',      'description' => 'Elegant C-Class with leather interior and sunroof.'],
            ['make' => 'Audi',        'model' => 'A4',              'year' => 2023, 'price' => 49500,  'mileage' => 3000,   'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'White',        'condition' => 'New',       'description' => 'Brand new Audi A4 with Quattro AWD system.'],
            ['make' => 'Tesla',       'model' => 'Model 3',         'year' => 2023, 'price' => 42000,  'mileage' => 1000,   'body_type' => 'Sedan',      'fuel_type' => 'Electric', 'transmission' => 'Automatic', 'drive_type' => 'RWD', 'color' => 'White',        'condition' => 'New',       'description' => 'Electric Tesla Model 3 with Autopilot and long range battery.'],
            ['make' => 'Jeep',        'model' => 'Wrangler',        'year' => 2021, 'price' => 39000,  'mileage' => 28000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Manual',    'drive_type' => '4WD', 'color' => 'Green',        'condition' => 'Used',      'description' => 'Rugged Wrangler, lifted with off-road tires.'],
            ['make' => 'Toyota',      'model' => 'RAV4',            'year' => 2022, 'price' => 33000,  'mileage' => 15000,  'body_type' => 'SUV',        'fuel_type' => 'Hybrid',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Gray',         'condition' => 'Used',      'description' => 'Fuel-efficient RAV4 Hybrid with all-wheel drive.'],
            ['make' => 'Honda',       'model' => 'CR-V',            'year' => 2022, 'price' => 31000,  'mileage' => 19000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Silver',       'condition' => 'Used',      'description' => 'Family-friendly CR-V with Honda Sensing safety suite.'],
            ['make' => 'Ford',        'model' => 'Mustang',         'year' => 2021, 'price' => 37000,  'mileage' => 22000,  'body_type' => 'Coupe',      'fuel_type' => 'Petrol',   'transmission' => 'Manual',    'drive_type' => 'RWD', 'color' => 'Orange',       'condition' => 'Used',      'description' => 'Classic Mustang GT with 5.0L V8 engine.'],
            ['make' => 'Volkswagen',  'model' => 'Golf',            'year' => 2020, 'price' => 22000,  'mileage' => 35000,  'body_type' => 'Hatchback',  'fuel_type' => 'Petrol',   'transmission' => 'Manual',    'drive_type' => 'FWD', 'color' => 'Blue',         'condition' => 'Used',      'description' => 'Reliable Golf GTI with sport package.'],
            ['make' => 'Nissan',      'model' => 'Altima',          'year' => 2021, 'price' => 23000,  'mileage' => 27000,  'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'FWD', 'color' => 'Black',        'condition' => 'Used',      'description' => 'Comfortable Altima with ProPilot Assist.'],
            ['make' => 'Hyundai',     'model' => 'Tucson',          'year' => 2022, 'price' => 28000,  'mileage' => 13000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Brown',        'condition' => 'Used',      'description' => 'Modern Tucson with digital cockpit and AWD.'],
            ['make' => 'Kia',         'model' => 'Sportage',        'year' => 2023, 'price' => 30000,  'mileage' => 7000,   'body_type' => 'SUV',        'fuel_type' => 'Hybrid',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'White',        'condition' => 'Used',      'description' => 'Sporty Sportage Hybrid with panoramic sunroof.'],
            ['make' => 'Subaru',      'model' => 'Outback',         'year' => 2021, 'price' => 31500,  'mileage' => 24000,  'body_type' => 'Wagon',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Green',        'condition' => 'Used',      'description' => 'Adventure-ready Outback with Eyesight safety.'],
            ['make' => 'Mazda',       'model' => 'CX-5',            'year' => 2022, 'price' => 32000,  'mileage' => 11000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Red',          'condition' => 'Used',      'description' => 'Premium CX-5 with Bose audio and leather seats.'],
            ['make' => 'Lexus',       'model' => 'ES 350',          'year' => 2022, 'price' => 52000,  'mileage' => 9000,   'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'FWD', 'color' => 'Pearl White',  'condition' => 'Used',      'description' => 'Luxury ES 350 with Mark Levinson audio system.'],
            ['make' => 'Porsche',     'model' => 'Cayenne',         'year' => 2021, 'price' => 89000,  'mileage' => 18000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Black',        'condition' => 'Used',      'description' => 'High-performance Cayenne with sport chrono package.'],
            ['make' => 'Land Rover',  'model' => 'Defender',        'year' => 2022, 'price' => 72000,  'mileage' => 14000,  'body_type' => 'SUV',        'fuel_type' => 'Diesel',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'Khaki',        'condition' => 'Used',      'description' => 'Iconic Defender 110 with off-road and luxury packages.'],
            ['make' => 'Volvo',       'model' => 'XC60',            'year' => 2023, 'price' => 55000,  'mileage' => 4000,   'body_type' => 'SUV',        'fuel_type' => 'Hybrid',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Blue',         'condition' => 'New',       'description' => 'Safe and stylish XC60 Recharge plug-in hybrid.'],
            ['make' => 'Mini',        'model' => 'Cooper S',        'year' => 2021, 'price' => 28500,  'mileage' => 20000,  'body_type' => 'Hatchback',  'fuel_type' => 'Petrol',   'transmission' => 'Manual',    'drive_type' => 'FWD', 'color' => 'Yellow',       'condition' => 'Used',      'description' => 'Fun Mini Cooper S with sport package and John Cooper Works kit.'],
            ['make' => 'Dodge',       'model' => 'Charger',         'year' => 2021, 'price' => 40000,  'mileage' => 26000,  'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'RWD', 'color' => 'Charcoal',     'condition' => 'Used',      'description' => 'Aggressive Charger R/T with 5.7L HEMI V8.'],
            ['make' => 'Chrysler',    'model' => 'Pacifica',        'year' => 2022, 'price' => 36000,  'mileage' => 17000,  'body_type' => 'Minivan',    'fuel_type' => 'Hybrid',   'transmission' => 'Automatic', 'drive_type' => 'FWD', 'color' => 'Silver',       'condition' => 'Used',      'description' => 'Spacious Pacifica Hybrid, perfect for large families.'],
            ['make' => 'GMC',         'model' => 'Sierra 1500',     'year' => 2020, 'price' => 36500,  'mileage' => 40000,  'body_type' => 'Truck',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'White',        'condition' => 'Used',      'description' => 'Workhorse Sierra with MultiPro tailgate.'],
            ['make' => 'Ram',         'model' => '1500',            'year' => 2022, 'price' => 41000,  'mileage' => 10000,  'body_type' => 'Truck',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'Granite',      'condition' => 'Used',      'description' => 'Premium Ram 1500 Laramie with air suspension.'],
            ['make' => 'Tesla',       'model' => 'Model Y',         'year' => 2023, 'price' => 52000,  'mileage' => 2000,   'body_type' => 'SUV',        'fuel_type' => 'Electric', 'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Red',          'condition' => 'New',       'description' => 'Performance Model Y with dual motor AWD.'],
            ['make' => 'Rivian',      'model' => 'R1T',             'year' => 2023, 'price' => 73000,  'mileage' => 5000,   'body_type' => 'Truck',      'fuel_type' => 'Electric', 'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Forest Green', 'condition' => 'Used',      'description' => 'Electric Rivian R1T with quad-motor setup and camp kitchen.'],
            ['make' => 'Polestar',    'model' => '2',               'year' => 2022, 'price' => 46000,  'mileage' => 12000,  'body_type' => 'Sedan',      'fuel_type' => 'Electric', 'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Midnight',     'condition' => 'Used',      'description' => 'Scandinavian electric Polestar 2 with Harman Kardon audio.'],
            ['make' => 'Hyundai',     'model' => 'IONIQ 5',         'year' => 2023, 'price' => 44000,  'mileage' => 6000,   'body_type' => 'SUV',        'fuel_type' => 'Electric', 'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Atlas White',  'condition' => 'Used',      'description' => 'Ultra-fast charging IONIQ 5 with retro-futuristic design.'],
            ['make' => 'Kia',         'model' => 'EV6',             'year' => 2023, 'price' => 43000,  'mileage' => 8000,   'body_type' => 'Sedan',      'fuel_type' => 'Electric', 'transmission' => 'Automatic', 'drive_type' => 'RWD', 'color' => 'Snow White',   'condition' => 'Used',      'description' => 'Stylish EV6 with 800V charging capability.'],
            ['make' => 'BMW',         'model' => 'X5',              'year' => 2021, 'price' => 68000,  'mileage' => 22000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Black Sapphire','condition' => 'Used',      'description' => 'Luxurious X5 with M Sport package and panoramic roof.'],
            ['make' => 'Mercedes',    'model' => 'GLE 350',         'year' => 2022, 'price' => 75000,  'mileage' => 15000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Polar White',  'condition' => 'Used',      'description' => 'Sophisticated GLE with Air Body Control suspension.'],
            ['make' => 'Audi',        'model' => 'Q7',              'year' => 2021, 'price' => 72000,  'mileage' => 25000,  'body_type' => 'SUV',        'fuel_type' => 'Diesel',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Daytona Gray', 'condition' => 'Used',      'description' => 'Three-row Q7 TDI with virtual cockpit and B&O audio.'],
            ['make' => 'Cadillac',    'model' => 'Escalade',        'year' => 2022, 'price' => 95000,  'mileage' => 11000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'Black',        'condition' => 'Used',      'description' => 'Full-size luxury Escalade with curved OLED dashboard.'],
            ['make' => 'Lincoln',     'model' => 'Navigator',       'year' => 2021, 'price' => 85000,  'mileage' => 19000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'Infinite Black', 'condition' => 'Used',     'description' => 'Presidential Navigator with Perfect Position seats.'],
            ['make' => 'Genesis',     'model' => 'GV80',            'year' => 2022, 'price' => 61000,  'mileage' => 13000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Havana Bronze', 'condition' => 'Used',      'description' => 'Upscale GV80 with quilted Nappa leather interior.'],
            ['make' => 'Acura',       'model' => 'MDX',             'year' => 2022, 'price' => 58000,  'mileage' => 16000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Majestic Black', 'condition' => 'Used',     'description' => 'Three-row MDX with ELS Studio audio system.'],
            ['make' => 'Infiniti',    'model' => 'QX60',            'year' => 2022, 'price' => 54000,  'mileage' => 14000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Moonbow Blue', 'condition' => 'Used',      'description' => 'Premium QX60 with ProACTIVE package and 9-speed auto.'],
            ['make' => 'Maserati',    'model' => 'Ghibli',          'year' => 2021, 'price' => 78000,  'mileage' => 17000,  'body_type' => 'Sedan',      'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Rosso Trionfale','condition' => 'Used',     'description' => 'Italian luxury Ghibli Trofeo with Ferrari-derived V8.'],
            ['make' => 'Alfa Romeo',  'model' => 'Stelvio',         'year' => 2022, 'price' => 59000,  'mileage' => 12000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Alfa Red',     'condition' => 'Used',      'description' => 'Sporty Stelvio Quadrifoglio with carbon fiber accents.'],
            ['make' => 'Toyota',      'model' => 'Land Cruiser',    'year' => 2022, 'price' => 88000,  'mileage' => 8000,   'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'Gray Metallic', 'condition' => 'Used',      'description' => 'Legendary Land Cruiser, unstoppable on any terrain.'],
            ['make' => 'Mitsubishi',  'model' => 'Outlander',       'year' => 2022, 'price' => 29000,  'mileage' => 21000,  'body_type' => 'SUV',        'fuel_type' => 'Hybrid',   'transmission' => 'Automatic', 'drive_type' => 'AWD', 'color' => 'Diamond White', 'condition' => 'Used',      'description' => 'Plug-in hybrid Outlander PHEV with S-AWC system.'],
            ['make' => 'Peugeot',     'model' => '308',             'year' => 2022, 'price' => 27000,  'mileage' => 14000,  'body_type' => 'Hatchback',  'fuel_type' => 'Diesel',   'transmission' => 'Automatic', 'drive_type' => 'FWD', 'color' => 'Artense Gray', 'condition' => 'Used',      'description' => 'Award-winning 308 with i-Cockpit and 1.5 BlueHDi engine.'],
            ['make' => 'Renault',     'model' => 'Megane E-Tech',   'year' => 2023, 'price' => 38000,  'mileage' => 3000,   'body_type' => 'Hatchback',  'fuel_type' => 'Electric', 'transmission' => 'Automatic', 'drive_type' => 'FWD', 'color' => 'Schist Gray',  'condition' => 'New',       'description' => 'All-electric Megane E-Tech with 300km range.'],
            ['make' => 'Skoda',       'model' => 'Octavia',         'year' => 2021, 'price' => 25000,  'mileage' => 30000,  'body_type' => 'Wagon',      'fuel_type' => 'Diesel',   'transmission' => 'Automatic', 'drive_type' => 'FWD', 'color' => 'Quartz Gray',  'condition' => 'Used',      'description' => 'Practical Octavia Combi with massive boot space.'],
            ['make' => 'SEAT',        'model' => 'Leon',            'year' => 2022, 'price' => 23000,  'mileage' => 18000,  'body_type' => 'Hatchback',  'fuel_type' => 'Petrol',   'transmission' => 'Manual',    'drive_type' => 'FWD', 'color' => 'Mystery Blue', 'condition' => 'Used',      'description' => 'Dynamic Leon FR with sporty body kit.'],
            ['make' => 'Suzuki',      'model' => 'Jimny',           'year' => 2022, 'price' => 22000,  'mileage' => 16000,  'body_type' => 'SUV',        'fuel_type' => 'Petrol',   'transmission' => 'Manual',    'drive_type' => '4WD', 'color' => 'Kinetic Yellow','condition' => 'Used',      'description' => 'Cult classic Jimny with ladder frame and 4WD capability.'],
            ['make' => 'Isuzu',       'model' => 'D-Max',           'year' => 2021, 'price' => 34000,  'mileage' => 35000,  'body_type' => 'Truck',      'fuel_type' => 'Diesel',   'transmission' => 'Automatic', 'drive_type' => '4WD', 'color' => 'Splash White', 'condition' => 'Used',      'description' => 'Tough D-Max with Terrain Command 4WD and towing capacity.'],
            ['make' => 'Mercedes',    'model' => 'Sprinter',        'year' => 2021, 'price' => 48000,  'mileage' => 42000,  'body_type' => 'Van',        'fuel_type' => 'Diesel',   'transmission' => 'Automatic', 'drive_type' => 'RWD', 'color' => 'Arctic White',  'condition' => 'Used',      'description' => 'High-roof Sprinter 311 CDI ideal for cargo or camper conversion.'],
            ['make' => 'Volkswagen',  'model' => 'Transporter T6',  'year' => 2020, 'price' => 36000,  'mileage' => 48000,  'body_type' => 'Van',        'fuel_type' => 'Diesel',   'transmission' => 'Manual',    'drive_type' => 'FWD', 'color' => 'Deep Black',   'condition' => 'Used',      'description' => 'Versatile T6 panel van with bulkhead and shelving fitted.'],
        ];

        // Hot deal configuration: first 4 cars get a sale price, expiry date, and badge.
        $hotDealOverrides = [
            0 => ['sale_price' => 19500, 'deal_ends_at' => now()->addDays(5),  'deal_badge' => 'Flash Sale'],
            1 => ['sale_price' => 17000, 'deal_ends_at' => now()->addDays(3),  'deal_badge' => 'Hot Deal'],
            2 => ['sale_price' => 31500, 'deal_ends_at' => now()->addDays(7),  'deal_badge' => 'Limited'],
            3 => ['sale_price' => 28000, 'deal_ends_at' => now()->addDays(10), 'deal_badge' => 'Special'],
        ];

        foreach ($cars as $index => $car) {
            // Generate a unique reference number like KJ-00001
            $refNumber = 'KJ-' . str_pad($index + 1, 5, '0', STR_PAD_LEFT);

            // Round-robin: distribute cars evenly across all dealer accounts
            $assignedDealerId = $dealerIds[$index % count($dealerIds)];

            $extra = [
                'user_id'    => $assignedDealerId,
                'ref_number' => $refNumber,
                'vin'        => 'VIN' . strtoupper(substr(md5($refNumber), 0, 14)),
                'status'     => 'available',
            ];

            // Merge hot-deal overrides for the first 4 cars
            if (isset($hotDealOverrides[$index])) {
                $extra = array_merge($extra, $hotDealOverrides[$index]);
            }

            Car::create(array_merge($car, $extra));
        }
    }
}
