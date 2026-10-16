import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ChevronLeft, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { blogs } from '../data/mockBlogs';
import { products as allProducts } from '../data/mockProducts';
import { ProductCard } from '../components/product/ProductCard';

export const BlogDetailPage = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const blog = blogs.find(b => b.slug === slug) || blogs[0];

  // Related products referenced in the article
  const featuredProducts = (blog.relatedProductIds || [])
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean);

  const otherBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/blogs"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-xs font-bold">
          <span className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-400 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.readTime}</span>
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-400">{blog.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {blog.title}
        </h1>

        {/* Author Bio Card */}
        <div className="flex items-center space-x-3.5 pt-2">
          <img
            src={blog.author?.avatar}
            alt={blog.author?.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/20"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {blog.author?.name}
            </h4>
            <p className="text-xs text-slate-400">{blog.author?.role}</p>
          </div>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
        <p className="text-lg font-medium text-slate-900 dark:text-white italic leading-relaxed border-l-4 border-indigo-600 pl-4 py-1">
          {blog.excerpt}
        </p>

        <div className="whitespace-pre-line space-y-4">
          {blog.content}
        </div>
      </div>

      {/* Featured Products Mentioned in Article */}
      {featuredProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Featured Gear in this Guide
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Available on ShopVibe</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* More Articles */}
      <div className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">More Guides from the Editorial Desk</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherBlogs.map((b) => (
            <Link
              key={b.id}
              to={`/blog/${b.slug}`}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition flex items-center space-x-3"
            >
              <img src={b.coverImage} alt={b.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">{b.category}</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2">{b.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
