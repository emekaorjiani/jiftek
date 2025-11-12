@extends('admin.layout')

@section('title', 'Partners Management')
@section('page-title', 'Partners & Company Logos')
@section('page-description', 'Manage company logos displayed on the homepage')

@section('content')
<div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">All Partners</h2>
        <a href="{{ route('admin.content.partners.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            + Add New Partner
        </a>
    </div>
    
    <!-- Search and Filter -->
    <div class="p-6 border-b border-gray-200 bg-gray-50">
        <form method="GET" action="{{ route('admin.content.partners') }}" class="flex gap-4">
            <div class="flex-1">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search partners..."
                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div class="w-48">
                <select name="status" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="all" {{ request('status') == 'all' ? 'selected' : '' }}>All Status</option>
                    <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Active Only</option>
                    <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactive Only</option>
                </select>
            </div>
            <button type="submit" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Filter</button>
            @if(request('search') || request('status') != 'all')
                <a href="{{ route('admin.content.partners') }}" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Clear</a>
            @endif
        </form>
    </div>
    
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($partners as $partner)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($partner->logo)
                                <div class="h-16 w-32 bg-white border border-gray-200 rounded p-2 flex items-center justify-center">
                                    <img src="{{ $partner->logo }}" alt="{{ $partner->name }}" class="max-h-full max-w-full object-contain">
                                </div>
                            @else
                                <div class="h-16 w-32 bg-gray-200 rounded flex items-center justify-center">
                                    <span class="text-gray-500 text-xs">No Logo</span>
                                </div>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm font-medium text-gray-900">{{ $partner->name }}</div>
                        </td>
                        <td class="px-6 py-4">
                            @if($partner->website)
                                <a href="{{ $partner->website }}" target="_blank" class="text-sm text-blue-600 hover:text-blue-800">
                                    {{ Str::limit($partner->website, 40) }}
                                </a>
                            @else
                                <span class="text-sm text-gray-500">N/A</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $partner->order }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($partner->is_active)
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                            @else
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $partner->created_at->format('M d, Y') }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex justify-end space-x-2">
                                <a href="{{ route('admin.content.partners.edit', $partner->id) }}" class="text-blue-600 hover:text-blue-900">Edit</a>
                                <form method="POST" action="{{ route('admin.content.partners.destroy', $partner->id) }}" class="inline" onsubmit="return confirm('Are you sure you want to delete this partner?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                            <p class="text-lg font-medium">No partners found</p>
                            <p class="mt-2">Get started by creating a new partner.</p>
                            <a href="{{ route('admin.content.partners.create') }}" class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                                Create Your First Partner
                            </a>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    
    @if($partners->hasPages())
        <div class="px-6 py-4 border-t border-gray-200">
            {{ $partners->links() }}
        </div>
    @endif
</div>
@endsection

