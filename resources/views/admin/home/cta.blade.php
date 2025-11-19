@extends('admin.layout')

@section('title', 'Home CTA Section')
@section('page-title', 'Home Call to Action Section')
@section('page-description', 'Manage the call to action section on the homepage')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.home.cta.update') }}" class="p-6">
        @csrf
        @method('PUT')
        
        <div class="space-y-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">CTA Content</h3>
                <div class="space-y-4">
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="sections[cta][title]" id="title" value="{{ old('sections.cta.title', $sections['cta']['title'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Ready to get started?">
                    </div>
                    
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="sections[cta][description]" id="description" rows="4"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="CTA description text">{{ old('sections.cta.description', $sections['cta']['description'] ?? '') }}</textarea>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="buttonText" class="block text-sm font-medium text-gray-700">Button Text</label>
                            <input type="text" name="sections[cta][buttonText]" id="buttonText" value="{{ old('sections.cta.buttonText', $sections['cta']['buttonText'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Contact Us">
                        </div>
                        <div>
                            <label for="buttonLink" class="block text-sm font-medium text-gray-700">Button Link</label>
                            <input type="text" name="sections[cta][buttonLink]" id="buttonLink" value="{{ old('sections.cta.buttonLink', $sections['cta']['buttonLink'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="/contact">
                        </div>
                    </div>
                    
                    <div>
                        <label for="backgroundColor" class="block text-sm font-medium text-gray-700">Background Color</label>
                        <input type="text" name="sections[cta][backgroundColor]" id="backgroundColor" value="{{ old('sections.cta.backgroundColor', $sections['cta']['backgroundColor'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., #1F2937 or bg-gray-800">
                        <p class="mt-1 text-sm text-gray-500">Hex color code or Tailwind class</p>
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

