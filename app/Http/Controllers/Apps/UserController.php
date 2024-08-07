<?php

namespace App\Http\Controllers\Apps;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\Dependency;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('permission:users-access')->only('index');
        $this->middleware('permission:users-create')->only('create');
        $this->middleware('permission:users-update')->only('edit');
        $this->middleware('permission:users-delete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get all users data
        $users = User::query()
            ->with(['roles' => function($query){
                $query->select('name')->with(['permissions' => function($query){
                    $query->select('name');
                }]);
            }, 'dependency'])
            ->when($request->search, fn($query) => $query->where('users.name', 'like', '%'. $request->search . '%'))
            ->latest()
            ->paginate(10)->withQueryString();

        // render view
        return inertia('Apps/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // get all roles data
        $roles = Role::query()
            ->with('permissions')
            ->orderBy('name')
            ->get();

        // get all dependencies
        $dependencies = Dependency::select('id as value', 'name as label')->get();

        // render view
        return inertia('Apps/Users/Create', compact('roles', 'dependencies'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'dependency' => ['required', 'array'],
        ]);

        // create new user data
        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'dependency_id' => $request->dependency['value'],
        ]);

         // assign a role to user
        $user->assignRole($request->rolesData);

        // render view
        return to_route('apps.users.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // get all roles data
        $roles = Role::query()
            ->with('permissions')
            ->orderBy('name')
            ->get();

        // load relationship
        $user->load(['roles' => function($query){
                $query->select('id', 'name');
            },
            'dependency'
        ]);

        // get all dependencies
        $dependencies = Dependency::select('id as value', 'name as label')->get();

        // render view
        return inertia('Apps/Users/Edit', compact('user', 'roles', 'dependencies'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'dependency' => ['required', 'array'],
        ]);

        // update user data by id
        $user->update([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'dependency_id' => $request->dependency['value'],
        ]);

        // do it when password is not empty string or null
        if($request->password !== '' || $request->password !== null)
            // update user password
            $user->update([
                'password' => bcrypt($request->password),
            ]);

       // sync user roles
       $user->syncRoles($request->rolesData);

       // render view
       return to_route('apps.users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // delete user data by id
        $user->delete();

        // render view
        return back();
    }
}
