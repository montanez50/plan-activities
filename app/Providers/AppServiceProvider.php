<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
use Opcodes\LogViewer\Facades\LogViewer;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if(config('app.env') === 'production') {
            \URL::forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        if(config('app.env') === 'production') {
            $this->app['request']?->server?->set('HTTPS', true);
        }

        LogViewer::auth(function ($request) {
            return $request->user() && $request->user()->hasRole('administrador');
        });
    }
}
