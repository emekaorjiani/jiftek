<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UsersController;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');
    Route::get('/content', [ContentController::class, 'index'])->name('content');
    Route::get('/messages', [MessagesController::class, 'index'])->name('messages');
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::get('/users', [UsersController::class, 'index'])->name('users');
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