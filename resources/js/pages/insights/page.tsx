import {Link} from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import { ChevronRight, Search, Tag, Clock, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Insights & Resources</h1>
                <p className="mx-auto max-w-[700px] text-slate-700 md:text-xl/relaxed">
                  Stay informed with the latest technology trends, insights, and best practices from our experts.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input type="search" placeholder="Search articles..." className="w-full bg-white pl-8 shadow-sm" />
                  </div>
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  <span>Featured</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  The Future of AI in Business: Opportunities and Challenges
                </h2>
                <p className="text-slate-700 md:text-lg/relaxed">
                  Explore how artificial intelligence is reshaping business operations and driving innovation across
                  industries. Learn about the opportunities, challenges, and practical steps for implementation.
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>By Sarah Chen</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>10 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span>AI, Business</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Read Article
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-2xl opacity-10"></div>
                <img
                  src="/placeholder.svg?height=400&width=600&text=AI+in+Business"
                  alt="AI in Business"
                  width={600}
                  height={400}
                  className="mx-auto object-cover rounded-2xl relative"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="w-full py-8 border-y border-slate-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                "All",
                "Artificial Intelligence",
                "Cloud Computing",
                "Cybersecurity",
                "Digital Transformation",
                "Software Development",
                "Data Analytics",
              ].map((category, i) => (
                <Link
                  key={i}
                  href={`/insights/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    i === 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Articles</h2>
                <p className="max-w-[700px] text-slate-700 md:text-xl/relaxed">
                  Explore our most recent insights and thought leadership.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=Article+${i + 1}`}
                      alt={`Article ${i + 1}`}
                      className="object-cover transition-all group-hover:scale-105"
                      // fill
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <span>Category</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold">Cloud Migration Strategies for Enterprise</h3>
                    <p className="mt-2 text-slate-700 line-clamp-3">
                      Learn the best practices for migrating your enterprise applications and infrastructure to the
                      cloud securely and efficiently.
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Author</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>5 min read</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/insights/article-${i + 1}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600"
                      >
                        Read more
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Case Studies</h2>
                <p className="max-w-[700px] text-slate-700 md:text-xl/relaxed">
                  Real-world examples of how our solutions have helped organizations overcome challenges and achieve
                  their goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=300&width=600&text=Case+Study+${i + 1}`}
                      alt={`Case Study ${i + 1}`}
                      className="object-cover transition-all group-hover:scale-105"
                      // fill
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <span>Industry</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold">Digital Transformation for Financial Services</h3>
                    <p className="mt-2 text-slate-700">
                      How we helped a leading bank modernize their legacy systems and improve customer experience.
                    </p>
                    <div className="mt-4">
                      <Link
                        href={`/insights/case-study-${i + 1}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600"
                      >
                        Read case study
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button className="bg-blue-600 hover:bg-blue-700">
                View All Case Studies
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Resources</h2>
                <p className="max-w-[700px] text-slate-700 md:text-xl/relaxed">
                  Guides, whitepapers, and tools to help you navigate the technology landscape.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              {[
                {
                  title: "Whitepapers",
                  description: "In-depth research and analysis on key technology topics.",
                  icon: "📄",
                },
                {
                  title: "Webinars",
                  description: "Expert-led sessions on emerging trends and best practices.",
                  icon: "🎥",
                },
                {
                  title: "Guides",
                  description: "Step-by-step instructions and practical advice.",
                  icon: "📚",
                },
              ].map((resource, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-6 rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold">{resource.title}</h3>
                  <p className="mt-2 text-slate-700">{resource.description}</p>
                  <div className="mt-4">
                    <Link
                      href={`/insights/${resource.title.toLowerCase()}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600"
                    >
                      Browse {resource.title}
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Stay Updated with Our Newsletter
                </h2>
                <p className="text-blue-100 md:text-lg/relaxed">
                  Subscribe to receive the latest insights, articles, and resources directly in your inbox.
                </p>
              </div>
              <div className="space-y-4">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-blue-700 border-blue-500 text-white placeholder:text-blue-300 focus:ring-blue-400"
                  />
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">Subscribe</Button>
                </form>
                <p className="text-sm text-blue-200">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

