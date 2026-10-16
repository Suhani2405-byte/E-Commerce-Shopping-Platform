import React, { useEffect, useState } from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromoBanner } from '../components/home/PromoBanner';
import { TrendingSection } from '../components/home/TrendingSection';
import { api } from '../services/api';
import { products as fallbackProducts } from '../data/mockProducts';

export const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadHomeData = async () => {
      try {
        const [feat, trend] = await Promise.all([
          api.getFeaturedProducts(),
          api.getTrendingProducts()
        ]);
        setFeatured(feat || fallbackProducts.filter(p => p.isFeatured).slice(0, 8));
        setTrending(trend || fallbackProducts.filter(p => p.isTrending).slice(0, 8));
      } catch (e) {
        setFeatured(fallbackProducts.filter(p => p.isFeatured).slice(0, 8));
        setTrending(fallbackProducts.filter(p => p.isTrending).slice(0, 8));
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-6 pb-16">
      {/* Hero Banner with Carousel */}
      <HeroBanner />

      {/* Category Discovery */}
      <CategoryShowcase />

      {/* Featured Products */}
      <FeaturedProducts products={featured} />

      {/* Limited Time Offers & Countdown */}
      <PromoBanner />

      {/* Trending Products */}
      <TrendingSection products={trending} />
    </div>
  );
};
