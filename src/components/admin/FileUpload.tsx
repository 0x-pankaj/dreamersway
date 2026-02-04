"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud, X, FileText, CheckCircle, File } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
    bucket?: string;
    accept?: string; // e.g. "image/*,application/pdf"
}

type FileType = 'image' | 'pdf' | 'other';

function getFileType(url: string): FileType {
    const ext = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
        return 'image';
    }
    if (ext === 'pdf') {
        return 'pdf';
    }
    return 'other';
}

export default function FileUpload({
    label,
    value,
    onChange,
    bucket = 'images',
    accept = "image/*,application/pdf"
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setUploadSuccess(false);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select a file to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

            console.log('📸 Image uploaded to Supabase:', data.publicUrl);
            onChange(data.publicUrl);
            setUploadSuccess(true);

            // Clear success message after 3 seconds
            setTimeout(() => setUploadSuccess(false), 3000);
        } catch (error) {
            alert('Error uploading file!');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange('');
        setUploadSuccess(false);
    };

    const fileType = value ? getFileType(value) : null;

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            {!value ? (
                <div className="space-y-2">
                    <Input
                        type="file"
                        accept={accept}
                        onChange={handleUpload}
                        disabled={uploading}
                        className="hidden"
                        id={`upload-${label.replace(/\s+/g, '-')}`}
                    />
                    <Label
                        htmlFor={`upload-${label.replace(/\s+/g, '-')}`}
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex flex-col items-center space-y-2 text-gray-500">
                            {uploading ? (
                                <Loader2 className="w-8 h-8 animate-spin" />
                            ) : (
                                <UploadCloud className="w-8 h-8" />
                            )}
                            <span className="text-sm font-medium">
                                {uploading ? "Uploading..." : "Click to upload image or PDF"}
                            </span>
                        </div>
                    </Label>
                </div>
            ) : (
                <div className="space-y-2">
                    {/* Success Indicator */}
                    {uploadSuccess && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Uploaded successfully!</span>
                        </div>
                    )}

                    {/* File Preview */}
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                        {fileType === 'image' ? (
                            <div className="relative w-full h-48">
                                <Image src={value} alt="Uploaded" fill className="object-cover" />
                            </div>
                        ) : fileType === 'pdf' ? (
                            <div className="flex items-center gap-4 p-4 bg-gray-50">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        PDF Document
                                    </p>
                                    <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Click to preview
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 p-4 bg-gray-50">
                                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <File className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        File uploaded
                                    </p>
                                    <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Click to view
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Remove Button */}
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
                </div>
            )}
        </div>
    );
}
