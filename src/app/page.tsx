import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { PropertyCard } from '@/components/PropertyCard';
import Link from "next/link";
import Image from "next/image";
import { Building2, FileCheck, Clock, Wrench, Shield, Users } from "lucide-react";

const properties = [
  {
    id: 1,
    image: "img1.jpg",
    name: "Casagrand Hazen",
    price: "₹52 Lakhs",
    location: "Bannerghatta Road, Bangalore",
    developer: "Casagrand",
    configuration: "1 BHK, 2 BHK, 3 BHK, 4 BHK",
    builtUpArea: "600 sq.ft",
  },
  {
    id: 2,
    image: "img2.jpg",
    name: "Brigade Eldorado",
    price: "₹85 Lakhs",
    location: "Whitefield, Bangalore",
    developer: "Brigade",
    configuration: "2 BHK, 3 BHK",
    builtUpArea: "1200 sq.ft",
  },
  {
    id: 3,
    image: "img3.jpg",
    name: "Prestige Willow",
    price: "₹1.2 Cr",
    location: "Electronic City, Bangalore",
    developer: "Prestige",
    configuration: "3 BHK, 4 BHK",
    builtUpArea: "1800 sq.ft",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1588261728509-45dbee85ae7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000"
            alt="Modern Bangalore Buildings"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-sky-400">
            Metrosquare Realty
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 opacity-90">
            Your Next Move Begins Here
          </p>
          <p className="text-lg md:text-xl font-light mb-8 opacity-80">
            Honest advice, personalized service, and seamless experiences for every property journey in Bangalore.
          </p>
          <Button
            size="lg"
            className="bg-sky-400 hover:bg-blue-800 text-white px-8 py-3 text-lg"
          >
            Explore Properties
          </Button>
        </div>
      </section>

      {/* Stress Free Property Journey Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              We Make Your Property Journey Stress-Free
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-sky-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Wide Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                From apartments to villas, we offer properties across Karnataka’s most sought-after locations.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                  <FileCheck className="h-8 w-8 text-sky-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparent Process</h3>
              <p className="text-gray-600 leading-relaxed">
                We simplify buying, selling, and investing with honest advice and clear communication.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-sky-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Timely Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team is committed to prompt responses and seamless experiences at every step.
              </p>
            </div>
          </div>
        </div>
      </section>
   {/* Featured Properties Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {"Discover our handpicked selection of premium properties in Bangalore's most sought-after locations."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section>
      {/* About Metrosquare Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-light text-gray-900 mb-6">
                Building Futures in
                <span className="block font-bold text-sky-400">Bangalore</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
{"                At Metrosquare Realty, we believe finding the perfect property is more than a transaction—it's a step toward a better future. For over three years, we've helped families and investors discover spaces that truly match their needs."}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is to simplify your property journey with transparency, integrity, and a customer-first approach that has earned us the trust of numerous happy clients.
              </p>
              <Button variant="outline" className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white">
                Learn More About Us
              </Button>
            </div>
            <div className="relative h-96 lg:h-full">
              <Image
                // src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"

            src="https://images.unsplash.com/photo-1523192193543-6e7296d960e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000"
                alt="Bangalore Residential Buildings"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 lg:h-full">
              <Image
                src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
                alt="Modern Apartments Bangalore"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-5xl font-light text-gray-900 mb-6">
                Our
                <span className="block font-bold text-sky-400">Services</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Wrench className="h-6 w-6 text-sky-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Buy Residential Properties</h3>
                    <p className="text-gray-600">Discover apartments, villas, and homes tailored to your needs.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Shield className="h-6 w-6 text-sky-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Resale of Residential Properties</h3>
                    <p className="text-gray-600">Get expert guidance for selling your property at the best value.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-sky-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Investment Opportunities</h3>
                    <p className="text-gray-600">Explore investment options in Bangalore’s thriving real estate market.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white">
                  View All Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Metrosquare */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Why Choose Metrosquare Realty
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deep market knowledge, transparency, and a customer-first approach—experience the difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Integrity & Trust</h3>
                <p className="text-gray-600 text-sm">
                  Transparent processes and honest advice have earned us the trust of countless clients.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Personalized Service</h3>
                <p className="text-gray-600 text-sm">
                  Our team listens and tailors every experience to your unique needs and goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Market Expertise</h3>
                <p className="text-gray-600 text-sm">
                  Benefit from our deep knowledge of Bangalore’s real estate market and trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Get in Touch Button */}
      <section className="py-12 bg-gray-50 text-center">
        <Button
          size="lg"
          className="bg-sky-400 hover:bg-blue-800 text-white px-10 py-4 text-xl"
        >
          Get in Touch
        </Button>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from some of our happy clients who found their dream homes and investments with Metrosquare Realty.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 italic mb-4">
                  “Metrosquare Realty made my first home purchase smooth and stress-free. Highly recommended!”
                </p>
                <div className="font-semibold text-sky-400">Rahul Sharma</div>
                <div className="text-gray-500 text-sm">Bangalore</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 italic mb-4">
                  “Professional, honest, and always available. They helped me get the best value for my property.”
                </p>
                <div className="font-semibold text-sky-400">Priya Menon</div>
                <div className="text-gray-500 text-sm">Whitefield</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 italic mb-4">
                  “Great team and excellent service. My investment journey was seamless thanks to Metrosquare.”
                </p>
                <div className="font-semibold text-sky-400">Amit Desai</div>
                <div className="text-gray-500 text-sm">Koramangala</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We proudly collaborate with leading builders across Bangalore and Karnataka.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="flex flex-col items-center">
              <Image
                src="logo1.png"
                alt="Puravankara"
                width={120}
                height={60}
                className="object-contain mb-2"
              />
              {/* <span className="text-gray-700">Puravankara</span> */}
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="logo2.png"
                alt="Brigade"
                width={120}
                height={60}
                className="object-contain mb-2"
              />
              {/* <span className="text-gray-700">Brigade</span> */}
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="logo3.png"
                alt="Sobha"
                width={120}
                height={60}
                className="object-contain mb-2"
              />
              {/* <span className="text-gray-700">Sobha</span> */}
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="logo4.png"
                alt="Prestige"
                width={120}
                height={60}
                className="object-contain mb-2"
              />
              {/* <span className="text-gray-700">Prestige</span> */}
            </div>
            {/* Add more builder logos as needed */}
          </div>
        </div>
      </section>

   

      {/* Contact CTA */}
      <section className="py-24 bg-sky-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-white mb-6">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-xl text-blue-900 mb-8 max-w-2xl mx-auto">
            Connect with our advisors for honest guidance and seamless property experiences in Bangalore.
          </p>
          <div className="space-x-4  space-y-2">
            <Button
              size="lg"
              className="bg-white text-sky-400 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Whatsapp: +91 6364 421 053
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white hover:bg-white text-sky-400 px-8 py-3 text-lg"
            >
              Email: office@metrosquare.co.in
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white hover:bg-white text-sky-400 px-8 py-3 text-lg"
            >
              Call: +91 6364 421 053
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-sky-400">Metrosquare Realty</h3>
              <p className="text-gray-300 mb-6">
                Your trusted partner for buying, selling, and investing in Bangalore’s residential properties.
              </p>
              <p className="text-gray-300">
                Serving Karnataka since 2022<br />
                Bangalore, India
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Buy Residential Properties</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Resale Properties</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Investment Opportunities</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="#" className="hover:text-sky-400 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Our Team</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Projects</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Bangalore, India</li>
                <li>Whatsapp: +91 6364 421 053</li>
                <li>Email: office@metrosquare.co.in</li>
                <li>Call: +91 6364 421 053</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Metrosquare Realty. All rights reserved. Discover the difference with Metrosquare Realty — where your next move begins.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
