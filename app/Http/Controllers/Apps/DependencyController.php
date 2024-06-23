<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Requests\DependencyRequest;
use App\Models\ConfigAlert;
use App\Models\Dependency;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DependencyController extends Controller
{
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        // Dependency
        $this->middleware('permission:dependencies-access')->only('index');
        $this->middleware('permission:dependencies-create')->only('create');
        $this->middleware('permission:dependencies-update')->only('edit');
        $this->middleware('permission:dependencies-delete')->only('destroy');
        // Alert
        $this->middleware('permission:control-alert')->only('alertForm');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get all dependencies data
        $dependencies = Dependency::query()
            ->with('user')
            ->leftJoin('dependencies as pd', 'pd.id', '=', 'dependencies.parent_id')
            ->select('dependencies.*', 'pd.name as parent_name')
            ->when($request->search, fn($query) => $query->where('name', 'like', '%'. $request->search . '%'))
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('Apps/Dependencies/Index', compact('dependencies'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $responsibleUsers = Dependency::select('user_id')
            ->whereNotNull('user_id')
            ->get()
            ->pluck('user_id');
        $users = User::select([
                'id as value',
                \DB::raw('CONCAT(name, " ", last_name) as label')
            ])
            ->whereNotIn('id', $responsibleUsers)
            ->get();

        $parentDependencies = Dependency::select([
                'id as value',
                'name as label'
            ])
            // ->whereNull('parent_id')
            ->get();

        return Inertia::render('Apps/Dependencies/Create', compact('users', 'parentDependencies'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DependencyRequest $request)
    {
        Dependency::create([
            'name'          => $request->name,
            'internal_code' => $request->internal_code,
            'user_id'       => $request->user_id,
            'parent_id'     => $request->dependency_id,
        ]);

        return to_route('apps.dependencies.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dependency $dependency)
    {
        $responsibleUsers = Dependency::select('user_id')
            ->whereNotNull('user_id')
            ->where('user_id', '<>', $dependency->user_id)
            ->get()
            ->pluck('user_id');
        $users = User::select([
                'id as value',
                \DB::raw('CONCAT(name, " ", last_name) as label')
            ])
            ->whereNotIn('id', $responsibleUsers)
            ->get();

        $parentDependencies = Dependency::select([
                'id as value',
                'name as label'
            ])
            // ->whereNull('parent_id')
            ->where('id', '<>', $dependency->id)
            ->get();

        return Inertia::render('Apps/Dependencies/Edit', compact('dependency', 'users', 'parentDependencies'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DependencyRequest $request, Dependency $dependency)
    {
        $dependency->update([
            'name'          => $request->name,
            'internal_code' => $request->internal_code,
            'user_id'       => $request->user_id,
            'parent_id'     => $request->dependency_id,
        ]);

        return to_route('apps.dependencies.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dependency $dependency)
    {
        $dependency->delete();
        return back();
    }

    public function alertForm(Dependency $dependency)
    {
        $config = ConfigAlert::where('dependency_id', $dependency->id)->first();
        return Inertia::render('Apps/Dependencies/Alert', compact('config', 'dependency'));
    }

    public function alertPost(Request $request, Dependency $dependency)
    {
        ConfigAlert::updateOrCreate([ 'dependency_id' => $dependency->id ], $request->all());

        if(auth()->user()->hasRole('administrador')) {
            return to_route('apps.dependencies.index');
        }

        return redirect()->back();
    }

}
