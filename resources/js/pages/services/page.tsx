import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle, ArrowRight } from "lucide-react"
import FrontLayout from "@/layouts/front-pages/front-layout"
export default function ServicesPage() {
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

        {/* Services Overview */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  <span>Technology Consulting</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-500">
                  Strategic Technology Consulting
                </h2>
                <p className="text-gray-800 dark:text-gray-100 md:text-lg/relaxed">
                  Our expert consultants work with you to understand your business challenges and develop technology
                  strategies that align with your goals. We provide roadmaps for digital transformation, technology
                  adoption, and innovation.
                </p>
                <ul className="grid gap-2 dark:text-gray-100 t">
                  {[
                    "IT Strategy Development",
                    "Digital Transformation Planning",
                    "Technology Assessment",
                    "Vendor Selection",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-2xl opacity-10"></div>
                <img
                  src="/placeholder.svg?height=400&width=600&text=Consulting"
                  alt="Technology Consulting"
                  width={600}
                  height={400}
                  className="mx-auto object-cover rounded-2xl relative"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-gradient-to-r from-blue-500 to-blue-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-500">Our Core Services</h2>
                <p className="mx-auto max-w-[700px] text-slate-700 dark:text-gray-100 md:text-xl/relaxed">
                  Comprehensive solutions designed to address your most complex technology challenges.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  title: "Custom Software Development",
                  description:
                    "Tailor-made software solutions designed to address your unique business challenges and requirements.",
                  features: ["Web Applications", "Mobile Apps", "Enterprise Software", "API Development"],
                },
                {
                  title: "Cloud Services",
                  description:
                    "Secure, scalable cloud infrastructure and migration services to modernize your IT environment.",
                  features: ["Cloud Migration", "Infrastructure as Code", "Managed Cloud Services", "Cloud Security"],
                },
                {
                  title: "Data Analytics & AI",
                  description:
                    "Transform your data into actionable insights with our advanced analytics and AI solutions.",
                  features: ["Business Intelligence", "Predictive Analytics", "Machine Learning", "Data Visualization"],
                },
                {
                  title: "Cybersecurity",
                  description:
                    "Protect your business with comprehensive security solutions designed for the modern threat landscape.",
                  features: ["Security Assessments", "Penetration Testing", "Compliance", "Security Operations"],
                },
                {
                  title: "DevOps & Automation",
                  description:
                    "Streamline your development and operations with automated workflows and continuous integration.",
                  features: [
                    "CI/CD Implementation",
                    "Infrastructure Automation",
                    "Containerization",
                    "Monitoring & Alerting",
                  ],
                },
                {
                  title: "Managed IT Services",
                  description:
                    "Proactive management and support for your entire IT infrastructure, allowing you to focus on your core business.",
                  features: ["24/7 Monitoring", "Help Desk Support", "Patch Management", "Disaster Recovery"],
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white dark:bg-slate-800 p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-500">{service.title}</h3>
                    <p className="text-slate-700 dark:text-gray-100">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4">
                    <Link
                      href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600"
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-gradient-to-r from-yellow-500 to-orange-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-500">Our Service Process</h2>
                <p className="mx-auto max-w-[700px] text-slate-700 dark:text-gray-100 md:text-xl/relaxed">
                  A structured approach to delivering exceptional results for your business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description:
                    "We begin by understanding your business, challenges, and goals to define the scope of work.",
                },
                {
                  step: "02",
                  title: "Strategy",
                  description:
                    "Our team develops a comprehensive strategy and roadmap tailored to your specific needs.",
                },
                {
                  step: "03",
                  title: "Implementation",
                  description: "We execute the plan with precision, keeping you informed throughout the process.",
                },
                {
                  step: "04",
                  title: "Optimization",
                  description: "Continuous improvement and refinement to ensure long-term success and ROI.",
                },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute top-0 left-0 -mt-2 -ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    {step.step}
                  </div>
                  <div className="rounded-lg border border-yellow-500 bg-white dark:bg-yellow-800 p-6 pl-8 shadow-sm">
                    <h3 className="text-xl font-bold text-blue-500">{step.title}</h3>
                    <p className="mt-2 text-slate-700 dark:text-gray-100">{step.description}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 h-0.5 w-8 bg-yellow-500 translate-x-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

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
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Contact Us Today
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-blue-500 tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="mx-auto max-w-[700px] text-slate-700 dark:text-gray-100 md:text-xl/relaxed">
                  Find answers to common questions about our services.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 mt-12">
              {[
                {
                  question: "How long does a typical project take?",
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
                {
                  question: "Can you work with our existing systems and technologies?",
                  answer:
                    "Absolutely. We specialize in integrating with existing systems and technologies. Our team has experience working with a wide range of platforms, databases, and legacy systems to ensure seamless integration and data flow.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-lg border border-slate-200 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-500">{faq.question}</h3>
                  <p className="mt-2 text-slate-700 dark:text-gray-100">{faq.answer}</p>
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

