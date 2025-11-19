@extends('admin.layout')

@section('title', 'Home Case Studies Section')
@section('page-title', 'Home Case Studies Section')
@section('page-description', 'Manage featured case studies displayed on the homepage')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.home.case-studies.update') }}" class="p-6">
        @csrf
        @method('PUT')
        
        <div class="space-y-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Section Configuration</h3>
                <div class="space-y-4">
                    <div>
                        <label for="badge" class="block text-sm font-medium text-gray-700">Badge Text</label>
                        <input type="text" name="sections[case-studies][badge]" id="badge" value="{{ old('sections.case-studies.badge', $sections['case-studies']['badge'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., Case Studies">
                    </div>
                    
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Section Title</label>
                        <input type="text" name="sections[case-studies][title]" id="title" value="{{ old('sections.case-studies.title', $sections['case-studies']['title'] ?? '') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Case Studies">
                    </div>
                    
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="sections[case-studies][description]" id="description" rows="3"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Section description">{{ old('sections.case-studies.description', $sections['case-studies']['description'] ?? '') }}</textarea>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="buttonText" class="block text-sm font-medium text-gray-700">Button Text</label>
                            <input type="text" name="sections[case-studies][buttonText]" id="buttonText" value="{{ old('sections.case-studies.buttonText', $sections['case-studies']['buttonText'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="View All">
                        </div>
                        <div>
                            <label for="buttonLink" class="block text-sm font-medium text-gray-700">Button Link</label>
                            <input type="text" name="sections[case-studies][buttonLink]" id="buttonLink" value="{{ old('sections.case-studies.buttonLink', $sections['case-studies']['buttonLink'] ?? '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="/case-studies">
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Select Case Studies</h3>
                    <a href="{{ route('admin.content.case-studies') }}" class="text-sm text-blue-600 hover:text-blue-800">Manage Case Studies →</a>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div class="space-y-3">
                        @forelse($caseStudies as $caseStudy)
                            <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="checkbox" name="sections[case-studies][caseStudyIds][]" value="{{ $caseStudy->id }}"
                                    {{ in_array($caseStudy->id, old('sections.case-studies.caseStudyIds', is_array($sections['case-studies']['caseStudyIds'] ?? null) ? $sections['case-studies']['caseStudyIds'] : [])) ? 'checked' : '' }}
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <div class="flex-1 flex items-center space-x-3">
                                    @if($caseStudy->image)
                                        <img src="{{ $caseStudy->image }}" alt="{{ $caseStudy->title }}" class="h-12 w-12 object-cover rounded">
                                    @endif
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">{{ $caseStudy->title }}</div>
                                        @if($caseStudy->client_name)
                                            <div class="text-xs text-gray-500">{{ $caseStudy->client_name }}</div>
                                        @endif
                                    </div>
                                </div>
                            </label>
                        @empty
                            <div class="text-center py-8 text-gray-500">
                                <p>No case studies available. <a href="{{ route('admin.content.case-studies.create') }}" class="text-blue-600 hover:text-blue-800">Create one first</a></p>
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

