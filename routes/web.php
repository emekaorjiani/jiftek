<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FrontPagesController;


Route::get('/', [FrontPagesController::class, 'index'])->name('home');
Route::get('/about', [FrontPagesController::class, 'about'])->name('about');
Route::get('/solutions', [FrontPagesController::class, 'solutions'])->name('solutions');
Route::get('/services', [FrontPagesController::class, 'services'])->name('services');
Route::get('/services/{slug}', [FrontPagesController::class, 'showService'])->name('services.show');
Route::get('/insights', [FrontPagesController::class, 'insights'])->name('insights');
Route::get('/insights/{slug}', [FrontPagesController::class, 'showInsight'])->name('insights.show');
Route::get('/case-studies', [FrontPagesController::class, 'caseStudies'])->name('case-studies');
Route::get('/case-studies/{slug}', [FrontPagesController::class, 'showCaseStudy'])->name('case-studies.show');
Route::get('/testimonials', [FrontPagesController::class, 'testimonials'])->name('testimonials');
Route::get('/testimonials/{slug}', [FrontPagesController::class, 'showTestimonial'])->name('testimonials.show');
Route::get('/contact', [FrontPagesController::class, 'contact'])->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
