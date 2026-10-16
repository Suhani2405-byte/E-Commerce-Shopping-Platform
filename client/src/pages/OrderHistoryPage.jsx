import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const loadOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data || []);
      } catch (e) {
        console.warn('Orders fetch error', e);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          My Order History
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review previous orders, delivery timelines, and item details
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-400">Loading order history...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-4">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No orders placed yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Once you complete a purchase, your tracking details and receipts will appear here.
          </p>
          <Link
            to="/products"
            className="bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const dateStr = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : 'Recent Order';

            return (
              <div
                key={order.orderId || order._id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm space-y-4 p-6 sm:p-8"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-extrabold text-sm text-slate-900 dark:text-white">
                          {order.orderId}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-xs text-slate-400 font-medium">{dateStr}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Shipped to: {order.customer?.fullName} ({order.customer?.city}, {order.customer?.state})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{order.status || 'Processing'}</span>
                    </span>
                    <span className="font-extrabold text-base text-slate-900 dark:text-white">
                      ${order.pricing?.total?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-2 border-b border-slate-50 dark:border-slate-800/40 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div>
                          <Link
                            to={`/product/${item.productId}`}
                            className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition truncate block max-w-xs sm:max-w-md"
                          >
                            {item.name}
                          </Link>
                          <p className="text-slate-400 text-[11px]">
                            Qty: {item.quantity} • {item.selectedColor} • {item.selectedSize}
                          </p>
                        </div>
                      </div>

                      <span className="font-extrabold text-slate-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer notes & actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
                  <div className="flex items-center space-x-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{order.estimatedDelivery || 'Estimated delivery in 3 business days'}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to="/products"
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
                    >
                      <span>Order More Items</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
