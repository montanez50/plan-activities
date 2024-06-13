<?php

use App\Http\Controllers\Apps\DashboardController;
use App\Http\Controllers\Apps\PermissionController;
use App\Http\Controllers\Apps\ProfileController;
use App\Http\Controllers\Apps\RoleController;
use App\Http\Controllers\Apps\UserController;
use App\Http\Controllers\Apps\PlanificationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// route login page
Route::get('/', fn() => inertia('Auth/Login'));

// route apps group
Route::group(['as' => 'apps.', 'prefix' => 'apps', 'middleware' => ['auth']], function(){
    // dashboard route
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    // permission route
    Route::get('/permissions', PermissionController::class)->name('permissions.index');
    // role route
    Route::resource('/roles', RoleController::class);
    // user route
    Route::resource('/users', UserController::class);
    // profile route
    Route::controller(ProfileController::class)->as('profile.')->group(function(){
        Route::get('/profile', 'index');
        Route::put('/profile/{user}', 'update');
    });
});

Route::prefix('planification')->middleware('auth')->group(function () {
    // Ejecutar
    Route::get('/process/execute', [PlanificationController::class, 'executeList'])->name('planification.execute');
    Route::get('/process/execute/{planification}', [PlanificationController::class, 'executeForm'])->name('planification.executeForm');
    Route::post('/process/execute/{planification}', [PlanificationController::class, 'execute'])->name('planification.executePlan');
    // CRUD
    Route::get('/', [PlanificationController::class, 'index'])->name('planification.index');
    Route::get('create', [PlanificationController::class, 'create'])->name('planification.create');
    Route::post('/', [PlanificationController::class, 'store'])->name('planification.store');
    Route::get('/{planification}', [PlanificationController::class, 'show'])->name('planification.show');
    Route::get('/{planification}/edit', [PlanificationController::class, 'edit'])->name('planification.edit');
    Route::post('/{planification}', [PlanificationController::class, 'update'])->name('planification.update');
    Route::delete('/{planification}', [PlanificationController::class, 'destroy'])->name('planification.destroy');
    // Procesos aprobatorios
    Route::get('/process-list/{status}', [PlanificationController::class, 'processList'])->name('planification.process-list');
    Route::get('/process/{planification}/{status}', [PlanificationController::class, 'processForm'])->name('planification.process');
    Route::post('/process/{planification}', [PlanificationController::class, 'updateStatus'])->name('planification.update-status');
});

require __DIR__.'/auth.php';
