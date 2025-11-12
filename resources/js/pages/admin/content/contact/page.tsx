import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminLayout from "@/layouts/admin/layout"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useCallback } from "react"

/**
 * Form Field Interface
 */
interface FormField {
  label: string
  type: string
  required: boolean
  placeholder: string
}

/**
 * Contact Info Item Interface
 */
interface ContactInfoItem {
  type: string
  label: string
  value: string
  link?: string
}

/**
 * FAQ Item Interface
 */
interface FAQItem {
  question: string
  answer: string
}

/**
 * ContactContentPage - Admin page for managing contact page content
 * 
 * Provides comprehensive form for managing all contact page sections including
 * hero, contact form, contact info, and FAQ sections.
 */
export default function ContactContentPage({ page, sections }: { page?: Record<string, unknown>; sections?: Record<string, unknown> }) {
  // Initialize form with existing data or defaults
  const { data, setData, put, processing } = useForm<{ sections: Record<string, unknown> }>({
    sections: sections || {
      hero: {
        title: page?.sections?.hero?.title || "Contact Us",
        description: page?.sections?.hero?.description || "Have questions or ready to start your next project? Get in touch with our team.",
        backgroundStyle: page?.sections?.hero?.backgroundStyle || "gradient",
      },
      form: {
        title: page?.sections?.form?.title || "Get in Touch",
        description: page?.sections?.form?.description || "Fill out the form below and our team will get back to you within 24 hours.",
        fields: page?.sections?.form?.fields || [
          { label: "First name", type: "text", required: true, placeholder: "Enter your first name" },
          { label: "Last name", type: "text", required: true, placeholder: "Enter your last name" },
          { label: "Email", type: "email", required: true, placeholder: "Enter your email" },
          { label: "Phone", type: "tel", required: false, placeholder: "Enter your phone number" },
          { label: "Company", type: "text", required: false, placeholder: "Enter your company name" },
          { label: "Subject", type: "text", required: true, placeholder: "Enter the subject" },
          { label: "Message", type: "textarea", required: true, placeholder: "Enter your message" },
        ],
        submitButton: page?.sections?.form?.submitButton || "Send Message",
        successMessage: page?.sections?.form?.successMessage || "Thank you for your message! We'll get back to you shortly.",
        errorMessage: page?.sections?.form?.errorMessage || "There was an error submitting your message. Please try again.",
        notificationEmail: page?.sections?.form?.notificationEmail || "info@jiftek.com",
      },
      'contact-info': {
        title: page?.sections?.['contact-info']?.title || "Contact Information",
        items: page?.sections?.['contact-info']?.items || [
          { type: 'phone', label: 'Phone', value: '+2348058288340', link: 'tel:+2348058288340' },
          { type: 'whatsapp', label: 'Chat on WhatsApp', value: 'Open WhatsApp', link: 'https://wa.me/2348058288340' },
          { type: 'email', label: 'Send an Email', value: 'info@jiftek.com', link: 'mailto:info@jiftek.com' },
          { type: 'address', label: 'Address', value: '10 Ukpor Street, Ishawo, Agric, Ikorodu, Lagos.', link: '' },
        ],
      },
      map: {
        title: page?.sections?.map?.title || "Our Location",
        latitude: page?.sections?.map?.latitude || 6.6,
        longitude: page?.sections?.map?.longitude || 3.505,
        zoom: page?.sections?.map?.zoom || 15,
        address: page?.sections?.map?.address || '10 Ukpor Street, Ishawo, Agric, Ikorodu, Lagos.',
      },
      'office-hours': {
        title: page?.sections?.['office-hours']?.title || "Office Hours",
        description: page?.sections?.['office-hours']?.description || "Our team is available during the following hours:",
        hours: page?.sections?.['office-hours']?.hours || [
          'Monday - Friday: 9:00 AM - 6:00 PM',
          'Saturday: 10:00 AM - 4:00 PM',
          'Sunday: Closed',
        ],
      },
      faq: {
        title: page?.sections?.faq?.title || "Frequently Asked Questions",
        description: page?.sections?.faq?.description || "Find answers to common questions about working with us.",
        items: page?.sections?.faq?.items || [],
      },
    },
  })

  /**
   * Update a section field
   */
  const updateSectionField = useCallback((sectionKey: string, field: string, value: string | string[]) => {
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
   * Update a form field
   */
  const updateFormField = useCallback((index: number, field: string, value: string | boolean) => {
    const sections = data.sections as Record<string, unknown>
    const form = (sections.form as Record<string, unknown>) || {}
    const fields = (form.fields as FormField[]) || []
    const updatedItems = [...fields]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setData('sections', {
      ...sections,
      form: {
        ...form,
        fields: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Add a new form field
   */
  const addFormField = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const form = (sections.form as Record<string, unknown>) || {}
    const fields = (form.fields as FormField[]) || []
    const newItem: FormField = {
      label: "New Field",
      type: "text",
      required: false,
      placeholder: "Enter value",
    }
    setData('sections', {
      ...sections,
      form: {
        ...form,
        fields: [...fields, newItem],
      },
    })
  }, [data.sections, setData])

  /**
   * Remove a form field
   */
  const removeFormField = useCallback((index: number) => {
    const sections = data.sections as Record<string, unknown>
    const form = (sections.form as Record<string, unknown>) || {}
    const fields = (form.fields as FormField[]) || []
    const updatedItems = fields.filter((_, i) => i !== index)
    setData('sections', {
      ...sections,
      form: {
        ...form,
        fields: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Update a contact info item
   */
  const updateContactInfoItem = useCallback((index: number, field: string, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const contactInfo = (sections['contact-info'] as Record<string, unknown>) || {}
    const items = (contactInfo.items as ContactInfoItem[]) || []
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setData('sections', {
      ...sections,
      'contact-info': {
        ...contactInfo,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Add a contact info item
   */
  const addContactInfoItem = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const contactInfo = (sections['contact-info'] as Record<string, unknown>) || {}
    const items = (contactInfo.items as ContactInfoItem[]) || []
    const newItem: ContactInfoItem = {
      type: 'text',
      label: 'New Contact Info',
      value: '',
      link: '',
    }
    setData('sections', {
      ...sections,
      'contact-info': {
        ...contactInfo,
        items: [...items, newItem],
      },
    })
  }, [data.sections, setData])

  /**
   * Remove a contact info item
   */
  const removeContactInfoItem = useCallback((index: number) => {
    const sections = data.sections as Record<string, unknown>
    const contactInfo = (sections['contact-info'] as Record<string, unknown>) || {}
    const items = (contactInfo.items as ContactInfoItem[]) || []
    const updatedItems = items.filter((_, i) => i !== index)
    setData('sections', {
      ...sections,
      'contact-info': {
        ...contactInfo,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Update office hours
   */
  const updateOfficeHours = useCallback((index: number, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const officeHours = (sections['office-hours'] as Record<string, unknown>) || {}
    const hours = (officeHours.hours as string[]) || []
    const updatedHours = [...hours]
    updatedHours[index] = value
    setData('sections', {
      ...sections,
      'office-hours': {
        ...officeHours,
        hours: updatedHours,
      },
    })
  }, [data.sections, setData])

  /**
   * Add office hour
   */
  const addOfficeHour = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const officeHours = (sections['office-hours'] as Record<string, unknown>) || {}
    const hours = (officeHours.hours as string[]) || []
    setData('sections', {
      ...sections,
      'office-hours': {
        ...officeHours,
        hours: [...hours, 'New hours'],
      },
    })
  }, [data.sections, setData])

  /**
   * Remove office hour
   */
  const removeOfficeHour = useCallback((index: number) => {
    const sections = data.sections as Record<string, unknown>
    const officeHours = (sections['office-hours'] as Record<string, unknown>) || {}
    const hours = (officeHours.hours as string[]) || []
    const updatedHours = hours.filter((_, i) => i !== index)
    setData('sections', {
      ...sections,
      'office-hours': {
        ...officeHours,
        hours: updatedHours,
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
   * Add an FAQ item
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
    put(route('admin.content.contact.update'), {
      preserveScroll: true,
    })
  }

  const heroSection = (data.sections as Record<string, unknown>)?.hero as Record<string, unknown> || {}
  const formSection = (data.sections as Record<string, unknown>)?.form as Record<string, unknown> || {}
  const contactInfoSection = (data.sections as Record<string, unknown>)?.['contact-info'] as Record<string, unknown> || {}
  const mapSection = (data.sections as Record<string, unknown>)?.map as Record<string, unknown> || {}
  const officeHoursSection = (data.sections as Record<string, unknown>)?.['office-hours'] as Record<string, unknown> || {}
  const faqSection = (data.sections as Record<string, unknown>)?.faq as Record<string, unknown> || {}
  const formFields = (formSection.fields as FormField[]) || []
  const contactInfoItems = (contactInfoSection.items as ContactInfoItem[]) || []
  const officeHours = (officeHoursSection.hours as string[]) || []
  const faqItems = (faqSection.items as FAQItem[]) || []

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contact Page Content</h2>
            <p className="text-muted-foreground">Manage your contact page content and form settings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={processing}>
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="form">Contact Form</TabsTrigger>
            <TabsTrigger value="info">Contact Info</TabsTrigger>
            <TabsTrigger value="map">Map Settings</TabsTrigger>
            <TabsTrigger value="faq">FAQ Section</TabsTrigger>
          </TabsList>

          {/* Hero Section Tab */}
          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>
                  Edit the main hero section content that appears at the top of the contact page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-title">Page Title</Label>
                  <Input
                    id="contact-title"
                    value={(heroSection.title as string) || ''}
                    onChange={(e) => updateSectionField('hero', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-description">Description</Label>
                  <Textarea
                    id="contact-description"
                    rows={3}
                    value={(heroSection.description as string) || ''}
                    onChange={(e) => updateSectionField('hero', 'description', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-background">Background Style</Label>
                  <Select
                    value={(heroSection.backgroundStyle as string) || 'gradient'}
                    onValueChange={(value) => updateSectionField('hero', 'backgroundStyle', value)}
                  >
                    <SelectTrigger id="contact-background">
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

          {/* Contact Form Tab */}
          <TabsContent value="form" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>Configure your contact form fields and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input
                    id="form-title"
                    value={(formSection.title as string) || ''}
                    onChange={(e) => updateSectionField('form', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-description">Form Description</Label>
                  <Textarea
                    id="form-description"
                    rows={3}
                    value={(formSection.description as string) || ''}
                    onChange={(e) => updateSectionField('form', 'description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Form Fields</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addFormField}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Field
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formFields.map((field, i) => (
                      <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Field {i + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFormField(i)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`field-label-${i}`}>Field Label</Label>
                          <Input
                            id={`field-label-${i}`}
                            value={field.label || ''}
                            onChange={(e) => updateFormField(i, 'label', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`field-type-${i}`}>Field Type</Label>
                          <Select
                            value={field.type || 'text'}
                            onValueChange={(value) => updateFormField(i, 'type', value)}
                          >
                            <SelectTrigger id={`field-type-${i}`}>
                              <SelectValue placeholder="Select field type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="tel">Phone</SelectItem>
                              <SelectItem value="textarea">Text Area</SelectItem>
                              <SelectItem value="select">Dropdown</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`field-placeholder-${i}`}>Placeholder Text</Label>
                          <Input
                            id={`field-placeholder-${i}`}
                            value={field.placeholder || ''}
                            onChange={(e) => updateFormField(i, 'placeholder', e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`field-required-${i}`}
                            checked={field.required || false}
                            onChange={(e) => updateFormField(i, 'required', e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                          />
                          <label htmlFor={`field-required-${i}`} className="text-sm text-slate-700">
                            Required field
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submit-button">Submit Button Text</Label>
                  <Input
                    id="submit-button"
                    value={(formSection.submitButton as string) || ''}
                    onChange={(e) => updateSectionField('form', 'submitButton', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-success">Success Message</Label>
                  <Textarea
                    id="form-success"
                    rows={2}
                    value={(formSection.successMessage as string) || ''}
                    onChange={(e) => updateSectionField('form', 'successMessage', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-error">Error Message</Label>
                  <Textarea
                    id="form-error"
                    rows={2}
                    value={(formSection.errorMessage as string) || ''}
                    onChange={(e) => updateSectionField('form', 'errorMessage', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    value={(formSection.notificationEmail as string) || ''}
                    onChange={(e) => updateSectionField('form', 'notificationEmail', e.target.value)}
                    placeholder="Email to receive form submissions"
                  />
                  <p className="text-xs text-slate-500">Form submissions will be sent to this email address</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Tab */}
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Edit the contact information displayed on the page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="info-title">Section Title</Label>
                  <Input
                    id="info-title"
                    value={(contactInfoSection.title as string) || ''}
                    onChange={(e) => updateSectionField('contact-info', 'title', e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Contact Information Items</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addContactInfoItem}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                      </Button>
                    </div>
                    {contactInfoItems.map((item, i) => (
                      <div key={i} className="rounded-md border border-slate-200 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Item {i + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeContactInfoItem(i)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`info-type-${i}`}>Type</Label>
                          <Select
                            value={item.type || 'text'}
                            onValueChange={(value) => updateContactInfoItem(i, 'type', value)}
                          >
                            <SelectTrigger id={`info-type-${i}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="address">Address</SelectItem>
                              <SelectItem value="text">Text</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`info-label-${i}`}>Label</Label>
                          <Input
                            id={`info-label-${i}`}
                            value={item.label || ''}
                            onChange={(e) => updateContactInfoItem(i, 'label', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`info-value-${i}`}>Value</Label>
                          <Input
                            id={`info-value-${i}`}
                            value={item.value || ''}
                            onChange={(e) => updateContactInfoItem(i, 'value', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`info-link-${i}`}>Link (optional)</Label>
                          <Input
                            id={`info-link-${i}`}
                            value={item.link || ''}
                            onChange={(e) => updateContactInfoItem(i, 'link', e.target.value)}
                            placeholder="mailto: or tel: or URL"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="office-hours-title">Office Hours Title</Label>
                  <Input
                    id="office-hours-title"
                    value={(officeHoursSection.title as string) || ''}
                    onChange={(e) => updateSectionField('office-hours', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office-hours-description">Office Hours Description</Label>
                  <Textarea
                    id="office-hours-description"
                    rows={2}
                    value={(officeHoursSection.description as string) || ''}
                    onChange={(e) => updateSectionField('office-hours', 'description', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Office Hours</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addOfficeHour}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Hour
                    </Button>
                  </div>
                  {officeHours.map((hour, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        value={hour || ''}
                        onChange={(e) => updateOfficeHours(i, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeOfficeHour(i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map Settings Tab */}
          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Map Settings</CardTitle>
                <CardDescription>
                  Configure the OpenStreetMap location and display settings for the contact page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="map-title">Map Section Title</Label>
                  <Input
                    id="map-title"
                    value={(mapSection.title as string) || ''}
                    onChange={(e) => updateSectionField('map', 'title', e.target.value)}
                    placeholder="Our Location"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="map-latitude">Latitude</Label>
                    <Input
                      id="map-latitude"
                      type="number"
                      step="any"
                      value={(mapSection.latitude as number) || 6.6}
                      onChange={(e) => updateSectionField('map', 'latitude', parseFloat(e.target.value) || 0)}
                      placeholder="6.6"
                    />
                    <p className="text-xs text-slate-500">Map marker latitude coordinate</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="map-longitude">Longitude</Label>
                    <Input
                      id="map-longitude"
                      type="number"
                      step="any"
                      value={(mapSection.longitude as number) || 3.505}
                      onChange={(e) => updateSectionField('map', 'longitude', parseFloat(e.target.value) || 0)}
                      placeholder="3.505"
                    />
                    <p className="text-xs text-slate-500">Map marker longitude coordinate</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="map-zoom">Zoom Level</Label>
                  <Input
                    id="map-zoom"
                    type="number"
                    min="1"
                    max="18"
                    value={(mapSection.zoom as number) || 15}
                    onChange={(e) => updateSectionField('map', 'zoom', parseInt(e.target.value) || 15)}
                    placeholder="15"
                  />
                  <p className="text-xs text-slate-500">Map zoom level (1-18, higher = more zoomed in)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="map-address">Address Display</Label>
                  <Textarea
                    id="map-address"
                    rows={2}
                    value={(mapSection.address as string) || ''}
                    onChange={(e) => updateSectionField('map', 'address', e.target.value)}
                    placeholder="10 Ukpor Street, Ishawo, Agric, Ikorodu, Lagos."
                  />
                  <p className="text-xs text-slate-500">Address text displayed below the map</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium mb-2">How to find coordinates:</p>
                  <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
                    <li>Visit <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenStreetMap.org</a></li>
                    <li>Search for your address or location</li>
                    <li>Right-click on the map and select "Show address"</li>
                    <li>Copy the latitude and longitude values from the URL or coordinates shown</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Section Tab */}
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>FAQ Section</CardTitle>
                <CardDescription>Edit the frequently asked questions section on the contact page</CardDescription>
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
