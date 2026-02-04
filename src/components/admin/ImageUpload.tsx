"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
    bucket?: string;
}

export default function ImageUpload({ label, value, onChange, bucket = 'images' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

            onChange(data.publicUrl);
        } catch (error) {
            alert('Error uploading image!');
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            {!value ? (
                <div className="flex items-center gap-4">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="hidden"
                        id={`upload-${label}`}
                    />
                    <Label
                        htmlFor={`upload-${label}`}
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex flex-col items-center space-y-2 text-gray-500">
                            {uploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <UploadCloud className="w-8 h-8" />}
                            <span className="text-sm font-medium">{uploading ? "Uploading..." : "Click to upload image"}</span>
                        </div>
                    </Label>
                </div>
            ) : (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                    <Image src={value} alt="Uploaded" fill className="object-cover" />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={handleRemove}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
