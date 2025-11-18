import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Save, Upload, ArrowLeft } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function NewInsightPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/content/insights">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Create New Content</h2>
            <p className="text-muted-foreground">Add a new blog post, case study, or resource</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>Enter the main content information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter content title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt/Summary</Label>
                <Textarea id="excerpt" placeholder="Enter a brief summary" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <div className="border rounded-md p-4 min-h-[300px] bg-white">
                  <p className="text-slate-500">Rich Text Editor Goes Here</p>
                  {/* In a real implementation, this would be a rich text editor component */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your content for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input id="seo-title" placeholder="Enter SEO title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-description">Meta Description</Label>
                <Textarea id="seo-description" placeholder="Enter meta description" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-keywords">Keywords (comma separated)</Label>
                <Input id="seo-keywords" placeholder="Enter keywords" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" placeholder="enter-url-slug" />
                <p className="text-xs text-slate-500">Example: https://jiftek.com/insights/enter-url-slug</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
              <CardDescription>Configure content settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select defaultValue="blog">
                  <SelectTrigger id="content-type">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                    <SelectItem value="whitepaper">Whitepaper</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Select defaultValue="sarah-chen">
                  <SelectTrigger id="author">
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex-johnson">Alex Johnson</SelectItem>
                    <SelectItem value="sarah-chen">Sarah Chen</SelectItem>
                    <SelectItem value="michael-rodriguez">Michael Rodriguez</SelectItem>
                    <SelectItem value="emily-patel">Emily Patel</SelectItem>
                    <SelectItem value="david-kim">David Kim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="artificial-intelligence">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="digital-transformation">Digital Transformation</SelectItem>
                    <SelectItem value="software-development">Software Development</SelectItem>
                    <SelectItem value="data-analytics">Data Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="Enter tags" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publish-date">Publish Date</Label>
                <Input id="publish-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>Upload a featured image for this content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-slate-200 p-6 text-center">
                <div className="rounded-md bg-slate-100 p-2">
                  <Upload className="h-6 w-6 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Drag and drop an image</p>
                  <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
                </div>
                <Button variant="outline" size="sm">
                  Select Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

