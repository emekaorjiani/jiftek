import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
 * HomeContentPage - Admin page for managing homepage content
 *
 * Provides a comprehensive form for managing all homepage sections including
 * hero, trusted by, solutions, case studies, and CTA sections.
 */
export default function HomeContentPage({ page, sections }: { page?: Record<string, unknown>; sections?: Record<string, unknown> }) {
  // Initialize form with existing data or defaults
  const { data, setData, put, processing } = useForm<{ sections: Record<string, unknown> }>({
    sections: sections || {
      hero: {
        // Support both single hero item (legacy) and carousel items array
        items: page?.sections?.hero?.items || (page?.sections?.hero?.badge ? [{
          badge: page?.sections?.hero?.badge || "Innovative Technology Solutions",
          title: page?.sections?.hero?.title || "Transforming Business Through",
          titleHighlight: page?.sections?.hero?.titleHighlight || "Smart Technology",
          description: page?.sections?.hero?.description || "Jiftek delivers cutting-edge technology consulting and solutions that drive innovation, efficiency, and growth for forward-thinking organizations.",
          primaryButton: page?.sections?.hero?.primaryButton || "Explore Solutions",
          primaryButtonLink: page?.sections?.hero?.primaryButtonLink || "/solutions",
          secondaryButton: page?.sections?.hero?.secondaryButton || "Request a Consultation",
          secondaryButtonLink: page?.sections?.hero?.secondaryButtonLink || "/contact",
          image: page?.sections?.hero?.image || "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
          imageAlt: page?.sections?.hero?.imageAlt || "Digital transformation and technology innovation",
        }] : [
          {
            badge: "Innovative Technology Solutions",
            title: "Transforming Business Through",
            titleHighlight: "Smart Technology",
            description: "Jiftek delivers cutting-edge technology consulting and solutions that drive innovation, efficiency, and growth for forward-thinking organizations.",
            primaryButton: "Explore Solutions",
            primaryButtonLink: "/solutions",
            secondaryButton: "Request a Consultation",
            secondaryButtonLink: "/contact",
            image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
            imageAlt: "Digital transformation and technology innovation",
          },
          {
            badge: "Cloud & Infrastructure",
            title: "Scalable Cloud Solutions for",
            titleHighlight: "Modern Enterprises",
            description: "Empower your business with secure, scalable cloud infrastructure that adapts to your needs and accelerates your digital transformation journey.",
            primaryButton: "View Services",
            primaryButtonLink: "/services",
            secondaryButton: "Learn More",
            secondaryButtonLink: "/solutions",
            image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
            imageAlt: "Cloud computing and infrastructure",
          },
        ]),
      },
      trusted: {
        title: page?.sections?.trusted?.title || "Trusted by industry leaders",
        partners: page?.sections?.trusted?.partners || [],
      },
      solutions: {
        badge: page?.sections?.solutions?.badge || "Our Solutions",
        title: page?.sections?.solutions?.title || "Comprehensive Technology Solutions",
        description: page?.sections?.solutions?.description || "We offer end-to-end technology services designed to help your business innovate and thrive in the digital era.",
        items: page?.sections?.solutions?.items || [],
        buttonText: page?.sections?.solutions?.buttonText || "View All Solutions",
        buttonLink: page?.sections?.solutions?.buttonLink || "/solutions",
      },
      caseStudies: {
        badge: page?.sections?.['case-studies']?.badge || "Success Stories",
        title: page?.sections?.['case-studies']?.title || "Our Client Success Stories",
        description: page?.sections?.['case-studies']?.description || "Discover how we've helped organizations overcome challenges and achieve their business goals.",
        items: page?.sections?.['case-studies']?.items || [],
        buttonText: page?.sections?.['case-studies']?.buttonText || "Browse All Case Studies",
        buttonLink: page?.sections?.['case-studies']?.buttonLink || "/case-studies",
      },
      cta: {
        title: page?.sections?.cta?.title || "Ready to Transform Your Business?",
        description: page?.sections?.cta?.description || "Schedule a consultation with our experts to discover how Jiftek can help you achieve your technology goals.",
        primaryButton: page?.sections?.cta?.primaryButton || "Get Started Today",
        primaryButtonLink: page?.sections?.cta?.primaryButtonLink || "/contact",
        secondaryButton: page?.sections?.cta?.secondaryButton || "Learn More",
        secondaryButtonLink: page?.sections?.cta?.secondaryButtonLink || "/services",
        backgroundColor: page?.sections?.cta?.backgroundColor || "#3b82f6",
      },
    },
  })

  /**
   * Update a hero carousel item field
   */
  const updateHeroItem = useCallback((itemIndex: number, field: string, value: string) => {
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
    put(route('admin.content.home.update'), {
      preserveScroll: true,
    })
  }

  return (
    <AdminLayout>
    <form onSubmit={handleSubmit}>
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Homepage Content</h2>
          <p className="text-muted-foreground">Manage your homepage content and sections</p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={processing}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="trusted">Trusted By</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="cta">CTA Section</TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero" className="space-y-4">
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
        </TabsContent>

        {/* Trusted By Tab */}
        <TabsContent value="trusted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trusted By Section</CardTitle>
              <CardDescription>Edit the trusted by section that displays partner logos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trusted-title">Section Title</Label>
                <Input id="trusted-title" defaultValue="Trusted by industry leaders" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Partner Logos</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Partner
                  </Button>
                </div>

                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-md border border-slate-200 p-4">
                      <div className="h-12 w-24 rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500">
                        Logo {i + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor={`partner-name-${i}`}>Partner Name</Label>
                          <Input id={`partner-name-${i}`} defaultValue={`Partner ${i + 1}`} />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`partner-url-${i}`}>Website URL</Label>
                          <Input id={`partner-url-${i}`} defaultValue="https://example.com" />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Solutions Tab */}
        <TabsContent value="solutions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solutions Section</CardTitle>
              <CardDescription>Edit the core solutions section of the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="solutions-badge">Badge Text</Label>
                <Input id="solutions-badge" defaultValue="Our Solutions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solutions-title">Section Title</Label>
                <Input id="solutions-title" defaultValue="Comprehensive Technology Solutions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solutions-description">Description</Label>
                <Textarea
                  id="solutions-description"
                  rows={3}
                  defaultValue="We offer end-to-end technology services designed to help your business innovate and thrive in the digital era."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Solution Cards</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Solution
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Digital Transformation",
                      description: "Reimagine your business processes with cutting-edge digital solutions",
                    },
                    {
                      title: "Cloud Services",
                      description: "Secure, scalable cloud infrastructure optimized for your business needs",
                    },
                    {
                      title: "Custom Software",
                      description: "Tailor-made software solutions designed for your unique challenges",
                    },
                  ].map((solution, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`solution-title-${i}`}>Title</Label>
                        <Input id={`solution-title-${i}`} defaultValue={solution.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`solution-description-${i}`}>Description</Label>
                        <Textarea id={`solution-description-${i}`} rows={2} defaultValue={solution.description} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`solution-link-${i}`}>Link URL</Label>
                        <Input
                          id={`solution-link-${i}`}
                          defaultValue={`/solutions/${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="solutions-button">View All Button Text</Label>
                  <Input id="solutions-button" defaultValue="View All Solutions" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solutions-button-link">Button Link</Label>
                  <Input id="solutions-button-link" defaultValue="/solutions" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Case Studies Tab */}
        <TabsContent value="case-studies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Case Studies Section</CardTitle>
              <CardDescription>Edit the case studies section of the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="case-studies-badge">Badge Text</Label>
                <Input id="case-studies-badge" defaultValue="Success Stories" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="case-studies-title">Section Title</Label>
                <Input id="case-studies-title" defaultValue="Our Client Success Stories" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="case-studies-description">Description</Label>
                <Textarea
                  id="case-studies-description"
                  rows={3}
                  defaultValue="Discover how we've helped organizations overcome challenges and achieve their business goals."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Case Studies</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Case Study
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Financial Services Transformation",
                      description:
                        "How we helped a leading bank modernize their legacy systems and improve customer experience",
                      image: "/placeholder.svg?height=300&width=600&text=Case+Study+1",
                    },
                    {
                      title: "Healthcare Innovation",
                      description: "Implementing AI-driven diagnostics platform that improved patient outcomes by 35%",
                      image: "/placeholder.svg?height=300&width=600&text=Case+Study+2",
                    },
                  ].map((caseStudy, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`case-study-title-${i}`}>Title</Label>
                        <Input id={`case-study-title-${i}`} defaultValue={caseStudy.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`case-study-description-${i}`}>Description</Label>
                        <Textarea id={`case-study-description-${i}`} rows={2} defaultValue={caseStudy.description} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`case-study-image-${i}`}>Image</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-24 w-40 rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500">
                            Image Preview
                          </div>
                          <Button variant="outline">Upload Image</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`case-study-link-${i}`}>Link URL</Label>
                        <Input id={`case-study-link-${i}`} defaultValue="/case-studies" />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="case-studies-button">Button Text</Label>
                  <Input id="case-studies-button" defaultValue="Browse All Case Studies" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="case-studies-button-link">Button Link</Label>
                  <Input id="case-studies-button-link" defaultValue="/case-studies" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA Section Tab */}
        <TabsContent value="cta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CTA Section</CardTitle>
              <CardDescription>Edit the call-to-action section at the bottom of the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cta-title">Heading</Label>
                <Input id="cta-title" defaultValue="Ready to Transform Your Business?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-description">Description</Label>
                <Textarea
                  id="cta-description"
                  rows={3}
                  defaultValue="Schedule a consultation with our experts to discover how Jiftek can help you achieve your technology goals."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cta-primary-button">Primary Button Text</Label>
                  <Input id="cta-primary-button" defaultValue="Get Started Today" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-primary-button-link">Primary Button Link</Label>
                  <Input id="cta-primary-button-link" defaultValue="/contact" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cta-secondary-button">Secondary Button Text</Label>
                  <Input id="cta-secondary-button" defaultValue="Learn More" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-secondary-button-link">Secondary Button Link</Label>
                  <Input id="cta-secondary-button-link" defaultValue="/services" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-background-color">Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input id="cta-background-color" defaultValue="#3b82f6" />
                  <div className="h-10 w-10 rounded-md bg-blue-600"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </form>
    </AdminLayout>
  )
}

