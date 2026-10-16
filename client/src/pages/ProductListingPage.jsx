import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Sparkles
} from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { api } from '../services/api';

export const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Extract query filters from URL
  const q = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || 'All';
  const selectedBrand = searchParams.get('brand') ? searchParams.get('brand').split(',') : [];
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 2500;
  const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : 0;
  const inStock = searchParams.get('inStock') === 'true';
  const sort = searchParams.get('sort') || 'default';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Fetch categories & brands once
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [cats, brs] = await Promise.all([
          api.getCategories(),
          api.getBrands()
        ]);
        setCategories(cats || []);
        setBrands(brs || []);
      } catch (e) {
        console.warn('Metadata fetch error', e);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch filtered products whenever searchParams change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({
          q,
          category: selectedCategory === 'All' ? '' : selectedCategory,
          brand: selectedBrand,
          maxPrice,
          minRating,
          inStock,
          sort,
          page,
          limit: 12
        });

        setProducts(res.products || []);
        setTotalCount(res.total || 0);
        setTotalPages(res.totalPages || 1);
      } catch (err) {
        console.error('Products fetch error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  }, [searchParams]);

  // Update query params helper
  const updateQuery = (newParams) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '' || v === 'All' || v === 0 || v === false) {
        next.delete(k);
      } else if (Array.isArray(v)) {
        if (v.length === 0) next.delete(k);
        else next.set(k, v.join(','));
      } else {
        next.set(k, v);
      }
    });
    // Reset to page 1 on filter changes if page wasn't explicitly changed
    if (!('page' in newParams)) {
      next.delete('page');
    }
    setSearchParams(next);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const handleToggleBrand = (brandName) => {
    let nextBrands;
    if (selectedBrand.includes(brandName)) {
      nextBrands = selectedBrand.filter(b => b !== brandName);
    } else {
      nextBrands = [...selectedBrand, brandName];
    }
    updateQuery({ brand: nextBrands });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
            <span>Explore Catalog</span>
            <span>•</span>
            <span>{totalCount} Total Items</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {selectedCategory !== 'All' ? selectedCategory : q ? `Search results for "${q}"` : 'All Products'}
          </h1>
        </div>

        {/* Sorting & View Controls */}
        <div className="flex items-center space-x-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <select
            value={sort}
            onChange={(e) => updateQuery({ sort: e.target.value })}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 px-3.5 rounded-2xl shadow-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="default">Sort by: Featured & Relevance</option>
            <option value="popular">Most Popular (Reviews)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated</option>
            <option value="newest">New Arrivals</option>
          </select>

          {/* Grid / List Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedCategory !== 'All' || selectedBrand.length > 0 || q || maxPrice < 2500 || minRating > 0 || inStock) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-400 mr-1">Active:</span>

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center space-x-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
              <span>Category: {selectedCategory}</span>
              <button onClick={() => updateQuery({ category: 'All' })}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {q && (
            <span className="inline-flex items-center space-x-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
              <span>Search: "{q}"</span>
              <button onClick={() => updateQuery({ q: '' })}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {selectedBrand.map(b => (
            <span key={b} className="inline-flex items-center space-x-1 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
              <span>Brand: {b}</span>
              <button onClick={() => handleToggleBrand(b)}><X className="w-3 h-3 ml-1" /></button>
            </span>
          ))}

          {maxPrice < 2500 && (
            <span className="inline-flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
              <span>Under ${maxPrice}</span>
              <button onClick={() => updateQuery({ maxPrice: 2500 })}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {minRating > 0 && (
            <span className="inline-flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
              <span>{minRating}★ & Above</span>
              <button onClick={() => updateQuery({ minRating: 0 })}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {inStock && (
            <span className="inline-flex items-center space-x-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
              <span>In Stock Only</span>
              <button onClick={() => updateQuery({ inStock: false })}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          <button
            onClick={handleClearFilters}
            className="text-xs font-extrabold text-rose-500 hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <FilterSidebar
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => updateQuery({ category: cat })}
              selectedBrands={selectedBrand}
              onToggleBrand={handleToggleBrand}
              priceRange={{ min: 0, max: maxPrice }}
              onPriceChange={(p) => updateQuery({ maxPrice: p.max })}
              minRating={minRating}
              onRatingChange={(r) => updateQuery({ minRating: r })}
              inStockOnly={inStock}
              onToggleInStock={(val) => updateQuery({ inStock: val })}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try loosening your search filters or resetting to view our full collection of 50 items.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => updateQuery({ page: Math.max(1, page - 1) })}
                disabled={page <= 1}
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                  page <= 1
                    ? 'border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-1 text-xs font-bold">
                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => updateQuery({ page: pNum })}
                      className={`w-9 h-9 rounded-xl transition ${
                        page === pNum
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => updateQuery({ page: Math.min(totalPages, page + 1) })}
                disabled={page >= totalPages}
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                  page >= totalPages
                    ? 'border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white dark:bg-slate-900 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Filter Products</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterSidebar
                categories={categories}
                brands={brands}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  updateQuery({ category: cat });
                  setIsMobileFilterOpen(false);
                }}
                selectedBrands={selectedBrand}
                onToggleBrand={handleToggleBrand}
                priceRange={{ min: 0, max: maxPrice }}
                onPriceChange={(p) => updateQuery({ maxPrice: p.max })}
                minRating={minRating}
                onRatingChange={(r) => updateQuery({ minRating: r })}
                inStockOnly={inStock}
                onToggleInStock={(val) => updateQuery({ inStock: val })}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
