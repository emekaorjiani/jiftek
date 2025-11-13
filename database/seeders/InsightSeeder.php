<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Insight;
use App\Models\User;
use Illuminate\Support\Str;

/**
 * InsightSeeder
 *
 * Seeds the insights table with blog posts, articles, and other content types.
 * Includes sample data for various categories and types of insights.
 */
class InsightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        Insight::query()->delete();

        // Get the first admin user for author_id
        $adminUser = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->first() ?? User::first();

        // Create insights
        $insights = [
            [
                'title' => 'The Future of AI in Business: Opportunities and Challenges',
                'excerpt' => 'Explore how artificial intelligence is reshaping business operations and driving innovation across industries. Learn about the opportunities, challenges, and practical steps for implementation.',
                'content' => '<p>Artificial intelligence (AI) is transforming the business landscape at an unprecedented pace. From automating routine tasks to enabling data-driven decision-making, AI technologies are reshaping how organizations operate and compete.</p>
                
                <h3>Key Opportunities</h3>
                <p>AI presents numerous opportunities for businesses:</p>
                <ul>
                    <li><strong>Process Automation:</strong> Streamline operations and reduce manual work</li>
                    <li><strong>Data Analytics:</strong> Extract valuable insights from large datasets</li>
                    <li><strong>Customer Experience:</strong> Personalize interactions and improve satisfaction</li>
                    <li><strong>Innovation:</strong> Develop new products and services</li>
                </ul>
                
                <h3>Challenges to Consider</h3>
                <p>While AI offers significant benefits, organizations must also address several challenges:</p>
                <ul>
                    <li>Data quality and availability</li>
                    <li>Integration with existing systems</li>
                    <li>Skills and expertise requirements</li>
                    <li>Ethical considerations and bias</li>
                    <li>Cost and ROI concerns</li>
                </ul>
                
                <h3>Getting Started</h3>
                <p>To successfully implement AI in your business, start with a clear strategy, identify use cases that align with your business goals, and invest in the right talent and technology infrastructure.</p>',
                'type' => 'blog',
                'status' => 'published',
                'author_id' => $adminUser?->id,
                'category' => 'Technology',
                'tags' => 'AI, Business, Innovation, Technology',
                'featured_image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80',
                'seo_title' => 'The Future of AI in Business: Opportunities and Challenges | Jiftek',
                'seo_description' => 'Explore how artificial intelligence is reshaping business operations and driving innovation across industries.',
                'seo_keywords' => 'AI, artificial intelligence, business innovation, technology trends, AI implementation',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Cloud Migration Best Practices: A Comprehensive Guide',
                'excerpt' => 'Learn the essential strategies and best practices for migrating your infrastructure to the cloud successfully. Avoid common pitfalls and ensure a smooth transition.',
                'content' => '<p>Cloud migration has become a critical initiative for many organizations seeking to modernize their IT infrastructure, improve scalability, and reduce costs. However, a successful migration requires careful planning and execution.</p>
                
                <h3>Planning Your Migration</h3>
                <p>Before starting your cloud migration, it\'s essential to:</p>
                <ul>
                    <li>Assess your current infrastructure and applications</li>
                    <li>Define clear migration goals and success criteria</li>
                    <li>Choose the right cloud provider and services</li>
                    <li>Develop a detailed migration timeline</li>
                </ul>
                
                <h3>Best Practices</h3>
                <p>Follow these best practices to ensure a successful migration:</p>
                <ul>
                    <li>Start with non-critical applications</li>
                    <li>Implement proper security measures</li>
                    <li>Ensure data backup and recovery plans</li>
                    <li>Train your team on cloud technologies</li>
                    <li>Monitor and optimize costs continuously</li>
                </ul>
                
                <h3>Common Challenges</h3>
                <p>Be prepared to address common challenges such as data transfer issues, application compatibility, security concerns, and cost management.</p>',
                'type' => 'blog',
                'status' => 'published',
                'author_id' => $adminUser?->id,
                'category' => 'Cloud Computing',
                'tags' => 'Cloud, Migration, Infrastructure, Best Practices',
                'featured_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80',
                'seo_title' => 'Cloud Migration Best Practices: A Comprehensive Guide | Jiftek',
                'seo_description' => 'Learn the essential strategies and best practices for migrating your infrastructure to the cloud successfully.',
                'seo_keywords' => 'cloud migration, cloud computing, infrastructure migration, cloud best practices',
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Cybersecurity in 2024: Emerging Threats and Defense Strategies',
                'excerpt' => 'Stay ahead of the latest cybersecurity threats and learn effective defense strategies to protect your organization from evolving cyber risks.',
                'content' => '<p>As technology evolves, so do cybersecurity threats. Organizations must stay vigilant and adapt their security strategies to protect against emerging risks.</p>
                
                <h3>Emerging Threats</h3>
                <p>Key threats to watch in 2024 include:</p>
                <ul>
                    <li>AI-powered attacks and deepfakes</li>
                    <li>Ransomware-as-a-Service (RaaS)</li>
                    <li>Supply chain attacks</li>
                    <li>IoT device vulnerabilities</li>
                    <li>Cloud security breaches</li>
                </ul>
                
                <h3>Defense Strategies</h3>
                <p>Implement these strategies to strengthen your security posture:</p>
                <ul>
                    <li>Multi-factor authentication (MFA)</li>
                    <li>Regular security assessments and audits</li>
                    <li>Employee training and awareness programs</li>
                    <li>Zero-trust security architecture</li>
                    <li>Incident response planning</li>
                </ul>
                
                <h3>Best Practices</h3>
                <p>Maintain a proactive security approach by keeping systems updated, monitoring for threats continuously, and fostering a security-conscious culture within your organization.</p>',
                'type' => 'blog',
                'status' => 'published',
                'author_id' => $adminUser?->id,
                'category' => 'Security',
                'tags' => 'Cybersecurity, Security, Threats, Defense',
                'featured_image' => 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&q=80',
                'seo_title' => 'Cybersecurity in 2024: Emerging Threats and Defense Strategies | Jiftek',
                'seo_description' => 'Stay ahead of the latest cybersecurity threats and learn effective defense strategies to protect your organization.',
                'seo_keywords' => 'cybersecurity, security threats, cyber defense, information security',
                'published_at' => now()->subDays(15),
            ],
            [
                'title' => 'Digital Transformation: Building a Modern Enterprise',
                'excerpt' => 'Discover how to successfully navigate digital transformation initiatives and build a modern, agile enterprise that can thrive in today\'s competitive landscape.',
                'content' => '<p>Digital transformation is no longer optional—it\'s essential for organizations that want to remain competitive and relevant in today\'s fast-paced business environment.</p>
                
                <h3>What is Digital Transformation?</h3>
                <p>Digital transformation involves using digital technologies to fundamentally change how businesses operate and deliver value to customers. It goes beyond simply adopting new tools—it requires a cultural shift and reimagining business processes.</p>
                
                <h3>Key Components</h3>
                <p>Successful digital transformation includes:</p>
                <ul>
                    <li>Modernizing legacy systems</li>
                    <li>Adopting cloud technologies</li>
                    <li>Implementing data analytics</li>
                    <li>Enhancing customer experiences</li>
                    <li>Fostering innovation culture</li>
                </ul>
                
                <h3>Getting Started</h3>
                <p>Begin your transformation journey by assessing your current state, defining clear objectives, securing leadership support, and building a roadmap that aligns with your business goals.</p>',
                'type' => 'blog',
                'status' => 'published',
                'author_id' => $adminUser?->id,
                'category' => 'Digital Transformation',
                'tags' => 'Digital Transformation, Innovation, Business Strategy',
                'featured_image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                'seo_title' => 'Digital Transformation: Building a Modern Enterprise | Jiftek',
                'seo_description' => 'Discover how to successfully navigate digital transformation initiatives and build a modern, agile enterprise.',
                'seo_keywords' => 'digital transformation, enterprise modernization, business innovation',
                'published_at' => now()->subDays(20),
            ],
            [
                'title' => 'The Power of Data Analytics: Driving Business Decisions',
                'excerpt' => 'Learn how data analytics can transform your business decision-making process and unlock valuable insights from your data.',
                'content' => '<p>In today\'s data-driven world, organizations that effectively leverage data analytics gain a significant competitive advantage. Data analytics enables businesses to make informed decisions, identify trends, and optimize operations.</p>
                
                <h3>Benefits of Data Analytics</h3>
                <p>Data analytics provides numerous benefits:</p>
                <ul>
                    <li>Improved decision-making based on evidence</li>
                    <li>Better understanding of customer behavior</li>
                    <li>Operational efficiency improvements</li>
                    <li>Risk identification and mitigation</li>
                    <li>New revenue opportunities</li>
                </ul>
                
                <h3>Getting Started</h3>
                <p>To harness the power of data analytics, start by identifying key business questions, ensuring data quality, choosing the right tools, and building analytics capabilities within your organization.</p>',
                'type' => 'blog',
                'status' => 'published',
                'author_id' => $adminUser?->id,
                'category' => 'Analytics',
                'tags' => 'Data Analytics, Business Intelligence, Data Science',
                'featured_image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                'seo_title' => 'The Power of Data Analytics: Driving Business Decisions | Jiftek',
                'seo_description' => 'Learn how data analytics can transform your business decision-making process and unlock valuable insights.',
                'seo_keywords' => 'data analytics, business intelligence, data science, analytics',
                'published_at' => now()->subDays(25),
            ],
            [
                'title' => 'Remote Work Technology: Tools and Best Practices',
                'excerpt' => 'Explore the essential technologies and best practices for building an effective remote work environment that supports productivity and collaboration.',
                'content' => '<p>Remote work has become a permanent fixture in the modern workplace. To succeed, organizations need the right technology infrastructure and practices to support distributed teams.</p>
                
                <h3>Essential Tools</h3>
                <p>Key technologies for remote work include:</p>
                <ul>
                    <li>Video conferencing platforms</li>
                    <li>Collaboration and project management tools</li>
                    <li>Cloud-based file storage and sharing</li>
                    <li>Virtual private networks (VPNs)</li>
                    <li>Remote desktop solutions</li>
                </ul>
                
                <h3>Best Practices</h3>
                <p>Implement these practices for effective remote work:</p>
                <ul>
                    <li>Establish clear communication protocols</li>
                    <li>Set up secure access to company resources</li>
                    <li>Provide adequate training and support</li>
                    <li>Foster team connection and culture</li>
                    <li>Monitor and measure productivity</li>
                </ul>',
                'type' => 'blog',
                'status' => 'published',
                'author_id' => $adminUser?->id,
                'category' => 'Workplace',
                'tags' => 'Remote Work, Collaboration, Productivity',
                'featured_image' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80',
                'seo_title' => 'Remote Work Technology: Tools and Best Practices | Jiftek',
                'seo_description' => 'Explore the essential technologies and best practices for building an effective remote work environment.',
                'seo_keywords' => 'remote work, collaboration tools, workplace technology',
                'published_at' => now()->subDays(30),
            ],
        ];

        foreach ($insights as $insightData) {
            if (!isset($insightData['slug'])) {
                $insightData['slug'] = Str::slug($insightData['title']);
            }
            Insight::create($insightData);
        }

        $this->command->info('Insights seeded successfully!');
    }
}



