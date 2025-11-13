@props(['name', 'label', 'value' => '', 'required' => false, 'helpText' => 'Enter an image URL or upload a file'])

@php
    // Sanitize name for use in HTML IDs (replace brackets and special chars with underscores)
    $idSafe = preg_replace('/[^a-zA-Z0-9_]/', '_', $name);
@endphp

<div class="space-y-2">
    <label for="{{ $idSafe }}_url" class="block text-sm font-medium text-gray-700 mb-1">
        {{ $label }} @if($required) * @endif
    </label>
    
    <!-- Tabs for URL vs Upload -->
    <div class="border border-gray-300 rounded-md">
        <div class="flex border-b border-gray-300">
            <button type="button" onclick="showUrlInput('{{ $idSafe }}')" 
                id="{{ $idSafe }}_url_tab"
                class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-b-2 border-blue-500">
                Image URL
            </button>
            <button type="button" onclick="showFileUpload('{{ $idSafe }}')" 
                id="{{ $idSafe }}_upload_tab"
                class="flex-1 px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50">
                Upload File
            </button>
        </div>
        
        <!-- URL Input Section -->
        <div id="{{ $idSafe }}_url_section" class="p-4">
            <input type="text" 
                name="{{ $name }}" 
                id="{{ $idSafe }}_url" 
                value="{{ old($name, $value) }}"
                placeholder="https://example.com/image.jpg"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error($name) border-red-500 @enderror">
            <p class="mt-1 text-xs text-gray-500">{{ $helpText }}</p>
            @error($name)
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
            
            <!-- Preview -->
            <div id="{{ $idSafe }}_url_preview" class="mt-3 hidden">
                <p class="text-xs text-gray-500 mb-2">Preview:</p>
                <img src="" alt="Preview" class="max-w-full h-48 object-contain border border-gray-200 rounded" onerror="this.style.display='none'">
            </div>
        </div>
        
        <!-- File Upload Section -->
        <div id="{{ $idSafe }}_upload_section" class="p-4 hidden">
            <input type="file" 
                name="{{ $name }}_file" 
                id="{{ $idSafe }}_file" 
                accept="image/*"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <p class="mt-1 text-xs text-gray-500">Upload an image file (JPG, PNG, GIF, etc.)</p>
            
            <!-- Hidden input to store the uploaded file path -->
            <input type="hidden" name="{{ $name }}" id="{{ $idSafe }}_uploaded_path" value="{{ old($name, $value) }}">
            
            <!-- Preview -->
            <div id="{{ $idSafe }}_file_preview" class="mt-3 hidden">
                <p class="text-xs text-gray-500 mb-2">Preview:</p>
                <img src="" alt="Preview" class="max-w-full h-48 object-contain border border-gray-200 rounded">
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
function showUrlInput(name) {
    document.getElementById(name + '_url_section').classList.remove('hidden');
    document.getElementById(name + '_upload_section').classList.add('hidden');
    document.getElementById(name + '_url_tab').classList.add('border-blue-500', 'bg-white', 'text-gray-700');
    document.getElementById(name + '_url_tab').classList.remove('bg-gray-50', 'text-gray-500');
    document.getElementById(name + '_upload_tab').classList.remove('border-blue-500', 'bg-white', 'text-gray-700');
    document.getElementById(name + '_upload_tab').classList.add('bg-gray-50', 'text-gray-500');
    
    // Show URL preview if there's a value
    const urlInput = document.getElementById(name + '_url');
    if (urlInput.value) {
        updateUrlPreview(name, urlInput.value);
    }
}

function showFileUpload(name) {
    document.getElementById(name + '_url_section').classList.add('hidden');
    document.getElementById(name + '_upload_section').classList.remove('hidden');
    document.getElementById(name + '_upload_tab').classList.add('border-blue-500', 'bg-white', 'text-gray-700');
    document.getElementById(name + '_upload_tab').classList.remove('bg-gray-50', 'text-gray-500');
    document.getElementById(name + '_url_tab').classList.remove('border-blue-500', 'bg-white', 'text-gray-700');
    document.getElementById(name + '_url_tab').classList.add('bg-gray-50', 'text-gray-500');
}

function updateUrlPreview(name, url) {
    const preview = document.getElementById(name + '_url_preview');
    const img = preview.querySelector('img');
    if (url) {
        img.src = url;
        preview.classList.remove('hidden');
    } else {
        preview.classList.add('hidden');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    @if($value)
        // If there's an existing value, check if it's a URL or path
        const existingValue = '{{ $value }}';
        if (existingValue.startsWith('http://') || existingValue.startsWith('https://') || existingValue.startsWith('data:')) {
            showUrlInput('{{ $idSafe }}');
            updateUrlPreview('{{ $idSafe }}', existingValue);
        } else {
            showFileUpload('{{ $idSafe }}');
        }
    @endif
    
    // URL input preview
    const urlInput = document.getElementById('{{ $idSafe }}_url');
    if (urlInput) {
        urlInput.addEventListener('input', function() {
            updateUrlPreview('{{ $idSafe }}', this.value);
        });
    }
    
    // File upload preview
    const fileInput = document.getElementById('{{ $idSafe }}_file');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('{{ $idSafe }}_file_preview');
                    const img = preview.querySelector('img');
                    img.src = e.target.result;
                    preview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
</script>
@endpush
