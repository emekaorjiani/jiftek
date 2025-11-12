import { Link, router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Search, Edit, Trash2, Eye, FileText, FileImage, Clock } from "lucide-react"
import AdminLayout from "@/layouts/admin/layout"
import { useState, FormEventHandler } from "react"

/**
 * InsightsContentPage - Admin page for managing insights content
 * 
 * Displays a list of blog posts, case studies, whitepapers, and webinars
 * with filtering, search, and CRUD operations.
 */
export default function InsightsContentPage({ 
  insights, 
  filters 
}: { 
  insights: any
  filters: { type: string; status: string; search: string }
}) {
  // Local state for search input
  const [searchQuery, setSearchQuery] = useState(filters.search || '')

  /**
   * Handle search input change with debounce
   */
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      router.get(route('admin.content.insights'), {
        ...filters,
        search: value,
      }, {
        preserveState: true,
        preserveScroll: true,
      })
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  /**
   * Handle filter changes
   */
  const handleFilterChange = (filterType: 'type' | 'status', value: string) => {
    router.get(route('admin.content.insights'), {
      ...filters,
      [filterType]: value,
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  /**
   * Handle delete action
   */
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this insight?')) {
      router.delete(route('admin.content.insights.destroy', id), {
        preserveScroll: true,
      })
    }
  }
  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Insights Content</h2>
          <p className="text-muted-foreground">Manage your blog posts, case studies, and resources</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={route('admin.content.insights.create')}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Post
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Manage and organize your insights content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Search content..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <Select 
              value={filters.type || 'all'} 
              onValueChange={(value) => handleFilterChange('type', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="blog">Blog Posts</SelectItem>
                <SelectItem value="case-study">Case Studies</SelectItem>
                <SelectItem value="whitepaper">Whitepapers</SelectItem>
                <SelectItem value="webinar">Webinars</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              value={filters.status || 'all'} 
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insights.data && insights.data.length > 0 ? (
                  insights.data.map((insight: any) => (
                    <TableRow key={insight.id}>
                      <TableCell className="font-medium">{insight.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {insight.type === "blog" ? (
                            <FileText className="h-4 w-4 text-blue-600" />
                          ) : insight.type === "case-study" ? (
                            <FileImage className="h-4 w-4 text-green-600" />
                          ) : insight.type === "whitepaper" ? (
                            <FileText className="h-4 w-4 text-amber-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-purple-600" />
                          )}
                          <span className="capitalize">{insight.type.replace("-", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>{insight.author}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            insight.status === "published"
                              ? "bg-green-100 text-green-800"
                              : insight.status === "draft"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {insight.status}
                        </span>
                      </TableCell>
                      <TableCell>{insight.published_at || insight.created_at}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={route('admin.content.insights.edit', insight.id)}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(insight.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No insights found. Create your first one!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {insights.links && insights.links.length > 3 && (
            <Pagination>
              <PaginationContent>
                {insights.links.map((link: any, index: number) => {
                  if (index === 0) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationPrevious 
                          href={link.url || '#'}
                          className={!link.url ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    )
                  }
                  if (index === insights.links.length - 1) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationNext 
                          href={link.url || '#'}
                          className={!link.url ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    )
                  }
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink 
                        href={link.url || '#'}
                        isActive={link.active}
                        className={!link.url ? 'pointer-events-none opacity-50' : ''}
                      >
                        {link.label.replace('&laquo;', '').replace('&raquo;', '').trim()}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  )
}

