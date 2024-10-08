<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('planification_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('planification_id')->constrained();
            $table->json('days')->default(new Expression('(JSON_ARRAY())')); // ->default(new Expression('(JSON_ARRAY())'))
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planification_details');
    }
};
