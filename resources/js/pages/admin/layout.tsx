import type React from "react"
import { Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import {
  LayoutDashboard,
  FileEdit,
  Settings,
  Users,
  BarChart,
  MessageSquare,
  LogOut,
  ChevronDown,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// This would normally check a real auth session
const checkAuth = () => {
  // Mock authentication check - in a real app, this would verify the user session
  return true
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, this would redirect unauthenticated users
  if (!checkAuth()) {
    router.visit('/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/admin" className="flex items-center gap-2">
              <div className="rounded-md bg-blue-600 p-1">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Jiftek Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                    <span className="text-sm font-medium">AJ</span>
                  </div>
                  <span className="hidden md:inline-flex">Admin User</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/admin/settings/profile" className="flex w-full">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/login" className="flex w-full items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                >
                  <LayoutDashboard className="h-5 w-5 text-slate-500" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <details className="group [&[open]>summary]:bg-slate-100">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                    <div className="flex items-center gap-3">
                      <FileEdit className="h-5 w-5 text-slate-500" />
                      <span>Content</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform group-[[open]]:rotate-180" />
                  </summary>
                  <ul className="mt-1 space-y-1 pl-8">
                    <li>
                      <Link
                        href="/admin/content/home"
                        className="block rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                      >
                        Homepage
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/content/services"
                        className="block rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/content/about"
                        className="block rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/content/insights"
                        className="block rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                      >
                        Insights
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/content/contact"
                        className="block rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                >
                  <Users className="h-5 w-5 text-slate-500" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                >
                  <BarChart className="h-5 w-5 text-slate-500" />
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/messages"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                >
                  <MessageSquare className="h-5 w-5 text-slate-500" />
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100"
                >
                  <Settings className="h-5 w-5 text-slate-500" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

