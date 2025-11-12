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
import { Plus, Search, Edit, Trash2, Eye, Image as ImageIcon } from "lucide-react"
import AdminLayout from "@/layouts/admin/layout"
import { useState } from "react"

/**
 * TestimonialsListPage - Admin page for managing testimonials/case studies
 * 
 * Displays a list of all testimonials with filtering, search, and CRUD operations.
 * Testimonials can be created, edited, and deleted from this interface.
 */
export default function TestimonialsListPage({ 
  testimonials, 
  filters,
  industries
}: { 
  testimonials: any
  filters: { status: string; industry: string; search: string }
  industries: string[]
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
      router.get(route('admin.content.testimonials'), {
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
  const handleFilterChange = (filterType: string, value: string) => {
    router.get(route('admin.content.testimonials'), {
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
    if (confirm('Are you sure you want to delete this testimonial?')) {
      router.delete(route('admin.content.testimonials.destroy', id), {
        preserveScroll: true,
      })
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Testimonials & Case Studies</h2>
            <p className="text-muted-foreground">Manage client success stories and case studies</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={route('admin.content.testimonials.create')}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Testimonial
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
            <CardDescription>Manage and organize your client success stories</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search testimonials..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-full md:w-[200px]">
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active Only</SelectItem>
                      <SelectItem value="inactive">Inactive Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-[200px]">
                  <Select value={filters.industry} onValueChange={(value) => handleFilterChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Testimonials Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead className="w-[100px]">Order</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[150px]">Created</TableHead>
                    <TableHead className="w-[200px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.data && testimonials.data.length > 0 ? (
                    testimonials.data.map((testimonial: any) => (
                      <TableRow key={testimonial.id}>
                        <TableCell>
                          {testimonial.image ? (
                            <div className="relative h-12 w-12 overflow-hidden rounded-md">
                              <img
                                src={testimonial.image}
                                alt={testimonial.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  target.parentElement!.innerHTML = '<div class="flex h-12 w-12 items-center justify-center rounded-md bg-muted"><ImageIcon class="h-4 w-4 text-muted-foreground" /></div>'
                                }}
                              />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{testimonial.title}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {testimonial.client_name || 'N/A'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {testimonial.client_industry || 'N/A'}
                        </TableCell>
                        <TableCell>{testimonial.order}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              testimonial.is_active
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                            }`}
                          >
                            {testimonial.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {testimonial.created_at}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/testimonials/${testimonial.slug}`} target="_blank">
                              <Button variant="ghost" size="icon" title="View">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={route('admin.content.testimonials.edit', testimonial.id)}>
                              <Button variant="ghost" size="icon" title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDelete(testimonial.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No testimonials found. Create your first testimonial to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {testimonials.links && testimonials.links.length > 3 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    {testimonials.links.map((link: any, index: number) => {
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
                      if (index === testimonials.links.length - 1) {
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
                            {link.label.replace(/[^0-9]/g, '') || index}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

