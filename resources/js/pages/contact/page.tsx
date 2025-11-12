import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"

/**
 * ContactInfoItem interface for type safety
 */
interface ContactInfoItem {
  type: string
  label: string
  value: string
  link?: string
}

/**
 * ContactPage component props
 */
interface ContactPageProps {
  contactInfo?: {
    title?: string
    items?: ContactInfoItem[]
  }
  mapInfo?: {
    title?: string
    latitude?: number
    longitude?: number
    zoom?: number
    address?: string
  }
  heroSection?: {
    title?: string
    description?: string
  }
}

/**
 * Get icon component based on contact info type
 */
function getContactIcon(type: string) {
  switch (type) {
    case 'phone':
      return Phone
    case 'whatsapp':
      return MessageCircle
    case 'email':
      return Mail
    case 'address':
      return MapPin
    default:
      return MapPin
  }
}

/**
 * ContactPage - Displays contact form and contact information
 * 
 * Fetches contact information from the database and displays it dynamically.
 * Includes contact form, contact info cards, and interactive OpenStreetMap.
 */
export default function ContactPage({ 
  contactInfo = { title: 'Contact Information', items: [] },
  mapInfo = { title: 'Our Location', latitude: 6.6, longitude: 3.505, zoom: 15 },
  heroSection = { title: 'Contact Us', description: 'Have questions or ready to start your next project? Get in touch with our team.' }
}: ContactPageProps) {
  // Generate OpenStreetMap embed URL with coordinates
  const generateMapUrl = (lat: number, lon: number, zoom: number) => {
    // Calculate bounding box for the map view
    const latOffset = 0.02
    const lonOffset = 0.02
    const bbox = `${lon - lonOffset},${lat - latOffset},${lon + lonOffset},${lat + latOffset}`
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lon}`
  }

  // Generate link to view larger map
  const generateMapLink = (lat: number, lon: number, zoom: number) => {
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`
  }

  const mapUrl = mapInfo.latitude && mapInfo.longitude 
    ? generateMapUrl(mapInfo.latitude, mapInfo.longitude, mapInfo.zoom || 15)
    : generateMapUrl(6.6, 3.505, 15)
  
  const mapLink = mapInfo.latitude && mapInfo.longitude
    ? generateMapLink(mapInfo.latitude, mapInfo.longitude, mapInfo.zoom || 15)
    : generateMapLink(6.6, 3.505, 15)

  return (
    <FrontLayout>
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 from-blue-800 to-blue-700 bg-gradient-to-r dark:bg-blue-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-blue-400">
                  {heroSection.title || 'Contact Us'}
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-200 dark:text-blue-50 md:text-xl/relaxed">
                  {heroSection.description || 'Have questions or ready to start your next project? Get in touch with our team.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-blue-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-slate-700 dark:text-blue-50">Get in Touch</h2>
                  <p className="text-slate-700 dark:text-blue-50 md:text-lg/relaxed">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium leading-none">
                        First name
                      </label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium leading-none">
                        Last name
                      </label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium leading-none">
                      Phone
                    </label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium leading-none">
                      Company
                    </label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Enter the subject" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Enter your message" className="min-h-[150px] resize-y" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                </form>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-slate-700 dark:text-blue-50">
                    {contactInfo.title || 'Contact Information'}
                  </h2>
                  <p className="text-slate-700 dark:text-blue-50 md:text-lg/relaxed">
                    Reach out to us directly using the information below.
                  </p>
                </div>
                {/* Contact Information Items - Dynamically rendered from database */}
                {contactInfo.items && contactInfo.items.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {contactInfo.items.map((item, index) => {
                      const IconComponent = getContactIcon(item.type)
                      const isLink = item.link && item.link.trim() !== ''
                      const isExternal = item.link?.startsWith('http')
                      
                      return (
                        <div key={index} className="rounded-lg border border-slate-200 bg-white dark:bg-blue-950 p-6 shadow-sm">
                          <div className="flex items-start space-x-4">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                            <div className="space-y-1">
                              <h3 className="font-medium">{item.label}</h3>
                              {isLink ? (
                                <a 
                                  href={item.link} 
                                  target={isExternal ? "_blank" : undefined}
                                  rel={isExternal ? "noopener noreferrer" : undefined}
                                  className="text-sm text-slate-700 dark:text-blue-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                  {item.value}
                                </a>
                              ) : (
                                <p className="text-sm text-slate-700 dark:text-blue-50">
                                  {item.value}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-slate-500 dark:text-slate-400">
                    No contact information available.
                  </div>
                )}
                {/* Map Section - Dynamically rendered with coordinates from database */}
                {mapInfo && (
                  <div className="rounded-lg border border-slate-200 bg-white dark:bg-blue-950 p-6 shadow-sm">
                    <h3 className="font-medium mb-4">{mapInfo.title || 'Our Location'}</h3>
                    <div className="aspect-video overflow-hidden rounded-lg border border-slate-200">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={mapUrl}
                        className="w-full h-full"
                        title="Office Location Map"
                      />
                    </div>
                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <a 
                        href={mapLink}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        View larger map
                      </a>
                    </div>
                    {mapInfo.address && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {mapInfo.address}
                      </p>
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="font-medium">Connect With Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="rounded-full bg-slate-100 dark:bg-blue-950 p-2 text-slate-600 dark:text-blue-50 hover:bg-slate-200 hover:text-slate-900"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-slate-100 dark:bg-blue-950 p-2 text-slate-600 dark:text-blue-50 hover:bg-slate-200 hover:text-slate-900"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.093 4.093 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.615 11.615 0 006.29 1.84" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-slate-100 dark:bg-blue-950 p-2 text-slate-600 dark:text-blue-50 hover:bg-slate-200 hover:text-slate-900"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-slate-100 dark:bg-blue-950 p-2 text-slate-600 dark:text-blue-50 hover:bg-slate-200 hover:text-slate-900"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-slate-100 dark:bg-blue-950 p-2 text-slate-600 dark:text-blue-50 hover:bg-slate-200 hover:text-slate-900"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-blue-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="mx-auto max-w-[700px] text-slate-700 dark:text-blue-50 md:text-xl/relaxed">
                  Find answers to common questions about working with us.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 mt-12">
              {[
                {
                  question: "What types of businesses do you work with?",
                  answer:
                    "We work with businesses of all sizes across various industries, including finance, healthcare, retail, manufacturing, and technology. Our solutions are tailored to meet the specific needs of each client.",
                },
                {
                  question: "How long does it take to complete a project?",
                  answer:
                    "Project timelines vary based on scope and complexity. A small project might take 4-8 weeks, while larger enterprise solutions can take 3-6 months or more. During our initial consultation, we'll provide a detailed timeline based on your specific requirements.",
                },
                {
                  question: "Do you offer ongoing support after project completion?",
                  answer:
                    "Yes, we offer comprehensive support and maintenance packages to ensure your solution continues to perform optimally. Our support includes regular updates, security patches, performance monitoring, and technical assistance.",
                },
                {
                  question: "How do you ensure the security of our data?",
                  answer:
                    "Security is built into every solution we develop. We implement industry best practices, conduct regular security audits, use encryption for sensitive data, and ensure compliance with relevant regulations. Our team stays updated on the latest security threats and mitigation strategies.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-lg border border-slate-200 bg-white dark:bg-blue-950 p-6 shadow-sm">
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <p className="mt-2 text-slate-700 dark:text-blue-50">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
    </FrontLayout>
  )
}

