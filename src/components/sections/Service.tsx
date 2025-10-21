import Image from 'next/image'
import React from 'react'

import {  Clock, Wrench, Shield, Users } from "lucide-react";
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

function Services() {
  return (
    <div>
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


    </div>
  )
}

export default Services 
