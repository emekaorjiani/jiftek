import { Link } from "@inertiajs/react"
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

export default function InsightsContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Insights Content</h2>
          <p className="text-muted-foreground">Manage your blog posts, case studies, and resources</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/content/insights/new">
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
              <Input placeholder="Search content..." className="pl-8" />
            </div>
            <Select defaultValue="all">
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
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
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
                {[
                  {
                    title: "The Future of AI in Business",
                    type: "blog",
                    author: "Sarah Chen",
                    status: "published",
                    date: "2023-06-15",
                  },
                  {
                    title: "Cloud Migration Strategies for Enterprise",
                    type: "blog",
                    author: "Michael Rodriguez",
                    status: "published",
                    date: "2023-05-22",
                  },
                  {
                    title: "Digital Transformation for Financial Services",
                    type: "case-study",
                    author: "Alex Johnson",
                    status: "published",
                    date: "2023-04-10",
                  },
                  {
                    title: "Healthcare Innovation with AI",
                    type: "case-study",
                    author: "Emily Patel",
                    status: "published",
                    date: "2023-03-28",
                  },
                  {
                    title: "Cybersecurity Best Practices 2023",
                    type: "whitepaper",
                    author: "David Kim",
                    status: "draft",
                    date: "2023-06-01",
                  },
                  {
                    title: "The Impact of 5G on IoT Development",
                    type: "blog",
                    author: "Lisa Thompson",
                    status: "draft",
                    date: "2023-06-05",
                  },
                  {
                    title: "Emerging Tech Trends for 2024",
                    type: "webinar",
                    author: "Alex Johnson",
                    status: "scheduled",
                    date: "2023-07-15",
                  },
                ].map((content, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{content.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {content.type === "blog" ? (
                          <FileText className="h-4 w-4 text-blue-600" />
                        ) : content.type === "case-study" ? (
                          <FileImage className="h-4 w-4 text-green-600" />
                        ) : content.type === "whitepaper" ? (
                          <FileText className="h-4 w-4 text-amber-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-purple-600" />
                        )}
                        <span className="capitalize">{content.type.replace("-", " ")}</span>
                      </div>
                    </TableCell>
                    <TableCell>{content.author}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          content.status === "published"
                            ? "bg-green-100 text-green-800"
                            : content.status === "draft"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {content.status}
                      </span>
                    </TableCell>
                    <TableCell>{content.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  )
}

