@extends('admin.layout')

@section('title', 'Edit Testimonial')
@section('page-title', 'Edit Testimonial')
@section('page-description', 'Update testimonial information')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.testimonials.update', $testimonial->id) }}" class="p-6">
        @csrf
        @method('PUT')
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Basic Information -->
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700">Title *</label>
                            <input type="text" name="title" id="title" value="{{ old('title', $testimonial->title) }}" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('title') border-red-300 @enderror">
                            @error('title')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
                            <input type="text" name="slug" id="slug" value="{{ old('slug', $testimonial->slug) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('slug') border-red-300 @enderror">
                            <p class="mt-1 text-sm text-gray-500">Leave empty to auto-generate from title</p>
                            @error('slug')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">Description/Quote</label>
                            <textarea name="description" id="description" rows="4"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('description') border-red-300 @enderror"
                                placeholder="Client testimonial quote or description">{{ old('description', $testimonial->description) }}</textarea>
                            @error('description')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="content" class="block text-sm font-medium text-gray-700">Full Content</label>
                            <textarea name="content" id="content" rows="8"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('content') border-red-300 @enderror"
                                placeholder="Full testimonial content (HTML supported)">{{ old('content', $testimonial->content) }}</textarea>
                            @error('content')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>
                
                <!-- Client Information -->
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="client_name" class="block text-sm font-medium text-gray-700">Client Name</label>
                            <input type="text" name="client_name" id="client_name" value="{{ old('client_name', $testimonial->client_name) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Client or company name">
                        </div>
                        
                        <div>
                            <label for="client_industry" class="block text-sm font-medium text-gray-700">Client Industry</label>
                            <input type="text" name="client_industry" id="client_industry" value="{{ old('client_industry', $testimonial->client_industry) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="e.g., Healthcare, Finance, Technology">
                        </div>
                        
                        <div>
                            <label for="results" class="block text-sm font-medium text-gray-700">Results/Outcomes</label>
                            <textarea name="results" id="results" rows="4"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Key results and outcomes achieved">{{ old('results', $testimonial->results) }}</textarea>
                        </div>
                    </div>
                </div>
                
                <!-- Image -->
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Testimonial Image</h3>
                    <div>
                        <label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="text" name="image" id="image" value="{{ old('image', $testimonial->image) }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="https://example.com/image.jpg">
                        @if($testimonial->image || old('image'))
                        <div class="mt-2 h-48 w-full rounded-md border border-gray-200 bg-gray-100 overflow-hidden">
                            <img src="{{ old('image', $testimonial->image) }}" alt="Preview" id="image-preview" class="w-full h-full object-cover" onerror="this.style.display='none'">
                        </div>
                        @endif
                    </div>
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
                            <input type="number" name="order" id="order" value="{{ old('order', $testimonial->order) }}" min="0"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div class="flex items-center">
                            <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', $testimonial->is_active) ? 'checked' : '' }}
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
                            <input type="text" name="seo_title" id="seo_title" value="{{ old('seo_title', $testimonial->seo_title) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div>
                            <label for="seo_description" class="block text-sm font-medium text-gray-700">SEO Description</label>
                            <textarea name="seo_description" id="seo_description" rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ old('seo_description', $testimonial->seo_description) }}</textarea>
                        </div>
                        
                        <div>
                            <label for="seo_keywords" class="block text-sm font-medium text-gray-700">SEO Keywords</label>
                            <input type="text" name="seo_keywords" id="seo_keywords" value="{{ old('seo_keywords', $testimonial->seo_keywords) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="keyword1, keyword2, keyword3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <a href="{{ route('admin.content.testimonials') }}" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
            </a>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Update Testimonial
            </button>
        </div>
    </form>
</div>

@push('scripts')
<script>
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

// Preview image
document.getElementById('image').addEventListener('input', function() {
    const preview = document.getElementById('image-preview');
    if (preview) {
        preview.src = this.value;
        preview.style.display = 'block';
    }
});
</script>
@endpush
@endsection

