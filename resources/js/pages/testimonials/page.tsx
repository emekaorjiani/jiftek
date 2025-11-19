import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"

/**
 * Testimonial Type Definition
 */
interface Testimonial {
  id: number
  title: string
  slug: string
  description: string
  image: string | null
  client_name: string | null
  client_industry: string | null
  results: string | null
}

/**
 * TestimonialsPage Component
 *
 * Displays a listing of all client success stories and case studies.
 * Shows testimonials in a grid layout with images and descriptions.
 */
export default function TestimonialsPage({
  testimonials = []
}: {
  testimonials?: Testimonial[]
}) {
  return (
    <FrontLayout>
      {/* Header Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:bg-gradient-to-r dark:from-blue-900 dark:via-blue-800 dark:to-blue-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-lg bg-blue-900 px-3 py-1 text-sm font-medium text-blue-200 border border-blue-400">
                <span>Success Stories</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-100">
                Our Client Success Stories
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
                Discover how we've helped organizations overcome challenges and achieve their business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 dark:bg-blue-950 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          {testimonials && testimonials.length > 0 ? (
            <>
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="group relative overflow-hidden rounded-lg border border-blue-700 bg-blue-500 dark:border-gray-300 dark:bg-gray-700 shadow-sm transition-all hover:shadow-lg"
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <img
                        src={testimonial.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80"}
                        alt={testimonial.title}
                        className="object-cover transition-all group-hover:scale-105 w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80'
                        }}
                      />
                    </div>
                    <div className="p-6">
                      {testimonial.client_industry && (
                        <div className="mb-2">
                          <span className="inline-flex items-center rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-blue-100">
                            {testimonial.client_industry}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-100 mb-2">{testimonial.title}</h3>
                      <p className="mt-2 text-gray-300 line-clamp-3">{testimonial.description}</p>
                      {testimonial.results && (
                        <p className="mt-3 text-sm text-blue-200 font-medium">
                          {testimonial.results}
                        </p>
                      )}
                      <div className="mt-4">
                        <Link 
                          href={`/testimonials/${testimonial.slug}`} 
                          className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-blue-100 transition-colors"
                        >
                          Read full case study
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No testimonials available at this time. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Start Your Success Story?
            </h2>
            <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed">
              Let's work together to transform your business and achieve remarkable results.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started Today
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FrontLayout>
  )
}



