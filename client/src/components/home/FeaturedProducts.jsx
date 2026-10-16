import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';

export const FeaturedProducts = ({ products = [] }) => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Hand-Selected Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Products
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Top-rated devices, lifestyle essentials, and apparel with verified reviews.
          </p>
        </div>

        <Link
          to="/products"
          className="mt-3 sm:mt-0 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1"
        >
          <span>Browse All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
