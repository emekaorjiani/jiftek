<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Insight;
use App\Models\ContentSection;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Partner;
use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

/**
 * ContentController
 * 
 * Handles all content management operations for pages and insights.
 * Supports flexible content structure with proper data validation and isset checks.
 */
class ContentController extends Controller
{
    /**
     * Display the home page content management interface.
     * Fetches existing page data and passes it to the view.
     */
    public function home()
    {
        $page = Page::where('slug', 'home')->first();
        $sections = [];
        
        if ($page) {
            $sections = $page->sections()->get()->keyBy('section_key')->map(function ($section) {
                return $section->content ?? [];
            })->toArray();
        }

        return inertia('admin/content/home/page', [
            'page' => $page ? [
                'id' => $page->id,
                'slug' => $page->slug,
                'content' => $page->content ?? [],
                'meta_title' => $page->meta_title ?? '',
                'meta_description' => $page->meta_description ?? '',
                'meta_keywords' => $page->meta_keywords ?? '',
            ] : null,
            'sections' => $sections,
        ]);
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

        return redirect()->back()->with('success', 'Home page content updated successfully.');
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

        return inertia('admin/content/about/page', [
            'page' => $page ? [
                'id' => $page->id,
                'slug' => $page->slug,
                'content' => $page->content ?? [],
                'meta_title' => $page->meta_title ?? '',
                'meta_description' => $page->meta_description ?? '',
                'meta_keywords' => $page->meta_keywords ?? '',
            ] : null,
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

        return inertia('admin/content/solutions/page', [
            'page' => $page ? [
                'id' => $page->id,
                'slug' => $page->slug,
                'content' => $page->content ?? [],
                'meta_title' => $page->meta_title ?? '',
                'meta_description' => $page->meta_description ?? '',
                'meta_keywords' => $page->meta_keywords ?? '',
            ] : null,
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

        return inertia('admin/content/services/page', [
            'page' => $page ? [
                'id' => $page->id,
                'slug' => $page->slug,
                'content' => $page->content ?? [],
                'meta_title' => $page->meta_title ?? '',
                'meta_description' => $page->meta_description ?? '',
                'meta_keywords' => $page->meta_keywords ?? '',
            ] : null,
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

        return inertia('admin/content/contact/page', [
            'page' => $page ? [
                'id' => $page->id,
                'slug' => $page->slug,
                'content' => $page->content ?? [],
                'meta_title' => $page->meta_title ?? '',
                'meta_description' => $page->meta_description ?? '',
                'meta_keywords' => $page->meta_keywords ?? '',
            ] : null,
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

        return inertia('admin/content/insights/page', [
            'insights' => $insights->through(function ($insight) {
                return [
                    'id' => $insight->id,
                    'title' => $insight->title,
                    'slug' => $insight->slug,
                    'type' => $insight->type,
                    'status' => $insight->status,
                    'author' => $insight->author ? $insight->author->name : 'Unknown',
                    'published_at' => $insight->published_at ? $insight->published_at->format('Y-m-d') : null,
                    'created_at' => $insight->created_at->format('Y-m-d'),
                ];
            }),
            'filters' => [
                'type' => $request->type ?? 'all',
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new insight.
     */
    public function createInsight()
    {
        return inertia('admin/content/insights/new/page', [
            'insight' => null,
        ]);
    }

    /**
     * Show the form for editing an existing insight.
     */
    public function editInsight($id)
    {
        $insight = Insight::findOrFail($id);

        return inertia('admin/content/insights/new/page', [
            'insight' => [
                'id' => $insight->id,
                'title' => $insight->title,
                'slug' => $insight->slug,
                'excerpt' => $insight->excerpt ?? '',
                'content' => $insight->content ?? '',
                'type' => $insight->type,
                'status' => $insight->status,
                'author_id' => $insight->author_id,
                'category' => $insight->category ?? '',
                'tags' => $insight->tags ?? '',
                'featured_image' => $insight->featured_image ?? '',
                'seo_title' => $insight->seo_title ?? '',
                'seo_description' => $insight->seo_description ?? '',
                'seo_keywords' => $insight->seo_keywords ?? '',
                'published_at' => $insight->published_at ? $insight->published_at->format('Y-m-d') : '',
            ],
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
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
        ]);

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
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
        ]);

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
     */
    public function servicesList(Request $request)
    {
        $query = Service::with(['creator', 'updater'])->latest();

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

        return inertia('admin/content/services/list', [
            'services' => $services->through(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'slug' => $service->slug,
                    'description' => $service->description,
                    'image' => $service->image,
                    'is_active' => $service->is_active,
                    'order' => $service->order,
                    'created_by' => $service->creator ? $service->creator->name : 'Unknown',
                    'updated_by' => $service->updater ? $service->updater->name : 'Unknown',
                    'created_at' => $service->created_at->format('Y-m-d'),
                    'updated_at' => $service->updated_at->format('Y-m-d'),
                ];
            }),
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new service.
     */
    public function createService()
    {
        return inertia('admin/content/services/new/page', [
            'service' => null,
        ]);
    }

    /**
     * Show the form for editing an existing service.
     */
    public function editService($id)
    {
        $service = Service::findOrFail($id);

        return inertia('admin/content/services/new/page', [
            'service' => [
                'id' => $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'description' => $service->description ?? '',
                'content' => $service->content ?? '',
                'image' => $service->image ?? '',
                'features' => $service->features ?? [],
                'order' => $service->order,
                'is_active' => $service->is_active,
                'seo_title' => $service->seo_title ?? '',
                'seo_description' => $service->seo_description ?? '',
                'seo_keywords' => $service->seo_keywords ?? '',
            ],
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
            'features' => 'nullable|array',
            'features.*' => 'string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

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
     * Display a listing of team members.
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

        return inertia('admin/content/team-members/page', [
            'teamMembers' => $teamMembers->through(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'title' => $member->title,
                    'bio' => $member->bio,
                    'image' => $member->image,
                    'is_active' => $member->is_active,
                    'order' => $member->order,
                    'created_by' => $member->creator ? $member->creator->name : 'Unknown',
                    'updated_by' => $member->updater ? $member->updater->name : 'Unknown',
                    'created_at' => $member->created_at->format('Y-m-d'),
                    'updated_at' => $member->updated_at->format('Y-m-d'),
                ];
            }),
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new team member.
     */
    public function createTeamMember()
    {
        return inertia('admin/content/team-members/new/page', [
            'teamMember' => null,
        ]);
    }

    /**
     * Show the form for editing an existing team member.
     */
    public function editTeamMember($id)
    {
        $teamMember = TeamMember::findOrFail($id);

        return inertia('admin/content/team-members/new/page', [
            'teamMember' => [
                'id' => $teamMember->id,
                'name' => $teamMember->name,
                'title' => $teamMember->title,
                'bio' => $teamMember->bio ?? '',
                'image' => $teamMember->image ?? '',
                'order' => $teamMember->order,
                'is_active' => $teamMember->is_active,
            ],
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
     * Display a listing of testimonials/case studies.
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

        return inertia('admin/content/testimonials/page', [
            'testimonials' => $testimonials->through(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'title' => $testimonial->title,
                    'slug' => $testimonial->slug,
                    'description' => $testimonial->description,
                    'image' => $testimonial->image,
                    'client_name' => $testimonial->client_name,
                    'client_industry' => $testimonial->client_industry,
                    'is_active' => $testimonial->is_active,
                    'order' => $testimonial->order,
                    'created_by' => $testimonial->creator ? $testimonial->creator->name : 'Unknown',
                    'updated_by' => $testimonial->updater ? $testimonial->updater->name : 'Unknown',
                    'created_at' => $testimonial->created_at->format('Y-m-d'),
                    'updated_at' => $testimonial->updated_at->format('Y-m-d'),
                ];
            }),
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
     */
    public function createTestimonial()
    {
        return inertia('admin/content/testimonials/new/page', [
            'testimonial' => null,
        ]);
    }

    /**
     * Show the form for editing an existing testimonial.
     */
    public function editTestimonial($id)
    {
        $testimonial = Testimonial::findOrFail($id);

        return inertia('admin/content/testimonials/new/page', [
            'testimonial' => [
                'id' => $testimonial->id,
                'title' => $testimonial->title,
                'slug' => $testimonial->slug,
                'description' => $testimonial->description ?? '',
                'content' => $testimonial->content ?? '',
                'image' => $testimonial->image ?? '',
                'client_name' => $testimonial->client_name ?? '',
                'client_industry' => $testimonial->client_industry ?? '',
                'results' => $testimonial->results ?? '',
                'order' => $testimonial->order,
                'is_active' => $testimonial->is_active,
                'seo_title' => $testimonial->seo_title ?? '',
                'seo_description' => $testimonial->seo_description ?? '',
                'seo_keywords' => $testimonial->seo_keywords ?? '',
            ],
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
            'client_name' => 'nullable|string|max:255',
            'client_industry' => 'nullable|string|max:255',
            'results' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

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

        return inertia('admin/content/partners/page', [
            'partners' => $partners->through(function ($partner) {
                return [
                    'id' => $partner->id,
                    'name' => $partner->name,
                    'logo' => $partner->logo,
                    'website' => $partner->website,
                    'is_active' => $partner->is_active,
                    'order' => $partner->order,
                    'created_by' => $partner->creator ? $partner->creator->name : 'Unknown',
                    'updated_by' => $partner->updater ? $partner->updater->name : 'Unknown',
                    'created_at' => $partner->created_at->format('Y-m-d'),
                    'updated_at' => $partner->updated_at->format('Y-m-d'),
                ];
            }),
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new partner.
     */
    public function createPartner()
    {
        return inertia('admin/content/partners/new/page', [
            'partner' => null,
        ]);
    }

    /**
     * Show the form for editing an existing partner.
     */
    public function editPartner($id)
    {
        $partner = Partner::findOrFail($id);

        return inertia('admin/content/partners/new/page', [
            'partner' => [
                'id' => $partner->id,
                'name' => $partner->name,
                'logo' => $partner->logo ?? '',
                'website' => $partner->website ?? '',
                'order' => $partner->order,
                'is_active' => $partner->is_active,
            ],
        ]);
    }

    /**
     * Store a newly created partner.
     */
    public function storePartner(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|string|max:500',
            'website' => 'nullable|url|max:255',
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
            'logo' => 'required|string|max:500',
            'website' => 'nullable|url|max:255',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

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

        return inertia('admin/content/case-studies/page', [
            'caseStudies' => $caseStudies->through(function ($caseStudy) {
                return [
                    'id' => $caseStudy->id,
                    'title' => $caseStudy->title,
                    'slug' => $caseStudy->slug,
                    'description' => $caseStudy->description,
                    'image' => $caseStudy->image,
                    'client_name' => $caseStudy->client_name,
                    'client_industry' => $caseStudy->client_industry,
                    'is_active' => $caseStudy->is_active,
                    'order' => $caseStudy->order,
                    'created_by' => $caseStudy->creator ? $caseStudy->creator->name : 'Unknown',
                    'updated_by' => $caseStudy->updater ? $caseStudy->updater->name : 'Unknown',
                    'created_at' => $caseStudy->created_at->format('Y-m-d'),
                    'updated_at' => $caseStudy->updated_at->format('Y-m-d'),
                ];
            }),
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
     */
    public function createCaseStudy()
    {
        return inertia('admin/content/case-studies/new/page', [
            'caseStudy' => null,
        ]);
    }

    /**
     * Show the form for editing an existing case study.
     */
    public function editCaseStudy($id)
    {
        $caseStudy = CaseStudy::findOrFail($id);

        return inertia('admin/content/case-studies/new/page', [
            'caseStudy' => [
                'id' => $caseStudy->id,
                'title' => $caseStudy->title,
                'slug' => $caseStudy->slug,
                'description' => $caseStudy->description ?? '',
                'content' => $caseStudy->content ?? '',
                'image' => $caseStudy->image ?? '',
                'client_name' => $caseStudy->client_name ?? '',
                'client_industry' => $caseStudy->client_industry ?? '',
                'results' => $caseStudy->results ?? '',
                'order' => $caseStudy->order,
                'is_active' => $caseStudy->is_active,
                'seo_title' => $caseStudy->seo_title ?? '',
                'seo_description' => $caseStudy->seo_description ?? '',
                'seo_keywords' => $caseStudy->seo_keywords ?? '',
            ],
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
            'client_name' => 'nullable|string|max:255',
            'client_industry' => 'nullable|string|max:255',
            'results' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
        ]);

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
