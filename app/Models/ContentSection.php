<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * ContentSection Model
 * 
 * Represents a flexible content section within a page.
 * Allows dynamic content management with ordering support.
 */
class ContentSection extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'page_id',
        'section_key',
        'content',
        'order',
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
     * Get the page that owns this section.
     */
    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}
