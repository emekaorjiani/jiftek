<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * UserSeeder
 *
 * Seeds default users including admin and editor accounts.
 * Admin user is created with full access to manage the CMS.
 */
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create admin role
        $adminRole = Role::where('name', 'admin')->first();
        $editorRole = Role::where('name', 'editor')->first();

        // Create admin user (only if doesn't exist)
        $admin = User::firstOrCreate(
            ['email' => 'admin@jiftek.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Assign admin role if not already assigned
        if ($adminRole && !$admin->roles()->where('name', 'admin')->exists()) {
            $admin->roles()->attach($adminRole);
        }

        // Create editor user (only if doesn't exist)
        $editor = User::firstOrCreate(
            ['email' => 'editor@jiftek.com'],
            [
                'name' => 'Editor User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Assign editor role if not already assigned
        if ($editorRole && !$editor->roles()->where('name', 'editor')->exists()) {
            $editor->roles()->attach($editorRole);
        }

        $this->command->info('Users seeded successfully!');
        $this->command->info('Admin: admin@jiftek.com / password');
        $this->command->info('Editor: editor@jiftek.com / password');
    }
}
