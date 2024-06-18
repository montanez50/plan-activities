<?php

namespace App\Http\Controllers\Apps;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\Planification;
use Spatie\Permission\Models\Permission;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    // TODO Hacer dashboard por roles
    public function __invoke(Request $request)
    {
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
        $prepared_plans = Planification::where('status', 'PR')->count();

        // Planificaciones Revisadas
        $revised_plans = Planification::where('status', 'RV')->count();

        // Planificaciones Ejecución
        $approved_plans = Planification::where('status', 'AP')->count();

        // Planificaciones Ejecución
        $closed_plans = Planification::where('status', 'CR')->count();

        // Planificaciones Anuladas
        $anuled_plans = Planification::where('status', 'AN')->count();

        // Actividades
        $activitiesQuery = Planification::select([
                'planifications.month',
                \DB::raw('CAST(SUM(IF(type = "P", 1, 0)) as SIGNED) as activities'),
                \DB::raw('CAST(SUM(IF(type = "NP", 1, 0)) as SIGNED) as noPlanActivities'),
            ])
            ->join('planification_details as pd', 'pd.planification_id', '=', 'planifications.id')
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
