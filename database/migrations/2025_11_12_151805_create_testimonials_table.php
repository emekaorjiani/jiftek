<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates the testimonials table to store client success stories and case studies.
     * Supports flexible content structure with images, client information, and SEO optimization.
     */
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable()->comment('Brief summary/description of the case study');
            $table->longText('content')->nullable()->comment('Full case study content');
            $table->string('image')->nullable()->comment('Featured image or illustration');
            $table->string('client_name')->nullable()->comment('Name of the client company');
            $table->string('client_industry')->nullable()->comment('Industry sector (e.g., Financial Services, Healthcare)');
            $table->text('results')->nullable()->comment('Key results and metrics achieved');
            $table->integer('order')->default(0)->comment('Display order');
            $table->boolean('is_active')->default(true)->comment('Whether the testimonial is active');
            $table->string('seo_title')->nullable()->comment('SEO optimized title');
            $table->text('seo_description')->nullable()->comment('SEO meta description');
            $table->string('seo_keywords')->nullable()->comment('SEO keywords');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            $table->index('slug');
            $table->index('is_active');
            $table->index('order');
            $table->index('client_industry');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
