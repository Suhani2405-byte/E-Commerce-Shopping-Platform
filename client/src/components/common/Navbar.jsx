import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Tag,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAIBehavior } from '../../context/AIBehaviorContext';
import { useTheme } from '../../context/ThemeContext';
import { products } from '../../data/mockProducts';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { trackSearch, insights } = useAIBehavior();
  const { darkMode, toggleTheme } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const categoryMenuRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoryMenuOpen(false);
  }, [location.pathname]);

  // Click outside listener for search & category menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search autocomplete
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    ).slice(0, 5);
    setSearchResults(matches);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    trackSearch(searchQuery);
    setIsSearchOpen(false);
    navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectResult = (productId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const categories = [
    { name: 'Electronics', count: 10, icon: '⚡' },
    { name: 'Fashion', count: 10, icon: '✨' },
    { name: 'Home & Living', count: 10, icon: '🏡' },
    { name: 'Beauty', count: 8, icon: '🌿' },
    { name: 'Sports & Fitness', count: 6, icon: '🏃' },
    { name: 'Books', count: 6, icon: '📚' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-medium py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Special</span>
            <span>Free Express Shipping on Orders Over $99</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center space-x-3">
            <span>Use Code <strong className="font-extrabold underline decoration-white/40">SAVE20</strong> for 20% Off!</span>
            <Link to="/ai-dashboard" className="hidden md:inline-flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-[11px] transition">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI Insights Active</span>
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-white/80">
            <Link to="/about" className="hover:text-white">Our Story</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white">Support</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-600 dark:from-white dark:via-slate-200 dark:to-indigo-400 bg-clip-text text-transparent">
                  ShopVibe
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-indigo-600 dark:text-indigo-400 -mt-1 flex items-center gap-1">
                  AI-Powered
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname === '/'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>

            {/* Category Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                    Browse 6 Collections
                  </div>
                  {categories.map(cat => (
                    <Link
                      key={cat.name}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 transition"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-base">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
                    <Link
                      to="/products"
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>View All 50 Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/products"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname === '/products'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Products
            </Link>

            <Link
              to="/ai-dashboard"
              className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-1.5 ${
                location.pathname === '/ai-dashboard'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>AI Dashboard</span>
              {insights?.intentScore ? (
                <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                  {insights.intentScore}%
                </span>
              ) : null}
            </Link>

            <Link
              to="/blogs"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname.startsWith('/blog')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Guides & Blog
            </Link>

            <Link
              to="/orders"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname === '/orders'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              My Orders
            </Link>
          </nav>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="flex-1 max-w-xs md:max-w-sm lg:max-w-md relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search 50 products, brands, tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-10 pr-10 py-2 sm:py-2.5 text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-full border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Live Autocomplete Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-50">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                  Matching Products
                </div>
                {searchResults.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelectResult(prod.id)}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {prod.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {prod.category} • <strong className="text-indigo-600 dark:text-indigo-400">${prod.price.toFixed(2)}</strong>
                      </p>
                    </div>
                  </button>
                ))}
                <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1.5 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline py-1"
                  >
                    View all results for "{searchQuery}" →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Theme"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="View Wishlist"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 transition active:scale-95"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-white text-indigo-600 rounded-full px-2 py-0.5 text-xs font-extrabold">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              All 50 Products
            </Link>
            <Link
              to="/ai-dashboard"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>AI Customer Dashboard</span>
              </div>
              <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                {insights?.intentScore || 15}%
              </span>
            </Link>
            <Link
              to="/orders"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              My Orders & History
            </Link>
            <Link
              to="/blogs"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Buying Guides & Articles
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              About ShopVibe
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Contact Us & Support
            </Link>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
              Explore Collections
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(c => (
                <Link
                  key={c.name}
                  to={`/products?category=${encodeURIComponent(c.name)}`}
                  className="flex items-center space-x-2 p-2 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <span>{c.icon}</span>
                  <span className="truncate">{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
