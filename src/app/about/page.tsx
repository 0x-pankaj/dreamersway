import { Navigation } from "@/components/navigation";
import { TeamMember } from "@/components/TeamMember";
import Footer from "@/components/sections/Footer";

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
    role: "Customer Relationship Manager",
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
  // {
  //   name: "Michael Doe",
  //   role: "Property Specialist",
  //   image: "team-1.png",
  //   url: "https://yjhbkhovlsxilqdtewki.supabase.co/storage/v1/object/public/property-brochures/team-1.png",
  //   description:
  //     "Experienced property specialist with a proven track record in luxury real estate and customer satisfaction.",
  //   socials: {
  //     facebook: "#",
  //     twitter: "#",
  //     instagram: "#",
  //     linkedin: "#",
  //   },
  // },
  // {
  //   name: "Jenny Doe",
  //   role: "Architect Engineer",
  //   image: "team-2.png",
  //   url: "https://yjhbkhovlsxilqdtewki.supabase.co/storage/v1/object/public/property-brochures/team-2.png",
  //   description:
  //     "Experienced property specialist with a proven track record in luxury real estate and customer satisfaction.",
  //   socials: {
  //     facebook: "#",
  //     twitter: "#",
  //     instagram: "#",
  //     linkedin: "#",
  //   },
  // },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-light text-gray-900 mb-6">
                About Metrosquare
              </h1>
              <p className="text-lg text-gray-600">
                We are a dedicated team of real estate professionals committed
                to helping you find your perfect property in Bangalore.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Our Expert Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet our experienced professionals who are dedicated to
                providing exceptional service and finding the perfect property
                solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
