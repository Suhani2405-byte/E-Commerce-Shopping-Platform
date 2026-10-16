import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Package, ArrowRight, Printer, ShoppingBag } from 'lucide-react';

export const OrderSuccessModal = ({ order, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  }, []);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200 space-y-6">
        {/* Celebration Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Order Confirmed!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Thank you for shopping with ShopVibe. Your order confirmation has been emailed to <strong>{order.customer?.email}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-400">Order ID:</span>
            <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">
              {order.orderId}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Estimated Delivery:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {order.estimatedDelivery || 'Within 3-5 Business Days'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Shipping Address:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
              {order.customer?.address}, {order.customer?.city}, {order.customer?.state} {order.customer?.zipCode}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Payment Status:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              Paid via {order.payment?.method?.toUpperCase()} (Txn: {order.payment?.transactionId})
            </span>
          </div>
        </div>

        {/* Items Preview */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Purchased Items ({order.items?.length})
          </h4>
          <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <div className="flex items-center space-x-2.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 dark:border-slate-800 text-sm font-bold">
          <span className="text-slate-500">Total Paid:</span>
          <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
            ${order.pricing?.total?.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={() => {
              if (onClose) onClose();
              navigate('/orders');
            }}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
          >
            <Package className="w-4 h-4" />
            <span>View Order History</span>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              if (onClose) onClose();
              navigate('/products');
            }}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
};
