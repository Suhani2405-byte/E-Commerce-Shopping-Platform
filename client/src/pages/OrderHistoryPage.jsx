import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Clock,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Search,
  RefreshCw,
  Database,
  ExternalLink,
  MapPin,
  CreditCard
} from 'lucide-react';
import { api } from '../services/api';
import { useAIBehavior } from '../context/AIBehaviorContext';

export const OrderHistoryPage = () => {
  const { sessionId } = useAIBehavior();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' or 'session'

  const loadOrders = async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    else setRefreshing(true);

    try {
      // By default fetch all orders; server prioritizes session if requested
      const data = await api.getOrders(sessionId, {
        filter: filterMode === 'session' ? 'session' : undefined
      });
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn('Orders fetch error', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadOrders(true);
  }, [sessionId, filterMode]);

  // Client-side search filtering
  const filteredOrders = orders.filter((order) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const orderIdMatch = (order.orderId || '').toLowerCase().includes(q);
    const nameMatch = (order.customer?.fullName || '').toLowerCase().includes(q);
    const emailMatch = (order.customer?.email || '').toLowerCase().includes(q);
    const cityMatch = (order.customer?.city || '').toLowerCase().includes(q);
    const itemMatch = (order.items || []).some((item) =>
      (item.name || '').toLowerCase().includes(q)
    );
    return orderIdMatch || nameMatch || emailMatch || cityMatch || itemMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Order History & Tracking
            </h1>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
              <Database className="w-3 h-3" />
              <span>MongoDB Atlas</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review previous orders, delivery timelines, tracking details, and receipts
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            onClick={() => loadOrders(false)}
            disabled={refreshing || loading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition shadow-sm disabled:opacity-50"
            title="Refresh orders from database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-indigo-600' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Refresh'}</span>
          </button>
          <Link
            to="/products"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop More</span>
          </Link>
        </div>
      </div>

      {/* Search Bar & Filter Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID (e.g. ORD-...), name, email, or item..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2 text-xs w-full sm:w-auto justify-end">
          <span className="text-slate-400 text-[11px] font-medium mr-1">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
          </span>
          <div className="inline-flex p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilterMode('session')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterMode === 'session'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              This Session
            </button>
          </div>
        </div>
      </div>

      {/* Main Order Content */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-400">Loading order history from MongoDB...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-4">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No orders placed yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Once you complete a purchase, your tracking details and receipts will appear here automatically.
          </p>
          <Link
            to="/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md inline-block transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-4">
          <Search className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No matching orders found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No orders matched "{searchQuery}". Try searching by a different Order ID, name, or clear the search.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs px-5 py-2 rounded-xl transition"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const dateStr = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : 'Recent Order';

            const isCurrentSession = order.sessionId && order.sessionId === sessionId;

            return (
              <div
                key={order.orderId || order._id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm space-y-4 p-6 sm:p-8 hover:border-indigo-200 dark:hover:border-indigo-900 transition"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                  <div className="flex items-start sm:items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-extrabold text-sm text-slate-900 dark:text-white">
                          {order.orderId}
                        </span>
                        {isCurrentSession && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                            Your Session
                          </span>
                        )}
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-xs text-slate-400 font-medium">{dateStr}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>
                          Shipped to: <strong>{order.customer?.fullName || 'Customer'}</strong> ({order.customer?.city || 'City'}, {order.customer?.state || 'State'})
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{order.status || 'Processing'}</span>
                    </span>
                    <span className="font-black text-lg text-slate-900 dark:text-white">
                      ${Number(order.pricing?.total || 0).toFixed(2)}
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
                      <div className="flex items-center space-x-3 min-w-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-slate-100 dark:bg-slate-800"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                            <Package className="w-6 h-6" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <Link
                            to={`/product/${item.productId}`}
                            className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition truncate block max-w-xs sm:max-w-md"
                          >
                            {item.name}
                          </Link>
                          <p className="text-slate-400 text-[11px] mt-0.5">
                            Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                          </p>
                        </div>
                      </div>

                      <span className="font-extrabold text-slate-900 dark:text-white flex-shrink-0 ml-4">
                        ${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer notes & actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{order.estimatedDelivery || 'Estimated delivery in 3 business days'}</span>
                    </div>
                    {order.payment?.method && (
                      <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                        <CreditCard className="w-3 h-3" />
                        <span className="capitalize">{order.payment.method}</span>
                        {order.payment.transactionId && (
                          <span className="font-mono">({order.payment.transactionId})</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto">
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
