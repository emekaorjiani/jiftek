@extends('admin.layout')

@section('title', 'Home Hero Section')
@section('page-title', 'Home Hero Section')
@section('page-description', 'Manage the main hero banner and headline')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.home.hero.update') }}" enctype="multipart/form-data" class="p-6" id="hero-form">
        @csrf
        @method('PUT')

        <div class="space-y-6">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h3 class="text-lg font-medium text-gray-900">Hero Carousel Items</h3>
                    <p class="text-sm text-gray-500 mt-1">Manage multiple hero carousel items that rotate on the homepage</p>
                </div>
                <button type="button" onclick="addHeroItem()" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                    + Add Hero Item
                </button>
            </div>

            <!-- Hero Items Container -->
            <div id="hero-items-container" class="space-y-6">
                @if(!empty($heroItems) && is_array($heroItems))
                    @foreach($heroItems as $index => $item)
                        <div class="hero-item border-2 border-gray-200 rounded-lg p-6" data-index="{{ $index }}">
                            <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                <h4 class="text-md font-semibold text-gray-900">Hero Item {{ $index + 1 }}</h4>
                                <div class="flex items-center gap-2">
                                    @if($index > 0)
                                        <button type="button" onclick="moveItem({{ $index }}, 'up')" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Move Up">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                            </svg>
                                        </button>
                                    @endif
                                    @if($index < count($heroItems) - 1)
                                        <button type="button" onclick="moveItem({{ $index }}, 'down')" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Move Down">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    @endif
                                    @if(count($heroItems) > 1)
                                        <button type="button" onclick="removeHeroItem({{ $index }})" class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded" title="Remove">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    @endif
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                                    <input type="text" name="sections[hero][items][{{ $index }}][badge]" value="{{ old("sections.hero.items.{$index}.badge", $item['badge'] ?? '') }}"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="e.g., Welcome, New Feature">
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
                                    <div class="border border-gray-300 rounded-md">
                                        <div class="flex border-b border-gray-300">
                                            <button type="button" onclick="showUrlInput('sections_hero_items_{{ $index }}_image')"
                                                id="sections_hero_items_{{ $index }}_image_url_tab"
                                                class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-b-2 border-blue-500">
                                                Image URL
                                            </button>
                                            <button type="button" onclick="showFileUpload('sections_hero_items_{{ $index }}_image')"
                                                id="sections_hero_items_{{ $index }}_image_upload_tab"
                                                class="flex-1 px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50">
                                                Upload File
                                            </button>
                                        </div>

                                        <!-- URL Input Section -->
                                        <div id="sections_hero_items_{{ $index }}_image_url_section" class="p-4">
                                            <input type="text"
                                                name="sections[hero][items][{{ $index }}][image]"
                                                id="sections_hero_items_{{ $index }}_image_url"
                                                value="{{ old("sections.hero.items.{$index}.image", $item['image'] ?? '') }}"
                                                placeholder="https://example.com/image.jpg"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <p class="mt-1 text-xs text-gray-500">Enter an image URL or upload a file (JPG, PNG, GIF, SVG, WebP)</p>

                                            <!-- Preview -->
                                            <div id="sections_hero_items_{{ $index }}_image_url_preview" class="mt-3 {{ !empty($item['image']) ? '' : 'hidden' }}">
                                                <p class="text-xs text-gray-500 mb-2">Preview:</p>
                                                <img src="{{ old("sections.hero.items.{$index}.image", $item['image'] ?? '') }}" alt="Preview" class="max-w-full h-48 object-contain border border-gray-200 rounded" onerror="this.style.display='none'">
                                            </div>
                                        </div>

                                        <!-- File Upload Section -->
                                        <div id="sections_hero_items_{{ $index }}_image_upload_section" class="p-4 hidden">
                                            <input type="file"
                                                name="sections[hero][items][{{ $index }}][image_file]"
                                                id="sections_hero_items_{{ $index }}_image_file"
                                                accept="image/*"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <p class="mt-1 text-xs text-gray-500">Upload an image file (JPG, PNG, GIF, etc.)</p>

                                            <!-- Preview -->
                                            <div id="sections_hero_items_{{ $index }}_image_file_preview" class="mt-3 hidden">
                                                <p class="text-xs text-gray-500 mb-2">Preview:</p>
                                                <img src="" alt="Preview" class="max-w-full h-48 object-contain border border-gray-200 rounded">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Title (Part 1)</label>
                                    <input type="text" name="sections[hero][items][{{ $index }}][title]" value="{{ old("sections.hero.items.{$index}.title", $item['title'] ?? '') }}"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Main headline">
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Title Highlight (Part 2)</label>
                                    <input type="text" name="sections[hero][items][{{ $index }}][titleHighlight]" value="{{ old("sections.hero.items.{$index}.titleHighlight", $item['titleHighlight'] ?? '') }}"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Highlighted portion of title">
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea name="sections[hero][items][{{ $index }}][description]" rows="3"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Hero section description">{{ old("sections.hero.items.{$index}.description", $item['description'] ?? '') }}</textarea>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
                                        <input type="text" name="sections[hero][items][{{ $index }}][primaryButton]" value="{{ old("sections.hero.items.{$index}.primaryButton", $item['primaryButton'] ?? '') }}"
                                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Get Started">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Primary Button Link</label>
                                        <input type="text" name="sections[hero][items][{{ $index }}][primaryButtonLink]" value="{{ old("sections.hero.items.{$index}.primaryButtonLink", $item['primaryButtonLink'] ?? '') }}"
                                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="/contact">
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
                                        <input type="text" name="sections[hero][items][{{ $index }}][secondaryButton]" value="{{ old("sections.hero.items.{$index}.secondaryButton", $item['secondaryButton'] ?? '') }}"
                                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Learn More">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
                                        <input type="text" name="sections[hero][items][{{ $index }}][secondaryButtonLink]" value="{{ old("sections.hero.items.{$index}.secondaryButtonLink", $item['secondaryButtonLink'] ?? '') }}"
                                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="/about">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
                                    <input type="text" name="sections[hero][items][{{ $index }}][imageAlt]" value="{{ old("sections.hero.items.{$index}.imageAlt", $item['imageAlt'] ?? '') }}"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Hero image description">
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="text-center py-8 text-gray-500">
                        <p>No hero items yet. Click "Add Hero Item" to create your first carousel slide.</p>
                    </div>
                @endif
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

@push('scripts')
<script>
    let itemCounter = {{ !empty($heroItems) && is_array($heroItems) ? count($heroItems) : 0 }};

    // Initialize existing hero items on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize URL previews for existing items
        @if(!empty($heroItems) && is_array($heroItems))
            @foreach($heroItems as $index => $item)
                @if(!empty($item['image']))
                    const existingValue{{ $index }} = '{{ $item['image'] }}';
                    if (existingValue{{ $index }}.startsWith('http://') || existingValue{{ $index }}.startsWith('https://') || existingValue{{ $index }}.startsWith('/')) {
                        showUrlInput('sections_hero_items_{{ $index }}_image');
                        updateUrlPreview('sections_hero_items_{{ $index }}_image', existingValue{{ $index }});
                    }
                @endif

                // URL input preview for existing items
                const urlInput{{ $index }} = document.getElementById('sections_hero_items_{{ $index }}_image_url');
                if (urlInput{{ $index }}) {
                    urlInput{{ $index }}.addEventListener('input', function() {
                        updateUrlPreview('sections_hero_items_{{ $index }}_image', this.value);
                    });
                }

                // File upload preview for existing items
                const fileInput{{ $index }} = document.getElementById('sections_hero_items_{{ $index }}_image_file');
                if (fileInput{{ $index }}) {
                    fileInput{{ $index }}.addEventListener('change', function(e) {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                const preview = document.getElementById('sections_hero_items_{{ $index }}_image_file_preview');
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
            @endforeach
        @endif
    });

    /**
     * Add a new hero item to the form
     */
    function addHeroItem() {
        const container = document.getElementById('hero-items-container');
        const emptyMessage = container.querySelector('.text-center');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        const itemHtml = `
            <div class="hero-item border-2 border-gray-200 rounded-lg p-6" data-index="${itemCounter}">
                <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <h4 class="text-md font-semibold text-gray-900">Hero Item ${itemCounter + 1}</h4>
                    <div class="flex items-center gap-2">
                        ${itemCounter > 0 ? `
                            <button type="button" onclick="moveItem(${itemCounter}, 'up')" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Move Up">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                </svg>
                            </button>
                        ` : ''}
                        <button type="button" onclick="moveItem(${itemCounter}, 'down')" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Move Down">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <button type="button" onclick="removeHeroItem(${itemCounter})" class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded" title="Remove">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                        <input type="text" name="sections[hero][items][${itemCounter}][badge]" value=""
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., Welcome, New Feature">
                    </div>

                    <div id="hero-image-upload-${itemCounter}">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
                        <div class="border border-gray-300 rounded-md">
                            <div class="flex border-b border-gray-300">
                                <button type="button" onclick="showUrlInput('hero_${itemCounter}')"
                                    id="hero_${itemCounter}_url_tab"
                                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-b-2 border-blue-500">
                                    Image URL
                                </button>
                                <button type="button" onclick="showFileUpload('hero_${itemCounter}')"
                                    id="hero_${itemCounter}_upload_tab"
                                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50">
                                    Upload File
                                </button>
                            </div>

                            <div id="hero_${itemCounter}_url_section" class="p-4">
                                <input type="text"
                                    name="sections[hero][items][${itemCounter}][image]"
                                    id="hero_${itemCounter}_url"
                                    value=""
                                    placeholder="https://example.com/image.jpg"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <p class="mt-1 text-xs text-gray-500">Enter an image URL or upload a file (JPG, PNG, GIF, SVG, WebP)</p>

                                <div id="hero_${itemCounter}_url_preview" class="mt-3 hidden">
                                    <p class="text-xs text-gray-500 mb-2">Preview:</p>
                                    <img src="" alt="Preview" class="max-w-full h-48 object-contain border border-gray-200 rounded" onerror="this.style.display='none'">
                                </div>
                            </div>

                            <div id="hero_${itemCounter}_upload_section" class="p-4 hidden">
                                <input type="file"
                                    name="sections[hero][items][${itemCounter}][image_file]"
                                    id="hero_${itemCounter}_file"
                                    accept="image/*"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <p class="mt-1 text-xs text-gray-500">Upload an image file (JPG, PNG, GIF, etc.)</p>

                                <input type="hidden" name="sections[hero][items][${itemCounter}][image]" id="hero_${itemCounter}_uploaded_path" value="">

                                <div id="hero_${itemCounter}_file_preview" class="mt-3 hidden">
                                    <p class="text-xs text-gray-500 mb-2">Preview:</p>
                                    <img src="" alt="Preview" class="max-w-full h-48 object-contain border border-gray-200 rounded">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Title (Part 1)</label>
                        <input type="text" name="sections[hero][items][${itemCounter}][title]" value=""
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Main headline">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Title Highlight (Part 2)</label>
                        <input type="text" name="sections[hero][items][${itemCounter}][titleHighlight]" value=""
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Highlighted portion of title">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="sections[hero][items][${itemCounter}][description]" rows="3"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Hero section description"></textarea>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
                            <input type="text" name="sections[hero][items][${itemCounter}][primaryButton]" value=""
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Get Started">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Primary Button Link</label>
                            <input type="text" name="sections[hero][items][${itemCounter}][primaryButtonLink]" value=""
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="/contact">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
                            <input type="text" name="sections[hero][items][${itemCounter}][secondaryButton]" value=""
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Learn More">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
                            <input type="text" name="sections[hero][items][${itemCounter}][secondaryButtonLink]" value=""
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="/about">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
                        <input type="text" name="sections[hero][items][${itemCounter}][imageAlt]" value=""
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Hero image description">
                    </div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', itemHtml);

        // Initialize image upload for the newly added item
        const currentCounter = itemCounter;
        const name = 'hero_' + currentCounter;

        // URL input preview
        const urlInput = document.getElementById(name + '_url');
        if (urlInput) {
            urlInput.addEventListener('input', function() {
                updateUrlPreview(name, this.value);
            });
        }

        // File upload preview
        const fileInput = document.getElementById(name + '_file');
        if (fileInput) {
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const preview = document.getElementById(name + '_file_preview');
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

        itemCounter++;
        updateItemNumbers();

        // Scroll to the newly added item
        const newItem = container.querySelector(`[data-index="${currentCounter}"]`);
        if (newItem) {
            newItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * Remove a hero item from the form
     */
    function removeHeroItem(index) {
        const container = document.getElementById('hero-items-container');
        const items = container.querySelectorAll('.hero-item');

        if (items.length <= 1) {
            alert('You must have at least one hero item.');
            return;
        }

        const item = container.querySelector(`[data-index="${index}"]`);
        if (item) {
            // Confirm deletion
            if (!confirm('Are you sure you want to remove this hero item?')) {
                return;
            }

            item.remove();
            updateItemNumbers();
            reindexFormFields();
        }

        // Show empty message if no items left
        if (container.querySelectorAll('.hero-item').length === 0) {
            container.innerHTML = '<div class="text-center py-8 text-gray-500"><p>No hero items yet. Click "Add Hero Item" to create your first carousel slide.</p></div>';
            itemCounter = 0;
        }
    }

    /**
     * Move an item up or down
     */
    function moveItem(index, direction) {
        const container = document.getElementById('hero-items-container');
        const items = Array.from(container.querySelectorAll('.hero-item'));
        const currentIndex = items.findIndex(item => item.getAttribute('data-index') == index);

        if (currentIndex === -1) return;

        if (direction === 'up' && currentIndex > 0) {
            const prevItem = items[currentIndex - 1];
            const currentItem = items[currentIndex];
            container.insertBefore(currentItem, prevItem);
        } else if (direction === 'down' && currentIndex < items.length - 1) {
            const nextItem = items[currentIndex + 1];
            const currentItem = items[currentIndex];
            container.insertBefore(nextItem, currentItem);
        } else {
            return; // Can't move in that direction
        }

        updateItemNumbers();
        reindexFormFields();
    }

    /**
     * Update item numbers in the UI
     */
    function updateItemNumbers() {
        const container = document.getElementById('hero-items-container');
        const items = container.querySelectorAll('.hero-item');
        items.forEach((item, index) => {
            const title = item.querySelector('h4');
            if (title) {
                title.textContent = `Hero Item ${index + 1}`;
            }
        });
    }

    /**
     * Reindex form fields after item removal or reordering
     */
    function reindexFormFields() {
        const container = document.getElementById('hero-items-container');
        const items = container.querySelectorAll('.hero-item');

        items.forEach((item, newIndex) => {
            item.setAttribute('data-index', newIndex);

            // Update all inputs and textareas
            const inputs = item.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                const name = input.getAttribute('name');
                if (name) {
                    // Replace the index in the name attribute
                    const newName = name.replace(/\[items\]\[\d+\]/, `[items][${newIndex}]`);
                    input.setAttribute('name', newName);

                    // Update ID if it exists and contains the old index
                    const id = input.getAttribute('id');
                    if (id) {
                        const oldIndexMatch = id.match(/hero_(\d+)/);
                        if (oldIndexMatch) {
                            const newId = id.replace(/hero_\d+/, `hero_${newIndex}`);
                            input.setAttribute('id', newId);
                        }
                    }
                }
            });

            // Update image upload IDs and related elements
            // Handle both existing items (sections_hero_items_X_image pattern) and dynamically added items (hero_X pattern)
            const allElementsWithIds = item.querySelectorAll('[id]');
            allElementsWithIds.forEach(el => {
                const oldId = el.getAttribute('id');
                if (oldId) {
                    // Update IDs that contain the old index pattern
                    // Pattern: sections_hero_items_0_image_url -> sections_hero_items_1_image_url
                    const oldIndexPattern = new RegExp(`sections_hero_items_\\d+`, 'g');
                    if (oldIndexPattern.test(oldId)) {
                        const newId = oldId.replace(/sections_hero_items_\d+/, `sections_hero_items_${newIndex}`);
                        el.setAttribute('id', newId);
                    }
                    // Also handle hero_X pattern for dynamically added items
                    const heroPattern = new RegExp(`hero_\\d+`, 'g');
                    if (heroPattern.test(oldId)) {
                        const newId = oldId.replace(/hero_\d+/, `hero_${newIndex}`);
                        el.setAttribute('id', newId);
                    }
                }
            });

            // Update labels that reference IDs
            const labels = item.querySelectorAll('label[for]');
            labels.forEach(label => {
                const forAttr = label.getAttribute('for');
                if (forAttr) {
                    if (/sections_hero_items_\d+/.test(forAttr)) {
                        label.setAttribute('for', forAttr.replace(/sections_hero_items_\d+/, `sections_hero_items_${newIndex}`));
                    }
                    if (/hero_\d+/.test(forAttr)) {
                        label.setAttribute('for', forAttr.replace(/hero_\d+/, `hero_${newIndex}`));
                    }
                }
            });

            // Update button onclick handlers
            const buttons = item.querySelectorAll('button[onclick]');
            buttons.forEach(button => {
                const onclick = button.getAttribute('onclick');
                if (onclick) {
                    // Update moveItem and removeHeroItem calls
                    let updatedOnclick = onclick
                        .replace(/moveItem\(\d+,/g, `moveItem(${newIndex},`)
                        .replace(/removeHeroItem\(\d+\)/g, `removeHeroItem(${newIndex})`)
                        .replace(/showUrlInput\('hero_\d+'\)/g, `showUrlInput('hero_${newIndex}')`)
                        .replace(/showFileUpload\('hero_\d+'\)/g, `showFileUpload('hero_${newIndex}')`);

                    // Update onclick handlers for existing items (sections_hero_items_X_image pattern)
                    updatedOnclick = updatedOnclick
                        .replace(/showUrlInput\('sections_hero_items_\d+_image'\)/g, `showUrlInput('sections_hero_items_${newIndex}_image')`)
                        .replace(/showFileUpload\('sections_hero_items_\d+_image'\)/g, `showFileUpload('sections_hero_items_${newIndex}_image')`);

                    button.setAttribute('onclick', updatedOnclick);
                }
            });

            // Update move up/down button visibility
            const moveUpBtn = item.querySelector('button[onclick*="moveItem"][onclick*="up"]');
            const moveDownBtn = item.querySelector('button[onclick*="moveItem"][onclick*="down"]');

            if (newIndex === 0) {
                if (moveUpBtn) moveUpBtn.style.display = 'none';
            } else {
                if (moveUpBtn) moveUpBtn.style.display = '';
            }

            if (newIndex === items.length - 1) {
                if (moveDownBtn) moveDownBtn.style.display = 'none';
            } else {
                if (moveDownBtn) moveDownBtn.style.display = '';
            }
        });

        // Update itemCounter to match the highest index + 1
        itemCounter = items.length;
    }

    /**
     * Show URL input tab for hero image upload
     */
    function showUrlInput(name) {
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

            const urlInput = document.getElementById(name + '_url');
            if (urlInput && urlInput.value) {
                updateUrlPreview(name, urlInput.value);
            }
        }
    }

    /**
     * Show file upload tab for hero image upload
     */
    function showFileUpload(name) {
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
    }

    /**
     * Update URL preview for hero image
     */
    function updateUrlPreview(name, url) {
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
    }
</script>
@endpush
@endsection
