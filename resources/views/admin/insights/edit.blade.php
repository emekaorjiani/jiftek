@extends('admin.layout')

@section('title', 'Edit Insight')
@section('page-title', 'Edit Insight')
@section('page-description', 'Update insight information')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.insights.update', $insight->id) }}" enctype="multipart/form-data" class="p-6">
        @csrf
        @method('PUT')
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6">
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700">Title *</label>
                            <input type="text" name="title" id="title" value="{{ old('title', $insight->title) }}" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('title') border-red-300 @enderror">
                            @error('title')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
                            <input type="text" name="slug" id="slug" value="{{ old('slug', $insight->slug) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            @error('slug')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <label for="excerpt" class="block text-sm font-medium text-gray-700">Excerpt</label>
                            <textarea name="excerpt" id="excerpt" rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ old('excerpt', $insight->excerpt) }}</textarea>
                        </div>
                        
                        <div>
                            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
                            <textarea name="content" id="content" rows="15"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ old('content', $insight->content) }}</textarea>
                        </div>
                        
                        <div>
                            <h4 class="text-md font-medium text-gray-900 mb-2">Featured Image</h4>
                            <x-image-upload 
                                name="featured_image" 
                                label="Featured Image"
                                :value="old('featured_image', $insight->featured_image)"
                                helpText="Enter an image URL or upload a file (JPG, PNG, GIF, SVG, WebP)"
                            />
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
                            <label for="type" class="block text-sm font-medium text-gray-700">Type *</label>
                            <select name="type" id="type" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option value="blog" {{ old('type', $insight->type) === 'blog' ? 'selected' : '' }}>Blog Post</option>
                                <option value="case-study" {{ old('type', $insight->type) === 'case-study' ? 'selected' : '' }}>Case Study</option>
                                <option value="whitepaper" {{ old('type', $insight->type) === 'whitepaper' ? 'selected' : '' }}>Whitepaper</option>
                                <option value="webinar" {{ old('type', $insight->type) === 'webinar' ? 'selected' : '' }}>Webinar</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="status" class="block text-sm font-medium text-gray-700">Status *</label>
                            <select name="status" id="status" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option value="draft" {{ old('status', $insight->status) === 'draft' ? 'selected' : '' }}>Draft</option>
                                <option value="published" {{ old('status', $insight->status) === 'published' ? 'selected' : '' }}>Published</option>
                                <option value="scheduled" {{ old('status', $insight->status) === 'scheduled' ? 'selected' : '' }}>Scheduled</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="published_at" class="block text-sm font-medium text-gray-700">Published Date</label>
                            <input type="date" name="published_at" id="published_at" 
                                value="{{ old('published_at', $insight->published_at ? $insight->published_at->format('Y-m-d') : '') }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div>
                            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" name="category" id="category" value="{{ old('category', $insight->category) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div>
                            <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
                            <input type="text" name="tags" id="tags" value="{{ old('tags', $insight->tags) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="seo_title" class="block text-sm font-medium text-gray-700">SEO Title</label>
                            <input type="text" name="seo_title" id="seo_title" value="{{ old('seo_title', $insight->seo_title) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div>
                            <label for="seo_description" class="block text-sm font-medium text-gray-700">SEO Description</label>
                            <textarea name="seo_description" id="seo_description" rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ old('seo_description', $insight->seo_description) }}</textarea>
                        </div>
                        
                        <div>
                            <label for="seo_keywords" class="block text-sm font-medium text-gray-700">SEO Keywords</label>
                            <input type="text" name="seo_keywords" id="seo_keywords" value="{{ old('seo_keywords', $insight->seo_keywords) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <a href="{{ route('admin.content.insights') }}" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
            </a>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Update Insight
            </button>
        </div>
    </form>
</div>
@endsection

