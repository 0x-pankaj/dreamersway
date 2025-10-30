'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {  MapPin,  Check, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from '@/components/navigation';
import { ContactForm } from './ContactForm';

interface Property {
  // Add all property fields here
  id: string;
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
  video_url?:string;
}

export function PropertyDetailView({ property }: { property: Property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  }, [property.images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
  }, [property.images.length]);

  // Automatic slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, property.images.length]);

  // Reset autoplay when mouse leaves the section
  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Pause autoplay when mouse enters the section
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  return (

<div className="min-h-screen bg-gray-50">
			<Navigation />

			{/* Image Gallery */}
			<section 
        className="relative h-[600px] bg-gray-900"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {property.images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`${property.name} - Image ${index + 1}`}
            fill
            className={`object-cover transition-all duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index === 0}
          />
        ))}
        
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={handlePrevImage}
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNextImage}
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Image counter and play/pause indicator */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-sky-400' : 'bg-gray-400'}`} />
        </div>
      </section>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Header */}
						<div>
							<h1 className="text-4xl font-light text-gray-900 mb-2">
								{property.name}
							</h1>
							<div className="flex items-center text-gray-600">
								<MapPin className="h-5 w-5 mr-2" />
								<span>{property.location}</span>
							</div>
						</div>

						{/* Quick Info */}
						<div className="flex gap-4 flex-wrap">
							{['Apartment', `${property.beds} Beds`, `${property.baths} Baths`].map(
								(tag) => (
									<span
										key={tag}
										className="px-4 py-2 bg-sky-100 text-sky-600 rounded-full text-sm"
									>
										{tag}
									</span>
								)
							)}
						</div>

						{/* Overview */}
						<div>
							<h2 className="text-2xl font-light text-gray-900 mb-4">Overview</h2>
							<p className="text-gray-600 leading-relaxed">
								{property.description}
							</p>
						</div>

						{/* Details */}
						<div>
							<h2 className="text-2xl font-light text-gray-900 mb-4">Details</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{Object.entries({
									Beds: property.beds,
									Baths: property.baths,
									Garages: property.garages,
									Status: property.status,
									'Built-up Area': property.built_up_area,
									Price: property.price,
								}).map(([key, value]) => (
									<div
										key={key}
										className="p-4 bg-white rounded-lg shadow-sm"
									>
										<div className="text-gray-500 text-sm">{key}</div>
										<div className="text-gray-900 font-medium">{value}</div>
									</div>
								))}
							</div>
						</div>

						{/* Amenities */}
						<div>
							<h2 className="text-2xl font-light text-gray-900 mb-4">Amenities</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{property.amenities.map((amenity) => (
									<div key={amenity} className="flex items-center">
										<Check className="h-5 w-5 text-sky-500 mr-2" />
										<span className="text-gray-600">{amenity}</span>
									</div>
								))}
							</div>
						</div>

						{/* Video Section */}
						{property.video_url && (
  <div>
    <h2 className="text-2xl font-light text-gray-900 mb-4">Property Video</h2>
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${property.video_url.split('v=')[1]}`}
        title="Property Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  </div>
)}

					</div>

					{/* Sidebar */}
					<div className="space-y-6">
								<ContactForm/>

						<Card className="p-6">
							<h3 className="text-xl font-semibold mb-4">Download</h3>
							<Button
								variant="outline"
								className="w-full border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
							>
								<Download className="h-5 w-5 mr-2" />
								Download Brochure
							</Button>
						</Card>
					</div>
				</div>
			</div>
		</div>

  );
}