import { products as fallbackProducts } from '../data/mockProducts';

const API_BASE = '/api';

// Safe fetch wrapper with automatic fallback to mock data
async function fetchSafe(url, options = {}, fallbackData = null) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API Fallback on ${url}]: ${err.message}. Using built-in local store.`);
    return fallbackData;
  }
}

export const api = {
  // Products
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, val);
      }
    });

    const queryString = searchParams.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;

    // Fallback logic for client-side filtering if backend is unreachable
    const fallback = () => {
      let filtered = [...fallbackProducts];
      const { q, category, brand, minPrice, maxPrice, minRating, inStock, sort, page = 1, limit = 12 } = params;

      if (q) {
        const query = q.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags?.some(t => t.toLowerCase().includes(query))
        );
      }
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      if (brand && brand !== 'All') {
        const brands = Array.isArray(brand) ? brand : [brand];
        filtered = filtered.filter(p => brands.map(b => b.toLowerCase()).includes(p.brand.toLowerCase()));
      }
      if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
      if (minRating) filtered = filtered.filter(p => p.rating >= Number(minRating));
      if (inStock === 'true' || inStock === true) filtered = filtered.filter(p => p.stock > 0);

      // Sort
      if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
      else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
      else if (sort === 'rating_desc' || sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
      else if (sort === 'popular') filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      else if (sort === 'newest') filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      else filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

      const pageNum = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);
      const total = filtered.length;
      const paginated = filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize);

      return {
        products: paginated,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / pageSize) || 1,
        limit: pageSize
      };
    };

    const res = await fetchSafe(url, {}, null);
    return res || fallback();
  },

  async getProductById(id) {
    const fallbackItem = fallbackProducts.find(p => p.id === id);
    return await fetchSafe(`/products/${id}`, {}, fallbackItem);
  },

  async getFeaturedProducts() {
    const fallback = fallbackProducts.filter(p => p.isFeatured).slice(0, 8);
    const res = await fetchSafe('/products/featured', {}, null);
    return res || fallback;
  },

  async getTrendingProducts() {
    const fallback = fallbackProducts.filter(p => p.isTrending).slice(0, 8);
    const res = await fetchSafe('/products/trending', {}, null);
    return res || fallback;
  },

  async getCategories() {
    const map = {};
    fallbackProducts.forEach(p => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    const fallback = Object.entries(map).map(([name, count]) => ({ name, count }));
    const res = await fetchSafe('/products/categories', {}, null);
    return res || fallback;
  },

  async getBrands() {
    const fallback = [...new Set(fallbackProducts.map(p => p.brand))].sort();
    const res = await fetchSafe('/products/brands', {}, null);
    return res || fallback;
  },

  async addProductReview(id, review) {
    return await fetchSafe(`/products/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review)
    }, { success: true });
  },

  // Orders
  async createOrder(orderData) {
    const localOrder = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      ...orderData,
      status: 'Processing',
      createdAt: new Date().toISOString()
    };
    let res;
    try {
      res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch (err) {
      console.warn(`[API Fallback on /orders]: ${err.message}. Using built-in local store.`);
      return localOrder;
    }

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Server reached but order was rejected/not saved - surface it, never fake success
      const error = new Error(body.error || `Order failed (status ${res.status})`);
      error.status = res.status;
      throw error;
    }
    return body;
  },

  async getOrders(sessionId, options = {}) {
    const params = new URLSearchParams();
    if (sessionId) params.append('sessionId', sessionId);
    if (options.filter) params.append('filter', options.filter);
    const qs = params.toString();
    const res = await fetchSafe(`/orders${qs ? `?${qs}` : ''}`, {}, []);
    return res || [];
  },

  async getOrderById(orderId) {
    if (!orderId) return null;
    return await fetchSafe(`/orders/${encodeURIComponent(orderId)}`, {}, null);
  },

  // AI Behavior Tracking & Insights
  async trackEvent(eventData) {
    return await fetchSafe('/ai/track', {
      method: 'POST',
      body: JSON.stringify(eventData)
    }, { success: true });
  },

  async getAIInsights(sessionId = 'default-user') {
    return await fetchSafe(`/ai/insights?sessionId=${sessionId}`, {}, null);
  },

  async getAIRecommendations(sessionId = 'default-user') {
    const fallback = fallbackProducts.filter(p => p.isFeatured || p.isTrending).slice(0, 6);
    const res = await fetchSafe(`/ai/recommendations?sessionId=${sessionId}`, {}, null);
    return res || fallback;
  },

  async resetAILogs(sessionId = 'default-user') {
    return await fetchSafe('/ai/reset', {
      method: 'POST',
      body: JSON.stringify({ sessionId })
    }, { success: true });
  },

  async simulateAIPreset(preset = 'tech', sessionId = 'default-user') {
    return await fetchSafe('/ai/simulate-preset', {
      method: 'POST',
      body: JSON.stringify({ preset, sessionId })
    }, null);
  },

  // Health
  async getHealth() {
    return await fetchSafe('/health', {}, {
      status: 'client-offline-mode',
      database: { connected: false, mode: 'Local In-Browser Mode' }
    });
  }
};
