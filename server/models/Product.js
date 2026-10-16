import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: String, required: true },
  comment: { type: String, required: true }
}, { _id: false });

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, default: 10, min: 0 },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isNewProduct: { type: Boolean, default: false },
  images: [{ type: String }],
  colors: [colorSchema],
  sizes: [{ type: String }],
  description: { type: String, required: true },
  features: [{ type: String }],
  specifications: { type: Map, of: String },
  tags: [{ type: String }],
  reviews: [reviewSchema]
}, { timestamps: true });

// Index for fast searching
productSchema.index({ name: 'text', brand: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1, rating: -1 });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
