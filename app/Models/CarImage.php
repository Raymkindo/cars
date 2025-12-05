<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'image_path',
        'is_primary',
        'order',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    /**
     * Get the car that owns the image.
     */
    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    /**
     * Scope a query to only include ordered images.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
