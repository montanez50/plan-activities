<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Planification extends Model
{
    use HasFactory;

    const STATUS = [
        'PR' => 'Preparar',
        'RV' => 'Revisar',
        'AP' => 'Aprobar',
        'CR' => 'Cerrar'
    ];

    protected $fillable = [
        'year',
        'month',
        'user_id',
        'status',
    ];

    public function details(): HasMany
    {
        return $this->hasMany(PlanificationDetail::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted () {
        static::deleting(function(Planification $planification) {
            $planification->details()->delete();
        });
    }
}
