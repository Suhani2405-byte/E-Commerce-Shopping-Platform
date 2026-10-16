import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const COUPONS = {
  SAVE20: { code: 'SAVE20', discount: 20, type: 'percent', label: '20% Off Storewide' },
  WELCOME10: { code: 'WELCOME10', discount: 10, type: 'percent', label: '10% New User Discount' },
  FLAT50: { code: 'FLAT50', discount: 50, type: 'flat', minOrder: 200, label: '$50 Off Orders $200+' },
  FREESHIP: { code: 'FREESHIP', discount: 0, type: 'free_shipping', label: 'Free Express Shipping' }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shopvibe_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem('shopvibe_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('shopvibe_coupon');
      }
    } catch (e) {
      console.warn('Could not save coupon to localStorage', e);
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Standard';
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedColor === color && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const currentQty = next[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, product.stock || 99);
        next[existingIndex] = { ...next[existingIndex], quantity: newQty };
        return next;
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
          quantity,
          selectedColor: color,
          selectedSize: size,
          stock: product.stock || 10,
          tags: product.tags || []
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id, selectedColor, selectedSize) => {
    setCart(prev =>
      prev.filter(
        item => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (id, quantity, selectedColor, selectedSize) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedColor, selectedSize);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize) {
          return { ...item, quantity: Math.min(quantity, item.stock || 99) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    setCouponError('');
    const cleanCode = (code || '').trim().toUpperCase();
    const matched = COUPONS[cleanCode];

    if (!matched) {
      setCouponError('Invalid coupon code. Try SAVE20, WELCOME10, or FREESHIP');
      return false;
    }

    if (matched.minOrder && subtotal < matched.minOrder) {
      setCouponError(`This coupon requires a minimum subtotal of $${matched.minOrder}`);
      return false;
    }

    setCoupon(matched);
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError('');
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Free shipping threshold: $99 or coupon
  const isFreeShipping = subtotal >= 99 || coupon?.type === 'free_shipping';
  const shipping = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 15.00);

  // Discount calculation
  let discountAmount = 0;
  if (coupon) {
    if (coupon.type === 'percent') {
      discountAmount = (subtotal * coupon.discount) / 100;
    } else if (coupon.type === 'flat') {
      discountAmount = Math.min(coupon.discount, subtotal);
    }
  }

  const tax = Number(((subtotal - discountAmount) * 0.08).toFixed(2));
  const total = Math.max(0, Number((subtotal - discountAmount + shipping + tax).toFixed(2)));

  const freeShippingRemaining = Math.max(0, 99 - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        coupon,
        couponError,
        applyCoupon,
        removeCoupon,
        subtotal,
        totalItemsCount,
        shipping,
        tax,
        discountAmount,
        total,
        isFreeShipping,
        freeShippingRemaining,
        availableCoupons: Object.values(COUPONS)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
