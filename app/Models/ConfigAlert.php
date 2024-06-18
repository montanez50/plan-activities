<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConfigAlert extends Model
{
    use HasFactory;

    protected $fillable = [
        'dependency_id',
        'reports_notification',
        'create_notification',
        'update_notification',
        'parent_notification',
        'non_compliance_alert',
        'close_plan_day',
    ];

    public function dependency(): BelongsTo
    {
        return $this->belongsTo(Dependency::class);
    }

}
