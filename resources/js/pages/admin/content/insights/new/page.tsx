// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Icons
import { Save, Upload, ArrowLeft } from "lucide-react"

// Inertia.js routing and form handling
import { Link, useForm, router } from "@inertiajs/react"
import { FormEventHandler } from "react"
import AdminLayout from "@/layouts/admin/layout"

/**
 * NewInsightPage - Admin page for creating/editing content insights
 *
 * This component provides a comprehensive form for creating new blog posts,
 * case studies, whitepapers, and other content types with SEO optimization
 * and publishing controls. Supports both create and update modes.
 */
export default function NewInsightPage({ insight }: { insight?: any }) {
  // Determine if we're editing or creating
  const isEditing = !!insight?.id

  // Initialize form with existing data or defaults
  const { data, setData, post, put, processing, errors } = useForm({
    title: insight?.title || '',
    slug: insight?.slug || '',
    excerpt: insight?.excerpt || '',
    content: insight?.content || '',
    type: insight?.type || 'blog',
    status: insight?.status || 'draft',
    author_id: insight?.author_id || null,
    category: insight?.category || '',
    tags: insight?.tags || '',
    featured_image: insight?.featured_image || '',
    seo_title: insight?.seo_title || '',
    seo_description: insight?.seo_description || '',
    seo_keywords: insight?.seo_keywords || '',
    published_at: insight?.published_at || '',
  })

  /**
   * Handle form submission
   * Uses POST for create, PUT for update
   */
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    if (isEditing) {
      put(route('admin.content.insights.update', insight.id), {
        preserveScroll: true,
      })
    } else {
      post(route('admin.content.insights.store'), {
        preserveScroll: true,
      })
    }
  }

  /**
   * Handle save as draft
   */
  const handleSaveDraft = () => {
    setData('status', 'draft')

    if (isEditing) {
      put(route('admin.content.insights.update', insight.id), {
        preserveScroll: true,
      })
    } else {
      post(route('admin.content.insights.store'), {
        preserveScroll: true,
      })
    }
  }

  /**
   * Handle publish
   */
  const handlePublish = () => {
    setData('status', 'published')

    if (isEditing) {
      put(route('admin.content.insights.update', insight.id), {
        preserveScroll: true,
      })
    } else {
      post(route('admin.content.insights.store'), {
        preserveScroll: true,
      })
    }
  }

  return (
    <AdminLayout>
    <form onSubmit={handleSubmit}>
    <div className="space-y-6">
      {/* Header section with navigation and action buttons */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          {/* Back navigation button */}
          <Link href="/admin/content/insights">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {isEditing ? 'Edit Content' : 'Create New Content'}
            </h2>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your blog post, case study, or resource' : 'Add a new blog post, case study, or resource'}
            </p>
          </div>
        </div>
        {/* Action buttons for saving and publishing */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            disabled={processing}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            onClick={handlePublish}
            disabled={processing}
          >
            <Save className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Main content grid layout */}
      <div className="grid gap-6 md:grid-cols-6">
        {/* Left column - Main content forms */}
        <div className="md:col-span-4 space-y-6">
          {/* Content Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>Enter the main content information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content title input */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter content title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  required
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>
              {/* Content excerpt/summary */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt/Summary</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Enter a brief summary"
                  rows={3}
                  value={data.excerpt}
                  onChange={(e) => setData('excerpt', e.target.value)}
                />
                {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt}</p>}
              </div>
              {/* Rich text editor placeholder */}
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter your content here..."
                  rows={12}
                  className="min-h-[300px]"
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                />
                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your content for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* SEO title field */}
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input
                  id="seo-title"
                  placeholder="Enter SEO title"
                  value={data.seo_title}
                  onChange={(e) => setData('seo_title', e.target.value)}
                />
                {errors.seo_title && <p className="text-sm text-red-500">{errors.seo_title}</p>}
              </div>
              {/* Meta description field */}
              <div className="space-y-2">
                <Label htmlFor="seo-description">Meta Description</Label>
                <Textarea
                  id="seo-description"
                  placeholder="Enter meta description"
                  rows={3}
                  value={data.seo_description}
                  onChange={(e) => setData('seo_description', e.target.value)}
                />
                {errors.seo_description && <p className="text-sm text-red-500">{errors.seo_description}</p>}
              </div>
              {/* Keywords field */}
              <div className="space-y-2">
                <Label htmlFor="seo-keywords">Keywords (comma separated)</Label>
                <Input
                  id="seo-keywords"
                  placeholder="Enter keywords"
                  value={data.seo_keywords}
                  onChange={(e) => setData('seo_keywords', e.target.value)}
                />
                {errors.seo_keywords && <p className="text-sm text-red-500">{errors.seo_keywords}</p>}
              </div>
              {/* URL slug field */}
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  placeholder="enter-url-slug"
                  value={data.slug}
                  onChange={(e) => setData('slug', e.target.value)}
                />
                <p className="text-xs text-slate-500">Example: https://jiftek.com/insights/enter-url-slug</p>
                {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar - Publishing options and metadata */}
        <div className="md:col-span-2 space-y-6">
          {/* Publishing Options Card */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
              <CardDescription>Configure content settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content type selection */}
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type *</Label>
                <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                  <SelectTrigger id="content-type">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                    <SelectItem value="whitepaper">Whitepaper</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Enter category"
                  value={data.category}
                  onChange={(e) => setData('category', e.target.value)}
                />
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags"
                  value={data.tags}
                  onChange={(e) => setData('tags', e.target.value)}
                />
                {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="publish-date">Publish Date</Label>
                <Input
                  id="publish-date"
                  type="date"
                  value={data.published_at}
                  onChange={(e) => setData('published_at', e.target.value)}
                />
                {errors.published_at && <p className="text-sm text-red-500">{errors.published_at}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Featured Image Card */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>Upload a featured image for this content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image upload drop zone */}
              <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-slate-200 p-6 text-center">
                {data.featured_image && (
                  <div className="mb-2">
                    <img src={data.featured_image} alt="Featured" className="max-h-32 rounded-md" />
                  </div>
                )}
                <div className="rounded-md bg-slate-100 p-2">
                  <Upload className="h-6 w-6 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Drag and drop an image</p>
                  <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
                </div>
                <Input
                  type="text"
                  placeholder="Image URL"
                  value={data.featured_image}
                  onChange={(e) => setData('featured_image', e.target.value)}
                  className="text-sm"
                />
                {errors.featured_image && <p className="text-sm text-red-500">{errors.featured_image}</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </form>
    </AdminLayout>
  )
}

