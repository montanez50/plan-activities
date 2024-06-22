<?php

use App\Http\Controllers\Apps\DashboardController;
use App\Http\Controllers\Apps\DependencyController;
use App\Http\Controllers\Apps\PermissionController;
use App\Http\Controllers\Apps\ProfileController;
use App\Http\Controllers\Apps\RoleController;
use App\Http\Controllers\Apps\UserController;
use App\Http\Controllers\Apps\PlanificationController;
use App\Http\Controllers\Apps\SupportController;
use App\Models\Dependency;
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
    // dependency route
    Route::resource('/dependencies', DependencyController::class);
    // Alerts
    Route::get('/dependency/{dependency}/alert', [DependencyController::class, 'alertForm'])->name('alert.form');
    Route::post('/dependency/{dependency}/alert', [DependencyController::class, 'alertPost'])->name('alert.post');
});
Route::prefix('planification')->middleware('auth')->group(function () {
    // Reportes
    // Individual PDF
    Route::get('/{planification}/pdf', [PlanificationController::class, 'planificationPdf'])->name('planification.pdf');
    Route::get('/individual-reports', [PlanificationController::class, 'individualReports'])->name('planification.invidual.reports');
    // Dependency PDF
    Route::get('/dependecy-reports', [PlanificationController::class, 'dependencyReports'])->name('planification.dependecy.reports');
    Route::get('/dependecy-report/{dependency}/{year}/{month}', [PlanificationController::class, 'dependencyPdf'])->name('planification.dependecy.report');
    // Indicators
    Route::get('/individual-indicators', [PlanificationController::class, 'individualIndicators'])->name('planification.invidual.indicators');
    Route::get('/dependency-indicators', [PlanificationController::class, 'dependencyIndicators'])->name('planification.dependecy.indicators');
    // methods
    Route::post('/get', [PlanificationController::class, 'getPlan'])->name('planification.get');
    Route::post('/indicator', [PlanificationController::class, 'getIndicator'])->name('planification.indicator');
    Route::post('/indicator-dependency', [PlanificationController::class, 'getIndicatorDependency'])->name('planification.indicator.dep');
    // Execute
    Route::get('/process/execute', [PlanificationController::class, 'executeList'])->name('planification.execute');
    Route::get('/process/execute/{planification}', [PlanificationController::class, 'executeForm'])->name('planification.executeForm');
    Route::post('/process/execute/{planification}', [PlanificationController::class, 'execute'])->name('planification.executePlan');
    // CRUD
    Route::get('list', [PlanificationController::class, 'index'])->name('planification.index');
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

Route::get('/our_backup_database', [SupportController::class, 'backupDatabase'])->name('backup.atabase');

require __DIR__.'/auth.php';
