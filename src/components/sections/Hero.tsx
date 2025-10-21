import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

 export function Hero() {
  return (

      <section className="relative h-screen flex items-center justify-center">
          {/* Hero Section */}
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
            Metro Square Realty
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 opacity-90">
            SQUARE UP YOUR DREAMS
          </p>
          {/* <p className="text-lg md:text-xl font-light mb-8 opacity-80">
            Honest advice, personalized service, and seamless experiences for every property journey in Bangalore. */}
          {/* </p> */}
          <Button
            size="lg"
            className="bg-sky-400 hover:bg-blue-800 text-white px-8 py-3 text-lg"
          >
            Explore Properties
          </Button>
        </div>
      </section>
 
  )};

