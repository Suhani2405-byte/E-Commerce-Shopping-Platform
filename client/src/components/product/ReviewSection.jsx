import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { api } from '../../services/api';

export const ReviewSection = ({ product, onReviewAdded }) => {
  const [reviews, setReviews] = useState(product.reviews || []);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    const newRev = {
      id: `r-${Date.now()}`,
      user: userName.trim(),
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0],
      comment: comment.trim()
    };

    try {
      await api.addProductReview(product.id, newRev);
    } catch {}

    setReviews(prev => [newRev, ...prev]);
    if (onReviewAdded) onReviewAdded(newRev);

    setUserName('');
    setComment('');
    setRating(5);
    setIsSubmitting(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  // Rating counts
  const total = reviews.length || 1;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const floor = Math.floor(r.rating);
    if (ratingCounts[floor] !== undefined) ratingCounts[floor]++;
  });

  return (
    <div id="reviews" className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Customer Reviews & Ratings
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real feedback from verified purchasers worldwide.
          </p>
        </div>
      </div>

      {/* Ratings Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800">
        <div className="md:col-span-4 text-center md:border-r md:border-slate-200 dark:md:border-slate-700/80 pr-0 md:pr-6">
          <span className="text-5xl font-black text-slate-900 dark:text-white">
            {product.rating}
          </span>
          <div className="flex items-center justify-center text-amber-400 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Based on {reviews.length} customer experiences
          </span>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingCounts[stars] || 0;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={stars} className="flex items-center space-x-3 text-xs">
                <span className="w-12 font-bold text-slate-600 dark:text-slate-400 flex items-center justify-end">
                  {stars} <Star className="w-3 h-3 ml-0.5 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400 font-semibold">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write a Review Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Write a Review</span>
        </h3>

        {successMsg && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-2xl flex items-center space-x-2 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Thank you! Your verified review has been published.</span>
          </div>
        )}

        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rachel Chen"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Overall Rating
              </label>
              <div className="flex items-center space-x-1 py-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        s <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Review Comment
            </label>
            <textarea
              required
              rows={3}
              placeholder="Share details of your experience with this item..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-md shadow-indigo-600/30 flex items-center space-x-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                  {rev.user.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {rev.user}
                  </h4>
                  <div className="flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Purchase</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-400">{rev.date}</span>
            </div>

            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(rev.rating) ? 'fill-amber-400' : 'text-slate-200 dark:text-slate-700'
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
