"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, ArrowRight, Download, Eye, FileText, Pin } from 'lucide-react';
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
    compact?: boolean;
}

type FileType = 'image' | 'pdf' | 'other' | null;

function getFileType(url: string | undefined): FileType {
    if (!url) return null;
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
            window.open(url, '_blank');
        }
    };

    if (notices.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">No active notices at the moment.</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Check back later for updates.</p>
            </div>
        );
    }

    if (compact) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center font-mont">
                        <Bell className="w-5 h-5 mr-2 text-primary" />
                        Latest Notices
                    </h3>
                    <Link href="/notices" className="text-sm text-primary hover:text-primary/80 font-semibold flex items-center transition-colors">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="space-y-3">
                    {notices.slice(0, 4).map((notice) => (
                        <div key={notice.id} className={`group flex items-start gap-4 p-3 rounded-xl transition-all duration-200 border-l-4 ${
                            notice.is_important
                                ? 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20'
                                : 'border-l-primary bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}>
                            <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center text-primary shadow-sm">
                                <span className="text-xs font-bold uppercase">{new Date(notice.publish_date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-sm font-black">{new Date(notice.publish_date).getDate()}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                    {notice.title}
                                </h4>
                                {notice.is_important && (
                                    <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
                                        <Pin className="w-3 h-3" />
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

    return (
        <>
            <div className="space-y-4">
                {notices.map((notice) => {
                    const fileType = getFileType(notice.attachment_url);

                    return (
                        <div key={notice.id} className={`bg-white dark:bg-gray-900 p-6 rounded-xl border hover:shadow-md transition-all duration-300 ${
                            notice.is_important
                                ? 'border-l-4 border-l-red-500 border-red-100 dark:border-red-900/30'
                                : 'border-l-4 border-l-primary border-gray-100 dark:border-gray-800'
                        }`}>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl p-4 w-full md:w-24 text-center shadow-sm">
                                    <span className="text-2xl font-black text-primary">{new Date(notice.publish_date).getDate()}</span>
                                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase ml-2 md:ml-0">{new Date(notice.publish_date).toLocaleString('default', { month: 'long' })}</span>
                                    <span className="text-xs text-gray-400 ml-2 md:ml-0">{new Date(notice.publish_date).getFullYear()}</span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            {notice.is_important && (
                                                <span className="inline-flex items-center gap-1 mb-2 text-xs font-bold text-white bg-red-500 px-3 py-1 rounded-full">
                                                    <Pin className="w-3 h-3" />
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

                                    {notice.attachment_url && (
                                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                            {fileType === 'image' && (
                                                <div className="mb-3">
                                                    <div
                                                        className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden cursor-pointer group"
                                                        onClick={() => handlePreview(notice.attachment_url!)}
                                                    >
                                                        <Image
                                                            src={notice.attachment_url}
                                                            alt={notice.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Eye className="w-8 h-8 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {fileType === 'pdf' && (
                                                <div className="flex items-center gap-3 mb-3 p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                                                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">PDF Document</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-300">{getFileName(notice.attachment_url)}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePreview(notice.attachment_url!)}
                                                    className="text-primary border-primary/20 hover:bg-primary/5"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Preview
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => handleDownload(notice.attachment_url!, e)}
                                                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                                    className="text-primary hover:underline font-medium"
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
