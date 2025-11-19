<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

/**
 * CaseStudy Model
 *
 * Represents real-world case studies showcasing how our solutions have helped organizations.
 * Supports flexible content structure with images, client information, and SEO optimization.
 */
class CaseStudy extends Model
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
     * Auto-generates slugs and sets creator/updater IDs.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate unique slug from title if not provided
        static::creating(function ($caseStudy) {
            if (empty($caseStudy->slug) && !empty($caseStudy->title)) {
                $baseSlug = Str::slug($caseStudy->title);
                $slug = $baseSlug;
                $counter = 1;

                // Ensure uniqueness
                while (static::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }

                $caseStudy->slug = $slug;
            }
            if (!isset($caseStudy->created_by)) {
                $caseStudy->created_by = auth()->id();
            }
        });

        static::updating(function ($caseStudy) {
            // Only regenerate slug if title changed and slug is empty or needs updating
            if ($caseStudy->isDirty('title')) {
                if (empty($caseStudy->slug)) {
                    $baseSlug = Str::slug($caseStudy->title);
                    $slug = $baseSlug;
                    $counter = 1;

                    // Ensure uniqueness (excluding current record)
                    while (static::where('slug', $slug)->where('id', '!=', $caseStudy->id)->exists()) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    }

                    $caseStudy->slug = $slug;
                }
            }
            if (!isset($caseStudy->updated_by)) {
                $caseStudy->updated_by = auth()->id();
            }
        });
    }

    /**
     * Get the user who created this case study.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated this case study.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Scope to get only active case studies.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order case studies by order field.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('title');
    }
}



