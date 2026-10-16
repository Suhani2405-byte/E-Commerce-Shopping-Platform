import React from 'react';
import { Star, RotateCcw, Check } from 'lucide-react';

export const FilterSidebar = ({
  categories = [],
  brands = [],
  selectedCategory = 'All',
  onSelectCategory,
  selectedBrands = [],
  onToggleBrand,
  priceRange = { min: 0, max: 2500 },
  onPriceChange,
  minRating = 0,
  onRatingChange,
  inStockOnly = false,
  onToggleInStock,
  onClearFilters
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('All')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price Range</h4>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
            Up to ${priceRange.max}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="2500"
          step="10"
          value={priceRange.max}
          onChange={(e) => onPriceChange({ ...priceRange, max: Number(e.target.value) })}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
          <span>$10</span>
          <span>$1,000</span>
          <span>$2,500</span>
        </div>
      </div>

      {/* Customer Rating */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Minimum Rating</h4>
        <div className="space-y-1.5">
          {[
            { value: 4.8, label: '4.8 ★ & Above' },
            { value: 4.5, label: '4.5 ★ & Above' },
            { value: 4.0, label: '4.0 ★ & Above' },
            { value: 0, label: 'All Ratings' }
          ].map((r) => (
            <button
              key={r.value}
              onClick={() => onRatingChange(r.value)}
              className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                minRating === r.value
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Brands</h4>
        <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
          {brands.map((b) => {
            const isChecked = selectedBrands.includes(b);
            return (
              <label
                key={b}
                onClick={() => onToggleBrand(b)}
                className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{b}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
