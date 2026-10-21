export const products = [
  // --- ELECTRONICS (1-10) ---
  {
    id: "prod-1",
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 348.00,
    originalPrice: 399.99,
    discount: 13,
    rating: 4.8,
    reviewCount: 342,
    stock: 24,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
    ],
    colors: [
      { name: "Silver", code: "#dcdde1" },
      { name: "Midnight Black", code: "#1e272e" },
      { name: "Midnight Blue", code: "#192a56" }
    ],
    sizes: ["One Size"],
    description: "Industry-leading noise cancellation optimized with two processors and 8 microphones. Enjoy crystal clear hands-free calling and up to 30 hours of battery life with ultra-comfortable lightweight design.",
    features: [
      "Industry-leading noise cancellation with Auto NC Optimizer",
      "Magnificent Sound engineered with the new Integrated Processor V1",
      "Crystal-clear hands-free calling with 4 beamforming microphones",
      "Up to 30-hour battery life with quick charging (3 min for 3 hours)"
    ],
    specifications: {
      "Battery Life": "30 Hours",
      "Connectivity": "Bluetooth 5.2, 3.5mm Jack",
      "Weight": "250g",
      "Warranty": "1 Year Manufacturer"
    },
    tags: ["audio", "wireless", "noise-cancelling", "sony", "premium"],
    reviews: [
      { id: "r1", user: "Alex Mercer", rating: 5, date: "2026-03-12", comment: "The noise cancellation is phenomenal for remote work and flights!" },
      { id: "r2", user: "Sarah Jenkins", rating: 4.5, date: "2026-02-28", comment: "Incredible soundstage and battery life lasts all week." }
    ]
  },
  {
    id: "prod-2",
    name: "Apple Watch Series 9 GPS 45mm",
    brand: "Apple",
    category: "Electronics",
    price: 399.00,
    originalPrice: 429.00,
    discount: 7,
    rating: 4.9,
    reviewCount: 512,
    stock: 18,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    colors: [
      { name: "Midnight", code: "#191924" },
      { name: "Starlight", code: "#f5f6fa" },
      { name: "Product Red", code: "#e84118" }
    ],
    sizes: ["41mm", "45mm"],
    description: "Smarter, brighter, and mightier. Powered by the S9 SiP chip, enabling a magical way to use your watch without touching the screen with Double Tap gesture.",
    features: [
      "Always-On Retina display up to 2000 nits",
      "Double tap gesture for single-hand control",
      "Advanced health sensors: ECG, Blood Oxygen, Sleep Stages",
      "Crash Detection and Fall Detection emergency SOS"
    ],
    specifications: {
      "Display": "Always-On Retina LTPO OLED",
      "Processor": "Apple S9 SiP",
      "Water Resistance": "50m Water Resistant",
      "Battery": "Up to 18 hours normal, 36 hours low power"
    },
    tags: ["smartwatch", "apple", "fitness", "wearable", "gadget"],
    reviews: [
      { id: "r3", user: "Michael Chen", rating: 5, date: "2026-04-01", comment: "Double tap gesture changed the game when my hands are full." }
    ]
  },
  {
    id: "prod-3",
    name: "Logitech MX Master 3S Performance Wireless Mouse",
    brand: "Logitech",
    category: "Electronics",
    price: 99.99,
    originalPrice: 119.99,
    discount: 17,
    rating: 4.7,
    reviewCount: 289,
    stock: 45,
    isFeatured: false,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80"
    ],
    colors: [
      { name: "Graphite", code: "#2f3542" },
      { name: "Pale Gray", code: "#dcdde1" }
    ],
    sizes: ["Standard"],
    description: "An icon remastered. With Quiet Clicks and 8,000 DPI track-on-glass sensor, feel every moment of your workflow with even more precision and speed.",
    features: [
      "Quiet Clicks deliver 90% less click noise",
      "8,000 DPI track-anywhere sensor (even on glass)",
      "MagSpeed electromagnetic scroll wheel speeds up to 1000 lines/sec",
      "Multi-device & multi-OS cross-computer control"
    ],
    specifications: {
      "Sensor": "Darkfield 8000 DPI",
      "Battery": "Rechargeable Li-Po (500 mAh) up to 70 days",
      "Buttons": "7 customizable buttons",
      "Connectivity": "Bluetooth + Logi Bolt USB"
    },
    tags: ["mouse", "productivity", "logitech", "office", "wireless"],
    reviews: [
      { id: "r4", user: "David Ross", rating: 5, date: "2026-01-18", comment: "Best productivity mouse ever made, period." }
    ]
  },
  {
    id: "prod-4",
    name: "Keychron Q1 Pro Custom Mechanical Keyboard",
    brand: "Keychron",
    category: "Electronics",
    price: 189.00,
    originalPrice: 219.00,
    discount: 14,
    rating: 4.8,
    reviewCount: 164,
    stock: 12,
    isFeatured: true,
    isTrending: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"
    ],
    colors: [
      { name: "Carbon Black", code: "#1e1e1e" },
      { name: "Silver Gray", code: "#7f8c8d" }
    ],
    sizes: ["Gateron Red (Linear)", "Gateron Brown (Tactile)", "Gateron Banana"],
    description: "Full aluminum QMK/VIA wireless custom mechanical keyboard with double-gasket design, hot-swappable switches, and south-facing RGB backlight.",
    features: [
      "Full CNC machined 6063 aluminum body",
      "Double-Gasket mount design for acoustical resonance dampening",
      "Bluetooth 5.1 & Type-C wired dual connectivity",
      "Hot-swappable switch sockets for easy customization"
    ],
    specifications: {
      "Layout": "75% ANSI layout",
      "Backlight": "South-facing RGB",
      "Battery": "4000 mAh rechargeable battery",
      "Weight": "1820g"
    },
    tags: ["keyboard", "mechanical", "custom", "gaming", "desk-setup"],
    reviews: [
      { id: "r5", user: "Kevin Lam", rating: 5, date: "2026-03-02", comment: "The thocky sound straight out of the box is incredible." }
    ]
  },
  {
    id: "prod-5",
    name: "Dell UltraSharp 27-inch 4K USB-C Hub Monitor (U2723QE)",
    brand: "Dell",
    category: "Electronics",
    price: 529.99,
    originalPrice: 619.99,
    discount: 15,
    rating: 4.7,
    reviewCount: 198,
    stock: 10,
    isFeatured: false,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
      "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=800&q=80"
    ],
    colors: [{ name: "Platinum Silver", code: "#b2bec3" }],
    sizes: ["27-inch 4K", "32-inch 4K"],
    description: "Brilliant visuals and exceptional contrast with revolutionary IPS Black technology. Integrated 90W USB-C hub charges your laptop while driving the 4K display.",
    features: [
      "27-inch 4K UHD (3840 x 2160) IPS Black panel",
      "2000:1 contrast ratio & 98% DCI-P3 wide color gamut",
      "Built-in 90W USB-C hub with RJ45 Ethernet",
      "ComfortView Plus low blue light without color shifting"
    ],
    specifications: {
      "Resolution": "3840 x 2160 at 60 Hz",
      "Panel Type": "IPS Black",
      "Ports": "HDMI 2.0, DP 1.4, USB-C (90W PD), USB-A 3.2, RJ45",
      "Stand": "Height, tilt, swivel, and pivot adjustable"
    },
    tags: ["monitor", "4k", "display", "dell", "productivity"],
    reviews: [
      { id: "r6", user: "Amanda Ward", rating: 4.8, date: "2026-02-14", comment: "The USB-C single cable setup keeps my desk super clean." }
    ]
  },
  {
    id: "prod-6",
    name: "Bose SoundLink Flex Bluetooth Portable Speaker",
    brand: "Bose",
    category: "Electronics",
    price: 149.00,
    originalPrice: 179.00,
    discount: 17,
    rating: 4.6,
    reviewCount: 220,
    stock: 35,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"
    ],
    colors: [
      { name: "Carmine Red", code: "#c23616" },
      { name: "Black", code: "#1e272e" },
      { name: "Stone Blue", code: "#718093" }
    ],
    sizes: ["Standard"],
    description: "Astonishing sound wherever life takes you. Waterproof, dustproof, and ruggedly built with PositionIQ technology that automatically optimizes sound orientation.",
    features: [
      "Clear, deep sound with customized transducer and dual passive radiators",
      "IP67 waterproof and dustproof (it even floats!)",
      "PositionIQ technology detects orientation and optimizes audio",
      "Up to 12 hours of playtime on a single charge"
    ],
    specifications: {
      "Playtime": "Up to 12 hours",
      "Durability": "IP67 Rating",
      "Range": "30 ft (9 m)",
      "Charging": "USB-C"
    },
    tags: ["speaker", "audio", "bose", "outdoor", "waterproof"],
    reviews: [
      { id: "r7", user: "Chris Evans", rating: 5, date: "2026-03-20", comment: "Loud, punchy bass, and survives camping in the rain." }
    ]
  },
  {
    id: "prod-7",
    name: "DJI Mini 4 Pro Drone with Fly More Combo",
    brand: "DJI",
    category: "Electronics",
    price: 899.00,
    originalPrice: 999.00,
    discount: 10,
    rating: 4.9,
    reviewCount: 175,
    stock: 8,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80"
    ],
    colors: [{ name: "Classic Gray", code: "#a4b0be" }],
    sizes: ["Fly More Combo (DJI RC 2)"],
    description: "Under 249g ultra-lightweight camera drone with Omnidirectional Obstacle Sensing, 4K/60fps HDR True Vertical Shooting, and 34-min flight time.",
    features: [
      "Under 249 g - No FAA registration required in most regions",
      "Omnidirectional active obstacle avoidance sensors",
      "4K/60fps HDR video & 4K/100fps slow-motion capture",
      "20km FHD video transmission with DJI O4"
    ],
    specifications: {
      "Flight Time": "34 minutes (45 with Intelligent Flight Battery Plus)",
      "Sensor": "1/1.3-inch CMOS",
      "Max Transmission": "20 km",
      "Weight": "249 g"
    },
    tags: ["drone", "dji", "camera", "photography", "travel"],
    reviews: [
      { id: "r8", user: "Sam Wilson", rating: 5, date: "2026-01-29", comment: "Vertical shooting for social media video is flawless." }
    ]
  },
  {
    id: "prod-8",
    name: "Anker Prime 20,000mAh Power Bank (200W)",
    brand: "Anker",
    category: "Electronics",
    price: 109.99,
    originalPrice: 129.99,
    discount: 15,
    rating: 4.7,
    reviewCount: 310,
    stock: 50,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80"
    ],
    colors: [{ name: "Metallic Black", code: "#2d3436" }],
    sizes: ["20,000 mAh"],
    description: "Compact 200W total output fast portable charger with smart digital display, capable of fast-charging two laptops simultaneously.",
    features: [
      "200W total fast output with dual 100W USB-C ports",
      "Smart digital display shows remaining power, input/output wattage",
      "20,000mAh airline-approved travel-friendly capacity",
      "ActiveShield 2.0 temperature protection monitors temp 3M times/day"
    ],
    specifications: {
      "Capacity": "20,000 mAh / 72Wh",
      "Total Output": "200W Max",
      "Ports": "2x USB-C, 1x USB-A",
      "Weight": "540g"
    },
    tags: ["charger", "anker", "powerbank", "travel", "gadget"],
    reviews: [
      { id: "r9", user: "Rachel Green", rating: 5, date: "2026-02-19", comment: "Charges my MacBook Pro at full speed while on the train." }
    ]
  },
  {
    id: "prod-9",
    name: "Kindle Paperwhite 16GB (6.8-inch Display)",
    brand: "Amazon",
    category: "Electronics",
    price: 139.99,
    originalPrice: 149.99,
    discount: 7,
    rating: 4.8,
    reviewCount: 640,
    stock: 40,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80"
    ],
    colors: [
      { name: "Black", code: "#1e272e" },
      { name: "Agave Green", code: "#2ed573" },
      { name: "Denim", code: "#3742fa" }
    ],
    sizes: ["16GB"],
    description: "6.8” glare-free display with adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns. Waterproof for beach and bath reading.",
    features: [
      "6.8-inch 300 ppi glare-free display reads like real paper",
      "Adjustable warm light from white to amber",
      "IPX8 waterproof rating against accidental water submersion",
      "Battery life of up to 10 weeks on a single USB-C charge"
    ],
    specifications: {
      "Display Size": "6.8 inches",
      "Storage": "16 GB",
      "Waterproofing": "IPX8",
      "Weight": "205g"
    },
    tags: ["kindle", "ereader", "books", "reading", "amazon"],
    reviews: [
      { id: "r10", user: "Laura Bennett", rating: 5, date: "2026-03-10", comment: "The warm backlight is so easy on the eyes at night." }
    ]
  },
  {
    id: "prod-10",
    name: "Sony Alpha 7 IV Full-Frame Mirrorless Camera",
    brand: "Sony",
    category: "Electronics",
    price: 2398.00,
    originalPrice: 2498.00,
    discount: 4,
    rating: 4.9,
    reviewCount: 94,
    stock: 6,
    isFeatured: true,
    isTrending: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"
    ],
    colors: [{ name: "Matte Black", code: "#1e1e1e" }],
    sizes: ["Body Only", "With 28-70mm Lens Kit"],
    description: "The benchmark for hybrid creators. Equipped with 33MP Exmor R sensor, 4K 60p 10-bit 4:2:2 video, next-generation real-time autofocus, and BIONZ XR processing.",
    features: [
      "33MP Full-frame Exmor R back-illuminated CMOS sensor",
      "Real-time Eye AF for Humans, Animals, and Birds",
      "4K 60p 10-bit 4:2:2 recording with S-Cinetone",
      "5.5-step 5-axis in-body image stabilization"
    ],
    specifications: {
      "Sensor": "33 MP Full-Frame",
      "ISO": "100-51200",
      "Video": "4K 60p 10-bit",
      "Mount": "Sony E-mount"
    },
    tags: ["camera", "sony", "photography", "videography", "creator"],
    reviews: [
      { id: "r11", user: "Marcus Stone", rating: 5, date: "2026-02-05", comment: "The best hybrid camera on the market. Colors are superb." }
    ]
  },

  // --- FASHION & APPAREL (11-20) ---
  {
    id: "prod-11",
    name: "Classic Heritage Leather Bomber Jacket",
    brand: "UrbanCraft",
    category: "Fashion",
    price: 249.99,
    originalPrice: 320.00,
    discount: 22,
    rating: 4.8,
    reviewCount: 145,
    stock: 19,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80"
    ],
    colors: [
      { name: "Espresso Brown", code: "#4a2c11" },
      { name: "Obsidian Black", code: "#1e1e1e" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Crafted from 100% full-grain lambskin leather with heavy-duty YKK brass zippers and quilted satin thermal lining. Timeless aviation silhouette designed to age gracefully.",
    features: [
      "100% genuine supple lambskin leather outer",
      "Quilted insulation lining for all-season warmth",
      "Ribbed collar, cuffs, and hem for tailored wind protection",
      "Two deep exterior hand pockets + interior security pocket"
    ],
    specifications: {
      "Material": "100% Full Grain Lambskin",
      "Lining": "100% Quilted Satin Polyester",
      "Closure": "Heavy-duty YKK Metal Zipper",
      "Care": "Professional Leather Clean Only"
    },
    tags: ["jacket", "leather", "outerwear", "fashion", "menswear"],
    reviews: [
      { id: "r12", user: "Jonathan Vance", rating: 5, date: "2026-03-14", comment: "Top notch leather quality! Smells amazing and fits like a glove." }
    ]
  },
  {
    id: "prod-12",
    name: "Minimalist Italian White Leather Sneakers",
    brand: "AeroStep",
    category: "Fashion",
    price: 139.00,
    originalPrice: 175.00,
    discount: 20,
    rating: 4.7,
    reviewCount: 218,
    stock: 28,
    isFeatured: false,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
    ],
    colors: [
      { name: "Crisp White", code: "#f5f6fa" },
      { name: "White/Gum Sole", code: "#e1b12c" }
    ],
    sizes: ["7 US", "8 US", "9 US", "10 US", "11 US", "12 US"],
    description: "Clean, ultra-versatile low-top sneakers handmade with Italian Nappa leather, waxed cotton laces, and reinforced Margom rubber soles.",
    features: [
      "Buttery-soft Italian Nappa leather construction",
      "Removable memory foam footbed with arch support",
      "Vulcanized non-slip rubber cupsole",
      "Versatile styling pairs effortlessly from suits to denim"
    ],
    specifications: {
      "Upper": "100% Italian Nappa Leather",
      "Insole": "Antimicrobial Memory Foam",
      "Outsole": "Durable Margom Rubber",
      "Origin": "Handcrafted in Portugal"
    },
    tags: ["shoes", "sneakers", "leather", "casual", "minimalist"],
    reviews: [
      { id: "r13", user: "Claire Miller", rating: 5, date: "2026-02-18", comment: "Zero blister break-in period. Wear them daily to work." }
    ]
  },
  {
    id: "prod-13",
    name: "Pure Mongolian Cashmere Crewneck Sweater",
    brand: "LuxeKnit",
    category: "Fashion",
    price: 168.00,
    originalPrice: 220.00,
    discount: 24,
    rating: 4.9,
    reviewCount: 104,
    stock: 15,
    isFeatured: true,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80"
    ],
    colors: [
      { name: "Heather Gray", code: "#bdc3c7" },
      { name: "Camel", code: "#cd6133" },
      { name: "Navy Blue", code: "#1e3799" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Spun from 100% Grade-A Mongolian cashmere fiber. Featherlight yet extraordinarily insulating, delivering unmatched cloud-soft comfort against skin.",
    features: [
      "100% Grade-A sustainable Mongolian cashmere",
      "2-ply tightly twisted yarn prevents pilling",
      "Ribbed collar, cuffs, and hem that retain their shape",
      "Naturally thermo-regulating and breathable"
    ],
    specifications: {
      "Fabric": "100% Grade-A Cashmere",
      "Yarn Count": "2/26 Nm",
      "Gauge": "12 GG",
      "Care": "Hand wash cold or dry clean"
    },
    tags: ["cashmere", "sweater", "luxury", "winter", "knitwear"],
    reviews: [
      { id: "r14", user: "Elena Rostova", rating: 5, date: "2026-01-22", comment: "Pure indulgence. Softer than any cashmere sweater I own." }
    ]
  },
  {
    id: "prod-14",
    name: "Waxed Canvas & Leather Weekend Duffel Bag",
    brand: "TrailBlazer",
    category: "Fashion",
    price: 119.50,
    originalPrice: 159.00,
    discount: 25,
    rating: 4.7,
    reviewCount: 88,
    stock: 22,
    isFeatured: false,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80"
    ],
    colors: [
      { name: "Olive Green", code: "#57606f" },
      { name: "Charcoal Khaki", code: "#2f3542" }
    ],
    sizes: ["45 Liter (Carry-On)"],
    description: "Rugged 18oz water-resistant waxed canvas duffel trimmed with rich crazy-horse leather. Spacious main cabin with separate ventilated shoe compartment.",
    features: [
      "Water-repellent heavy 18oz paraffin-waxed cotton canvas",
      "Crazy-horse bridle leather handles and accents",
      "Separate bottom zipper shoe/laundry compartment",
      "Meets all major airline carry-on size standards"
    ],
    specifications: {
      "Dimensions": "21 x 11.5 x 12 inches",
      "Volume": "45 Liters",
      "Hardware": "Antique brass rust-proof hardware",
      "Strap": "Detachable padded shoulder strap"
    },
    tags: ["bag", "duffel", "travel", "leather", "weekend"],
    reviews: [
      { id: "r15", user: "Brian Lee", rating: 4.5, date: "2026-03-08", comment: "The shoe compartment is brilliant. Built like an absolute tank." }
    ]
  },
  {
    id: "prod-15",
    name: "Polarized Aviator Sunglasses Titanium Frame",
    brand: "Solaris",
    category: "Fashion",
    price: 89.00,
    originalPrice: 120.00,
    discount: 26,
    rating: 4.6,
    reviewCount: 133,
    stock: 36,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80"
    ],
    colors: [
      { name: "Gunmetal / Smoke", code: "#2f3640" },
      { name: "Gold / G-15 Green", code: "#fbc531" }
    ],
    sizes: ["Medium 58mm", "Large 62mm"],
    description: "Ultra-lightweight aerospace titanium wireframe sunglasses equipped with 9-layer polarized lenses that cut 99.9% of reflective glare and block 100% UVA/B rays.",
    features: [
      "Ultra-flexible, corrosion-proof titanium frame (weighs only 18g)",
      "Triacetate Cellulose (TAC) HD polarized lenses",
      "Anti-scratch and oleophobic smudge-proof coating",
      "Soft silicone air-cushion nose pads"
    ],
    specifications: {
      "Lens Width": "58 mm",
      "Bridge": "14 mm",
      "UV Protection": "UV400 / 100% Protection",
      "Weight": "18.2g"
    },
    tags: ["sunglasses", "eyewear", "accessories", "summer", "polarised"],
    reviews: [
      { id: "r16", user: "Daniel King", rating: 5, date: "2026-02-27", comment: "Crisp optics while driving. So light you forget you're wearing them." }
    ]
  },
  {
    id: "prod-16",
    name: "Selvedge Raw Denim Slim Jeans 14oz",
    brand: "HeritageCo",
    category: "Fashion",
    price: 110.00,
    originalPrice: 145.00,
    discount: 24,
    rating: 4.8,
    reviewCount: 95,
    stock: 14,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"
    ],
    colors: [{ name: "Deep Indigo", code: "#182C61" }],
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    description: "Woven on vintage shuttle looms using 100% long-staple cotton. Features red selvedge ID line, copper doughnut buttons, and custom leather patch ready for personal fades.",
    features: [
      "14oz Unwashed Japanese style rope-dyed indigo selvedge",
      "Custom branded copper rivets and doughnut button fly",
      "Heavy duty herringbone pocket bags",
      "Tailored slim straight silhouette"
    ],
    specifications: {
      "Denim Weight": "14 oz/sq yd",
      "Weave": "Right-hand twill selvedge",
      "Fit": "Slim Straight",
      "Composition": "100% Cotton"
    },
    tags: ["denim", "jeans", "selvedge", "menswear", "fashion"],
    reviews: [
      { id: "r17", user: "Tyler Durden", rating: 5, date: "2026-01-30", comment: "Stiff at first, breaking in with amazing honeycombs behind knees." }
    ]
  },
  {
    id: "prod-17",
    name: "Silk Floral Wrap Midi Dress",
    brand: "Lumiere",
    category: "Fashion",
    price: 125.00,
    originalPrice: 160.00,
    discount: 22,
    rating: 4.9,
    reviewCount: 167,
    stock: 20,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80"
    ],
    colors: [
      { name: "Dusty Rose", code: "#f8a5c2" },
      { name: "Sage Green", code: "#78e08f" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Flowing silhouette crafted in lightweight mulberry silk blend with romantic flutter sleeves, ruffled hemline, and an adjustable waist tie.",
    features: [
      "Premium breathable mulberry silk and modal blend",
      "True wrap style with interior button anchor",
      "Graceful tiered flutter hemline",
      "Machine washable on delicate cycle"
    ],
    specifications: {
      "Material": "70% Silk, 30% Modal",
      "Length": "Midi (46 inches)",
      "Sleeve": "Short Flutter",
      "Lining": "Full Soft Cotton Lining"
    },
    tags: ["dress", "floral", "silk", "womenswear", "summer"],
    reviews: [
      { id: "r18", user: "Emma Watson", rating: 5, date: "2026-03-24", comment: "Wore this to a garden wedding, received compliments all evening!" }
    ]
  },
  {
    id: "prod-18",
    name: "Everyday Organic Cotton Heavyweight Hoodie",
    brand: "Basis",
    category: "Fashion",
    price: 74.00,
    originalPrice: 95.00,
    discount: 22,
    rating: 4.7,
    reviewCount: 203,
    stock: 42,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80"
    ],
    colors: [
      { name: "Oatmeal Melange", code: "#dcdde1" },
      { name: "Forest Green", code: "#2e86de" },
      { name: "Pitch Black", code: "#222f3e" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Substantial 450 GSM fleece hoodie made from 100% GOTS-certified organic ring-spun cotton. Double-layered hood, flatlock stitching, and kangaroo pocket.",
    features: [
      "450 GSM ultra-heavyweight brushed fleece",
      "Pre-shrunk organic cotton prevents shrinking",
      "Seamless rib side gussets for maximum range of movement",
      "Metal-tipped tonal drawstrings"
    ],
    specifications: {
      "Fabric Weight": "450 GSM",
      "Certification": "GOTS Certified Organic Cotton",
      "Fit": "Relaxed Boxy Fit",
      "Care": "Machine wash cold inside out"
    },
    tags: ["hoodie", "streetwear", "cotton", "casual", "sustainable"],
    reviews: [
      { id: "r19", user: "Jason Brody", rating: 5, date: "2026-02-12", comment: "Substantial, cozy, and holds its boxy structure after washes." }
    ]
  },
  {
    id: "prod-19",
    name: "Classic Chronograph Automatic Stainless Watch",
    brand: "Chronos",
    category: "Fashion",
    price: 320.00,
    originalPrice: 420.00,
    discount: 24,
    rating: 4.9,
    reviewCount: 79,
    stock: 11,
    isFeatured: true,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
    ],
    colors: [
      { name: "Silver & Sunburst Blue", code: "#0984e3" },
      { name: "Rose Gold & White", code: "#e17055" }
    ],
    sizes: ["40mm Case"],
    description: "Self-winding 24-jewel automatic movement with 41-hour power reserve. Domed sapphire crystal with anti-reflective coating and solid 316L link bracelet.",
    features: [
      "Precision Seiko NH35A automatic self-winding movement",
      "Scratch-proof double-domed sapphire crystal",
      "100 meters (10 ATM) water resistance with screw-down crown",
      "SuperLuminova BGW9 Swiss glow hands and markers"
    ],
    specifications: {
      "Case Diameter": "40 mm",
      "Case Thickness": "12.5 mm",
      "Crystal": "Sapphire with AR Coating",
      "Band Width": "20 mm"
    },
    tags: ["watch", "timepiece", "luxury", "automatic", "accessories"],
    reviews: [
      { id: "r20", user: "Arthur Pendelton", rating: 5, date: "2026-03-01", comment: "Punche way above its weight. Accuracy is +/- 4 seconds daily." }
    ]
  },
  {
    id: "prod-20",
    name: "Full-Grain Leather Bi-Fold Slim Wallet with RFID",
    brand: "UrbanCraft",
    category: "Fashion",
    price: 45.00,
    originalPrice: 60.00,
    discount: 25,
    rating: 4.6,
    reviewCount: 312,
    stock: 60,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
    ],
    colors: [
      { name: "Chestnut Tan", code: "#b33939" },
      { name: "Coal Black", code: "#2c2c54" }
    ],
    sizes: ["Slim"],
    description: "Vegetable-tanned full grain leather wallet holding up to 10 cards and flat cash, lined with military-grade RFID shielding to protect credit cards.",
    features: [
      "Holds 8-10 cards without bulky pocket bulge",
      "RFID blocking lining protects 13.56 MHz frequency signals",
      "Quick-access outer thumb slot for primary card",
      "Full grain leather patinas beautifully over years of use"
    ],
    specifications: {
      "Dimensions": "4.2 x 3.1 x 0.4 inches",
      "Weight": "55g",
      "RFID Protection": "13.56 MHz RFID Shield",
      "Warranty": "Lifetime Craftsmanship Guarantee"
    },
    tags: ["wallet", "leather", "rfid", "accessories", "gifts"],
    reviews: [
      { id: "r21", user: "George Vance", rating: 5, date: "2026-02-15", comment: "Extremely slim and smells like authentic leather." }
    ]
  },

  // --- HOME & LIVING (21-30) ---
  {
    id: "prod-21",
    name: "Ergonomic High-Back Mesh Desk Office Chair",
    brand: "ErgoForm",
    category: "Home & Living",
    price: 329.99,
    originalPrice: 429.99,
    discount: 23,
    rating: 4.8,
    reviewCount: 256,
    stock: 14,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=800&q=80",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80"
    ],
    colors: [
      { name: "Space Gray / Black", code: "#2d3436" },
      { name: "Silver Mist", code: "#dfe6e9" }
    ],
    sizes: ["Standard Adult (Up to 300 lbs)"],
    description: "Engineered for 10+ hour seating comfort. Features dynamic 3D lumbar support, breathable German elastomer mesh, 4D adjustable armrests, and 135° recline lock.",
    features: [
      "Adaptive dynamic lumbar support self-adjusts to spine curves",
      "Breathable high-tensile mesh keeps you cool all day",
      "4D armrests adjust height, depth, width, and pivot angle",
      "BIFMA-certified Class 4 heavy-duty gas cylinder"
    ],
    specifications: {
      "Max Capacity": "330 lbs (150 kg)",
      "Recline": "90° - 135° with 3 lock positions",
      "Base": "Solid Aluminum Alloy 5-star base",
      "Warranty": "5 Year Frame & Mechanism"
    },
    tags: ["furniture", "chair", "ergonomic", "office", "home-office"],
    reviews: [
      { id: "r22", user: "Dr. Sanjay Gupta", rating: 5, date: "2026-03-15", comment: "Lower back pain completely disappeared after 2 weeks of use." }
    ]
  },
  {
    id: "prod-22",
    name: "AeroPress XL Coffee & Espresso Maker",
    brand: "AeroPress",
    category: "Home & Living",
    price: 69.95,
    originalPrice: 79.95,
    discount: 13,
    rating: 4.9,
    reviewCount: 412,
    stock: 45,
    isFeatured: false,
    isTrending: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
    ],
    colors: [{ name: "Smoky Tint Clear", code: "#636e72" }],
    sizes: ["20 oz / 600 ml"],
    description: "The beloved rapid immersion coffee brewer doubled in size. Brews smooth, rich, grit-free coffee or espresso-style shots without bitterness in about one minute.",
    features: [
      "Double capacity: Brews up to 6 shots or 2 large cups at once",
      "Patented 3-in-1 immersion extraction technology",
      "Includes shatterproof Tritan carafe and 100 paper filters",
      "BPA-free, dishwasher safe and travel ready"
    ],
    specifications: {
      "Capacity": "20 oz (600 ml)",
      "Material": "Food-grade Tritan & silicone",
      "Weight": "420g",
      "Dishwasher Safe": "Yes (Top Rack)"
    },
    tags: ["coffee", "kitchen", "brewing", "aeropress", "home"],
    reviews: [
      { id: "r23", user: "Lucas Vance", rating: 5, date: "2026-02-24", comment: "Brews the cleanest, sweetest coffee with zero effort." }
    ]
  },
  {
    id: "prod-23",
    name: "Levoit Smart True HEPA Air Purifier (Core 400S)",
    brand: "Levoit",
    category: "Home & Living",
    price: 189.99,
    originalPrice: 219.99,
    discount: 14,
    rating: 4.8,
    reviewCount: 380,
    stock: 25,
    isFeatured: true,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80"
    ],
    colors: [{ name: "Matte White", code: "#f5f6fa" }],
    sizes: ["Up to 1,980 sq ft"],
    description: "Cleans large rooms in minutes with VortexAir 3.0 technology. Captures 99.97% of airborne particles down to 0.3 microns, including pollen, pet dander, smoke and dust.",
    features: [
      "AirSight Plus laser dust sensor scans air quality in real-time",
      "H13 True HEPA filter + custom activated carbon smoke filter",
      "Smart VeSync App control & voice assistant compatibility",
      "Whisper-quiet sleep mode operates at only 24 dB"
    ],
    specifications: {
      "Room Coverage": "403 sq ft in 12 min / 1,980 sq ft in 60 min",
      "Noise Level": "24 - 52 dB",
      "CADR": "260 CFM",
      "Filter Life": "6 to 12 months"
    },
    tags: ["air-purifier", "home", "appliances", "smart-home", "health"],
    reviews: [
      { id: "r24", user: "Melissa Stone", rating: 5, date: "2026-03-05", comment: "Huge relief for seasonal allergies. The auto mode is whisper quiet." }
    ]
  },
  {
    id: "prod-24",
    name: "Handmade Ceramic Minimalist Fluted Vase",
    brand: "NordicHome",
    category: "Home & Living",
    price: 42.00,
    originalPrice: 55.00,
    discount: 24,
    rating: 4.7,
    reviewCount: 84,
    stock: 30,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80"
    ],
    colors: [
      { name: "Cream Stoneware", code: "#f1f2f6" },
      { name: "Terracotta Sand", code: "#e58e26" }
    ],
    sizes: ["Medium (9-inch)", "Large (12-inch)"],
    description: "Modern Scandinavian fluted silhouette slip-cast from natural ceramic earthenware with unglazed textured matte exterior and waterproof glazed interior.",
    features: [
      "Handcrafted by ceramic artisans using high-fire clay",
      "Waterproof glazed interior suitable for fresh floral arrangements",
      "Anti-scratch padded base prevents furniture marring",
      "Timeless architectural focal point for shelves and tables"
    ],
    specifications: {
      "Height": "9.5 inches",
      "Opening Diameter": "3.2 inches",
      "Material": "Stoneware Ceramic",
      "Finish": "Matte Satin"
    },
    tags: ["decor", "vase", "ceramic", "minimalist", "living-room"],
    reviews: [
      { id: "r25", user: "Sophia Loren", rating: 4.8, date: "2026-01-19", comment: "Looks like a \$200 designer sculpture on my mantelpiece." }
    ]
  },
  {
    id: "prod-25",
    name: "Ultrasonic Essential Oil Aromatherapy Diffuser",
    brand: "AuraGlow",
    category: "Home & Living",
    price: 38.50,
    originalPrice: 49.99,
    discount: 23,
    rating: 4.6,
    reviewCount: 290,
    stock: 52,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
    ],
    colors: [
      { name: "Light Walnut Grain", code: "#b7791f" },
      { name: "Natural Birch", code: "#f6e58d" }
    ],
    sizes: ["500 ml Capacity"],
    description: "500ml ultrasonic cool mist diffuser with ambient 7-color breathing LED lighting, whisper-quiet operation, and auto shut-off for peaceful relaxation.",
    features: [
      "500ml tank provides continuous aromatic mist up to 14 hours",
      "4 timer settings (1H / 3H / 6H / Continuous)",
      "BPA-free safe plastic with waterless auto shut-off",
      "7 soothing ambient LED mood light options"
    ],
    specifications: {
      "Capacity": "500 ml",
      "Coverage": "Up to 350 sq ft",
      "Noise": "< 23 dB",
      "Power": "DC 24V adapter included"
    },
    tags: ["diffuser", "aromatherapy", "wellness", "home", "fragrance"],
    reviews: [
      { id: "r26", user: "Chloe Martin", rating: 4.5, date: "2026-02-11", comment: "Fills the entire master bedroom with lavender scent quickly." }
    ]
  },
  {
    id: "prod-26",
    name: "Tri-Ply Stainless Steel 10-Piece Cookware Set",
    brand: "Culinaire",
    category: "Home & Living",
    price: 349.00,
    originalPrice: 449.00,
    discount: 22,
    rating: 4.9,
    reviewCount: 130,
    stock: 12,
    isFeatured: true,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80"
    ],
    colors: [{ name: "Brushed Stainless Steel", code: "#dcdde1" }],
    sizes: ["10-Piece Set"],
    description: "Professional grade clad cookware featuring an aluminum heat-core bounded by 18/10 stainless steel for uniform searing without hot spots. Induction ready.",
    features: [
      "Full 3-ply bonded construction throughout base and sidewalls",
      "Riveted stay-cool ergonomic cast stainless handles",
      "Oven and broiler safe up to 600°F (315°C)",
      "Compatible with all cooktops: gas, induction, electric, glass"
    ],
    specifications: {
      "Set Includes": "8 & 10-in skillets, 2 & 3-qt saucepans, 3-qt saute pan, 8-qt stockpot + lids",
      "Material": "18/10 Surgical Grade Stainless Steel",
      "Dishwasher Safe": "Yes",
      "Warranty": "Lifetime Limited Warranty"
    },
    tags: ["cookware", "kitchen", "cooking", "stainless-steel", "chef"],
    reviews: [
      { id: "r27", user: "Chef Bradley", rating: 5, date: "2026-03-18", comment: "Restaurant quality sear on steaks and eggs glide right out if heated properly." }
    ]
  },
  {
    id: "prod-27",
    name: "Smart LED Floor Lamp with App & Matter Support",
    brand: "LumaTech",
    category: "Home & Living",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 178,
    stock: 35,
    isFeatured: false,
    isTrending: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
    ],
    colors: [
      { name: "Matte Black", code: "#1e1e1e" },
      { name: "Brushed Brass", code: "#d4ac0d" }
    ],
    sizes: ["65-inch Tall"],
    description: "Slim minimalist corner uplight with 16 million colors, tunable white from 2200K to 6500K, and music sync mode for immersive room atmosphere.",
    features: [
      "16 Million RGB colors + 2200K - 6500K tunable warm to cool whites",
      "Up to 2,200 lumens super bright room-filling illumination",
      "Matter, Apple Home, Alexa, and Google Assistant native support",
      "Heavy cast metal weighted base prevents tipping from pets"
    ],
    specifications: {
      "Brightness": "2,200 Lumens",
      "Wattage": "24W (LED energy saving)",
      "Height": "65 inches",
      "Wireless": "Wi-Fi 2.4GHz + Bluetooth 5.0"
    },
    tags: ["lighting", "lamp", "smart-home", "living-room", "led"],
    reviews: [
      { id: "r28", user: "Travis Scott", rating: 5, date: "2026-02-09", comment: "Syncs with TV and movies for amazing theater room backlighting." }
    ]
  },
  {
    id: "prod-28",
    name: "Memory Foam Cooling Gel Contour Pillow",
    brand: "SlumberWell",
    category: "Home & Living",
    price: 49.99,
    originalPrice: 65.00,
    discount: 23,
    rating: 4.6,
    reviewCount: 245,
    stock: 40,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80"
    ],
    colors: [{ name: "Ice Blue Mesh", code: "#74b9ff" }],
    sizes: ["Standard", "Queen", "King"],
    description: "CertiPUR-US certified orthopedic memory foam cervical contour pillow engineered to relieve neck stiffness and align spine for back and side sleepers.",
    features: [
      "Dual height ergonomic wave contours (4.3-in and 3.5-in)",
      "Infused phase-change cooling gel layer draws heat away",
      "Breathable bamboo rayon removable washable zip cover",
      "Never goes flat - slow rebound high density foam"
    ],
    specifications: {
      "Dimensions": "24 x 14 x 4.3 inches",
      "Fill": "100% CertiPUR-US Memory Foam",
      "Cover": "40% Bamboo, 60% Polyester",
      "Washable": "Removable machine-wash cover"
    },
    tags: ["pillow", "bedding", "sleep", "cooling", "ergonomic"],
    reviews: [
      { id: "r29", user: "Karen White", rating: 4.5, date: "2026-01-14", comment: "No more waking up with a cricked neck. The cooling side works wonders." }
    ]
  },
  {
    id: "prod-29",
    name: "Bohemian Hand-Woven Wool Area Rug (5x8 ft)",
    brand: "NordicHome",
    category: "Home & Living",
    price: 199.00,
    originalPrice: 260.00,
    discount: 23,
    rating: 4.8,
    reviewCount: 92,
    stock: 8,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80"
    ],
    colors: [{ name: "Ivory & Charcoal Geometric", code: "#f5f6fa" }],
    sizes: ["5x8 ft", "8x10 ft"],
    description: "Handcrafted by master rug artisans using 100% natural un-dyed New Zealand wool. Features a plush 0.6-inch pile with braided fringe tassels.",
    features: [
      "Hand-tufted 100% natural New Zealand wool pile",
      "Plush 0.6-inch high pile height for luxurious barefoot walk",
      "Natural stain resistance inherent to lanolin wool fibers",
      "Recycled cotton canvas non-toxic backing"
    ],
    specifications: {
      "Dimensions": "5 ft x 8 ft (60 x 96 in)",
      "Thickness": "0.6 inches",
      "Material": "100% Wool Pile, Cotton Backing",
      "Technique": "Hand-tufted"
    },
    tags: ["rug", "carpet", "boho", "living-room", "decor"],
    reviews: [
      { id: "r30", user: "Jessica Alba", rating: 5, date: "2026-03-12", comment: "Super plush and thick. Tied our entire living room together." }
    ]
  },
  {
    id: "prod-30",
    name: "Mid-Century Modern Velvet Accent Armchair",
    brand: "ErgoForm",
    category: "Home & Living",
    price: 279.00,
    originalPrice: 360.00,
    discount: 22,
    rating: 4.7,
    reviewCount: 110,
    stock: 9,
    isFeatured: true,
    isTrending: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
    ],
    colors: [
      { name: "Emerald Forest", code: "#10ac84" },
      { name: "Mustard Gold", code: "#e1b12c" },
      { name: "Navy Velvet", code: "#273c75" }
    ],
    sizes: ["Standard"],
    description: "Chic mid-century barrel back accent chair upholstered in stain-resistant performance velvet with solid brass splayed tapered metal legs.",
    features: [
      "High-resilience foam cushion with pocket coil springs inside",
      "Commercial-grade stain-resistant performance velvet",
      "Tapered electroplated steel legs in brushed gold",
      "Quick 10-minute assembly with all tools included"
    ],
    specifications: {
      "Overall Dimensions": "31\" W x 30\" D x 33\" H",
      "Seat Height": "18 inches",
      "Weight Capacity": "300 lbs",
      "Frame": "FSC-certified kiln-dried solid hardwood"
    },
    tags: ["armchair", "furniture", "living-room", "velvet", "mid-century"],
    reviews: [
      { id: "r31", user: "Patricia Ross", rating: 5, date: "2026-02-28", comment: "The emerald velvet is gorgeous in person. Very comfortable reading chair." }
    ]
  },

  // --- BEAUTY & PERSONAL CARE (31-38) ---
  {
    id: "prod-31",
    name: "Hyaluronic Acid Multi-Molecular Hydration Serum",
    brand: "PureGlow",
    category: "Beauty",
    price: 28.00,
    originalPrice: 36.00,
    discount: 22,
    rating: 4.8,
    reviewCount: 430,
    stock: 65,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80"
    ],
    colors: [{ name: "Clear Dew", code: "#f1f2f6" }],
    sizes: ["30 ml", "60 ml"],
    description: "Combines 5 molecular weights of pure hyaluronic acid with provitamin B5 to deliver multi-depth surface and deep dermal hydration for plump, glowing skin.",
    features: [
      "5 molecular weights penetrate different layers of epidermis",
      "Provitamin B5 (Panthenol) heals and restores skin moisture barrier",
      "100% oil-free, fragrance-free, vegan & cruelty-free",
      "Non-tacky fast-absorbing lightweight gel texture"
    ],
    specifications: {
      "Volume": "30 ml / 1 fl oz",
      "Skin Type": "All Skin Types including sensitive",
      "Key Ingredients": "Hyaluronic Acid, Panthenol, Ceramides",
      "Origin": "Formulated in Canada"
    },
    tags: ["skincare", "serum", "hyaluronic", "beauty", "hydration"],
    reviews: [
      { id: "r32", user: "Hannah Abbott", rating: 5, date: "2026-03-21", comment: "My skin drank this right up. Fine lines look visibly smoothed out." }
    ]
  },
  {
    id: "prod-32",
    name: "Sonic Electric Toothbrush with UV Sanitizing Case",
    brand: "DentaSonic",
    category: "Beauty",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 310,
    stock: 35,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80"
    ],
    colors: [
      { name: "Matte Black", code: "#2d3436" },
      { name: "Blush Pink", code: "#ffcccc" }
    ],
    sizes: ["Standard Bundle (4 Heads)"],
    description: "40,000 vibrations per minute sonic motor removes 10x more plaque than manual brushing. Includes wireless inductive charging glass and travel UV sanitizing case.",
    features: [
      "40,000 VPM maglev sonic motor for deep interdental clean",
      "5 cleaning modes: Clean, White, Polish, Gum Care, Sensitive",
      "Smart 2-minute quad-pacer interval timer",
      "Travel case with built-in UV-C light that kills 99.9% of bacteria"
    ],
    specifications: {
      "Vibration Speed": "40,000 strokes/min",
      "Battery Life": "45 days on full charge",
      "Waterproof": "IPX7 Full Body Waterproof",
      "Heads Included": "4 DuPont bristle heads"
    },
    tags: ["dental", "toothbrush", "electric", "beauty", "health"],
    reviews: [
      { id: "r33", user: "Dr. Paul Kelly", rating: 5, date: "2026-02-17", comment: "Leaves teeth feeling dentist-clean every single morning." }
    ]
  },
  {
    id: "prod-33",
    name: "Vitamin C + Ferulic Acid Radiance Face Oil",
    brand: "Botanics",
    category: "Beauty",
    price: 36.00,
    originalPrice: 48.00,
    discount: 25,
    rating: 4.8,
    reviewCount: 195,
    stock: 45,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80"
    ],
    colors: [{ name: "Golden Amber", code: "#f39c12" }],
    sizes: ["30 ml"],
    description: "Potent 15% THD Ascorbate (gentle, lipid-soluble Vitamin C) infused in cold-pressed rosehip and squalane oil to brighten hyperpigmentation and defend against UV damage.",
    features: [
      "15% THD Ascorbate penetrates 50x better than standard L-ascorbic acid",
      "Ferulic acid & Vitamin E stabilize and double antioxidant potency",
      "Lightweight non-comedogenic squalane base locks in glow",
      "Fades dark spots, sun damage and boosts collagen synthesis"
    ],
    specifications: {
      "Volume": "30 ml",
      "Cruelty Free": "Leaping Bunny Certified",
      "Fragrance": "Naturally scented with sweet orange peel",
      "Preservative Free": "100% Active Ingredients"
    },
    tags: ["skincare", "vitaminc", "face-oil", "anti-aging", "glow"],
    reviews: [
      { id: "r34", user: "Zoe Kravitz", rating: 5, date: "2026-03-09", comment: "Completely cleared my post-acne dark marks within a month." }
    ]
  },
  {
    id: "prod-34",
    name: "Dead Sea Mud & Bamboo Charcoal Purifying Mask",
    brand: "EarthMineral",
    category: "Beauty",
    price: 24.50,
    originalPrice: 32.00,
    discount: 23,
    rating: 4.6,
    reviewCount: 220,
    stock: 50,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
    ],
    colors: [{ name: "Mineral Gray", code: "#7f8c8d" }],
    sizes: ["200g / 7 oz Jar"],
    description: "Authentic Dead Sea mineral mud enriched with activated bamboo charcoal, aloe vera, and tea tree oil to unclog pores and detoxify excess sebum without drying.",
    features: [
      "100% authentic mineral-rich Jordanian Dead Sea mud",
      "Bamboo charcoal draws out blackheads and micro-pollutants",
      "Jojoba oil & chamomile prevent tightness or flaking",
      "Noticeably tightens pores and refines skin texture in 10 minutes"
    ],
    specifications: {
      "Weight": "200 grams / 7.05 oz",
      "Usage": "1-2 times weekly",
      "Free From": "Parabens, sulfates, synthetic fragrances",
      "Made In": "USA"
    },
    tags: ["facemask", "clay", "charcoal", "detox", "skincare"],
    reviews: [
      { id: "r35", user: "Samantha Bee", rating: 4.5, date: "2026-01-28", comment: "Pores look invisible after washing this off. Doesn't crack or irritate." }
    ]
  },
  {
    id: "prod-35",
    name: "Organic Bulgarian Rose Water Facial Toner Mist",
    brand: "Botanics",
    category: "Beauty",
    price: 19.99,
    originalPrice: 26.00,
    discount: 23,
    rating: 4.9,
    reviewCount: 350,
    stock: 70,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80"
    ],
    colors: [{ name: "Rose Tint", code: "#ffcccc" }],
    sizes: ["120 ml Spray Bottle"],
    description: "100% pure steam-distilled Rosa Damascena hydrosol from the Bulgarian Valley of Roses. Balances pH, calms redness, and sets makeup with an ultra-fine refreshing mist.",
    features: [
      "Single-ingredient 100% organic steam-distilled rose hydrosol",
      "Naturally balances skin barrier pH after cleansing",
      "Ultra-fine aerosol-like continuous pump mister",
      "Alcohol-free, preservative-free, zero chemicals added"
    ],
    specifications: {
      "Volume": "120 ml / 4 fl oz",
      "Source": "Kazanlak, Bulgaria Rosa Damascena",
      "Packaging": "Recyclable amber glass UV-blocking bottle",
      "Shelf Life": "24 Months"
    },
    tags: ["rosewater", "toner", "mist", "organic", "skincare"],
    reviews: [
      { id: "r36", user: "Chloe Bourgeois", rating: 5, date: "2026-03-14", comment: "Smells like a real fresh garden rose, not synthetic perfume at all!" }
    ]
  },
  {
    id: "prod-36",
    name: "Peptide & Caffeine Awakening Eye Cream",
    brand: "PureGlow",
    category: "Beauty",
    price: 32.00,
    originalPrice: 40.00,
    discount: 20,
    rating: 4.7,
    reviewCount: 160,
    stock: 38,
    isFeatured: false,
    isTrending: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"
    ],
    colors: [{ name: "Porcelain Cream", code: "#f5f6fa" }],
    sizes: ["15 ml Tube"],
    description: "Formulated with Matrixyl 3000 peptides, green tea caffeine, and cooling ceramic applicator tip to visibly depuff morning eye bags and fade dark circles.",
    features: [
      "Built-in cooling ergonomic ceramic applicator massages lymph fluid",
      "Matrixyl 3000 peptides stimulate collagen around delicate eye skin",
      "5% green tea caffeine constricts blood vessels to lighten dark circles",
      "Absorbs seamlessly underneath concealer without pilling"
    ],
    specifications: {
      "Volume": "15 ml / 0.5 fl oz",
      "Ophthalmologist Tested": "Safe for contact lens wearers",
      "Fragrance": "100% Fragrance Free",
      "Texture": "Cooling silk gel-cream"
    },
    tags: ["eyecream", "caffeine", "peptides", "skincare", "beauty"],
    reviews: [
      { id: "r37", user: "Natalie Portman", rating: 5, date: "2026-02-20", comment: "The ceramic tip feels ice cold in the morning. Depuffs in 5 minutes flat." }
    ]
  },
  {
    id: "prod-37",
    name: "Rosemary & Biotin Scalp Strengthening Hair Oil",
    brand: "Botanics",
    category: "Beauty",
    price: 22.00,
    originalPrice: 28.00,
    discount: 21,
    rating: 4.8,
    reviewCount: 512,
    stock: 80,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
    ],
    colors: [{ name: "Botanical Green", code: "#2ecc71" }],
    sizes: ["59 ml Dropper"],
    description: "Clinically proven blend of organic rosemary essential oil, biotin, and 30 essential nutrients that stimulates hair follicles, combats shedding, and supports longer hair.",
    features: [
      "Rosemary oil stimulates blood microcirculation in scalp",
      "Biotin and castor oil fortify weak hair roots and mend split ends",
      "Great for daily scalp massage, pre-shampoo masks, or protective styles",
      "Safe for color-treated and chemically-processed hair"
    ],
    specifications: {
      "Volume": "59 ml / 2 fl oz",
      "Ingredients": "Rosemary, Biotin, Jojoba, Castor, Peppermint",
      "Formula": "Cruelty-free & Sulfate-free",
      "Applicator": "Precision glass dropper"
    },
    tags: ["haircare", "rosemary", "scalp-oil", "growth", "beauty"],
    reviews: [
      { id: "r38", user: "Brittany Spears", rating: 5, date: "2026-03-01", comment: "My hairline baby hairs have filled in so much over the last 3 months!" }
    ]
  },
  {
    id: "prod-38",
    name: "Ceramide Barrier Defense Deep Moisture Cream",
    brand: "PureGlow",
    category: "Beauty",
    price: 34.00,
    originalPrice: 44.00,
    discount: 23,
    rating: 4.9,
    reviewCount: 280,
    stock: 45,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
    ],
    colors: [{ name: "Rich Ivory", code: "#f5f6fa" }],
    sizes: ["50 ml Tub"],
    description: "Rich lipid-replenishing barrier cream infused with 3 essential bio-identical ceramides (1, 3, 6-II), cholesterol, and oat kernel extract to calm compromised skin.",
    features: [
      "Golden ratio of ceramides, cholesterol, and fatty acids",
      "Colloidal oatmeal relieves itching, redness and eczema symptoms",
      "Locks in moisture for 48 hours without clogging pores",
      "National Eczema Association accepted seal"
    ],
    specifications: {
      "Volume": "50 ml / 1.7 oz",
      "Skin Barrier": "Repairs compromised moisture barrier in 1 hour",
      "Non-comedogenic": "Yes",
      "Fragrance": "None"
    },
    tags: ["moisturizer", "ceramides", "skincare", "barrier-repair", "beauty"],
    reviews: [
      { id: "r39", user: "Jennifer Aniston", rating: 5, date: "2026-02-14", comment: "The holy grail for dry winter skin. Silky finish and non-greasy." }
    ]
  },

  // --- SPORTS & FITNESS (39-44) ---
  {
    id: "prod-39",
    name: "Bowflex SelectTech 552 Adjustable Dumbbells (Pair)",
    brand: "Bowflex",
    category: "Sports & Fitness",
    price: 379.00,
    originalPrice: 429.00,
    discount: 12,
    rating: 4.9,
    reviewCount: 489,
    stock: 10,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"
    ],
    colors: [{ name: "Red / Black", code: "#c0392b" }],
    sizes: ["Pair (5 to 52.5 lbs each)"],
    description: "Replaces 15 sets of weights in one compact design. Turn of a dial automatically changes weight resistance from 5 lbs up to 52.5 lbs per dumbbell.",
    features: [
      "Adjusts in 2.5 lb increments up to the first 25 lbs",
      "Space-efficient design eliminates clutter of 30 individual weights",
      "Durable molding around metal plates delivers smooth, quiet lift-off",
      "Includes two ergonomic molded storage trays"
    ],
    specifications: {
      "Weight Range": "5 to 52.5 lbs (2.3 to 23.8 kg) each",
      "Weight Settings": "15 distinct weight levels",
      "Dimensions": "16.9\" L x 8.3\" W x 9\" H each",
      "Warranty": "2 Years on parts and plates"
    },
    tags: ["dumbbells", "fitness", "weights", "home-gym", "strength"],
    reviews: [
      { id: "r40", user: "Dave Bautista", rating: 5, date: "2026-03-16", comment: "Game changer for home workouts. Switching weights takes 2 seconds." }
    ]
  },
  {
    id: "prod-40",
    name: "Manduka PRO Yoga & Pilates Mat (6mm)",
    brand: "Manduka",
    category: "Sports & Fitness",
    price: 128.00,
    originalPrice: 140.00,
    discount: 9,
    rating: 4.8,
    reviewCount: 260,
    stock: 22,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80"
    ],
    colors: [
      { name: "Black Sage", code: "#1e272e" },
      { name: "Odyssey Indigo", code: "#2c3e50" }
    ],
    sizes: ["71-inch Standard", "85-inch Extra Long"],
    description: "The #1 recommended mat by yoga instructors worldwide. Dense 6mm cushioning protects joints while closed-cell surface keeps moisture and sweat out.",
    features: [
      "High-density 6mm cushion provides superior joint support",
      "Closed-cell material blocks sweat and bacteria absorption",
      "Proprietary dot pattern bottom prevents sliding on hardwood or carpet",
      "OEKO-TEX certified 100% emission-free manufacturing"
    ],
    specifications: {
      "Thickness": "6 mm",
      "Length": "71 inches (180 cm)",
      "Width": "26 inches (66 cm)",
      "Lifetime Guarantee": "Guaranteed never to peel or flake"
    },
    tags: ["yoga", "pilates", "mat", "fitness", "manduka"],
    reviews: [
      { id: "r41", user: "Aria Montgomery", rating: 5, date: "2026-02-18", comment: "The gold standard. Thick enough for knee poses, sticky enough for hot yoga." }
    ]
  },
  {
    id: "prod-41",
    name: "Garmin Forerunner 265 GPS Running Smartwatch",
    brand: "Garmin",
    category: "Sports & Fitness",
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    rating: 4.9,
    reviewCount: 185,
    stock: 16,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80"
    ],
    colors: [
      { name: "Black / Powder Gray", code: "#2f3640" },
      { name: "Aqua / White", code: "#00d2d3" }
    ],
    sizes: ["42mm (265S)", "46mm (265)"],
    description: "Brilliant AMOLED touchscreen display with training readiness insights, morning report, wrist-based running power, and multi-band GPS tracking.",
    features: [
      "1.3-inch colorful AMOLED display with optional always-on mode",
      "Training Readiness score tells you whether today is a hard or easy day",
      "Multi-band GNSS with SatIQ provides elite positioning accuracy",
      "Up to 13 days of battery life in smartwatch mode"
    ],
    specifications: {
      "Display": "1.3\" AMOLED (416 x 416 px)",
      "Battery Life": "Up to 13 days smartwatch / 20 hrs GPS",
      "Water Rating": "5 ATM (50 meters)",
      "Weight": "47 grams"
    },
    tags: ["smartwatch", "garmin", "running", "fitness", "gps"],
    reviews: [
      { id: "r42", user: "Eliud Kipchoge", rating: 5, date: "2026-03-11", comment: "The training readiness metric keeps me from overtraining. Brilliant GPS." }
    ]
  },
  {
    id: "prod-42",
    name: "Hydro Flask 32 oz Wide Mouth with Flex Straw Cap",
    brand: "Hydro Flask",
    category: "Sports & Fitness",
    price: 44.95,
    originalPrice: 49.95,
    discount: 10,
    rating: 4.8,
    reviewCount: 520,
    stock: 60,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    colors: [
      { name: "Pacific Blue", code: "#0984e3" },
      { name: "Snapper Pink", code: "#e84393" },
      { name: "Black", code: "#2d3436" }
    ],
    sizes: ["32 oz (946 ml)"],
    description: "TempShield double-wall vacuum insulation keeps ice water frosty cold up to 24 hours or piping hot up to 12 hours. Features leak-proof Flex Straw Cap.",
    features: [
      "TempShield double-wall vacuum insulation eliminates condensation",
      "Pro-grade 18/8 stainless steel protects flavor with zero metallic transfer",
      "Leakproof flex straw lid for effortless one-handed sipping",
      "Color Last powder coat is durable and dishwasher safe"
    ],
    specifications: {
      "Volume": "32 oz / 946 ml",
      "Insulation": "Cold 24 hrs / Hot 12 hrs",
      "BPA Free": "Yes",
      "Fits Car Cup Holder": "No (Wide base)"
    },
    tags: ["water-bottle", "hydroflask", "hydration", "gym", "outdoor"],
    reviews: [
      { id: "r43", user: "Sierra Nevada", rating: 5, date: "2026-02-04", comment: "Ice stays frozen overnight in my hot car in Arizona. Indestructible." }
    ]
  },
  {
    id: "prod-43",
    name: "TriggerPoint GRID Foam Roller for Muscle Recovery",
    brand: "TriggerPoint",
    category: "Sports & Fitness",
    price: 36.99,
    originalPrice: 44.99,
    discount: 18,
    rating: 4.7,
    reviewCount: 310,
    stock: 45,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
    ],
    colors: [
      { name: "Neon Orange", code: "#e67e22" },
      { name: "Black Camo", code: "#2c3e50" }
    ],
    sizes: ["13-inch Compact"],
    description: "Patented multi-density foam surface channels blood and oxygen to repair muscle tissue. Hollow core design supports up to 500 lbs without flattening.",
    features: [
      "Multi-density 3D surface replicates massage therapist hands",
      "Hollow core wrapped in EVA foam makes it firm yet comfortable",
      "Compact 13-inch length fits easily inside standard gym bag",
      "Relieves tight knots, IT bands, calves, and lower back tension"
    ],
    specifications: {
      "Length": "13 inches",
      "Diameter": "5.5 inches",
      "Weight Limit": "500 lbs (226 kg)",
      "Material": "EVA Foam over Rigid Hollow Core"
    },
    tags: ["recovery", "foam-roller", "fitness", "mobility", "massage"],
    reviews: [
      { id: "r44", user: "Ronnie Coleman", rating: 5, date: "2026-01-18", comment: "Best post-leg day investment you could ever make." }
    ]
  },
  {
    id: "prod-44",
    name: "Heavy-Duty Resistance Loop Bands Set (5 Levels)",
    brand: "FitGear",
    category: "Sports & Fitness",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    rating: 4.8,
    reviewCount: 390,
    stock: 75,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800&q=80"
    ],
    colors: [{ name: "Gradient Multi-Color", code: "#6c5ce7" }],
    sizes: ["Set of 5 Bands"],
    description: "100% natural Malaysian latex loop exercise bands ranging from X-Light (5 lbs) to X-Heavy (40 lbs). Includes travel mesh pouch and illustrated workout guide.",
    features: [
      "100% genuine eco-friendly natural latex with no snap risk",
      "5 clearly labeled color-coded progressive resistance levels",
      "Ideal for glute activation, physical therapy, yoga, and warm-ups",
      "Roll-up compact size fits in any pocket or purse"
    ],
    specifications: {
      "Dimensions": "12 x 2 inches each",
      "Resistance Levels": "5-10 lbs, 10-15 lbs, 15-20 lbs, 25-30 lbs, 35-40 lbs",
      "Material": "100% Natural Latex",
      "Included": "5 bands, carry bag, guide"
    },
    tags: ["bands", "resistance", "fitness", "glutes", "home-gym"],
    reviews: [
      { id: "r45", user: "Courtney Cox", rating: 5, date: "2026-03-04", comment: "Great snap resistance and they don't roll up while doing squats." }
    ]
  },

  // --- BOOKS & STATIONERY (45-50) ---
  {
    id: "prod-45",
    name: "Atomic Habits by James Clear (Hardcover Collector Edition)",
    brand: "Penguin",
    category: "Books",
    price: 18.99,
    originalPrice: 28.00,
    discount: 32,
    rating: 4.9,
    reviewCount: 780,
    stock: 90,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80"
    ],
    colors: [{ name: "Gold Foil Embossed", code: "#f1c40f" }],
    sizes: ["Hardcover (320 pages)"],
    description: "An easy and proven way to build good habits and break bad ones. The definitive guide on human behavior change with over 15 million copies sold globally.",
    features: [
      "Deluxe gold foil stamped hardcover collector's edition",
      "Includes ribbon bookmark and habit tracker reference sheet",
      "Actionable frameworks: The 4 Laws of Behavior Change",
      "Backed by biology, psychology, and neuroscience"
    ],
    specifications: {
      "Format": "Hardcover",
      "Pages": "320 pages",
      "Language": "English",
      "Publisher": "Avery / Penguin Random House"
    },
    tags: ["books", "habits", "productivity", "psychology", "bestseller"],
    reviews: [
      { id: "r46", user: "Tim Ferriss", rating: 5, date: "2026-03-22", comment: "A supremely practical and useful book. Worth reading every year." }
    ]
  },
  {
    id: "prod-46",
    name: "Designing Data-Intensive Applications by Martin Kleppmann",
    brand: "O'Reilly",
    category: "Books",
    price: 42.50,
    originalPrice: 55.00,
    discount: 23,
    rating: 5.0,
    reviewCount: 420,
    stock: 30,
    isFeatured: false,
    isTrending: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80"
    ],
    colors: [{ name: "O'Reilly Signature White", code: "#ffffff" }],
    sizes: ["Paperback (616 pages)"],
    description: "The bible of modern backend engineering. Explains the pros and cons of technologies for processing and storing data, consensus, replication, and streaming systems.",
    features: [
      "Deep dive into storage engines, indexes, B-trees vs LSM-trees",
      "Comprehensive breakdown of distributed transactions and Raft consensus",
      "Batch processing vs event stream architectures (Kafka / Flink)",
      "Essential reading for staff software engineers & architects"
    ],
    specifications: {
      "Format": "Paperback",
      "Pages": "616 pages",
      "Publisher": "O'Reilly Media",
      "Subject": "Distributed Systems & Databases"
    },
    tags: ["books", "programming", "software", "database", "engineering"],
    reviews: [
      { id: "r47", user: "Gennady Korotkevich", rating: 5, date: "2026-02-19", comment: "Must-read for every backend and data engineer on earth." }
    ]
  },
  {
    id: "prod-47",
    name: "Leuchtturm1917 Hardcover Medium A5 Dotted Journal",
    brand: "Leuchtturm1917",
    category: "Books",
    price: 24.50,
    originalPrice: 29.50,
    discount: 17,
    rating: 4.8,
    reviewCount: 340,
    stock: 55,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"
    ],
    colors: [
      { name: "Nordic Blue", code: "#4b6584" },
      { name: "Port Red", code: "#eb3b5a" },
      { name: "Sage", code: "#20bf6b" }
    ],
    sizes: ["A5 Medium (5.7 x 8.3 in)"],
    description: "The legendary German notebook for bullet journalists and thinkers. Contains 251 numbered pages of ink-proof 80 GSM paper with gusseted back pocket.",
    features: [
      "251 numbered pages with 5mm discrete dotted ruling",
      "Fountain-pen friendly 80 GSM acid-free paper",
      "Blank table of contents and 2 contrasting ribbon bookmarks",
      "Elastic enclosure band and expandable document back pocket"
    ],
    specifications: {
      "Paper Weight": "80 GSM",
      "Ruling": "5mm Dot Grid",
      "Pages": "251 Numbered",
      "Dimensions": "5.75 x 8.25 inches (A5)"
    },
    tags: ["journal", "notebook", "stationery", "bujo", "writing"],
    reviews: [
      { id: "r48", user: "Ryder Carroll", rating: 5, date: "2026-01-25", comment: "The paper quality and page numbers make bullet journaling a joy." }
    ]
  },
  {
    id: "prod-48",
    name: "Lamy 2000 Makrolon Fountain Pen (Fine Nib)",
    brand: "Lamy",
    category: "Books",
    price: 189.00,
    originalPrice: 220.00,
    discount: 14,
    rating: 4.9,
    reviewCount: 154,
    stock: 18,
    isFeatured: true,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80"
    ],
    colors: [{ name: "Black Brushed Fiberglass", code: "#2f3640" }],
    sizes: ["Fine 14K Gold Nib"],
    description: "A 1966 Bauhaus design icon displayed at MoMA. Crafted in seamless black Makrolon fiberglass with a semi-hooded platinum-coated 14K gold nib and piston filling.",
    features: [
      "Hand-polished 14-karat gold nib plated in platinum",
      "Matte brushed Makrolon fiberglass barrel with stainless clip",
      "Smooth internal piston-filling mechanism holds large ink volume",
      "Subtle transparent ink window to monitor ink reservoir"
    ],
    specifications: {
      "Nib Material": "14K Gold Platinum Plated",
      "Filling System": "Piston (Bottled Ink)",
      "Weight": "25 grams",
      "Origin": "Heidelberg, Germany"
    },
    tags: ["pen", "fountain-pen", "luxury", "lamy", "stationery"],
    reviews: [
      { id: "r49", user: "Neil Gaiman", rating: 5, date: "2026-03-08", comment: "I draft my novels with this pen. Perfectly balanced and gliding smooth." }
    ]
  },
  {
    id: "prod-49",
    name: "Deep Work: Rules for Focused Success by Cal Newport",
    brand: "GrandCentral",
    category: "Books",
    price: 17.50,
    originalPrice: 24.00,
    discount: 27,
    rating: 4.8,
    reviewCount: 388,
    stock: 45,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80"
    ],
    colors: [{ name: "Yellow & Black Hardcover", code: "#f1c40f" }],
    sizes: ["Hardcover (304 pages)"],
    description: "Deep work is the ability to focus without distraction on a cognitively demanding task. A transformative guide to reclaiming intense productivity in a distracted world.",
    features: [
      "Rigorous science and practical philosophies of elite performers",
      "The 4 Disciplines of Deep Work implementation framework",
      "Strategies to eradicate shallow email & Slack busywork",
      "Includes real-world case studies from Carl Jung to modern scientists"
    ],
    specifications: {
      "Format": "Hardcover",
      "Pages": "304 pages",
      "Author": "Cal Newport, Ph.D.",
      "Publisher": "Grand Central Publishing"
    },
    tags: ["books", "productivity", "focus", "deep-work", "career"],
    reviews: [
      { id: "r50", user: "Andrew Huberman", rating: 5, date: "2026-02-16", comment: "Cal Newport nails the neuroscience of deep focused concentration." }
    ]
  },
  {
    id: "prod-50",
    name: "Solid Walnut Wood Desk Organizer & Phone Stand",
    brand: "NordicHome",
    category: "Books",
    price: 38.00,
    originalPrice: 48.00,
    discount: 21,
    rating: 4.7,
    reviewCount: 165,
    stock: 35,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"
    ],
    colors: [{ name: "Natural American Walnut", code: "#5d4037" }],
    sizes: ["Standard Desktop (11 x 6 in)"],
    description: "Carved from a single piece of sustainably harvested American Black Walnut. Features precision routed grooves for pens, cards, keys, and an upright smartphone dock.",
    features: [
      "100% genuine FSC-certified American black walnut hardwood",
      "Hand-finished with natural Danish wood oil and beeswax",
      "Anti-skid cork padding on bottom protects desktop finish",
      "Precision angled slot holds phones and tablets with charging cable route"
    ],
    specifications: {
      "Dimensions": "11.2 x 5.8 x 0.9 inches",
      "Wood Species": "American Black Walnut",
      "Weight": "480g",
      "Origin": "Handcrafted"
    },
    tags: ["organizer", "wood", "desk-setup", "stationery", "minimalist"],
    reviews: [
      { id: "r51", user: "Marques Brownlee", rating: 5, date: "2026-03-19", comment: "Clean aesthetic, warm wood grain, and keeps my desk essentials in check." }
    ]
  }
];
