import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAIBehavior } from '../../context/AIBehaviorContext';

export const ProductInfo = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { trackWishlist, trackAddToCart, trackCheckoutIntent } = useAIBehavior();

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    trackAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    trackAddToCart(product);
    trackCheckoutIntent();
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    trackWishlist(product, !isWishlisted);
  };

  return (
    <div className="space-y-6">
      {/* Brand & Stock */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
          {product.brand}
        </span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          product.stock > 0
            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
            : 'bg-rose-50 text-rose-600'
        }`}>
          {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
        </span>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {product.name}
      </h1>

      {/* Ratings */}
      <div className="flex items-center space-x-3 text-sm">
        <div className="flex items-center text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-amber-400'
                  : i < product.rating
                  ? 'fill-amber-400/50'
                  : 'text-slate-300'
              }`}
            />
          ))}
        </div>
        <span className="font-bold text-slate-800 dark:text-slate-200">
          {product.rating}
        </span>
        <span className="text-slate-400">•</span>
        <a href="#reviews" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
          {product.reviewCount} Verified Customer Reviews
        </a>
      </div>

      {/* Pricing */}
      <div className="flex items-baseline space-x-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice > product.price && (
          <>
            <span className="text-lg text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="text-xs font-bold bg-rose-500 text-white px-2.5 py-1 rounded-full">
              Save ${(product.originalPrice - product.price).toFixed(2)} ({product.discount}%)
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {product.description}
      </p>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2.5 pt-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Color: <strong className="text-indigo-600 dark:text-indigo-400">{selectedColor}</strong></span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition ${
                  selectedColor === c.name
                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20"
                  style={{ backgroundColor: c.code }}
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size / Configuration Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Option / Size: <strong className="text-indigo-600 dark:text-indigo-400">{selectedSize}</strong>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  selectedSize === s
                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-600 text-white shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTA Actions */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-2xl p-1 bg-slate-50 dark:bg-slate-800">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-sm text-slate-900 dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : product.stock <= 0
                ? 'bg-slate-400 text-white cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`p-3.5 rounded-2xl border transition active:scale-90 ${
              isWishlisted
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 py-3.5 rounded-2xl font-extrabold text-sm shadow-md transition flex items-center justify-center space-x-2"
        >
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Buy Now with 1-Click Checkout</span>
        </button>
      </div>

      {/* Trust Guarantee Cards */}
      <div className="grid grid-cols-3 gap-3 pt-4 text-center">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
          <Truck className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
          <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200">Express Delivery</span>
          <span className="text-[10px] text-slate-400">3-5 Business Days</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
          <RotateCcw className="w-4 h-4 text-purple-500 mx-auto mb-1" />
          <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200">30-Day Returns</span>
          <span className="text-[10px] text-slate-400">100% Guaranteed</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
          <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200">Authentic Brand</span>
          <span className="text-[10px] text-slate-400">1 Year Warranty</span>
        </div>
      </div>
    </div>
  );
};
