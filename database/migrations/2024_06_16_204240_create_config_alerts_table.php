<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('config_alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dependency_id')->constrained();
            $table->enum('reports_notification', [0, 1, 2, 3]);
            $table->boolean('create_notification');
            $table->boolean('update_notification');
            $table->boolean('parent_notification');
            $table->unsignedInteger('non_compliance_alert');
            $table->integer('close_plan_day');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('config_alerts');
    }
};
