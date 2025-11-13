import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2, MoveUp, MoveDown } from "lucide-react"
import AdminLayout from "@/layouts/admin/layout"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useCallback } from "react"

/**
 * Hero Item Interface
 */
interface HeroItem {
  badge: string
  title: string
  titleHighlight: string
  description: string
  primaryButton: string
  primaryButtonLink: string
  secondaryButton: string
  secondaryButtonLink: string
  image: string
  imageAlt: string
}

/**
 * Hero Section Data Structure
 */
interface HeroSection {
  items?: HeroItem[]
  badge?: string
  title?: string
  titleHighlight?: string
  description?: string
  primaryButton?: string
  primaryButtonLink?: string
  secondaryButton?: string
  secondaryButtonLink?: string
  image?: string
  imageAlt?: string
}

/**
 * Sections Data Structure
 */
interface SectionsData {
  hero?: HeroSection
  [key: string]: unknown
}

/**
 * HeroSectionPage - Admin page for managing homepage hero section
 *
 * Provides a form for managing hero carousel items that rotate on the homepage.
 */
export default function HeroSectionPage({ sections }: { page?: Record<string, unknown>; sections?: SectionsData }) {
  // Initialize form with existing data from database, only use empty array if no data exists
  const heroSection = sections?.hero || {}
  const heroItems: HeroItem[] = heroSection.items
    ? (Array.isArray(heroSection.items) ? heroSection.items : [])
    : (heroSection.badge ? [{
        badge: heroSection.badge || "",
        title: heroSection.title || "",
        titleHighlight: heroSection.titleHighlight || "",
        description: heroSection.description || "",
        primaryButton: heroSection.primaryButton || "",
        primaryButtonLink: heroSection.primaryButtonLink || "",
        secondaryButton: heroSection.secondaryButton || "",
        secondaryButtonLink: heroSection.secondaryButtonLink || "",
        image: heroSection.image || "",
        imageAlt: heroSection.imageAlt || "",
      }] : [])

  const { data, setData, put, processing } = useForm<{ sections: Record<string, unknown> }>({
    sections: {
      hero: {
        items: heroItems,
      },
    },
  })

  /**
   * Update a hero carousel item field
   */
  const updateHeroItem = useCallback((itemIndex: number, field: keyof HeroItem, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const hero = (sections?.hero as Record<string, unknown>) || {}
    const items = (hero.items as HeroItem[]) || []
    const updatedItems = [...items]
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      [field]: value,
    }
    setData('sections', {
      ...sections,
      hero: {
        ...hero,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Add a new hero carousel item
   */
  const addHeroItem = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const hero = (sections?.hero as Record<string, unknown>) || {}
    const items = (hero.items as HeroItem[]) || []
    const newItem: HeroItem = {
      badge: "New Hero Item",
      title: "Enter Title",
      titleHighlight: "Highlight Text",
      description: "Enter description here",
      primaryButton: "Button Text",
      primaryButtonLink: "/",
      secondaryButton: "Secondary Button",
      secondaryButtonLink: "/",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      imageAlt: "Hero image",
    }
    const updatedItems = [...items, newItem]
    setData('sections', {
      ...sections,
      hero: {
        ...hero,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Remove a hero carousel item
   */
  const removeHeroItem = useCallback((itemIndex: number) => {
    const sections = data.sections as Record<string, unknown>
    const hero = (sections?.hero as Record<string, unknown>) || {}
    const items = (hero.items as HeroItem[]) || []
    const updatedItems = items.filter((_, index: number) => index !== itemIndex)
    setData('sections', {
      ...sections,
      hero: {
        ...hero,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Move hero item up or down
   */
  const moveHeroItem = useCallback((itemIndex: number, direction: 'up' | 'down') => {
    const sections = data.sections as Record<string, unknown>
    const hero = (sections?.hero as Record<string, unknown>) || {}
    const items = [...((hero.items as HeroItem[]) || [])]
    if (direction === 'up' && itemIndex > 0) {
      [items[itemIndex - 1], items[itemIndex]] = [items[itemIndex], items[itemIndex - 1]]
    } else if (direction === 'down' && itemIndex < items.length - 1) {
      [items[itemIndex], items[itemIndex + 1]] = [items[itemIndex + 1], items[itemIndex]]
    }
    setData('sections', {
      ...sections,
      hero: {
        ...hero,
        items,
      },
    })
  }, [data.sections, setData])

  /**
   * Handle form submission
   */
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put('/admin/content/home/hero', {
      preserveScroll: true,
    })
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Hero Section</h2>
              <p className="text-muted-foreground">Manage hero carousel items that rotate on the homepage</p>
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={processing}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hero Carousel Items</CardTitle>
                  <CardDescription>
                    Manage multiple hero carousel items that rotate automatically on the homepage
                  </CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={addHeroItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Hero Item
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {((data.sections as Record<string, unknown>)?.hero as Record<string, unknown>)?.items &&
              (((data.sections as Record<string, unknown>)?.hero as Record<string, unknown>)?.items as HeroItem[]).length > 0 &&
              (((data.sections as Record<string, unknown>)?.hero as Record<string, unknown>)?.items as HeroItem[]).map((item: HeroItem, index: number) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Hero Item {index + 1}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => moveHeroItem(index, 'up')}
                          disabled={index === 0}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => moveHeroItem(index, 'down')}
                          disabled={index === (((data.sections as Record<string, unknown>)?.hero as Record<string, unknown>)?.items as HeroItem[])?.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeHeroItem(index)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          disabled={(((data.sections as Record<string, unknown>)?.hero as Record<string, unknown>)?.items as HeroItem[])?.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`hero-badge-${index}`}>Badge Text</Label>
                        <Input
                          id={`hero-badge-${index}`}
                          value={item.badge || ''}
                          onChange={(e) => updateHeroItem(index, 'badge', e.target.value)}
                          placeholder="e.g., Innovative Technology Solutions"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`hero-image-${index}`}>Image URL</Label>
                        <Input
                          id={`hero-image-${index}`}
                          value={item.image || ''}
                          onChange={(e) => updateHeroItem(index, 'image', e.target.value)}
                          placeholder="https://images.pexels.com/photos/... or https://pixabay.com/photos/..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`hero-title-${index}`}>Title (Part 1)</Label>
                      <Input
                        id={`hero-title-${index}`}
                        value={item.title || ''}
                        onChange={(e) => updateHeroItem(index, 'title', e.target.value)}
                        placeholder="e.g., Transforming Business Through"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`hero-title-highlight-${index}`}>Title Highlight (Part 2)</Label>
                      <Input
                        id={`hero-title-highlight-${index}`}
                        value={item.titleHighlight || ''}
                        onChange={(e) => updateHeroItem(index, 'titleHighlight', e.target.value)}
                        placeholder="e.g., Smart Technology"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`hero-description-${index}`}>Description</Label>
                      <Textarea
                        id={`hero-description-${index}`}
                        rows={3}
                        value={item.description || ''}
                        onChange={(e) => updateHeroItem(index, 'description', e.target.value)}
                        placeholder="Enter a compelling description..."
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`primary-button-${index}`}>Primary Button Text</Label>
                        <Input
                          id={`primary-button-${index}`}
                          value={item.primaryButton || ''}
                          onChange={(e) => updateHeroItem(index, 'primaryButton', e.target.value)}
                          placeholder="e.g., Explore Solutions"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`primary-button-link-${index}`}>Primary Button Link</Label>
                        <Input
                          id={`primary-button-link-${index}`}
                          value={item.primaryButtonLink || ''}
                          onChange={(e) => updateHeroItem(index, 'primaryButtonLink', e.target.value)}
                          placeholder="/solutions"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`secondary-button-${index}`}>Secondary Button Text</Label>
                        <Input
                          id={`secondary-button-${index}`}
                          value={item.secondaryButton || ''}
                          onChange={(e) => updateHeroItem(index, 'secondaryButton', e.target.value)}
                          placeholder="e.g., Request a Consultation"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`secondary-button-link-${index}`}>Secondary Button Link</Label>
                        <Input
                          id={`secondary-button-link-${index}`}
                          value={item.secondaryButtonLink || ''}
                          onChange={(e) => updateHeroItem(index, 'secondaryButtonLink', e.target.value)}
                          placeholder="/contact"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`hero-image-alt-${index}`}>Image Alt Text</Label>
                      <Input
                        id={`hero-image-alt-${index}`}
                        value={item.imageAlt || ''}
                        onChange={(e) => updateHeroItem(index, 'imageAlt', e.target.value)}
                        placeholder="Descriptive alt text for accessibility"
                      />
                    </div>

                    {item.image && (
                      <div className="space-y-2">
                        <Label>Image Preview</Label>
                        <div className="relative w-full h-48 rounded-md border border-slate-200 overflow-hidden bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.imageAlt || 'Preview'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {(!((data.sections as Record<string, unknown>)?.hero as Record<string, unknown>)?.items ||
                (((data.sections as Record<string, unknown>)?.hero as Record<string, unknown>)?.items as HeroItem[])?.length === 0) && (
                <div className="text-center py-8 text-slate-500">
                  <p>No hero items yet. Click "Add Hero Item" to create your first carousel slide.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </form>
    </AdminLayout>
  )
}

