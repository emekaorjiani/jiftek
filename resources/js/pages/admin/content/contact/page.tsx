import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contact Page Content</h2>
          <p className="text-muted-foreground">Manage your contact page content and form settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="form">Contact Form</TabsTrigger>
          <TabsTrigger value="info">Contact Info</TabsTrigger>
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
                <Input id="contact-title" defaultValue="Contact Us" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-description">Description</Label>
                <Textarea
                  id="contact-description"
                  rows={3}
                  defaultValue="Have questions or ready to start your next project? Get in touch with our team."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-background">Background Style</Label>
                <Select defaultValue="gradient">
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
                <Input id="form-title" defaultValue="Get in Touch" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="form-description">Form Description</Label>
                <Textarea
                  id="form-description"
                  rows={3}
                  defaultValue="Fill out the form below and our team will get back to you within 24 hours."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Form Fields</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Field
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "First name", type: "text", required: true, placeholder: "Enter your first name" },
                    { label: "Last name", type: "text", required: true, placeholder: "Enter your last name" },
                    { label: "Email", type: "email", required: true, placeholder: "Enter your email" },
                    { label: "Phone", type: "tel", required: false, placeholder: "Enter your phone number" },
                    { label: "Company", type: "text", required: false, placeholder: "Enter your company name" },
                    { label: "Subject", type: "text", required: true, placeholder: "Enter the subject" },
                    { label: "Message", type: "textarea", required: true, placeholder: "Enter your message" },
                  ].map((field, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Field {i + 1}</h3>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-label-${i}`}>Field Label</Label>
                        <Input id={`field-label-${i}`} defaultValue={field.label} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-type-${i}`}>Field Type</Label>
                        <Select defaultValue={field.type}>
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
                        <Input id={`field-placeholder-${i}`} defaultValue={field.placeholder} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`field-required-${i}`}
                          defaultChecked={field.required}
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
                <Input id="submit-button" defaultValue="Send Message" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="form-success">Success Message</Label>
                <Textarea
                  id="form-success"
                  rows={2}
                  defaultValue="Thank you for your message! We'll get back to you shortly."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="form-error">Error Message</Label>
                <Textarea
                  id="form-error"
                  rows={2}
                  defaultValue="There was an error submitting your message. Please try again."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  defaultValue="info@jiftek.com"
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
                <Input id="info-title" defaultValue="Contact Information" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="info-description">Description</Label>
                <Textarea
                  id="info-description"
                  rows={3}
                  defaultValue="Reach out to us directly using the information below."
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Phone Information</Label>
                  <div className="rounded-md border border-slate-200 p-4 space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input id="phone-number" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-hours">Hours</Label>
                      <Input id="phone-hours" defaultValue="Mon-Fri, 9am-5pm EST" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Information</Label>
                  <div className="rounded-md border border-slate-200 p-4 space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="email-address">Email Address</Label>
                      <Input id="email-address" defaultValue="info@jiftek.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-note">Note</Label>
                      <Input id="email-note" defaultValue="We'll respond within 24 hours" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Office Address</Label>
                  <div className="rounded-md border border-slate-200 p-4 space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="address-title">Location Title</Label>
                      <Input id="address-title" defaultValue="Headquarters" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-line1">Address Line 1</Label>
                      <Input id="address-line1" defaultValue="123 Tech Plaza" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-line2">Address Line 2</Label>
                      <Input id="address-line2" defaultValue="Suite 400" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="address-city">City</Label>
                        <Input id="address-city" defaultValue="San Francisco" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address-state">State</Label>
                        <Input id="address-state" defaultValue="CA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address-zip">Zip Code</Label>
                        <Input id="address-zip" defaultValue="94105" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Business Hours</Label>
                  <div className="rounded-md border border-slate-200 p-4 space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="hours-title">Title</Label>
                      <Input id="hours-title" defaultValue="Business Hours" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hours-weekday">Weekday Hours</Label>
                      <Input id="hours-weekday" defaultValue="Monday-Friday: 9am-5pm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hours-weekend">Weekend Hours</Label>
                      <Input id="hours-weekend" defaultValue="Saturday-Sunday: Closed" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="map-image">Map Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-40 rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500">
                    Map Preview
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Map Image
                  </Button>
                </div>
                <p className="text-xs text-slate-500">Or use an embedded map from Google Maps</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="map-embed">Google Maps Embed Code</Label>
                <Textarea id="map-embed" rows={3} placeholder="Paste Google Maps embed code here" />
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
                <Input id="faq-title" defaultValue="Frequently Asked Questions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq-description">Description</Label>
                <Textarea
                  id="faq-description"
                  rows={3}
                  defaultValue="Find answers to common questions about working with us."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>FAQ Items</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add FAQ
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      question: "What types of businesses do you work with?",
                      answer:
                        "We work with businesses of all sizes across various industries, including finance, healthcare, retail, manufacturing, and technology. Our solutions are tailored to meet the specific needs of each client.",
                    },
                    {
                      question: "How long does it take to complete a project?",
                      answer:
                        "Project timelines vary based on scope and complexity. A small project might take 4-8 weeks, while larger enterprise solutions can take 3-6 months or more. During our initial consultation, we'll provide a detailed timeline based on your specific requirements.",
                    },
                    {
                      question: "Do you offer ongoing support after project completion?",
                      answer:
                        "Yes, we offer comprehensive support and maintenance packages to ensure your solution continues to perform optimally. Our support includes regular updates, security patches, performance monitoring, and technical assistance.",
                    },
                    {
                      question: "How do you ensure the security of our data?",
                      answer:
                        "Security is built into every solution we develop. We implement industry best practices, conduct regular security audits, use encryption for sensitive data, and ensure compliance with relevant regulations. Our team stays updated on the latest security threats and mitigation strategies.",
                    },
                  ].map((faq, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">FAQ {i + 1}</h3>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`faq-question-${i}`}>Question</Label>
                        <Input id={`faq-question-${i}`} defaultValue={faq.question} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`faq-answer-${i}`}>Answer</Label>
                        <Textarea id={`faq-answer-${i}`} rows={4} defaultValue={faq.answer} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

