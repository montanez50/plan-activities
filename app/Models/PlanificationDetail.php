<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlanificationDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'planification_id',
        'days',
    ];

    protected $casts = [
        'days' => 'array',
        'days_execute' => 'array',
    ];

    public function planification(): BelongsTo
    {
        return $this->belongsTo(Planification::class);
    }
}
