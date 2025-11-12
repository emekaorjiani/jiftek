@extends('admin.layout')

@section('title', 'Home Page Content')
@section('page-title', 'Home Page Content Management')
@section('page-description', 'Manage different sections of your homepage')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Hero Section -->
    <a href="{{ route('admin.content.home.hero') }}" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                    </svg>
                </div>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">Hero Section</h3>
                <p class="text-sm text-gray-500">Main banner and headline</p>
            </div>
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </div>
    </a>

    <!-- Trusted By Section -->
    <a href="{{ route('admin.content.home.trusted') }}" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                </div>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">Trusted By</h3>
                <p class="text-sm text-gray-500">Partner logos section</p>
            </div>
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </div>
    </a>

    <!-- Solutions Section -->
    <a href="{{ route('admin.content.home.solutions') }}" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                </div>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">Solutions</h3>
                <p class="text-sm text-gray-500">Featured solutions section</p>
            </div>
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </div>
    </a>

    <!-- Case Studies Section -->
    <a href="{{ route('admin.content.home.case-studies') }}" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                </div>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">Case Studies</h3>
                <p class="text-sm text-gray-500">Featured case studies</p>
            </div>
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </div>
    </a>

    <!-- CTA Section -->
    <a href="{{ route('admin.content.home.cta') }}" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                    </svg>
                </div>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">Call to Action</h3>
                <p class="text-sm text-gray-500">CTA section</p>
            </div>
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </div>
    </a>
</div>
@endsection

