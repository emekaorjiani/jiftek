import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2, Upload, MoveUp, MoveDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AboutContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">About Us Content</h2>
          <p className="text-muted-foreground">Manage your about page content and company information</p>
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
          <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
          <TabsTrigger value="values">Core Values</TabsTrigger>
          <TabsTrigger value="journey">Our Journey</TabsTrigger>
          <TabsTrigger value="team">Leadership Team</TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Edit the main hero section content that appears at the top of the about page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-badge">Badge Text</Label>
                <Input id="hero-badge" defaultValue="Our Story" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-title">Heading</Label>
                <Input id="hero-title" defaultValue="Driving Innovation Through Technology" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  rows={3}
                  defaultValue="Founded in 2010, Jiftek has grown from a small tech consultancy to a leading provider of innovative technology solutions for businesses worldwide."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-image">Hero Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-40 rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500">
                    Image Preview
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mission & Vision Tab */}
        <TabsContent value="mission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mission & Vision</CardTitle>
              <CardDescription>Edit your company's mission and vision statements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mission-title">Mission Title</Label>
                <Input id="mission-title" defaultValue="Our Mission" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission-statement">Mission Statement</Label>
                <Textarea
                  id="mission-statement"
                  rows={4}
                  defaultValue="To empower organizations with innovative technology solutions that drive growth, efficiency, and competitive advantage. We are committed to delivering exceptional value through our expertise, integrity, and client-focused approach."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision-title">Vision Title</Label>
                <Input id="vision-title" defaultValue="Our Vision" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision-statement">Vision Statement</Label>
                <Textarea
                  id="vision-statement"
                  rows={4}
                  defaultValue="To be the most trusted technology partner for forward-thinking organizations, known for our innovation, excellence, and the transformative impact we create for our clients and communities."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Core Values Tab */}
        <TabsContent value="values" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Core Values</CardTitle>
              <CardDescription>Edit your company's core values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="values-title">Section Title</Label>
                <Input id="values-title" defaultValue="Our Core Values" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="values-description">Description</Label>
                <Textarea
                  id="values-description"
                  rows={3}
                  defaultValue="The principles that guide everything we do at Jiftek."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Values</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Value
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Excellence",
                      description:
                        "We strive for excellence in everything we do, from the solutions we develop to the service we provide.",
                    },
                    {
                      title: "Integrity",
                      description:
                        "We operate with honesty, transparency, and ethical standards in all our interactions.",
                    },
                    {
                      title: "Collaboration",
                      description:
                        "We believe in the power of teamwork and partnership to achieve extraordinary results.",
                    },
                    {
                      title: "Innovation",
                      description:
                        "We continuously explore new ideas and technologies to deliver cutting-edge solutions.",
                    },
                  ].map((value, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Value {i + 1}</h3>
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
                        <Label htmlFor={`value-title-${i}`}>Title</Label>
                        <Input id={`value-title-${i}`} defaultValue={value.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`value-description-${i}`}>Description</Label>
                        <Textarea id={`value-description-${i}`} rows={2} defaultValue={value.description} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`value-icon-${i}`}>Icon</Label>
                        <Select defaultValue="default">
                          <SelectTrigger id={`value-icon-${i}`}>
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="award">Award</SelectItem>
                            <SelectItem value="heart">Heart</SelectItem>
                            <SelectItem value="users">Users</SelectItem>
                            <SelectItem value="target">Target</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Value
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Our Journey Tab */}
        <TabsContent value="journey" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Our Journey</CardTitle>
              <CardDescription>Edit the company timeline and history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="journey-title">Section Title</Label>
                <Input id="journey-title" defaultValue="Our Journey" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="journey-description">Description</Label>
                <Textarea
                  id="journey-description"
                  rows={3}
                  defaultValue="From our humble beginnings to where we are today."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Timeline Milestones</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Milestone
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      year: "2010",
                      title: "Founded",
                      description:
                        "Jiftek was founded with a vision to provide innovative technology solutions to businesses.",
                    },
                    {
                      year: "2013",
                      title: "Expansion",
                      description:
                        "Expanded our team and opened our first international office to serve clients globally.",
                    },
                    {
                      year: "2016",
                      title: "Innovation Hub",
                      description:
                        "Launched our Innovation Hub to explore emerging technologies and develop cutting-edge solutions.",
                    },
                    {
                      year: "2019",
                      title: "Strategic Partnerships",
                      description:
                        "Formed strategic partnerships with leading technology providers to enhance our service offerings.",
                    },
                    {
                      year: "2022",
                      title: "Digital Transformation Focus",
                      description:
                        "Expanded our digital transformation practice to help clients navigate the rapidly evolving digital landscape.",
                    },
                    {
                      year: "Today",
                      title: "Global Impact",
                      description:
                        "Continuing to grow and innovate, serving clients across industries and geographies.",
                    },
                  ].map((milestone, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Milestone {i + 1}</h3>
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
                        <Label htmlFor={`milestone-year-${i}`}>Year</Label>
                        <Input id={`milestone-year-${i}`} defaultValue={milestone.year} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`milestone-title-${i}`}>Title</Label>
                        <Input id={`milestone-title-${i}`} defaultValue={milestone.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`milestone-description-${i}`}>Description</Label>
                        <Textarea id={`milestone-description-${i}`} rows={2} defaultValue={milestone.description} />
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Milestone
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leadership Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leadership Team</CardTitle>
              <CardDescription>Edit your company's leadership team profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team-title">Section Title</Label>
                <Input id="team-title" defaultValue="Our Leadership Team" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-description">Description</Label>
                <Textarea
                  id="team-description"
                  rows={3}
                  defaultValue="Meet the experienced professionals guiding our company."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Team Members</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Johnson",
                      title: "Chief Executive Officer",
                      bio: "With over 20 years of experience in technology leadership, Alex has led Jiftek from its founding to become an industry leader.",
                      image: "/placeholder.svg?height=300&width=300&text=CEO",
                    },
                    {
                      name: "Sarah Chen",
                      title: "Chief Technology Officer",
                      bio: "Sarah brings deep technical expertise and a passion for innovation, leading our technology strategy and development teams.",
                      image: "/placeholder.svg?height=300&width=300&text=CTO",
                    },
                    {
                      name: "Michael Rodriguez",
                      title: "Chief Operating Officer",
                      bio: "Michael ensures operational excellence across all aspects of our business, with a focus on client satisfaction and results.",
                      image: "/placeholder.svg?height=300&width=300&text=COO",
                    },
                  ].map((member, i) => (
                    <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Team Member {i + 1}</h3>
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
                        <Label htmlFor={`member-name-${i}`}>Name</Label>
                        <Input id={`member-name-${i}`} defaultValue={member.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`member-title-${i}`}>Title</Label>
                        <Input id={`member-title-${i}`} defaultValue={member.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`member-bio-${i}`}>Bio</Label>
                        <Textarea id={`member-bio-${i}`} rows={3} defaultValue={member.bio} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`member-image-${i}`}>Profile Image</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-24 w-24 rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500">
                            Image Preview
                          </div>
                          <Button variant="outline">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`member-social-${i}`}>Social Media Links</Label>
                        <div className="space-y-2">
                          <Input placeholder="LinkedIn URL" defaultValue="https://linkedin.com/in/username" />
                          <Input placeholder="Twitter URL" defaultValue="https://twitter.com/username" />
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Team Member
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
  )
}

