import React, { useState } from 'react';
import { CreditCard, QrCode, Banknote, ShieldCheck, Check } from 'lucide-react';

export const PaymentSection = ({ selectedMethod, onSelectMethod, cardDetails, onCardChange }) => {
  const [activeTab, setActiveTab] = useState(selectedMethod || 'card');

  const handleMethodChange = (method) => {
    setActiveTab(method);
    onSelectMethod(method);
  };

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'cardNumber') {
      formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      formatted = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
    } else if (name === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 4);
    }
    onCardChange({ ...cardDetails, [name]: formatted });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
            2. Payment Method
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select how you would like to complete your order
          </p>
        </div>
      </div>

      {/* Payment Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'card', label: 'Credit Card', icon: CreditCard, subtitle: 'Visa / MC' },
          { id: 'upi', label: 'UPI / GPay', icon: QrCode, subtitle: 'Instant Pay' },
          { id: 'cod', label: 'Cash on Delivery', icon: Banknote, subtitle: 'Pay at door' },
          { id: 'paypal', label: 'PayPal', icon: ShieldCheck, subtitle: 'Safe checkout' }
        ].map((m) => {
          const Icon = m.icon;
          const isSelected = activeTab === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => handleMethodChange(m.id)}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <div>
                <p className={`text-xs font-bold ${isSelected ? 'text-indigo-950 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {m.label}
                </p>
                <p className="text-[10px] text-slate-400">{m.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Credit Card Details Form */}
      {activeTab === 'card' && (
        <div className="space-y-4 pt-2">
          {/* Card Mockup Preview */}
          <div className="relative mx-auto max-w-sm aspect-[1.58/1] rounded-2xl p-5 text-white shadow-xl overflow-hidden bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-800 border border-white/10">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[11px] font-mono tracking-widest uppercase opacity-75">Debit / Credit</span>
              <span className="text-sm font-black italic tracking-wider">ShopVibe Pay</span>
            </div>
            <div className="text-lg sm:text-xl font-mono tracking-widest mb-4">
              {cardDetails.cardNumber || '•••• •••• •••• 4242'}
            </div>
            <div className="flex justify-between items-end text-xs font-mono">
              <div>
                <span className="block text-[9px] uppercase opacity-70">Cardholder</span>
                <span className="uppercase font-bold tracking-wider truncate max-w-[150px] block">
                  {cardDetails.cardName || 'ALEX MERCER'}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[9px] uppercase opacity-70">Expires</span>
                <span className="font-bold">{cardDetails.expiry || '12/28'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardName"
                placeholder="Alex Mercer"
                value={cardDetails.cardName}
                onChange={handleCardInput}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={cardDetails.cardNumber}
                onChange={handleCardInput}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardInput}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                CVV / CVC
              </label>
              <input
                type="password"
                name="cvv"
                maxLength={4}
                placeholder="•••"
                value={cardDetails.cvv}
                onChange={handleCardInput}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* UPI Details */}
      {activeTab === 'upi' && (
        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 text-center space-y-3">
          <QrCode className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto" />
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Instant UPI Payment with Google Pay, PhonePe, or Paytm
          </p>
          <input
            type="text"
            placeholder="Enter UPI ID (e.g. yourname@oksbi)"
            className="max-w-xs mx-auto w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-center focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {/* Cash on Delivery Details */}
      {activeTab === 'cod' && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200">
          <p className="font-bold flex items-center gap-1.5 mb-1">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Pay on Delivery Activated</span>
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Pay with cash or card upon package delivery at your doorstep. Zero extra surcharge.
          </p>
        </div>
      )}

      {/* PayPal Details */}
      {activeTab === 'paypal' && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
          <p className="font-bold mb-1">PayPal Express Checkout</p>
          <p className="text-slate-600 dark:text-slate-400">
            You will be seamlessly redirected to complete your payment with buyer protection.
          </p>
        </div>
      )}
    </div>
  );
};
