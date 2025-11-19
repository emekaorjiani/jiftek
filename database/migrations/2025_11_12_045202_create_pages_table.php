<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates the pages table to store page-level content for home, about, services, and contact pages.
     * Uses JSON field for flexible content structure.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->comment('Page identifier: home, about, services, contact');
            $table->json('content')->nullable()->comment('Flexible JSON structure for page content');
            $table->string('meta_title')->nullable()->comment('SEO meta title');
            $table->text('meta_description')->nullable()->comment('SEO meta description');
            $table->string('meta_keywords')->nullable()->comment('SEO meta keywords');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null')->comment('User who last updated the page');
            $table->timestamps();
            
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
