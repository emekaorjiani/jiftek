import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2 } from "lucide-react"

export default function HomeContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Homepage Content</h2>
          <p className="text-muted-foreground">Manage your homepage content and sections</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
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
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Edit the main hero section content that appears at the top of the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-badge">Badge Text</Label>
                <Input id="hero-badge" defaultValue="Innovative Technology Solutions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-title">Heading</Label>
                <Input id="hero-title" defaultValue="Transforming Business Through Smart Technology" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  rows={3}
                  defaultValue="Jiftek delivers cutting-edge technology consulting and solutions that drive innovation, efficiency, and growth for forward-thinking organizations."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-button">Primary Button Text</Label>
                  <Input id="primary-button" defaultValue="Explore Solutions" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-button-link">Primary Button Link</Label>
                  <Input id="primary-button-link" defaultValue="/solutions" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="secondary-button">Secondary Button Text</Label>
                  <Input id="secondary-button" defaultValue="Request a Consultation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-button-link">Secondary Button Link</Label>
                  <Input id="secondary-button-link" defaultValue="/contact" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-image">Hero Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-40 rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500">
                    Image Preview
                  </div>
                  <Button variant="outline">Upload Image</Button>
                </div>
              </div>
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
  )
}

