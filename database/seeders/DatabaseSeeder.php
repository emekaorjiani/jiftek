<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * DatabaseSeeder
 * 
 * Main seeder that orchestrates all other seeders.
 * Seeds in the correct order to handle dependencies:
 * 1. Roles and Permissions (needed for users)
 * 2. Users (needed for content sections updated_by field)
 * 3. Services (standalone content)
 * 4. Content Sections (pages and sections for CMS)
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('Starting database seeding...');
        
        $this->call([
            // Step 1: Create roles and permissions (needed for users)
            RolePermissionSeeder::class,
            
            // Step 2: Create users (needed for content sections)
            UserSeeder::class,
            
            // Step 3: Seed services
            ServiceSeeder::class,
            
            // Step 4: Seed team members
            TeamMemberSeeder::class,
            
            // Step 5: Seed insights (blog posts, articles)
            InsightSeeder::class,
            
            // Step 6: Seed testimonials/case studies
            TestimonialSeeder::class,
            
            // Step 7: Seed case studies
            CaseStudySeeder::class,
            
            // Step 8: Seed partners/company logos
            PartnerSeeder::class,
            
            // Step 9: Seed all content sections (pages and sections)
            ContentSectionSeeder::class,
        ]);

        $this->command->info('Database seeding completed successfully!');
    }
}
