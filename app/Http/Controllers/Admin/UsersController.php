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
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,id',
            'email_verified' => 'nullable|boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'email_verified_at' => $request->has('email_verified') ? now() : null,
        ]);

        if (isset($validated['roles'])) {
            $user->roles()->sync($validated['roles']);
        }

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    /**
     * Update an existing user.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,id',
            'email_verified' => 'nullable|boolean',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        
        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }
        
        if ($request->has('email_verified')) {
            $user->email_verified_at = now();
        } elseif ($user->email_verified_at && !$request->has('email_verified')) {
            $user->email_verified_at = null;
        }
        
        $user->save();

        if (isset($validated['roles'])) {
            $user->roles()->sync($validated['roles']);
        } else {
            $user->roles()->detach();
        }

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
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
