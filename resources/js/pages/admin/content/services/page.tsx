import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2, MoveUp, MoveDown } from "lucide-react"
import AdminLayout from "@/layouts/admin/layout"

export default function ServicesContentPage() {
  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Services Content</h2>
          <p className="text-muted-foreground">Manage your services page content and offerings</p>
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
                <Input id="services-title" defaultValue="Our Services" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services-description">Description</Label>
                <Textarea
                  id="services-description"
                  rows={3}
                  defaultValue="Comprehensive technology solutions tailored to your business needs. We help you innovate, transform, and grow."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services-background">Background Style</Label>
                <Select defaultValue="gradient">
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
              <div className="space-y-2">
                <Label htmlFor="services-overview-title">Section Title</Label>
                <Input id="services-overview-title" defaultValue="Our Core Services" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services-overview-description">Description</Label>
                <Textarea
                  id="services-overview-description"
                  rows={3}
                  defaultValue="Comprehensive solutions designed to address your most complex technology challenges."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Service Offerings</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Custom Software Development",
                      description:
                        "Tailor-made software solutions designed to address your unique business challenges and requirements.",
                      features: ["Web Applications", "Mobile Apps", "Enterprise Software", "API Development"],
                    },
                    {
                      title: "Cloud Services",
                      description:
                        "Secure, scalable cloud infrastructure and migration services to modernize your IT environment.",
                      features: [
                        "Cloud Migration",
                        "Infrastructure as Code",
                        "Managed Cloud Services",
                        "Cloud Security",
                      ],
                    },
                    {
                      title: "Data Analytics & AI",
                      description:
                        "Transform your data into actionable insights with our advanced analytics and AI solutions.",
                      features: [
                        "Business Intelligence",
                        "Predictive Analytics",
                        "Machine Learning",
                        "Data Visualization",
                      ],
                    },
                  ].map((service, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Service {i + 1}</h3>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <MoveUp className="h-4 w-4" />
                            <span className="sr-only">Move Up</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoveDown className="h-4 w-4" />
                            <span className="sr-only">Move Down</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`service-title-${i}`}>Title</Label>
                        <Input id={`service-title-${i}`} defaultValue={service.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`service-description-${i}`}>Description</Label>
                        <Textarea id={`service-description-${i}`} rows={2} defaultValue={service.description} />
                      </div>
                      <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="space-y-2">
                          {service.features.map((feature, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <Input id={`service-feature-${i}-${j}`} defaultValue={feature} />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="mt-2">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Feature
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`service-icon-${i}`}>Icon</Label>
                        <Select defaultValue="default">
                          <SelectTrigger id={`service-icon-${i}`}>
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="code">Code</SelectItem>
                            <SelectItem value="cloud">Cloud</SelectItem>
                            <SelectItem value="database">Database</SelectItem>
                            <SelectItem value="shield">Shield</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Service
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                <Input id="process-title" defaultValue="Our Service Process" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="process-description">Description</Label>
                <Textarea
                  id="process-description"
                  rows={3}
                  defaultValue="A structured approach to delivering exceptional results for your business."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Process Steps</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Step
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      step: "01",
                      title: "Discovery",
                      description:
                        "We begin by understanding your business, challenges, and goals to define the scope of work.",
                    },
                    {
                      step: "02",
                      title: "Strategy",
                      description:
                        "Our team develops a comprehensive strategy and roadmap tailored to your specific needs.",
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
                  ].map((step, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Step {i + 1}</h3>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <MoveUp className="h-4 w-4" />
                            <span className="sr-only">Move Up</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoveDown className="h-4 w-4" />
                            <span className="sr-only">Move Down</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`step-number-${i}`}>Step Number</Label>
                        <Input id={`step-number-${i}`} defaultValue={step.step} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`step-title-${i}`}>Title</Label>
                        <Input id={`step-title-${i}`} defaultValue={step.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`step-description-${i}`}>Description</Label>
                        <Textarea id={`step-description-${i}`} rows={2} defaultValue={step.description} />
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Step
                        </Button>
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
                <Input id="faq-title" defaultValue="Frequently Asked Questions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq-description">Description</Label>
                <Textarea
                  id="faq-description"
                  rows={3}
                  defaultValue="Find answers to common questions about our services."
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
                      question: "How long does a typical project take?",
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
                    {
                      question: "Can you work with our existing systems and technologies?",
                      answer:
                        "Absolutely. We specialize in integrating with existing systems and technologies. Our team has experience working with a wide range of platforms, databases, and legacy systems to ensure seamless integration and data flow.",
                    },
                  ].map((faq, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">FAQ {i + 1}</h3>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <MoveUp className="h-4 w-4" />
                            <span className="sr-only">Move Up</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoveDown className="h-4 w-4" />
                            <span className="sr-only">Move Down</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`faq-question-${i}`}>Question</Label>
                        <Input id={`faq-question-${i}`} defaultValue={faq.question} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`faq-answer-${i}`}>Answer</Label>
                        <Textarea id={`faq-answer-${i}`} rows={4} defaultValue={faq.answer} />
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove FAQ
                        </Button>
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
    </AdminLayout>
  )
}

