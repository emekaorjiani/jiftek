import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2, MoveUp, MoveDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin/layout"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useCallback } from "react"

/**
 * Process Step Interface
 */
interface ProcessStep {
  step: string
  title: string
  description: string
}

/**
 * FAQ Item Interface
 */
interface FAQItem {
  question: string
  answer: string
}

/**
 * ServicesContentPage - Admin page for managing services page content
 * 
 * Provides comprehensive form for managing all services page sections including
 * hero, services overview, process, and FAQ sections.
 */
export default function ServicesContentPage({ page, sections }: { page?: Record<string, unknown>; sections?: Record<string, unknown> }) {
  // Initialize form with existing data or defaults
  const { data, setData, put, processing } = useForm<{ sections: Record<string, unknown> }>({
    sections: sections || {
      hero: {
        title: page?.sections?.hero?.title || "Our Services",
        description: page?.sections?.hero?.description || "Comprehensive technology solutions tailored to your business needs. We help you innovate, transform, and grow.",
        backgroundStyle: page?.sections?.hero?.backgroundStyle || "gradient",
      },
      overview: {
        title: page?.sections?.overview?.title || "Our Core Services",
        description: page?.sections?.overview?.description || "Comprehensive solutions designed to address your most complex technology challenges.",
      },
      process: {
        title: page?.sections?.process?.title || "Our Service Process",
        description: page?.sections?.process?.description || "A structured approach to delivering exceptional results for your business.",
        steps: page?.sections?.process?.steps || [
          {
            step: "01",
            title: "Discovery",
            description: "We begin by understanding your business, challenges, and goals to define the scope of work.",
          },
          {
            step: "02",
            title: "Strategy",
            description: "Our team develops a comprehensive strategy and roadmap tailored to your specific needs.",
          },
          {
            step: "03",
            title: "Implementation",
            description: "We execute the plan with precision, keeping you informed throughout the process.",
          },
          {
            step: "04",
            title: "Optimization",
            description: "Continuous improvement and refinement to ensure long-term success and ROI.",
          },
        ],
      },
      faq: {
        title: page?.sections?.faq?.title || "Frequently Asked Questions",
        description: page?.sections?.faq?.description || "Find answers to common questions about our services.",
        items: page?.sections?.faq?.items || [],
      },
    },
  })

  /**
   * Update a section field
   */
  const updateSectionField = useCallback((sectionKey: string, field: string, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const section = (sections[sectionKey] as Record<string, unknown>) || {}
    setData('sections', {
      ...sections,
      [sectionKey]: {
        ...section,
        [field]: value,
      },
    })
  }, [data.sections, setData])

  /**
   * Update a process step
   */
  const updateProcessStep = useCallback((index: number, field: string, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const process = (sections.process as Record<string, unknown>) || {}
    const steps = (process.steps as ProcessStep[]) || []
    const updatedItems = [...steps]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setData('sections', {
      ...sections,
      process: {
        ...process,
        steps: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Add a new process step
   */
  const addProcessStep = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const process = (sections.process as Record<string, unknown>) || {}
    const steps = (process.steps as ProcessStep[]) || []
    const newItem: ProcessStep = {
      step: String(steps.length + 1).padStart(2, '0'),
      title: "New Step",
      description: "Enter step description here",
    }
    setData('sections', {
      ...sections,
      process: {
        ...process,
        steps: [...steps, newItem],
      },
    })
  }, [data.sections, setData])

  /**
   * Remove a process step
   */
  const removeProcessStep = useCallback((index: number) => {
    const sections = data.sections as Record<string, unknown>
    const process = (sections.process as Record<string, unknown>) || {}
    const steps = (process.steps as ProcessStep[]) || []
    const updatedItems = steps.filter((_, i) => i !== index)
    setData('sections', {
      ...sections,
      process: {
        ...process,
        steps: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Update an FAQ item
   */
  const updateFAQItem = useCallback((index: number, field: string, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const faq = (sections.faq as Record<string, unknown>) || {}
    const items = (faq.items as FAQItem[]) || []
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setData('sections', {
      ...sections,
      faq: {
        ...faq,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Add a new FAQ item
   */
  const addFAQItem = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const faq = (sections.faq as Record<string, unknown>) || {}
    const items = (faq.items as FAQItem[]) || []
    const newItem: FAQItem = {
      question: "New Question",
      answer: "Enter answer here",
    }
    setData('sections', {
      ...sections,
      faq: {
        ...faq,
        items: [...items, newItem],
      },
    })
  }, [data.sections, setData])

  /**
   * Remove an FAQ item
   */
  const removeFAQItem = useCallback((index: number) => {
    const sections = data.sections as Record<string, unknown>
    const faq = (sections.faq as Record<string, unknown>) || {}
    const items = (faq.items as FAQItem[]) || []
    const updatedItems = items.filter((_, i) => i !== index)
    setData('sections', {
      ...sections,
      faq: {
        ...faq,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Handle form submission
   */
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put(route('admin.content.services.update'), {
      preserveScroll: true,
    })
  }

  const heroSection = (data.sections as Record<string, unknown>)?.hero as Record<string, unknown> || {}
  const overviewSection = (data.sections as Record<string, unknown>)?.overview as Record<string, unknown> || {}
  const processSection = (data.sections as Record<string, unknown>)?.process as Record<string, unknown> || {}
  const faqSection = (data.sections as Record<string, unknown>)?.faq as Record<string, unknown> || {}
  const processSteps = (processSection.steps as ProcessStep[]) || []
  const faqItems = (faqSection.items as FAQItem[]) || []

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Services Content</h2>
            <p className="text-muted-foreground">Manage your services page content and offerings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={processing}>
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="process">Service Process</TabsTrigger>
            <TabsTrigger value="faq">FAQ Section</TabsTrigger>
          </TabsList>

          {/* Hero Section Tab */}
          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>
                  Edit the main hero section content that appears at the top of the services page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="services-title">Page Title</Label>
                  <Input
                    id="services-title"
                    value={(heroSection.title as string) || ''}
                    onChange={(e) => updateSectionField('hero', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services-description">Description</Label>
                  <Textarea
                    id="services-description"
                    rows={3}
                    value={(heroSection.description as string) || ''}
                    onChange={(e) => updateSectionField('hero', 'description', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services-background">Background Style</Label>
                  <Select
                    value={(heroSection.backgroundStyle as string) || 'gradient'}
                    onValueChange={(value) => updateSectionField('hero', 'backgroundStyle', value)}
                  >
                    <SelectTrigger id="services-background">
                      <SelectValue placeholder="Select background style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gradient">Gradient</SelectItem>
                      <SelectItem value="solid">Solid Color</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Services Overview</CardTitle>
                <CardDescription>Edit the main services section content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end mb-4">
                  <Link href={route('admin.content.services.list')}>
                    <Button type="button" variant="outline">
                      Manage Services
                    </Button>
                  </Link>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services-overview-title">Section Title</Label>
                  <Input
                    id="services-overview-title"
                    value={(overviewSection.title as string) || ''}
                    onChange={(e) => updateSectionField('overview', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services-overview-description">Description</Label>
                  <Textarea
                    id="services-overview-description"
                    rows={3}
                    value={(overviewSection.description as string) || ''}
                    onChange={(e) => updateSectionField('overview', 'description', e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Note: Individual services are managed separately. Use the "Manage Services" button above to add, edit, or remove services.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Process Tab */}
          <TabsContent value="process" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Process</CardTitle>
                <CardDescription>Edit the service process section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="process-title">Section Title</Label>
                  <Input
                    id="process-title"
                    value={(processSection.title as string) || ''}
                    onChange={(e) => updateSectionField('process', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="process-description">Description</Label>
                  <Textarea
                    id="process-description"
                    rows={3}
                    value={(processSection.description as string) || ''}
                    onChange={(e) => updateSectionField('process', 'description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Process Steps</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addProcessStep}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Step
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {processSteps.map((step, i) => (
                      <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Step {i + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeProcessStep(i)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`step-number-${i}`}>Step Number</Label>
                          <Input
                            id={`step-number-${i}`}
                            value={step.step || ''}
                            onChange={(e) => updateProcessStep(i, 'step', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`step-title-${i}`}>Title</Label>
                          <Input
                            id={`step-title-${i}`}
                            value={step.title || ''}
                            onChange={(e) => updateProcessStep(i, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`step-description-${i}`}>Description</Label>
                          <Textarea
                            id={`step-description-${i}`}
                            rows={2}
                            value={step.description || ''}
                            onChange={(e) => updateProcessStep(i, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Section Tab */}
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>FAQ Section</CardTitle>
                <CardDescription>Edit the frequently asked questions section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faq-title">Section Title</Label>
                  <Input
                    id="faq-title"
                    value={(faqSection.title as string) || ''}
                    onChange={(e) => updateSectionField('faq', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faq-description">Description</Label>
                  <Textarea
                    id="faq-description"
                    rows={3}
                    value={(faqSection.description as string) || ''}
                    onChange={(e) => updateSectionField('faq', 'description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>FAQ Items</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addFAQItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add FAQ
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {faqItems.map((faq, i) => (
                      <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">FAQ {i + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFAQItem(i)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`faq-question-${i}`}>Question</Label>
                          <Input
                            id={`faq-question-${i}`}
                            value={faq.question || ''}
                            onChange={(e) => updateFAQItem(i, 'question', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`faq-answer-${i}`}>Answer</Label>
                          <Textarea
                            id={`faq-answer-${i}`}
                            rows={4}
                            value={faq.answer || ''}
                            onChange={(e) => updateFAQItem(i, 'answer', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </AdminLayout>
  )
}
