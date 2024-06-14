<?php

namespace App\Http\Controllers\Apps;

use App\Http\Requests\Plan\StoreRequest;
use App\Models\Planification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Plan\ExecuteRequest;
use App\Models\PlanificationDetail;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlanificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = Auth::user()->id;
        $planifications = Planification::with(['user', 'details'])
            ->where('user_id', $userId)
            ->when($request->search, fn($query) => $query->where('period', 'like', '%'. $request->search . '%'))
            ->latest()
            ->paginate(10)->withQueryString();

        return Inertia::render('Apps/Plan/Index', compact('planifications'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // TODO: crear parametros para los periodos
        return Inertia::render('Apps/Plan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('period', 'activities');
        $planification = Planification::create(['period' => $data['period'], 'user_id' => Auth::user()->id]);

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
        $activities = $planification->details;
        return Inertia::render('Apps/Plan/Show', compact('planification', 'activities'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Planification $planification)
    {
        $activities = $planification->details;
        return Inertia::render('Apps/Plan/Edit', compact('planification', 'activities'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, Planification $planification)
    {
        $data = $request->only('period', 'activities');
        $planification->update([ 'period' => $data['period'] ]);

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
        $planifications = Planification::with(['user', 'details'])
            ->where('status', $status)
            ->when($request->search, fn($query) => $query->where('period', 'like', '%'. $request->search . '%'))
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

        $activities = $planification->details;
        $process = [
            'status' => $status,
            'label' =>  Planification::STATUS[$status],
        ];

        return Inertia::render('Apps/Plan/Process', compact('planification', 'activities', 'process'));
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
        $planifications = Planification::with(['user', 'details'])
            ->where('status', 'AP')
            ->when($request->search, fn($query) => $query->where('period', 'like', '%'. $request->search . '%'))
            ->latest()
            ->paginate(10)->withQueryString();

        return Inertia::render('Apps/Plan/ExecuteList', compact('planifications'));
    }

    public function executeForm(Planification $planification)
    {
        if ($planification->status != 'AP') {
            abort(404);
        }

        $activities = $planification->details;
        return Inertia::render('Apps/Plan/Execute', compact('planification', 'activities'));
    }

    public function execute(ExecuteRequest $request, Planification $planification)
    {
        $data = $request->only('period', 'activities');

        $activities = collect($data['activities']);
        $formatActivities = $activities->map(function($i) {
            $id =  array_pop($i);

            return [ 'id' => $id, 'days_execute' => $i ];
        });

        foreach ($formatActivities as $data) {
            PlanificationDetail::where('id', $data['id'])->update([
                'days_execute' => $data['days_execute']
            ]);
        }

        return to_route('planification.execute')->with(['message' => 'Planificacion editada correctamente!']);
    }
}
