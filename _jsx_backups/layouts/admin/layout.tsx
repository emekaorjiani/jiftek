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
  Home,
  Briefcase,
  BookOpen,
  Mail,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AppShell } from '@/components/app-shell'
import { AppContent } from '@/components/app-content'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, useSidebar } from '@/components/ui/sidebar'
import { cn } from "@/lib/utils"
import { AppSidebarHeader } from "@/components/app-sidebar-header"

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
    href: '/admin/content',
    children: [
      {
        name: 'Home',
        href: '/admin/content/home',
        icon: Home,
        children: [
          { name: 'Hero', href: '/admin/content/home/hero', icon: Home },
          { name: 'Trusted', href: '/admin/content/home/trusted', icon: Home },
          { name: 'Solutions', href: '/admin/content/home/solutions', icon: Home },
          { name: 'Case Studies', href: '/admin/content/home/case-studies', icon: Home },
          { name: 'CTA', href: '/admin/content/home/cta', icon: Home },
        ]
      },
      { name: 'About Us', href: '/admin/content/about', icon: Users },
      { name: 'Solutions Page', href: '/admin/content/solutions', icon: Briefcase },
      { name: 'Solutions Management', href: '/admin/content/solutions/list', icon: Briefcase },
      { name: 'Services Page', href: '/admin/content/services', icon: Briefcase },
      { name: 'Services Management', href: '/admin/content/services/list', icon: Briefcase },
      { name: 'Team Members', href: '/admin/content/team-members', icon: Users },
      { name: 'Insights', href: '/admin/content/insights', icon: BookOpen },
      { name: 'Testimonials', href: '/admin/content/testimonials', icon: FileText },
      { name: 'Case Studies', href: '/admin/content/case-studies', icon: FileText },
      { name: 'Partners', href: '/admin/content/partners', icon: Briefcase },
      { name: 'Contact', href: '/admin/content/contact', icon: Mail },
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
  const path = typeof window !== 'undefined' ? window.location.pathname : ''
  return exact ? path === href : path.startsWith(href)
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { auth } = usePage<PageProps>().props
  if (!auth?.user) {
    router.visit('/login')
    return null
  }

  return (
    <AppShell variant="sidebar">
      <SidebarWithNav user={auth.user} />
      <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={[{ title: 'Admin', href: '/admin' }]} />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          {children}
        </div>
      </AppContent>
    </AppShell>
  )
}

function SidebarWithNav({ user }: { user: User }) {
  const { state: sidebarState } = useSidebar()
  const collapsed = sidebarState === 'collapsed'

  return (
    <Sidebar collapsible="icon" variant="inset" className="border-blue-200">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <img src="/logo.png" alt="Jiftek Logo" className="h-8 w-auto" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <details className="group [&[open]>summary]:bg-blue-800 dark:hover:bg-blue-800 dark:text-blue-200" open={item.children.some(child => isActive(child.href))}>
                    <summary className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-blue-500 transition-all hover:bg-blue-800",
                      item.children.some(child => isActive(child.href)) && "bg-blue-800"
                    )}>
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-blue-400 dark:text-blue-300 dark:hover:text-blue-200 hover:text-blue-200" />
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                      {!collapsed && <ChevronDown className="h-4 w-4 transition-transform group-[[open]]:rotate-180" />}
                    </summary>
                    <ul className={cn("mt-1 space-y-1", collapsed ? "pl-0" : "pl-8")}>
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-blue-500 transition-all hover:bg-blue-800",
                              isActive(child.href) && "bg-blue-800 dark:bg-blue-800 dark:text-blue-200 font-medium"
                            )}
                          >
                            {child.icon && <child.icon className="h-4 w-4 text-blue-400 dark:text-blue-300" />}
                            {!collapsed && <span>{child.name}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-blue-500 transition-all hover:bg-blue-800",
                      isActive(item.href, item.exact) && "bg-blue-800 font-medium dark:bg-blue-800 dark:text-blue-200"
                    )}
                  >
                    <item.icon className="h-5 w-5 text-blue-400" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-4 border-t border-blue-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 w-full justify-start text-blue-500">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-800 text-blue-200">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                  ) : (
                    <span className="text-sm font-medium text-blue-200">{user.initials}</span>
                  )}
                </div>
                {!collapsed && (
                  <>
                    <span className="hidden md:inline-flex">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/settings/profile" className="flex w-full text-blue-600">
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout" method="post" as="button" className="flex w-full items-center gap-2 text-blue-600">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
