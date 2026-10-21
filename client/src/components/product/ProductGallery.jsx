import React, { useState } from 'react';

export const ProductGallery = ({ images = [], productName = '' }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const fallback = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
  const currentImage = images[selectedIdx] || images[0] || fallback;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-sm group">
        <img
          src={currentImage}
          alt={productName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                selectedIdx === idx
                  ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/20 scale-95 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:border-slate-300'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallback;
                }}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
