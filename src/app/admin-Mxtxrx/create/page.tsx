'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, X } from 'lucide-react';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface FileUpload {
  file: File | null;
  preview: string;
}

export default function AdminPanel() {

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    type: '',
    developer: '',
    configuration: '',
    beds: '',
    baths: '',
    garages: '',
    status: '',
    built_up_area: '',
    description: '',
    video_url:'',
    amenities: [] as string[],
    images: [] as FileUpload[],
    brochure: null as File | null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (index: number, value: string, field: 'images' | 'amenities') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'images' | 'amenities') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'images' | 'amenities') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleBrochureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        brochure: file
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Upload images first
      const imageUrls = await Promise.all(
        formData.images.map(async (image) => {
          if (!image.file) return '';
          const filename = `${Date.now()}-${image.file.name}`;
          const { data, error } = await supabase.storage
            .from('property-images')
            .upload(filename, image.file);

          if (error) throw error;
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(data.path);

          return publicUrl;
        })
      );

      // Upload brochure if exists
      let brochureUrl = '';
      if (formData.brochure) {
        const filename = `${Date.now()}-${formData.brochure.name}`;
        const { data, error } = await supabase.storage
          .from('property-brochures')
          .upload(filename, formData.brochure);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('property-brochures')
          .getPublicUrl(data.path);

        brochureUrl = publicUrl;
      }

      // Insert property data with uploaded file URLs
      const { data, error } = await supabase
        .from('properties')
        .insert([{
          ...formData,
          images: imageUrls,
          brochure: brochureUrl,
          amenities: formData.amenities.filter(a => a.trim() !== ''), // Filter out empty amenities
          beds: parseInt(formData.beds),
          baths: parseInt(formData.baths),
          garages: parseInt(formData.garages)
        }]);

      if (error) throw error;
      
      alert('Property added successfully!');
      setFormData({
        name: '',
        location: '',
        price: '',
        type: '',
        developer: '',
        configuration: '',
        beds: '',
        baths: '',
        garages: '',
        status: '',
        built_up_area: '',
        description: '',
        video_url:'',
        amenities: [] as string[],
        images: [] as FileUpload[],
        brochure: null as File | null,
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Add New Property</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="developer">Developer</Label>
                <Input
                  id="developer"
                  name="developer"
                  value={formData.developer}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="beds">Bedrooms</Label>
                <Input
                  type="number"
                  id="beds"
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="baths">Bathrooms</Label>
                <Input
                  type="number"
                  id="baths"
                  name="baths"
                  value={formData.baths}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="garages">Garages</Label>
                <Input
                  type="number"
                  id="garages"
                  name="garages"
                  value={formData.garages}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Input
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="configuration">Configuration</Label>
                <Input
                  id="configuration"
                  name="configuration"
                  value={formData.configuration}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="built_up_area">Built-up Area</Label>
                <Input
                  id="built_up_area"
                  name="built_up_area"
                  value={formData.built_up_area}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            {/* Youtube Video */}
            <div className="space-y-2">
              <Label htmlFor="description">Youtube URL</Label>
              <Input
                id="video_url"
                name="video_url"
                placeholder='Youtube URL'
                value={formData.video_url}
                onChange={handleInputChange}
              />
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="space-y-2">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={amenity}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'amenities')}
                      placeholder="Enter amenity"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem(index, 'amenities')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem('amenities')}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Amenity
              </Button>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label>Images</Label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mt-2"
              />
            </div>

            {/* Brochure */}
            <div className="space-y-2">
              <Label htmlFor="brochure">Brochure PDF</Label>
              <Input
                id="brochure"
                type="file"
                accept=".pdf"
                onChange={handleBrochureUpload}
              />
              {formData.brochure && (
                <p className="text-sm text-gray-500">
                  Selected: {formData.brochure.name}
                </p>
              )}
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-sky-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Property...' : 'Add Property'}
            </Button>
          </form>

        
        </Card>
      </div>
    </div>
  );
}