import {Link, useForm, router} from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Award, BarChart, Shield, ExternalLink, ArrowRight } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"
import { useState, useEffect, FormEventHandler } from "react"

/**
 * Default hero items fallback (used if no data from backend)
 * Using Pexels for free high-quality stock images (2025 compatible)
 *
 * Free Image Sources (2025):
 * - Pexels: https://www.pexels.com/ (free, no attribution required)
 *   Format: https://images.pexels.com/photos/[id]/pexels-photo-[id].jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop
 * - Pixabay: https://pixabay.com/ (free, no attribution required)
 *   Direct image URLs from their CDN
 * - Unsplash: https://unsplash.com/ (free, attribution appreciated)
 *   New format: https://plus.unsplash.com/premium_photo-[id]?w=1200&h=800&fit=crop
 */
const defaultHeroItems = [
  {
    badge: "Innovative Technology Solutions",
    title: "Transforming Business Through",
    titleHighlight: "Smart Technology",
    description: "Jiftek delivers cutting-edge technology consulting and solutions that drive innovation, efficiency, and growth for forward-thinking organizations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80",
    imageAlt: "Digital transformation and technology innovation",
    primaryButton: "Explore Solutions",
    primaryButtonLink: "/solutions",
    secondaryButton: "Request a Consultation",
    secondaryButtonLink: "/contact",
  },
  {
    badge: "Cloud & Infrastructure",
    title: "Scalable Cloud Solutions for",
    titleHighlight: "Modern Enterprises",
    description: "Empower your business with secure, scalable cloud infrastructure that adapts to your needs and accelerates your digital transformation journey.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80",
    imageAlt: "Cloud computing and infrastructure",
    primaryButton: "View Services",
    primaryButtonLink: "/services",
    secondaryButton: "Learn More",
    secondaryButtonLink: "/solutions",
  },
  {
    badge: "AI & Machine Learning",
    title: "Intelligent Automation for",
    titleHighlight: "Business Excellence",
    description: "Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and unlock new possibilities for your business.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
    imageAlt: "Artificial intelligence and machine learning",
    primaryButton: "Discover AI Solutions",
    primaryButtonLink: "/solutions",
    secondaryButton: "Get Started",
    secondaryButtonLink: "/contact",
  },
  {
    badge: "Digital Transformation",
    title: "Future-Ready Solutions for",
    titleHighlight: "Digital Success",
    description: "Navigate the digital landscape with confidence. Our comprehensive solutions help you modernize, optimize, and transform your business operations.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80",
    imageAlt: "Digital transformation and innovation",
    primaryButton: "Start Your Journey",
    primaryButtonLink: "/contact",
    secondaryButton: "View Case Studies",
    secondaryButtonLink: "/insights",
  },
]

/**
 * Hero Item Type Definition
 */
interface HeroItem {
  badge: string
  title: string
  titleHighlight: string
  description: string
  image: string
  imageAlt: string
  primaryButton: string
  primaryButtonLink: string
  secondaryButton: string
  secondaryButtonLink: string
}

/**
 * Service Type Definition
 */

/**
 * HomePage Component
 *
 * Displays the homepage with animated hero carousel that cycles through items.
 * Hero items are managed via the admin panel and stored in the database.
 * Services are displayed dynamically from the database.
 */
/**
 * Testimonial Type Definition (for case studies)
 */
interface Testimonial {
  id: number
  title: string
  slug: string
  description: string
  image: string | null
}

/**
 * Client Testimonial Type Definition (for "What Our Clients Say" section)
 */
interface ClientTestimonial {
  id: number
  quote: string
  client_name: string | null
  client_industry: string | null
  image: string | null
}

/**
 * Partner Type Definition
 */
interface Partner {
  id: number
  name: string
  logo: string
  website: string | null
}

/**
 * Insight Interface
 */
interface Insight {
  id: number
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  category: string | null
  type: string
  author: string
  published_at: string | null
}

/**
 * Contact Form Component with CAPTCHA
 */
function ContactForm() {
  const [captcha, setCaptcha] = useState<{ question: string; token: string } | null>(null)
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [loadingCaptcha, setLoadingCaptcha] = useState(false)

  const { data, setData, processing, errors, reset } = useForm({
    name: '',
    email: '',
    message: '',
    captcha_answer: 0,
    captcha_token: '',
  })

  const loadCaptcha = async () => {
    setLoadingCaptcha(true)
    try {
      const response = await fetch('/captcha/generate', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin', // Important: include cookies/session
      })

      if (!response.ok) {
        throw new Error('Failed to generate CAPTCHA')
      }

      const result = await response.json()
      setCaptcha(result)
      setData('captcha_token', result.token)
      console.log('CAPTCHA loaded:', result.question, 'Token:', result.token.substring(0, 20) + '...')
    } catch (error) {
      console.error('Failed to load CAPTCHA:', error)
      alert('Failed to load CAPTCHA. Please refresh the page.')
    } finally {
      setLoadingCaptcha(false)
    }
  }

  // Load CAPTCHA on component mount
  useEffect(() => {
    loadCaptcha()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    // Ensure we have the current token
    if (!captcha || !captcha.token) {
      alert('Please wait for CAPTCHA to load')
      loadCaptcha()
      return
    }

    // Update form data with CAPTCHA answer and token
    const captchaAnswerInt = parseInt(captchaAnswer, 10)

    if (isNaN(captchaAnswerInt)) {
      alert('Please enter a valid CAPTCHA answer')
      return
    }

    // Prepare complete form data with CAPTCHA
    const formData = {
      name: data.name,
      email: data.email,
      message: data.message,
      captcha_answer: captchaAnswerInt,
      captcha_token: captcha.token,
    }

    console.log('Submitting form with:', {
      name: formData.name,
      email: formData.email,
      captcha_answer: formData.captcha_answer,
      captcha_token: formData.captcha_token.substring(0, 20) + '...',
    })

    // Use router.post directly to ensure all data is sent
    router.post('/contact/submit', formData, {
      preserveScroll: true,
      preserveState: false,
      onStart: () => {
        // Update form processing state
      },
      onSuccess: () => {
        reset()
        setCaptchaAnswer('')
        loadCaptcha() // Generate new CAPTCHA
        // Toast notification will be shown via flash message
      },
      onError: (errors: Record<string, string>) => {
        console.error('Form errors:', errors)
        // Reload CAPTCHA on error
        loadCaptcha()
        setCaptchaAnswer('')
      },
      onFinish: () => {
        // Form submission finished
      },
    })
  }

  return (
    <div className="space-y-4 bg-blue-800 rounded-lg p-6 lg:p-8">
      <h3 className="text-2xl font-bold">Contact Us</h3>
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="home-name" className="text-sm font-medium leading-none">
            Name *
          </label>
          <input
            id="home-name"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            className="h-10 rounded-md border border-blue-400 bg-blue-600 px-3 py-2 text-sm text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-xs text-red-300">{errors.name}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="home-email" className="text-sm font-medium leading-none">
            Email *
          </label>
          <input
            id="home-email"
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            className="h-10 rounded-md border border-blue-400 bg-blue-600 px-3 py-2 text-sm text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-xs text-red-300">{errors.email}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="home-message" className="text-sm font-medium leading-none">
            Message *
          </label>
          <textarea
            id="home-message"
            name="message"
            value={data.message}
            onChange={(e) => setData('message', e.target.value)}
            required
            className="min-h-[100px] rounded-md border border-blue-400 bg-blue-600 px-3 py-2 text-sm text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600"
            placeholder="Enter your message"
          />
          {errors.message && <p className="text-xs text-red-300">{errors.message}</p>}
        </div>

        {/* CAPTCHA */}
        <div className="grid gap-2">
          <label htmlFor="home-captcha" className="text-sm font-medium leading-none">
            Security Check *
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              {loadingCaptcha ? (
                <div className="h-10 rounded-md border border-blue-400 bg-blue-700 px-3 py-2 text-sm text-blue-200 flex items-center">
                  Loading...
                </div>
              ) : captcha ? (
                <div className="h-10 rounded-md border border-blue-400 bg-blue-700 px-3 py-2 text-sm text-white font-semibold flex items-center">
                  What is {captcha.question}?
                </div>
              ) : (
                <div className="h-10 rounded-md border border-blue-400 bg-blue-700 px-3 py-2 text-sm text-blue-200 flex items-center">
                  Loading CAPTCHA...
                </div>
              )}
            </div>
            <input
              id="home-captcha"
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              required
              className="w-24 h-10 rounded-md border border-blue-400 bg-blue-600 px-3 py-2 text-sm text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600"
              placeholder="Answer"
            />
            <button
              type="button"
              onClick={loadCaptcha}
              className="px-3 py-2 text-xs text-blue-200 hover:text-white border border-blue-400 rounded-md hover:bg-blue-700 transition-colors"
              title="Refresh CAPTCHA"
            >
              ↻
            </button>
          </div>
          {errors.captcha_answer && <p className="text-xs text-red-300">{errors.captcha_answer}</p>}
        </div>

        <button
          type="submit"
          disabled={processing || loadingCaptcha}
          className="bg-white text-blue-600 hover:bg-blue-50 w-full py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default function HomePage({
  heroItems: backendHeroItems,
  testimonials = [],
  clientTestimonials = [],
  insights = [],
  partners = []
}: {
  heroItems?: HeroItem[]
  testimonials?: Testimonial[]
  clientTestimonials?: ClientTestimonial[]
  insights?: Insight[]
  partners?: Partner[]
}) {
  // Use backend data if available, otherwise fallback to defaults
  // Validate that backend hero items have all required fields including images
  const validatedBackendItems = backendHeroItems && backendHeroItems.length > 0
    ? backendHeroItems.map(item => ({
        ...item,
        image: item.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80',
        imageAlt: item.imageAlt || 'Hero image',
      }))
    : null

  const heroItems: HeroItem[] = validatedBackendItems || defaultHeroItems

  // Debug: Log hero items to help identify issues (remove in production if needed)
  useEffect(() => {
    // Only log in development mode (when not in production build)
    if (typeof window !== 'undefined' && !window.location.hostname.includes('production')) {
      console.log('Hero items loaded:', heroItems.length, 'items')
      heroItems.forEach((item, index) => {
        console.log(`Hero item ${index}:`, {
          hasImage: !!item.image,
          imageUrl: item.image,
          title: item.title
        })
      })
    }
  }, [heroItems])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  /**
   * Auto-rotate hero items every 5 seconds
   */
  useEffect(() => {
    if (heroItems.length === 0) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroItems.length)
        setIsTransitioning(false)
      }, 500) // Half of transition duration
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [heroItems.length])

  /**
   * Preload next image for smooth transitions
   */
  useEffect(() => {
    if (heroItems.length === 0) return

    const nextIndex = (currentIndex + 1) % heroItems.length
    const img = new Image()
    img.src = heroItems[nextIndex].image
  }, [currentIndex, heroItems])

  // Safety check - ensure we have items and valid index
  if (heroItems.length === 0) {
    return (
      <FrontLayout>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-gray-100">No hero content available. Please configure hero items in the admin panel.</p>
          </div>
        </section>
      </FrontLayout>
    )
  }

  // Ensure currentIndex is within bounds
  const safeIndex = Math.min(currentIndex, heroItems.length - 1)
  const currentItem = heroItems[safeIndex]

  return (
    <FrontLayout>
      {/* Animated Hero Section - Modern Dark Design */}
      <section className="w-full py-16 md:py-28 lg:py-36 relative overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        {/* Hero Background Images - Full Section Coverage */}
        <div className="absolute inset-0 z-0">
          {heroItems.map((item, index) => (
            <img
              key={`hero-bg-image-${index}`}
              src={item.image}
              alt={item.imageAlt}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                index === safeIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 z-0'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                const fallbackImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80'
                if (target.src !== fallbackImage) {
                  console.warn(`Hero image failed to load: ${item.image}, using fallback`)
                  target.src = fallbackImage
                }
              }}
              onLoad={() => {
                if (typeof window !== 'undefined' && !window.location.hostname.includes('production') && index === 0) {
                  console.log('Hero image loaded successfully:', item.image)
                }
              }}
            />
          ))}
          
          {/* Dark gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-black/90 z-20"></div>
          
          {/* Additional gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -right-4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] z-30"></div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 md:px-6 relative z-40">
          <div className="max-w-4xl mx-auto">
            {/* Text Content with Animation */}
            <div className="space-y-6 relative min-h-[400px] md:min-h-[500px] flex flex-col justify-center items-center text-center">
              <div
                key={`badge-${safeIndex}`}
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-blue-400 border border-blue-500/30 transition-all duration-500 w-fit ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span>{currentItem.badge}</span>
              </div>

              <h1
                key={`title-${safeIndex}`}
                className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white transition-all duration-500 delay-100 leading-tight ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {currentItem.title}
                </span>{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  {currentItem.titleHighlight}
                </span>
              </h1>

              <p
                key={`description-${safeIndex}`}
                className={`max-w-[700px] mx-auto text-gray-300 md:text-lg lg:text-xl leading-relaxed transition-all duration-500 delay-200 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                {currentItem.description}
              </p>

              <div
                key={`buttons-${safeIndex}`}
                className={`flex flex-col gap-4 min-[400px]:flex-row justify-center transition-all duration-500 delay-300 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                <Link href={currentItem.primaryButtonLink}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer group px-8 py-6 text-base font-semibold"
                  >
                    {currentItem.primaryButton}
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href={currentItem.secondaryButtonLink}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-slate-900/50 backdrop-blur-sm border-slate-700 text-gray-300 hover:text-white hover:bg-slate-800/50 hover:border-slate-600 cursor-pointer px-8 py-6 text-base font-semibold transition-all duration-300"
                  >
                    {currentItem.secondaryButton}
                  </Button>
                </Link>
              </div>

              {/* Navigation Dots */}
              {heroItems.length > 1 && (
                <div className="flex gap-2 mt-8 justify-center">
                  {heroItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsTransitioning(true)
                        setTimeout(() => {
                          setCurrentIndex(index)
                          setIsTransitioning(false)
                        }, 500)
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === safeIndex
                          ? 'w-10 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/50'
                          : 'w-2 bg-slate-700 hover:bg-slate-600'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies We Use Section */}
      <section className="w-full py-8 border-y border-gray-700 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-medium tracking-tight text-gray-200">Technologies We Use</h2>
            </div>
            {partners && partners.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center w-full">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-center h-16 w-full">
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all hover:opacity-100 flex items-center justify-center w-full h-full"
                        title={partner.name}
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-12 max-w-full w-auto h-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = `<span class="text-gray-300 text-xs font-medium">${partner.name}</span>`
                            }
                            console.warn(`Partner logo failed to load: ${partner.logo}`)
                          }}
                          onLoad={() => {
                            // Log successful load in development
                            if (typeof window !== 'undefined' && !window.location.hostname.includes('production')) {
                              console.log(`Partner logo loaded: ${partner.name} - ${partner.logo}`)
                            }
                          }}
                        />
                      </a>
                    ) : (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-12 max-w-full w-auto h-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<span class="text-gray-300 text-xs font-medium">${partner.name}</span>`
                          }
                          console.warn(`Partner logo failed to load: ${partner.logo}`)
                        }}
                        onLoad={() => {
                          if (typeof window !== 'undefined' && !window.location.hostname.includes('production')) {
                            console.log(`Partner logo loaded: ${partner.name} - ${partner.logo}`)
                          }
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Fallback if no partners
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
            )}
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
                  link: "/solutions",
                },
                {
                  title: "Cloud Solutions",
                  description: "Secure, scalable cloud infrastructure optimized for your business needs",
                  icon: <Shield className="h-12 w-12 text-blue-400" />,
                  link: "/solutions",
                },
                {
                  title: "Enterprise Software",
                  description: "Tailor-made software solutions designed for your unique challenges",
                  icon: <Award className="h-12 w-12 text-blue-400" />,
                  link: "/solutions",
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
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-blue-500 hover:text-blue-500 border-gray-300 hover:bg-gray-700 cursor-pointer">
                View All Solutions
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
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
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="group relative overflow-hidden rounded-lg border border-blue-700 bg-blue-500 dark:border-gray-300 dark:bg-gray-700 shadow-sm transition-all hover:shadow-md"
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
                    <h3 className="text-xl font-bold text-gray-100">{testimonial.title}</h3>
                    <p className="mt-2 text-gray-300">{testimonial.description}</p>
                    <div className="mt-4">
                      <Link href={`/testimonials/${testimonial.slug}`} className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-blue-100">
                        Read full case study
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback if no testimonials
              [
                {
                  title: "Financial Services Transformation",
                  description:
                    "How we helped a leading bank modernize their legacy systems and improve customer experience",
                  img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
                },
                {
                  title: "Healthcare Innovation",
                  description: "Implementing AI-driven diagnostics platform that improved patient outcomes by 35%",
                  img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop&q=80",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-blue-700 bg-blue-500 dark:border-gray-300 dark:bg-gray-700 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover transition-all group-hover:scale-105 w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-100">{item.title}</h3>
                    <p className="mt-2 text-gray-300">{item.description}</p>
                    <div className="mt-4">
                      <Link href="/testimonials" className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-blue-100">
                        Read full case study
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/testimonials">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Browse All Case Studies
              </Button>
            </Link>
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
              {clientTestimonials && clientTestimonials.length > 0 ? (
                clientTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white dark:bg-blue-950 p-6 shadow-sm"
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
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.image || `/placeholder.svg?height=40&width=40&text=${testimonial.client_name ? testimonial.client_name.charAt(0).toUpperCase() : 'C'}`}
                          alt={testimonial.client_name || "Client"}
                          width={40}
                          height={40}
                          className="rounded-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `/placeholder.svg?height=40&width=40&text=${testimonial.client_name ? testimonial.client_name.charAt(0).toUpperCase() : 'C'}`
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium">{testimonial.client_name || "Client"}</p>
                          <p className="text-sm text-slate-500">{testimonial.client_industry || "Company"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback if no testimonials available
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white dark:bg-blue-950 p-6 shadow-sm"
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
                ))
              )}
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
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Get Started Today
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <ContactForm />
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
            {insights && insights.length > 0 ? (
              insights.map((insight) => (
                <Link
                  key={insight.id}
                  href={`/insights/${insight.slug}`}
                  className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white dark:bg-blue-950 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={insight.featured_image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&q=80"}
                      alt={insight.title}
                      className="object-cover transition-all group-hover:scale-105 w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&q=80"
                      }}
                    />
                  </div>
                  <div className="p-6">
                    {insight.category && (
                      <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        <span>{insight.category}</span>
                      </div>
                    )}
                    <h3 className="mt-2 text-xl font-bold">{insight.title}</h3>
                    {insight.excerpt && (
                      <p className="mt-2 text-slate-700 dark:text-blue-50 line-clamp-3">
                        {insight.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-4">
                      {insight.author && (
                        <div className="flex items-center gap-2">
                          <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=30&h=30&fit=crop&q=80"
                            alt={insight.author}
                            width={24}
                            height={24}
                            className="rounded-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=30&width=30"
                            }}
                          />
                          <span className="text-sm text-slate-600 dark:text-blue-50">{insight.author}</span>
                        </div>
                      )}
                      {insight.published_at && (
                        <span className="text-sm text-slate-600 dark:text-blue-50">{insight.published_at}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">No insights available at the moment. Please check back later.</p>
              </div>
            )}
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

