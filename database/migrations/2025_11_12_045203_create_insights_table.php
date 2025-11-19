<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates the insights table to store blog posts, case studies, whitepapers, and webinars.
     * Supports flexible content types with SEO optimization.
     */
    public function up(): void
    {
        Schema::create('insights', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable()->comment('Brief summary of the content');
            $table->longText('content')->nullable()->comment('Main content body');
            $table->enum('type', ['blog', 'case-study', 'whitepaper', 'webinar'])->default('blog');
            $table->enum('status', ['draft', 'published', 'scheduled'])->default('draft');
            $table->foreignId('author_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('category')->nullable();
            $table->text('tags')->nullable()->comment('Comma-separated tags');
            $table->string('featured_image')->nullable()->comment('Path to featured image');
            $table->string('seo_title')->nullable()->comment('SEO optimized title');
            $table->text('seo_description')->nullable()->comment('SEO meta description');
            $table->string('seo_keywords')->nullable()->comment('SEO keywords');
            $table->timestamp('published_at')->nullable()->comment('Scheduled or actual publish date');
            $table->timestamps();
            
            $table->index('slug');
            $table->index('type');
            $table->index('status');
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insights');
    }
};
