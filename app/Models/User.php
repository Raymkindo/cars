<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * Check if the user has a specific role.
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    /**
     * Check if the user is a super admin.
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('super_admin');
    }

    /**
     * Check if the user is a moderator.
     */
    public function isModerator(): bool
    {
        return $this->hasRole('moderator');
    }

    /**
     * Check if the user is a dealer/seller.
     */
    public function isDealer(): bool
    {
        return $this->hasRole('dealer');
    }

    /**
     * Check if the user is a buyer (normal user).
     */
    public function isBuyer(): bool
    {
        return $this->hasRole('buyer');
    }

    /**
     * Check if the user can list/manage cars (admin, moderator, or dealer).
     */
    public function canManageCars(): bool
    {
        return $this->isAdmin() || $this->isModerator() || $this->isDealer();
    }

    /**
     * Check if the user can browse and inquire about cars (any role).
     */
    public function canBrowseCars(): bool
    {
        return true; // All authenticated users can browse
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
    public function cars()
    {
        return $this->hasMany(Car::class);
    }
}
