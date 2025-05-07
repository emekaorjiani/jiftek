<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function analytics()
    {
        return Inertia::render('admin/page'); // maps to pages/admin/page.tsx
    }
}
