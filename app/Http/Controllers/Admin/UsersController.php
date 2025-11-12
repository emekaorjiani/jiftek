<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of users.
     * Returns Blade view.
     */
    public function index(Request $request)
    {
        $users = User::with('roles')->latest()->paginate(15);

        return view('admin.users.index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new user.
     * Returns Blade view.
     */
    public function create()
    {
        return view('admin.users.create');
    }

    /**
     * Show the form for editing an existing user.
     * Returns Blade view.
     */
    public function edit($id)
    {
        $user = User::with('roles')->findOrFail($id);

        return view('admin.users.edit', [
            'user' => $user,
        ]);
    }

    /**
     * Display user profile.
     * Returns Blade view.
     */
    public function profile($id)
    {
        $user = User::with('roles')->findOrFail($id);

        return view('admin.users.profile', [
            'user' => $user,
        ]);
    }
}
