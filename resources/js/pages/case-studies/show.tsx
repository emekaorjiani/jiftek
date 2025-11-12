import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"

/**
 * Case Study Type Definition
 */
interface CaseStudy {
  id: number
  title: string
  slug: string
  description: string
  content: string | null
  image: string | null
  client_name: string | null
  client_industry: string | null
  results: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
}

/**
 * CaseStudyShowPage Component
 *
 * Displays a single case study in detail.
 * Shows full content, client information, and results.
 */
export default function CaseStudyShowPage({
  caseStudy
}: {
  caseStudy: CaseStudy
}) {
  return (
    <FrontLayout>
      {/* Header Section with Image */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:bg-gradient-to-r dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 relative overflow-hidden">
        {caseStudy.image && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
        )}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/case-studies" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Case Studies
            </Link>
            <div className="space-y-4">
              {caseStudy.client_industry && (
                <div className="inline-flex items-center rounded-lg bg-blue-900 px-3 py-1 text-sm font-medium text-blue-200 border border-blue-400">
                  <span>{caseStudy.client_industry}</span>
                </div>
              )}
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-100">
                {caseStudy.title}
              </h1>
              {caseStudy.description && (
                <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
                  {caseStudy.description}
                </p>
              )}
              {caseStudy.client_name && (
                <p className="text-blue-200 font-medium">
                  Client: {caseStudy.client_name}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-900 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {caseStudy.image && (
                  <div className="relative h-96 w-full overflow-hidden rounded-lg">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80'
                      }}
                    />
                  </div>
                )}

                {caseStudy.content ? (
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: caseStudy.content }}
                  />
                ) : (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                      {caseStudy.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Client Information Card */}
                  <div className="rounded-lg border border-blue-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Case Study Details
                    </h3>
                    <div className="space-y-4">
                      {caseStudy.client_name && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Client</p>
                          <p className="text-base text-gray-900 dark:text-gray-100">{caseStudy.client_name}</p>
                        </div>
                      )}
                      {caseStudy.client_industry && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Industry</p>
                          <p className="text-base text-gray-900 dark:text-gray-100">{caseStudy.client_industry}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Results Card */}
                  {caseStudy.results && (
                    <div className="rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Key Results
                      </h3>
                      <p className="text-base text-gray-700 dark:text-gray-300">
                        {caseStudy.results}
                      </p>
                    </div>
                  )}

                  {/* CTA Card */}
                  <div className="rounded-lg border border-blue-200 dark:border-gray-700 bg-blue-600 p-6">
                    <h3 className="text-lg font-bold text-white mb-2">
                      Ready to Get Started?
                    </h3>
                    <p className="text-sm text-blue-100 mb-4">
                      Let's discuss how we can help transform your business.
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-gray-900 dark:text-gray-100">
              Explore More Success Stories
            </h2>
            <p className="max-w-[600px] text-gray-600 dark:text-gray-400">
              Discover how we've helped other organizations achieve their goals.
            </p>
            <Link href="/case-studies">
              <Button size="lg" variant="outline" className="mt-4">
                View All Case Studies
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FrontLayout>
  )
}

