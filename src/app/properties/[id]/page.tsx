// 'use client';  // Add this at the top since we're using state

import { Metadata } from 'next';
import { PropertyDetailView } from '@/components/PropertyDetailView';
import { Property } from '@/app/types/type';


interface PageProps {
  // Next's generated types use Promise-wrapped params in some setups; accept that shape.
  params?: Promise<{ id: string }>;
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
  const resolved = params ? await params : { id: '' };
  const property = await getPropertyDetails(resolved.id);

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
  const resolved = params ? await params : { id: '' };
  const property = await getPropertyDetails(resolved.id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Property not found
          </h1>
          <p className="mt-2 text-gray-600">
            {"The property you're looking for doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return <PropertyDetailView property={property} />;
}