<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Dashboard
        Permission::create(['name' => 'dashboard-access']);

        // users permissions
        Permission::create(['name' => 'users-access']);
        Permission::create(['name' => 'users-create']);
        Permission::create(['name' => 'users-update']);
        Permission::create(['name' => 'users-delete']);

        // roles permissions
        Permission::create(['name' => 'roles-access']);
        Permission::create(['name' => 'roles-create']);
        Permission::create(['name' => 'roles-update']);
        Permission::create(['name' => 'roles-delete']);

        // permissions permissions
        Permission::create(['name' => 'permissions-access']);
        Permission::create(['name' => 'permissions-create']);
        Permission::create(['name' => 'permissions-update']);
        Permission::create(['name' => 'permissions-delete']);

        // Gestión de planificación
        // Planificaciones
        Permission::create(['name' => 'planifications-access']);
        Permission::create(['name' => 'planifications-create']);
        Permission::create(['name' => 'planifications-show']);
        Permission::create(['name' => 'planifications-update']);
        Permission::create(['name' => 'planifications-delete']);
        // Ejecutar
        Permission::create(['name' => 'planifications-execute-access']);
        Permission::create(['name' => 'planifications-execute']);

        // Control de procesos
        Permission::create(['name' => 'control-access']);
        Permission::create(['name' => 'control-review-access']);
        Permission::create(['name' => 'control-review']);
        Permission::create(['name' => 'control-approve-access']);
        Permission::create(['name' => 'control-approve']);
        Permission::create(['name' => 'control-close-access']);
        Permission::create(['name' => 'control-close']);
        Permission::create(['name' => 'control-alert']);

        // Estadisticas
        Permission::create(['name' => 'statistics-access']);
        Permission::create(['name' => 'statistics-individual-report']);
        Permission::create(['name' => 'statistics-dependency-report']);
        Permission::create(['name' => 'statistics-individual-indicator']);
        Permission::create(['name' => 'statistics-dependency-indicator']);

        // Dependencias
        Permission::create(['name' => 'dependencies-access']);
        Permission::create(['name' => 'dependencies-create']);
        Permission::create(['name' => 'dependencies-update']);
        Permission::create(['name' => 'dependencies-delete']);

        // Soporte
        Permission::create(['name' => 'support-access']);
        Permission::create(['name' => 'support-logs']);
        Permission::create(['name' => 'support-backup']);
    }
}
