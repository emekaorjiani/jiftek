<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UsersController;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');
    Route::get('/messages', [MessagesController::class, 'index'])->name('messages');
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::get('/users', [UsersController::class, 'index'])->name('users');
});

Route::prefix('admin/content')->name('admin.content.')->group(function () {
    Route::get('/home', [ContentController::class, 'home'])->name('home');
    Route::get('/about', [ContentController::class, 'about'])->name('about');
    Route::get('/solutions', [ContentController::class, 'solutions'])->name('solutions');
    Route::get('/services', [ContentController::class, 'services'])->name('services');
    Route::get('/insights', [ContentController::class, 'insights'])->name('insights');
    Route::get('/contact', [ContentController::class, 'contact'])->name('contact');
});

Route::prefix('admin/users')->name('admin.users.')->group(function () {
    Route::get('/', [UsersController::class, 'index'])->name('index');
    Route::get('/create', [UsersController::class, 'create'])->name('create');
    Route::get('/{id}/edit', [UsersController::class, 'edit'])->name('edit');
    Route::get('/{id}/profile', [UsersController::class, 'profile'])->name('profile');
});


Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
// Route::get?
});