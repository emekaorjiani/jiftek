import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, User, Tag, Share2 } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"

/**
 * Insight Interface
 */
interface Insight {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featured_image: string | null
  category: string | null
  type: string
  tags: string | null
  author: {
    name: string
    email: string
  } | null
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
}

/**
 * Related Insight Interface
 */
interface RelatedInsight {
  id: number
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  published_at: string | null
}

/**
 * InsightShowPage Component
 * 
 * Displays a single insight/article with full content, author information,
 * and related insights.
 */
interface Props {
  insight: Insight
  relatedInsights?: RelatedInsight[]
}

export default function InsightShowPage({ insight, relatedInsights = [] }: Props) {
  // Parse tags if available
  const tags = insight.tags ? insight.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []

  return (
    <FrontLayout>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {/* Hero Section with Featured Image */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-blue-950 relative overflow-hidden">
            {insight.featured_image && (
              <div className="absolute inset-0">
                <img
                  src={insight.featured_image}
                  alt={insight.title}
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
                  href="/insights"
                  className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Insights
                </Link>
                <div className="space-y-2">
                  {insight.category && (
                    <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                      <span>{insight.category}</span>
                    </div>
                  )}
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-blue-500">
                    {insight.title}
                  </h1>
                  {insight.excerpt && (
                    <p className="max-w-[700px] text-gray-100 md:text-xl/relaxed">
                      {insight.excerpt}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200 mt-4">
                    {insight.author && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{insight.author.name}</span>
                      </div>
                    )}
                    {insight.published_at && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{insight.published_at}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          {insight.featured_image && (
            <section className="w-full py-8 bg-gray-100 dark:bg-blue-950">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                  <img
                    src={insight.featured_image}
                    alt={insight.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&q=80"
                    }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Content Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-blue-950">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: insight.content || insight.excerpt || '' }}
                />
                
                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag className="h-4 w-4 text-blue-600" />
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Related Insights */}
          {relatedInsights.length > 0 && (
            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-500">
                      Related Insights
                    </h2>
                    <p className="max-w-[700px] text-slate-700 dark:text-blue-50 md:text-xl/relaxed">
                      Explore more articles and resources
                    </p>
                  </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedInsights.map((related) => (
                    <Link
                      key={related.id}
                      href={`/insights/${related.slug}`}
                      className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white dark:bg-blue-950 shadow-sm transition-all hover:shadow-md"
                    >
                      {related.featured_image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={related.featured_image}
                            alt={related.title}
                            className="object-cover transition-all group-hover:scale-105 w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&q=80"
                            }}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold">{related.title}</h3>
                        {related.excerpt && (
                          <p className="mt-2 text-slate-700 dark:text-blue-50 line-clamp-3">
                            {related.excerpt}
                          </p>
                        )}
                        {related.published_at && (
                          <p className="mt-4 text-sm text-slate-600 dark:text-blue-50">
                            {related.published_at}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
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
                    Want More Insights?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl/relaxed">
                    Explore our full library of articles, case studies, and resources.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/insights">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      Browse All Insights
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



