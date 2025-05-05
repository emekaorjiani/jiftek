<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FrontPagesController;


Route::get('/', [FrontPagesController::class, 'index'])->name('home');
// Route::get('/solution', [FrontPagesController::class, 'solution'])->name('about');
Route::get('/services', [FrontPagesController::class, 'service'])->name('contact');
Route::get('/about', [FrontPagesController::class, 'about'])->name('contact');
Route::get('/insights', [FrontPagesController::class, 'insight'])->name('contact');
Route::get('/contact', [FrontPagesController::class, 'contact'])->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
