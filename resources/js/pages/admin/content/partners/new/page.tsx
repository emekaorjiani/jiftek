// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// Icons
import { Save, ArrowLeft, Image as ImageIcon, ExternalLink } from "lucide-react"

// Inertia.js routing and form handling
import { Link, useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import AdminLayout from "@/layouts/admin/layout"

/**
 * NewPartnerPage - Admin page for creating/editing partners/company logos
 *
 * This component provides a form for creating new partners
 * with logo URLs, company information, and display controls.
 * Supports both create and update modes.
 */
export default function NewPartnerPage({ partner }: { partner?: any }) {
  // Determine if we're editing or creating
  const isEditing = !!partner?.id

  // Initialize form with existing data or defaults
  const { data, setData, post, put, processing, errors } = useForm({
    name: partner?.name || '',
    logo: partner?.logo || '',
    website: partner?.website || '',
    order: partner?.order || 0,
    is_active: partner?.is_active ?? true,
  })

  /**
   * Handle form submission
   * Uses POST for create, PUT for update
   */
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    if (isEditing) {
      put(route('admin.content.partners.update', partner.id), {
        preserveScroll: true,
      })
    } else {
      post(route('admin.content.partners.store'), {
        preserveScroll: true,
      })
    }
  }

  /**
   * Helper function to generate Simple Icons logo URL from company name
   * Simple Icons CDN: https://cdn.simpleicons.org/{brand}/{color}
   */
  const generateSimpleIconLogo = () => {
    if (data.name) {
      // Convert company name to simpleicons format (lowercase, replace spaces with nothing)
      const brandName = data.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')
      // Use a default color (you can customize this)
      setData('logo', `https://cdn.simpleicons.org/${brandName}/000000`)
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
              <Link href={route('admin.content.partners')}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {isEditing ? 'Edit Partner' : 'Create New Partner'}
                </h2>
                <p className="text-muted-foreground">
                  {isEditing ? 'Update company logo and information' : 'Add a new partner company logo'}
                </p>
              </div>
            </div>
            {/* Action button for saving */}
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={processing}>
                <Save className="mr-2 h-4 w-4" />
                {processing ? 'Saving...' : 'Save Partner'}
              </Button>
            </div>
          </div>

          {/* Main content grid layout */}
          <div className="grid gap-6 md:grid-cols-6">
            {/* Left column - Main content forms */}
            <div className="md:col-span-4 space-y-6">
              {/* Partner Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Partner Information</CardTitle>
                  <CardDescription>Enter the company name and logo details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="e.g., Microsoft, Google, Amazon"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="website"
                        type="url"
                        value={data.website}
                        onChange={(e) => setData('website', e.target.value)}
                        placeholder="https://www.example.com"
                        className={errors.website ? 'border-red-500' : ''}
                      />
                      {data.name && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateSimpleIconLogo}
                          title="Generate logo from Simple Icons CDN"
                        >
                          Auto Logo
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enter the company website. Use "Auto Logo" to generate logo from Simple Icons CDN.
                    </p>
                    {errors.website && (
                      <p className="text-sm text-red-500">{errors.website}</p>
                    )}
                  </div>

                  {/* Logo URL */}
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL *</Label>
                    <Input
                      id="logo"
                      value={data.logo}
                      onChange={(e) => setData('logo', e.target.value)}
                      placeholder="https://cdn.simpleicons.org/brandname/color or direct image URL"
                      className={errors.logo ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter logo URL. You can use:
                      <br />
                      • Simple Icons CDN: https://cdn.simpleicons.org/brandname/color (e.g., microsoft/0078D4)
                      <br />
                      • Direct image URL (PNG, JPG, SVG)
                      <br />
                      • Or upload to storage and use local path
                    </p>
                    {errors.logo && (
                      <p className="text-sm text-red-500">{errors.logo}</p>
                    )}
                  </div>

                  {/* Logo Preview */}
                  {data.logo && (
                    <div className="space-y-2">
                      <Label>Logo Preview</Label>
                      <div className="relative h-32 w-64 overflow-hidden rounded-md border border-gray-200 bg-white p-4 flex items-center justify-center">
                        <img
                          src={data.logo}
                          alt={data.name || 'Logo preview'}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = '<div class="flex h-full w-full items-center justify-center text-muted-foreground"><ImageIcon class="h-12 w-12" /><span class="ml-2">Invalid logo URL</span></div>'
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column - Settings */}
            <div className="md:col-span-2 space-y-6">
              {/* Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure partner display options</CardDescription>
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
                        Show this partner on the website
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

              {/* Help Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Logo Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Simple Icons CDN:</strong> Free, reliable SVG logos for thousands of brands.
                    <br />
                    Format: https://cdn.simpleicons.org/brandname/color
                    <br />
                    Example: https://cdn.simpleicons.org/microsoft/0078D4
                  </p>
                  <p>
                    <strong>Other options:</strong>
                    <br />
                    • Upload logos to storage/app/public/partners/
                    <br />
                    • Use direct image URLs (PNG, JPG, SVG)
                    <br />
                    • Use SVG data URIs
                  </p>
                  {data.website && (
                    <div className="mt-4">
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        Visit Website
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}

