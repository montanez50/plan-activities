<?php

namespace App\Http\Requests\Plan;

use Illuminate\Foundation\Http\FormRequest;

class ExecuteRequest extends FormRequest
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
            'activities' => 'required|array|min:1',
            'activities.*' => 'required|array|min:30|max:32',
            'activities.*.id' => 'required',
            'noPlanActivities' => 'nullable|array',
            'noPlanActivities.*' => 'nullable|array|min:30|max:32',
            'noPlanActivities.*.text' => 'nullable|string',
        ];
    }
}
