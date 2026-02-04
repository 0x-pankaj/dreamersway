import { Navigation } from "@/components/navigation";
import { TeamMember } from "@/components/TeamMember";
import Footer from "@/components/sections/Footer";
import Image from "next/image";

const teamMembers = [
  {
    name: "S Jeet Gupta",
    role: "Sales Manager",
    image: "jeet-1.jpg",
    url: "https://yjhbkhovlsxilqdtewki.supabase.co/storage/v1/object/public/property-brochures/team-1.png",
    description:
      "Experienced Sales Manager known for driving revenue growth, building strong client relationships, and leading high-performing sales teams with strategic precision.",
    socials: {
      instagram:
        "https://www.instagram.com/metrosquare.realty?igsh=ZjBhd2dsMnlvbWxk&utm_source=qr ",
      linkedin:
        "https://www.linkedin.com/in/metro-square-realty-3947ba394?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app ",
    },
  },
  {
    name: "Subham Kotale",
    role: "Customer Relationship Manager",
    image: "subham-1.jpg",
    url: "https://yjhbkhovlsxilqdtewki.supabase.co/storage/v1/object/public/property-brochures/team-2.png",
    description:
      "An experienced CRM professional, Subham Kotale specializes in resolving client concerns, improving engagement, and maintaining high retention rates.",
    socials: {
      instagram:
        "https://www.instagram.com/metrosquare.realty?igsh=ZjBhd2dsMnlvbWxk&utm_source=qr ",
      linkedin:
        "https://www.linkedin.com/in/metro-square-realty-3947ba394?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app ",
    },
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-28">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-sky-600 to-sky-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About Us
              </h1>
              <p className="text-sky-100 text-lg max-w-2xl mx-auto">
                Your trusted partner in medical education consultancy
              </p>
            </div>
          </div>
        </section>

        {/* About Company Section - Left Image, Right Text */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Company Image */}
              <div className="relative">
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Dreamers Way Consultancy Office"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-100 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-sky-600/20 rounded-2xl -z-10"></div>
              </div>

              {/* Right - About Text */}
              <div>
                <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold mb-4">
                  ABOUT US
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Dreamers Way Consultancy
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Dreamers Way Consultancy is a premier educational consultancy dedicated to
                    helping students achieve their dreams of pursuing medical education in Nepal.
                    With years of experience and a passionate team, we provide comprehensive
                    guidance to students aspiring to become medical professionals.
                  </p>
                  <p>
                    We understand that choosing the right medical college is one of the most
                    important decisions in a student's life. That's why we offer personalized
                    counseling, complete admission assistance, and ongoing support throughout
                    your educational journey.
                  </p>
                  <p>
                    Our partnerships with top medical institutions across Nepal ensure that we
                    can provide you with accurate information, transparent processes, and the
                    best possible options for your medical career.
                  </p>
                </div>

                {/* Stats */}
                {/* <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
                  <div>
                    <div className="text-3xl font-bold text-sky-600">3+</div>
                    <div className="text-sm text-gray-500">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-sky-600">500+</div>
                    <div className="text-sm text-gray-500">Students Placed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-sky-600">15+</div>
                    <div className="text-sm text-gray-500">Partner Colleges</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Message from Managing Director - Left Text, Right Image */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Message Text */}
              <div className="order-2 lg:order-1">
                <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold mb-4">
                  MESSAGE FROM MANAGING DIRECTOR
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Welcome to Dreamers Way
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    I am delighted to welcome you to Dreamers Way Consultancy, where we believe
                    every student deserves the opportunity to pursue their dreams in the medical
                    field. Our mission is to bridge the gap between aspiring medical students
                    and quality medical education in Nepal.
                  </p>
                  <p>
                    Choosing to pursue medicine is a noble decision, and we understand the
                    complexities involved in finding the right institution. Our dedicated team
                    of counselors, with their extensive knowledge of the medical education
                    landscape in Nepal, is committed to guiding you through every step of your
                    admission process.
                  </p>
                  <p>
                    We take pride in our personalized approach, ensuring that each student
                    receives guidance tailored to their academic background, career goals, and
                    financial considerations. Our strong relationships with leading medical
                    colleges ensure transparent and smooth admission processes.
                  </p>
                  <p>
                    I invite you to take the first step towards your medical career with us.
                    Let us be your trusted partner in this transformative journey.
                  </p>
                </div>

                {/* Director Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="font-semibold text-gray-900">Warm regards,</p>
                  <p className="text-xl font-bold text-sky-600 mt-2">Anand Thakur</p>
                  <p className="text-gray-500">Managing Director</p>
                  <p className="text-gray-500 text-sm">Dreamers Way Consultancy</p>
                </div>
              </div>

              {/* Right - Director Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Anand Thakur - Managing Director"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sky-600/10 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-sky-100 rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold mb-4">
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Sets Us Apart
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We are committed to providing exceptional service and support to every student
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "Expert Guidance",
                  description: "Personalized counseling from experienced education consultants"
                },
                {
                  icon: "🏥",
                  title: "Top Colleges",
                  description: "Partnerships with leading medical institutions in Nepal"
                },
                {
                  icon: "📋",
                  title: "Complete Support",
                  description: "End-to-end assistance from admission to enrollment"
                },
                {
                  icon: "💰",
                  title: "Transparent Process",
                  description: "Clear information about fees, eligibility, and procedures"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-sky-100 transition-all">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
