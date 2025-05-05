import { Button } from "@/components/ui/button"
import { ChevronRight, Award, Target, Users, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  <span>Our Story</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/tight">
                  Driving Innovation Through Technology
                </h1>
                <p className="text-slate-700 md:text-xl/relaxed">
                  Founded in 2010, Jiftek has grown from a small tech consultancy to a leading provider of innovative
                  technology solutions for businesses worldwide.
                </p>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-2xl opacity-10"></div>
                <img
                  src="/placeholder.svg?height=400&width=600&text=About+Us"
                  alt="Jiftek Team"
                  width={600}
                  height={400}
                  className="mx-auto object-cover rounded-2xl relative"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-slate-700 md:text-lg/relaxed">
                  To empower organizations with innovative technology solutions that drive growth, efficiency, and
                  competitive advantage. We are committed to delivering exceptional value through our expertise,
                  integrity, and client-focused approach.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-slate-700 md:text-lg/relaxed">
                  To be the most trusted technology partner for forward-thinking organizations, known for our
                  innovation, excellence, and the transformative impact we create for our clients and communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Core Values</h2>
                <p className="mx-auto max-w-[700px] text-slate-700 md:text-xl/relaxed">
                  The principles that guide everything we do at Jiftek.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              {[
                {
                  icon: <Award className="h-10 w-10 text-blue-600" />,
                  title: "Excellence",
                  description:
                    "We strive for excellence in everything we do, from the solutions we develop to the service we provide.",
                },
                {
                  icon: <Heart className="h-10 w-10 text-blue-600" />,
                  title: "Integrity",
                  description: "We operate with honesty, transparency, and ethical standards in all our interactions.",
                },
                {
                  icon: <Users className="h-10 w-10 text-blue-600" />,
                  title: "Collaboration",
                  description: "We believe in the power of teamwork and partnership to achieve extraordinary results.",
                },
                {
                  icon: <Target className="h-10 w-10 text-blue-600" />,
                  title: "Innovation",
                  description: "We continuously explore new ideas and technologies to deliver cutting-edge solutions.",
                },
              ].map((value, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-2 p-6">
                  <div className="rounded-full bg-blue-50 p-3">{value.icon}</div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-slate-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Timeline */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Journey</h2>
                <p className="mx-auto max-w-[700px] text-slate-700 md:text-xl/relaxed">
                  From our humble beginnings to where we are today.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <div className="space-y-8">
                {[
                  {
                    year: "2010",
                    title: "Founded",
                    description:
                      "Jiftek was founded with a vision to provide innovative technology solutions to businesses.",
                  },
                  {
                    year: "2013",
                    title: "Expansion",
                    description:
                      "Expanded our team and opened our first international office to serve clients globally.",
                  },
                  {
                    year: "2016",
                    title: "Innovation Hub",
                    description:
                      "Launched our Innovation Hub to explore emerging technologies and develop cutting-edge solutions.",
                  },
                  {
                    year: "2019",
                    title: "Strategic Partnerships",
                    description:
                      "Formed strategic partnerships with leading technology providers to enhance our service offerings.",
                  },
                  {
                    year: "2022",
                    title: "Digital Transformation Focus",
                    description:
                      "Expanded our digital transformation practice to help clients navigate the rapidly evolving digital landscape.",
                  },
                  {
                    year: "Today",
                    title: "Global Impact",
                    description: "Continuing to grow and innovate, serving clients across industries and geographies.",
                  },
                ].map((milestone, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-blue-200">
                    <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 -translate-x-1/2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-blue-600">{milestone.year}</div>
                      <h3 className="text-lg font-bold">{milestone.title}</h3>
                      <p className="text-slate-700">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Leadership Team</h2>
                <p className="mx-auto max-w-[700px] text-slate-700 md:text-xl/relaxed">
                  Meet the experienced professionals guiding our company.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  name: "Alex Johnson",
                  title: "Chief Executive Officer",
                  bio: "With over 20 years of experience in technology leadership, Alex has led Jiftek from its founding to become an industry leader.",
                  image: "/placeholder.svg?height=300&width=300&text=CEO",
                },
                {
                  name: "Sarah Chen",
                  title: "Chief Technology Officer",
                  bio: "Sarah brings deep technical expertise and a passion for innovation, leading our technology strategy and development teams.",
                  image: "/placeholder.svg?height=300&width=300&text=CTO",
                },
                {
                  name: "Michael Rodriguez",
                  title: "Chief Operating Officer",
                  bio: "Michael ensures operational excellence across all aspects of our business, with a focus on client satisfaction and results.",
                  image: "/placeholder.svg?height=300&width=300&text=COO",
                },
                {
                  name: "Emily Patel",
                  title: "VP of Client Services",
                  bio: "Emily leads our client services team, ensuring we deliver exceptional value and build lasting relationships with our clients.",
                  image: "/placeholder.svg?height=300&width=300&text=VP",
                },
                {
                  name: "David Kim",
                  title: "VP of Engineering",
                  bio: "David oversees our engineering teams, bringing technical excellence and innovation to every solution we deliver.",
                  image: "/placeholder.svg?height=300&width=300&text=VP",
                },
                {
                  name: "Lisa Thompson",
                  title: "VP of Marketing",
                  bio: "Lisa leads our marketing efforts, sharing Jiftek's story and connecting our solutions with the organizations that need them most.",
                  image: "/placeholder.svg?height=300&width=300&text=VP",
                },
              ].map((leader, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      width={300}
                      height={300}
                      className="object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{leader.name}</h3>
                    <p className="text-sm text-blue-600">{leader.title}</p>
                    <p className="mt-2 text-sm text-slate-700">{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  <span>Our Culture</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  A Culture of Innovation and Collaboration
                </h2>
                <p className="text-slate-700 md:text-lg/relaxed">
                  At Jiftek, we foster a culture that encourages creativity, continuous learning, and teamwork. We
                  believe that our people are our greatest asset, and we invest in their growth and well-being.
                </p>
                <p className="text-slate-700 md:text-lg/relaxed">
                  Our collaborative environment brings together diverse perspectives and expertise, enabling us to solve
                  complex challenges and deliver exceptional results for our clients.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Join Our Team
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/placeholder.svg?height=300&width=300&text=Culture+1"
                  alt="Team Collaboration"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover h-full"
                />
                <img
                  src="/placeholder.svg?height=300&width=300&text=Culture+2"
                  alt="Office Environment"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover h-full mt-8"
                />
                <img
                  src="/placeholder.svg?height=300&width=300&text=Culture+3"
                  alt="Team Event"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover h-full"
                />
                <img
                  src="/placeholder.svg?height=300&width=300&text=Culture+4"
                  alt="Innovation Workshop"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover h-full mt-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Us on Our Journey</h2>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl/relaxed">
                  Partner with Jiftek to transform your business and achieve your technology goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Contact Us Today
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  View Our Work
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

