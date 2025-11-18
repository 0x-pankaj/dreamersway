'use client';

import { useState, useEffect, useMemo } from 'react';
import { Navigation } from '@/components/navigation';
import { PropertyCard } from '@/components/PropertyCard';
import { Property } from '../types/type';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Footer from '@/components/sections/Footer';

export default function PropertiesPage() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([100000, 100000000]); // 1L to 10Cr
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse price to number when setting properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [allResponse, featuredResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property?filter=top`)
        ]);

        if (!allResponse.ok || !featuredResponse.ok) {
          throw new Error('Failed to fetch properties');
        }

        const allData = await allResponse.json();
        const featuredData = await featuredResponse.json();

        // Parse prices when setting properties
        const parsePrice = (price: string) => {
          const parsed = parseInt(price.replace(/[₹,\s]/g, ''));
          console.log(`Original price: ${price}, Parsed price: ${parsed}`);
          return parsed;
        };

        const parsedProperties = allData.properties.map((prop: Property) => ({
          ...prop,
          numericPrice: parsePrice(prop.price)
        }));

        const parsedFeaturedProperties = featuredData.properties.map((prop: Property) => ({
          ...prop,
          numericPrice: parsePrice(prop.price)
        }));

        setProperties(parsedProperties);
        setFeaturedProperties(parsedFeaturedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Get unique locations from properties
  const availableLocations = useMemo(() => {
    const locations = properties.map(property => property.location);
    return Array.from(new Set(locations)).sort();
  }, [properties]);

  // Updated filter logic using numericPrice
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesLocation = selectedLocations.length === 0 || 
                            selectedLocations.includes(property.location);
                            console.log("property numeric price",property.numericPrice)
  const numeric = property.numericPrice ?? 0;
  const matchesPrice = numeric >= priceRange[0] && numeric <= priceRange[1];
      
      return matchesLocation && matchesPrice;
    });
  }, [properties, selectedLocations, priceRange]);

  // Helper function to format price in Indian notation
  const formatPrice = (price: number) => {
    if (price >= 10000000) { // 1 Crore or more
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    }
    return `₹${(price / 100000).toFixed(1)}L`; // In Lakhs
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light text-gray-900 text-center mb-8">
            Find Your Perfect Property
          </h1>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <Card className="p-6 mb-8 shadow-lg">
          <div className="grid gap-8 ">
            {/* Location Filter */}
            <div>
              <Label className="text-lg font-medium mb-4">Location</Label>
              <div className="grid grid-cols-2 gap-4">
                {availableLocations.map((location) => (
                  <div
                    key={location}
                    className={`
                      relative p-4 rounded-lg cursor-pointer transition-all
                      ${selectedLocations.includes(location)
                        ? 'bg-sky-50 border-sky-200 shadow-sm'
                        : 'bg-white border-gray-200 hover:bg-gray-50'}
                      border
                    `}
                    onClick={() => {
                      console.log("filtered ",filteredProperties)
                      setSelectedLocations(prev =>
                        prev.includes(location)
                          ? prev.filter(loc => loc !== location)
                          : [...prev, location]
                      );
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${selectedLocations.includes(location)
                            ? 'border-sky-500 bg-sky-500'
                            : 'border-gray-300'}
                        `}
                      >
                        {selectedLocations.includes(location) && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-gray-700 font-medium">{location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-lg font-medium">Price Range</Label>
              <div className="mt-6 px-2">
                <Slider
                  defaultValue={[100000, 100000000]}
                  min={100000} // Start from 1L
                  max={100000000} // Up to 10Cr
                  step={100000} // Increment by 1L
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-6"
                />
                <div className="flex justify-between mt-4">
                  <div className="text-center">
                    <div className="text-sky-600 font-semibold">
                      {formatPrice(priceRange[0])}
                    </div>
                    <div className="text-sm text-gray-500">Min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sky-600 font-semibold">
                      {formatPrice(priceRange[1])}
                    </div>
                    <div className="text-sm text-gray-500">Max</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* All Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-light text-gray-900 mb-8">
          All Properties {filteredProperties.length > 0 && ` (${filteredProperties.length})`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
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
      </div>
      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-light text-gray-900 mb-8">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
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
      </div>



      <Footer />
    </div>
  );
}