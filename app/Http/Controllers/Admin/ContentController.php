<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    public function home()
    {
        return inertia('admin/content/home/page');
    }
    public function about()
    {
        return inertia('admin/content/about/page');
    }
    public function solutions()
    {
        return inertia('admin/content/solutions/page');
    }
    public function services()
    {
        return inertia('admin/content/services/page');
    }
    public function insights()
    {
        return inertia('admin/content/insights/page');
    }
    public function contact()
    {
        return inertia('admin/content/contact/page');
    }
}
