<?php

namespace App\Http\Controllers;

use App\Http\Requests\Plan\StoreRequest;
use App\Models\Planification;
use Illuminate\Http\Request;
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
        $planifications = Planification::with(['user', 'details'])->where('user_id', $userId)->paginate($request->per_page ?? 10);

        return Inertia::render('Plan/Index', compact('planifications'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Plan/Create');
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
        return Inertia::render('Plan/Show', compact('planification', 'activities'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Planification $planification)
    {
        $activities = $planification->details;
        return Inertia::render('Plan/Edit', compact('planification', 'activities'));
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
        $planifications = Planification::with(['user', 'details'])->where('status', $status)->paginate($request->per_page ?? 10);

        return Inertia::render('Plan/Index', compact('planifications', 'process'));
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

        return Inertia::render('Plan/Process', compact('planification', 'activities', 'process'));
    }

    public function updateStatus(Request $request, Planification $planification)
    {
        $status = $request->input('status');
        $planification->status = $status;
        $planification->save();
        return to_route('planification.index')->with(['message' => 'Planificacion procesada correctamente!']);
    }

    public function executeList(Request $request)
    {
        $planifications = Planification::with(['user', 'details'])->where('status', 'AP')->paginate($request->per_page ?? 10);

        return Inertia::render('Plan/ExecuteList', compact('planifications'));
    }

    public function executeForm(Planification $planification)
    {
        if ($planification->status != 'AP') {
            abort(404);
        }

        $activities = $planification->details;
        return Inertia::render('Plan/Execute', compact('planification', 'activities'));
    }
}
