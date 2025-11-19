@extends('admin.layout')

@section('title', 'User Profile')
@section('page-title', 'User Profile: ' . $user->name)
@section('page-description', 'View user details and information')

@section('content')
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Profile Info -->
    <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center space-x-4 mb-6">
                <div class="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 text-2xl font-bold">{{ substr($user->name, 0, 1) }}</span>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">{{ $user->name }}</h2>
                    <p class="text-gray-600">{{ $user->email }}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm font-medium text-gray-500">Email Status</p>
                    <p class="mt-1">
                        @if($user->email_verified_at)
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Verified
                            </span>
                        @else
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Unverified
                            </span>
                        @endif
                    </p>
                </div>
                
                <div>
                    <p class="text-sm font-medium text-gray-500">Member Since</p>
                    <p class="mt-1 text-sm text-gray-900">{{ $user->created_at->format('F d, Y') }}</p>
                </div>
                
                <div>
                    <p class="text-sm font-medium text-gray-500">Last Updated</p>
                    <p class="mt-1 text-sm text-gray-900">{{ $user->updated_at->format('F d, Y') }}</p>
                </div>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Roles & Permissions</h3>
            <div class="space-y-2">
                @forelse($user->roles as $role)
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="text-sm font-medium text-gray-900">{{ $role->name }}</span>
                        @if($role->description)
                            <span class="text-xs text-gray-500">{{ $role->description }}</span>
                        @endif
                    </div>
                @empty
                    <p class="text-sm text-gray-500">No roles assigned</p>
                @endforelse
            </div>
        </div>
    </div>
    
    <!-- Sidebar Actions -->
    <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            <div class="space-y-2">
                <a href="{{ route('admin.users.edit', $user->id) }}" class="block w-full px-4 py-2 text-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Edit User
                </a>
                <a href="{{ route('admin.users.index') }}" class="block w-full px-4 py-2 text-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Back to Users
                </a>
            </div>
        </div>
    </div>
</div>
@endsection

