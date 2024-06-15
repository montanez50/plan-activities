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
        Schema::table('planification_details', function (Blueprint $table) {
            $table->string('type')->default('P')->after('planification_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planification_details', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
