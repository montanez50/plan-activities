<?php

namespace Tests\Feature\Auth;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// tests/Feature/Auth/RegistrationTest.php

/*beforeEach(function () {
    $this->useRefreshDatabase();
});*/

it('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

it('new users can register', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    expect($this->user())->toBeAuthenticated();
    $response->assertRedirect(RouteServiceProvider::HOME);
});
