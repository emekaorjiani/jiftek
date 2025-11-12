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
 * NewTeamMemberPage - Admin page for creating/editing team members
 *
 * This component provides a form for creating new team members
 * with images, bio, title, and display controls.
 * Supports both create and update modes.
 */
export default function NewTeamMemberPage({ teamMember }: { teamMember?: any }) {
  // Determine if we're editing or creating
  const isEditing = !!teamMember?.id

  // Initialize form with existing data or defaults
  const { data, setData, post, put, processing, errors } = useForm({
    name: teamMember?.name || '',
    title: teamMember?.title || '',
    bio: teamMember?.bio || '',
    image: teamMember?.image || '',
    order: teamMember?.order || 0,
    is_active: teamMember?.is_active ?? true,
  })

  /**
   * Handle form submission
   * Uses POST for create, PUT for update
   */
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    if (isEditing) {
      put(route('admin.content.team-members.update', teamMember.id), {
        preserveScroll: true,
      })
    } else {
      post(route('admin.content.team-members.store'), {
        preserveScroll: true,
      })
    }
  }

  /**
   * Handle image input change
   * Supports image URLs or data URIs
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
              <Link href={route('admin.content.team-members')}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {isEditing ? 'Edit Team Member' : 'Create New Team Member'}
                </h2>
                <p className="text-muted-foreground">
                  {isEditing ? 'Update team member information' : 'Add a new team member to your team'}
                </p>
              </div>
            </div>
            {/* Action button for saving */}
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={processing}>
                <Save className="mr-2 h-4 w-4" />
                {processing ? 'Saving...' : 'Save Team Member'}
              </Button>
            </div>
          </div>

          {/* Main content grid layout */}
          <div className="grid gap-6 md:grid-cols-6">
            {/* Left column - Main content forms */}
            <div className="md:col-span-4 space-y-6">
              {/* Team Member Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Member Details</CardTitle>
                  <CardDescription>Enter the team member information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="e.g., John Doe"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="e.g., CEO & Founder"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={data.bio}
                      onChange={(e) => setData('bio', e.target.value)}
                      placeholder="Brief biography or description of the team member"
                      rows={5}
                      className={errors.bio ? 'border-red-500' : ''}
                    />
                    {errors.bio && (
                      <p className="text-sm text-red-500">{errors.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Image and settings */}
            <div className="md:col-span-2 space-y-6">
              {/* Image Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Image</CardTitle>
                  <CardDescription>Team member photo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Image Preview */}
                  {data.image && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                      <img
                        src={data.image}
                        alt="Team member preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Image Input */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={data.image}
                      onChange={(e) => handleImageChange(e.target.value)}
                      placeholder="https://images.unsplash.com/... or data URI"
                      className={errors.image ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter an image URL (e.g., from Unsplash) or upload an image to get a data URI.
                    </p>
                    {errors.image && (
                      <p className="text-sm text-red-500">{errors.image}</p>
                    )}
                  </div>

                  {/* Image Placeholder */}
                  {!data.image && (
                    <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-dashed bg-muted">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">No image</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Display and ordering options</CardDescription>
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
                      Lower numbers appear first. Default is 0.
                    </p>
                    {errors.order && (
                      <p className="text-sm text-red-500">{errors.order}</p>
                    )}
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="is_active">Active</Label>
                      <p className="text-sm text-muted-foreground">
                        Show this team member on the website
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
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}

