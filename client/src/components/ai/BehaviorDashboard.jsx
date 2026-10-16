import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  TrendingUp,
  RotateCcw,
  Eye,
  Search,
  Heart,
  ShoppingBag,
  Target,
  ArrowRight,
  BrainCircuit,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { useAIBehavior } from '../../context/AIBehaviorContext';
import { ProductCard } from '../product/ProductCard';

export const BehaviorDashboard = () => {
  const {
    insights,
    recommendations,
    simulatePreset,
    resetBehavior,
    isSyncing
  } = useAIBehavior();

  if (!insights) {
    return (
      <div className="py-20 text-center space-y-3">
        <Sparkles className="w-8 h-8 text-indigo-500 animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          Analyzing user interaction vectors...
        </p>
      </div>
    );
  }

  const {
    intentScore,
    intentTier,
    intentDescription,
    intentColor,
    categoryBreakdown,
    topCategories,
    topTags,
    frequentlyViewed,
    recentTimeline,
    eventCounts,
    summaryText
  } = insights;

  const eventIcons = {
    product_view: Eye,
    search: Search,
    category_visit: Compass,
    wishlist_toggle: Heart,
    add_to_cart: ShoppingBag,
    checkout_intent: Target,
    purchase: CheckCircle2
  };

  return (
    <div className="space-y-10">
      {/* Top Banner & Simulation Controls */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-indigo-800/60 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-amber-300">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-300 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Interaction Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  AI Customer Behavior & Recommendations
                </h1>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetBehavior}
              disabled={isSyncing}
              className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold backdrop-blur-md transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Profile Data</span>
            </button>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            {summaryText} Our machine learning model tracks customer browsing patterns across views, queries, category dwell-time, wishlist curation, and cart readiness to predict purchase probability.
          </p>

          {/* Interactive Persona Simulation Presets */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">
              Simulate Customer Personas:
            </span>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => simulatePreset('tech')}
                disabled={isSyncing}
                className="bg-indigo-600/80 hover:bg-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold border border-indigo-400/30 flex items-center space-x-1.5 transition active:scale-95"
              >
                <span>⚡ Tech Enthusiast</span>
              </button>
              <button
                onClick={() => simulatePreset('fashion')}
                disabled={isSyncing}
                className="bg-purple-600/80 hover:bg-purple-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold border border-purple-400/30 flex items-center space-x-1.5 transition active:scale-95"
              >
                <span>✨ Luxury & Fashionista</span>
              </button>
              <button
                onClick={() => simulatePreset('wellness')}
                disabled={isSyncing}
                className="bg-emerald-600/80 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold border border-emerald-400/30 flex items-center space-x-1.5 transition active:scale-95"
              >
                <span>🌿 Wellness & Sanctuary</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Purchase Intent Indicator & Funnel Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Purchase Intent Gauge */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Purchase-Intent Indicator</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-400">
                Score: {intentScore}/100
              </span>
            </div>

            {/* Gauge Graphic */}
            <div className="py-6 text-center">
              <div className="relative inline-flex items-center justify-center">
                {/* Outer ring */}
                <svg className="w-44 h-44 transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="72"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-slate-100 dark:text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="72"
                    stroke={intentColor}
                    strokeWidth="12"
                    strokeDasharray={452}
                    strokeDashoffset={452 - (452 * intentScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {intentScore}%
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Intent
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-sm inline-block"
                  style={{ backgroundColor: intentColor }}
                >
                  {intentTier}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">
                  {intentDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Funnel Counters */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <span className="block text-base font-extrabold text-slate-900 dark:text-white">
                {eventCounts.views}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Views</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <span className="block text-base font-extrabold text-slate-900 dark:text-white">
                {eventCounts.searches}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Searches</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <span className="block text-base font-extrabold text-slate-900 dark:text-white">
                {eventCounts.wishlistAdds}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Wishlist</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <span className="block text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                {eventCounts.cartAdds}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Cart Adds</span>
            </div>
          </div>
        </div>

        {/* Right: Interest Categories & Affinity Breakdown */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Shopping-Interest Distribution
              </h3>
              <p className="text-xs text-slate-400">
                Dynamic affinity calculated from category dwell time and cart weight
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Affinity AI</span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            {categoryBreakdown.map((item, idx) => {
              const colors = ['bg-indigo-600', 'bg-purple-600', 'bg-pink-600', 'bg-emerald-600', 'bg-amber-600', 'bg-cyan-600'];
              const barColor = colors[idx % colors.length];

              return (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{item.category}</span>
                    <span className="text-slate-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Interest Tags */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Associated Interest Tags:
            </span>
            <div className="flex flex-wrap gap-2">
              {topTags.map((tag) => (
                <Link
                  key={tag}
                  to={`/products?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full text-xs font-semibold transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Viewed Products */}
      {frequentlyViewed && frequentlyViewed.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Frequently Viewed Products
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {frequentlyViewed.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

      {/* Personalized AI Product Recommendations */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ranked for You</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Personalized Recommendations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Curated by matching your category affinities, tags, and browsing history.
            </p>
          </div>
          <Link
            to="/products"
            className="mt-3 sm:mt-0 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
          >
            <span>Explore Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.slice(0, 8).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>

      {/* Live Event Stream / Activity Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Simulated Frontend Event Stream</span>
            </h3>
            <p className="text-xs text-slate-400">
              Live funnel stages captured in browser & synced with backend: View → Search → Category → Wishlist → Cart → Intent
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
            {recentTimeline.length} Events Logged
          </span>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {recentTimeline.map((ev, i) => {
            const Icon = eventIcons[ev.eventType] || Sparkles;
            return (
              <div
                key={ev.id || i}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-100 dark:border-slate-800">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                      {ev.eventType.replace('_', ' ')}
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-xs sm:max-w-md">
                      {ev.productName || ev.searchQuery ? `"${ev.productName || ev.searchQuery}"` : ev.category ? `Category: ${ev.category}` : 'Checkout Funnel Step'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
