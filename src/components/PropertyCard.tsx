import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { MapPin, Building, Square } from 'lucide-react';
import Link from 'next/link';

interface PropertyCardProps {
  property: {
    id: string;
    image: string;
    name: string;
    price: string;
    location: string;
    developer: string;
    configuration: string;
    builtUpArea: string;
    status: string;
    amenities: string[];
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Property Image */}
        <div className="relative h-48 w-full">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Property Details */}
        <div className="p-6">
          {/* Name and Price */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {property.name}
            </h3>
            <p className="text-lg font-medium text-sky-600">
              Starting from {property.price}
            </p>
          </div>

          {/* Location and Developer */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Building className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">By {property.developer}</span>
            </div>
          </div>

          {/* Configuration and Area */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center text-gray-600">
              <div className="text-sm">
                <span className="text-gray-500">Configuration: </span>
                {property.configuration}
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Square className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">
                Built-up Area from {property.builtUpArea}
              </span>
            </div>
          </div>

          {/* View Details Button */}
          <Button 
            className="w-full bg-sky-500 hover:bg-sky-600 text-white"
          >
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
}