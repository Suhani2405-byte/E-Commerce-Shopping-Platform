import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Check,
  X,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAIBehavior } from '../context/AIBehaviorContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    tax,
    discountAmount,
    total,
    coupon,
    couponError,
    applyCoupon,
    removeCoupon,
    isFreeShipping,
    freeShippingRemaining
  } = useCart();

  const { trackCheckoutIntent } = useAIBehavior();
  const [couponInput, setCouponInput] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  const handleProceedCheckout = () => {
    trackCheckoutIntent();
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Explore our collection of 50 top-rated gadgets, apparel, and lifestyle essentials.
        </p>
        <Link
          to="/products"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 inline-flex items-center space-x-2 transition"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review your items and proceed to secure checkout
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-500 hover:underline flex items-center space-x-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Meter */}
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/60">
            <div className="flex justify-between text-xs font-bold text-indigo-950 dark:text-indigo-200 mb-2">
              <span>
                {isFreeShipping
                  ? '🎉 You unlocked Free Express Shipping!'
                  : `Add $${freeShippingRemaining.toFixed(2)} more for Free Shipping`}
              </span>
              <span>{Math.min(100, Math.round(((99 - freeShippingRemaining) / 99) * 100))}%</span>
            </div>
            <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round(((99 - freeShippingRemaining) / 99) * 100))}%` }}
              />
            </div>
          </div>

          {/* Items Table/Cards */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {item.brand}
                    </span>
                    <Link
                      to={`/product/${item.id}`}
                      className="block text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Color: {item.selectedColor} • Size: {item.selectedSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                      className="p-1.5 text-slate-500 hover:text-black dark:hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                      className="p-1.5 text-slate-500 hover:text-black dark:hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[80px]">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs">
            <Link to="/products" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Summary
          </h3>

          {/* Coupon */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Apply Promo Code
            </label>
            {coupon ? (
              <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-2.5 rounded-xl text-xs text-emerald-800 dark:text-emerald-200">
                <span className="font-bold">✓ {coupon.code} (-${discountAmount.toFixed(2)})</span>
                <button onClick={removeCoupon} className="p-1 hover:text-rose-500"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="e.g. SAVE20"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs uppercase font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 text-white text-xs font-bold px-4 rounded-xl">
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-rose-500">{couponError}</p>}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Discount ({coupon?.code})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold text-slate-900 dark:text-white">{isFreeShipping ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="font-bold text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline text-base font-black text-slate-900 dark:text-white">
              <span>Total</span>
              <span className="text-2xl text-indigo-600 dark:text-indigo-400">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={handleProceedCheckout}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
