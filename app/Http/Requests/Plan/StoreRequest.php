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
    // TODO Agregar validación unico por periodo
    public function rules(): array
    {
        return [
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:4',
            'activities' => 'required|array|min:1',
            'activities.*' => 'required|array|min:29|max:32',
            'activities.*.text' => 'required|string',
        ];
    }
}
