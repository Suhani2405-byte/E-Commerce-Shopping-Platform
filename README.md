# 🛍️ ShopVibe — Modern MERN E-Commerce Shopping Platform with AI Customer Behavior Engine

An enterprise-ready, responsive, full-stack **MERN (MongoDB, Express, React, Node.js)** e-commerce application powered by **Tailwind CSS**, **Vite**, **Lucide Icons**, and a real-time **AI Customer Behavior & Recommendation Analysis Engine**.

Includes **50 rich dummy products**, **9 main pages**, **cart & checkout with working coupons**, and full configuration for local development and seamless **Vercel** hosting.

---

## 🌟 Key Features & Tasks Overview

### 1. Home & Product Discovery UI
- **Responsive Navigation**: Top promotional announcement banner, brand logo, live search bar with instant autocomplete, categories dropdown, wishlist badge, cart drawer trigger, and dark/light theme switch.
- **Hero Carousel Banner**: Multi-slide seasonal deals with call-to-actions, responsive controls, and auto-play.
- **Category Discovery**: Interactive visual cards for all 6 catalog collections with item counts.
- **Featured Products**: Hand-selected products with discount badges, ratings, and quick-add actions.
- **Limited Flash Deals**: Live ticking countdown timer (Hours : Minutes : Seconds) and copyable `SAVE20` coupon chip.
- **Trending Products**: Popular community favorites with live review stats.
- **Footer**: Newsletter subscription, category links, trust badges, customer care contacts, and accepted payment badges.

### 2. Product Listing & Filtering
- **Multi-Facet Sidebar**: Filter simultaneously by:
  - Category (Electronics, Fashion, Home & Living, Beauty, Sports & Fitness, Books)
  - Price range slider (Up to $2,500)
  - Minimum Customer Rating (4.8★, 4.5★, 4.0★)
  - Brand checkboxes (Sony, Apple, Logitech, Dell, Levoit, Bowflex, Lamy, etc.)
  - "In Stock Only" toggle
- **Sorting Options**: Featured & Relevance, Price: Low to High, Price: High to Low, Highest Rated, Most Popular, New Arrivals.
- **View Modes**: Toggle between responsive Grid View and List View.
- **Pagination**: Numbered pagination with Previous/Next controls and results counter.
- **Search Integration**: Deep keyword search across product titles, descriptions, and AI tags.

### 3. Product Details & Shopping Cart
- **Interactive Gallery**: High-res master showcase image with clickable multi-angle thumbnails.
- **Product Information**: Brand badge, rating breakdown, stock status, strikethrough original price, and savings badge.
- **Options Selection**: Dynamic color selector chips (with color swatches) and size/spec selector buttons.
- **Quantity Stepper**: Responsive increment/decrement controls bounded by real product inventory.
- **Action CTAs**: "Add to Cart" with visual feedback, "Buy Now" for 1-click checkout, and Wishlist heart toggle.
- **Specifications & Highlights Tabs**: Technical specifications table, key feature checklist, and warranty details.
- **Customer Reviews UI**: Overall rating score, 5-star distribution progress bars, list of verified buyer reviews, and interactive **"Write a Review"** form.
- **Similar Items**: Dynamic AI-curated related products based on shared category and tags.

### 4. Checkout & Order Interface
- **Slide-Over Cart Drawer**: Slide-out drawer with live item editing, free shipping progress meter, subtotal, and checkout CTA.
- **Dedicated Cart Page**: Full-screen cart management with itemized pricing and free shipping progress meter.
- **Shipping Address Form**: Full Name, Email, Phone, Street, City, State, ZIP, and a one-click **"Auto-Fill Demo Address"** button for fast testing.
- **Payment Method Interface**:
  - **Credit/Debit Card**: Features an interactive realistic digital card mockup updating in real time as you type cardholder name, number, expiry, and CVV.
  - **UPI / QR**: Instant payment mockup for Google Pay, PhonePe, Paytm.
  - **Cash on Delivery (COD)**: Doorstep cash/card payment option.
  - **PayPal Express**: Safe buyer protection flow.
- **Coupon Code Engine**: Working promo codes:
  - `SAVE20` — 20% discount storewide
  - `WELCOME10` — 10% new customer discount
  - `FLAT50` — $50 off orders over $200
  - `FREESHIP` — Free express shipping
- **Order Confirmation & Confetti Celebration**: Celebration modal powered by `canvas-confetti`, unique Order ID (e.g. `ORD-849201`), delivery estimate, and **"Print Receipt"** button.
- **Order History Screen**: Chronological tracking of past orders with item previews, status badges (`Processing`, `Delivered`), and totals.

### 5. AI — Customer Behavior Analysis System
Tracks the complete simulated frontend customer funnel:
$$\text{Product View} \longrightarrow \text{Search} \longrightarrow \text{Category Visit} \longrightarrow \text{Wishlist} \longrightarrow \text{Add to Cart} \longrightarrow \text{Purchase Intent}$$

Based on this real-time data stream, the platform displays:
- **Purchase-Intent Indicator**: Radial/linear gauge calculating score from 0% to 100% with tiers:
  - *Casual Explorer* (0% - 34%)
  - *Engaged Researcher* (35% - 54%)
  - *High Purchase Intent* (55% - 79%)
  - *Immediate Buyer* (80% - 100%)
- **Personalized AI Product Recommendations**: Dynamically ranked based on tag overlap, category dwell-time, and cart additions.
- **Shopping Interest Distribution**: Color-coded percentage breakdown of user interest across catalog categories.
- **Frequently Viewed Products**: Tracks products viewed most often in the session.
- **Shopping Behavior Summary**: Natural language AI synthesis of user shopping state.
- **Live Event Stream**: Chronological timeline of events captured.
- **One-Click Persona Simulation Presets**:
  - `⚡ Tech Enthusiast` (simulates headphones, 4K monitor, and mechanical keyboard activity)
  - `✨ Luxury & Fashionista` (simulates cashmere sweater, leather bomber, and chronograph watch activity)
  - `🌿 Wellness & Sanctuary` (simulates air purifier, essential oil diffuser, and hyaluronic serum activity)
  - `Reset Profile Data` (clears logs for a fresh simulation)

---

## 📄 Main Pages Implemented

| # | Page | Route | Description |
|---|------|-------|-------------|
| 1 | **Home Page** | `/` | Hero carousel, category discovery, featured products, countdown deals, trending section |
| 2 | **Product Listing Page** | `/products` | Filters (category, price slider, rating, brand, stock), sorting, pagination, grid/list view |
| 3 | **Product Details Page** | `/product/:id` | Image gallery, options selection, reviews UI, specifications, AI similar items |
| 4 | **Shopping Cart Page** | `/cart` | Item list, quantity management, coupon code input, free shipping bar |
| 5 | **Checkout Page** | `/checkout` | Shipping address, payment selector with live card preview, order placement |
| 6 | **Order History Page** | `/orders` | Past order tracking, delivery status, receipts, and order history |
| 7 | **AI Customer Dashboard** | `/ai-dashboard` | Purchase-intent gauge, interest breakdown, event stream, persona simulation |
| 8 | **About Us Page** | `/about` | Brand story, 4 core pillars, statistics counters, and ethical sourcing standards |
| 9 | **Contact Us Page** | `/contact` | Message form, support hotline, email, office addresses, and FAQ accordion |
| 10 | **Blog Listing Page** | `/blogs` | Editorial buying guides, ergonomics articles, and category filter |
| 11 | **Blog Details Page** | `/blog/:slug` | Full-length article, author bio, and "Featured Gear in this Guide" product links |
| 12 | **Wishlist Page** | `/wishlist` | Saved favorite products with quick-add to cart and clear option |

---

## 📦 50 Curated Dummy Products Dataset

The catalog contains **50 realistic, high-quality products** with Unsplash photos, specifications, color variants, size options, and authentic customer reviews across **6 major categories**:

1. **Electronics (1-10)**: Sony WH-1000XM5 Headphones, Apple Watch Series 9, Logitech MX Master 3S Mouse, Keychron Q1 Pro Mechanical Keyboard, Dell UltraSharp 27" 4K Monitor, Bose SoundLink Flex, DJI Mini 4 Pro Drone, Anker Prime 20,000mAh Power Bank, Kindle Paperwhite, Sony Alpha 7 IV Camera.
2. **Fashion & Apparel (11-20)**: Full-Grain Leather Bomber Jacket, Italian White Leather Sneakers, Pure Mongolian Cashmere Sweater, Waxed Canvas Duffel Bag, Polarized Aviator Sunglasses, Selvedge Raw Denim Jeans, Silk Floral Midi Dress, Heavyweight Organic Cotton Hoodie, Automatic Chronograph Watch, Slim RFID Leather Wallet.
3. **Home & Living (21-30)**: Ergonomic High-Back Mesh Desk Chair, AeroPress XL Coffee Maker, Levoit Smart True HEPA Air Purifier, Minimalist Ceramic Fluted Vase, Ultrasonic Aromatherapy Diffuser, Tri-Ply Stainless Steel 10-Piece Cookware, Smart LED Floor Lamp, Memory Foam Cooling Gel Pillow, Bohemian Hand-Woven Wool Rug, Mid-Century Velvet Accent Armchair.
4. **Beauty & Personal Care (31-38)**: Hyaluronic Acid Multi-Molecular Hydration Serum, Sonic Electric Toothbrush with UV Case, Vitamin C + Ferulic Acid Radiance Oil, Dead Sea Mud & Bamboo Charcoal Mask, Organic Bulgarian Rose Water Toner, Peptide Awakening Eye Cream, Rosemary & Biotin Hair Oil, Ceramide Barrier Defense Moisture Cream.
5. **Sports & Fitness (39-44)**: Bowflex SelectTech 552 Adjustable Dumbbells, Manduka PRO Yoga Mat, Garmin Forerunner 265 GPS Watch, Hydro Flask 32 oz Wide Mouth, TriggerPoint GRID Foam Roller, Heavy-Duty Resistance Loop Bands.
6. **Books & Stationery (45-50)**: *Atomic Habits* by James Clear (Collector Edition), *Designing Data-Intensive Applications* by Martin Kleppmann, Leuchtturm1917 Dotted A5 Journal, Lamy 2000 Makrolon Fountain Pen, *Deep Work* by Cal Newport, Solid Walnut Wood Desk Organizer & Phone Stand.

---

## 🚀 Quick Start (Run Locally in 2 Minutes)

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Step 1: Install Dependencies
Open your terminal in the project root directory and run:
```bash
npm run install:all
```
*(This installs root, client, and server dependencies in one command).*

### Step 2: Start the Development Server
Run:
```bash
npm run dev
```

This launches both servers concurrently:
- **Frontend (React + Vite)**: `http://localhost:3000`
- **Backend (Node.js + Express API)**: `http://localhost:5000`

> 💡 **Smart In-Memory Store Active by Default**:  
> You can immediately start using the application! If you haven't connected MongoDB yet, the backend automatically runs in **Smart Memory Store** mode using the built-in 50 products. Nothing will crash!

---

## 🍃 Connecting to MongoDB Atlas (Database Guide)

Follow these simple steps to connect your free cloud MongoDB database:

### 1. Create a Free MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Click **"Create a Deployment"** and choose the **M0 Free Tier** cluster.
3. Choose your preferred region and click **"Create"**.

### 2. Set Up Database Access & Network
1. Under **Security** $\rightarrow$ **Database Access**, create a user (e.g., username `ecommerce_user` and a strong password).
2. Under **Security** $\rightarrow$ **Network Access**, click **"Add IP Address"** and select **"Allow Access from Anywhere"** (`0.0.0.0/0`) so Vercel and your local machine can connect.

### 3. Copy Your Connection String
1. Under **Database** $\rightarrow$ Click **"Connect"** $\rightarrow$ **"Drivers"** (Node.js).
2. Copy the connection string format:
   ```
   mongodb+srv://<username>:<password>@cluster0.yourcluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
3. Replace `<username>` and `<password>` with the credentials you created.

### 4. Configure `server/.env`
Create a `.env` file inside the `server/` folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
```

### 5. Seed the 50 Products into MongoDB
Run this command from the root directory:
```bash
npm run seed
```
You will see:
```
⏳ Connecting to MongoDB...
✅ Connected to MongoDB successfully.
🗑️ Clearing existing products...
🌱 Seeding 50 comprehensive products...
🎉 Success! Successfully seeded 50 products into your MongoDB database!
```
Your MongoDB database is now populated!

---

## ☁️ How to Deploy on Vercel

This repository is pre-configured with `vercel.json` and a serverless API adapter (`api/index.js`) for one-click Vercel deployment!

### Option A: Deploy via GitHub (Recommended)
1. Initialize git and push this project to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of E-Commerce Platform"
   git branch -M main
   git remote add origin https://github.com/your-username/ecommerce-shopping-platform.git
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com) and click **"Add New" $\rightarrow$ "Project"**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add:
   - `MONGODB_URI`: `your_mongodb_atlas_connection_string`
   - `NODE_ENV`: `production`
5. Click **"Deploy"**!  
   Vercel will automatically build the React Vite frontend and deploy the Express API to Vercel Serverless Functions.

### Option B: Deploy via Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. In the project root, run:
   ```bash
   vercel
   ```
3. When prompted, link the project and add your `MONGODB_URI` environment variable when prompted or in your Vercel Project Settings.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**:
  - React 18 + Vite
  - React Router DOM v6
  - Tailwind CSS + PostCSS + Autoprefixer
  - Lucide React (featherlight SVG icons)
  - Canvas Confetti (celebration animations)
  - React Context (CartContext, WishlistContext, AIBehaviorContext, ThemeContext)
- **Backend**:
  - Node.js + Express.js
  - Mongoose ODM (Product, Order, BehaviorLog models)
  - CORS (cross-origin resource sharing)
  - Dotenv (environment configuration)
  - Express Serverless Adapter for Vercel
- **Database**:
  - MongoDB Atlas (Cloud)
  - Graceful In-Memory fallback store

---

## 🎯 Verification & Testing Checklist

- [x] **Home Page**: Hero carousel with 3 slides, categories, featured grid, countdown flash sale, trending items.
- [x] **Product Listing**: 6 categories, price range slider ($10 - $2,500), minimum rating filter, brand checkboxes, in-stock filter, sorting (price, popularity, rating, newness), pagination, grid/list toggle.
- [x] **Product Details**: Image zoom/thumbnails, color selection, size selection, quantity stepper, stock alerts, technical specifications, verified customer reviews, review submission form.
- [x] **Cart & Checkout**: Slide-over drawer, quantity updates, free shipping meter, promo coupons (`SAVE20`, `WELCOME10`, `FLAT50`, `FREESHIP`), address form with demo auto-fill, payment selector (Credit Card with live card preview, UPI, COD, PayPal), confetti order modal, print receipt.
- [x] **AI Behavior Analysis**: Real-time tracking of funnel events (View $\rightarrow$ Search $\rightarrow$ Category $\rightarrow$ Wishlist $\rightarrow$ Cart $\rightarrow$ Intent), purchase-intent gauge, shopping interest distribution, personalized recommendations, timeline stream, persona presets (`Tech`, `Fashion`, `Wellness`).
- [x] **Additional Pages**: About Us, Contact Us with working message form & FAQs, Blog Listing & Blog Details with related product links, Wishlist page.
- [x] **Database & Hosting**: MongoDB Atlas seed script (`npm run seed`), automatic in-memory fallback, `vercel.json` and `api/index.js` configured.

---

**Developed for Project 1 — E-Commerce Shopping Platform.**
