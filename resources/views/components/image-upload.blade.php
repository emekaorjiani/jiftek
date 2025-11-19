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
// Define functions only if they don't already exist (to avoid conflicts)
if (typeof showUrlInput === 'undefined') {
    window.showUrlInput = function(name) {
        const urlSection = document.getElementById(name + '_url_section');
        const uploadSection = document.getElementById(name + '_upload_section');
        const urlTab = document.getElementById(name + '_url_tab');
        const uploadTab = document.getElementById(name + '_upload_tab');
        
        if (urlSection && uploadSection && urlTab && uploadTab) {
            urlSection.classList.remove('hidden');
            uploadSection.classList.add('hidden');
            urlTab.classList.add('border-blue-500', 'bg-white', 'text-gray-700');
            urlTab.classList.remove('bg-gray-50', 'text-gray-500');
            uploadTab.classList.remove('border-blue-500', 'bg-white', 'text-gray-700');
            uploadTab.classList.add('bg-gray-50', 'text-gray-500');
            
            // Show URL preview if there's a value
            const urlInput = document.getElementById(name + '_url');
            if (urlInput && urlInput.value) {
                if (typeof updateUrlPreview !== 'undefined') {
                    updateUrlPreview(name, urlInput.value);
                }
            }
        }
    };
}

if (typeof showFileUpload === 'undefined') {
    window.showFileUpload = function(name) {
        const urlSection = document.getElementById(name + '_url_section');
        const uploadSection = document.getElementById(name + '_upload_section');
        const urlTab = document.getElementById(name + '_url_tab');
        const uploadTab = document.getElementById(name + '_upload_tab');
        
        if (urlSection && uploadSection && urlTab && uploadTab) {
            urlSection.classList.add('hidden');
            uploadSection.classList.remove('hidden');
            uploadTab.classList.add('border-blue-500', 'bg-white', 'text-gray-700');
            uploadTab.classList.remove('bg-gray-50', 'text-gray-500');
            urlTab.classList.remove('border-blue-500', 'bg-white', 'text-gray-700');
            urlTab.classList.add('bg-gray-50', 'text-gray-500');
        }
    };
}

if (typeof updateUrlPreview === 'undefined') {
    window.updateUrlPreview = function(name, url) {
        const preview = document.getElementById(name + '_url_preview');
        if (preview) {
            const img = preview.querySelector('img');
            if (url && img) {
                img.src = url;
                preview.classList.remove('hidden');
            } else {
                preview.classList.add('hidden');
            }
        }
    };
}

// Initialize this specific component instance on page load
(function() {
    const idSafe = '{{ $idSafe }}';
    
    function initializeComponent() {
        @if($value)
            // If there's an existing value, check if it's a URL or path
            const existingValue = '{{ $value }}';
            if (existingValue && (existingValue.startsWith('http://') || existingValue.startsWith('https://') || existingValue.startsWith('data:') || existingValue.startsWith('/'))) {
                if (typeof showUrlInput !== 'undefined') {
                    showUrlInput(idSafe);
                }
                if (typeof updateUrlPreview !== 'undefined') {
                    updateUrlPreview(idSafe, existingValue);
                }
            } else if (existingValue) {
                if (typeof showFileUpload !== 'undefined') {
                    showFileUpload(idSafe);
                }
            }
        @endif
        
        // URL input preview
        const urlInput = document.getElementById(idSafe + '_url');
        if (urlInput) {
            urlInput.addEventListener('input', function() {
                if (typeof updateUrlPreview !== 'undefined') {
                    updateUrlPreview(idSafe, this.value);
                }
            });
        }
        
        // File upload preview
        const fileInput = document.getElementById(idSafe + '_file');
        if (fileInput) {
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const preview = document.getElementById(idSafe + '_file_preview');
                        if (preview) {
                            const img = preview.querySelector('img');
                            if (img) {
                                img.src = e.target.result;
                                preview.classList.remove('hidden');
                            }
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeComponent);
    } else {
        initializeComponent();
    }
})();
</script>
@endpush
