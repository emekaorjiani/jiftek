@extends('admin.layout')

@section('title', 'Dashboard')
@section('page-title', 'Admin Dashboard')
@section('page-description', 'Welcome to the admin panel')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Stats Cards -->
    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </div>
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Services</p>
                <p class="text-2xl font-semibold text-gray-900">{{ \App\Models\Service::count() }}</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                </div>
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Solutions</p>
                <p class="text-2xl font-semibold text-gray-900">{{ \App\Models\Solution::count() }}</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                </div>
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Insights</p>
                <p class="text-2xl font-semibold text-gray-900">{{ \App\Models\Insight::count() }}</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                </div>
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Team Members</p>
                <p class="text-2xl font-semibold text-gray-900">{{ \App\Models\TeamMember::count() }}</p>
            </div>
        </div>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-2 gap-4">
                <a href="{{ route('admin.content.services.create') }}" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="h-5 w-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-900">New Service</span>
                </a>
                <a href="{{ route('admin.content.solutions.create') }}" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="h-5 w-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-900">New Solution</span>
                </a>
                <a href="{{ route('admin.content.insights.create') }}" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="h-5 w-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-900">New Insight</span>
                </a>
                <a href="{{ route('admin.content.home') }}" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="h-5 w-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-900">Home Page</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Recent Content</h2>
        </div>
        <div class="p-6">
            <div class="space-y-4">
                @php
                    $recentServices = \App\Models\Service::latest()->take(3)->get();
                    $recentSolutions = \App\Models\Solution::latest()->take(3)->get();
                @endphp
                
                @if($recentServices->count() > 0)
                    <div>
                        <h3 class="text-sm font-medium text-gray-700 mb-2">Recent Services</h3>
                        <ul class="space-y-2">
                            @foreach($recentServices as $service)
                                <li class="flex items-center justify-between text-sm">
                                    <a href="{{ route('admin.content.services.edit', $service->id) }}" class="text-blue-600 hover:text-blue-800">
                                        {{ $service->title }}
                                    </a>
                                    <span class="text-gray-500">{{ $service->created_at->diffForHumans() }}</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                @if($recentSolutions->count() > 0)
                    <div>
                        <h3 class="text-sm font-medium text-gray-700 mb-2">Recent Solutions</h3>
                        <ul class="space-y-2">
                            @foreach($recentSolutions as $solution)
                                <li class="flex items-center justify-between text-sm">
                                    <a href="{{ route('admin.content.solutions.edit', $solution->id) }}" class="text-blue-600 hover:text-blue-800">
                                        {{ $solution->title }}
                                    </a>
                                    <span class="text-gray-500">{{ $solution->created_at->diffForHumans() }}</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection

