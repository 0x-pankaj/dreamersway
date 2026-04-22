"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryLightboxProps {
  images: string[];
  collegeName: string;
}

export default function GalleryLightbox({ images, collegeName }: GalleryLightboxProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={img}
                alt={`${collegeName} gallery ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden bg-black/95 border-none">
          <DialogHeader className="absolute top-4 left-4 right-4 z-10">
            <DialogTitle className="text-white text-sm font-medium opacity-80">
              {collegeName} — Image {currentIndex + 1} of {images.length}
            </DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <Image
              src={images[currentIndex]}
              alt={`${collegeName} gallery ${currentIndex + 1}`}
              fill
              className="object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
