// 'use client';  // Add this at the top since we're using state

import { Metadata } from 'next';
import { PropertyDetailView } from '@/components/PropertyDetailView';
import { properties } from '@/data/properties'; // Move your properties data to a separate file

// Fetch property details by ID
const getPropertyDetails = (id: string) => {
	return properties.find((property) => property.id === id);
};

export async function generateStaticParams() {
	return properties.map((property) => ({
		id: property.id,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const property = getPropertyDetails(params.id);

	return {
		title: `${property.name} | Metrosquare Realty`,
		description: property.description,
	};
}

export default function PropertyDetail({ params }: { params: { id: string } }) {
	const property = getPropertyDetails(params.id);

	if (!property) {
		return <div>Property not found</div>;
	}

	return <PropertyDetailView property={property} />;
}