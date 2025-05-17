<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FrontPagesController;


Route::get('/', [FrontPagesController::class, 'index'])->name('home');
Route::get('/about', [FrontPagesController::class, 'about'])->name('about');
Route::get('/solutions', [FrontPagesController::class, 'solutions'])->name('solutions');
Route::get('/services', [FrontPagesController::class, 'services'])->name('services');
Route::get('/insights', [FrontPagesController::class, 'insights'])->name('insights');
Route::get('/contact', [FrontPagesController::class, 'contact'])->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/page');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';