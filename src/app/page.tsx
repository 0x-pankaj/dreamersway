
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { PropertyCard } from '@/components/PropertyCard';
import Link from "next/link";
import Image from "next/image";

import {  Clock, Wrench, Shield, Users } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import Footer from "@/components/sections/Footer";
import About from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Services from "@/components/sections/Service";


// Update the Property interface to match the backend schema
interface Property {
  id: string;
  created_at: string;
  name: string;
  location: string;
  price: string;
  type: string;
  developer: string;
  configuration: string;
  beds: number;
  baths: number;
  garages: number;
  status: string;
  built_up_area: string;
  description: string;
  images: string[];
  amenities: string[];
  brochure: string;
  created_by: string;
}

// Update the Home component to async
export default async function Home() {
  // Fetch top properties
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property?filter=top`, {
    cache: 'default' 
  });
  const data = await response.json();
  console.log("data from the server",data)
  const properties = data.properties;


  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero/>

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
            {properties.map((property: Property) => (
              <PropertyCard 
                key={property.id} 
                property={{
                  id: property.id,
                  image: property.images[0] || '/placeholder.jpg',
                  name: property.name,
                  price: property.price,
                  location: property.location,
                  developer: property.developer,
                  configuration: `${property.beds} Bed ${property.configuration}`,
                  builtUpArea: property.built_up_area,
                  status: property.status,
                  amenities: property.amenities
                }} 
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/properties">
              <Button 
                variant="outline" 
                className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white"
              >
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Stress Free Property Journey Section */}
      <Journey/>

      {/* About Metrosquare Section */}
      <About/>
      {/* Services Section */}
            <Services/>


      {/* Contact CTA */}
      <section className="py-24 bg-sky-400">
      {/* Get in Touch Section */}
      
      <section className="py-2">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our properties? Reach out to us, and our team will be happy to help.
          </p>
        </div>


            <ContactForm/>
      </section> 
      </section>

      {/* Footer */}
     <Footer/>
         </div>
  );
}
