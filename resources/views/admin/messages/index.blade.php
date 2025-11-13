@extends('admin.layout')

@section('title', 'Contact Messages')
@section('page-title', 'Contact Messages')
@section('page-description', 'View and manage all contact form submissions')

@section('content')
<div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <div>
            <h2 class="text-xl font-semibold text-gray-900">All Messages</h2>
            @if(isset($unreadCount) && $unreadCount > 0)
                <p class="text-sm text-gray-500 mt-1">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {{ $unreadCount }} unread
                    </span>
                </p>
            @endif
        </div>
    </div>
    
    <!-- Search and Filter -->
    <div class="p-6 border-b border-gray-200 bg-gray-50">
        <form method="GET" action="{{ route('admin.messages') }}" class="flex gap-4">
            <div class="flex-1">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search messages..."
                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div class="w-48">
                <select name="filter" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="all" {{ request('filter') == 'all' || !request('filter') ? 'selected' : '' }}>All Messages</option>
                    <option value="unread" {{ request('filter') == 'unread' ? 'selected' : '' }}>Unread Only</option>
                    <option value="read" {{ request('filter') == 'read' ? 'selected' : '' }}>Read Only</option>
                </select>
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Search</button>
            @if(request('search') || request('filter'))
                <a href="{{ route('admin.messages') }}" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Clear</a>
            @endif
        </form>
    </div>

    <!-- Messages Table -->
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($messages as $message)
                    <tr class="{{ !$message->is_read ? 'bg-blue-50' : '' }} hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ $message->name }}</div>
                            @if($message->company)
                                <div class="text-sm text-gray-500">{{ $message->company }}</div>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $message->email }}</div>
                            @if($message->phone)
                                <div class="text-sm text-gray-500">{{ $message->phone }}</div>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">{{ $message->subject ?: 'No Subject' }}</div>
                            <div class="text-sm text-gray-500 truncate max-w-xs">{{ Str::limit($message->message, 60) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $message->created_at->format('M d, Y') }}<br>
                            <span class="text-xs">{{ $message->created_at->format('h:i A') }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($message->is_read)
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Read
                                </span>
                            @else
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Unread
                                </span>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex justify-end space-x-2">
                                <a href="{{ route('admin.messages.show', $message->id) }}" class="text-blue-600 hover:text-blue-900">View</a>
                                @if($message->is_read)
                                    <form method="POST" action="{{ route('admin.messages.mark-unread', $message->id) }}" class="inline">
                                        @csrf
                                        <button type="submit" class="text-yellow-600 hover:text-yellow-900">Mark Unread</button>
                                    </form>
                                @else
                                    <form method="POST" action="{{ route('admin.messages.mark-read', $message->id) }}" class="inline">
                                        @csrf
                                        <button type="submit" class="text-green-600 hover:text-green-900">Mark Read</button>
                                    </form>
                                @endif
                                <form method="POST" action="{{ route('admin.messages.destroy', $message->id) }}" class="inline" onsubmit="return confirm('Are you sure you want to delete this message?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                            <p class="text-lg font-medium">No messages found</p>
                            <p class="mt-2">Contact form submissions will appear here.</p>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    @if($messages->hasPages())
        <div class="p-6 border-t border-gray-200">
            {{ $messages->links() }}
        </div>
    @endif
</div>
@endsection

