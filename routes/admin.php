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
    // Page content management routes
    Route::get('/home', [ContentController::class, 'home'])->name('home');
    Route::put('/home', [ContentController::class, 'updateHome'])->name('home.update');

    Route::get('/about', [ContentController::class, 'about'])->name('about');
    Route::put('/about', [ContentController::class, 'updateAbout'])->name('about.update');

    Route::get('/solutions', [ContentController::class, 'solutions'])->name('solutions');
    Route::put('/solutions', [ContentController::class, 'updateSolutions'])->name('solutions.update');

    // Services page content management (for the services page itself)
    Route::get('/services', [ContentController::class, 'services'])->name('services');
    Route::put('/services', [ContentController::class, 'updateServices'])->name('services.update');

    // Services management routes (for managing individual services)
    Route::get('/services/list', [ContentController::class, 'servicesList'])->name('services.list');
    Route::get('/services/new', [ContentController::class, 'createService'])->name('services.create');
    Route::post('/services/store', [ContentController::class, 'storeService'])->name('services.store');
    Route::get('/services/{id}/edit', [ContentController::class, 'editService'])->name('services.edit');
    Route::put('/services/{id}', [ContentController::class, 'updateService'])->name('services.update');
    Route::delete('/services/{id}', [ContentController::class, 'destroyService'])->name('services.destroy');

    Route::get('/contact', [ContentController::class, 'contact'])->name('contact');
    Route::put('/contact', [ContentController::class, 'updateContact'])->name('contact.update');

    // Insights management routes
    Route::get('/insights', [ContentController::class, 'insights'])->name('insights');
    Route::get('/insights/new', [ContentController::class, 'createInsight'])->name('insights.create');
    Route::post('/insights', [ContentController::class, 'storeInsight'])->name('insights.store');
    Route::get('/insights/{id}/edit', [ContentController::class, 'editInsight'])->name('insights.edit');
    Route::put('/insights/{id}', [ContentController::class, 'updateInsight'])->name('insights.update');
    Route::delete('/insights/{id}', [ContentController::class, 'destroyInsight'])->name('insights.destroy');

    // Team members management routes
    Route::get('/team-members', [ContentController::class, 'teamMembers'])->name('team-members');
    Route::get('/team-members/new', [ContentController::class, 'createTeamMember'])->name('team-members.create');
    Route::post('/team-members/store', [ContentController::class, 'storeTeamMember'])->name('team-members.store');
    Route::get('/team-members/{id}/edit', [ContentController::class, 'editTeamMember'])->name('team-members.edit');
    Route::put('/team-members/{id}', [ContentController::class, 'updateTeamMember'])->name('team-members.update');
    Route::delete('/team-members/{id}', [ContentController::class, 'destroyTeamMember'])->name('team-members.destroy');

    // Testimonials/case studies management routes
    Route::get('/testimonials', [ContentController::class, 'testimonials'])->name('testimonials');
    Route::get('/testimonials/new', [ContentController::class, 'createTestimonial'])->name('testimonials.create');
    Route::post('/testimonials/store', [ContentController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::get('/testimonials/{id}/edit', [ContentController::class, 'editTestimonial'])->name('testimonials.edit');
    Route::put('/testimonials/{id}', [ContentController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{id}', [ContentController::class, 'destroyTestimonial'])->name('testimonials.destroy');

    // Partners/company logos management routes
    Route::get('/partners', [ContentController::class, 'partners'])->name('partners');
    Route::get('/partners/new', [ContentController::class, 'createPartner'])->name('partners.create');
    Route::post('/partners/store', [ContentController::class, 'storePartner'])->name('partners.store');
    Route::get('/partners/{id}/edit', [ContentController::class, 'editPartner'])->name('partners.edit');
    Route::put('/partners/{id}', [ContentController::class, 'updatePartner'])->name('partners.update');
    Route::delete('/partners/{id}', [ContentController::class, 'destroyPartner'])->name('partners.destroy');

    // Case studies management routes
    Route::get('/case-studies', [ContentController::class, 'caseStudies'])->name('case-studies');
    Route::get('/case-studies/new', [ContentController::class, 'createCaseStudy'])->name('case-studies.create');
    Route::post('/case-studies/store', [ContentController::class, 'storeCaseStudy'])->name('case-studies.store');
    Route::get('/case-studies/{id}/edit', [ContentController::class, 'editCaseStudy'])->name('case-studies.edit');
    Route::put('/case-studies/{id}', [ContentController::class, 'updateCaseStudy'])->name('case-studies.update');
    Route::delete('/case-studies/{id}', [ContentController::class, 'destroyCaseStudy'])->name('case-studies.destroy');
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
