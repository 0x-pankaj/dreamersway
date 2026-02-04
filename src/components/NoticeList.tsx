"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, ArrowRight, Download, Eye, FileText, X } from 'lucide-react';
import { Notice } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface NoticeListProps {
    notices: Notice[];
    compact?: boolean; // If true, show simplified version for home page
}

type FileType = 'image' | 'pdf' | 'other' | null;

function getFileType(url: string | undefined): FileType {
    if (!url) return null;
    // Remove query parameters if present
    const cleanUrl = url.split('?')[0];
    const ext = cleanUrl.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'ico'].includes(ext || '')) {
        return 'image';
    }
    if (ext === 'pdf') {
        return 'pdf';
    }
    return 'other';
}

function getFileName(url: string): string {
    return url.split('/').pop() || 'attachment';
}

export default function NoticeList({ notices, compact = false }: NoticeListProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewType, setPreviewType] = useState<FileType>(null);

    const handlePreview = (url: string) => {
        const type = getFileType(url);
        setPreviewType(type);
        setPreviewUrl(url);
    };

    const handleDownload = async (url: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = getFileName(url);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            // Fallback: open in new tab
            window.open(url, '_blank');
        }
    };

    if (notices.length === 0) {
        return (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-200 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400">No active notices at the moment.</p>
            </div>
        );
    }

    if (compact) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-yellow-500 flex items-center">
                        <Bell className="w-5 h-5 mr-2 text-primary fill-primary/20" />
                        Latest Notices
                    </h3>
                    <Link href="/notices" className="text-sm text-primary hover:underline flex items-center">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="space-y-4">
                    {notices.slice(0, 4).map((notice) => (
                        <div key={notice.id} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors border-b border-gray-50 last:border-0">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary">
                                <span className="text-xs font-bold uppercase">{new Date(notice.publish_date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-sm font-bold">{new Date(notice.publish_date).getDate()}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                    {notice.title}
                                </h4>
                                {notice.is_important && (
                                    <span className="inline-block mt-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                        URGENT
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Full view
    return (
        <>
            <div className="space-y-4">
                {notices.map((notice) => {
                    const fileType = getFileType(notice.attachment_url);

                    // Debug logging
                    if (notice.attachment_url) {
                        console.log('📄 Notice attachment URL:', notice.attachment_url);
                        console.log('📄 Detected file type:', fileType);
                    }

                    return (
                        <div key={notice.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Date */}
                                <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 w-full md:w-24 text-center">
                                    <span className="text-2xl font-bold text-primary">{new Date(notice.publish_date).getDate()}</span>
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase ml-2 md:ml-0">{new Date(notice.publish_date).toLocaleString('default', { month: 'long' })}</span>
                                    <span className="text-xs text-gray-400 ml-2 md:ml-0">{new Date(notice.publish_date).getFullYear()}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            {notice.is_important && (
                                                <span className="inline-block mb-2 text-xs font-bold text-white bg-red-500 px-2 py-1 rounded">
                                                    IMPORTANT NOTICE
                                                </span>
                                            )}
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{notice.title}</h3>
                                        </div>
                                    </div>

                                    {notice.content && (
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                                            {notice.content}
                                        </p>
                                    )}

                                    {/* Attachment Preview & Actions */}
                                    {notice.attachment_url && (
                                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            {/* Image Preview Thumbnail */}
                                            {fileType === 'image' && (
                                                <div className="mb-3">
                                                    <div
                                                        className="relative w-full max-w-xs h-40 rounded-lg overflow-hidden cursor-pointer group"
                                                        onClick={() => handlePreview(notice.attachment_url!)}
                                                    >
                                                        <Image
                                                            src={notice.attachment_url}
                                                            alt={notice.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Eye className="w-8 h-8 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* PDF Indicator */}
                                            {fileType === 'pdf' && (
                                                <div className="flex items-center gap-3 mb-3 p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                                                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">PDF Document</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-300">{getFileName(notice.attachment_url)}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePreview(notice.attachment_url!)}
                                                    className="text-primary"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Preview
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => handleDownload(notice.attachment_url!, e)}
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Preview Modal */}
            <Dialog open={!!previewUrl} onOpenChange={(open) => !open && setPreviewUrl(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Attachment Preview</DialogTitle>
                        <DialogDescription className="sr-only">
                            Preview of the selected attachment
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {previewType === 'image' && previewUrl && (
                            <div className="relative w-full aspect-auto">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        )}
                        {previewType === 'pdf' && previewUrl && (
                            <iframe
                                src={previewUrl}
                                className="w-full h-[70vh] rounded-lg border"
                                title="PDF Preview"
                            />
                        )}
                        {previewType === 'other' && previewUrl && (
                            <div className="text-center py-10">
                                <p className="text-gray-600 dark:text-gray-300 mb-4">This file type cannot be previewed directly.</p>
                                <a
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Open in new tab
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={(e) => previewUrl && handleDownload(previewUrl, e)}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
