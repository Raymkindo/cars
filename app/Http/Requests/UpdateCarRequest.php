<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCarRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $car = $this->route('car');
        
        // Super admin can update any car, moderators can only update their own cars
        return $this->user() && (
            $this->user()->isAdmin() || 
            ($this->user()->canManageCars() && $car && $car->user_id === $this->user()->id)
        );
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'make' => 'sometimes|required|string|max:255',
            'model' => 'sometimes|required|string|max:255',
            'year' => 'sometimes|required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'sometimes|required|numeric|min:0',
            'mileage' => 'sometimes|required|integer|min:0',
            'vin' => 'nullable|string|max:255',
            'body_type' => 'sometimes|required|string|max:255',
            'fuel_type' => 'sometimes|required|string|max:255',
            'transmission' => 'sometimes|required|string|max:255',
            'drive_type' => 'sometimes|required|string|max:255',
            'color' => 'sometimes|required|string|max:255',
            'condition' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|in:available,sold,reserved',
            'images' => 'nullable|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
        ];
    }
}
