<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;

class AnalyticsController
{
    public function index()
    {
        return Inertia::render('admin/analytics/page');
    }
}
