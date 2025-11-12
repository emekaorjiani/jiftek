// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// Icons
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react"

// Inertia.js routing and form handling
import { Link, useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import AdminLayout from "@/layouts/admin/layout"

/**
 * NewCaseStudyPage - Admin page for creating/editing case studies
 *
 * This component provides a comprehensive form for creating new case studies
 * with images, client information, results, SEO optimization, and display controls.
 * Supports both create and update modes.
 */
export default function NewCaseStudyPage({ caseStudy }: { caseStudy?: any }) {
  // Determine if we're editing or creating
  const isEditing = !!caseStudy?.id

  // Initialize form with existing data or defaults
  const { data, setData, post, put, processing, errors } = useForm({
    title: caseStudy?.title || '',
    slug: caseStudy?.slug || '',
    description: caseStudy?.description || '',
    content: caseStudy?.content || '',
    image: caseStudy?.image || '',
    client_name: caseStudy?.client_name || '',
    client_industry: caseStudy?.client_industry || '',
    results: caseStudy?.results || '',
    order: caseStudy?.order || 0,
    is_active: caseStudy?.is_active ?? true,
    seo_title: caseStudy?.seo_title || '',
    seo_description: caseStudy?.seo_description || '',
    seo_keywords: caseStudy?.seo_keywords || '',
  })

  /**
   * Handle form submission
   * Uses POST for create, PUT for update
   */
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    if (isEditing) {
      put(route('admin.content.case-studies.update', caseStudy.id), {
        preserveScroll: true,
      })
    } else {
      post(route('admin.content.case-studies.store'), {
        preserveScroll: true,
      })
    }
  }

  /**
   * Handle image input change
   * For now, we'll use a text input for image URLs
   */
  const handleImageChange = (value: string) => {
    setData('image', value)
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Header section with navigation and action buttons */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              {/* Back navigation button */}
              <Link href={route('admin.content.case-studies')}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {isEditing ? 'Edit Case Study' : 'Create New Case Study'}
                </h2>
                <p className="text-muted-foreground">
                  {isEditing ? 'Update your case study' : 'Add a new real-world example of how our solutions helped organizations'}
                </p>
              </div>
            </div>
            {/* Action button for saving */}
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={processing}>
                <Save className="mr-2 h-4 w-4" />
                {processing ? 'Saving...' : 'Save Case Study'}
              </Button>
            </div>
          </div>

          {/* Main content grid layout */}
          <div className="grid gap-6 md:grid-cols-6">
            {/* Left column - Main content forms */}
            <div className="md:col-span-4 space-y-6">
              {/* Case Study Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Case Study Details</CardTitle>
                  <CardDescription>Enter the main case study information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="e.g., Digital Transformation for Financial Services"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                  </div>

                  {/* Slug */}
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={data.slug}
                      onChange={(e) => setData('slug', e.target.value)}
                      placeholder="Auto-generated from title"
                      className={errors.slug ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Leave empty to auto-generate from title. Used in URLs.
                    </p>
                    {errors.slug && (
                      <p className="text-sm text-red-500">{errors.slug}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Brief summary of the case study"
                      rows={3}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description}</p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Full Content</Label>
                    <Textarea
                      id="content"
                      value={data.content}
                      onChange={(e) => setData('content', e.target.value)}
                      placeholder="Detailed case study content (HTML supported)"
                      rows={12}
                      className={errors.content ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Full case study content displayed on the case study page. HTML is supported.
                    </p>
                    {errors.content && (
                      <p className="text-sm text-red-500">{errors.content}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Client Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                  <CardDescription>Details about the client and their industry</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Client Name */}
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Client Name</Label>
                    <Input
                      id="client_name"
                      value={data.client_name}
                      onChange={(e) => setData('client_name', e.target.value)}
                      placeholder="e.g., Leading Financial Institution"
                      className={errors.client_name ? 'border-red-500' : ''}
                    />
                    {errors.client_name && (
                      <p className="text-sm text-red-500">{errors.client_name}</p>
                    )}
                  </div>

                  {/* Client Industry */}
                  <div className="space-y-2">
                    <Label htmlFor="client_industry">Industry</Label>
                    <Input
                      id="client_industry"
                      value={data.client_industry}
                      onChange={(e) => setData('client_industry', e.target.value)}
                      placeholder="e.g., Financial Services, Healthcare"
                      className={errors.client_industry ? 'border-red-500' : ''}
                    />
                    {errors.client_industry && (
                      <p className="text-sm text-red-500">{errors.client_industry}</p>
                    )}
                  </div>

                  {/* Results */}
                  <div className="space-y-2">
                    <Label htmlFor="results">Key Results</Label>
                    <Textarea
                      id="results"
                      value={data.results}
                      onChange={(e) => setData('results', e.target.value)}
                      placeholder="Key results and metrics achieved (e.g., Improved efficiency by 40%, Reduced costs by 30%)"
                      rows={4}
                      className={errors.results ? 'border-red-500' : ''}
                    />
                    {errors.results && (
                      <p className="text-sm text-red-500">{errors.results}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Image Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                  <CardDescription>Add an image or illustration for this case study</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Image URL Input */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Textarea
                      id="image"
                      value={data.image}
                      onChange={(e) => handleImageChange(e.target.value)}
                      placeholder="Enter image URL (e.g., https://images.unsplash.com/photo-...)"
                      rows={3}
                      className={errors.image ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter a full image URL. Use high-quality images or illustrations that represent the case study.
                    </p>
                    {errors.image && (
                      <p className="text-sm text-red-500">{errors.image}</p>
                    )}
                  </div>

                  {/* Image Preview */}
                  {data.image && (
                    <div className="space-y-2">
                      <Label>Image Preview</Label>
                      <div className="relative h-64 w-full overflow-hidden rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                        <img
                          src={data.image}
                          alt="Case study preview"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = '<div class="flex h-full w-full items-center justify-center text-muted-foreground"><ImageIcon class="h-12 w-12" /><span class="ml-2">Invalid image</span></div>'
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column - Settings and SEO */}
            <div className="md:col-span-2 space-y-6">
              {/* Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure case study display options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order */}
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      min="0"
                      value={data.order}
                      onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                      className={errors.order ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Lower numbers appear first. Default: 0
                    </p>
                    {errors.order && (
                      <p className="text-sm text-red-500">{errors.order}</p>
                    )}
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="is_active">Active</Label>
                      <p className="text-sm text-muted-foreground">
                        Show this case study on the website
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={data.is_active}
                      onChange={(e) => setData('is_active', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* SEO Card */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize search engine visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* SEO Title */}
                  <div className="space-y-2">
                    <Label htmlFor="seo_title">SEO Title</Label>
                    <Input
                      id="seo_title"
                      value={data.seo_title}
                      onChange={(e) => setData('seo_title', e.target.value)}
                      placeholder="Case Study Title | Jiftek"
                      className={errors.seo_title ? 'border-red-500' : ''}
                    />
                    {errors.seo_title && (
                      <p className="text-sm text-red-500">{errors.seo_title}</p>
                    )}
                  </div>

                  {/* SEO Description */}
                  <div className="space-y-2">
                    <Label htmlFor="seo_description">SEO Description</Label>
                    <Textarea
                      id="seo_description"
                      value={data.seo_description}
                      onChange={(e) => setData('seo_description', e.target.value)}
                      placeholder="Brief description for search engines"
                      rows={3}
                      className={errors.seo_description ? 'border-red-500' : ''}
                    />
                    {errors.seo_description && (
                      <p className="text-sm text-red-500">{errors.seo_description}</p>
                    )}
                  </div>

                  {/* SEO Keywords */}
                  <div className="space-y-2">
                    <Label htmlFor="seo_keywords">SEO Keywords</Label>
                    <Input
                      id="seo_keywords"
                      value={data.seo_keywords}
                      onChange={(e) => setData('seo_keywords', e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                      className={errors.seo_keywords ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Comma-separated keywords
                    </p>
                    {errors.seo_keywords && (
                      <p className="text-sm text-red-500">{errors.seo_keywords}</p>
                    )}
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

