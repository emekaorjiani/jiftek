@extends('admin.layout')

@section('title', 'Home Hero Section')
@section('page-title', 'Home Hero Section')
@section('page-description', 'Manage the main hero banner and headline')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.home.hero.update') }}" class="p-6">
        @csrf
        @method('PUT')
        
        <div class="space-y-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Hero Content</h3>
                <div class="space-y-4">
                    <div>
                        <label for="badge" class="block text-sm font-medium text-gray-700">Badge Text</label>
                        <input type="text" name="sections[hero][badge]" id="badge" value="{{ old('sections.hero.badge', $sections['hero']['badge'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., Welcome, New Feature">
                    </div>
                    
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="sections[hero][title]" id="title" value="{{ old('sections.hero.title', $sections['hero']['title'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Main headline">
                    </div>
                    
                    <div>
                        <label for="titleHighlight" class="block text-sm font-medium text-gray-700">Title Highlight</label>
                        <input type="text" name="sections[hero][titleHighlight]" id="titleHighlight" value="{{ old('sections.hero.titleHighlight', $sections['hero']['titleHighlight'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Highlighted portion of title">
                    </div>
                    
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="sections[hero][description]" id="description" rows="4"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Hero section description">{{ old('sections.hero.description', $sections['hero']['description'] ?? '') }}</textarea>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="primaryButton" class="block text-sm font-medium text-gray-700">Primary Button Text</label>
                            <input type="text" name="sections[hero][primaryButton]" id="primaryButton" value="{{ old('sections.hero.primaryButton', $sections['hero']['primaryButton'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Get Started">
                        </div>
                        <div>
                            <label for="primaryButtonLink" class="block text-sm font-medium text-gray-700">Primary Button Link</label>
                            <input type="text" name="sections[hero][primaryButtonLink]" id="primaryButtonLink" value="{{ old('sections.hero.primaryButtonLink', $sections['hero']['primaryButtonLink'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="/contact">
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="secondaryButton" class="block text-sm font-medium text-gray-700">Secondary Button Text</label>
                            <input type="text" name="sections[hero][secondaryButton]" id="secondaryButton" value="{{ old('sections.hero.secondaryButton', $sections['hero']['secondaryButton'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Learn More">
                        </div>
                        <div>
                            <label for="secondaryButtonLink" class="block text-sm font-medium text-gray-700">Secondary Button Link</label>
                            <input type="text" name="sections[hero][secondaryButtonLink]" id="secondaryButtonLink" value="{{ old('sections.hero.secondaryButtonLink', $sections['hero']['secondaryButtonLink'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="/about">
                        </div>
                    </div>
                    
                    <div>
                        <label for="image" class="block text-sm font-medium text-gray-700">Hero Image URL</label>
                        <input type="text" name="sections[hero][image]" id="image" value="{{ old('sections.hero.image', $sections['hero']['image'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="https://example.com/hero-image.jpg">
                    </div>
                    
                    <div>
                        <label for="imageAlt" class="block text-sm font-medium text-gray-700">Image Alt Text</label>
                        <input type="text" name="sections[hero][imageAlt]" id="imageAlt" value="{{ old('sections.hero.imageAlt', $sections['hero']['imageAlt'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Hero image description">
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <a href="{{ route('admin.content.home') }}" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
            </a>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Save Changes
            </button>
        </div>
    </form>
</div>
@endsection

