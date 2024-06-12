<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $planifications = \App\Models\Planification::factory(50)->create([
            'user_id' => 1,
        ]);


        foreach ($planifications as $planification) {
            \App\Models\PlanificationDetail::factory()->create([
                'planification_id' => $planification->id,
            ]);
        }
    }
}
