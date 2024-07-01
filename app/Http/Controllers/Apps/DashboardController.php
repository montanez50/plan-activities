<?php

namespace App\Http\Controllers\Apps;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\Dependency;
use App\Models\Planification;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    // TODO Hacer dashboard por roles
    public function __invoke(Request $request)
    {
        //? Permisos
        $isEmpleado = Auth::user()->hasRole('empleado');
        $isJefe = Auth::user()->hasRole('jefe');
        $dependency = Dependency::where('user_id', Auth::user()->id)->first();
        $dependencies = $isJefe ? Dependency::where('id', $dependency ? $dependency->id : 0)->orWhere('parent_id', $dependency ? $dependency->id : 0)->get()->pluck('id') : [];

        //? Datos del dashboard
        // get users data
        $users = User::query()
            ->limit(4)
            ->latest()
            ->get();

        // count all users data
        $users_count = User::count();

        // count all roles data
        $roles_count = Role::count();

        // count all permissions data
        $permissions_count = Permission::count();

        // Planificaciones Preparadas
        $prepared_plans = Planification::where('status', 'PR')
            ->join('users as u', 'u.id', '=', 'planifications.user_id')
            ->when($isJefe, fn($query) => $query->whereIn('u.dependency_id', $dependencies))
            ->when($isEmpleado, fn($query) => $query->where('user_id', Auth::user()->id))
            ->count();

        // Planificaciones Revisadas
        $revised_plans = Planification::where('status', 'RV')
            ->join('users as u', 'u.id', '=', 'planifications.user_id')
            ->when($isJefe, fn($query) => $query->whereIn('u.dependency_id', $dependencies))
            ->when($isEmpleado, fn($query) => $query->where('user_id', Auth::user()->id))
            ->count();

        // Planificaciones Ejecución
        $approved_plans = Planification::where('status', 'AP')
            ->join('users as u', 'u.id', '=', 'planifications.user_id')
            ->when($isJefe, fn($query) => $query->whereIn('u.dependency_id', $dependencies))
            ->when($isEmpleado, fn($query) => $query->where('user_id', Auth::user()->id))
            ->count();

        // Planificaciones Ejecución
        $closed_plans = Planification::where('status', 'CR')
            ->join('users as u', 'u.id', '=', 'planifications.user_id')
            ->when($isJefe, fn($query) => $query->whereIn('u.dependency_id', $dependencies))
            ->when($isEmpleado, fn($query) => $query->where('user_id', Auth::user()->id))
            ->count();

        // Planificaciones Anuladas
        $anuled_plans = Planification::where('status', 'AN')
            ->join('users as u', 'u.id', '=', 'planifications.user_id')
            ->when($isJefe, fn($query) => $query->whereIn('u.dependency_id', $dependencies))
            ->when($isEmpleado, fn($query) => $query->where('user_id', Auth::user()->id))
            ->count();

        // Actividades
        $db = env('DB_CONNECTION') == 'pgsql' ? 'INTEGER' : 'SIGNED';
        $activitiesQuery = Planification::select([
                'planifications.month',
                \DB::raw("CAST(SUM(CASE WHEN type = 'P' THEN 1 ELSE 0 END) AS $db) AS activities"),
                \DB::raw("CAST(SUM(CASE WHEN type = 'NP' THEN 1 ELSE 0 END) AS $db) AS noPlanActivities"),
            ])
            ->join('planification_details as pd', 'pd.planification_id', '=', 'planifications.id')
            ->join('users as u', 'u.id', '=', 'planifications.user_id')
            ->when($isJefe, fn($query) => $query->whereIn('u.dependency_id', $dependencies))
            ->when($isEmpleado, fn($query) => $query->where('planifications.user_id', Auth::user()->id))
            ->where('year', date('Y'))
            ->whereIn('status', ['AP', 'CR'])
            ->orderBy('month')
            ->groupBy('planifications.month')
            ->get()
            ->groupBy('month')
            ->toArray();
        
        $activities = [];
        for ($i = 1; $i <= 12; $i++) {
            $activities[] = $activitiesQuery[$i][0] ?? [];
        }

        // render view
        return inertia('Apps/Dashboard/Index',  compact(
            'users',
            'users_count',
            'roles_count',
            'permissions_count',
            'prepared_plans',
            'revised_plans',
            'approved_plans',
            'closed_plans',
            'anuled_plans',
            'activities',
        ));
    }
}
