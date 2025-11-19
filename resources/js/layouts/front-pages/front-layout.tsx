import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { ReactNode } from "react"
import { ToastContainer } from "@/components/toast"

interface FrontLayoutProps {
  children: ReactNode
}

export default function FrontLayout({ children }: FrontLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      {/* Header - Modern Dark Design */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-600/40 bg-slate-800/60 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-800/60">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>
        
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 max-w-7xl relative z-10">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Jiftek Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-cyan-400 group-hover:to-indigo-400 transition-all">
                Jiftek Digital Solutions
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-1 items-center">
            <Link 
              href="/about" 
              className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/solutions"
              className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 group"
            >
              Solutions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/services"
              className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/insights"
              className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 group"
            >
              Insights
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/contact" 
              className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/contact">
              <Button className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer px-6 py-2.5 font-semibold">
                Contact Us
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-white hover:bg-slate-800/50 cursor-pointer border border-slate-800/50">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-none sm:max-w-[400px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-slate-800/50 p-0 flex flex-col h-full backdrop-blur-xl"
              >
                <SheetHeader className="p-6 border-b border-slate-800/50">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group" onClick={() => document.querySelector('[data-slot="sheet-close"]')?.click()}>
                      <img
                        src="/logo.png"
                        alt="Jiftek Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                      <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Jiftek
                      </span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800/50 border border-slate-800/50">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>

                {/* Navigation Links */}
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className="block py-4 px-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-800/30 rounded-lg transition-all duration-200 active:scale-95 border border-transparent hover:border-slate-700/50"
                    >
                      About Us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/solutions"
                      className="block py-4 px-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-800/30 rounded-lg transition-all duration-200 active:scale-95 border border-transparent hover:border-slate-700/50"
                    >
                      Solutions
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/services"
                      className="block py-4 px-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-800/30 rounded-lg transition-all duration-200 active:scale-95 border border-transparent hover:border-slate-700/50"
                    >
                      Services
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/insights"
                      className="block py-4 px-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-800/30 rounded-lg transition-all duration-200 active:scale-95 border border-transparent hover:border-slate-700/50"
                    >
                      Insights
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className="block py-4 px-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-800/30 rounded-lg transition-all duration-200 active:scale-95 border border-transparent hover:border-slate-700/50"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>

                {/* CTA Button */}
                <div className="p-6 border-t border-slate-800/50">
                  <SheetClose asChild>
                    <Link href="/contact" className="block w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 text-lg py-6 font-semibold">
                        Contact Us
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-700 bg-gray-800 dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-4 max-w-7xl mx-auto">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Jiftek Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="text-xl font-bold tracking-tight text-gray-200">Jiftek Digital Solutions</span>
              </Link>
              <p className="text-sm text-gray-400">
                Delivering innovative technology solutions that drive business transformation and growth.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-gray-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.093 4.093 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.615 11.615 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-200">Solutions</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/solutions" className="text-sm text-gray-200 hover:text-slate-900">
                      Digital Transformation
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions" className="text-sm text-gray-200 hover:text-slate-900">
                      Cloud Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-sm text-gray-200 hover:text-slate-900">
                      Custom Software
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions" className="text-sm text-gray-200 hover:text-slate-900">
                      Data Analytics
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-200">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-sm text-gray-200 hover:text-slate-900">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-gray-200 hover:text-slate-900">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-sm text-gray-200 hover:text-slate-900">
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-gray-200 hover:text-slate-900">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-200">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/insights" className="text-sm text-gray-200 hover:text-slate-900">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="text-sm text-gray-200 hover:text-slate-900">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link href="/insights" className="text-sm text-gray-200 hover:text-slate-900">
                      Whitepapers
                    </Link>
                  </li>
                  <li>
                    <Link href="/insights" className="text-sm text-gray-200 hover:text-slate-900">
                      Webinars
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div className="flex flex-wrap gap-4">
                <Link href="#" className="text-xs text-gray-200 hover:text-slate-900">
                  Terms of Service
                </Link>
                <Link href="#" className="text-xs text-gray-200 hover:text-slate-900">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-xs text-gray-200 hover:text-slate-900">
                  Cookie Policy
                </Link>
              </div>
              <p className="text-xs text-gray-200">© {new Date().getFullYear()} Jiftek. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  )
}
