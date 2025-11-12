@extends('admin.layout')

@section('title', 'Home Trusted By Section')
@section('page-title', 'Home Trusted By Section')
@section('page-description', 'Manage partner logos displayed on the homepage')

@section('content')
<div class="bg-white rounded-lg shadow">
    <form method="POST" action="{{ route('admin.content.home.trusted.update') }}" class="p-6">
        @csrf
        @method('PUT')
        
        <div class="space-y-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Section Configuration</h3>
                <div class="space-y-4">
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Section Title</label>
                        <input type="text" name="sections[trusted][title]" id="title" value="{{ old('sections.trusted.title', $sections['trusted']['title'] ?? 'Trusted By') }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Trusted By">
                    </div>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Select Partners</h3>
                    <a href="{{ route('admin.content.partners') }}" class="text-sm text-blue-600 hover:text-blue-800">Manage Partners →</a>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div class="space-y-3">
                        @forelse($partners as $partner)
                            <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="checkbox" name="sections[trusted][partnerIds][]" value="{{ $partner->id }}"
                                    {{ in_array($partner->id, old('sections.trusted.partnerIds', is_array($sections['trusted']['partnerIds'] ?? null) ? $sections['trusted']['partnerIds'] : [])) ? 'checked' : '' }}
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <div class="flex-1 flex items-center space-x-3">
                                    @if($partner->logo)
                                        <div class="h-12 w-24 bg-white border border-gray-200 rounded p-2 flex items-center justify-center">
                                            <img src="{{ $partner->logo }}" alt="{{ $partner->name }}" class="max-h-full max-w-full object-contain">
                                        </div>
                                    @endif
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">{{ $partner->name }}</div>
                                        @if($partner->website)
                                            <div class="text-xs text-gray-500">{{ $partner->website }}</div>
                                        @endif
                                    </div>
                                </div>
                            </label>
                        @empty
                            <div class="text-center py-8 text-gray-500">
                                <p>No partners available. <a href="{{ route('admin.content.partners.create') }}" class="text-blue-600 hover:text-blue-800">Create one first</a></p>
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

