import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2,
  Heart
} from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders over $99 storewide</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free 100% money back</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">256-Bit Encrypted</h4>
              <p className="text-xs text-slate-400 mt-0.5">Bank-grade checkout security</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Live expert shopping assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">ShopVibe</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The intelligent, next-generation shopping platform. We combine curated premium essentials with real-time AI behavioral insights for a tailored shopping journey.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="text-sm font-bold text-white mb-2">Subscribe to Insider Perks</h5>
              {isSubscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold bg-emerald-950/40 p-3 rounded-xl border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You're subscribed! Use coupon <strong>SAVE20</strong> today.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-l-xl focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-r-xl text-sm font-bold transition flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products?category=Electronics" className="hover:text-white transition">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="hover:text-white transition">Fashion & Apparel</Link></li>
              <li><Link to="/products?category=Home%20%26%20Living" className="hover:text-white transition">Home & Living</Link></li>
              <li><Link to="/products?category=Beauty" className="hover:text-white transition">Beauty & Skincare</Link></li>
              <li><Link to="/products?category=Sports%20%26%20Fitness" className="hover:text-white transition">Sports & Fitness</Link></li>
              <li><Link to="/products?category=Books" className="hover:text-white transition">Books & Stationery</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products" className="hover:text-white transition">All 50 Products</Link></li>
              <li><Link to="/ai-dashboard" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">AI Behavior Dashboard</Link></li>
              <li><Link to="/orders" className="hover:text-white transition">Order History</Link></li>
              <li><Link to="/blogs" className="hover:text-white transition">Buying Guides & Blogs</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact & FAQ</Link></li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="text-slate-400">Toll Free: 1-800-SHOPVIBE</span></li>
              <li><span className="text-slate-400">support@shopvibe.io</span></li>
              <li><Link to="/contact" className="hover:text-white transition">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Track Your Package</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Payments */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} ShopVibe Inc. All rights reserved. Built with React.js & Node.js MERN Stack.
        </div>
        <div className="flex items-center space-x-3 text-slate-400 text-sm font-semibold">
          <span className="px-2 py-1 bg-slate-800 rounded">VISA</span>
          <span className="px-2 py-1 bg-slate-800 rounded">Mastercard</span>
          <span className="px-2 py-1 bg-slate-800 rounded">Amex</span>
          <span className="px-2 py-1 bg-slate-800 rounded">Apple Pay</span>
          <span className="px-2 py-1 bg-slate-800 rounded">PayPal</span>
          <span className="px-2 py-1 bg-slate-800 rounded">UPI</span>
        </div>
      </div>
    </footer>
  );
};
