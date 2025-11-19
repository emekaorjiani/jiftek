import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ChevronRight, BarChart, Shield, Award, CheckCircle, ArrowRight, Cloud, Globe, Lock, GraduationCap, Briefcase } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"

/**
 * SolutionsPage Component
 * 
 * Displays main solution categories (parent categories).
 * Solutions are the main branches that contain multiple services.
 */
interface Solution {
  id: number
  title: string
  slug: string
  description: string
  content: string | null
  image: string | null
  icon: string | null
  services_count: number
}

interface Props {
  solutions?: Solution[]
}

// Icon mapping for solutions
const iconMap: Record<string, any> = {
  'cloud': Cloud,
  'web': Globe,
  'shield': Shield,
  'training': GraduationCap,
  'consulting': Briefcase,
}

export default function SolutionsPage({ solutions = [] }: Props) {
  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:bg-gradient-to-r dark:from-blue-900 dark:via-blue-800 dark:to-blue-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-blue-900 px-3 py-1 text-sm font-medium text-blue-200 border border-blue-400">
                <span>Technology Solutions</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/tight text-gray-100">
                Comprehensive <span className="text-blue-400">Technology Solutions</span>
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed">
                Discover our range of innovative technology solutions designed to transform your business and drive growth in the digital era.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-900 cursor-pointer">
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="dark:text-white text-amber-600 hover:text-amber-400 border-white hover:bg-blue-700 cursor-pointer">
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-2xl opacity-10"></div>
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Technology Solutions"
                width={500}
                height={500}
                className="mx-auto object-cover rounded-2xl relative"
              />
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
                Technology Solutions for Modern Business
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-200 md:text-xl/relaxed">
                We offer a comprehensive suite of technology solutions designed to address your most complex business challenges.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {solutions && solutions.length > 0 ? (
              solutions.map((solution) => {
                const IconComponent = solution.icon && iconMap[solution.icon] ? iconMap[solution.icon] : BarChart;
                return (
                  <div
                    key={solution.id}
                    className="group relative overflow-hidden rounded-lg border border-yellow-100 dark:border-orange-500 bg-blue-500 dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="space-y-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-blue-400">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-100 dark:text-gray-200">{solution.title}</h3>
                      <p className="text-gray-300 dark:text-gray-200">{solution.description}</p>
                      {solution.services_count > 0 && (
                        <p className="text-sm text-blue-200">
                          {solution.services_count} {solution.services_count === 1 ? 'service' : 'services'} available
                        </p>
                      )}
                    </div>
                    <div className="pt-4">
                      <Link
                        href={`/services#${solution.slug}`}
                        className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-white transition-colors"
                      >
                        View Services
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              // Fallback solutions if none from database
              [
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
                  className="group relative overflow-hidden rounded-lg border border-yellow-100 dark:border-orange-500 bg-blue-500 dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-blue-400">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-100 dark:text-gray-200">{item.title}</h3>
                    <p className="text-gray-300 dark:text-gray-200">{item.description}</p>
                  </div>
                  <div className="pt-4">
                    <Link
                      href={`/solutions/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-sm font-medium text-blue-200"
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed">
                Let's discuss how our technology solutions can help you achieve your business goals.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Schedule a Consultation
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FrontLayout>
  )
}
