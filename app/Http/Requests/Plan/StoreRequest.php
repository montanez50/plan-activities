<?php

namespace App\Http\Requests\Plan;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'period' => 'required|string|min:6|max:7', //Agregar validación unico por periodo
            'activities' => 'required|array|min:1',
            'activities.*' => 'required|array|min:30|max:32',
            'activities.*.text' => 'required|string',
        ];
    }
}
