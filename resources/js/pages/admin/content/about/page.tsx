import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2, Upload, MoveUp, MoveDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminLayout from "@/layouts/admin/layout"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useCallback } from "react"

/**
 * Value Item Interface
 */
interface ValueItem {
  title: string
  description: string
  icon?: string
}

/**
 * Milestone Item Interface
 */
interface MilestoneItem {
  year: string
  title: string
  description: string
}

/**
 * Team Member Interface
 */
interface TeamMember {
  name: string
  title: string
  bio: string
  image: string
  social?: {
    linkedin?: string
    twitter?: string
  }
}

/**
 * AboutContentPage - Admin page for managing about page content
 * 
 * Provides comprehensive form for managing all about page sections including
 * hero, mission, vision, values, journey, and team sections.
 */
export default function AboutContentPage({ page, sections }: { page?: Record<string, unknown>; sections?: Record<string, unknown> }) {
  // Initialize form with existing data or defaults
  const { data, setData, put, processing } = useForm<{ sections: Record<string, unknown> }>({
    sections: sections || {
      hero: {
        title: page?.sections?.hero?.title || "About Jiftek",
        subtitle: page?.sections?.hero?.subtitle || "Leading Technology Solutions Provider",
        description: page?.sections?.hero?.description || "We are a team of passionate technologists dedicated to helping businesses thrive in the digital age.",
        image: page?.sections?.hero?.image || "",
      },
      mission: {
        title: page?.sections?.mission?.title || "Our Mission",
        description: page?.sections?.mission?.description || "To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage.",
      },
      vision: {
        title: page?.sections?.vision?.title || "Our Vision",
        description: page?.sections?.vision?.description || "To be the trusted technology partner that helps organizations navigate digital transformation and achieve sustainable success.",
      },
      values: {
        title: page?.sections?.values?.title || "Our Values",
        items: page?.sections?.values?.items || [
          {
            title: "Innovation",
            description: "We continuously explore new technologies and methodologies to deliver cutting-edge solutions.",
            icon: "default",
          },
          {
            title: "Excellence",
            description: "We maintain the highest standards in everything we do, from code quality to client service.",
            icon: "award",
          },
          {
            title: "Integrity",
            description: "We build trust through transparency, honesty, and ethical business practices.",
            icon: "heart",
          },
          {
            title: "Collaboration",
            description: "We work closely with our clients as partners, ensuring alignment and shared success.",
            icon: "users",
          },
        ],
      },
      journey: {
        title: page?.sections?.journey?.title || "Our Journey",
        description: page?.sections?.journey?.description || "From our humble beginnings to where we are today.",
        milestones: page?.sections?.journey?.milestones || [],
      },
      team: {
        title: page?.sections?.team?.title || "Our Leadership Team",
        description: page?.sections?.team?.description || "Meet the experienced professionals guiding our company.",
        members: page?.sections?.team?.members || [],
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
   * Update a value item
   */
  const updateValueItem = useCallback((index: number, field: string, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const values = (sections.values as Record<string, unknown>) || {}
    const items = (values.items as ValueItem[]) || []
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setData('sections', {
      ...sections,
      values: {
        ...values,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Add a new value item
   */
  const addValueItem = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const values = (sections.values as Record<string, unknown>) || {}
    const items = (values.items as ValueItem[]) || []
    const newItem: ValueItem = {
      title: "New Value",
      description: "Enter value description here",
      icon: "default",
    }
    setData('sections', {
      ...sections,
      values: {
        ...values,
        items: [...items, newItem],
      },
    })
  }, [data.sections, setData])

  /**
   * Remove a value item
   */
  const removeValueItem = useCallback((index: number) => {
    const sections = data.sections as Record<string, unknown>
    const values = (sections.values as Record<string, unknown>) || {}
    const items = (values.items as ValueItem[]) || []
    const updatedItems = items.filter((_, i) => i !== index)
    setData('sections', {
      ...sections,
      values: {
        ...values,
        items: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Update a milestone item
   */
  const updateMilestoneItem = useCallback((index: number, field: string, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const journey = (sections.journey as Record<string, unknown>) || {}
    const milestones = (journey.milestones as MilestoneItem[]) || []
    const updatedItems = [...milestones]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setData('sections', {
      ...sections,
      journey: {
        ...journey,
        milestones: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Add a new milestone
   */
  const addMilestone = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const journey = (sections.journey as Record<string, unknown>) || {}
    const milestones = (journey.milestones as MilestoneItem[]) || []
    const newItem: MilestoneItem = {
      year: new Date().getFullYear().toString(),
      title: "New Milestone",
      description: "Enter milestone description here",
    }
    setData('sections', {
      ...sections,
      journey: {
        ...journey,
        milestones: [...milestones, newItem],
      },
    })
  }, [data.sections, setData])

  /**
   * Remove a milestone
   */
  const removeMilestone = useCallback((index: number) => {
    const sections = data.sections as Record<string, unknown>
    const journey = (sections.journey as Record<string, unknown>) || {}
    const milestones = (journey.milestones as MilestoneItem[]) || []
    const updatedItems = milestones.filter((_, i) => i !== index)
    setData('sections', {
      ...sections,
      journey: {
        ...journey,
        milestones: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Update a team member
   */
  const updateTeamMember = useCallback((index: number, field: string, value: string) => {
    const sections = data.sections as Record<string, unknown>
    const team = (sections.team as Record<string, unknown>) || {}
    const members = (team.members as TeamMember[]) || []
    const updatedItems = [...members]
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      updatedItems[index] = {
        ...updatedItems[index],
        [parent]: {
          ...(updatedItems[index][parent as keyof TeamMember] as Record<string, unknown> || {}),
          [child]: value,
        },
      } as TeamMember
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      }
    }
    setData('sections', {
      ...sections,
      team: {
        ...team,
        members: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Add a new team member
   */
  const addTeamMember = useCallback(() => {
    const sections = data.sections as Record<string, unknown>
    const team = (sections.team as Record<string, unknown>) || {}
    const members = (team.members as TeamMember[]) || []
    const newItem: TeamMember = {
      name: "New Team Member",
      title: "Title",
      bio: "Enter bio here",
      image: "",
      social: {
        linkedin: "",
        twitter: "",
      },
    }
    setData('sections', {
      ...sections,
      team: {
        ...team,
        members: [...members, newItem],
      },
    })
  }, [data.sections, setData])

  /**
   * Remove a team member
   */
  const removeTeamMember = useCallback((index: number) => {
    const sections = data.sections as Record<string, unknown>
    const team = (sections.team as Record<string, unknown>) || {}
    const members = (team.members as TeamMember[]) || []
    const updatedItems = members.filter((_, i) => i !== index)
    setData('sections', {
      ...sections,
      team: {
        ...team,
        members: updatedItems,
      },
    })
  }, [data.sections, setData])

  /**
   * Handle form submission
   */
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put(route('admin.content.about.update'), {
      preserveScroll: true,
    })
  }

  const heroSection = (data.sections as Record<string, unknown>)?.hero as Record<string, unknown> || {}
  const missionSection = (data.sections as Record<string, unknown>)?.mission as Record<string, unknown> || {}
  const visionSection = (data.sections as Record<string, unknown>)?.vision as Record<string, unknown> || {}
  const valuesSection = (data.sections as Record<string, unknown>)?.values as Record<string, unknown> || {}
  const journeySection = (data.sections as Record<string, unknown>)?.journey as Record<string, unknown> || {}
  const teamSection = (data.sections as Record<string, unknown>)?.team as Record<string, unknown> || {}
  const valuesItems = (valuesSection.items as ValueItem[]) || []
  const milestones = (journeySection.milestones as MilestoneItem[]) || []
  const teamMembers = (teamSection.members as TeamMember[]) || []

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">About Us Content</h2>
            <p className="text-muted-foreground">Manage your about page content and company information</p>
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
                  <Label htmlFor="hero-title">Title</Label>
                  <Input
                    id="hero-title"
                    value={(heroSection.title as string) || ''}
                    onChange={(e) => updateSectionField('hero', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtitle</Label>
                  <Input
                    id="hero-subtitle"
                    value={(heroSection.subtitle as string) || ''}
                    onChange={(e) => updateSectionField('hero', 'subtitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    rows={3}
                    value={(heroSection.description as string) || ''}
                    onChange={(e) => updateSectionField('hero', 'description', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-image">Hero Image URL</Label>
                  <Input
                    id="hero-image"
                    value={(heroSection.image as string) || ''}
                    onChange={(e) => updateSectionField('hero', 'image', e.target.value)}
                    placeholder="https://images.pexels.com/photos/..."
                  />
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
                  <Input
                    id="mission-title"
                    value={(missionSection.title as string) || ''}
                    onChange={(e) => updateSectionField('mission', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mission-statement">Mission Statement</Label>
                  <Textarea
                    id="mission-statement"
                    rows={4}
                    value={(missionSection.description as string) || ''}
                    onChange={(e) => updateSectionField('mission', 'description', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vision-title">Vision Title</Label>
                  <Input
                    id="vision-title"
                    value={(visionSection.title as string) || ''}
                    onChange={(e) => updateSectionField('vision', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vision-statement">Vision Statement</Label>
                  <Textarea
                    id="vision-statement"
                    rows={4}
                    value={(visionSection.description as string) || ''}
                    onChange={(e) => updateSectionField('vision', 'description', e.target.value)}
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
                  <Input
                    id="values-title"
                    value={(valuesSection.title as string) || ''}
                    onChange={(e) => updateSectionField('values', 'title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Values</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addValueItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Value
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {valuesItems.map((value, i) => (
                      <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Value {i + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeValueItem(i)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`value-title-${i}`}>Title</Label>
                          <Input
                            id={`value-title-${i}`}
                            value={value.title || ''}
                            onChange={(e) => updateValueItem(i, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`value-description-${i}`}>Description</Label>
                          <Textarea
                            id={`value-description-${i}`}
                            rows={2}
                            value={value.description || ''}
                            onChange={(e) => updateValueItem(i, 'description', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`value-icon-${i}`}>Icon</Label>
                          <Select
                            value={value.icon || 'default'}
                            onValueChange={(value) => updateValueItem(i, 'icon', value)}
                          >
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
                  <Input
                    id="journey-title"
                    value={(journeySection.title as string) || ''}
                    onChange={(e) => updateSectionField('journey', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="journey-description">Description</Label>
                  <Textarea
                    id="journey-description"
                    rows={3}
                    value={(journeySection.description as string) || ''}
                    onChange={(e) => updateSectionField('journey', 'description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Timeline Milestones</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Milestone
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {milestones.map((milestone, i) => (
                      <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Milestone {i + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeMilestone(i)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`milestone-year-${i}`}>Year</Label>
                          <Input
                            id={`milestone-year-${i}`}
                            value={milestone.year || ''}
                            onChange={(e) => updateMilestoneItem(i, 'year', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`milestone-title-${i}`}>Title</Label>
                          <Input
                            id={`milestone-title-${i}`}
                            value={milestone.title || ''}
                            onChange={(e) => updateMilestoneItem(i, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`milestone-description-${i}`}>Description</Label>
                          <Textarea
                            id={`milestone-description-${i}`}
                            rows={2}
                            value={milestone.description || ''}
                            onChange={(e) => updateMilestoneItem(i, 'description', e.target.value)}
                          />
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
                  <Input
                    id="team-title"
                    value={(teamSection.title as string) || ''}
                    onChange={(e) => updateSectionField('team', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-description">Description</Label>
                  <Textarea
                    id="team-description"
                    rows={3}
                    value={(teamSection.description as string) || ''}
                    onChange={(e) => updateSectionField('team', 'description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Team Members</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addTeamMember}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Team Member
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {teamMembers.map((member, i) => (
                      <div key={i} className="rounded-md border border-slate-200 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Team Member {i + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeTeamMember(i)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`member-name-${i}`}>Name</Label>
                          <Input
                            id={`member-name-${i}`}
                            value={member.name || ''}
                            onChange={(e) => updateTeamMember(i, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`member-title-${i}`}>Title</Label>
                          <Input
                            id={`member-title-${i}`}
                            value={member.title || ''}
                            onChange={(e) => updateTeamMember(i, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`member-bio-${i}`}>Bio</Label>
                          <Textarea
                            id={`member-bio-${i}`}
                            rows={3}
                            value={member.bio || ''}
                            onChange={(e) => updateTeamMember(i, 'bio', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`member-image-${i}`}>Profile Image URL</Label>
                          <Input
                            id={`member-image-${i}`}
                            value={member.image || ''}
                            onChange={(e) => updateTeamMember(i, 'image', e.target.value)}
                            placeholder="https://images.pexels.com/photos/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`member-linkedin-${i}`}>LinkedIn URL</Label>
                          <Input
                            id={`member-linkedin-${i}`}
                            value={(member.social?.linkedin as string) || ''}
                            onChange={(e) => updateTeamMember(i, 'social.linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`member-twitter-${i}`}>Twitter URL</Label>
                          <Input
                            id={`member-twitter-${i}`}
                            value={(member.social?.twitter as string) || ''}
                            onChange={(e) => updateTeamMember(i, 'social.twitter', e.target.value)}
                            placeholder="https://twitter.com/username"
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
