<?php

// tests/Feature/Auth/AuthenticationTest.php

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/*beforeEach(function () {
    $this->useRefreshDatabase();
});*/

it('login screen can be rendered', function () {
    $this->get('/login')->assertStatus(200);

    // $response->assertStatus(200);
});

it('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    expect(auth()->check())->toBeTrue();
    $response->assertRedirect(RouteServiceProvider::HOME);
});

it('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    expect(auth()->check())->toBeFalse();
});

it('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    expect(auth()->check())->toBeFalse();
    $response->assertRedirect('/');
});