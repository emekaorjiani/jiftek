<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Adds solution_id foreign key to services table.
     * Services belong to a solution category.
     */
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->foreignId('solution_id')->nullable()->after('id')->constrained('solutions')->onDelete('cascade');
            $table->index('solution_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign(['solution_id']);
            $table->dropIndex(['solution_id']);
            $table->dropColumn('solution_id');
        });
    }
};
