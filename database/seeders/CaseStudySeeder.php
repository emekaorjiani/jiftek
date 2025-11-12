<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CaseStudy;
use Illuminate\Support\Str;

/**
 * CaseStudySeeder
 *
 * Seeds the case_studies table with real-world examples of how our solutions
 * have helped organizations overcome challenges and achieve their goals.
 * Includes sample data for various industries.
 */
class CaseStudySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        CaseStudy::query()->delete();

        // Create case studies
        $caseStudies = [
            [
                'title' => 'Digital Transformation for Financial Services',
                'description' => 'How we helped a leading bank modernize their legacy systems and improve customer experience.',
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
                'seo_title' => 'Digital Transformation for Financial Services Case Study | Jiftek',
                'seo_description' => 'Learn how we helped a leading bank modernize their legacy systems and improve customer experience through digital transformation.',
                'seo_keywords' => 'financial services, digital transformation, legacy system modernization, banking technology',
            ],
            [
                'title' => 'Healthcare Innovation with AI-Driven Diagnostics',
                'description' => 'Implementing AI-driven diagnostics platform that improved patient outcomes by 35%.',
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
            [
                'title' => 'E-Commerce Platform Scalability Solution',
                'description' => 'Scaling an e-commerce platform to handle 10x traffic growth during peak seasons.',
                'content' => '<p>We worked with a fast-growing e-commerce company to scale their platform to handle massive traffic increases during peak shopping seasons. The solution involved cloud infrastructure optimization, database scaling, and performance tuning.</p>
                
                <h3>Challenge</h3>
                <p>The e-commerce platform was experiencing performance issues and downtime during peak shopping periods, resulting in lost sales and poor customer experience. They needed a scalable solution that could handle traffic spikes without compromising performance.</p>
                
                <h3>Solution</h3>
                <p>We implemented a comprehensive scaling strategy using cloud infrastructure with auto-scaling capabilities. We optimized database queries, implemented caching layers, and redesigned the architecture to support horizontal scaling.</p>
                
                <h3>Results</h3>
                <ul>
                    <li>Handled 10x traffic increase during peak seasons</li>
                    <li>Reduced page load time by 70%</li>
                    <li>Eliminated downtime during peak periods</li>
                    <li>Increased conversion rate by 25%</li>
                    <li>Reduced infrastructure costs by 30% through optimization</li>
                </ul>',
                'image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&q=80',
                'client_name' => 'Fast-Growing E-Commerce Company',
                'client_industry' => 'E-Commerce',
                'results' => 'Handled 10x traffic increase, reduced page load time by 70%, eliminated downtime, increased conversion rate by 25%',
                'order' => 3,
                'is_active' => true,
                'seo_title' => 'E-Commerce Platform Scalability Case Study | Jiftek',
                'seo_description' => 'Learn how we scaled an e-commerce platform to handle 10x traffic growth during peak seasons.',
                'seo_keywords' => 'e-commerce, scalability, cloud infrastructure, performance optimization, traffic scaling',
            ],
            [
                'title' => 'Manufacturing Process Automation',
                'description' => 'Implementing IoT and automation solutions that increased production efficiency by 45%.',
                'content' => '<p>We partnered with a manufacturing company to implement IoT sensors and automation solutions that transformed their production processes. The solution integrated real-time monitoring, predictive maintenance, and automated quality control.</p>
                
                <h3>Challenge</h3>
                <p>The manufacturing company faced challenges with production inefficiencies, equipment downtime, and quality control issues. They needed a comprehensive solution to modernize their operations and improve productivity.</p>
                
                <h3>Solution</h3>
                <p>We deployed IoT sensors throughout the production line, implemented predictive maintenance algorithms, and automated quality control processes. We also created a centralized dashboard for real-time monitoring and analytics.</p>
                
                <h3>Results</h3>
                <ul>
                    <li>Increased production efficiency by 45%</li>
                    <li>Reduced equipment downtime by 60%</li>
                    <li>Improved product quality by 30%</li>
                    <li>Reduced maintenance costs by 35%</li>
                    <li>Enabled real-time production monitoring</li>
                </ul>',
                'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&q=80',
                'client_name' => 'Leading Manufacturing Company',
                'client_industry' => 'Manufacturing',
                'results' => 'Increased production efficiency by 45%, reduced equipment downtime by 60%, improved product quality by 30%',
                'order' => 4,
                'is_active' => true,
                'seo_title' => 'Manufacturing Process Automation Case Study | Jiftek',
                'seo_description' => 'Discover how IoT and automation solutions increased production efficiency by 45% for a manufacturing company.',
                'seo_keywords' => 'manufacturing, IoT, automation, predictive maintenance, production efficiency',
            ],
        ];

        foreach ($caseStudies as $caseStudyData) {
            if (!isset($caseStudyData['slug'])) {
                $caseStudyData['slug'] = Str::slug($caseStudyData['title']);
            }
            CaseStudy::create($caseStudyData);
        }

        $this->command->info('Case studies seeded successfully!');
    }
}

