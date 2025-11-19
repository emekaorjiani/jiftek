<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'manage_users' => 'Manage users and their roles',
            'manage_content' => 'Manage website content',
            'manage_settings' => 'Manage website settings',
            'view_analytics' => 'View website analytics',
        ];

        foreach ($permissions as $name => $description) {
            Permission::updateOrCreate(
                ['name' => $name],
                ['description' => $description]
            );
        }

        // Create roles
        $adminRole = Role::updateOrCreate(
            ['name' => 'admin'],
            ['description' => 'Full access to all features and settings']
        );

        $editorRole = Role::updateOrCreate(
            ['name' => 'editor'],
            ['description' => 'Can edit and publish content, but cannot manage users or settings']
        );

        // Assign permissions to roles
        $adminRole->permissions()->sync(Permission::all()->pluck('id'));
        $editorRole->permissions()->sync(Permission::whereIn('name', ['manage_content', 'view_analytics'])->pluck('id'));
    }
}