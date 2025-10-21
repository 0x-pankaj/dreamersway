import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'


function About() {
  return (
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
  )
}


export default About