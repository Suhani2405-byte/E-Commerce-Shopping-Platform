import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { products as allProducts } from '../data/mockProducts';

const AIBehaviorContext = createContext();

const SESSION_KEY = 'shopvibe_ai_session_id';
const LOCAL_LOGS_KEY = 'shopvibe_ai_logs';

export const AIBehaviorProvider = ({ children }) => {
  const [sessionId] = useState(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `sess-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  });

  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_LOGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initial default seed activity
    return [
      {
        id: 'init-1',
        eventType: 'product_view',
        productId: 'prod-1',
        productName: 'Sony WH-1000XM5 Wireless Headphones',
        category: 'Electronics',
        brand: 'Sony',
        tags: ['audio', 'wireless', 'noise-cancelling'],
        timestamp: new Date(Date.now() - 25 * 60000).toISOString()
      },
      {
        id: 'init-2',
        eventType: 'search',
        searchQuery: 'smart watch fitness',
        timestamp: new Date(Date.now() - 20 * 60000).toISOString()
      },
      {
        id: 'init-3',
        eventType: 'category_visit',
        category: 'Electronics',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString()
      }
    ];
  });

  const [insights, setInsights] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Compute insights locally for instant reactivity
  const computeLocalInsights = useCallback((currentLogs) => {
    const categoryCounts = {};
    const tagCounts = {};
    const productViewCounts = {};
    const searches = [];
    let cartAdds = 0;
    let wishlistAdds = 0;
    let views = 0;
    let checkouts = 0;

    currentLogs.forEach(log => {
      if (log.category) {
        categoryCounts[log.category] = (categoryCounts[log.category] || 0) +
          (log.eventType === 'add_to_cart' ? 4 : log.eventType === 'wishlist_toggle' ? 3 : 1);
      }
      if (log.tags && Array.isArray(log.tags)) {
        log.tags.forEach(t => {
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
      }
      if (log.productId && log.eventType === 'product_view') {
        productViewCounts[log.productId] = (productViewCounts[log.productId] || 0) + 1;
      }
      if (log.eventType === 'search' && log.searchQuery) {
        if (!searches.includes(log.searchQuery)) searches.push(log.searchQuery);
      }
      if (log.eventType === 'product_view') views++;
      if (log.eventType === 'wishlist_toggle') wishlistAdds++;
      if (log.eventType === 'add_to_cart') cartAdds++;
      if (log.eventType === 'checkout_intent') checkouts++;
    });

    // Purchase intent score calculation (0 - 100)
    let intentScore = 15;
    intentScore += Math.min(views * 3, 20);
    intentScore += Math.min(searches.length * 5, 15);
    intentScore += Math.min(wishlistAdds * 7, 20);
    intentScore += Math.min(cartAdds * 15, 30);
    intentScore += Math.min(checkouts * 25, 40);
    intentScore = Math.min(Math.round(intentScore), 98);

    let intentTier = "Casual Explorer";
    let intentDescription = "Browsing catalog, exploring diverse options.";
    let intentColor = "#3b82f6"; // blue

    if (intentScore >= 80) {
      intentTier = "Immediate Buyer";
      intentDescription = "High readiness to buy. Cart has active items; high purchase velocity.";
      intentColor = "#10b981"; // green
    } else if (intentScore >= 55) {
      intentTier = "High Purchase Intent";
      intentDescription = "Actively shortlisting and evaluating specific product configurations.";
      intentColor = "#8b5cf6"; // purple
    } else if (intentScore >= 35) {
      intentTier = "Engaged Researcher";
      intentDescription = "Comparing specs, brands, and reading customer reviews.";
      intentColor = "#f59e0b"; // amber
    }

    // Category breakdown
    const totalCategoryScore = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;
    const categoryBreakdown = Object.entries(categoryCounts)
      .map(([cat, score]) => ({
        category: cat,
        score,
        percentage: Math.round((score / totalCategoryScore) * 100)
      }))
      .sort((a, b) => b.score - a.score);

    const topCategories = categoryBreakdown.slice(0, 3).map(c => c.category);
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(t => t[0]);

    // Frequently viewed
    const frequentlyViewed = Object.entries(productViewCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([pid, viewCount]) => {
        const prod = allProducts.find(p => p.id === pid);
        return prod ? { ...prod, userViews: viewCount } : null;
      })
      .filter(Boolean);

    // Personalized recommendations based on user affinity scores
    const scoredProducts = allProducts.map(p => {
      let score = 0;
      const catScore = categoryCounts[p.category] || 0;
      score += catScore * 3;

      if (p.tags) {
        p.tags.forEach(t => {
          if (tagCounts[t]) score += tagCounts[t] * 2;
        });
      }

      if (p.isTrending) score += 2;
      if (p.isFeatured) score += 1;
      score += p.rating;

      return { product: p, score };
    });

    scoredProducts.sort((a, b) => b.score - a.score);
    const recs = scoredProducts.slice(0, 8).map(s => s.product);

    // Natural Language Summary
    let summaryText = "Your profile shows active interest";
    if (topCategories.length > 0) {
      summaryText += ` in ${topCategories.join(' & ')}.`;
    } else {
      summaryText += " across our popular collections.";
    }
    if (cartAdds > 0) {
      summaryText += ` Your cart activity moved your purchase intent to ${intentScore}%.`;
    }

    return {
      intentScore,
      intentTier,
      intentDescription,
      intentColor,
      categoryBreakdown,
      topCategories,
      topTags,
      frequentlyViewed,
      recommendations: recs,
      recentSearches: searches.slice(-5).reverse(),
      eventCounts: {
        views,
        searches: searches.length,
        wishlistAdds,
        cartAdds,
        checkouts
      },
      summaryText,
      totalEvents: currentLogs.length,
      recentTimeline: currentLogs.slice(0, 12)
    };
  }, []);

  // Update insights whenever logs change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(logs));
    } catch {}

    const localData = computeLocalInsights(logs);
    setInsights(localData);
    setRecommendations(localData.recommendations);
  }, [logs, computeLocalInsights]);

  // Generic track event dispatcher
  const recordEvent = useCallback((eventData) => {
    const newLog = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sessionId,
      timestamp: new Date().toISOString(),
      ...eventData
    };

    setLogs(prev => [newLog, ...prev.slice(0, 99)]);

    // Fire & forget sync to server
    api.trackEvent(newLog).catch(() => {});
  }, [sessionId]);

  // Public event tracking methods
  const trackProductView = useCallback((product) => {
    if (!product) return;
    recordEvent({
      eventType: 'product_view',
      productId: product.id,
      productName: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      tags: product.tags || []
    });
  }, [recordEvent]);

  const trackSearch = useCallback((query) => {
    if (!query || !query.trim()) return;
    recordEvent({
      eventType: 'search',
      searchQuery: query.trim()
    });
  }, [recordEvent]);

  const trackCategoryVisit = useCallback((category) => {
    if (!category) return;
    recordEvent({
      eventType: 'category_visit',
      category
    });
  }, [recordEvent]);

  const trackWishlist = useCallback((product, isAdding = true) => {
    if (!product) return;
    recordEvent({
      eventType: 'wishlist_toggle',
      productId: product.id,
      productName: product.name,
      category: product.category,
      brand: product.brand,
      tags: product.tags || [],
      metadata: { action: isAdding ? 'add' : 'remove' }
    });
  }, [recordEvent]);

  const trackAddToCart = useCallback((product) => {
    if (!product) return;
    recordEvent({
      eventType: 'add_to_cart',
      productId: product.id,
      productName: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      tags: product.tags || []
    });
  }, [recordEvent]);

  const trackCheckoutIntent = useCallback(() => {
    recordEvent({
      eventType: 'checkout_intent',
      metadata: { funnelStage: 'checkout_page_visited' }
    });
  }, [recordEvent]);

  const trackPurchase = useCallback((order) => {
    recordEvent({
      eventType: 'purchase',
      metadata: { orderId: order?.orderId, total: order?.pricing?.total }
    });
  }, [recordEvent]);

  // Simulation Presets
  const simulatePreset = async (presetType) => {
    setIsSyncing(true);
    let sampleLogs = [];
    const now = Date.now();

    if (presetType === 'tech') {
      sampleLogs = [
        {
          id: `p-${now}-1`,
          eventType: 'category_visit',
          category: 'Electronics',
          timestamp: new Date(now - 35 * 60000).toISOString()
        },
        {
          id: `p-${now}-2`,
          eventType: 'search',
          searchQuery: 'mechanical keyboard q1',
          timestamp: new Date(now - 30 * 60000).toISOString()
        },
        {
          id: `p-${now}-3`,
          eventType: 'product_view',
          productId: 'prod-4',
          productName: 'Keychron Q1 Pro Custom Mechanical Keyboard',
          category: 'Electronics',
          brand: 'Keychron',
          tags: ['keyboard', 'mechanical', 'custom'],
          timestamp: new Date(now - 25 * 60000).toISOString()
        },
        {
          id: `p-${now}-4`,
          eventType: 'product_view',
          productId: 'prod-1',
          productName: 'Sony WH-1000XM5 Wireless Headphones',
          category: 'Electronics',
          brand: 'Sony',
          tags: ['audio', 'wireless', 'noise-cancelling'],
          timestamp: new Date(now - 20 * 60000).toISOString()
        },
        {
          id: `p-${now}-5`,
          eventType: 'wishlist_toggle',
          productId: 'prod-5',
          productName: 'Dell UltraSharp 27-inch 4K Monitor',
          category: 'Electronics',
          brand: 'Dell',
          tags: ['monitor', '4k', 'display'],
          timestamp: new Date(now - 15 * 60000).toISOString()
        },
        {
          id: `p-${now}-6`,
          eventType: 'add_to_cart',
          productId: 'prod-1',
          productName: 'Sony WH-1000XM5 Wireless Headphones',
          category: 'Electronics',
          brand: 'Sony',
          tags: ['audio', 'wireless', 'noise-cancelling'],
          timestamp: new Date(now - 5 * 60000).toISOString()
        }
      ];
    } else if (presetType === 'fashion') {
      sampleLogs = [
        {
          id: `p-${now}-1`,
          eventType: 'category_visit',
          category: 'Fashion',
          timestamp: new Date(now - 35 * 60000).toISOString()
        },
        {
          id: `p-${now}-2`,
          eventType: 'product_view',
          productId: 'prod-11',
          productName: 'Classic Heritage Leather Bomber Jacket',
          category: 'Fashion',
          brand: 'UrbanCraft',
          tags: ['jacket', 'leather', 'outerwear'],
          timestamp: new Date(now - 30 * 60000).toISOString()
        },
        {
          id: `p-${now}-3`,
          eventType: 'product_view',
          productId: 'prod-13',
          productName: 'Pure Mongolian Cashmere Crewneck Sweater',
          category: 'Fashion',
          brand: 'LuxeKnit',
          tags: ['cashmere', 'sweater', 'luxury'],
          timestamp: new Date(now - 20 * 60000).toISOString()
        },
        {
          id: `p-${now}-4`,
          eventType: 'wishlist_toggle',
          productId: 'prod-19',
          productName: 'Classic Chronograph Automatic Stainless Watch',
          category: 'Fashion',
          brand: 'Chronos',
          tags: ['watch', 'timepiece', 'luxury'],
          timestamp: new Date(now - 10 * 60000).toISOString()
        },
        {
          id: `p-${now}-5`,
          eventType: 'add_to_cart',
          productId: 'prod-11',
          productName: 'Classic Heritage Leather Bomber Jacket',
          category: 'Fashion',
          brand: 'UrbanCraft',
          tags: ['jacket', 'leather', 'outerwear'],
          timestamp: new Date(now - 2 * 60000).toISOString()
        }
      ];
    } else if (presetType === 'wellness') {
      sampleLogs = [
        {
          id: `p-${now}-1`,
          eventType: 'category_visit',
          category: 'Beauty',
          timestamp: new Date(now - 30 * 60000).toISOString()
        },
        {
          id: `p-${now}-2`,
          eventType: 'product_view',
          productId: 'prod-31',
          productName: 'Hyaluronic Acid Hydration Serum',
          category: 'Beauty',
          brand: 'PureGlow',
          tags: ['skincare', 'serum', 'hyaluronic'],
          timestamp: new Date(now - 25 * 60000).toISOString()
        },
        {
          id: `p-${now}-3`,
          eventType: 'product_view',
          productId: 'prod-23',
          productName: 'Levoit Smart True HEPA Air Purifier',
          category: 'Home & Living',
          brand: 'Levoit',
          tags: ['air-purifier', 'home', 'wellness'],
          timestamp: new Date(now - 15 * 60000).toISOString()
        },
        {
          id: `p-${now}-4`,
          eventType: 'add_to_cart',
          productId: 'prod-31',
          productName: 'Hyaluronic Acid Hydration Serum',
          category: 'Beauty',
          brand: 'PureGlow',
          tags: ['skincare', 'serum', 'hyaluronic'],
          timestamp: new Date(now - 5 * 60000).toISOString()
        }
      ];
    }

    setLogs(sampleLogs);
    try {
      await api.simulateAIPreset(presetType, sessionId);
    } catch {}
    setIsSyncing(false);
  };

  const resetBehavior = async () => {
    setIsSyncing(true);
    setLogs([]);
    try {
      localStorage.removeItem(LOCAL_LOGS_KEY);
      await api.resetAILogs(sessionId);
    } catch {}
    setIsSyncing(false);
  };

  return (
    <AIBehaviorContext.Provider
      value={{
        sessionId,
        logs,
        insights,
        recommendations,
        isSyncing,
        trackProductView,
        trackSearch,
        trackCategoryVisit,
        trackWishlist,
        trackAddToCart,
        trackCheckoutIntent,
        trackPurchase,
        simulatePreset,
        resetBehavior
      }}
    >
      {children}
    </AIBehaviorContext.Provider>
  );
};

export const useAIBehavior = () => {
  const context = useContext(AIBehaviorContext);
  if (!context) {
    throw new Error('useAIBehavior must be used within an AIBehaviorProvider');
  }
  return context;
};
