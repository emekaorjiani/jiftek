@extends('admin.layout')

@section('title', 'View Message')
@section('page-title', 'View Message')
@section('page-description', 'View contact message details')

@section('content')
<div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <div>
            <h2 class="text-xl font-semibold text-gray-900">Message Details</h2>
            <p class="text-sm text-gray-500 mt-1">
                Received on {{ $message->created_at->format('F d, Y \a\t h:i A') }}
            </p>
        </div>
        <div class="flex gap-2">
            @if($message->is_read)
                <form method="POST" action="{{ route('admin.messages.mark-unread', $message->id) }}">
                    @csrf
                    <button type="submit" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">Mark Unread</button>
                </form>
            @else
                <form method="POST" action="{{ route('admin.messages.mark-read', $message->id) }}">
                    @csrf
                    <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Mark Read</button>
                </form>
            @endif
            <form method="POST" action="{{ route('admin.messages.destroy', $message->id) }}" onsubmit="return confirm('Are you sure you want to delete this message?');">
                @csrf
                @method('DELETE')
                <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </form>
            <a href="{{ route('admin.messages') }}" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Back to List
            </a>
        </div>
    </div>

    <div class="p-6 space-y-6">
        <!-- Message Status -->
        <div class="flex items-center gap-2">
            @if($message->is_read)
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Read
                </span>
                @if($message->read_at)
                    <span class="text-sm text-gray-500">Read on {{ $message->read_at->format('F d, Y \a\t h:i A') }}</span>
                @endif
            @else
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Unread
                </span>
            @endif
        </div>

        <!-- Contact Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p class="text-sm text-gray-900">{{ $message->name }}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p class="text-sm text-gray-900">
                    <a href="mailto:{{ $message->email }}" class="text-blue-600 hover:text-blue-800">{{ $message->email }}</a>
                </p>
            </div>
            @if($message->phone)
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p class="text-sm text-gray-900">
                        <a href="tel:{{ $message->phone }}" class="text-blue-600 hover:text-blue-800">{{ $message->phone }}</a>
                    </p>
                </div>
            @endif
            @if($message->company)
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <p class="text-sm text-gray-900">{{ $message->company }}</p>
                </div>
            @endif
            @if($message->subject)
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <p class="text-sm text-gray-900">{{ $message->subject }}</p>
                </div>
            @endif
        </div>

        <!-- Message Content -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ $message->message }}</p>
            </div>
        </div>

        <!-- Technical Details -->
        <div class="border-t border-gray-200 pt-6">
            <h3 class="text-sm font-medium text-gray-700 mb-4">Technical Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                @if($message->ip_address)
                    <div>
                        <label class="text-gray-500">IP Address</label>
                        <p class="text-gray-900">{{ $message->ip_address }}</p>
                    </div>
                @endif
                @if($message->user_agent)
                    <div>
                        <label class="text-gray-500">User Agent</label>
                        <p class="text-gray-900 text-xs break-all">{{ $message->user_agent }}</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection

