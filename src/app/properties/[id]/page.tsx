// 'use client';  // Add this at the top since we're using state

import { Metadata } from 'next';
import { PropertyDetailView } from '@/components/PropertyDetailView';

interface Property {
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
}

interface PageProps {
  params: {
    id: string;
  };
}

// Fetch property details from API
async function getPropertyDetails(id: string): Promise<Property | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/property?id=${id}`,
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }

    const data = await response.json();
    return data.property;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const property = await getPropertyDetails(params.id);

  if (!property) {
    return {
      title: 'Property Not Found | Metrosquare Realty',
    };
  }

  return {
    title: `${property.name} | Metrosquare Realty`,
    description: property.description,
  };
}

export default async function PropertyDetail(
  { params }: PageProps
) {
  const property = await getPropertyDetails(params.id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Property not found
          </h1>
          <p className="mt-2 text-gray-600">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return <PropertyDetailView property={property} />;
}