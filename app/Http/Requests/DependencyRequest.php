<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DependencyRequest extends FormRequest
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
            'name'          => ['required', 'string', 'min:5', 'max:255'],
            'internal_code' => ['required', 'string'],
            'user_id'       => ['required', 'integer'],
            'dependency_id' => ['nullable', 'integer'],
        ];
    }
}
