import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressSection } from '../components/checkout/AddressSection';
import { PaymentSection } from '../components/checkout/PaymentSection';
import { OrderSummarySection } from '../components/checkout/OrderSummarySection';
import { OrderSuccessModal } from '../components/checkout/OrderSuccessModal';
import { useCart } from '../context/CartContext';
import { useAIBehavior } from '../context/AIBehaviorContext';
import { api } from '../services/api';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, subtotal, shipping, tax, discountAmount, total, coupon, clearCart } = useCart();
  const { trackPurchase } = useAIBehavior();

  const [addressData, setAddressData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardName: 'Alex Mercer',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvv: '842'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Auto-fill demo address for fast testing
  const handleAutoFillDemo = () => {
    setAddressData({
      fullName: 'Alex Mercer',
      email: 'alex.mercer@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Suite 402',
      city: 'Springfield',
      state: 'Oregon',
      zipCode: '97477',
      country: 'United States'
    });
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!addressData.fullName || !addressData.email || !addressData.address || !addressData.city) {
      alert('Please fill in your shipping details or click "Auto-Fill Demo Address"!');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty!');
      navigate('/products');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      })),
      customer: addressData,
      payment: {
        method: paymentMethod,
        status: 'Completed'
      },
      pricing: {
        subtotal,
        shipping,
        tax,
        discountAmount,
        couponApplied: coupon?.code || '',
        total
      }
    };

    try {
      const created = await api.createOrder(orderPayload);
      setCompletedOrder(created);
      trackPurchase(created);
      clearCart();
    } catch (err) {
      console.error('Order creation error', err);
      // Fallback local order
      const localFallback = {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        ...orderPayload,
        status: 'Processing',
        createdAt: new Date().toISOString()
      };
      setCompletedOrder(localFallback);
      trackPurchase(localFallback);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complete your purchase with encrypted bank-grade protection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Address & Payment */}
        <div className="lg:col-span-7 space-y-6">
          <AddressSection
            addressData={addressData}
            onChange={setAddressData}
            onAutoFill={handleAutoFillDemo}
          />

          <PaymentSection
            selectedMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
            cardDetails={cardDetails}
            onCardChange={setCardDetails}
          />
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 sticky top-28">
          <OrderSummarySection
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {completedOrder && (
        <OrderSuccessModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}
    </div>
  );
};
