<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ref_number',
        'make',
        'model',
        'year',
        'price',
        'mileage',
        'vin',
        'body_type',
        'fuel_type',
        'transmission',
        'drive_type',
        'color',
        'condition',
        'description',
        'status',
    ];

    /**
     * Boot the model and generate ref_number.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($car) {
            if (empty($car->ref_number)) {
                $car->ref_number = 'BF' . strtoupper(substr(uniqid(), -6));
            }
        });
    }

    /**
     * Get the user that owns the car.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all images for the car.
     */
    public function images()
    {
        return $this->hasMany(CarImage::class)->ordered();
    }

    /**
     * Get the primary image for the car.
     */
    public function primaryImage()
    {
        return $this->hasOne(CarImage::class)->where('is_primary', true);
    }

    /**
     * Scope a query to only include available cars.
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Scope a query to only include featured cars.
     */
    public function scopeFeatured($query)
    {
        return $query->where('status', 'available')
                     ->orderBy('created_at', 'desc')
                     ->limit(6);
    }

    /**
     * Get formatted price.
     */
    public function getFormattedPriceAttribute()
    {
        return '$' . number_format($this->price, 0);
    }
}
