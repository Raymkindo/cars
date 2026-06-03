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
        'engine_size',
        'vin',
        'body_type',
        'fuel_type',
        'transmission',
        'drive_type',
        'color',
        'condition',
        'description',
        'status',
        'sale_price',
        'deal_badge',
        'deal_ends_at',
    ];

    protected $casts = [
        'deal_ends_at' => 'datetime',
    ];

    /**
     * Boot the model and generate ref_number.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($car) {
            if (empty($car->ref_number)) {
                $car->ref_number = 'KJ' . strtoupper(substr(uniqid(), -6));
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
     * Returns null if no image is marked as primary — always check before accessing.
     * The handleImageUploads() helper ensures the first uploaded image is always primary.
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
     * Pass $limit to control how many results are returned (default: 8).
     */
    public function scopeFeatured($query, int $limit = 8)
    {
        return $query->where('status', 'available')
                     ->orderBy('created_at', 'desc')
                     ->limit($limit);
    }

    /**
     * Get formatted price.
     */
    public function getFormattedPriceAttribute()
    {
        return '$' . number_format($this->price, 0);
    }

    /**
     * Scope a query to only include hot deals.
     */
    public function scopeHotDeals($query, int $limit = 4)
    {
        return $query->where('status', 'available')
                     ->whereNotNull('sale_price')
                     ->whereNotNull('deal_ends_at')
                     ->where('deal_ends_at', '>', now())
                     ->orderBy('deal_ends_at', 'asc')
                     ->limit($limit);
    }

    /**
     * Get formatted sale price.
     */
    public function getFormattedSalePriceAttribute()
    {
        return $this->sale_price ? '$' . number_format($this->sale_price, 0) : null;
    }
}
