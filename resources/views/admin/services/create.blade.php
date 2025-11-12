@extends('admin.layout')

@section('title', 'Create Service')
@section('page-title', 'Create New Service')
@section('page-description', 'Add a new service to your offerings')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.services.store') }}" class="p-6">
        @csrf
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Basic Information -->
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700">Title *</label>
                            <input type="text" name="title" id="title" value="{{ old('title') }}" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('title') border-red-300 @enderror">
                            @error('title')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
                            <input type="text" name="slug" id="slug" value="{{ old('slug') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('slug') border-red-300 @enderror"
                                placeholder="Auto-generated from title">
                            <p class="mt-1 text-sm text-gray-500">Leave empty to auto-generate from title</p>
                            @error('slug')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" id="description" rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('description') border-red-300 @enderror">{{ old('description') }}</textarea>
                            @error('description')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
                            <textarea name="content" id="content" rows="10"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('content') border-red-300 @enderror">{{ old('content') }}</textarea>
                            <p class="mt-1 text-sm text-gray-500">Detailed content about the service (HTML supported)</p>
                            @error('content')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>
                
                <!-- Image -->
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Service Image</h3>
                    <div>
                        <label for="image" class="block text-sm font-medium text-gray-700">Image URL or SVG Data URI</label>
                        <textarea name="image" id="image" rows="4"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('image') border-red-300 @enderror"
                            placeholder="Enter image URL or SVG data URI">{{ old('image') }}</textarea>
                        <p class="mt-1 text-sm text-gray-500">Enter a full image URL or an SVG data URI</p>
                        @error('image')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
                
                <!-- Features -->
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Features</h3>
                    <div id="features-container" class="space-y-2">
                        <!-- Features will be added dynamically -->
                    </div>
                    <button type="button" onclick="addFeature()" class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                        + Add Feature
                    </button>
                </div>
            </div>
            
            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- Settings -->
                <div class="bg-gray-50 rounded-lg p-4">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="order" class="block text-sm font-medium text-gray-700">Display Order</label>
                            <input type="number" name="order" id="order" value="{{ old('order', 0) }}" min="0"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-sm text-gray-500">Lower numbers appear first</p>
                        </div>
                        
                        <div>
                            <label for="solution_id" class="block text-sm font-medium text-gray-700">Solution</label>
                            <select name="solution_id" id="solution_id"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option value="">None</option>
                                @foreach($solutions as $solution)
                                    <option value="{{ $solution->id }}" {{ old('solution_id') == $solution->id ? 'selected' : '' }}>
                                        {{ $solution->title }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        
                        <div class="flex items-center">
                            <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="is_active" class="ml-2 block text-sm text-gray-900">Active</label>
                        </div>
                    </div>
                </div>
                
                <!-- SEO Settings -->
                <div class="bg-gray-50 rounded-lg p-4">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="seo_title" class="block text-sm font-medium text-gray-700">SEO Title</label>
                            <input type="text" name="seo_title" id="seo_title" value="{{ old('seo_title') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div>
                            <label for="seo_description" class="block text-sm font-medium text-gray-700">SEO Description</label>
                            <textarea name="seo_description" id="seo_description" rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ old('seo_description') }}</textarea>
                        </div>
                        
                        <div>
                            <label for="seo_keywords" class="block text-sm font-medium text-gray-700">SEO Keywords</label>
                            <input type="text" name="seo_keywords" id="seo_keywords" value="{{ old('seo_keywords') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="keyword1, keyword2, keyword3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Form Actions -->
        <div class="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <a href="{{ route('admin.content.services.list') }}" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
            </a>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Create Service
            </button>
        </div>
    </form>
</div>

@push('scripts')
<script>
let featureCount = 0;

function addFeature() {
    const container = document.getElementById('features-container');
    const div = document.createElement('div');
    div.className = 'flex items-center space-x-2';
    div.innerHTML = `
        <input type="text" name="features[]" placeholder="Feature ${featureCount + 1}" 
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        <button type="button" onclick="this.parentElement.remove()" class="text-red-600 hover:text-red-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
        </button>
    `;
    container.appendChild(div);
    featureCount++;
}

// Auto-generate slug from title
document.getElementById('title').addEventListener('input', function() {
    const slug = document.getElementById('slug');
    if (!slug.value || slug.dataset.autoGenerated === 'true') {
        slug.value = this.value.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        slug.dataset.autoGenerated = 'true';
    }
});

document.getElementById('slug').addEventListener('input', function() {
    this.dataset.autoGenerated = 'false';
});
</script>
@endpush
@endsection

