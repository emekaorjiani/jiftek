<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Creates the solutions table to store main solution categories.
     * Solutions are the parent categories that contain multiple services.
     */
    public function up(): void
    {
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable()->comment('Brief description of the solution category');
            $table->longText('content')->nullable()->comment('Detailed content about the solution');
            $table->text('image')->nullable()->comment('Path or URL to solution image');
            $table->text('icon')->nullable()->comment('Icon name or SVG for the solution');
            $table->integer('order')->default(0)->comment('Display order');
            $table->boolean('is_active')->default(true)->comment('Whether the solution is active');
            $table->string('seo_title')->nullable()->comment('SEO optimized title');
            $table->text('seo_description')->nullable()->comment('SEO meta description');
            $table->string('seo_keywords')->nullable()->comment('SEO keywords');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();

            $table->index('slug');
            $table->index('is_active');
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solutions');
    }
};
