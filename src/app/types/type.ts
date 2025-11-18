export interface Property {
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
  // Numeric price derived from `price` string for filtering and comparisons
  numericPrice?: number;
}