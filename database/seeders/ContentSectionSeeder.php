<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\ContentSection;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * ContentSectionSeeder
 * 
 * Seeds all pages (home, about, services, contact) with their default content sections.
 * This ensures the CMS has all expected sections populated with default content.
 */
class ContentSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first admin user for updated_by field
        $adminUser = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->first() ?? User::first();

        // Seed Home Page
        $this->seedHomePage($adminUser);

        // Seed About Page
        $this->seedAboutPage($adminUser);

        // Seed Services Page
        $this->seedServicesPage($adminUser);

        // Seed Contact Page
        $this->seedContactPage($adminUser);
    }

    /**
     * Seed the home page with all expected sections.
     */
    private function seedHomePage(?User $adminUser): void
    {
        $page = Page::firstOrCreate(
            ['slug' => 'home'],
            [
                'meta_title' => 'Jiftek - Innovative Technology Solutions',
                'meta_description' => 'Jiftek delivers cutting-edge technology consulting and solutions that drive innovation, efficiency, and growth for forward-thinking organizations.',
                'meta_keywords' => 'technology consulting, digital transformation, cloud services, custom software',
                'updated_by' => $adminUser?->id,
            ]
        );

        // Hero Section with carousel items
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'hero',
            ],
            [
                'content' => [
                    'items' => [
                        [
                            'badge' => 'Innovative Technology Solutions',
                            'title' => 'Transforming Business Through',
                            'titleHighlight' => 'Smart Technology',
                            'description' => 'Jiftek delivers cutting-edge technology consulting and solutions that drive innovation, efficiency, and growth for forward-thinking organizations.',
                            'primaryButton' => 'Explore Solutions',
                            'primaryButtonLink' => '/solutions',
                            'secondaryButton' => 'Request a Consultation',
                            'secondaryButtonLink' => '/contact',
                            'image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80',
                            'imageAlt' => 'Digital transformation and technology innovation',
                        ],
                        [
                            'badge' => 'Cloud & Infrastructure',
                            'title' => 'Scalable Cloud Solutions for',
                            'titleHighlight' => 'Modern Enterprises',
                            'description' => 'Empower your business with secure, scalable cloud infrastructure that adapts to your needs and accelerates your digital transformation journey.',
                            'primaryButton' => 'View Services',
                            'primaryButtonLink' => '/services',
                            'secondaryButton' => 'Learn More',
                            'secondaryButtonLink' => '/solutions',
                            'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
                            'imageAlt' => 'Cloud computing and infrastructure',
                        ],
                        [
                            'badge' => 'AI & Machine Learning',
                            'title' => 'Intelligent Automation for',
                            'titleHighlight' => 'Business Excellence',
                            'description' => 'Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and unlock new possibilities for your business.',
                            'primaryButton' => 'Discover AI Solutions',
                            'primaryButtonLink' => '/solutions',
                            'secondaryButton' => 'Get Started',
                            'secondaryButtonLink' => '/contact',
                            'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                            'imageAlt' => 'Artificial intelligence and machine learning',
                        ],
                        [
                            'badge' => 'Digital Transformation',
                            'title' => 'Future-Ready Solutions for',
                            'titleHighlight' => 'Digital Success',
                            'description' => 'Navigate the digital landscape with confidence. Our comprehensive solutions help you modernize, optimize, and transform your business operations.',
                            'primaryButton' => 'Start Your Journey',
                            'primaryButtonLink' => '/contact',
                            'secondaryButton' => 'View Case Studies',
                            'secondaryButtonLink' => '/insights',
                            'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
                            'imageAlt' => 'Digital transformation and innovation',
                        ],
                    ],
                ],
                'order' => 1,
            ]
        );

        // Trusted By Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'trusted',
            ],
            [
                'content' => [
                    'title' => 'Trusted by industry leaders',
                    'partners' => [
                        ['name' => 'TechCorp', 'logo' => ''],
                        ['name' => 'InnovateLabs', 'logo' => ''],
                        ['name' => 'DigitalFirst', 'logo' => ''],
                        ['name' => 'CloudSolutions', 'logo' => ''],
                    ],
                ],
                'order' => 2,
            ]
        );

        // Solutions Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'solutions',
            ],
            [
                'content' => [
                    'badge' => 'Our Solutions',
                    'title' => 'Comprehensive Technology Solutions',
                    'description' => 'We offer end-to-end technology services designed to help your business innovate and thrive in the digital era.',
                    'items' => [],
                    'buttonText' => 'View All Solutions',
                    'buttonLink' => '/solutions',
                ],
                'order' => 3,
            ]
        );

        // Case Studies Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'case-studies',
            ],
            [
                'content' => [
                    'badge' => 'Success Stories',
                    'title' => 'Our Client Success Stories',
                    'description' => 'Discover how we\'ve helped organizations overcome challenges and achieve their business goals.',
                    'items' => [],
                    'buttonText' => 'Browse All Case Studies',
                    'buttonLink' => '/case-studies',
                ],
                'order' => 4,
            ]
        );

        // CTA Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'cta',
            ],
            [
                'content' => [
                    'title' => 'Ready to Transform Your Business?',
                    'description' => 'Schedule a consultation with our experts to discover how Jiftek can help you achieve your technology goals.',
                    'primaryButton' => 'Get Started Today',
                    'primaryButtonLink' => '/contact',
                    'secondaryButton' => 'Learn More',
                    'secondaryButtonLink' => '/services',
                    'backgroundColor' => '#3b82f6',
                ],
                'order' => 5,
            ]
        );
    }

    /**
     * Seed the about page with default sections.
     */
    private function seedAboutPage(?User $adminUser): void
    {
        $page = Page::firstOrCreate(
            ['slug' => 'about'],
            [
                'meta_title' => 'About Us - Jiftek',
                'meta_description' => 'Learn about Jiftek, our mission, vision, and the team behind innovative technology solutions.',
                'meta_keywords' => 'about jiftek, technology company, our team, company mission',
                'updated_by' => $adminUser?->id,
            ]
        );

        // Hero Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'hero',
            ],
            [
                'content' => [
                    'title' => 'About Jiftek',
                    'subtitle' => 'Leading Technology Solutions Provider',
                    'description' => 'We are a team of passionate technologists dedicated to helping businesses thrive in the digital age.',
                ],
                'order' => 1,
            ]
        );

        // Mission Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'mission',
            ],
            [
                'content' => [
                    'title' => 'Our Mission',
                    'description' => 'To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage.',
                ],
                'order' => 2,
            ]
        );

        // Vision Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'vision',
            ],
            [
                'content' => [
                    'title' => 'Our Vision',
                    'description' => 'To be the trusted technology partner that helps organizations navigate digital transformation and achieve sustainable success.',
                ],
                'order' => 3,
            ]
        );

        // Values Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'values',
            ],
            [
                'content' => [
                    'title' => 'Our Values',
                    'items' => [
                        [
                            'title' => 'Innovation',
                            'description' => 'We continuously explore new technologies and methodologies to deliver cutting-edge solutions.',
                        ],
                        [
                            'title' => 'Excellence',
                            'description' => 'We maintain the highest standards in everything we do, from code quality to client service.',
                        ],
                        [
                            'title' => 'Integrity',
                            'description' => 'We build trust through transparency, honesty, and ethical business practices.',
                        ],
                        [
                            'title' => 'Collaboration',
                            'description' => 'We work closely with our clients as partners, ensuring alignment and shared success.',
                        ],
                    ],
                ],
                'order' => 4,
            ]
        );
    }

    /**
     * Seed the services page with default sections.
     */
    private function seedServicesPage(?User $adminUser): void
    {
        $page = Page::firstOrCreate(
            ['slug' => 'services'],
            [
                'meta_title' => 'Our Services - Jiftek',
                'meta_description' => 'Comprehensive technology services including digital transformation, cloud services, and custom software development.',
                'meta_keywords' => 'technology services, digital transformation, cloud services, software development',
                'updated_by' => $adminUser?->id,
            ]
        );

        // Hero Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'hero',
            ],
            [
                'content' => [
                    'title' => 'Our Services',
                    'subtitle' => 'Comprehensive Technology Solutions',
                    'description' => 'We offer a wide range of technology services to help your business succeed in the digital era.',
                ],
                'order' => 1,
            ]
        );

        // Services Overview Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'overview',
            ],
            [
                'content' => [
                    'title' => 'What We Offer',
                    'description' => 'Our services are designed to address your unique business challenges and drive measurable results.',
                ],
                'order' => 2,
            ]
        );
    }

    /**
     * Seed the contact page with default sections.
     */
    private function seedContactPage(?User $adminUser): void
    {
        $page = Page::firstOrCreate(
            ['slug' => 'contact'],
            [
                'meta_title' => 'Contact Us - Jiftek',
                'meta_description' => 'Get in touch with Jiftek to discuss your technology needs and discover how we can help your business.',
                'meta_keywords' => 'contact jiftek, get in touch, technology consultation, business inquiry',
                'updated_by' => $adminUser?->id,
            ]
        );

        // Hero Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'hero',
            ],
            [
                'content' => [
                    'title' => 'Get In Touch',
                    'subtitle' => 'Let\'s Start a Conversation',
                    'description' => 'Have a project in mind? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
                ],
                'order' => 1,
            ]
        );

        // Contact Information Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'contact-info',
            ],
            [
                'content' => [
                    'title' => 'Contact Information',
                    'items' => [
                        [
                            'type' => 'phone',
                            'label' => 'Phone',
                            'value' => '+2348058288340',
                            'link' => 'tel:+2348058288340',
                        ],
                        [
                            'type' => 'whatsapp',
                            'label' => 'Chat on WhatsApp',
                            'value' => 'Open WhatsApp',
                            'link' => 'https://wa.me/2348058288340',
                        ],
                        [
                            'type' => 'email',
                            'label' => 'Send an Email',
                            'value' => 'info@jiftek.com',
                            'link' => 'mailto:info@jiftek.com',
                        ],
                        [
                            'type' => 'address',
                            'label' => 'Address',
                            'value' => '10 Ukpor Street, Ishawo, Agric, Ikorodu, Lagos.',
                            'link' => '',
                        ],
                    ],
                ],
                'order' => 2,
            ]
        );

        // Map Section - Stores map coordinates and embed settings
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'map',
            ],
            [
                'content' => [
                    'title' => 'Our Location',
                    'latitude' => 6.6,
                    'longitude' => 3.505,
                    'zoom' => 15,
                    'address' => '10 Ukpor Street, Ishawo, Agric, Ikorodu, Lagos.',
                ],
                'order' => 3,
            ]
        );

        // Office Hours Section
        ContentSection::updateOrCreate(
            [
                'page_id' => $page->id,
                'section_key' => 'office-hours',
            ],
            [
                'content' => [
                    'title' => 'Office Hours',
                    'description' => 'Our team is available during the following hours:',
                    'hours' => [
                        'Monday - Friday: 9:00 AM - 6:00 PM',
                        'Saturday: 10:00 AM - 4:00 PM',
                        'Sunday: Closed',
                    ],
                ],
                'order' => 4,
            ]
        );
    }
}

