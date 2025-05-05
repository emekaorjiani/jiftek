<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@jiftek.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Create editor user
        $editor = User::create([
            'name' => 'Editor User',
            'email' => 'editor@jiftek.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Assign roles to users
        $admin->roles()->attach(\App\Models\Role::where('name', 'admin')->first());
        $editor->roles()->attach(\App\Models\Role::where('name', 'editor')->first());
    }
}
