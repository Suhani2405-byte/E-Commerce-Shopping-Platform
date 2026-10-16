import React, { useState } from 'react';
import { Tag, Check, X, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const OrderSummarySection = ({ onPlaceOrder, isSubmitting }) => {
  const {
    cart,
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
    availableCoupons
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
      </h3>

      {/* Cart Items Preview */}
      <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
            className="flex items-center space-x-3 text-xs"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate">
                {item.name}
              </h4>
              <p className="text-slate-400">
                Qty: {item.quantity} • {item.selectedColor}
              </p>
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Coupon UI */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Promotional Code
        </label>
        {coupon ? (
          <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-2.5 rounded-xl text-xs text-emerald-800 dark:text-emerald-200">
            <div className="flex items-center space-x-1.5 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Coupon <strong>{coupon.code}</strong> Applied ({coupon.label})</span>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 hover:text-rose-500 transition"
              title="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex space-x-2">
            <input
              type="text"
              placeholder="e.g. SAVE20"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs uppercase font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 rounded-xl transition"
            >
              Apply
            </button>
          </form>
        )}
        {couponError && (
          <p className="text-[11px] text-rose-500 font-semibold">{couponError}</p>
        )}
      </div>

      {/* Cost Breakdown */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
            <span>Discount ({coupon?.code})</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {isFreeShipping ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">${tax.toFixed(2)}</span>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline text-base font-black text-slate-900 dark:text-white">
          <span>Order Total</span>
          <span className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Place Order CTA */}
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={isSubmitting || cart.length === 0}
        className={`w-full py-4 rounded-2xl font-extrabold text-sm shadow-xl flex items-center justify-center space-x-2 transition active:scale-98 ${
          isSubmitting || cart.length === 0
            ? 'bg-slate-400 text-white cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing Order Securely...</span>
          </>
        ) : (
          <>
            <span>Place Order — ${total.toFixed(2)}</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Guaranteed Safe & Secure 256-bit SSL Checkout</span>
      </div>
    </div>
  );
};
