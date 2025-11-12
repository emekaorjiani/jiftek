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
import { Plus, Search, Edit, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react"
import AdminLayout from "@/layouts/admin/layout"
import { useState } from "react"

/**
 * PartnersListPage - Admin page for managing partners/company logos
 * 
 * Displays a list of all partners with filtering, search, and CRUD operations.
 * Partners can be created, edited, and deleted from this interface.
 */
export default function PartnersListPage({ 
  partners, 
  filters 
}: { 
  partners: any
  filters: { status: string; search: string }
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
      router.get(route('admin.content.partners'), {
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
  const handleFilterChange = (value: string) => {
    router.get(route('admin.content.partners'), {
      ...filters,
      status: value,
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  /**
   * Handle delete action
   */
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      router.delete(route('admin.content.partners.destroy', id), {
        preserveScroll: true,
      })
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Partners & Company Logos</h2>
            <p className="text-muted-foreground">Manage company logos displayed on the homepage</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={route('admin.content.partners.create')}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Partner
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Partners</CardTitle>
            <CardDescription>Manage and organize company logos for the "Trusted By" section</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search partners..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="w-full md:w-[200px]">
                <Select value={filters.status} onValueChange={handleFilterChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Partners</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Partners Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Logo</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead className="w-[100px]">Order</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[150px]">Created</TableHead>
                    <TableHead className="w-[200px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.data && partners.data.length > 0 ? (
                    partners.data.map((partner: any) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          {partner.logo ? (
                            <div className="relative h-16 w-32 overflow-hidden rounded-md border bg-white p-2 flex items-center justify-center">
                              <img
                                src={partner.logo}
                                alt={partner.name}
                                className="max-h-full max-w-full object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  target.parentElement!.innerHTML = '<div class="flex h-16 w-32 items-center justify-center rounded-md bg-muted"><ImageIcon class="h-4 w-4 text-muted-foreground" /></div>'
                                }}
                              />
                            </div>
                          ) : (
                            <div className="flex h-16 w-32 items-center justify-center rounded-md bg-muted">
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>
                          {partner.website ? (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                            >
                              {partner.website}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-sm text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>{partner.order}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              partner.is_active
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                            }`}
                          >
                            {partner.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {partner.created_at}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={route('admin.content.partners.edit', partner.id)}>
                              <Button variant="ghost" size="icon" title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDelete(partner.id)}
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
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No partners found. Create your first partner to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {partners.links && partners.links.length > 3 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    {partners.links.map((link: any, index: number) => {
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
                      if (index === partners.links.length - 1) {
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

