<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->canManageCars();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|integer|min:0',
            'vin' => 'nullable|string|max:255',
            'body_type' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'transmission' => 'required|string|max:255',
            'drive_type' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'condition' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|in:available,sold,reserved',
            'images' => 'nullable|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
        ];
    }
}
