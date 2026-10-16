import React, { useEffect } from 'react';
import { ShoppingBag, Sparkles, ShieldCheck, Heart, Award, Users, Globe } from 'lucide-react';

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Our Vision & Heritage</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Where Thoughtful Curation Meets Machine Intelligence
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          ShopVibe was born from a fundamental frustration with modern e-commerce: infinite digital clutter, fake reviews, and irrelevant search results. We created a curated catalog of 50 timeless essentials paired with an intuitive, privacy-conscious AI behavioral model.
        </p>
      </div>

      {/* Key Stats Counter */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm">
          <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">50+</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Curated Master Products</p>
          <p className="text-[11px] text-slate-400">Strict quality testing benchmark</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm">
          <span className="text-4xl font-black text-purple-600 dark:text-purple-400">99.4%</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Customer Satisfaction</p>
          <p className="text-[11px] text-slate-400">Verified buyer ratings</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm">
          <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">24h</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Dispatch Guarantee</p>
          <p className="text-[11px] text-slate-400">Fast worldwide logistics</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm">
          <span className="text-4xl font-black text-amber-500">100%</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Sustainable Focus</p>
          <p className="text-[11px] text-slate-400">Plastic-free recyclable packaging</p>
        </div>
      </div>

      {/* Pillars of ShopVibe */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center">
          Our Four Core Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Uncompromising Quality</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Every single product in our catalog undergoes rigorous real-world durability testing. If a device, garment, or home piece fails to meet our ergonomic and functional standards, it simply isn't sold here.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Respectful Intelligence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our AI behavior analysis engine runs directly within your session. It predicts your buying intent and adapts your recommendations without selling your private browsing profiles to third-party ad brokers.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Responsible Sourcing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              From GOTS-certified organic cotton to FSC-certified American walnut wood, we partner with manufacturers who prioritize ethical labor practices and ecological accountability.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Humans First Support</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When you reach out for help, you talk to actual product enthusiasts located in our regional support hubs, not looping chatbot mazes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
