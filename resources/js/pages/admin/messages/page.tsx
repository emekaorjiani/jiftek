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
import { Search, Eye, Trash2, Mail, MailOpen, Star, Clock } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
          <Button variant="outline">
            <MailOpen className="mr-2 h-4 w-4" />
            Mark as Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>View and manage messages from your website visitors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input placeholder="Search messages..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="starred">Starred</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                    />
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="w-[200px]">Sender</TableHead>
                  <TableHead className="w-[300px]">Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    sender: "John Doe",
                    email: "john.doe@example.com",
                    subject: "Cloud Services Inquiry",
                    message:
                      "I'm interested in learning more about your cloud migration services for our enterprise...",
                    date: "2023-06-15 09:45 AM",
                    status: "unread",
                    starred: true,
                  },
                  {
                    sender: "Sarah Williams",
                    email: "sarah.w@example.com",
                    subject: "Request for Proposal",
                    message:
                      "We are looking for a technology partner to help us with our digital transformation initiative...",
                    date: "2023-06-14 02:30 PM",
                    status: "unread",
                    starred: false,
                  },
                  {
                    sender: "Michael Brown",
                    email: "m.brown@example.com",
                    subject: "Consultation Request",
                    message:
                      "I would like to schedule a consultation to discuss how your services can help our healthcare organization...",
                    date: "2023-06-13 11:15 AM",
                    status: "read",
                    starred: false,
                  },
                  {
                    sender: "Jennifer Lee",
                    email: "jennifer@example.com",
                    subject: "Partnership Opportunity",
                    message:
                      "Our company is interested in exploring partnership opportunities with Jiftek in the AI space...",
                    date: "2023-06-12 04:20 PM",
                    status: "read",
                    starred: true,
                  },
                  {
                    sender: "Robert Johnson",
                    email: "robert.j@example.com",
                    subject: "Software Development Project",
                    message:
                      "We need assistance with a custom software development project for our logistics operations...",
                    date: "2023-06-10 10:00 AM",
                    status: "read",
                    starred: false,
                  },
                ].map((message, i) => (
                  <TableRow key={i} className={message.status === "unread" ? "bg-blue-50" : ""}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {message.status === "unread" ? (
                          <Mail className="h-4 w-4 text-blue-600" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-slate-400" />
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className={message.starred ? "text-yellow-500" : "text-slate-300"}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{message.sender}</div>
                      <div className="text-xs text-slate-500">{message.email}</div>
                    </TableCell>
                    <TableCell className="font-medium">{message.subject}</TableCell>
                    <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {message.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
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
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
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

