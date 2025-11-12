// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// Icons
import { Save, Upload, ArrowLeft, Plus, Trash2, Image as ImageIcon } from "lucide-react"

// Inertia.js routing and form handling
import { Link, useForm } from "@inertiajs/react"
import { FormEventHandler, useState } from "react"
import AdminLayout from "@/layouts/admin/layout"

/**
 * NewServicePage - Admin page for creating/editing services
 *
 * This component provides a comprehensive form for creating new services
 * with images, features, SEO optimization, and display controls.
 * Supports both create and update modes.
 */
export default function NewServicePage({ service }: { service?: any }) {
  // Determine if we're editing or creating
  const isEditing = !!service?.id

  // Local state for managing features array
  const [features, setFeatures] = useState<string[]>(service?.features || [])

  // Initialize form with existing data or defaults
  const { data, setData, post, put, processing, errors } = useForm({
    title: service?.title || '',
    slug: service?.slug || '',
    description: service?.description || '',
    content: service?.content || '',
    image: service?.image || '',
    features: service?.features || [],
    order: service?.order || 0,
    is_active: service?.is_active ?? true,
    seo_title: service?.seo_title || '',
    seo_description: service?.seo_description || '',
    seo_keywords: service?.seo_keywords || '',
  })

  /**
   * Handle form submission
   * Uses POST for create, PUT for update
   */
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    
    // Update form data with current features
    setData('features', features)

    if (isEditing) {
      put(route('admin.content.services.update', service.id), {
        preserveScroll: true,
      })
    } else {
      post(route('admin.content.services.store'), {
        preserveScroll: true,
      })
    }
  }

  /**
   * Add a new feature to the list
   */
  const handleAddFeature = () => {
    setFeatures([...features, ''])
  }

  /**
   * Update a feature at a specific index
   */
  const handleUpdateFeature = (index: number, value: string) => {
    const updatedFeatures = [...features]
    updatedFeatures[index] = value
    setFeatures(updatedFeatures)
    setData('features', updatedFeatures)
  }

  /**
   * Remove a feature from the list
   */
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index)
    setFeatures(updatedFeatures)
    setData('features', updatedFeatures)
  }

  /**
   * Handle image input change
   * For now, we'll use a text input for SVG data URIs or image URLs
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
              <Link href={route('admin.content.services.list')}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {isEditing ? 'Edit Service' : 'Create New Service'}
                </h2>
                <p className="text-muted-foreground">
                  {isEditing ? 'Update your service offering' : 'Add a new service to your offerings'}
                </p>
              </div>
            </div>
            {/* Action button for saving */}
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={processing}>
                <Save className="mr-2 h-4 w-4" />
                {processing ? 'Saving...' : 'Save Service'}
              </Button>
            </div>
          </div>

          {/* Main content grid layout */}
          <div className="grid gap-6 md:grid-cols-6">
            {/* Left column - Main content forms */}
            <div className="md:col-span-4 space-y-6">
              {/* Service Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Details</CardTitle>
                  <CardDescription>Enter the main service information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="e.g., Digital Transformation"
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
                      placeholder="Brief description of the service"
                      rows={3}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description}</p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={data.content}
                      onChange={(e) => setData('content', e.target.value)}
                      placeholder="Detailed content about the service (HTML supported)"
                      rows={10}
                      className={errors.content ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Detailed content displayed on the service page. HTML is supported.
                    </p>
                    {errors.content && (
                      <p className="text-sm text-red-500">{errors.content}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Image Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Image</CardTitle>
                  <CardDescription>Add an image for this service (SVG data URI or image URL)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Image URL/Data URI Input */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL or SVG Data URI</Label>
                    <Textarea
                      id="image"
                      value={data.image}
                      onChange={(e) => handleImageChange(e.target.value)}
                      placeholder="Enter image URL or SVG data URI (data:image/svg+xml;base64,...)"
                      rows={4}
                      className={errors.image ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter a full image URL or an SVG data URI. For SVG, use format: data:image/svg+xml;base64,...
                    </p>
                    {errors.image && (
                      <p className="text-sm text-red-500">{errors.image}</p>
                    )}
                  </div>

                  {/* Image Preview */}
                  {data.image && (
                    <div className="space-y-2">
                      <Label>Image Preview</Label>
                      <div className="relative h-48 w-full overflow-hidden rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                        <img
                          src={data.image}
                          alt="Service preview"
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

              {/* Features Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                  <CardDescription>List key features of this service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleUpdateFeature(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddFeature}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Settings and SEO */}
            <div className="md:col-span-2 space-y-6">
              {/* Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure service display options</CardDescription>
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
                        Show this service on the website
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
                      placeholder="Service Name | Jiftek"
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
