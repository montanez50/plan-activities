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
        Schema::table('planification_details', function (Blueprint $table) {
            $table->json('days_execute')->default(new Expression('(JSON_ARRAY())'))->after('days'); // ->default(new Expression('(JSON_ARRAY())'))
        });               
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planification_details', function (Blueprint $table) {
            $table->dropColumn('days_execute');
        });
    }
};
