<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * Solution Model
 *
 * Represents main solution categories (parent categories).
 * Solutions contain multiple services.
 */
class Solution extends Model
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
        'icon',
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
        static::creating(function ($solution) {
            if (empty($solution->slug) && !empty($solution->title)) {
                $solution->slug = Str::slug($solution->title);
            }
            if (!isset($solution->created_by)) {
                $solution->created_by = auth()->id();
            }
        });

        static::updating(function ($solution) {
            if ($solution->isDirty('title') && empty($solution->slug)) {
                $solution->slug = Str::slug($solution->title);
            }
            if (!isset($solution->updated_by)) {
                $solution->updated_by = auth()->id();
            }
        });
    }

    /**
     * Get the user who created this solution.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated this solution.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get all services for this solution.
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class)->orderBy('order');
    }

    /**
     * Get active services for this solution.
     */
    public function activeServices(): HasMany
    {
        return $this->hasMany(Service::class)->where('is_active', true)->orderBy('order');
    }

    /**
     * Scope to get only active solutions.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order solutions by order field.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('title');
    }
}
