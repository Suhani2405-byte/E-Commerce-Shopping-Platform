import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Check, Sparkles } from 'lucide-react';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { ReviewSection } from '../components/product/ReviewSection';
import { ProductCard } from '../components/product/ProductCard';
import { api } from '../services/api';
import { useAIBehavior } from '../context/AIBehaviorContext';
import { products as fallbackProducts } from '../data/mockProducts';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { trackProductView } = useAIBehavior();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'features' | 'shipping'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const loadProduct = async () => {
      setLoading(true);
      try {
        const item = await api.getProductById(id);
        if (item) {
          setProduct(item);
          trackProductView(item);

          // Get similar items from category or tags
          const similar = fallbackProducts
            .filter(p => p.id !== item.id && (p.category === item.category || p.brand === item.brand))
            .slice(0, 4);
          setSimilarProducts(similar);
        }
      } catch (err) {
        console.error('Error loading product details', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-bold text-slate-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Product Not Found</h2>
        <p className="text-sm text-slate-500">The product you are looking for may have been removed or relocated.</p>
        <Link to="/products" className="bg-indigo-600 text-white font-bold text-xs px-6 py-3 rounded-xl inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-indigo-600 transition">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Specifications & Features Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3.5 border-b-2 transition ${
              activeTab === 'specs'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3.5 border-b-2 transition ${
              activeTab === 'features'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Key Highlights & Features
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3.5 border-b-2 transition ${
              activeTab === 'shipping'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Shipping & Warranty
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.specifications ? (
              Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                  <span className="font-bold text-slate-500">{key}:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{val}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">Specifications standard to {product.brand}.</p>
            )}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-3">
            {product.features && product.features.length > 0 ? (
              product.features.map((feat, i) => (
                <div key={i} className="flex items-start space-x-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">Features curated for optimal usability.</p>
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white">Express Delivery</h4>
              <p className="text-slate-500 dark:text-slate-400">Dispatched within 24 hours. Tracked delivery in 3 to 5 business days.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white">30-Day Returns</h4>
              <p className="text-slate-500 dark:text-slate-400">If you are not 100% satisfied, return in original box for full refund.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white">Manufacturer Warranty</h4>
              <p className="text-slate-500 dark:text-slate-400">Includes 1-Year authentic manufacturer defect coverage.</p>
            </div>
          </div>
        )}
      </div>

      {/* Customer Reviews Section */}
      <ReviewSection product={product} />

      {/* Similar AI Recommended Products */}
      {similarProducts.length > 0 && (
        <div className="pt-8 space-y-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Recommended Similar Items
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
