import { Navigation } from '@/components/navigation';
import { PropertyCard } from '@/components/PropertyCard';

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property?filter=top`, {
    cache: 'default' 
  });
  const allResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property?filter=all`, {
    cache: 'default' 
  });
  const allData = await allResponse.json();
  const allProperties = allData.properties;
  const data = await response.json();
  const properties = data.properties;



export default function PropertiesPage() {
  return (
    <div>
        <div>

    <Navigation/>        
        </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
      <h1 className="text-3xl font-light text-gray-900 mb-8">
        Featured Properties
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
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
            // <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
      <h1 className="text-3xl font-light text-gray-900 mb-8">
        All Properties
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProperties.map((property) => (
            // <PropertyCard key={property.id} property={property} />
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
        </div>
  );
}