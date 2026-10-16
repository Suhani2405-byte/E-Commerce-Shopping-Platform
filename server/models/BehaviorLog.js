import mongoose from 'mongoose';

const behaviorLogSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  eventType: {
    type: String,
    required: true,
    enum: ['product_view', 'search', 'category_visit', 'wishlist_toggle', 'add_to_cart', 'checkout_intent', 'purchase']
  },
  productId: { type: String },
  productName: { type: String },
  category: { type: String },
  brand: { type: String },
  price: { type: Number },
  tags: [{ type: String }],
  searchQuery: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

behaviorLogSchema.index({ sessionId: 1, eventType: 1, timestamp: -1 });

const BehaviorLog = mongoose.models.BehaviorLog || mongoose.model('BehaviorLog', behaviorLogSchema);
export default BehaviorLog;
