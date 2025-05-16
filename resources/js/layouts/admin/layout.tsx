import type React from "react"
import { Link, router, usePage } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"
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
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

interface User {
  name: string
  email: string
  avatar?: string
  initials: string
}

interface PageProps extends InertiaPageProps {
  auth: {
    user: User
  }
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { auth } = usePage<PageProps>().props
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // In a real app, this would redirect unauthenticated users
  if (!auth?.user) {
    router.visit('/login')
    return null
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true
    },
    {
      name: 'Content',
      icon: FileEdit,
      children: [
        { name: 'Homepage', href: '/admin/content/home' },
        { name: 'Services', href: '/admin/content/services' },
        { name: 'About Us', href: '/admin/content/about' },
        { name: 'Insights', href: '/admin/content/insights' },
        { name: 'Contact', href: '/admin/content/contact' },
      ]
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: MessageSquare
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ]

  const isActive = (href: string, exact: boolean = false) => {
    const path = window.location.pathname
    return exact ? path === href : path.startsWith(href)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
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
                    {auth.user.avatar ? (
                      <img
                        src={auth.user.avatar}
                        alt={auth.user.name}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <span className="text-sm font-medium">{auth.user.initials}</span>
                    )}
                  </div>
                  <span className="hidden md:inline-flex">{auth.user.name}</span>
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
                  <Link href="/logout" method="post" as="button" className="flex w-full items-center gap-2">
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
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  {item.children ? (
                    <details className="group [&[open]>summary]:bg-slate-100">
                      <summary className={cn(
                        "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100",
                        isActive(item.href || '') && "bg-slate-100"
                      )}>
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-slate-500" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform group-[[open]]:rotate-180" />
                      </summary>
                      <ul className="mt-1 space-y-1 pl-8">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100",
                                isActive(child.href) && "bg-slate-100 font-medium"
                              )}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100",
                        isActive(item.href, item.exact) && "bg-slate-100 font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5 text-slate-500" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

