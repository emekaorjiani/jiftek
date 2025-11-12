import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle, ArrowLeft } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"

/**
 * ServiceShowPage Component
 * 
 * Displays detailed information about a single service including image, description,
 * content, and features. Includes navigation back to services listing.
 */
interface Service {
  id: number
  title: string
  slug: string
  description: string
  content: string | null
  image: string | null
  features: string[]
  seo_title?: string | null
  seo_description?: string | null
  seo_keywords?: string | null
}

interface Props {
  service: Service
}

export default function ServiceShowPage({ service }: Props) {
  return (
    <FrontLayout>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {/* Hero Section with Service Image */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-blue-950 relative overflow-hidden">
            {service.image && (
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-20"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            )}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-start space-y-4">
                <Link
                  href="/services"
                  className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Link>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-blue-500">
                    {service.title}
                  </h1>
                  <p className="max-w-[700px] text-gray-100 md:text-xl/relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Service Content Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                {/* Main Content */}
                <div className="space-y-6">
                  {service.image && (
                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(service.title)
                        }}
                      />
                    </div>
                  )}
                  
                  {service.content && (
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: service.content }}
                    />
                  )}
                  
                  {!service.content && (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-slate-700 dark:text-gray-100">
                        {service.description}
                      </p>
                      <p className="text-slate-700 dark:text-gray-100">
                        Our expert team is ready to help you leverage this service to achieve your business goals. 
                        Contact us today to learn more about how we can assist you.
                      </p>
                    </div>
                  )}
                </div>

                {/* Sidebar with Features and CTA */}
                <div className="space-y-6">
                  {/* Features Card */}
                  {service.features && service.features.length > 0 && (
                    <div className="rounded-lg border border-slate-200 bg-white dark:bg-slate-800 p-6 shadow-sm">
                      <h2 className="text-2xl font-bold text-blue-500 mb-4">Key Features</h2>
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 dark:text-gray-100">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Card */}
                  <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-blue-500 mb-3">Ready to Get Started?</h3>
                    <p className="text-slate-700 dark:text-gray-100 mb-4">
                      Let's discuss how {service.title} can help transform your business.
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Contact Us
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Related Services Link */}
                  <div className="rounded-lg border border-slate-200 bg-white dark:bg-slate-800 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-blue-500 mb-3">Explore Our Services</h3>
                    <p className="text-slate-700 dark:text-gray-100 mb-4 text-sm">
                      Discover more technology solutions tailored to your business needs.
                    </p>
                    <Link href="/services">
                      <Button variant="outline" className="w-full">
                        View All Services
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Let's Discuss Your Project
                  </h2>
                  <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl/relaxed">
                    Schedule a consultation with our experts to discover how we can help you achieve your technology goals.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      Contact Us Today
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                      View All Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </FrontLayout>
  )
}

