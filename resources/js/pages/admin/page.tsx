import Link from "next/link"
import {
  Users,
  FileEdit,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  ArrowRight,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Admin User</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>View Website</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +8.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Updates</CardTitle>
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <TrendingDown className="mr-1 h-3 w-3" />
                -4.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +3
              </span>{" "}
              since yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and activities on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Homepage hero section updated",
                  description: "Admin User updated the homepage hero section content",
                  time: "2 hours ago",
                  type: "content",
                },
                {
                  title: "New contact form submission",
                  description: "John Doe submitted a contact form about Cloud Services",
                  time: "5 hours ago",
                  type: "message",
                },
                {
                  title: "New blog post published",
                  description: "The Future of AI in Business was published in Insights",
                  time: "Yesterday",
                  type: "content",
                },
                {
                  title: "Team member updated",
                  description: "Sarah Chen's profile was updated on the About page",
                  time: "2 days ago",
                  type: "content",
                },
                {
                  title: "Company phone number updated",
                  description: "The primary contact phone number was updated in settings",
                  time: "3 days ago",
                  type: "settings",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === "content"
                        ? "bg-blue-100"
                        : activity.type === "message"
                          ? "bg-green-100"
                          : "bg-amber-100"
                    }`}
                  >
                    {activity.type === "content" ? (
                      <FileEdit
                        className={`h-4 w-4 ${
                          activity.type === "content"
                            ? "text-blue-600"
                            : activity.type === "message"
                              ? "text-green-600"
                              : "text-amber-600"
                        }`}
                      />
                    ) : activity.type === "message" ? (
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    ) : (
                      <Settings className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center pt-2">
                      <Clock className="mr-1 h-3 w-3 text-slate-500" />
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/admin/content/home">
                <Button variant="outline" className="w-full justify-between">
                  Edit Homepage
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/content/insights/new">
                <Button variant="outline" className="w-full justify-between">
                  Add New Blog Post
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/messages">
                <Button variant="outline" className="w-full justify-between">
                  View New Messages
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full justify-between">
                  Update Company Info
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="outline" className="w-full justify-between">
                  Manage Users
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

