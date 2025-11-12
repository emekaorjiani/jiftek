@extends('admin.layout')

@section('title', 'Team Members Management')
@section('page-title', 'Team Members Management')
@section('page-description', 'Manage your team members and their information')

@section('content')
<div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">All Team Members</h2>
        <a href="{{ route('admin.content.team-members.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            + Add New Team Member
        </a>
    </div>
    
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($teamMembers as $member)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($member->image)
                                <img src="{{ $member->image }}" alt="{{ $member->name }}" class="h-12 w-12 object-cover rounded-full">
                            @else
                                <div class="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span class="text-gray-500 font-medium">{{ substr($member->name, 0, 1) }}</span>
                                </div>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm font-medium text-gray-900">{{ $member->name }}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">{{ $member->title }}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900 max-w-md truncate">{{ Str::limit($member->bio, 100) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($member->is_active)
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                            @else
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $member->order }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex justify-end space-x-2">
                                <a href="{{ route('admin.content.team-members.edit', $member->id) }}" class="text-blue-600 hover:text-blue-900">Edit</a>
                                <form method="POST" action="{{ route('admin.content.team-members.destroy', $member->id) }}" class="inline" onsubmit="return confirm('Are you sure you want to delete this team member?');">
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
                            <p class="text-lg font-medium">No team members found</p>
                            <p class="mt-2">Get started by creating a new team member.</p>
                            <a href="{{ route('admin.content.team-members.create') }}" class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                                Create Your First Team Member
                            </a>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    
    @if($teamMembers->hasPages())
        <div class="px-6 py-4 border-t border-gray-200">
            {{ $teamMembers->links() }}
        </div>
    @endif
</div>
@endsection

