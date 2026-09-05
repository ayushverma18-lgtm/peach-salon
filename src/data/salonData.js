// Peach Salon — Bridal Makeup & Hair Studio
// Master Data Source with Clean Indian Salon Entities

export const INITIAL_SITE_SETTINGS = {
  name: "PEACH SALON",
  subtitle: "Bridal Makeup & Hair Studio",
  director: "Eshvi",
  directorRole: "Director & Lead Bridal Makeup Artist",
  tagline: "Enhancing Your Natural Grace with Elegant Bridal Artistry",
  address: "Near New SBI Branch, Public Inter College, Manauri, Prayagraj, Uttar Pradesh - 212208",
  city: "Manauri, Prayagraj",
  state: "Uttar Pradesh",
  pincode: "212208",
  landmark: "Near New SBI Branch, Public Inter College",
  hours: "Sunday–Saturday, 10:00 AM–7:00 PM",
  timingShort: "10:00 AM – 7:00 PM (All 7 Days)",
  phone: "+91 98390 12345",
  whatsapp: "+91 98390 12345",
  email: "contact@peachsalon.in",
  instagram: "https://instagram.com/peachsalon_prayagraj",
  statusMessage: "Studio Open Today in Manauri, Prayagraj · 10:00 AM – 7:00 PM",
};

export const INITIAL_HOME_SETTINGS = {
  heroHeading: "Enhancing Your Natural Grace with Elegant Bridal Artistry",
  heroSubtitle: "Dedicated bridal makeup, HD finishes, and professional hair styling studio in Manauri, Prayagraj. Supervised directly by Eshvi.",
  heroCtaText: "Book an Appointment",
  heroSecondaryCta: "Explore Bridal Packages",
  videoUrl: "/videos/peach-salon.mp4",
  heroImage: "/images/bridal.jpg",
  experienceNote: "Personalized consultations for every bride and family function."
};

export const INITIAL_ABOUT_SETTINGS = {
  heading: "About Peach Salon & Eshvi",
  subtitle: "Warm, professional, and trustworthy beauty services in Manauri.",
  description: "Welcome to Peach Salon, a dedicated bridal makeup and hair studio situated near the New SBI Branch in Manauri, Prayagraj. Founded and directed by Eshvi, our studio focuses on creating clean, elegant, and personalized bridal and occasion looks. We believe in enhancing each client's natural beauty with thoughtful techniques and quality products.",
  directorName: "Eshvi",
  directorRole: "Director & Lead Artist",
  directorBio: "With a passion for bridal elegance and neat hair styling, Eshvi works closely with every bride to design comfortable, radiant, and timeless looks for weddings, engagements, and special family functions.",
  image: "/images/about.jpg",
  keyValues: [
    { title: "Personalized Consultation", desc: "Understanding your outfit, jewellery, and personal preferences before styling." },
    { title: "Quality & Hygiene", desc: "Clean tools, premium skin-friendly products, and a comfortable studio environment." },
    { title: "Punctual & Reliable", desc: "Well-managed timelines so you can enjoy your special day without any rush." }
  ]
};

// 1. DEDICATED BRIDAL MAKEUP PACKAGES (Exact Specifications)
export const INITIAL_BRIDAL_PACKAGES = [
  {
    id: "bridal-classic",
    name: "Classic Bridal Makeup",
    price: 12000,
    priceFormatted: "₹12,000",
    description: "A traditional bridal makeup look with a clean base, defined eyes, suitable bridal colours, neat brows, soft contouring and a polished finish. The look should be elegant and comfortable for wedding functions.",
    features: [
      "Clean & comfortable bridal base",
      "Traditional defined eye styling & brows",
      "Suitable bridal lip shade & soft blush",
      "Dupatta setting & basic jewellery fixing",
      "Long-lasting wedding ceremony finish"
    ],
    image: "/images/bridal.jpg",
    active: true,
    order: 1
  },
  {
    id: "bridal-hd",
    name: "HD Bridal Makeup",
    price: 15000,
    priceFormatted: "₹15,000",
    description: "A refined HD makeup look with a smooth and natural-looking base, detailed eye makeup, soft contouring, balanced blush and a polished finish suitable for bridal photography and wedding ceremonies.",
    features: [
      "Smooth High-Definition natural base",
      "Detailed bridal eye makeup & lashes",
      "Balanced contouring & soft radiant blush",
      "Complete dupatta draping & jewellery fixing",
      "Optimized for bridal photography & video"
    ],
    recommended: true,
    image: "/images/bridal.jpg",
    active: true,
    order: 2
  },
  {
    id: "bridal-airbrush",
    name: "Airbrush Makeup",
    price: 20000,
    priceFormatted: "₹20,000",
    description: "A lightweight airbrush makeup finish designed for a smooth and even appearance. It includes detailed eye makeup, balanced face makeup and a polished bridal finish suitable for long wedding functions and photography.",
    features: [
      "Lightweight micro-mist airbrush finish",
      "Ultra-even, weightless skin coverage",
      "Detailed eye makeup with custom lashes",
      "High durability for long wedding hours",
      "Complete bridal styling & jewellery setting"
    ],
    image: "/images/bridal.jpg",
    active: true,
    order: 3
  }
];

// 2. OTHER MAKEUP SERVICES (Separate from Bridal & Hair)
export const INITIAL_MAKEUP_SERVICES = [
  {
    id: "mu-natural",
    name: "Natural Makeup",
    price: null, // "Price on request" unless edited by admin
    priceFormatted: "Price on request",
    description: "A fresh and subtle makeup look focusing on an even skin tone, soft eye definition, and a natural lip colour for daily elegance or intimate family gatherings.",
    category: "Makeup",
    active: true,
    order: 1
  },
  {
    id: "mu-soft-glam",
    name: "Soft Glam Makeup",
    price: null,
    priceFormatted: "Price on request",
    description: "A radiant makeup style with gentle eye blending, soft glow on the high points of the face, and balanced tones for pre-wedding functions and festivities.",
    category: "Makeup",
    active: true,
    order: 2
  },
  {
    id: "mu-engagement",
    name: "Engagement Makeup",
    price: null,
    priceFormatted: "Price on request",
    description: "A graceful makeup look tailored to complement engagement attires with elegant eye styling, luminous base, and lasting comfort throughout the function.",
    category: "Makeup",
    active: true,
    order: 3
  },
  {
    id: "mu-party",
    name: "Party Makeup",
    price: null,
    priceFormatted: "Price on request",
    description: "A neat and vibrant makeup finish designed for wedding guests, family celebrations, sangeet, and festive get-togethers.",
    category: "Makeup",
    active: true,
    order: 4
  },
  {
    id: "mu-velvet",
    name: "Velvet Makeup",
    price: null,
    priceFormatted: "Price on request",
    description: "A soft, smooth and elegant makeup look with a comfortable-looking base, balanced eye makeup, subtle contouring and a refined finish. Suitable for functions where the customer wants a polished but not overly dramatic look.",
    category: "Makeup",
    active: true,
    order: 5
  },
  {
    id: "mu-cocktail-glam",
    name: "Cocktail Glam Makeup",
    price: null,
    priceFormatted: "Price on request",
    description: "A slightly more glamorous evening makeup look with defined eyes, polished skin, balanced contouring and a stylish finish suitable for cocktail functions, evening parties and celebrations.",
    category: "Makeup",
    active: true,
    order: 6
  }
];

// 3. HAIR SERVICES (Completely Separate Section with Real Client Photos)
export const INITIAL_HAIR_SERVICES = [
  {
    id: "hair-highlights",
    name: "Hair Highlights / Balayage",
    price: null,
    priceFormatted: "Price on request",
    description: "Dimensional hair highlights and modern balayage techniques customized to complement Indian hair tones with smooth, glossy blending.",
    image: "/images/hair_highlights.jpg",
    category: "Hair",
    active: true,
    order: 1
  },
  {
    id: "hair-fashion-color",
    name: "Fashion Hair Colour",
    price: null,
    priceFormatted: "Price on request",
    description: "Vibrant fashion shades, rose undertones, and ombre colouring using high-grade hair care products for radiant shine.",
    image: "/images/hair_fashion_color.jpg",
    category: "Hair",
    active: true,
    order: 2
  },
  {
    id: "hair-global-color",
    name: "Global Hair Colour",
    price: null,
    priceFormatted: "Price on request",
    description: "Full global hair colouring from root to tip in rich mocha, chocolate, and natural tones with rich gloss and even coverage.",
    image: "/images/hair_global_color.jpg",
    category: "Hair",
    active: true,
    order: 3
  },
  {
    id: "hair-bridal-styling",
    name: "Bridal Hair Styling",
    price: null,
    priceFormatted: "Price on request",
    description: "Hair styling planned according to the bridal outfit, jewellery and overall makeup look.",
    category: "Hair",
    active: true,
    order: 4
  },
  {
    id: "hair-bridal-bun",
    name: "Bridal Bun & Updos",
    price: null,
    priceFormatted: "Price on request",
    description: "A neat bridal bun suitable for traditional bridal hairstyles, matha patti, and heavy dupatta setting.",
    category: "Hair",
    active: true,
    order: 5
  },
  {
    id: "hair-open-styling",
    name: "Open Hair Styling",
    price: null,
    priceFormatted: "Price on request",
    description: "Styled open hair with a clean and polished finish suitable for engagement and party looks.",
    category: "Hair",
    active: true,
    order: 6
  },
  {
    id: "hair-soft-curls",
    name: "Soft Curls",
    price: null,
    priceFormatted: "Price on request",
    description: "Soft curls for a simple, natural and elegant occasion look.",
    category: "Hair",
    active: true,
    order: 7
  },
  {
    id: "hair-waves",
    name: "Waves & Styling",
    price: null,
    priceFormatted: "Price on request",
    description: "Loose waves for a relaxed, bouncy and polished appearance.",
    category: "Hair",
    active: true,
    order: 8
  },
  {
    id: "hair-party-hairstyling",
    name: "Party Hairstyling",
    price: null,
    priceFormatted: "Price on request",
    description: "Hairstyling suitable for parties, family functions and celebrations.",
    category: "Hair",
    active: true,
    order: 9
  }
];

// 4. ADD-ON SERVICES (Exact Specifications)
export const INITIAL_ADDONS = [
  {
    id: "addon-dressing",
    name: "Private Dressing, Outfit & Footwear",
    price: 1200,
    priceFormatted: "₹1,200",
    description: "Assistance with outfit draping, dupatta setting, jewellery fixing, and footwear adjustment in our dedicated dressing area.",
    active: true,
    order: 1
  },
  {
    id: "addon-kahwa",
    name: "Kashmiri Kahwa Service & Cocktail",
    price: 700,
    priceFormatted: "₹700",
    description: "Traditional warm Kashmiri kahwa beverage service prepared for the bride and client during styling.",
    active: true,
    order: 2
  }
];

// 5. GALLERY ITEMS (Supports real salon photos)
export const INITIAL_GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Royal Red Zardozi HD Bridal Look",
    description: "Traditional royal red bridal makeup with high-definition smooth base, defined eyes, and matha patti setting.",
    category: "Bridal",
    image: "/images/bridal_hd_red.jpg",
    order: 1
  },
  {
    id: "gal-2",
    title: "Emerald Polki Heritage Bridal Styling",
    description: "Refined HD bridal finish with soft contouring, balanced blush, and traditional emerald necklace styling.",
    category: "Bridal",
    image: "/images/bridal_emerald_gold.jpg",
    order: 2
  },
  {
    id: "gal-3",
    title: "Dimensional Hair Highlights / Balayage",
    description: "Multi-tonal balayage highlights on rich dark hair with radiant shine.",
    category: "Hair",
    image: "/images/hair_highlights.jpg",
    order: 3
  },
  {
    id: "gal-4",
    title: "Rose Ombre Fashion Hair Colour",
    description: "Vibrant fashion hair colour with smooth blend and glossy finish.",
    category: "Hair",
    image: "/images/hair_fashion_color.jpg",
    order: 4
  },
  {
    id: "gal-5",
    title: "Glossy Mocha Global Hair Colour",
    description: "Root-to-tip rich mocha global hair color with healthy natural shine.",
    category: "Hair",
    image: "/images/hair_global_color.jpg",
    order: 5
  },
  {
    id: "gal-6",
    title: "Traditional Bridal Bun with Floral Styling",
    description: "Neat structural bridal bun styling suitable for heavy bridal dupattas.",
    category: "Hair",
    image: "/images/bridal_hd_red.jpg",
    order: 6
  }
];

// Aliases for backwards compatibility during initial hydration
export const SALON_INFO = INITIAL_SITE_SETTINGS;
export const INITIAL_SALON_INFO = INITIAL_SITE_SETTINGS;
export const BRIDAL_PACKAGES = INITIAL_BRIDAL_PACKAGES;
export const MAKEUP_SERVICES = INITIAL_MAKEUP_SERVICES;
export const HAIR_SERVICES = INITIAL_HAIR_SERVICES;
export const ADDONS = INITIAL_ADDONS;
export const GALLERY_ITEMS = INITIAL_GALLERY_ITEMS;