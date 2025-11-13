<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    /**
     * Handle image upload
     */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120', // 5MB max
        ]);

        try {
            $file = $request->file('image');
            $filename = Str::random(20) . '_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('images', $filename, 'public');
            
            // Return full URL path
            $fullPath = Storage::disk('public')->url($path);
            
            return response()->json([
                'success' => true,
                'path' => $fullPath,
                'message' => 'Image uploaded successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }
}

