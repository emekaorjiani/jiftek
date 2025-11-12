<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;
use Illuminate\Support\Str;

/**
 * TestimonialSeeder
 *
 * Seeds the testimonials table with client success stories and case studies.
 * Includes sample data for Financial Services and Healthcare case studies.
 */
class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        Testimonial::query()->delete();

        // Create testimonials/case studies
        $testimonials = [
            [
                'title' => 'Financial Services Transformation',
                'description' => 'How we helped a leading bank modernize their legacy systems and improve customer experience',
                'content' => '<p>We partnered with a leading financial institution to transform their legacy banking systems into a modern, cloud-based platform. The project involved migrating critical banking applications, implementing new security protocols, and enhancing the customer experience through digital channels.</p>
                
                <h3>Challenge</h3>
                <p>The bank was struggling with outdated legacy systems that were difficult to maintain, expensive to operate, and unable to support modern customer expectations. They needed a comprehensive digital transformation solution.</p>
                
                <h3>Solution</h3>
                <p>We developed a phased migration strategy that moved their core banking systems to a secure cloud infrastructure while maintaining business continuity. We implemented modern APIs, enhanced security measures, and created a new customer-facing digital platform.</p>
                
                <h3>Results</h3>
                <ul>
                    <li>Reduced operational costs by 40%</li>
                    <li>Improved system performance by 60%</li>
                    <li>Enhanced customer satisfaction scores by 35%</li>
                    <li>Reduced downtime by 80%</li>
                    <li>Enabled faster time-to-market for new products</li>
                </ul>',
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                'client_name' => 'Leading Financial Institution',
                'client_industry' => 'Financial Services',
                'results' => 'Reduced operational costs by 40%, improved system performance by 60%, enhanced customer satisfaction by 35%',
                'order' => 1,
                'is_active' => true,
                'seo_title' => 'Financial Services Transformation Case Study | Jiftek',
                'seo_description' => 'Learn how we helped a leading bank modernize their legacy systems and improve customer experience through digital transformation.',
                'seo_keywords' => 'financial services, digital transformation, legacy system modernization, banking technology',
            ],
            [
                'title' => 'Healthcare Innovation',
                'description' => 'Implementing AI-driven diagnostics platform that improved patient outcomes by 35%',
                'content' => '<p>We collaborated with a major healthcare provider to develop and implement an AI-driven diagnostics platform that revolutionized their patient care delivery. The platform uses machine learning algorithms to assist healthcare professionals in making faster and more accurate diagnoses.</p>
                
                <h3>Challenge</h3>
                <p>The healthcare provider needed to improve diagnostic accuracy, reduce time-to-diagnosis, and enhance patient outcomes while managing increasing patient volumes and maintaining compliance with healthcare regulations.</p>
                
                <h3>Solution</h3>
                <p>We developed a comprehensive AI-driven diagnostics platform that integrates with existing healthcare systems. The platform uses advanced machine learning models trained on medical imaging data and patient records to provide diagnostic recommendations to healthcare professionals.</p>
                
                <h3>Results</h3>
                <ul>
                    <li>Improved patient outcomes by 35%</li>
                    <li>Reduced diagnostic time by 50%</li>
                    <li>Increased diagnostic accuracy by 28%</li>
                    <li>Enhanced workflow efficiency by 45%</li>
                    <li>Improved patient satisfaction scores</li>
                </ul>',
                'image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop&q=80',
                'client_name' => 'Major Healthcare Provider',
                'client_industry' => 'Healthcare',
                'results' => 'Improved patient outcomes by 35%, reduced diagnostic time by 50%, increased diagnostic accuracy by 28%',
                'order' => 2,
                'is_active' => true,
                'seo_title' => 'Healthcare AI Diagnostics Case Study | Jiftek',
                'seo_description' => 'Discover how our AI-driven diagnostics platform improved patient outcomes by 35% for a major healthcare provider.',
                'seo_keywords' => 'healthcare AI, medical diagnostics, healthcare technology, AI in healthcare, patient outcomes',
            ],
        ];

        foreach ($testimonials as $testimonialData) {
            if (!isset($testimonialData['slug'])) {
                $testimonialData['slug'] = Str::slug($testimonialData['title']);
            }
            Testimonial::create($testimonialData);
        }

        $this->command->info('Testimonials seeded successfully!');
    }
}

