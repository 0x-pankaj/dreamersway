"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2982&auto=format&fit=crop", // Medical building
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2982&auto=format&fit=crop", // Lab/Research
  "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=2982&auto=format&fit=crop", // Students
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image Carousel */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a213f]/90 to-[#0a213f]/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center md:text-left text-white max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-7xl font-bold tracking-tight mb-6 font-mont leading-tight">
            Building Future <br />
            <span className="text-primary">Medical Professionals</span>
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 opacity-90 max-w-2xl leading-relaxed">
            Your trusted gateway to top Medical Colleges in Nepal. We provide expert guidance, comprehensive information, and support for your medical education journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/colleges">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full font-semibold w-full sm:w-auto"
              >
                Find Colleges <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-full font-semibold w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
