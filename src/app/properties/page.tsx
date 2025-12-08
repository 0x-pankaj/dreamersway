"use client";

import { useState, useEffect, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "../types/type";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Footer from "@/components/sections/Footer";

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
        // Use relative endpoints so client-side fetch works regardless of env var
        const [allResponse, featuredResponse] = await Promise.all([
          fetch("/api/property"),
          fetch("/api/property?filter=top"),
        ]);

        if (!allResponse.ok || !featuredResponse.ok) {
          throw new Error("Failed to fetch properties");
        }

        const allData = await allResponse.json();
        const featuredData = await featuredResponse.json();

        const allPropsArray = Array.isArray(allData?.properties)
          ? allData.properties
          : [];
        const featuredPropsArray = Array.isArray(featuredData?.properties)
          ? featuredData.properties
          : [];

        // Parse prices when setting properties (robustly handle Cr/L and missing values)
        const parsePrice = (price: any): number | undefined => {
          if (price == null) return undefined;
          if (typeof price === "number") return price;
          const s = String(price).trim();

          // Match crore like "1.2Cr" or "1 Cr" or "1 crore"
          const croreMatch = s.match(/([\d.,]+)\s*(cr|crore|crores)/i);
          if (croreMatch) {
            const num = parseFloat(croreMatch[1].replace(/,/g, ""));
            if (!isNaN(num)) return Math.round(num * 10000000);
          }

          // Match lakh/ L shorthand like "12L" or "12 Lac" or "12 lakh"
          const lakhMatch = s.match(/([\d.,]+)\s*(l|lac|lakh|lakhs)/i);
          if (lakhMatch) {
            const num = parseFloat(lakhMatch[1].replace(/,/g, ""));
            if (!isNaN(num)) return Math.round(num * 100000);
          }

          // Otherwise strip non-digits and parse plain rupee numbers like "₹ 1,00,00,000"
          const digits = s.replace(/[₹,\s]/g, "");
          const plain = parseFloat(digits);
          if (!isNaN(plain)) return Math.round(plain);

          return undefined;
        };

        const parsedProperties: Property[] = allPropsArray.map((prop: Property) => ({
          ...prop,
          numericPrice: parsePrice((prop as any).price),
        }));

        const parsedFeaturedProperties: Property[] = featuredPropsArray.map(
          (prop: Property) => ({
            ...prop,
            numericPrice: parsePrice((prop as any).price),
          })
        );

        setProperties(parsedProperties);
        setFeaturedProperties(parsedFeaturedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
        setFeaturedProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Get unique locations from properties
  const availableLocations = useMemo(() => {
    const locations = properties.map((property) => property.location);
    return Array.from(new Set(locations)).sort();
  }, [properties]);

  // Compute filtered properties based on location and price filters
  const filteredProperties = useMemo(() => {
    if (properties.length === 0) return [];

    return properties.filter((property) => {
      // Location filter: if no locations selected, show all
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(property.location);

      if (!matchesLocation) return false;

      // Price filter: if numericPrice is unknown, include it; otherwise check range
      const numeric = (property as any).numericPrice;
      const matchesPrice =
        numeric == null || (numeric >= priceRange[0] && numeric <= priceRange[1]);

      return matchesPrice;
    });
  }, [properties, selectedLocations, priceRange]);

  // Determine if any filters are active
  const noLocationFilters = selectedLocations.length === 0;
  const defaultPriceRange = [100000, 100000000];
  const noPriceFilters =
    priceRange[0] === defaultPriceRange[0] &&
    priceRange[1] === defaultPriceRange[1];
  const filtersActive = !noLocationFilters || !noPriceFilters;

  // Display filtered properties if filters are active, otherwise show all
  const displayedProperties = filtersActive ? filteredProperties : properties;
  // Helper function to format price in Indian notation
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      // 1 Crore or more
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
                      ${
                        selectedLocations.includes(location)
                          ? "bg-sky-50 border-sky-200 shadow-sm"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }
                      border
                    `}
                    onClick={() => {
                      console.log("filtered ", filteredProperties);
                      setSelectedLocations((prev) =>
                        prev.includes(location)
                          ? prev.filter((loc) => loc !== location)
                          : [...prev, location]
                      );
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${
                            selectedLocations.includes(location)
                              ? "border-sky-500 bg-sky-500"
                              : "border-gray-300"
                          }
                        `}
                      >
                        {selectedLocations.includes(location) && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {location}
                      </span>
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
          All Properties{" "}
            {displayedProperties.length > 0 &&
              ` (${displayedProperties.length}${filtersActive ? ` of ${properties.length}` : ""})`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={{
                id: property.id,
                image: property.images[0] || "/placeholder.jpg",
                name: property.name,
                price: property.price,
                location: property.location,
                developer: property.developer,
                configuration: `${property.beds} Bed ${property.configuration}`,
                builtUpArea: property.built_up_area,
                status: property.status,
                amenities: property.amenities,
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
                image: property.images[0] || "/placeholder.jpg",
                name: property.name,
                price: property.price,
                location: property.location,
                developer: property.developer,
                configuration: `${property.beds} Bed ${property.configuration}`,
                builtUpArea: property.built_up_area,
                status: property.status,
                amenities: property.amenities,
              }}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
