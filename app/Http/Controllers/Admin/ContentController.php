<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Insight;
use App\Models\ContentSection;
use App\Models\Service;
use App\Models\Solution;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Partner;
use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

/**
 * ContentController
 *
 * Handles all content management operations for pages and insights.
 * Supports flexible content structure with proper data validation and isset checks.
 */
class ContentController extends Controller
{
    /**
     * Handle image upload or URL.
     * Returns the full path/URL of the image.
     */
    protected function handleImageUpload(Request $request, string $fieldName, ?string $existingValue = null): ?string
    {
        // Check if a file was uploaded
        if ($request->hasFile($fieldName . '_file')) {
            $file = $request->file($fieldName . '_file');
            
            if ($file->isValid()) {
                // Generate unique filename
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                
                // Store in public/images directory
                $path = $file->storeAs('images', $filename, 'public');
                
                // Return full URL path
                return Storage::url($path);
            }
        }
        
        // If no file uploaded, check for URL input
        if ($request->has($fieldName) && !empty($request->input($fieldName))) {
            return $request->input($fieldName);
        }
        
        // Return existing value if nothing new provided
        return $existingValue;
    }
    /**
     * Display the home page content management interface.
     * Returns Blade view with links to dedicated section pages.
     */
    public function home()
    {
        return view('admin.home.index');
    }

    /**
     * Update the home page content.
     * Handles both page-level content and section-based content.
     */
    public function updateHome(Request $request)
    {
        $validated = $request->validate([
            'content' => 'nullable|array',
            'sections' => 'nullable|array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        $page = Page::firstOrCreate(['slug' => 'home']);

        // Update page-level content if provided
        if (isset($validated['content'])) {
            $page->content = $validated['content'];
        }
        if (isset($validated['meta_title'])) {
            $page->meta_title = $validated['meta_title'];
        }
        if (isset($validated['meta_description'])) {
            $page->meta_description = $validated['meta_description'];
        }
        if (isset($validated['meta_keywords'])) {
            $page->meta_keywords = $validated['meta_keywords'];
        }
        $page->updated_by = auth()->id();
        $page->save();

        // Update sections if provided
        if (isset($validated['sections']) && is_array($validated['sections'])) {
            foreach ($validated['sections'] as $sectionKey => $sectionContent) {
                // Normalize section key (caseStudies -> case-studies for consistency)
                $normalizedKey = $sectionKey === 'caseStudies' ? 'case-studies' : $sectionKey;

                ContentSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'section_key' => $normalizedKey,
                    ],
                    [
                        'content' => $sectionContent,
                        'order' => $request->input("sections_order.{$sectionKey}", 0),
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'Home page content updated successfully.');
    }

    /**
     * Display the home hero section management interface.
     * Returns Blade view with all hero items.
     * Supports both legacy single-item format and new items array format.
     */
    public function homeHero()
    {
        $page = Page::where('slug', 'home')->first();
        $sections = [];
        $heroItems = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();

            // Load hero items - check for items array first, then fall back to single item format
            if (isset($sections['hero']['items']) && is_array($sections['hero']['items'])) {
                // New format: items array
                $heroItems = $sections['hero']['items'];
            } elseif (isset($sections['hero']['badge'])) {
                // Legacy format: single item - convert to array format
                $heroItems = [[
                    'badge' => $sections['hero']['badge'] ?? '',
                    'title' => $sections['hero']['title'] ?? '',
                    'titleHighlight' => $sections['hero']['titleHighlight'] ?? '',
                    'description' => $sections['hero']['description'] ?? '',
                    'primaryButton' => $sections['hero']['primaryButton'] ?? '',
                    'primaryButtonLink' => $sections['hero']['primaryButtonLink'] ?? '',
                    'secondaryButton' => $sections['hero']['secondaryButton'] ?? '',
                    'secondaryButtonLink' => $sections['hero']['secondaryButtonLink'] ?? '',
                    'image' => $sections['hero']['image'] ?? '',
                    'imageAlt' => $sections['hero']['imageAlt'] ?? '',
                ]];
            }
        }

        return view('admin.home.hero', [
            'sections' => $sections,
            'heroItems' => $heroItems,
        ]);
    }

    /**
     * Update the home hero section.
     * Handles both single item updates and multiple items array.
     */
    public function updateHomeHero(Request $request)
    {
        $validated = $request->validate([
            'sections' => 'required|array',
            'sections.hero' => 'required|array',
            'sections.hero.items' => 'nullable|array',
            'sections.hero.items.*.badge' => 'nullable|string|max:255',
            'sections.hero.items.*.title' => 'nullable|string|max:255',
            'sections.hero.items.*.titleHighlight' => 'nullable|string|max:255',
            'sections.hero.items.*.description' => 'nullable|string',
            'sections.hero.items.*.primaryButton' => 'nullable|string|max:255',
            'sections.hero.items.*.primaryButtonLink' => 'nullable|string|max:255',
            'sections.hero.items.*.secondaryButton' => 'nullable|string|max:255',
            'sections.hero.items.*.secondaryButtonLink' => 'nullable|string|max:255',
            'sections.hero.items.*.image' => 'nullable|string|max:500',
            'sections.hero.items.*.imageAlt' => 'nullable|string|max:255',
        ]);

        $page = Page::firstOrCreate(['slug' => 'home']);

        if (isset($validated['sections']['hero'])) {
            $heroContent = $validated['sections']['hero'];

            // If items array is provided, use it; otherwise keep existing structure
            if (isset($heroContent['items']) && is_array($heroContent['items'])) {
                // Filter out empty items and ensure all required fields have defaults
                $heroContent['items'] = array_values(array_filter(array_map(function ($item) {
                    // Only include non-empty items
                    if (empty($item['title']) && empty($item['badge']) && empty($item['description'])) {
                        return null;
                    }
                    return [
                        'badge' => $item['badge'] ?? '',
                        'title' => $item['title'] ?? '',
                        'titleHighlight' => $item['titleHighlight'] ?? '',
                        'description' => $item['description'] ?? '',
                        'primaryButton' => $item['primaryButton'] ?? '',
                        'primaryButtonLink' => $item['primaryButtonLink'] ?? '',
                        'secondaryButton' => $item['secondaryButton'] ?? '',
                        'secondaryButtonLink' => $item['secondaryButtonLink'] ?? '',
                        'image' => $item['image'] ?? '',
                        'imageAlt' => $item['imageAlt'] ?? '',
                    ];
                }, $heroContent['items'])));
            }

            ContentSection::updateOrCreate(
                [
                    'page_id' => $page->id,
                    'section_key' => 'hero',
                ],
                [
                    'content' => $heroContent,
                    'order' => 0,
                ]
            );
        }

        return redirect()->back()->with('success', 'Hero section updated successfully.');
    }

    /**
     * Display the home trusted section management interface.
     * Loads actual partners from database and section configuration.
     * Returns Blade view.
     */
    public function homeTrusted()
    {
        $page = Page::where('slug', 'home')->first();
        $sections = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        // Load all active partners from database
        $partners = Partner::active()->ordered()->get();

        return view('admin.home.trusted', [
            'sections' => $sections,
            'partners' => $partners,
        ]);
    }

    /**
     * Update the home trusted section.
     */
    public function updateHomeTrusted(Request $request)
    {
        $validated = $request->validate([
            'sections' => 'required|array',
            'sections.trusted' => 'required|array',
        ]);

        $page = Page::firstOrCreate(['slug' => 'home']);

        if (isset($validated['sections']['trusted'])) {
            ContentSection::updateOrCreate(
                [
                    'page_id' => $page->id,
                    'section_key' => 'trusted',
                ],
                [
                    'content' => $validated['sections']['trusted'],
                    'order' => 1,
                ]
            );
        }

        return redirect()->back()->with('success', 'Trusted section updated successfully.');
    }

    /**
     * Display the home solutions section management interface.
     * Loads actual solutions from database for selection.
     * Returns Blade view.
     */
    public function homeSolutions()
    {
        $page = Page::where('slug', 'home')->first();
        $sections = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        // Load all active solutions from database
        $solutions = Solution::active()->ordered()->get();

        return view('admin.home.solutions', [
            'sections' => $sections,
            'solutions' => $solutions,
        ]);
    }

    /**
     * Update the home solutions section.
     */
    public function updateHomeSolutions(Request $request)
    {
        $validated = $request->validate([
            'sections' => 'required|array',
            'sections.solutions' => 'required|array',
        ]);

        $page = Page::firstOrCreate(['slug' => 'home']);

        if (isset($validated['sections']['solutions'])) {
            ContentSection::updateOrCreate(
                [
                    'page_id' => $page->id,
                    'section_key' => 'solutions',
                ],
                [
                    'content' => $validated['sections']['solutions'],
                    'order' => 2,
                ]
            );
        }

        return redirect()->back()->with('success', 'Solutions section updated successfully.');
    }

    /**
     * Display the home case studies section management interface.
     * Loads actual case studies from database for selection.
     * Returns Blade view.
     */
    public function homeCaseStudies()
    {
        $page = Page::where('slug', 'home')->first();
        $sections = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        // Load all active case studies from database
        $caseStudies = CaseStudy::active()->ordered()->get();

        return view('admin.home.case-studies', [
            'sections' => $sections,
            'caseStudies' => $caseStudies,
        ]);
    }

    /**
     * Update the home case studies section.
     */
    public function updateHomeCaseStudies(Request $request)
    {
        $validated = $request->validate([
            'sections' => 'required|array',
            'sections.case-studies' => 'required|array',
        ]);

        $page = Page::firstOrCreate(['slug' => 'home']);

        if (isset($validated['sections']['case-studies'])) {
            ContentSection::updateOrCreate(
                [
                    'page_id' => $page->id,
                    'section_key' => 'case-studies',
                ],
                [
                    'content' => $validated['sections']['case-studies'],
                    'order' => 3,
                ]
            );
        }

        return redirect()->back()->with('success', 'Case studies section updated successfully.');
    }

    /**
     * Display the home CTA section management interface.
     * Returns Blade view.
     */
    public function homeCta()
    {
        $page = Page::where('slug', 'home')->first();
        $sections = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        return view('admin.home.cta', [
            'sections' => $sections,
        ]);
    }

    /**
     * Update the home CTA section.
     */
    public function updateHomeCta(Request $request)
    {
        $validated = $request->validate([
            'sections' => 'required|array',
            'sections.cta' => 'required|array',
        ]);

        $page = Page::firstOrCreate(['slug' => 'home']);

        if (isset($validated['sections']['cta'])) {
            ContentSection::updateOrCreate(
                [
                    'page_id' => $page->id,
                    'section_key' => 'cta',
                ],
                [
                    'content' => $validated['sections']['cta'],
                    'order' => 4,
                ]
            );
        }

        return redirect()->back()->with('success', 'CTA section updated successfully.');
    }

    /**
     * Display the about page content management interface.
     */
    public function about()
    {
        $page = Page::where('slug', 'about')->first();
        $sections = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        return view('admin.content.about', [
            'page' => $page,
            'sections' => $sections,
        ]);
    }

    /**
     * Update the about page content.
     */
    public function updateAbout(Request $request)
    {
        $validated = $request->validate([
            'content' => 'nullable|array',
            'sections' => 'nullable|array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        $page = Page::firstOrCreate(['slug' => 'about']);

        if (isset($validated['content'])) {
            $page->content = $validated['content'];
        }
        if (isset($validated['meta_title'])) {
            $page->meta_title = $validated['meta_title'];
        }
        if (isset($validated['meta_description'])) {
            $page->meta_description = $validated['meta_description'];
        }
        if (isset($validated['meta_keywords'])) {
            $page->meta_keywords = $validated['meta_keywords'];
        }
        $page->updated_by = auth()->id();
        $page->save();

        if (isset($validated['sections']) && is_array($validated['sections'])) {
            foreach ($validated['sections'] as $sectionKey => $sectionContent) {
                ContentSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'section_key' => $sectionKey,
                    ],
                    [
                        'content' => $sectionContent,
                        'order' => $request->input("sections_order.{$sectionKey}", 0),
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'About page content updated successfully.');
    }

    /**
     * Display the solutions page content management interface.
     */
    public function solutions()
    {
        $page = Page::where('slug', 'solutions')->first();
        $sections = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        return view('admin.content.solutions', [
            'page' => $page,
            'sections' => $sections,
        ]);
    }

    /**
     * Update the solutions page content.
     */
    public function updateSolutions(Request $request)
    {
        $validated = $request->validate([
            'content' => 'nullable|array',
            'sections' => 'nullable|array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        $page = Page::firstOrCreate(['slug' => 'solutions']);

        if (isset($validated['content'])) {
            $page->content = $validated['content'];
        }
        if (isset($validated['meta_title'])) {
            $page->meta_title = $validated['meta_title'];
        }
        if (isset($validated['meta_description'])) {
            $page->meta_description = $validated['meta_description'];
        }
        if (isset($validated['meta_keywords'])) {
            $page->meta_keywords = $validated['meta_keywords'];
        }
        $page->updated_by = auth()->id();
        $page->save();

        if (isset($validated['sections']) && is_array($validated['sections'])) {
            foreach ($validated['sections'] as $sectionKey => $sectionContent) {
                ContentSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'section_key' => $sectionKey,
                    ],
                    [
                        'content' => $sectionContent,
                        'order' => $request->input("sections_order.{$sectionKey}", 0),
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'Solutions page content updated successfully.');
    }

    /**
     * Display the services page content management interface.
     */
    public function services()
    {
        $page = Page::where('slug', 'services')->first();
        $sections = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        return view('admin.content.services', [
            'page' => $page,
            'sections' => $sections,
        ]);
    }

    /**
     * Update the services page content.
     */
    public function updateServices(Request $request)
    {
        $validated = $request->validate([
            'content' => 'nullable|array',
            'sections' => 'nullable|array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        $page = Page::firstOrCreate(['slug' => 'services']);

        if (isset($validated['content'])) {
            $page->content = $validated['content'];
        }
        if (isset($validated['meta_title'])) {
            $page->meta_title = $validated['meta_title'];
        }
        if (isset($validated['meta_description'])) {
            $page->meta_description = $validated['meta_description'];
        }
        if (isset($validated['meta_keywords'])) {
            $page->meta_keywords = $validated['meta_keywords'];
        }
        $page->updated_by = auth()->id();
        $page->save();

        if (isset($validated['sections']) && is_array($validated['sections'])) {
            foreach ($validated['sections'] as $sectionKey => $sectionContent) {
                ContentSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'section_key' => $sectionKey,
                    ],
                    [
                        'content' => $sectionContent,
                        'order' => $request->input("sections_order.{$sectionKey}", 0),
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'Services page content updated successfully.');
    }

    /**
     * Display the contact page content management interface.
     */
    public function contact()
    {
        $page = Page::where('slug', 'contact')->first();
        $sections = [];

        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        return view('admin.content.contact', [
            'page' => $page,
            'sections' => $sections,
        ]);
    }

    /**
     * Update the contact page content.
     */
    public function updateContact(Request $request)
    {
        $validated = $request->validate([
            'content' => 'nullable|array',
            'sections' => 'nullable|array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        $page = Page::firstOrCreate(['slug' => 'contact']);

        if (isset($validated['content'])) {
            $page->content = $validated['content'];
        }
        if (isset($validated['meta_title'])) {
            $page->meta_title = $validated['meta_title'];
        }
        if (isset($validated['meta_description'])) {
            $page->meta_description = $validated['meta_description'];
        }
        if (isset($validated['meta_keywords'])) {
            $page->meta_keywords = $validated['meta_keywords'];
        }
        $page->updated_by = auth()->id();
        $page->save();

        if (isset($validated['sections']) && is_array($validated['sections'])) {
            foreach ($validated['sections'] as $sectionKey => $sectionContent) {
                ContentSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'section_key' => $sectionKey,
                    ],
                    [
                        'content' => $sectionContent,
                        'order' => $request->input("sections_order.{$sectionKey}", 0),
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'Contact page content updated successfully.');
    }

    /**
     * Display a listing of insights (blog posts, case studies, etc.).
     * Returns Blade view.
     */
    public function insights(Request $request)
    {
        $query = Insight::with('author')->latest();

        // Filter by type if provided
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Filter by status if provided
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        $insights = $query->paginate(15);

        return view('admin.insights.index', [
            'insights' => $insights,
            'filters' => [
                'type' => $request->type ?? 'all',
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new insight.
     * Returns Blade view.
     */
    public function createInsight()
    {
        return view('admin.insights.create');
    }

    /**
     * Show the form for editing an existing insight.
     * Returns Blade view.
     */
    public function editInsight($id)
    {
        $insight = Insight::findOrFail($id);

        return view('admin.insights.edit', [
            'insight' => $insight,
        ]);
    }

    /**
     * Store a newly created insight.
     */
    public function storeInsight(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:insights,slug',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'type' => 'required|in:blog,case-study,whitepaper,webinar',
            'status' => 'required|in:draft,published,scheduled',
            'author_id' => 'nullable|exists:users,id',
            'category' => 'nullable|string|max:255',
            'tags' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'featured_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
        ]);

        // Handle image upload
        $validated['featured_image'] = $this->handleImageUpload($request, 'featured_image');

        // Auto-generate unique slug if not provided
        if (empty($validated['slug']) && isset($validated['title'])) {
            $baseSlug = Str::slug($validated['title']);
            $slug = $baseSlug;
            $counter = 1;

            // Ensure uniqueness
            while (Insight::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        // Set author to current user if not provided
        if (!isset($validated['author_id'])) {
            $validated['author_id'] = auth()->id();
        }

        // Set published_at based on status
        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $insight = Insight::create($validated);

        return redirect()->route('admin.content.insights')->with('success', 'Insight created successfully.');
    }

    /**
     * Update an existing insight.
     */
    public function updateInsight(Request $request, $id)
    {
        $insight = Insight::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:insights,slug,' . $id,
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'type' => 'required|in:blog,case-study,whitepaper,webinar',
            'status' => 'required|in:draft,published,scheduled',
            'author_id' => 'nullable|exists:users,id',
            'category' => 'nullable|string|max:255',
            'tags' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'featured_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
        ]);

        // Handle image upload
        $validated['featured_image'] = $this->handleImageUpload($request, 'featured_image', $insight->featured_image);

        // Auto-generate unique slug if not provided and title changed
        if (empty($validated['slug']) && isset($validated['title']) && $insight->title !== $validated['title']) {
            $baseSlug = Str::slug($validated['title']);
            $slug = $baseSlug;
            $counter = 1;

            // Ensure uniqueness (excluding current record)
            while (Insight::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        // Set published_at based on status
        if ($validated['status'] === 'published' && !isset($validated['published_at']) && !$insight->published_at) {
            $validated['published_at'] = now();
        }

        $insight->update($validated);

        return redirect()->route('admin.content.insights')->with('success', 'Insight updated successfully.');
    }

    /**
     * Delete an insight.
     */
    public function destroyInsight($id)
    {
        $insight = Insight::findOrFail($id);
        $insight->delete();

        return redirect()->route('admin.content.insights')->with('success', 'Insight deleted successfully.');
    }

    /**
     * Display a listing of services.
     * Returns Blade view for better CRUD experience.
     */
    public function servicesList(Request $request)
    {
        $query = Service::with(['creator', 'updater', 'solution'])->latest();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by active status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active');
        }

        $services = $query->paginate(15);

        return view('admin.services.index', [
            'services' => $services,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new service.
     * Returns Blade view.
     */
    public function createService()
    {
        // Load all active solutions for the dropdown
        $solutions = Solution::active()->ordered()->get();

        return view('admin.services.create', [
            'solutions' => $solutions,
        ]);
    }

    /**
     * Show the form for editing an existing service.
     * Returns Blade view.
     */
    public function editService($id)
    {
        $service = Service::findOrFail($id);

        // Load all active solutions for the dropdown
        $solutions = Solution::active()->ordered()->get();

        return view('admin.services.edit', [
            'service' => $service,
            'solutions' => $solutions,
        ]);
    }

    /**
     * Store a newly created service.
     */
    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:services,slug',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'solution_id' => 'nullable|exists:solutions,id',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        // Handle image upload
        $validated['image'] = $this->handleImageUpload($request, 'image');

        // Auto-generate slug if not provided
        if (empty($validated['slug']) && isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure uniqueness
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (Service::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        // Set defaults
        if (!isset($validated['order'])) {
            $validated['order'] = 0;
        }
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        $service = Service::create($validated);

        return redirect()->route('admin.content.services.list')->with('success', 'Service created successfully.');
    }

    /**
     * Update an existing service.
     */
    public function updateService(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:services,slug,' . $id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'solution_id' => 'nullable|exists:solutions,id',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        // Auto-generate slug if not provided and title changed
        if (empty($validated['slug']) && isset($validated['title']) && $service->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure uniqueness
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (Service::where('slug', $validated['slug'])->where('id', '!=', $id)->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        $service->update($validated);

        return redirect()->route('admin.content.services.list')->with('success', 'Service updated successfully.');
    }

    /**
     * Delete a service.
     */
    public function destroyService($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return redirect()->route('admin.content.services.list')->with('success', 'Service deleted successfully.');
    }

    /**
     * Display a listing of solutions.
     * Returns Blade view.
     */
    public function solutionsList(Request $request)
    {
        $query = Solution::with(['creator', 'updater'])->latest();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by active status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active');
        }

        $solutions = $query->paginate(15);

        return view('admin.solutions.index', [
            'solutions' => $solutions,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new solution.
     * Returns Blade view.
     */
    public function createSolution()
    {
        return view('admin.solutions.create');
    }

    /**
     * Show the form for editing an existing solution.
     * Returns Blade view.
     */
    public function editSolution($id)
    {
        $solution = Solution::findOrFail($id);

        return view('admin.solutions.edit', [
            'solution' => $solution,
        ]);
    }

    /**
     * Store a newly created solution.
     */
    public function storeSolution(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:solutions,slug',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'icon' => 'nullable|string|max:255',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        // Handle image upload
        $validated['image'] = $this->handleImageUpload($request, 'image');

        // Auto-generate slug if not provided
        if (empty($validated['slug']) && isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure uniqueness
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (Solution::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        // Set defaults
        if (!isset($validated['order'])) {
            $validated['order'] = 0;
        }
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        $solution = Solution::create($validated);

        return redirect()->route('admin.content.solutions.list')->with('success', 'Solution created successfully.');
    }

    /**
     * Update an existing solution.
     */
    public function updateSolution(Request $request, $id)
    {
        $solution = Solution::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:solutions,slug,' . $id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'icon' => 'nullable|string|max:255',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        // Handle image upload
        $validated['image'] = $this->handleImageUpload($request, 'image', $solution->image);

        // Auto-generate slug if not provided and title changed
        if (empty($validated['slug']) && isset($validated['title']) && $solution->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure uniqueness
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (Solution::where('slug', $validated['slug'])->where('id', '!=', $id)->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        $solution->update($validated);

        return redirect()->route('admin.content.solutions.list')->with('success', 'Solution updated successfully.');
    }

    /**
     * Delete a solution.
     */
    public function destroySolution($id)
    {
        $solution = Solution::findOrFail($id);
        $solution->delete();

        return redirect()->route('admin.content.solutions.list')->with('success', 'Solution deleted successfully.');
    }

    /**
     * Display a listing of team members.
     * Returns Blade view.
     */
    public function teamMembers(Request $request)
    {
        $query = TeamMember::with(['creator', 'updater'])->latest();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('title', 'like', '%' . $request->search . '%')
                  ->orWhere('bio', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by active status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active');
        }

        $teamMembers = $query->paginate(15);

        return view('admin.team-members.index', [
            'teamMembers' => $teamMembers,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new team member.
     * Returns Blade view.
     */
    public function createTeamMember()
    {
        return view('admin.team-members.create');
    }

    /**
     * Show the form for editing an existing team member.
     * Returns Blade view.
     */
    public function editTeamMember($id)
    {
        $teamMember = TeamMember::findOrFail($id);

        return view('admin.team-members.edit', [
            'teamMember' => $teamMember,
        ]);
    }

    /**
     * Store a newly created team member.
     */
    public function storeTeamMember(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        // Set defaults
        if (!isset($validated['order'])) {
            $validated['order'] = 0;
        }
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        $teamMember = TeamMember::create($validated);

        return redirect()->route('admin.content.team-members')->with('success', 'Team member created successfully.');
    }

    /**
     * Update an existing team member.
     */
    public function updateTeamMember(Request $request, $id)
    {
        $teamMember = TeamMember::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $teamMember->update($validated);

        return redirect()->route('admin.content.team-members')->with('success', 'Team member updated successfully.');
    }

    /**
     * Delete a team member.
     */
    public function destroyTeamMember($id)
    {
        $teamMember = TeamMember::findOrFail($id);
        $teamMember->delete();

        return redirect()->route('admin.content.team-members')->with('success', 'Team member deleted successfully.');
    }

    /**
     * Display a listing of testimonials.
     * Returns Blade view.
     */
    public function testimonials(Request $request)
    {
        $query = Testimonial::with(['creator', 'updater'])->latest();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('client_name', 'like', '%' . $request->search . '%')
                  ->orWhere('client_industry', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by active status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active');
        }

        // Filter by industry
        if ($request->has('industry') && $request->industry !== 'all') {
            $query->where('client_industry', $request->industry);
        }

        $testimonials = $query->paginate(15);

        // Get unique industries for filter
        $industries = Testimonial::distinct()->whereNotNull('client_industry')->pluck('client_industry')->sort()->values();

        return view('admin.testimonials.index', [
            'testimonials' => $testimonials,
            'filters' => [
                'status' => $request->status ?? 'all',
                'industry' => $request->industry ?? 'all',
                'search' => $request->search ?? '',
            ],
            'industries' => $industries,
        ]);
    }

    /**
     * Show the form for creating a new testimonial.
     * Returns Blade view.
     */
    public function createTestimonial()
    {
        return view('admin.testimonials.create');
    }

    /**
     * Show the form for editing an existing testimonial.
     * Returns Blade view.
     */
    public function editTestimonial($id)
    {
        $testimonial = Testimonial::findOrFail($id);

        return view('admin.testimonials.edit', [
            'testimonial' => $testimonial,
        ]);
    }

    /**
     * Store a newly created testimonial.
     */
    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:testimonials,slug',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'client_name' => 'nullable|string|max:255',
            'client_industry' => 'nullable|string|max:255',
            'results' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        // Handle image upload
        $validated['image'] = $this->handleImageUpload($request, 'image');

        // Auto-generate slug if not provided
        if (empty($validated['slug']) && isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure uniqueness
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (Testimonial::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        // Set defaults
        if (!isset($validated['order'])) {
            $validated['order'] = 0;
        }
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        $testimonial = Testimonial::create($validated);

        return redirect()->route('admin.content.testimonials')->with('success', 'Testimonial created successfully.');
    }

    /**
     * Update an existing testimonial.
     */
    public function updateTestimonial(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:testimonials,slug,' . $id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'client_name' => 'nullable|string|max:255',
            'client_industry' => 'nullable|string|max:255',
            'results' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        // Handle image upload
        $validated['image'] = $this->handleImageUpload($request, 'image', $testimonial->image);

        // Auto-generate slug if not provided and title changed
        if (empty($validated['slug']) && isset($validated['title']) && $testimonial->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure uniqueness
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (Testimonial::where('slug', $validated['slug'])->where('id', '!=', $id)->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        $testimonial->update($validated);

        return redirect()->route('admin.content.testimonials')->with('success', 'Testimonial updated successfully.');
    }

    /**
     * Delete a testimonial.
     */
    public function destroyTestimonial($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return redirect()->route('admin.content.testimonials')->with('success', 'Testimonial deleted successfully.');
    }

    /**
     * Display a listing of partners/company logos.
     * Returns Blade view.
     */
    public function partners(Request $request)
    {
        $query = Partner::with(['creator', 'updater'])->latest();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('website', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by active status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active');
        }

        $partners = $query->paginate(15);

        return view('admin.partners.index', [
            'partners' => $partners,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new partner.
     * Returns Blade view.
     */
    public function createPartner()
    {
        return view('admin.partners.create');
    }

    /**
     * Show the form for editing an existing partner.
     * Returns Blade view.
     */
    public function editPartner($id)
    {
        $partner = Partner::findOrFail($id);

        return view('admin.partners.edit', [
            'partner' => $partner,
        ]);
    }

    /**
     * Store a newly created partner.
     */
    public function storePartner(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'logo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'website' => 'nullable|url|max:255',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        // Handle logo upload
        $validated['logo'] = $this->handleImageUpload($request, 'logo');
        
        if (empty($validated['logo'])) {
            return redirect()->back()->withErrors(['logo' => 'Logo is required. Please provide a URL or upload a file.'])->withInput();
        }

        // Set defaults
        if (!isset($validated['order'])) {
            $validated['order'] = 0;
        }
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        $partner = Partner::create($validated);

        return redirect()->route('admin.content.partners')->with('success', 'Partner created successfully.');
    }

    /**
     * Update an existing partner.
     */
    public function updatePartner(Request $request, $id)
    {
        $partner = Partner::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'logo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'website' => 'nullable|url|max:255',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        // Handle logo upload
        $validated['logo'] = $this->handleImageUpload($request, 'logo', $partner->logo);
        
        if (empty($validated['logo'])) {
            $validated['logo'] = $partner->logo; // Keep existing if nothing new provided
        }

        $partner->update($validated);

        return redirect()->route('admin.content.partners')->with('success', 'Partner updated successfully.');
    }

    /**
     * Delete a partner.
     */
    public function destroyPartner($id)
    {
        $partner = Partner::findOrFail($id);
        $partner->delete();

        return redirect()->route('admin.content.partners')->with('success', 'Partner deleted successfully.');
    }

    /**
     * Display a listing of case studies.
     * Returns Blade view.
     */
    public function caseStudies(Request $request)
    {
        $query = CaseStudy::with(['creator', 'updater'])->latest();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('client_name', 'like', '%' . $request->search . '%')
                  ->orWhere('client_industry', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by active status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active');
        }

        // Filter by industry
        if ($request->has('industry') && $request->industry !== 'all') {
            $query->where('client_industry', $request->industry);
        }

        $caseStudies = $query->paginate(15);

        // Get unique industries for filter
        $industries = CaseStudy::distinct()->whereNotNull('client_industry')->pluck('client_industry')->sort()->values();

        return view('admin.case-studies.index', [
            'caseStudies' => $caseStudies,
            'filters' => [
                'status' => $request->status ?? 'all',
                'industry' => $request->industry ?? 'all',
                'search' => $request->search ?? '',
            ],
            'industries' => $industries,
        ]);
    }

    /**
     * Show the form for creating a new case study.
     * Returns Blade view.
     */
    public function createCaseStudy()
    {
        return view('admin.case-studies.create');
    }

    /**
     * Show the form for editing an existing case study.
     * Returns Blade view.
     */
    public function editCaseStudy($id)
    {
        $caseStudy = CaseStudy::findOrFail($id);

        return view('admin.case-studies.edit', [
            'caseStudy' => $caseStudy,
        ]);
    }

    /**
     * Store a newly created case study.
     */
    public function storeCaseStudy(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:case_studies,slug',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'client_name' => 'nullable|string|max:255',
            'client_industry' => 'nullable|string|max:255',
            'results' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        // Handle image upload
        $validated['image'] = $this->handleImageUpload($request, 'image');

        // Auto-generate slug if not provided
        if (empty($validated['slug']) && isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure uniqueness
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (CaseStudy::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        // Set defaults
        if (!isset($validated['order'])) {
            $validated['order'] = 0;
        }
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        $caseStudy = CaseStudy::create($validated);

        return redirect()->route('admin.content.case-studies')->with('success', 'Case study created successfully.');
    }

    /**
     * Update an existing case study.
     */
    public function updateCaseStudy(Request $request, $id)
    {
        $caseStudy = CaseStudy::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:case_studies,slug,' . $id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'client_name' => 'nullable|string|max:255',
            'client_industry' => 'nullable|string|max:255',
            'results' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

        // Auto-generate slug if not provided and title changed
        if (empty($validated['slug']) && isset($validated['title']) && $caseStudy->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);

            // Ensure uniqueness
            $baseSlug = $validated['slug'];
            $counter = 1;
            while (CaseStudy::where('slug', $validated['slug'])->where('id', '!=', $id)->exists()) {
                $validated['slug'] = $baseSlug . '-' . $counter;
                $counter++;
            }
        }

        $caseStudy->update($validated);

        return redirect()->route('admin.content.case-studies')->with('success', 'Case study updated successfully.');
    }

    /**
     * Delete a case study.
     */
    public function destroyCaseStudy($id)
    {
        $caseStudy = CaseStudy::findOrFail($id);
        $caseStudy->delete();

        return redirect()->route('admin.content.case-studies')->with('success', 'Case study deleted successfully.');
    }
}
