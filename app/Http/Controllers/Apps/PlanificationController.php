<?php

namespace App\Http\Controllers\Apps;

use App\Http\Requests\Plan\StoreRequest;
use App\Models\Planification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Plan\ExecuteRequest;
use App\Models\Dependency;
use App\Models\PlanificationDetail;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlanificationController extends Controller
{
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        // Planificaciones
        $this->middleware('permission:planifications-access')->only('index');
        $this->middleware('permission:planifications-create')->only('create');
        $this->middleware('permission:planifications-show')->only('show');
        $this->middleware('permission:planifications-update')->only('edit');
        $this->middleware('permission:planifications-delete')->only('destroy');
        // Ejecutar
        $this->middleware('permission:planifications-execute-access')->only('executeList');
        $this->middleware('permission:planifications-execute')->only('executeForm');
        // Control de procesos
        $this->middleware('permission:control-review-access')->only('processList');
        $this->middleware('permission:control-review')->only('processForm');
        $this->middleware('permission:control-approve-access')->only('processList');
        $this->middleware('permission:control-approve')->only('processForm');
        $this->middleware('permission:control-close-access')->only('processList');
        $this->middleware('permission:control-close')->only('processForm');
        // Estadisticas
        $this->middleware('permission:statistics-individual-report')->only('individualReports');
        $this->middleware('permission:statistics-dependency-report')->only('dependencyReports');
        $this->middleware('permission:statistics-individual-indicator')->only('individualIndicators');
        $this->middleware('permission:statistics-dependency-indicator')->only('dependencyIndicators');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = Auth::user()->id;
        $isEmpleado = Auth::user()->hasRole('empleado');

        $planifications = Planification::with(['user', 'details'])
            ->select(['*', \DB::raw("CONCAT(month, '-', year) as period")])
            ->when($isEmpleado, fn($query) => $query->where('user_id', $userId))
            ->when($request->search, fn($query) => $query->where('month', 'like', '%'. $request->search . '%')->orWhere('year', 'like', '%'. $request->search . '%'))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Apps/Plan/Index', compact('planifications'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //? Calculos de periodos disponibles
        $actualMonth = date('n');
        $nextMonth = date('n', strtotime('+1 month'));

        $availableMonths = [];
        $isActualExist = Planification::where('month', $actualMonth)
            ->where('year', date('Y'))
            ->where('user_id', Auth::user()->id)
            ->where('status', '<>', 'AN')
            ->count() > 0;
        if (!$isActualExist) {
            $availableMonths[] = (integer) $actualMonth;
        }

        $isNextExist = Planification::where('month', $nextMonth)
            ->where('year', date('Y'))
            ->where('user_id', Auth::user()->id)
            ->where('status', '<>', 'AN')
            ->count() > 0;
        if (!$isNextExist) {
            $availableMonths[] = (integer) $nextMonth;
        }

        return Inertia::render('Apps/Plan/Create', compact('availableMonths'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('month', 'year', 'activities');
        $planification = Planification::create([
            'month' => $data['month'],
            'year' => $data['year'],
            'user_id' => Auth::user()->id
        ]);

        $activities = collect($data['activities']);
        $formatActivities = $activities->map(function($i) {
            $name =  array_pop($i);

            return [ 'name' => $name, 'days' => $i ];
        });

        $planification->details()->createMany($formatActivities);

        return to_route('planification.index')->with(['message' => 'Planificacion creada correctamente!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Planification $planification)
    {
        $activities = $planification->details()->where('type', 'P')->get();
        return Inertia::render('Apps/Plan/Show', compact('planification', 'activities'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Planification $planification)
    {
        //? Calculos de periodos disponibles
        $actualMonth = date('n');
        $nextMonth = date('n', strtotime('+1 month'));

        $availableMonths = [ $planification->month ];
        if ($planification->year == date('Y')) {
            // Periodo actual
            $isActualExist = Planification::where('month', $actualMonth)
                ->where('year', date('Y'))
                ->where('user_id', Auth::user()->id)
                ->where('status', '<>', 'AN')
                ->count() > 0;
            if (!$isActualExist) {
                $availableMonths[] = (integer) $actualMonth;
            }

            // Periodo siguiente
            $isNextExist = Planification::where('month', $actualMonth)
                ->where('year', date('Y'))
                ->where('user_id', Auth::user()->id)
                ->where('status', '<>', 'AN')
                ->count() > 0;
            if (!$isNextExist) {
                $availableMonths[] = (integer) $nextMonth;
            }
        }

        //? Actividades
        $activities = $planification->details;
        return Inertia::render('Apps/Plan/Edit', compact('planification', 'activities', 'availableMonths'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, Planification $planification)
    {
        $data = $request->only('month', 'year', 'activities');
        $planification->update([ 'month' => $data['month'], 'year' => $data['year'] ]);

        $activities = collect($data['activities']);
        $formatActivities = $activities->map(function($i) {
            $name =  array_pop($i);

            return [ 'name' => $name, 'days' => $i ];
        });

        $planification->details()->delete();
        $planification->details()->createMany($formatActivities);

        return to_route('planification.index')->with(['message' => 'Planificacion editada correctamente!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Planification $planification)
    {
        $planification->delete();
        return to_route('planification.index')->with(['message' => 'Planificacion eliminada correctamente!']);
    }

    public function processList(Request $request, $status)
    {
        $validStatuses = ['PR', 'RV', 'AP'];
        if (!in_array($status, $validStatuses)) {
            abort(404);
        }

        $processList = [
            'PR' => [
                'status' => 'RV',
                'label' => 'Revisar',
            ],
            'RV' => [
                'status' => 'AP',
                'label' => 'Aprobar',
            ],
            'AP' => [
                'status' => 'CR',
                'label' => 'Cerrar',
            ]
        ];
        $process = $processList[$status];

        $isJefe = Auth::user()->hasRole('jefe');
        $dependency = Dependency::where('user_id', Auth::user()->id)->first();
        $dependencies = $isJefe ? Dependency::where('id', $dependency ? $dependency->id : '')->orWhere('parent_id', $dependency ? $dependency->id : '')->get()->pluck('id') : [];

        $planifications = Planification::with(['user', 'details'])
            ->join('users as u', 'u.id', '=', 'planifications.user_id')
            ->select(['planifications.*', \DB::raw("CONCAT(month, '-', year) as period")])
            ->where('status', $status)
            ->when($isJefe, fn($query) => $query->whereIn('u.dependency_id', $dependencies))
            ->when($request->search, fn($query) => $query->where('month', 'like', '%'. $request->search . '%')->orWhere('year', 'like', '%'. $request->search . '%'))
            ->latest()
            ->paginate(10)->withQueryString();

        return Inertia::render('Apps/Plan/ProcessList', compact('planifications', 'process'));
    }

    public function processForm(Planification $planification, $status)
    {
        $validStatuses = ['RV', 'AP', 'CR'];
        if (!in_array($status, $validStatuses)) {
            abort(404);
        }

        $activities = $planification->details()->where('type', 'P')->get();
        $noPlanActivities = $status == 'CR' ? $planification->details()->where('type', 'NP')->get() : [];
        $process = [
            'status' => $status,
            'label' =>  Planification::STATUS[$status],
        ];

        return Inertia::render('Apps/Plan/Process', compact('planification', 'activities', 'process', 'noPlanActivities'));
    }

    public function updateStatus(Request $request, Planification $planification)
    {
        $oldStatus = $planification->status;
        $status = $request->input('status');
        $planification->status = $status;
        $planification->save();
        return to_route('planification.process-list', ['status' => $oldStatus])->with(['message' => 'Planificacion procesada correctamente!']);
    }

    public function executeList(Request $request)
    {
        $isEmpleado = Auth::user()->hasRole('empleado');

        $planifications = Planification::with(['user', 'details'])
            ->select(['*', \DB::raw("CONCAT(month, '-', year) as period")])
            ->where('status', 'AP')
            ->when($isEmpleado, fn($query) => $query->where('user_id', Auth::user()->id))
            ->when($request->search, fn($query) => $query->where('month', 'like', '%'. $request->search . '%')->orWhere('year', 'like', '%'. $request->search . '%'))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Apps/Plan/ExecuteList', compact('planifications'));
    }

    public function executeForm(Planification $planification)
    {
        if ($planification->status != 'AP') {
            abort(404);
        }

        $activities = $planification->details()->where('type', 'P')->get();
        $noPlanActivities = $planification->details()->where('type', 'NP')->get();
        return Inertia::render('Apps/Plan/Execute', compact('planification', 'activities', 'noPlanActivities'));
    }

    public function execute(ExecuteRequest $request, Planification $planification)
    {
        $data = $request->only('activities', 'noPlanActivities');

        $activities = collect($data['activities']);
        $noPlanActivities = collect($data['noPlanActivities']);

        // Actividades planificadas
        $formatActivities = $activities->map(function($i) {
            $id =  array_pop($i);

            return [ 'id' => $id, 'days_execute' => $i ];
        });

        foreach ($formatActivities as $data) {
            PlanificationDetail::where('id', $data['id'])->update([
                'days_execute' => $data['days_execute']
            ]);
        }

        // Actividades no planificadas
        $formatNoPlanActivities = $noPlanActivities->map(function($i) {
            $name =  array_pop($i);

            return [ 'name' => $name, 'days_execute' => $i, 'type' => 'NP' ];
        });

        $planification->details()->where('type', 'NP')->delete();
        $planification->details()->createMany($formatNoPlanActivities);        

        return to_route('planification.execute')->with(['message' => 'Planificacion ejecutada correctamente!']);
    }

    public function planificationPdf(Planification $planification)
    {
        $mes = $planification->month;
        $anio = $planification->year;
        $totalDays = date('t', mktime(0, 0, 0, $mes, 1, $anio));
        $days = [];
        $week = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

        for ($i = 1; $i <= $totalDays; $i++) {
            $dia = date('N', mktime(0, 0, 0, $mes, $i, $anio));
            $days[] = $week[$dia-1];
        }

        $activities = $planification->details()->where('type', 'P')->get();
        $noPlanActivities = $planification->details()->where('type', 'NP')->get();

        $pdf = Pdf::loadView('reports.planification', compact('planification', 'activities', 'noPlanActivities', 'days', 'totalDays'))
            ->setPaper('tabloid', 'landscape');
        return $pdf->stream("planificacion($mes-$anio).pdf");
        //return view('reports.planification', compact('planification', 'activities', 'noPlanActivities', 'days', 'totalDays'));
    }

    public function dependencyPdf(Dependency $dependency, $year, $month)
    {

        $planifications = Planification::with('details')
            ->join('users as u', 'u.id', 'planifications.user_id')
            ->select('planifications.id', 'name', 'last_name', 'status')
            ->whereIn('planifications.status', ['AP', 'CR'])
            ->where('u.dependency_id', $dependency->id)
            ->where('year', $year)
            ->where('month', $month)
            ->get();
        
        $formatPlanifications = [];
        foreach($planifications as $planification){

            $daysPlan = [];
            $daysExec = [];
            foreach($planification->details()->where('type', 'P')->get() as $activity){
                $days = array_filter($activity->days);
                $days = array_keys($days);
                $daysPlan = array_merge($daysPlan, $days);

                $days = array_filter($activity->days_execute);
                $days = array_keys($days);
                $daysExec = array_merge($daysExec, $days);
            }

            $formatPlanifications[] = [
                'id' => $planification->id,
                'name'       => "{$planification->name} {$planification->last_name}",
                'status'     => ['AP' => 'Aprobado', 'CR' => 'Cerrado'][$planification->status],
                'activities' => $planification->details()->where('type', 'P')->count(),
                'noPlanActivities' => $planification->details()->where('type', 'NP')->count(),
                'date_start' => reset($daysPlan)."/$month/$year",
                'date_end' => end($daysPlan)."/$month/$year",
                'real_date_start' => $daysExec ? reset($daysExec)."/$month/$year" : '',
                'real_date_end' => $daysExec ? end($daysExec)."/$month/$year" : '',
                'days' => count($daysPlan),
                'real_days' => count($daysExec),
            ];
        }

        $pdf = Pdf::loadView('reports.dependency-report', compact('dependency', 'month', 'year', 'formatPlanifications'))
            ->setPaper('a4', 'landscape');
        return $pdf->stream("dependencia($month-$year).pdf");
        // return view('reports.dependency-report', compact('dependency', 'month', 'year', 'formatPlanifications'));
    }

    public function individualReports()
    {
        $years = Planification::select('year as value', 'year as label')
            ->whereIn('status', ['AP', 'CR'])
            ->groupBy('year')
            ->orderBy('year', 'DESC')
            ->get();
        
        $isJefe = Auth::user()->hasRole('jefe');
        $dependency = Dependency::where('user_id', Auth::user()->id)->first();
        $dependencies = $isJefe ? Dependency::where('id', $dependency ? $dependency->id : '')->orWhere('parent_id', $dependency ? $dependency->id : '')->get()->pluck('id') : [];

        $users = User::select([
                'id as value',
                \DB::raw("CONCAT(name, ' ', last_name) as label")
            ])
            ->when($isJefe, fn($query) => $query->whereIn('dependency_id', $dependencies))
            ->get();

        return Inertia::render('Apps/Plan/IndividualReport', compact('years', 'users'));
    }

    public function dependencyReports()
    {
        $years = Planification::select('year as value', 'year as label')
            ->whereIn('status', ['AP', 'CR'])
            ->groupBy('year')
            ->orderBy('year', 'DESC')
            ->get();

        $isJefe = Auth::user()->hasRole('jefe');
        $dependency = Dependency::where('user_id', Auth::user()->id)->first();
        $dependencies = $isJefe ? Dependency::where('id', $dependency ? $dependency->id : '')->orWhere('parent_id', $dependency ? $dependency->id : '')->get()->pluck('id') : [];

        $dependencies = Dependency::select([
                'id as value',
                'name as label'
            ])
            ->when($isJefe, fn($query) => $query->whereIn('id', $dependencies))
            ->get();

        return Inertia::render('Apps/Plan/DependencyReport', compact('years', 'dependencies'));
    }

    public function getPlan(Request $request)
    {
        $data = $request->only('year', 'month', 'user');

        $plan = Planification::where('year', $data['year'])
            ->where('month', $data['month'])
            ->where('user_id', $data['user'])
            ->whereIn('status', ['AP', 'CR'])
            ->first();

        return response()->json(['data' => $plan ? $plan->id : false]);
    }

    public function getIndicator(Request $request)
    {
        $data = $request->only('year', 'month', 'user');

        $plan = Planification::where('year', $data['year'])
            ->where('month', $data['month'])
            ->where('user_id', $data['user'])
            ->whereIn('status', ['AP', 'CR'])
            ->first();
        
        if (empty($plan)) {
            return response()->json(false);
        }

        $porcent = [];
        $name = [];
        foreach($plan->details()->where('type', 'P')->get() as $activity){
            $days = array_filter($activity->days);
            $days = array_keys($days);

            $daysExec = array_filter($activity->days_execute);
            $daysExec = array_keys($daysExec);

            $name[] = $activity->name;
            $porcent[] = (float) number_format(((count($daysExec)/count($days))*100), 1, '.', ' ');
        }
        
        $response = [
            'countActivities' => [
                $plan->details()->where('type', 'P')->count(),
                $plan->details()->where('type', 'NP')->count()
            ],
            'names' => $name,
            'porcents' => $porcent
        ];

        return response()->json($plan ? $response : false);
    }

    public function getIndicatorDependency(Request $request)
    {
        $data = $request->only('year', 'month', 'dependency');

        $planifications = Planification::with('details')
            ->join('users as u', 'u.id', 'planifications.user_id')
            ->select('planifications.id', 'name', 'last_name', 'status')
            ->whereIn('planifications.status', ['AP', 'CR'])
            ->where('u.dependency_id', $data['dependency'])
            ->where('year', $data['year'])
            ->where('month', $data['month'])
            ->get();

        if (count($planifications) == 0) {
            return response()->json(false);
        }

        $planCount = 0;
        $noPlanCount = 0;
        $name = [];
        $porcent = [];
        foreach($planifications as $planification){

            $daysPlan = [];
            $daysExec = [];
            foreach($planification->details()->where('type', 'P')->get() as $activity){
                $days = array_filter($activity->days);
                $days = array_keys($days);
                $daysPlan = array_merge($daysPlan, $days);

                $days = array_filter($activity->days_execute);
                $days = array_keys($days);
                $daysExec = array_merge($daysExec, $days);
            }

            $planCount += $planification->details()->where('type', 'P')->count();
            $noPlanCount += $planification->details()->where('type', 'NP')->count();
            $name[] = "{$planification->name} {$planification->last_name}";
            $porcent[] = (float) number_format(((count($daysExec)/count($daysPlan))*100), 1, '.', ' ');
        }
        
        $response = [
            'countActivities' => [
                $planCount,
                $noPlanCount
            ],
            'names' => $name,
            'porcents' => $porcent
        ];

        return response()->json($planifications ? $response : false);
    }

    public function individualIndicators()
    {
        $years = Planification::select('year as value', 'year as label')
            ->whereIn('status', ['AP', 'CR'])
            ->groupBy('year')
            ->orderBy('year', 'DESC')
            ->get();
        
        $isJefe = Auth::user()->hasRole('jefe');
        $dependency = Dependency::where('user_id', Auth::user()->id)->first();
        $dependencies = $isJefe ? Dependency::where('id', $dependency ? $dependency->id : '')->orWhere('parent_id', $dependency ? $dependency->id : '')->get()->pluck('id') : [];

        $users = User::select([
                'id as value',
                \DB::raw("CONCAT(name, ' ', last_name) as label")
            ])
            ->when($isJefe, fn($query) => $query->whereIn('dependency_id', $dependencies))
            ->get();

        return Inertia::render('Apps/Plan/IndividualIndicator', compact('years', 'users'));
    }

    public function dependencyIndicators()
    {
        $years = Planification::select('year as value', 'year as label')
            ->whereIn('status', ['AP', 'CR'])
            ->groupBy('year')
            ->orderBy('year', 'DESC')
            ->get();

        $isJefe = Auth::user()->hasRole('jefe');
        $dependency = Dependency::where('user_id', Auth::user()->id)->first();
        $dependencies = $isJefe ? Dependency::where('id', $dependency ? $dependency->id : '')->orWhere('parent_id', $dependency ? $dependency->id : '')->get()->pluck('id') : [];

        $dependencies = Dependency::select([
                'id as value',
                'name as label'
            ])
            ->when($isJefe, fn($query) => $query->whereIn('id', $dependencies))
            ->get();

        return Inertia::render('Apps/Plan/DependencyIndicator', compact('years', 'dependencies'));
    }

}
