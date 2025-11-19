@extends('admin.layout')

@section('title', 'Home Solutions Section')
@section('page-title', 'Home Solutions Section')
@section('page-description', 'Manage featured solutions displayed on the homepage')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.home.solutions.update') }}" class="p-6">
        @csrf
        @method('PUT')
        
        <div class="space-y-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Section Configuration</h3>
                <div class="space-y-4">
                    <div>
                        <label for="badge" class="block text-sm font-medium text-gray-700">Badge Text</label>
                        <input type="text" name="sections[solutions][badge]" id="badge" value="{{ old('sections.solutions.badge', $sections['solutions']['badge'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., Our Solutions">
                    </div>
                    
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Section Title</label>
                        <input type="text" name="sections[solutions][title]" id="title" value="{{ old('sections.solutions.title', $sections['solutions']['title'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Solutions">
                    </div>
                    
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="sections[solutions][description]" id="description" rows="3"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Section description">{{ old('sections.solutions.description', $sections['solutions']['description'] ?? '') }}</textarea>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="buttonText" class="block text-sm font-medium text-gray-700">Button Text</label>
                            <input type="text" name="sections[solutions][buttonText]" id="buttonText" value="{{ old('sections.solutions.buttonText', $sections['solutions']['buttonText'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="View All">
                        </div>
                        <div>
                            <label for="buttonLink" class="block text-sm font-medium text-gray-700">Button Link</label>
                            <input type="text" name="sections[solutions][buttonLink]" id="buttonLink" value="{{ old('sections.solutions.buttonLink', $sections['solutions']['buttonLink'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="/solutions">
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Select Solutions</h3>
                    <a href="{{ route('admin.content.solutions.list') }}" class="text-sm text-blue-600 hover:text-blue-800">Manage Solutions →</a>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div class="space-y-3">
                        @forelse($solutions as $solution)
                            <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="checkbox" name="sections[solutions][solutionIds][]" value="{{ $solution->id }}"
                                    {{ in_array($solution->id, old('sections.solutions.solutionIds', is_array($sections['solutions']['solutionIds'] ?? null) ? $sections['solutions']['solutionIds'] : [])) ? 'checked' : '' }}
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <div class="flex-1 flex items-center space-x-3">
                                    @if($solution->image)
                                        <img src="{{ $solution->image }}" alt="{{ $solution->title }}" class="h-12 w-12 object-cover rounded">
                                    @endif
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">{{ $solution->title }}</div>
                                        @if($solution->description)
                                            <div class="text-xs text-gray-500">{{ Str::limit($solution->description, 60) }}</div>
                                        @endif
                                    </div>
                                </div>
                            </label>
                        @empty
                            <div class="text-center py-8 text-gray-500">
                                <p>No solutions available. <a href="{{ route('admin.content.solutions.create') }}" class="text-blue-600 hover:text-blue-800">Create one first</a></p>
                            </div>
                        @endforelse
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

