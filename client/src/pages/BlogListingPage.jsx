import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, User, Sparkles, Search } from 'lucide-react';
import { blogs } from '../data/mockBlogs';

export const BlogListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = ['All', 'Productivity', 'Technology', 'Fashion', 'Skincare & Beauty'];

  const filteredBlogs = blogs.filter(b => {
    const matchCat = selectedCategory === 'All' || b.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchQuery = !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ShopVibe Editorial & Guides</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Buying Guides & Thought Leadership
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          In-depth breakdowns on workspace ergonomics, acoustic engineering, sustainable textiles, and derm-grade skincare.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Link to={`/blog/${blog.slug}`}>
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="absolute top-4 left-4">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{blog.date}</span>
                </div>

                <Link to={`/blog/${blog.slug}`}>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition leading-snug">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="p-6 sm:p-8 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src={blog.author?.avatar}
                  alt={blog.author?.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <span className="block text-xs font-bold text-slate-900 dark:text-white">
                    {blog.author?.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {blog.author?.role}
                  </span>
                </div>
              </div>

              <Link
                to={`/blog/${blog.slug}`}
                className="inline-flex items-center space-x-1 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
