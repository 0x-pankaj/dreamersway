"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, X, Plus } from "lucide-react";
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

interface FileUpload {
  file: File | null;
  preview: string;
}

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
  video_url?: string;
  newImages?: FileUpload[]; // For handling new image uploads
  newBrochure?: File | null; // For handling new brochure upload
  created_at?: string; // Add this if it exists in your DB
  updated_at?: string; // Add this if it exists in your DB
  created_by: string;
}

export default function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null
  );

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty({
      ...property,
      newImages: [],
      newBrochure: null,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    try {
      // Upload new images if any
      const newImageUrls = await Promise.all(
        (editingProperty.newImages || []).map(async (image) => {
          if (!image.file) return "";
          const filename = `${Date.now()}-${image.file.name}`;
          const { data, error } = await supabase.storage
            .from("property-images")
            .upload(filename, image.file);

          if (error) throw error;

          const {
            data: { publicUrl },
          } = supabase.storage.from("property-images").getPublicUrl(data.path);

          return publicUrl;
        })
      );

      // Upload new brochure if any
      let newBrochureUrl = editingProperty.brochure;
      if (editingProperty.newBrochure) {
        const filename = `${Date.now()}-${editingProperty.newBrochure.name}`;
        const { data, error } = await supabase.storage
          .from("property-brochures")
          .upload(filename, editingProperty.newBrochure);

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from("property-brochures").getPublicUrl(data.path);

        newBrochureUrl = publicUrl;
      }

      // Update property with new URLs
      // Build clean payload (do NOT send id / temp fields)
      const { id, newImages, newBrochure, created_at, updated_at, ...rest } =
        editingProperty;

      const updatePayload = {
        ...rest,
        images: [
          ...(editingProperty.images || []),
          ...newImageUrls.filter(Boolean), // remove empty strings
        ],
        brochure: newBrochureUrl,
      };

      // Update property with new URLs (id only in WHERE)
      const { error: updateError } = await supabase
        .from("properties")
        .update(updatePayload) // 👈 no id here
        .eq("id", id); // 👈 id only used as filter

      if (updateError) {
        console.error("Update error:", updateError);
        throw updateError;
      }

      // Then fetch the updated record
      const { data: updatedData, error: fetchError } = await supabase
        .from("properties")
        .select("*")
        .eq("id", editingProperty.id)
        .single();

      if (fetchError) {
        console.error("Fetch error:", fetchError);
        throw fetchError;
      }

      // console.log('Updated data:', updatedData); // Debug log

      // Update local state with fresh data
      if (updatedData) {
        setProperties(
          properties.map((p) => (p.id === editingProperty.id ? updatedData : p))
        );
        setIsEditDialogOpen(false);
        alert("Property updated successfully!");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      alert(`Failed to update property: ${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (!propertyToDelete) return;

      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyToDelete.id);

      if (error) throw error;

      setProperties(properties.filter((p) => p.id !== propertyToDelete.id));
      setIsDeleteDialogOpen(false);
      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setEditingProperty(
      (prev) =>
        prev && {
          ...prev,
          newImages: [...(prev.newImages || []), ...newImages],
        }
    );
  };

  const handleBrochureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProperty) {
      setEditingProperty({
        ...editingProperty,
        newBrochure: file,
      });
    }
  };

  const removeExistingImage = (indexToRemove: number) => {
    if (!editingProperty) return;
    setEditingProperty({
      ...editingProperty,
      images: editingProperty.images.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const removeNewImage = (indexToRemove: number) => {
    if (!editingProperty?.newImages) return;

    // Revoke the preview URL to prevent memory leaks
    URL.revokeObjectURL(editingProperty.newImages[indexToRemove].preview);

    setEditingProperty({
      ...editingProperty,
      newImages: editingProperty.newImages.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  useEffect(() => {
    return () => {
      editingProperty?.newImages?.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [editingProperty]);

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
        <DialogContent className="xl:max-w-2xl h-full w-full ">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          {editingProperty && (
            <form
              onSubmit={handleUpdate}
              className="space-y-4 overflow-y-scroll"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name</Label>
                  <Input
                    id="name"
                    value={editingProperty.name}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editingProperty.location}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={editingProperty.price}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Input
                    id="type"
                    value={editingProperty.type}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        type: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="developer">Developer</Label>
                  <Input
                    id="developer"
                    value={editingProperty.developer}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        developer: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="configuration">Configuration</Label>
                  <Input
                    id="configuration"
                    value={editingProperty.configuration}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        configuration: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beds">Beds</Label>
                  <Input
                    id="beds"
                    type="number"
                    value={editingProperty.beds}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        beds: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baths">Baths</Label>
                  <Input
                    id="baths"
                    type="number"
                    value={editingProperty.baths}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        baths: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="garages">Garages</Label>
                  <Input
                    id="garages"
                    type="number"
                    value={editingProperty.garages}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        garages: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={editingProperty.status}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        status: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="built_up_area">Built-up Area</Label>
                  <Input
                    id="built_up_area"
                    value={editingProperty.built_up_area}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        built_up_area: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingProperty.description}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Youtube URL</Label>
                <Input
                  id="video_url"
                  value={editingProperty.video_url ?? ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      video_url: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="space-y-2">
                  {editingProperty.amenities.map((amenity, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={amenity}
                        onChange={(e) => {
                          const newAmenities = [...editingProperty.amenities];
                          newAmenities[index] = e.target.value;
                          setEditingProperty({
                            ...editingProperty,
                            amenities: newAmenities,
                          });
                        }}
                        placeholder="Enter amenity"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingProperty({
                            ...editingProperty,
                            amenities: editingProperty.amenities.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingProperty({
                      ...editingProperty,
                      amenities: [...editingProperty.amenities, ""],
                    });
                  }}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Amenity
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Current Images</Label>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {editingProperty.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeExistingImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {editingProperty.newImages &&
                  editingProperty.newImages?.length > 0 && (
                    <>
                      <Label>New Images</Label>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {editingProperty.newImages.map((image, index) => (
                          <div key={index} className="relative aspect-square">
                            <img
                              src={image.preview}
                              alt={`New upload ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => removeNewImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="mt-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brochure">Brochure</Label>
                {editingProperty.brochure && (
                  <div className="flex items-center gap-2 mb-2">
                    <a
                      href={editingProperty.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline"
                    >
                      Current Brochure
                    </a>
                  </div>
                )}
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleBrochureUpload}
                />
                {editingProperty.newBrochure && (
                  <p className="text-sm text-gray-500 mt-1">
                    New brochure selected: {editingProperty.newBrochure.name}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {propertyToDelete?.name}. This action
              cannot be undone.
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
