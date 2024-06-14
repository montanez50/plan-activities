<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Requests\DependencyRequest;
use App\Models\Dependency;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DependencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get all dependencies data
        $dependencies = Dependency::query()
            ->with('user')
            ->when($request->search, fn($query) => $query->where('name', 'like', '%'. $request->search . '%'))
            ->latest()
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
            ->whereNull('parent_id')
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
            ->whereNull('parent_id')
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

}
