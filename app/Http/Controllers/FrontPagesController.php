<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Service;
use App\Models\Solution;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Partner;
use App\Models\Insight;
use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * FrontPagesController
 *
 * Handles rendering of front-facing pages including services listing and individual service pages.
 * Also manages hero carousel items from CMS.
 */
class FrontPagesController extends Controller
{
   /**
    * Display the homepage with hero carousel items from CMS.
    *
    * Fetches hero carousel items from the database and ensures all required fields
    * including images are present. Validates image URLs and provides fallbacks if needed.
    */
   public function index()
   {
      // Fetch hero carousel items from the database
      $page = Page::where('slug', 'home')->first();
      $heroItems = [];

      if ($page) {
         $heroSection = $page->sections()->where('section_key', 'hero')->first();
         if ($heroSection && isset($heroSection->content['items'])) {
            // Validate and ensure all hero items have required fields including images
            $heroItems = array_map(function ($item) {
               return [
                  'badge' => $item['badge'] ?? '',
                  'title' => $item['title'] ?? '',
                  'titleHighlight' => $item['titleHighlight'] ?? '',
                  'description' => $item['description'] ?? '',
                  'primaryButton' => $item['primaryButton'] ?? '',
                  'primaryButtonLink' => $item['primaryButtonLink'] ?? '/',
                  'secondaryButton' => $item['secondaryButton'] ?? '',
                  'secondaryButtonLink' => $item['secondaryButtonLink'] ?? '/',
                  'image' => $item['image'] ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80',
                  'imageAlt' => $item['imageAlt'] ?? 'Hero image',
               ];
            }, $heroSection->content['items']);
         } elseif ($heroSection && isset($heroSection->content['badge'])) {
            // Legacy single hero item - convert to array format
            $heroItems = [[
               'badge' => $heroSection->content['badge'] ?? '',
               'title' => $heroSection->content['title'] ?? '',
               'titleHighlight' => $heroSection->content['titleHighlight'] ?? '',
               'description' => $heroSection->content['description'] ?? '',
               'primaryButton' => $heroSection->content['primaryButton'] ?? '',
               'primaryButtonLink' => $heroSection->content['primaryButtonLink'] ?? '/',
               'secondaryButton' => $heroSection->content['secondaryButton'] ?? '',
               'secondaryButtonLink' => $heroSection->content['secondaryButtonLink'] ?? '/',
               'image' => $heroSection->content['image'] ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80',
               'imageAlt' => $heroSection->content['imageAlt'] ?? 'Hero image',
            ]];
         }
      }

      // Fetch latest published insights for home page
      $insights = Insight::published()
         ->with('author')
         ->latest('published_at')
         ->limit(3)
         ->get()
         ->map(function ($insight) {
            return [
               'id' => $insight->id,
               'title' => $insight->title,
               'slug' => $insight->slug,
               'excerpt' => $insight->excerpt,
               'featured_image' => $insight->featured_image,
               'category' => $insight->category,
               'type' => $insight->type,
               'author' => $insight->author ? $insight->author->name : 'Unknown',
               'published_at' => $insight->published_at ? $insight->published_at->format('M d, Y') : null,
            ];
         });

      // Fetch testimonials for the case studies section
      $testimonials = Testimonial::active()->ordered()->limit(2)->get()->map(function ($testimonial) {
         return [
            'id' => $testimonial->id,
            'title' => $testimonial->title,
            'slug' => $testimonial->slug,
            'description' => $testimonial->description,
            'image' => $testimonial->image,
         ];
      });

      // Fetch client testimonials for the "What Our Clients Say" section
      $clientTestimonials = Testimonial::active()->ordered()->limit(3)->get()->map(function ($testimonial) {
         return [
            'id' => $testimonial->id,
            'quote' => $testimonial->description, // Use description as the testimonial quote
            'client_name' => $testimonial->client_name,
            'client_industry' => $testimonial->client_industry,
            'image' => $testimonial->image,
         ];
      });

      // Fetch partners for the "Trusted By" section
      $partners = Partner::active()->ordered()->get()->map(function ($partner) {
         return [
            'id' => $partner->id,
            'name' => $partner->name,
            'logo' => $partner->logo,
            'website' => $partner->website,
         ];
      });

      return Inertia::render('index', [
         'heroItems' => $heroItems,
         'insights' => $insights,
         'testimonials' => $testimonials,
         'clientTestimonials' => $clientTestimonials,
         'partners' => $partners,
      ]);
   }


   /**
    * Display the about page with team members from database.
    */
   public function about()
   {
    $teamMembers = TeamMember::active()->ordered()->get()->map(function ($member) {
        return [
            'id' => $member->id,
            'name' => $member->name,
            'title' => $member->title,
            'bio' => $member->bio,
            'image' => $member->image,
        ];
    });

    return Inertia::render('about/page', [
        'teamMembers' => $teamMembers,
    ]);
   }

   /**
    * Display the solutions listing page.
    * Shows main solution categories.
    */
   public function solutions()
   {
    $solutions = Solution::active()->ordered()->with(['activeServices'])->get()->map(function ($solution) {
        return [
            'id' => $solution->id,
            'title' => $solution->title,
            'slug' => $solution->slug,
            'description' => $solution->description,
            'content' => $solution->content,
            'image' => $solution->image,
            'icon' => $solution->icon,
            'services_count' => $solution->activeServices->count(),
        ];
    });

    return Inertia::render('solutions/page', [
        'solutions' => $solutions,
    ]);
   }

   /**
    * Display the services listing page.
    * Shows services grouped by their solutions.
    */
   public function services()
   {
    // Get solutions with their active services
    $solutions = Solution::active()->ordered()->with(['activeServices' => function ($query) {
        $query->ordered();
    }])->get()->map(function ($solution) {
        return [
            'id' => $solution->id,
            'title' => $solution->title,
            'slug' => $solution->slug,
            'description' => $solution->description,
            'image' => $solution->image,
            'icon' => $solution->icon,
            'services' => $solution->activeServices->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'slug' => $service->slug,
                    'description' => $service->description,
                    'image' => $service->image,
                    'features' => $service->features ?? [],
                ];
            }),
        ];
    });

    return Inertia::render('services/page', [
        'solutions' => $solutions,
    ]);
   }

   /**
    * Display a single service page.
    * Fetches service details by slug.
    */
   public function showService($slug)
   {
    $service = Service::where('slug', $slug)->where('is_active', true)->firstOrFail();

    return Inertia::render('services/show', [
        'service' => [
            'id' => $service->id,
            'title' => $service->title,
            'slug' => $service->slug,
            'description' => $service->description,
            'content' => $service->content,
            'image' => $service->image,
            'features' => $service->features ?? [],
            'seo_title' => $service->seo_title,
            'seo_description' => $service->seo_description,
            'seo_keywords' => $service->seo_keywords,
        ],
    ]);
   }

   /**
    * Display the insights listing page.
    * Shows all published insights with filtering options.
    */
   public function insights(Request $request)
   {
    $query = Insight::published()->with('author')->latest('published_at');

    // Filter by type if provided
    if ($request->has('type') && $request->type !== 'all') {
        $query->where('type', $request->type);
    }

    // Filter by category if provided
    if ($request->has('category') && !empty($request->category)) {
        $query->where('category', $request->category);
    }

    // Search functionality
    if ($request->has('search') && !empty($request->search)) {
        $query->where(function ($q) use ($request) {
            $q->where('title', 'like', '%' . $request->search . '%')
              ->orWhere('excerpt', 'like', '%' . $request->search . '%')
              ->orWhere('content', 'like', '%' . $request->search . '%');
        });
    }

    $insights = $query->paginate(12)->through(function ($insight) {
        return [
            'id' => $insight->id,
            'title' => $insight->title,
            'slug' => $insight->slug,
            'excerpt' => $insight->excerpt,
            'featured_image' => $insight->featured_image,
            'category' => $insight->category,
            'type' => $insight->type,
            'author' => $insight->author ? $insight->author->name : 'Unknown',
            'published_at' => $insight->published_at ? $insight->published_at->format('M d, Y') : null,
            'tags' => $insight->tags,
        ];
    });

    // Get categories for filtering
    $categories = Insight::published()
        ->whereNotNull('category')
        ->distinct()
        ->pluck('category')
        ->filter()
        ->values();

    // Fetch active case studies for the case studies section
    $caseStudies = CaseStudy::active()->ordered()->limit(4)->get()->map(function ($caseStudy) {
        return [
            'id' => $caseStudy->id,
            'title' => $caseStudy->title,
            'slug' => $caseStudy->slug,
            'description' => $caseStudy->description,
            'image' => $caseStudy->image,
            'client_industry' => $caseStudy->client_industry,
        ];
    });

    return Inertia::render('insights/page', [
        'insights' => $insights,
        'categories' => $categories,
        'caseStudies' => $caseStudies,
        'filters' => [
            'type' => $request->type ?? 'all',
            'category' => $request->category ?? '',
            'search' => $request->search ?? '',
        ],
    ]);
   }

   /**
    * Display a single insight page.
    * Fetches insight details by slug.
    */
   public function showInsight($slug)
   {
    $insight = Insight::where('slug', $slug)
        ->where('status', 'published')
        ->with('author')
        ->firstOrFail();

    // Get related insights (same category, excluding current)
    $relatedInsights = Insight::published()
        ->where('id', '!=', $insight->id)
        ->where(function ($q) use ($insight) {
            if ($insight->category) {
                $q->where('category', $insight->category);
            }
            if ($insight->type) {
                $q->orWhere('type', $insight->type);
            }
        })
        ->limit(3)
        ->get()
        ->map(function ($related) {
            return [
                'id' => $related->id,
                'title' => $related->title,
                'slug' => $related->slug,
                'excerpt' => $related->excerpt,
                'featured_image' => $related->featured_image,
                'published_at' => $related->published_at ? $related->published_at->format('M d, Y') : null,
            ];
        });

    return Inertia::render('insights/show', [
        'insight' => [
            'id' => $insight->id,
            'title' => $insight->title,
            'slug' => $insight->slug,
            'excerpt' => $insight->excerpt,
            'content' => $insight->content,
            'featured_image' => $insight->featured_image,
            'category' => $insight->category,
            'type' => $insight->type,
            'tags' => $insight->tags,
            'author' => $insight->author ? [
                'name' => $insight->author->name,
                'email' => $insight->author->email,
            ] : null,
            'published_at' => $insight->published_at ? $insight->published_at->format('F d, Y') : null,
            'seo_title' => $insight->seo_title,
            'seo_description' => $insight->seo_description,
            'seo_keywords' => $insight->seo_keywords,
        ],
        'relatedInsights' => $relatedInsights,
    ]);
   }

   /**
    * Display the contact page with contact information from database.
    * Fetches contact info, map coordinates, and other sections from content sections.
    */
   public function contact()
   {
    $page = Page::where('slug', 'contact')->first();

    // Initialize default values
    $contactInfo = [
        'title' => 'Contact Information',
        'items' => [],
    ];
    $mapInfo = [
        'title' => 'Our Location',
        'latitude' => 6.6,
        'longitude' => 3.505,
        'zoom' => 15,
        'address' => '10 Ukpor Street, Ishawo, Agric, Ikorodu, Lagos.',
    ];
    $heroSection = [
        'title' => 'Contact Us',
        'description' => 'Have questions or ready to start your next project? Get in touch with our team.',
    ];

    if ($page) {
        // Fetch contact information section
        $contactInfoSection = $page->sections()->where('section_key', 'contact-info')->first();
        if ($contactInfoSection && isset($contactInfoSection->content)) {
            $contactInfo = array_merge($contactInfo, $contactInfoSection->content);
        }

        // Fetch map section
        $mapSection = $page->sections()->where('section_key', 'map')->first();
        if ($mapSection && isset($mapSection->content)) {
            $mapInfo = array_merge($mapInfo, $mapSection->content);
        }

        // Fetch hero section
        $heroSectionData = $page->sections()->where('section_key', 'hero')->first();
        if ($heroSectionData && isset($heroSectionData->content)) {
            $heroSection = array_merge($heroSection, $heroSectionData->content);
        }
    }

    return Inertia::render('contact/page', [
        'contactInfo' => $contactInfo,
        'mapInfo' => $mapInfo,
        'heroSection' => $heroSection,
    ]);
   }

   /**
    * Display the testimonials listing page.
    * Shows all active testimonials/case studies.
    */
   public function testimonials()
   {
    $testimonials = Testimonial::active()->ordered()->get()->map(function ($testimonial) {
        return [
            'id' => $testimonial->id,
            'title' => $testimonial->title,
            'slug' => $testimonial->slug,
            'description' => $testimonial->description,
            'content' => $testimonial->content,
            'image' => $testimonial->image,
            'client_name' => $testimonial->client_name,
            'client_industry' => $testimonial->client_industry,
            'results' => $testimonial->results,
            'seo_title' => $testimonial->seo_title,
            'seo_description' => $testimonial->seo_description,
            'seo_keywords' => $testimonial->seo_keywords,
        ];
    });

    return Inertia::render('testimonials/page', [
        'testimonials' => $testimonials,
    ]);
   }

   /**
    * Display a single testimonial/case study page.
    * Fetches testimonial details by slug.
    */
   public function showTestimonial($slug)
   {
    $testimonial = Testimonial::where('slug', $slug)->where('is_active', true)->firstOrFail();

    return Inertia::render('testimonials/show', [
        'testimonial' => [
            'id' => $testimonial->id,
            'title' => $testimonial->title,
            'slug' => $testimonial->slug,
            'description' => $testimonial->description,
            'content' => $testimonial->content,
            'image' => $testimonial->image,
            'client_name' => $testimonial->client_name,
            'client_industry' => $testimonial->client_industry,
            'results' => $testimonial->results,
            'seo_title' => $testimonial->seo_title,
            'seo_description' => $testimonial->seo_description,
            'seo_keywords' => $testimonial->seo_keywords,
        ],
    ]);
   }

   /**
    * Display the case studies listing page.
    * Shows all active case studies.
    */
   public function caseStudies()
   {
    $caseStudies = CaseStudy::active()->ordered()->get()->map(function ($caseStudy) {
        return [
            'id' => $caseStudy->id,
            'title' => $caseStudy->title,
            'slug' => $caseStudy->slug,
            'description' => $caseStudy->description,
            'content' => $caseStudy->content,
            'image' => $caseStudy->image,
            'client_name' => $caseStudy->client_name,
            'client_industry' => $caseStudy->client_industry,
            'results' => $caseStudy->results,
            'seo_title' => $caseStudy->seo_title,
            'seo_description' => $caseStudy->seo_description,
            'seo_keywords' => $caseStudy->seo_keywords,
        ];
    });

    return Inertia::render('case-studies/page', [
        'caseStudies' => $caseStudies,
    ]);
   }

   /**
    * Display a single case study page.
    * Fetches case study details by slug.
    */
   public function showCaseStudy($slug)
   {
    $caseStudy = CaseStudy::where('slug', $slug)->where('is_active', true)->firstOrFail();

    return Inertia::render('case-studies/show', [
        'caseStudy' => [
            'id' => $caseStudy->id,
            'title' => $caseStudy->title,
            'slug' => $caseStudy->slug,
            'description' => $caseStudy->description,
            'content' => $caseStudy->content,
            'image' => $caseStudy->image,
            'client_name' => $caseStudy->client_name,
            'client_industry' => $caseStudy->client_industry,
            'results' => $caseStudy->results,
            'seo_title' => $caseStudy->seo_title,
            'seo_description' => $caseStudy->seo_description,
            'seo_keywords' => $caseStudy->seo_keywords,
        ],
    ]);
   }
}
