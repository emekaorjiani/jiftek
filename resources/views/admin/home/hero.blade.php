@extends('admin.layout')

@section('title', 'Home Hero Section')
@section('page-title', 'Home Hero Section')
@section('page-description', 'Manage the main hero banner and headline')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.home.hero.update') }}" class="p-6" id="hero-form">
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
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                                        <input type="text" name="sections[hero][items][{{ $index }}][badge]" value="{{ old("sections.hero.items.{$index}.badge", $item['badge'] ?? '') }}"
                                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="e.g., Welcome, New Feature">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                        <input type="text" name="sections[hero][items][{{ $index }}][image]" value="{{ old("sections.hero.items.{$index}.image", $item['image'] ?? '') }}"
                                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="https://example.com/hero-image.jpg">
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

                                @if(!empty($item['image']))
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
                                        <div class="w-full h-48 rounded-md border border-gray-200 overflow-hidden bg-gray-100">
                                            <img src="{{ $item['image'] }}" alt="{{ $item['imageAlt'] ?? 'Preview' }}" class="w-full h-full object-cover" onerror="this.style.display='none'">
                                        </div>
                                    </div>
                                @endif
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
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                            <input type="text" name="sections[hero][items][${itemCounter}][badge]" value=""
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="e.g., Welcome, New Feature">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input type="text" name="sections[hero][items][${itemCounter}][image]" value=""
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="https://example.com/hero-image.jpg">
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
        itemCounter++;
        updateItemNumbers();
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
            item.remove();
            updateItemNumbers();
            reindexFormFields();
        }

        // Show empty message if no items left
        if (container.querySelectorAll('.hero-item').length === 0) {
            container.innerHTML = '<div class="text-center py-8 text-gray-500"><p>No hero items yet. Click "Add Hero Item" to create your first carousel slide.</p></div>';
        }
    }

    /**
     * Move an item up or down
     */
    function moveItem(index, direction) {
        const container = document.getElementById('hero-items-container');
        const items = Array.from(container.querySelectorAll('.hero-item'));
        const currentIndex = items.findIndex(item => item.getAttribute('data-index') == index);

        if (direction === 'up' && currentIndex > 0) {
            const prevItem = items[currentIndex - 1];
            const currentItem = items[currentIndex];
            container.insertBefore(currentItem, prevItem);
        } else if (direction === 'down' && currentIndex < items.length - 1) {
            const nextItem = items[currentIndex + 1];
            const currentItem = items[currentIndex];
            container.insertBefore(nextItem, currentItem);
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
            const inputs = item.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                const name = input.getAttribute('name');
                if (name) {
                    // Replace the index in the name attribute
                    const newName = name.replace(/\[items\]\[\d+\]/, `[items][${newIndex}]`);
                    input.setAttribute('name', newName);
                }
            });

            // Update button onclick handlers
            const buttons = item.querySelectorAll('button[onclick]');
            buttons.forEach(button => {
                const onclick = button.getAttribute('onclick');
                if (onclick) {
                    button.setAttribute('onclick', onclick.replace(/\d+/, newIndex));
                }
            });
        });
    }
</script>
@endpush
@endsection
