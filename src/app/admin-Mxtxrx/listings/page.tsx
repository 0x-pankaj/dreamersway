'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  type: string;
  developer: string;
  configuration: string;
  beds: string; // Note: These are strings in the interface but numbers in DB
  baths: string;
  garages: string;
  status: string;
  built_up_area: string;
  description: string;
  images: string[];
  amenities: string[];
  brochure: string;
  created_at?: string; // Add this if it exists in your DB
  updated_at?: string; // Add this if it exists in your DB
  created_by:string;
}

export default function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;

      // First perform the update
      const { error: updateError } = await supabase
        .from('properties')
        .update({
          name: editingProperty.name,
          location: editingProperty.location,
          price: editingProperty.price,
          type: editingProperty.type,
          developer: editingProperty.developer,
          configuration: editingProperty.configuration,
          beds: parseInt(editingProperty.beds.toString()),
          baths: parseInt(editingProperty.baths.toString()),
          garages: parseInt(editingProperty.garages.toString()),
          status: editingProperty.status,
          built_up_area: editingProperty.built_up_area,
          description: editingProperty.description,
          images: editingProperty.images,
          amenities: editingProperty.amenities,
          brochure: editingProperty.brochure,
          created_by: user?.id, // Add this line
        })
        .eq('id', editingProperty.id);

      if (updateError) {
        console.error('Update error:', updateError);
        throw updateError;
      }

      // Then fetch the updated record
      const { data: updatedData, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', editingProperty.id)
        .single();

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        throw fetchError;
      }

      console.log('Updated data:', updatedData); // Debug log

      // Update local state with fresh data
      if (updatedData) {
        setProperties(properties.map(p => 
          p.id === editingProperty.id ? updatedData : p
        ));
        setIsEditDialogOpen(false);
        alert('Property updated successfully!');
      }
    } catch (error) {
      console.error('Error updating property:', error);
      alert(`Failed to update property: ${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (!propertyToDelete) return;

      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyToDelete.id);

      if (error) throw error;

      setProperties(properties.filter(p => p.id !== propertyToDelete.id));
      setIsDeleteDialogOpen(false);
      alert('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Property Listings</h1>
      <div className="grid gap-4">
        {properties.map((property) => (
          <Card key={property.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-sky-600">{property.price}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(property)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    setPropertyToDelete(property);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          {editingProperty && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name</Label>
                  <Input
                    id="name"
                    value={editingProperty.name}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      name: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editingProperty.location}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      location: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      price: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Input
                    id="type"
                    value={editingProperty.type}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      type: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="developer">Developer</Label>
                  <Input
                    id="developer"
                    value={editingProperty.developer}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      developer: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="configuration">Configuration</Label>
                  <Input
                    id="configuration"
                    value={editingProperty.configuration}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      configuration: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beds">Beds</Label>
                  <Input
                    id="beds"
                    type="number"
                    value={editingProperty.beds}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      beds: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baths">Baths</Label>
                  <Input
                    id="baths"
                    type="number"
                    value={editingProperty.baths}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      baths: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="garages">Garages</Label>
                  <Input
                    id="garages"
                    type="number"
                    value={editingProperty.garages}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      garages: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={editingProperty.status}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      status: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="built_up_area">Built-up Area</Label>
                  <Input
                    id="built_up_area"
                    value={editingProperty.built_up_area}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      built_up_area: e.target.value
                    })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    description: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Images (one URL per line)</Label>
                <Textarea
                  id="images"
                  value={editingProperty.images.join('\n')}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    images: e.target.value.split('\n').filter(url => url.trim() !== '')
                  })}
                  placeholder="Enter image URLs, one per line"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (one per line)</Label>
                <Textarea
                  id="amenities"
                  value={editingProperty.amenities.join('\n')}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    amenities: e.target.value.split('\n').filter(amenity => amenity.trim() !== '')
                  })}
                  placeholder="Enter amenities, one per line"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brochure">Brochure</Label>
                <Input
                  id="brochure"
                  value={editingProperty.brochure}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    brochure: e.target.value
                  })}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {propertyToDelete?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}