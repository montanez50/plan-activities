<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DependencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'name' => 'Dirección Técnica',
                'internal_code' => '123',
                'user_id' => null,
                'created_at' => '2024-05-22 22:15:00',
                'updated_at' => '2024-05-22 22:15:00',
            ],
        ];

        DB::table('dependencies')->insert($data);
    }
}
