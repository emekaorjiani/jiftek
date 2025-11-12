<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Page Model
 * 
 * Represents a page in the CMS (home, about, services, contact).
 * Stores page-level content and metadata in a flexible JSON structure.
 */
class Page extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'slug',
        'content',
        'meta_title',
        'meta_description',
        'meta_keywords',
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
            'content' => 'array',
        ];
    }

    /**
     * Get the user who last updated this page.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get all content sections for this page.
     */
    public function sections(): HasMany
    {
        return $this->hasMany(ContentSection::class)->orderBy('order');
    }

    /**
     * Get a specific section by key.
     */
    public function getSection(string $key): ?ContentSection
    {
        return $this->sections()->where('section_key', $key)->first();
    }
}
