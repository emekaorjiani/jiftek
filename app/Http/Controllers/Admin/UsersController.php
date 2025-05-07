<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        return inertia('admin/users/loading');
    }
    public function create()
    {
        return inertia('admin/users/page');
    }
}
