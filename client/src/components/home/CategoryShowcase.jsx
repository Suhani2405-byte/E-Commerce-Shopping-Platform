import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, Shirt, Home, Sparkles, Dumbbell, BookOpen } from 'lucide-react';
import { useAIBehavior } from '../../context/AIBehaviorContext';

const CATEGORIES = [
  {
    name: 'Electronics',
    count: '10 Items',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    name: 'Fashion',
    count: '10 Items',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    color: 'from-purple-600 to-pink-600'
  },
  {
    name: 'Home & Living',
    count: '10 Items',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=600&q=80',
    color: 'from-amber-600 to-orange-600'
  },
  {
    name: 'Beauty',
    count: '8 Items',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    color: 'from-rose-600 to-pink-500'
  },
  {
    name: 'Sports & Fitness',
    count: '6 Items',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    name: 'Books',
    count: '6 Items',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
    color: 'from-cyan-600 to-blue-600'
  }
];

export const CategoryShowcase = () => {
  const { trackCategoryVisit } = useAIBehavior();

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase tracking-widest mb-1.5">
            <span>Curated Collections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore by Category
          </h2>
        </div>
        <Link
          to="/products"
          className="mt-3 sm:mt-0 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1"
        >
          <span>All 50 Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              onClick={() => trackCategoryVisit(cat.name)}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col items-center text-center overflow-hidden hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Image Avatar */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-3 shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-30 group-hover:opacity-10 transition-opacity`} />
              </div>

              {/* Title & Count */}
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-slate-400 font-medium mt-0.5">
                {cat.count}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
