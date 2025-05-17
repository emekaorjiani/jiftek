import {Link} from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Award, BarChart, Shield, ExternalLink, ArrowRight } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"

export default function HomePage() {
  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:bg-gradient-to-r dark:from-blue-900 dark:via-blue-800 dark:to-blue-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-blue-900 px-3 py-1 text-sm font-medium text-blue-200 border border-blue-400">
                <span>Innovative Technology Solutions</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/tight text-gray-100">
                Transforming Business Through <span className="text-blue-400">Smart Technology</span>
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed">
                Jiftek delivers cutting-edge technology consulting and solutions that drive innovation, efficiency,
                and growth for forward-thinking organizations.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/solutions">
                <Button size="lg" className="bg-blue-700 hover:bg-blue-900 cursor-pointer">
                  Explore Solutions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                </Link>
                <Link href="/contact">
                <Button size="lg" variant="outline" className="dark:text-white text-amber-600 hover:text-amber-400 border-white hover:bg-blue-700 cursor-pointer">
                  Request a Consultation
                </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-2xl opacity-10"></div>
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Digital Transformation Visualization"
                width={500}
                height={500}
                className="mx-auto object-cover rounded-2xl relative"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="w-full py-8 border-y border-gray-700 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-medium tracking-tight text-gray-200">Trusted by industry leaders</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <img
                    src={`/placeholder.svg?height=40&width=120&text=PARTNER ${i + 1}`}
                    alt={`Partner ${i + 1}`}
                    width={120}
                    height={40}
                    className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1 text-sm text-gray-200 border border-blue-400">
                <span>Our Solutions</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600">
                Comprehensive Technology Solutions
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                We offer end-to-end technology services designed to help your business innovate and thrive in the
                digital era.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {[
              {
                title: "Digital Transformation",
                description: "Reimagine your business processes with cutting-edge digital solutions",
                icon: <BarChart className="h-12 w-12 text-blue-400" />,
              },
              {
                title: "Cloud Services",
                description: "Secure, scalable cloud infrastructure optimized for your business needs",
                icon: <Shield className="h-12 w-12 text-blue-400" />,
              },
              {
                title: "Custom Software",
                description: "Tailor-made software solutions designed for your unique challenges",
                icon: <Award className="h-12 w-12 text-blue-400" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-blue-500 bg-blue-700 dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-700 text-blue-100">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
                <div className="pt-4">
                  <Link
                    href={`/solutions/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center text-sm font-medium text-blue-400"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg" className="text-blue-500 hover:text-blue-500 border-gray-300 hover:bg-gray-700 cursor-pointer">
              View All Solutions
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 dark:bg-blue-950 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-lg bg-blue-900 px-3 py-1 text-sm font-medium text-blue-200 border border-blue-400">
                <span>Success Stories</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-500">
                Our Client Success Stories
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                Discover how we've helped organizations overcome challenges and achieve their business goals.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 mt-12">
            {[
              {
                title: "Financial Services Transformation",
                description:
                  "How we helped a leading bank modernize their legacy systems and improve customer experience",
                img: "/placeholder.svg?height=300&width=600&text=Case+Study+1",
              },
              {
                title: "Healthcare Innovation",
                description: "Implementing AI-driven diagnostics platform that improved patient outcomes by 35%",
                img: "/placeholder.svg?height=300&width=600&text=Case+Study+2",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-blue-700 bg-blue-500 dark:border-gray-300 dark:bg-gray-700 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={item.img || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover transition-all group-hover:scale-105"
                    // fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100">{item.title}</h3>
                  <p className="mt-2 text-gray-300">{item.description}</p>
                  <div className="mt-4">
                    <Link href="/case-studies" className="inline-flex items-center text-sm font-medium text-blue-600">
                      Read full case study
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button size="lg">Browse All Case Studies</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-yellow-900 to-blue-800 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600">What Our Clients Say</h2>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed">
                Don't just take our word for it. Hear from the organizations we've helped transform.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white  dark:bg-blue-950 p-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 text-yellow-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="text-lg font-medium leading-relaxed text-slate-900 dark:text-blue-50">
                        "Jiftek's team demonstrated exceptional expertise and commitment throughout our digital
                        transformation project. The results have exceeded our expectations."
                      </blockquote>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={`/placeholder.svg?height=40&width=40&text=C${i + 1}`}
                        alt="Client"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Client Name</p>
                        <p className="text-sm text-slate-500">Position, Company</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed">
                Schedule a consultation with our experts to discover how Jiftek can help you achieve your technology
                goals.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started Today
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="space-y-4 bg-blue-800 rounded-lg p-6 lg:p-8">
              <h3 className="text-2xl font-bold">Contact Us</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none">
                    Name
                  </label>
                  <input
                    id="name"
                    className="h-10 rounded-md border border-blue-400 bg-blue-600 px-3 py-2 text-sm placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="h-10 rounded-md border border-blue-400 bg-blue-600 px-3 py-2 text-sm placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="min-h-[100px] rounded-md border border-blue-400 bg-blue-600 px-3 py-2 text-sm placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 w-full">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Insights Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-sm text-blue-500">
                <span>Latest Insights</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-500">
                Stay Informed with Jiftek
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                Explore our latest articles, guides, and industry insights.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white dark:bg-blue-950 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=200&width=400&text=Blog+${i + 1}`}
                    alt={`Blog ${i + 1}`}
                    className="object-cover transition-all group-hover:scale-105"
                    // fill
                  />
                </div>
                <div className="p-6">
                  <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    <span>Category</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold">The Future of AI in Business</h3>
                  <p className="mt-2 text-slate-700 dark:text-blue-50 line-clamp-3">
                    Exploring how artificial intelligence is reshaping business operations and driving innovation
                    across industries.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <img
                        src="/placeholder.svg?height=30&width=30"
                        alt="Author"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-slate-600 dark:text-blue-50">Author Name</span>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-blue-50">5 min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/insights">
            <Button variant="outline" size="lg" className="text-blue-500 hover:text-blue-500 border-gray-300 hover:bg-gray-700 cursor-pointer">
              View All Articles
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            </Link>

          </div>
        </div>
      </section>
    </FrontLayout>
  )
}

