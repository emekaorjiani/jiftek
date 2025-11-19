<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates the content_sections table to store flexible content sections for pages.
     * Allows dynamic content management with ordering support.
     */
    public function up(): void
    {
        Schema::create('content_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained('pages')->onDelete('cascade')->comment('Reference to the parent page');
            $table->string('section_key')->comment('Section identifier: hero, solutions, case-studies, etc.');
            $table->json('content')->nullable()->comment('Flexible JSON structure for section content');
            $table->integer('order')->default(0)->comment('Order for displaying sections');
            $table->timestamps();
            
            $table->index(['page_id', 'section_key']);
            $table->index(['page_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_sections');
    }
};
