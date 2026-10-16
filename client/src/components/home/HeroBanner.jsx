import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge: '🚀 Next-Gen Audio & Workspaces',
    title: 'Precision Tech Engineered for Deep Focus',
    description: 'Immerse in studio-grade noise-cancelling headphones, high-refresh 4K displays, and acoustic mechanical keyboards tailored for modern creators.',
    ctaText: 'Explore Electronics',
    ctaLink: '/products?category=Electronics',
    bgGradient: 'from-slate-900 via-indigo-950 to-slate-900',
    accentColor: 'text-indigo-400',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
    tag: 'Limited 20% Off with SAVE20'
  },
  {
    id: 2,
    badge: '✨ Heirloom Craftsmanship',
    title: 'Timeless Luxury & Everyday Fashion',
    description: '100% Grade-A Mongolian cashmere sweaters, hand-stitched full-grain lambskin bombers, and vintage shuttle-loom selvedge denim built to last decades.',
    ctaText: 'Shop Fashion',
    ctaLink: '/products?category=Fashion',
    bgGradient: 'from-slate-900 via-purple-950 to-slate-900',
    accentColor: 'text-purple-400',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80',
    tag: 'Sustainable Natural Fibers'
  },
  {
    id: 3,
    badge: '🌿 Mindful Living & Wellness',
    title: 'Create Your Personal Sanctuary',
    description: 'Medical-grade H13 True HEPA purifiers, Scandinavian stoneware ceramic vases, and multi-molecular hydration serums formulated for healthy skin.',
    ctaText: 'Discover Home & Wellness',
    ctaLink: '/products?category=Home%20%26%20Living',
    bgGradient: 'from-slate-900 via-emerald-950 to-slate-900',
    accentColor: 'text-emerald-400',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80',
    tag: 'Clean Design Aesthetics'
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-2xl border border-slate-800">
      <div className={`transition-all duration-700 bg-gradient-to-r ${slide.bgGradient}`}>
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-bold tracking-wide">
              <span>{slide.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={slide.ctaLink}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center space-x-2 transition hover:scale-105 active:scale-95"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ai-dashboard"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl font-bold text-sm backdrop-blur-md border border-white/20 flex items-center space-x-2 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Recommendation Engine</span>
              </Link>
            </div>

            {/* Quick Perks */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs text-slate-400 font-semibold">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>50 Hand-Picked Premium Products</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Real-Time Behavior Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Product Image Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold">
                  {slide.tag}
                </span>
                <span className="text-white/80 font-mono text-[11px]">
                  ShopVibe Verified ★ 4.9
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md transition border border-white/10 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md transition border border-white/10 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
