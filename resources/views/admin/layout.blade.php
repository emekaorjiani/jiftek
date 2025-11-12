<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin Panel') - {{ config('app.name') }}</title>

    <!-- Tailwind CSS -->
    @vite(['resources/css/app.css'])

    <!-- Additional Styles -->
    <style>
        [x-cloak] { display: none !important; }

        /* Quill Editor Styles */
        #quill-editor {
            background: white;
        }
        .ql-container {
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        }
        .ql-editor {
            min-height: 400px;
        }
    </style>

    <!-- Quill.js Rich Text Editor -->
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

    @stack('styles')
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-900 text-white flex-shrink-0">
            <div class="h-full flex flex-col">
                <!-- Logo -->
                <div class="p-6 border-b border-gray-800">
                    <h1 class="text-xl font-bold">{{ config('app.name') }}</h1>
                    <p class="text-sm text-gray-400 mt-1">Admin Panel</p>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 overflow-y-auto p-4">
                    <ul class="space-y-2">
                        <li>
                            <a href="{{ route('admin.dashboard') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.dashboard') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                                Dashboard
                            </a>
                        </li>

                        <!-- Content Management -->
                        <li class="mt-4">
                            <p class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Content Management</p>
                        </li>

                        <li>
                            <a href="{{ route('admin.content.home') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.content.home*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                                Home Page
                            </a>
                        </li>

                        <li>
                            <a href="{{ route('admin.content.services.list') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.content.services.*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                Services
                            </a>
                        </li>

                        <li>
                            <a href="{{ route('admin.content.solutions.list') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.content.solutions.*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                Solutions
                            </a>
                        </li>

                        <li>
                            <a href="{{ route('admin.content.insights') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.content.insights.*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                                Insights
                            </a>
                        </li>

                        <li>
                            <a href="{{ route('admin.content.team-members') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.content.team-members.*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                Team Members
                            </a>
                        </li>

                        <li>
                            <a href="{{ route('admin.content.testimonials') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.content.testimonials.*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                                Testimonials
                            </a>
                        </li>

                        <li>
                            <a href="{{ route('admin.content.case-studies') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.content.case-studies.*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                Case Studies
                            </a>
                        </li>

                        <li>
                            <a href="{{ route('admin.content.partners') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.content.partners.*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                Partners
                            </a>
                        </li>

                        <!-- Other Sections -->
                        <li class="mt-4">
                            <p class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Other</p>
                        </li>

                        <li>
                            <a href="{{ route('admin.users.index') }}" class="flex items-center px-4 py-2 rounded-lg {{ request()->routeIs('admin.users.*') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800' }}">
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                                Users
                            </a>
                        </li>
                    </ul>
                </nav>

                <!-- User Info -->
                <div class="p-4 border-t border-gray-800">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <p class="text-sm font-medium">{{ auth()->user()->name }}</p>
                            <p class="text-xs text-gray-400">{{ auth()->user()->email }}</p>
                        </div>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="text-gray-400 hover:text-white">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <div class="p-8">
                <!-- Page Header -->
                <div class="mb-6">
                    <h1 class="text-3xl font-bold text-gray-900">@yield('page-title', 'Admin Panel')</h1>
                    @hasSection('page-description')
                        <p class="mt-2 text-gray-600">@yield('page-description')</p>
                    @endif
                </div>

                <!-- Flash Messages -->
                @if(session('success'))
                    <div class="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                        {{ session('success') }}
                    </div>
                @endif

                @if(session('error'))
                    <div class="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        {{ session('error') }}
                    </div>
                @endif

                @if($errors->any())
                    <div class="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        <ul class="list-disc list-inside">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <!-- Page Content -->
                @yield('content')
            </div>
        </main>
    </div>

    @stack('scripts')

    <!-- Initialize Quill.js for content fields -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize Quill on all textareas with id="content"
            const contentTextarea = document.getElementById('content');
            if (contentTextarea) {
                // Create a container for the editor
                const editorContainer = document.createElement('div');
                editorContainer.id = 'quill-editor';
                editorContainer.style.height = '500px';
                contentTextarea.parentNode.insertBefore(editorContainer, contentTextarea);
                contentTextarea.style.display = 'none';

                // Initialize Quill
                const quill = new Quill('#quill-editor', {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'align': [] }],
                            ['link', 'image', 'video'],
                            ['blockquote', 'code-block'],
                            ['clean']
                        ]
                    },
                    placeholder: 'Start writing your content...'
                });

                // Set initial content if textarea has value
                if (contentTextarea.value) {
                    quill.root.innerHTML = contentTextarea.value;
                }

                // Update textarea on text change
                quill.on('text-change', function() {
                    contentTextarea.value = quill.root.innerHTML;
                });

                // Also update on form submit
                const form = contentTextarea.closest('form');
                if (form) {
                    form.addEventListener('submit', function() {
                        contentTextarea.value = quill.root.innerHTML;
                    });
                }
            }
        });
    </script>
</body>
</html>

