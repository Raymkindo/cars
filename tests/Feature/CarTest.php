<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CarTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_add_a_car()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/cars', [
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2020,
            'price' => 25000,
            'mileage' => 15000,
            'body_type' => 'Sedan',
            'fuel_type' => 'Petrol',
            'transmission' => 'Automatic',
            'drive_type' => 'FWD',
            'color' => 'White',
            'condition' => 'Used',
            'description' => 'Great car',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('cars', [
            'make' => 'Toyota',
            'model' => 'Camry',
            'user_id' => $user->id,
        ]);
    }

    public function test_unauthenticated_user_cannot_add_a_car()
    {
        $response = $this->post('/cars', [
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2020,
            'price' => 25000,
            'mileage' => 15000,
            'body_type' => 'Sedan',
            'fuel_type' => 'Petrol',
            'transmission' => 'Automatic',
            'drive_type' => 'FWD',
            'color' => 'White',
            'condition' => 'Used',
            'description' => 'Great car',
        ]);

        $response->assertRedirect('/login');
        $this->assertDatabaseCount('cars', 0);
    }
}
