<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //? Admin
        // get admin role
        $role = Role::where('name', 'administrador')->first();

        // create new admin
        $user = User::create([
            'name' => 'Admin',
            'last_name' => 'CEM',
            'email' => 'admin@dev.com',
            'password' => bcrypt('password'),
            'dependency_id' => 1,
        ]);

        // assign a role to user
        $user->assignRole($role);

        //? Jefe
        // get boos role
        $role = Role::where('name', 'jefe')->first();

        // create new boos
        $user = User::create([
            'name' => 'Jefe',
            'last_name' => 'CEM',
            'email' => 'jefe@dev.com',
            'password' => bcrypt('password'),
            'dependency_id' => 1,
        ]);

        // assign a role to user
        $user->assignRole($role);

        //? Empleado
        // get employee role
        $role = Role::where('name', 'empleado')->first();

        // create new employee
        $user = User::create([
            'name' => 'Empleado',
            'last_name' => 'CEM',
            'email' => 'empleado@dev.com',
            'password' => bcrypt('password'),
            'dependency_id' => 1,
        ]);

        // assign a role to user
        $user->assignRole($role);
    }
}
