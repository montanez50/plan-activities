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
        Schema::table('planifications', function (Blueprint $table) {
            $table->enum('status', ['PR', 'RV', 'AP', 'CR', 'AN'])->after('user_id')->default('PR');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planifications', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
