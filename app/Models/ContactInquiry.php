<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInquiry extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'inquiry_type',
        'car_of_interest',
        'message',
        'status',
        'reply_text',
        'replied_at',
        'dealer_id',
        'car_id',
    ];

    public function dealer(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'dealer_id');
    }

    public function car(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Car::class, 'car_id');
    }
}
