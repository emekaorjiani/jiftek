import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle, ArrowRight } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"

/**
 * ServicesPage Component
 * 
 * Displays services grouped by their solution categories.
 * Solutions are the main branches, services are individual items under each solution.
 */
interface Service {
  id: number
  title: string
  slug: string
  description: string
  image: string | null
  features: string[]
}

interface Solution {
  id: number
  title: string
  slug: string
  description: string
  image: string | null
  icon: string | null
  services: Service[]
}

interface Props {
  solutions?: Solution[]
}

export default function ServicesPage({ solutions = [] }: Props) {
  return (
    <FrontLayout>
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-24 bg-gradient-to-r from-blue-500 to-blue-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-blue-500">Our Services</h1>
                <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl/relaxed">
                  Comprehensive technology solutions tailored to your business needs. We help you innovate, transform,
                  and grow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grouped by Solutions */}
        {solutions && solutions.length > 0 ? (
          solutions.map((solution) => (
            <section key={solution.id} className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
              <div className="container mx-auto px-4 md:px-6">
                {/* Solution Header */}
                <div className="mb-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                        <span>{solution.title}</span>
                      </div>
                      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-500">
                        {solution.title}
                      </h2>
                      <p className="text-gray-800 dark:text-gray-100 md:text-lg/relaxed max-w-2xl">
                        {solution.description}
                      </p>
                    </div>
                    {solution.image && (
                      <div className="relative w-full md:w-96 h-64 rounded-lg overflow-hidden">
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Services Grid */}
                {solution.services && solution.services.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {solution.services.map((service) => (
                      <div
                        key={service.id}
                        className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white dark:bg-slate-800 shadow-sm transition-all hover:shadow-lg hover:scale-105"
                      >
                        {/* Service Image */}
                        {service.image && (
                          <div className="relative h-48 w-full overflow-hidden">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg?height=200&width=400&text=" + encodeURIComponent(service.title)
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                        )}
                        
                        <div className="p-6 space-y-4">
                          <h3 className="text-xl font-bold text-blue-500">{service.title}</h3>
                          <p className="text-slate-700 dark:text-gray-100 text-sm">{service.description}</p>
                          
                          {/* Features List */}
                          {service.features && service.features.length > 0 && (
                            <ul className="space-y-2">
                              {service.features.slice(0, 3).map((feature, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100">
                                  <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          
                          {/* Learn More Link */}
                          <div className="pt-2">
                            <Link
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              Learn more
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400">No services available for this solution yet.</p>
                  </div>
                )}
              </div>
            </section>
          ))
        ) : (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">No services available at the moment. Please check back later.</p>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Business?
                </h2>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl/relaxed">
                  Schedule a consultation with our experts to discover how Jiftek can help you achieve your technology
                  goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Contact Us Today
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                    View Solutions
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
