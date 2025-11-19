<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

/**
 * Insight Model
 * 
 * Represents blog posts, case studies, whitepapers, and webinars.
 * Supports flexible content types with SEO optimization and publishing controls.
 */
class Insight extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'type',
        'status',
        'author_id',
        'category',
        'tags',
        'featured_image',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'published_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate unique slug from title if not provided
        static::creating(function ($insight) {
            if (empty($insight->slug) && !empty($insight->title)) {
                $baseSlug = Str::slug($insight->title);
                $slug = $baseSlug;
                $counter = 1;
                
                // Ensure uniqueness
                while (static::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }
                
                $insight->slug = $slug;
            }
        });

        static::updating(function ($insight) {
            // Only regenerate slug if title changed and slug is empty or needs updating
            if ($insight->isDirty('title')) {
                if (empty($insight->slug)) {
                    $baseSlug = Str::slug($insight->title);
                    $slug = $baseSlug;
                    $counter = 1;
                    
                    // Ensure uniqueness (excluding current record)
                    while (static::where('slug', $slug)->where('id', '!=', $insight->id)->exists()) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    }
                    
                    $insight->slug = $slug;
                }
            }
        });
    }

    /**
     * Get the author of this insight.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Scope to get only published insights.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('published_at')
                  ->orWhere('published_at', '<=', now());
            });
    }

    /**
     * Scope to filter by type.
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Get tags as an array.
     */
    public function getTagsArrayAttribute(): array
    {
        if (empty($this->tags)) {
            return [];
        }
        return array_map('trim', explode(',', $this->tags));
    }
}
