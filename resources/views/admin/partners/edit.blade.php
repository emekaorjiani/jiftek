@extends('admin.layout')

@section('title', 'Edit Partner')
@section('page-title', 'Edit Partner')
@section('page-description', 'Update partner information')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.partners.update', $partner->id) }}" enctype="multipart/form-data" class="p-6">
        @csrf
        @method('PUT')
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6">
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Partner Information</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Company Name *</label>
                            <input type="text" name="name" id="name" value="{{ old('name', $partner->name) }}" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('name') border-red-300 @enderror">
                            @error('name')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div>
                            <x-image-upload 
                                name="logo" 
                                label="Company Logo"
                                :value="old('logo', $partner->logo)"
                                :required="true"
                                helpText="Enter a logo URL or upload a file (JPG, PNG, GIF, SVG, WebP)"
                            />
                        </div>
                        
                        <div>
                            <label for="website" class="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                            <input type="url" name="website" id="website" value="{{ old('website', $partner->website) }}"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('website') border-red-500 @enderror"
                                placeholder="https://example.com">
                            @error('website')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
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
                            <input type="number" name="order" id="order" value="{{ old('order', $partner->order) }}" min="0"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        
                        <div class="flex items-center">
                            <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', $partner->is_active) ? 'checked' : '' }}
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="is_active" class="ml-2 block text-sm text-gray-900">Active</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <a href="{{ route('admin.content.partners') }}" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
            </a>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Update Partner
            </button>
        </div>
    </form>
</div>

@push('scripts')
<script>
// Preview logo on input
document.getElementById('logo').addEventListener('input', function() {
    const preview = document.getElementById('logo-preview');
    if (preview) {
        preview.src = this.value;
        preview.style.display = 'block';
    }
});
</script>
@endpush
@endsection

