import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center">
        {/* Top Header */}
        <div className="w-full flex justify-between items-center text-white mb-3 px-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#38BDF8]" />
            <span className="serif font-semibold text-sm md:text-base truncate text-white">{title}</span>
            <span className="text-xs bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full text-sky-200 font-mono">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Stage */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-black/70 rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl">
          <img
            src={images[currentIndex]}
            alt={`${title} - image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-[#0284C7] hover:text-white text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl border border-white/15"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-[#0284C7] hover:text-white text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl border border-white/15"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails row */}
        {images.length > 1 && (
          <div className="flex gap-2.5 mt-4 overflow-x-auto max-w-full px-2 py-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-[#38BDF8] scale-105 shadow-xl'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
