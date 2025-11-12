<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Solution;
use App\Models\Service;
use Illuminate\Support\Str;

/**
 * ServiceSeeder
 *
 * Seeds the solutions and services tables.
 * Solutions are the main categories, services are individual items under each solution.
 */
class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data (delete in order to respect foreign keys)
        Service::query()->delete();
        Solution::query()->delete();

        // Create Solutions (main categories)
        $solutions = [
            [
                'title' => 'Cloud Services',
                'description' => 'Secure, scalable cloud infrastructure and migration services to modernize your IT environment.',
                'content' => '<p>Transform your IT infrastructure with our comprehensive cloud services. We help businesses migrate to the cloud, optimize their cloud infrastructure, and leverage cloud technologies for better scalability and cost efficiency.</p>',
                'image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
                'icon' => 'cloud',
                'order' => 1,
                'is_active' => true,
                'seo_title' => 'Cloud Services Solutions | Jiftek',
                'seo_description' => 'Expert cloud services including migration, infrastructure management, and cloud security solutions.',
                'seo_keywords' => 'cloud services, cloud migration, cloud infrastructure, managed cloud services',
            ],
            [
                'title' => 'Web & Design',
                'description' => 'Beautiful, responsive websites and digital experiences that engage your audience and drive results.',
                'content' => '<p>Create stunning web experiences with our web design and development services. We combine creative design with cutting-edge technology to build websites that not only look great but also perform exceptionally.</p>',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
                'icon' => 'web',
                'order' => 2,
                'is_active' => true,
                'seo_title' => 'Web Design & Development Solutions | Jiftek',
                'seo_description' => 'Professional web design and development services. Responsive websites, UI/UX design, and modern web applications.',
                'seo_keywords' => 'web design, web development, UI/UX design, responsive design, website design',
            ],
            [
                'title' => 'Cyber Security',
                'description' => 'Protect your business with comprehensive security solutions designed for the modern threat landscape.',
                'content' => '<p>Keep your business safe with our comprehensive cybersecurity services. We provide security assessments, penetration testing, compliance support, and security operations to protect your digital assets.</p>',
                'image' => 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80',
                'icon' => 'shield',
                'order' => 3,
                'is_active' => true,
                'seo_title' => 'Cybersecurity Solutions | Jiftek',
                'seo_description' => 'Comprehensive cybersecurity services including security assessments, penetration testing, and compliance support.',
                'seo_keywords' => 'cybersecurity, security assessments, penetration testing, compliance, security operations',
            ],
            [
                'title' => 'IT Training',
                'description' => 'Empower your team with comprehensive IT training programs tailored to your organization\'s needs.',
                'content' => '<p>Build a skilled IT workforce with our comprehensive training programs. We offer customized training solutions that help your team stay current with the latest technologies and best practices.</p>',
                'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
                'icon' => 'training',
                'order' => 4,
                'is_active' => true,
                'seo_title' => 'IT Training & Certification Programs | Jiftek',
                'seo_description' => 'Comprehensive IT training programs including technical skills, certifications, and professional development.',
                'seo_keywords' => 'IT training, technical training, certification programs, cloud training, cybersecurity training',
            ],
            [
                'title' => 'IT Consulting',
                'description' => 'Strategic technology consulting to help you make informed decisions and achieve your business objectives.',
                'content' => '<p>Get expert guidance on your technology strategy with our IT consulting services. Our experienced consultants work with you to understand your business challenges and develop technology strategies that align with your goals.</p>',
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
                'icon' => 'consulting',
                'order' => 5,
                'is_active' => true,
                'seo_title' => 'IT Consulting Services | Jiftek',
                'seo_description' => 'Strategic IT consulting services including technology strategy, digital transformation, and IT assessments.',
                'seo_keywords' => 'IT consulting, technology consulting, IT strategy, digital transformation, technology assessment',
            ],
        ];

        $createdSolutions = [];
        foreach ($solutions as $solutionData) {
            if (!isset($solutionData['slug'])) {
                $solutionData['slug'] = Str::slug($solutionData['title']);
            }
            $solution = Solution::create($solutionData);
            $createdSolutions[$solution->slug] = $solution->id;
        }

        // Create Services (individual items under each solution)
        $services = [
            // Cloud Services Solutions
            [
                'title' => 'Cloud Migration',
                'description' => 'Seamlessly migrate your infrastructure to the cloud with minimal downtime.',
                'content' => '<p>Our cloud migration service helps you move your applications and data to the cloud efficiently and securely.</p>',
                'image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
                'features' => ['Assessment & Planning', 'Data Migration', 'Application Migration', 'Post-Migration Support'],
                'order' => 1,
                'solution_id' => $createdSolutions['cloud-services'],
            ],
            [
                'title' => 'Cloud Infrastructure Setup',
                'description' => 'Design and deploy scalable cloud infrastructure tailored to your needs.',
                'content' => '<p>We design and deploy cloud infrastructure that scales with your business.</p>',
                'image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
                'features' => ['Infrastructure Design', 'Auto-scaling', 'Load Balancing', 'Monitoring'],
                'order' => 2,
                'solution_id' => $createdSolutions['cloud-services'],
            ],
            // Web & Design Solutions
            [
                'title' => 'Website Development',
                'description' => 'Custom website development with modern technologies and best practices.',
                'content' => '<p>We build responsive, fast, and SEO-friendly websites that convert visitors into customers.</p>',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
                'features' => ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Mobile-First'],
                'order' => 1,
                'solution_id' => $createdSolutions['web-design'],
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'User-centered design that enhances user experience and drives engagement.',
                'content' => '<p>Our design team creates intuitive and beautiful user interfaces that users love.</p>',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
                'features' => ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
                'order' => 2,
                'solution_id' => $createdSolutions['web-design'],
            ],
            // Cyber Security Solutions
            [
                'title' => 'Security Assessment',
                'description' => 'Comprehensive security audits to identify vulnerabilities and risks.',
                'content' => '<p>We conduct thorough security assessments to identify and mitigate risks.</p>',
                'image' => 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80',
                'features' => ['Vulnerability Scanning', 'Penetration Testing', 'Risk Assessment', 'Compliance Review'],
                'order' => 1,
                'solution_id' => $createdSolutions['cyber-security'],
            ],
            [
                'title' => 'Security Monitoring',
                'description' => '24/7 security monitoring and incident response to protect your assets.',
                'content' => '<p>Round-the-clock monitoring to detect and respond to security threats.</p>',
                'image' => 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80',
                'features' => ['24/7 Monitoring', 'Threat Detection', 'Incident Response', 'Security Reports'],
                'order' => 2,
                'solution_id' => $createdSolutions['cyber-security'],
            ],
            // IT Training Solutions
            [
                'title' => 'Cloud Training',
                'description' => 'Comprehensive cloud computing training for AWS, Azure, and GCP.',
                'content' => '<p>Learn cloud technologies from industry experts with hands-on training.</p>',
                'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
                'features' => ['AWS Training', 'Azure Training', 'GCP Training', 'Certification Prep'],
                'order' => 1,
                'solution_id' => $createdSolutions['it-training'],
            ],
            [
                'title' => 'Security Training',
                'description' => 'Cybersecurity training to build a security-aware workforce.',
                'content' => '<p>Train your team on cybersecurity best practices and threat awareness.</p>',
                'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
                'features' => ['Security Awareness', 'Threat Training', 'Compliance Training', 'Hands-on Labs'],
                'order' => 2,
                'solution_id' => $createdSolutions['it-training'],
            ],
            // IT Consulting Solutions
            [
                'title' => 'Technology Strategy',
                'description' => 'Develop a comprehensive technology strategy aligned with business goals.',
                'content' => '<p>We help you create a technology roadmap that drives business success.</p>',
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
                'features' => ['Strategy Development', 'Technology Roadmap', 'Vendor Selection', 'Implementation Planning'],
                'order' => 1,
                'solution_id' => $createdSolutions['it-consulting'],
            ],
            [
                'title' => 'Digital Transformation',
                'description' => 'Transform your business with digital technologies and processes.',
                'content' => '<p>Guide your organization through digital transformation initiatives.</p>',
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
                'features' => ['Process Optimization', 'Digital Strategy', 'Change Management', 'Technology Adoption'],
                'order' => 2,
                'solution_id' => $createdSolutions['it-consulting'],
            ],
        ];

        foreach ($services as $serviceData) {
            if (!isset($serviceData['slug'])) {
                $serviceData['slug'] = Str::slug($serviceData['title']);
            }
            $serviceData['is_active'] = true;
            Service::create($serviceData);
        }

        $this->command->info('Solutions and Services seeded successfully!');
    }
}
