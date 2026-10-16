import express from 'express';
import BehaviorLog from '../models/BehaviorLog.js';
import { products as memoryProducts } from '../data/productsData.js';
import { getDbStatus } from '../config/db.js';

const router = express.Router();

// Memory store for behavior events when MongoDB is offline
let memoryBehaviorLogs = [
  {
    sessionId: "default-user",
    eventType: "product_view",
    productId: "prod-1",
    productName: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    brand: "Sony",
    tags: ["audio", "wireless", "noise-cancelling"],
    timestamp: new Date(Date.now() - 30 * 60000).toISOString()
  },
  {
    sessionId: "default-user",
    eventType: "search",
    searchQuery: "ergonomic office",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString()
  },
  {
    sessionId: "default-user",
    eventType: "category_visit",
    category: "Home & Living",
    timestamp: new Date(Date.now() - 20 * 60000).toISOString()
  },
  {
    sessionId: "default-user",
    eventType: "wishlist_toggle",
    productId: "prod-21",
    productName: "Ergonomic High-Back Mesh Desk Office Chair",
    category: "Home & Living",
    brand: "ErgoForm",
    tags: ["furniture", "chair", "ergonomic", "office"],
    timestamp: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    sessionId: "default-user",
    eventType: "add_to_cart",
    productId: "prod-1",
    productName: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    brand: "Sony",
    tags: ["audio", "wireless", "noise-cancelling"],
    timestamp: new Date(Date.now() - 10 * 60000).toISOString()
  }
];

// Calculation utility for insights
export const computeBehaviorInsights = (logs) => {
  const categoryCounts = {};
  const tagCounts = {};
  const productViewCounts = {};
  const searches = [];
  let cartAdds = 0;
  let wishlistAdds = 0;
  let views = 0;
  let checkouts = 0;

  logs.forEach(log => {
    if (log.category) {
      categoryCounts[log.category] = (categoryCounts[log.category] || 0) + (log.eventType === 'add_to_cart' ? 3 : log.eventType === 'wishlist_toggle' ? 2 : 1);
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

  // Calculate purchase intent score (0 - 100)
  let intentScore = 15; // base interest
  intentScore += Math.min(views * 3, 20);
  intentScore += Math.min(searches.length * 4, 15);
  intentScore += Math.min(wishlistAdds * 6, 20);
  intentScore += Math.min(cartAdds * 15, 30);
  intentScore += Math.min(checkouts * 25, 40);
  intentScore = Math.min(Math.round(intentScore), 98);

  let intentTier = "Casual Browser";
  let intentDescription = "Exploring catalog, comparing initial options.";
  let intentColor = "#3b82f6";

  if (intentScore >= 80) {
    intentTier = "Immediate Buyer";
    intentDescription = "High readiness to purchase. Cart items active, high engagement.";
    intentColor = "#10b981";
  } else if (intentScore >= 55) {
    intentTier = "High Purchase Intent";
    intentDescription = "Actively considering checkout with saved wishlist/cart items.";
    intentColor = "#8b5cf6";
  } else if (intentScore >= 35) {
    intentTier = "Engaged Researcher";
    intentDescription = "Evaluating specific brands, reading specifications and reviews.";
    intentColor = "#f59e0b";
  }

  // Category breakdown percentages
  const totalCategoryScore = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;
  const categoryBreakdown = Object.entries(categoryCounts).map(([cat, score]) => ({
    category: cat,
    score,
    percentage: Math.round((score / totalCategoryScore) * 100)
  })).sort((a, b) => b.score - a.score);

  // Top affinities
  const topCategories = categoryBreakdown.slice(0, 3).map(c => c.category);
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(t => t[0]);

  // Frequently viewed products
  const frequentlyViewed = Object.entries(productViewCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([pid, viewCount]) => {
      const prod = memoryProducts.find(p => p.id === pid);
      return prod ? { ...prod, userViews: viewCount } : null;
    })
    .filter(Boolean);

  // Personalized product recommendations based on tags & category affinity
  const scoredProducts = memoryProducts.map(p => {
    let score = 0;
    // Category match
    const catMatch = categoryCounts[p.category] || 0;
    score += catMatch * 3;

    // Tag matches
    if (p.tags) {
      p.tags.forEach(t => {
        if (tagCounts[t]) score += tagCounts[t] * 2;
      });
    }

    if (p.isTrending) score += 1;
    if (p.isFeatured) score += 1;
    score += p.rating;

    return { product: p, score };
  });

  scoredProducts.sort((a, b) => b.score - a.score);
  const recommendations = scoredProducts.slice(0, 6).map(s => s.product);

  // Natural Language Summary
  let summaryText = "Your profile shows active interest";
  if (topCategories.length > 0) {
    summaryText += ` primarily in ${topCategories.join(' & ')}.`;
  } else {
    summaryText += " across multiple catalog categories.";
  }
  if (cartAdds > 0) {
    summaryText += ` With ${cartAdds} item(s) added to cart, your buying intent is high.`;
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
    recommendations,
    recentSearches: searches.slice(-5).reverse(),
    eventCounts: {
      views,
      searches: searches.length,
      wishlistAdds,
      cartAdds,
      checkouts
    },
    summaryText,
    totalEvents: logs.length
  };
};

// POST /api/ai/track - Track an interaction
router.post('/track', async (req, res) => {
  try {
    const {
      sessionId = 'default-user',
      eventType,
      productId,
      productName,
      category,
      brand,
      price,
      tags = [],
      searchQuery,
      metadata = {}
    } = req.body;

    if (!eventType) {
      return res.status(400).json({ error: 'eventType is required' });
    }

    const eventData = {
      sessionId,
      eventType,
      productId,
      productName,
      category,
      brand,
      price: price ? Number(price) : undefined,
      tags: Array.isArray(tags) ? tags : [],
      searchQuery,
      metadata,
      timestamp: new Date().toISOString()
    };

    const { connected } = getDbStatus();
    if (connected) {
      try {
        const log = new BehaviorLog(eventData);
        await log.save();
      } catch (err) {
        console.warn('Could not save behavior to Mongo:', err.message);
      }
    }

    memoryBehaviorLogs.unshift(eventData);
    if (memoryBehaviorLogs.length > 300) {
      memoryBehaviorLogs = memoryBehaviorLogs.slice(0, 300);
    }

    res.status(201).json({ success: true, event: eventData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/ai/insights - Get complete behavior insights
router.get('/insights', async (req, res) => {
  try {
    const { sessionId = 'default-user' } = req.query;
    const { connected } = getDbStatus();
    let logs = [];

    if (connected) {
      try {
        logs = await BehaviorLog.find({ sessionId }).sort({ timestamp: -1 }).limit(100).lean();
      } catch (err) {
        logs = memoryBehaviorLogs.filter(l => l.sessionId === sessionId);
      }
    }

    if (!logs.length) {
      logs = memoryBehaviorLogs.filter(l => l.sessionId === sessionId);
    }

    const insights = computeBehaviorInsights(logs);
    res.json({
      ...insights,
      recentTimeline: logs.slice(0, 10)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/ai/recommendations - Personalized recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const { sessionId = 'default-user' } = req.query;
    const { connected } = getDbStatus();
    let logs = [];

    if (connected) {
      try {
        logs = await BehaviorLog.find({ sessionId }).sort({ timestamp: -1 }).limit(80).lean();
      } catch (e) {
        logs = memoryBehaviorLogs.filter(l => l.sessionId === sessionId);
      }
    }

    if (!logs.length) {
      logs = memoryBehaviorLogs.filter(l => l.sessionId === sessionId);
    }

    const insights = computeBehaviorInsights(logs);
    res.json(insights.recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/reset - Reset simulated behavior
router.post('/reset', async (req, res) => {
  try {
    const { sessionId = 'default-user' } = req.body;
    const { connected } = getDbStatus();

    if (connected) {
      try {
        await BehaviorLog.deleteMany({ sessionId });
      } catch (e) {
        console.warn('Could not delete from Mongo:', e.message);
      }
    }

    memoryBehaviorLogs = memoryBehaviorLogs.filter(l => l.sessionId !== sessionId);
    res.json({ success: true, message: 'Customer behavior log reset successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/simulate-preset - Load preset personas (Tech, Fashion, Wellness)
router.post('/simulate-preset', async (req, res) => {
  try {
    const { preset = 'tech', sessionId = 'default-user' } = req.body;

    let presetEvents = [];

    if (preset === 'tech') {
      presetEvents = [
        {
          sessionId,
          eventType: "category_visit",
          category: "Electronics",
          timestamp: new Date(Date.now() - 40 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "search",
          searchQuery: "headphones noise cancelling",
          timestamp: new Date(Date.now() - 35 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "product_view",
          productId: "prod-1",
          productName: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
          category: "Electronics",
          brand: "Sony",
          tags: ["audio", "wireless", "noise-cancelling"],
          timestamp: new Date(Date.now() - 30 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "product_view",
          productId: "prod-4",
          productName: "Keychron Q1 Pro Custom Mechanical Keyboard",
          category: "Electronics",
          brand: "Keychron",
          tags: ["keyboard", "mechanical", "custom"],
          timestamp: new Date(Date.now() - 20 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "wishlist_toggle",
          productId: "prod-5",
          productName: "Dell UltraSharp 27-inch 4K USB-C Hub Monitor (U2723QE)",
          category: "Electronics",
          brand: "Dell",
          tags: ["monitor", "4k", "display"],
          timestamp: new Date(Date.now() - 15 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "add_to_cart",
          productId: "prod-1",
          productName: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
          category: "Electronics",
          brand: "Sony",
          tags: ["audio", "wireless", "noise-cancelling"],
          timestamp: new Date(Date.now() - 10 * 60000).toISOString()
        }
      ];
    } else if (preset === 'fashion') {
      presetEvents = [
        {
          sessionId,
          eventType: "category_visit",
          category: "Fashion",
          timestamp: new Date(Date.now() - 40 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "product_view",
          productId: "prod-11",
          productName: "Classic Heritage Leather Bomber Jacket",
          category: "Fashion",
          brand: "UrbanCraft",
          tags: ["jacket", "leather", "outerwear"],
          timestamp: new Date(Date.now() - 35 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "product_view",
          productId: "prod-13",
          productName: "Pure Mongolian Cashmere Crewneck Sweater",
          category: "Fashion",
          brand: "LuxeKnit",
          tags: ["cashmere", "sweater", "luxury"],
          timestamp: new Date(Date.now() - 25 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "wishlist_toggle",
          productId: "prod-19",
          productName: "Classic Chronograph Automatic Stainless Watch",
          category: "Fashion",
          brand: "Chronos",
          tags: ["watch", "timepiece", "luxury"],
          timestamp: new Date(Date.now() - 15 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "add_to_cart",
          productId: "prod-11",
          productName: "Classic Heritage Leather Bomber Jacket",
          category: "Fashion",
          brand: "UrbanCraft",
          tags: ["jacket", "leather", "outerwear"],
          timestamp: new Date(Date.now() - 5 * 60000).toISOString()
        }
      ];
    } else if (preset === 'wellness') {
      presetEvents = [
        {
          sessionId,
          eventType: "category_visit",
          category: "Beauty",
          timestamp: new Date(Date.now() - 35 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "product_view",
          productId: "prod-31",
          productName: "Hyaluronic Acid Multi-Molecular Hydration Serum",
          category: "Beauty",
          brand: "PureGlow",
          tags: ["skincare", "serum", "hyaluronic"],
          timestamp: new Date(Date.now() - 30 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "product_view",
          productId: "prod-23",
          productName: "Levoit Smart True HEPA Air Purifier (Core 400S)",
          category: "Home & Living",
          brand: "Levoit",
          tags: ["air-purifier", "home", "wellness"],
          timestamp: new Date(Date.now() - 20 * 60000).toISOString()
        },
        {
          sessionId,
          eventType: "add_to_cart",
          productId: "prod-31",
          productName: "Hyaluronic Acid Multi-Molecular Hydration Serum",
          category: "Beauty",
          brand: "PureGlow",
          tags: ["skincare", "serum", "hyaluronic"],
          timestamp: new Date(Date.now() - 10 * 60000).toISOString()
        }
      ];
    }

    // Overwrite memory logs for session
    memoryBehaviorLogs = memoryBehaviorLogs.filter(l => l.sessionId !== sessionId);
    memoryBehaviorLogs.unshift(...presetEvents);

    const { connected } = getDbStatus();
    if (connected) {
      try {
        await BehaviorLog.deleteMany({ sessionId });
        await BehaviorLog.insertMany(presetEvents);
      } catch (e) {
        console.warn('Error saving preset to mongo:', e.message);
      }
    }

    const insights = computeBehaviorInsights(presetEvents);
    res.json({ success: true, preset, insights });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
