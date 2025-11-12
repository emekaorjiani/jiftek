@extends('admin.layout')

@section('title', 'Create Solution')
@section('page-title', 'Create New Solution')
@section('page-description', 'Add a new solution category')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.solutions.store') }}" class="p-6">
        @csrf
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6">
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
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Auto-generated from title">
                            @error('slug')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" id="description" rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ old('description') }}</textarea>
                        </div>
                        
                        <div>
                            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
                            <textarea name="content" id="content" rows="10"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ old('content') }}</textarea>
                        </div>
                        
                        <div>
                            <label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
                            <input type="text" name="image" id="image" value="{{ old('image') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div>
                            <label for="icon" class="block text-sm font-medium text-gray-700">Icon</label>
                            <input type="text" name="icon" id="icon" value="{{ old('icon') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Icon name or class">
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Sidebar -->
            <div class="space-y-6">
                <div class="bg-gray-50 rounded-lg p-4">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="order" class="block text-sm font-medium text-gray-700">Display Order</label>
                            <input type="number" name="order" id="order" value="{{ old('order', 0) }}" min="0"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div class="flex items-center">
                            <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="is_active" class="ml-2 block text-sm text-gray-900">Active</label>
                        </div>
                    </div>
                </div>
                
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
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <a href="{{ route('admin.content.solutions.list') }}" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
            </a>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Create Solution
            </button>
        </div>
    </form>
</div>

@push('scripts')
<script>
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

