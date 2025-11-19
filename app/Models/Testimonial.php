<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

/**
 * Testimonial Model
 * 
 * Represents client success stories and case studies.
 * Supports flexible content structure with images, client information, and SEO optimization.
 */
class Testimonial extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'client_name',
        'client_industry',
        'results',
        'order',
        'is_active',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'created_by',
        'updated_by',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'order' => 'integer',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate slug from title if not provided
        static::creating(function ($testimonial) {
            if (empty($testimonial->slug) && !empty($testimonial->title)) {
                $testimonial->slug = Str::slug($testimonial->title);
            }
            if (!isset($testimonial->created_by)) {
                $testimonial->created_by = auth()->id();
            }
        });

        static::updating(function ($testimonial) {
            if ($testimonial->isDirty('title') && empty($testimonial->slug)) {
                $testimonial->slug = Str::slug($testimonial->title);
            }
            if (!isset($testimonial->updated_by)) {
                $testimonial->updated_by = auth()->id();
            }
        });
    }

    /**
     * Get the user who created this testimonial.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated this testimonial.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Scope to get only active testimonials.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order testimonials by order field.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('title');
    }
}
