import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, Copy, Check, ArrowRight, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const PromoBanner = () => {
  const { applyCoupon } = useCart();
  const [copied, setCopied] = useState(false);

  // 14 hours countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SAVE20');
    applyCoupon('SAVE20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-indigo-800/50">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-rose-400" />
              <span>Limited Flash Deal</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Get an Extra <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">20% Off</span> Storewide
            </h2>

            <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
              Elevate your lifestyle with premium sound, ergonomics, apparel, and skincare. Discount applies automatically at checkout or copy the coupon below.
            </p>

            {/* Promo Code Chip */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyCode}
                className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center space-x-2 text-sm font-mono font-bold transition group"
                title="Click to copy and apply discount"
              >
                <Tag className="w-4 h-4 text-amber-300" />
                <span className="text-white tracking-widest">SAVE20</span>
                {copied ? (
                  <span className="text-xs text-emerald-400 font-sans flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> Applied!
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                )}
              </button>

              <Link
                to="/products"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg transition flex items-center space-x-1.5"
              >
                <span>Shop Deals Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Countdown Box */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="bg-slate-950/70 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl text-center shadow-2xl max-w-sm w-full">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-widest mb-4">
                <Clock className="w-4 h-4" />
                <span>Offer Expires In</span>
              </div>

              {/* Countdown Digits */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 mt-1">
                    Hours
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 mt-1">
                    Minutes
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 mt-1">
                    Seconds
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4">
                Valid on all 50 items. Guaranteed delivery within 3-5 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
