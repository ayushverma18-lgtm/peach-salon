import heroImg from '../assets/hero_indian_couture.jpg';
import hairScienceImg from '../assets/hair_science_indian.jpg';
import makeupMacroImg from '../assets/makeup_indian_macro.jpg';
import bridalImg from '../assets/bridal_indian_royal.jpg';
import galaImg from '../assets/gala_indian_model.jpg';

export const INITIAL_SALON_INFO = {
  name: "Peach Salon & Atelier",
  owner: "Eshivi",
  ownerRole: "Founder & Creative Director",
  tagline: "Hair & Makeup, tailored like couture.",
  taglineSubtitle: "Haute Coiffure • Royal Bridal • High-Society Galas • Luxury Makeup Lab",
  address: "GT Road, Manauri, Prayagraj, Uttar Pradesh 212212",
  city: "Prayagraj",
  locationShort: "Manauri, Prayagraj",
  phone: "+91 98390 12345",
  whatsapp: "+91 98390 12345",
  email: "eshivi@peachsalon.in",
  hours: "Monday – Saturday, 10:00 – 18:00 (Closed Sundays)",
  timingShort: "10:00 AM – 6:00 PM",
  closedDay: "Closed on Sundays",
  status: "Atelier Open — Manauri, Prayagraj & VIP Concierge",
};

export const SALON_INFO = INITIAL_SALON_INFO;

export const PILLARS = [
  {
    id: "hair-science",
    num: "01",
    title: "Hair Science & High-End Textures",
    subtitle: "Built from texture up, not trend down.",
    tag: "Trichology & Chemistry",
    badge: "Hasselblad 100MP Precision",
    description: "Before a single cut, we map porosity, lipid density, and natural cuticle refraction. We craft liquid-silk alignment and volumetric waves that reflect subtle peach and platinum highlights.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-long-shiny-brown-hair-41584-large.mp4",
    videoPrompt: "A cinematic macro slow-motion tracking shot of a master stylist running their fingers through rich, healthy, hyper-glossy dark and blonde hair textures catching golden accent lights in an ultra-luxury minimalist lounge.",
    photoPrompt: "A high-fashion editorial close-up portrait of an Indian supermodel with sculpted cheekbones showcasing pristine, liquid-silk straight dark hair and soft volumetric waves, reflecting ultra-subtle peach and platinum highlights. Hasselblad 100MP, 8k resolution.",
    image: hairScienceImg,
    beforeImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=90",
    afterImage: hairScienceImg,
    highlights: [
      { label: "Molecular Porosity Diagnostics", desc: "5500K daylight bulb diagnostic mapping of natural melanin & lipid degradation across Indian hair textures." },
      { label: "Bespoke Peach Glaze", desc: "Custom-mixed micro-pigments matched to warm golden-olive undertones, never box formulas." },
      { label: "Micro-Lipid Ceramic Seal", desc: "Thermal ceramic infusion locking in 4x mirror reflective shine for 12 weeks." }
    ]
  },
  {
    id: "makeup-lab",
    num: "02",
    title: "Haute Makeup Artistry & Skin Couture",
    subtitle: "Light-calibrated beauty that moves with skin.",
    tag: "HD Airbrush & 24K Gold",
    badge: "16-Hour Flash Durability",
    description: "Our makeup artistry celebrates defined Indian bone structure, sharp cheekbone contours, and radiant dewy skin. From 4K airbrush glass skin to 24K gold foil eyelids and velvet matte ombre lips, every stroke is calibrated for high-strobe cameras.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stylist-applying-makeup-to-a-model-41585-large.mp4",
    videoPrompt: "A slow-motion cinematic macro shot of a master makeup artist applying delicate peach gold shimmer and liquid dew to an Indian model's cheekbones. Studio flash bokeh, flawless skin pores, 8k 60fps.",
    photoPrompt: "High-fashion beauty macro portrait of an Indian model with defined cheekbones, glowing dewy skin texture, 24K gold leaf eyelid accents, brushed feathery brows, and soft velvet peach-rose lips. Hasselblad 100MP.",
    image: makeupMacroImg,
    highlights: [
      { label: "HD Airbrush Micro-Veil", desc: "Weightless 12-micron silicone formula that mimics skin elasticity without settling in fine lines." },
      { label: "24K Gold & Saffron Prep", desc: "Anti-inflammatory Kashmiri saffron serum maximizing hydration and camera luminosity." },
      { label: "Zero-Flashback Silica Seal", desc: "Multi-spherical anti-glare setting veil tested under 4000W studio strobes." }
    ]
  },
  {
    id: "bridal-couture",
    num: "03",
    title: "Royal Heritage & Prayagraj Bridal Couture",
    subtitle: "A wedding day, styled like an heirloom.",
    tag: "Imperial Bridal Suite",
    badge: "3-Fitting Protocol",
    description: "Royal bridal work is unhurried choreography curated by Eshivi. Flawless HD airbrush makeup, dewy glass skin, and structural architectural updos engineered for heavy zardozi dupattas and heritage polki jewelry.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-beautiful-bride-smiling-42867-large.mp4",
    videoPrompt: "A slow-motion cinematic reveal of a breathtaking Indian bride looking directly into a vintage gold-gilded, glowing mirror in an elite salon dressing suite. A professional artist applies a final touch of lipstick. Elegant movements, emotional luxury, 4k.",
    photoPrompt: "An elite royal Indian bridal portrait showcasing flawless high-definition airbrush makeup, sharp sculpted jawline, dewy radiant skin, and a classic structural bridal updo woven with real diamond accessories. Exquisite couture zardozi lace, warm backlit glow.",
    image: bridalImg,
    suiteImage: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=1600&q=90",
    highlights: [
      { label: "Private Suite Sanctuary", desc: "Dedicated gold-gilded dressing suite with vintage champagne & artisanal tea service in Manauri." },
      { label: "Dual Flash & Daylight Trial", desc: "Full run documented under 5600K flash and 3200K warm banquet ambient lighting." },
      { label: "3kg+ Veil Weighting Architecture", desc: "Engineered anchor points distributing heavy zardozi dupatta weight across crown without pulling." }
    ]
  },
  {
    id: "galas-events",
    num: "04",
    title: "High-Society Galas & Milestone Functions",
    subtitle: "We don't style for the first hour. We style for the last one.",
    tag: "Red Carpet & Balls",
    badge: "Paparazzi-Proof Finish",
    description: "For nights documented from every lens. Artistic high-society sleek buns, sharp cheekbone sculpting, sculpted Old-Hollywood waves, and high-octane evening makeup engineered to outlast the room heat and the final champagne toast.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-for-a-fashion-photoshoot-39879-large.mp4",
    videoPrompt: "A dynamic tracking shot following an elegant Indian supermodel with sharp face cuts and high architectural bun walking into a luxury penthouse ballroom event. Chandelier light glints off her profile creating cinematic bokeh.",
    photoPrompt: "A striking red-carpet paparazzi photo of an elegant Indian model showcasing bold evening makeup, an artistic high-society sleek bun styling, and sharp diamond jewelry. Authentic high-fashion flash reflections.",
    image: galaImg,
    highlights: [
      { label: "Flash Anti-Reflect Silica", desc: "Micro-milled HD silica powders preventing flashback while preserving luminosity." },
      { label: "Architectural Bun Sculpting", desc: "Modern couture tension-balanced knotting with diamond accent placement." },
      { label: "On-Location VIP Escort", desc: "Lead artist attendance for red carpet touch-ups and wardrobe transitions across UP & NCR." }
    ]
  }
];

export const MAKEUP_TYPES = [
  {
    id: "hd-airbrush",
    name: "HD 4K Airbrush Glass Skin",
    category: "Bridal & Red Carpet",
    duration: "90 mins",
    price: "₹12,500",
    description: "Micro-atomized foundation layer creating an ultra-thin, poreless glass skin finish that enhances defined Indian bone structure without melting under high studio heat.",
    keyPoints: ["16-Hour Transfer Resistance", "Zero Pore Visibility", "Weightless Breathable Barrier"],
    image: makeupMacroImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stylist-applying-makeup-to-a-model-41585-large.mp4"
  },
  {
    id: "royal-gold-leaf",
    name: "24K Gold & Champagne Foil Eyes",
    category: "Couture Gala & Bridal",
    duration: "75 mins",
    price: "₹9,500",
    description: "Pure edible 24K gold foil meticulously placed across the eyelids or temples, accented with smoked bronze kohl and silk fiber lash extensions.",
    keyPoints: ["Genuine 24K Gold Accents", "Smudge-Proof Waterproof Liner", "Dimensional Micro-Refraction"],
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=90",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glamorous-woman-in-a-golden-dress-41588-large.mp4"
  },
  {
    id: "velvet-matte-ombre",
    name: "Velvet Couture Lips & Strobing",
    category: "Editorial & Milestone",
    duration: "60 mins",
    price: "₹7,500",
    description: "Hydrating hyaluronic-infused velvet matte lip mapping with bespoke ombre shading, paired with high-point liquid pearl strobing along the cheekbones.",
    keyPoints: ["Plumping Hyaluronic Core", "Non-Drying Sateen Finish", "Camera High-Point Glow"],
    image: galaImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-posing-with-a-red-light-41586-large.mp4"
  },
  {
    id: "korean-dewy-glaze",
    name: "Dewy Peach Glaze & Soft Glam",
    category: "Pre-Wedding & Day Galas",
    duration: "75 mins",
    price: "₹8,500",
    description: "Water-infusion skincare prep with Kannauj rose water followed by sheer peptide tint and peachy-coral monochromatic cream blush for an ethereal morning glow.",
    keyPoints: ["Organic Rose & Saffron Prep", "Hydra-Gloss Cheek Lamination", "Feathery Brow Sculpting"],
    image: heroImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-long-shiny-brown-hair-41584-large.mp4"
  }
];

export const TEXTURE_DIAGNOSTICS = [
  {
    id: "liquid-silk",
    name: "Liquid-Silk Straight",
    type: "Fine to Medium / Type 1A–1C",
    treatment: "Molecular Keratin Polypeptide Infusion",
    shineLevel: "99% High Refraction Glass",
    duration: "150 mins",
    desc: "Infuses plant-based bio-mimetic amino chains directly into depleted cuticles, producing a mirror-flat, weightless cascade.",
    image: hairScienceImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-long-shiny-brown-hair-41584-large.mp4"
  },
  {
    id: "velvet-waves",
    name: "Volumetric Velvet Waves",
    type: "Medium to Dense / Type 2A–2C",
    treatment: "Thermal Sculpt & Peach Platinum Glaze",
    shineLevel: "94% Soft Sateen Glow",
    duration: "180 mins",
    desc: "Bespoke dimensional balayage glazed in champagne-peach tones, set with large-barrel ceramic thermal rollers for movement.",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=90",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-for-a-fashion-photoshoot-39879-large.mp4"
  },
  {
    id: "royal-curls",
    name: "Textured Royal Curls",
    type: "Coarse & Coily / Type 3A–4C",
    treatment: "Deep Botanical Lipid Hydration & Definition",
    shineLevel: "92% Hydrated Luster",
    duration: "160 mins",
    desc: "Individual curl grouping with cold-pressed peach kernel elixir and marula lipid butter, defining bounce without crisp residue.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=90",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-posing-with-a-red-light-41586-large.mp4"
  },
  {
    id: "glass-laminate",
    name: "Platinum Peach Glass Laminate",
    type: "Color-Treated / Bleached / Fragile",
    treatment: "pH 4.5 Acidic Gloss & Bond Rebuilder",
    shineLevel: "98% Holographic Sheen",
    duration: "120 mins",
    desc: "Seals porous cortical layers, neutralizing brassy brass with cool platinum and delicate blush undertones.",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=90",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stylist-applying-makeup-to-a-model-41585-large.mp4"
  }
];

export const BRIDAL_TIMELINE = [
  {
    step: "01",
    phase: "The Architectural Trial",
    timeframe: "6 to 8 Weeks Prior",
    title: "Lighting & Silhouette Alignment",
    desc: "A dedicated 3-hour session testing two distinct hairstyles and airbrush makeup formulas under calibrated natural daylight (5500K) and banquet flash (3200K). We photograph with your veil silhouette.",
    badge: "3-Hour Deep Dive"
  },
  {
    step: "02",
    phase: "The Rehearsal Note",
    timeframe: "7 Days Prior",
    title: "Hair Diagnostic & Micro-Touch",
    desc: "A short check-in with Eshivi to adjust for any changes in scalp hydration, skin undertone, or jewelry placement. Scalp gloss and restorative mask treatment applied for peak radiance.",
    badge: "Scalp & Cuticle Glaze"
  },
  {
    step: "03",
    phase: "The Morning Of",
    timeframe: "Wedding Day",
    title: "Unhurried Heirloom Styling",
    desc: "Eshivi and your bridal entourage stylists arrive at your suite or private salon lounge in Prayagraj with bespoke touch-up kits, fresh organic florals, and diamond anchoring pins.",
    badge: "VIP Suite Concierge"
  }
];

export const GALA_OCCASIONS = [
  {
    title: "Red Carpets & Film Premieres",
    vibe: "High-Flash Paparazzi Radiance",
    duration: "120 mins",
    features: ["Flash-proof skin finish", "Sleek architectural bun or retro waves", "Diamond hair jewelry anchoring", "Lead artist VIP on-set standby"],
    price: "₹18,500"
  },
  {
    title: "Milestone Galas & Royal Receptions",
    vibe: "Sculpted Elegance & Sateen Glow",
    duration: "150 mins",
    features: ["24K Gold Leaf eye accents or smokey couture", "Volumetric Hollywood blowout", "Neck and decollete glow lamination", "12-hour setting spray veil"],
    price: "₹15,000"
  },
  {
    title: "Private Penthouse Celebrations",
    vibe: "Intimate High-Fashion Chic",
    duration: "90 mins",
    features: ["Effortless textured updo or liquid silk", "Dewy peach blush skin", "Luxury blowout with bespoke glaze", "Champagne service included"],
    price: "₹12,000"
  },
  {
    title: "High-Society Family Portraits",
    vibe: "Multi-Generation Heirloom Polish",
    duration: "180 mins",
    features: ["Full party styling (up to 4 members)", "Camera-balanced tone consistency", "Subtle anti-shine grooming", "On-location studio coordination"],
    price: "₹32,000"
  }
];

export const LOOKBOOK_ITEMS = [
  {
    id: 1,
    category: "hair-science",
    title: "Liquid-Silk Peach Platinum Sheen",
    subtitle: "Molecular Glass Restoration",
    image: hairScienceImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-long-shiny-brown-hair-41584-large.mp4",
    prompt: "A high-fashion editorial close-up portrait of an Indian supermodel with sculpted cheekbones showcasing pristine, liquid-silk straight hair and soft volumetric waves, reflecting ultra-subtle peach and platinum highlights. Hasselblad 100MP, 8k resolution --ar 16:9 --style raw --v 6.0",
    artist: "Eshivi (Founder & Creative Director)",
    specs: "Hasselblad 100MP · 85mm f/1.4 · Key Studio Light"
  },
  {
    id: 2,
    category: "makeup",
    title: "24K Gold Foil Eyelids & Radiant Glass Skin",
    subtitle: "Haute Makeup Artistry",
    image: makeupMacroImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stylist-applying-makeup-to-a-model-41585-large.mp4",
    prompt: "A close-up high-fashion beauty portrait of an Indian model showcasing pristine 24K gold foil eyelid accents, feathery brow lamination, and dewy peach glazed cheekbones. Hasselblad 100MP, macro lens 100mm, 8k --ar 16:9 --v 6.0",
    artist: "Eshivi (Lead Makeup Artist)",
    specs: "Canon R5 · 100mm f/2.8 Macro · Studio Beauty Dish"
  },
  {
    id: 3,
    category: "bridal",
    title: "Royal Heritage Bridal Portrait & Diamond Updo",
    subtitle: "HD Airbrush & Heritage Veil",
    image: bridalImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-beautiful-bride-smiling-42867-large.mp4",
    prompt: "An elite royal Indian bridal luxury portrait showcasing flawless high-definition airbrush makeup, dewy radiant skin, and a classic structural bridal updo woven with real diamond accessories. Soft focus gold-gilded background --ar 4:3 --v 6.0",
    artist: "Eshivi (Royal Bridal Director)",
    specs: "Sony A1 · 50mm f/1.2 · 5600K Warm Key Light"
  },
  {
    id: 4,
    category: "gala",
    title: "Met Gala Architectural Sleek Bun",
    subtitle: "Paparazzi Red Carpet Glamour",
    image: galaImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-for-a-fashion-photoshoot-39879-large.mp4",
    prompt: "A striking red-carpet paparazzi photo of an elegant Indian model showcasing bold evening makeup, an artistic high-society sleek bun styling, and sharp diamond jewelry. High-fashion flash reflections --ar 16:9 --style raw",
    artist: "Vikramaditya Sen (Lead Couturier)",
    specs: "Leica SL2 · Direct Strobe Flash · Anamorphic 50mm"
  },
  {
    id: 5,
    category: "hair-science",
    title: "Volumetric Peach Sunset Waves",
    subtitle: "Dimensional Thermal Balayage",
    image: heroImg,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glamorous-woman-in-a-golden-dress-41588-large.mp4",
    prompt: "A cinematic macro tracking shot of rich, healthy, hyper-glossy dark hair textures catching dramatic golden accent lights in a minimalist luxury salon lounge in Manauri.",
    artist: "Aria Malhotra (Senior Trichologist)",
    specs: "RED V-Raptor 8K · Cooke Anamorphic 60fps"
  },
  {
    id: 6,
    category: "makeup",
    title: "Velvet Matte Plum & Champagne Strobing",
    subtitle: "High-Society Evening Makeup",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=90",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-posing-with-a-red-light-41586-large.mp4",
    prompt: "High-fashion Indian model walking into a ballroom, bold smokey burgundy eyes, velvet peach lip contour, high cheekbone diamond highlight, cinematic anamorphic bokeh, 4k.",
    artist: "Eshivi & Team",
    specs: "ARRI Alexa Mini · Master Prime 35mm"
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "24K Liquid Peach Hair Elixir",
    category: "Hair Chemistry",
    size: "50ml / 1.7 fl oz",
    price: 4800,
    rating: 4.9,
    reviews: 142,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1608248597359-3a334d0b1784?auto=format&fit=crop&w=800&q=90",
    desc: "Infused with cold-pressed peach kernel lipids, Moroccan argan, and suspended 24K gold micro-flakes for 48-hour mirror refraction.",
    keyIngredients: "Organic Peach Kernel Oil, 24K Gold Flakes, Marula Seed Ester, Vitamin E"
  },
  {
    id: "prod-2",
    name: "Molecular Silk Keratin Polypeptide",
    category: "Hair Chemistry",
    size: "100ml / 3.4 fl oz",
    price: 6200,
    rating: 5.0,
    reviews: 98,
    tag: "Clinical Grade",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=90",
    desc: "Rebuilds severed disulfide bridges within damaged cuticles. Heat-activated during blowouts for permanent tensile strength.",
    keyIngredients: "Bio-Mimetic Peptides, Hydrolyzed Silk Protein, Ceramide Complex"
  },
  {
    id: "prod-3",
    name: "Imperial 24K Gold Radiance Primer",
    category: "Makeup Couture",
    size: "30ml / 1.0 fl oz",
    price: 5400,
    rating: 4.9,
    reviews: 184,
    tag: "Celebrity Pick",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=90",
    desc: "Pre-makeup elixir infused with Kashmiri saffron extract, niacinamide, and micro 24K gold sheets for seamless 16-hour makeup hold.",
    keyIngredients: "Kashmiri Saffron, Pure 24K Gold Leaf, Polyglutamic Acid, Rosehip Ester"
  },
  {
    id: "prod-4",
    name: "HD Airbrush Silk Veil Foundation",
    category: "Makeup Couture",
    size: "35ml / 1.2 fl oz",
    price: 4900,
    rating: 5.0,
    reviews: 122,
    tag: "Camera Ready",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=90",
    desc: "Micro-fine breathable foundation veil providing buildable medium-to-full couture coverage with zero flashback or caking.",
    keyIngredients: "Micro-Silicone Polymers, Hyaluronic Spheres, Peach Kernel Extract"
  },
  {
    id: "prod-5",
    name: "Velvet Peach Haute Matte Lip Glaze",
    category: "Makeup Couture",
    size: "6ml / 0.2 fl oz",
    price: 2800,
    rating: 4.9,
    reviews: 230,
    tag: "Bridal Signature",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=90",
    desc: "Non-drying velvet matte liquid lip formula in our signature Peach Atelier nude-rose hue that lasts through 12 hours of dining.",
    keyIngredients: "Peach Seed Butter, Jojoba Wax, Vitamin C Ester, Rose Otto"
  },
  {
    id: "prod-6",
    name: "Dewy Radiance Rose & Peach Hydrosol",
    category: "Skin Alchemy",
    size: "120ml / 4.0 fl oz",
    price: 3400,
    rating: 4.8,
    reviews: 210,
    tag: "Bridal Favorite",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=90",
    desc: "Distilled Kannauj Damask rose water blended with fresh peach blossom ferment and low-molecular hyaluronic acid for 16-hour dewy skin.",
    keyIngredients: "Kannauj Rose Hydrosol, Peach Blossom Ferment, Polyglutamic Acid"
  },
  {
    id: "prod-7",
    name: "Cashmere Sculpt Finishing Balm",
    category: "Hair Chemistry",
    size: "75ml / 2.5 fl oz",
    price: 3900,
    rating: 4.9,
    reviews: 76,
    tag: "Red Carpet Must-Have",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=90",
    desc: "Weightless pomade providing flexible all-day hold for sleek buns and flyaway control with zero grease or residue.",
    keyIngredients: "Candelilla Wax, Peach Seed Butter, Silk Amino Acids"
  },
  {
    id: "prod-8",
    name: "Diamond Strobe Illuminating Drops",
    category: "Makeup Couture",
    size: "20ml / 0.7 fl oz",
    price: 3600,
    rating: 4.9,
    reviews: 115,
    tag: "High Glow",
    image: "https://images.unsplash.com/photo-1608248597359-3a334d0b1784?auto=format&fit=crop&w=800&q=90",
    desc: "Ultra-concentrated liquid crystal illuminator creating high-refraction glass skin across cheekbones, collarbones, and shoulders.",
    keyIngredients: "Crushed Pearl Extract, Squalane, Peach Esters, Mica Light Reflectors"
  }
];

export const MASTER_STYLISTS = [
  {
    id: "stylist-eshivi",
    name: "Eshivi",
    role: "Founder & Creative Director",
    experience: "16 Years · Haute Couture & Bridal Master",
    specialty: "HD Airbrush Glass Skin, Diamond Updo Architecture, Custom Peach Formulations",
    image: heroImg,
    accolades: "Vogue Beauty Honors Finalist & Master Couturier"
  },
  {
    id: "stylist-1",
    name: "Aria Malhotra",
    role: "Senior Colorist & Head Trichologist",
    experience: "14 Years · Vidal Sassoon London Alum",
    specialty: "Liquid-Silk Glaze, Peach-Platinum Toning, Follicle Diagnostics",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=90",
    accolades: "Trichology Research Fellow 2025"
  },
  {
    id: "stylist-3",
    name: "Vikramaditya Sen",
    role: "Red Carpet & Gala Couturier",
    experience: "12 Years · Filmfare & Cannes Lead Stylist",
    specialty: "Paparazzi-Proof Makeup, Sculpted Bun Architecture, 24K Gold Eye Artistry",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=90",
    accolades: "Elle India Best Editorial Stylist"
  }
];

export const MEMBERSHIP_TIERS = [
  {
    id: "atelier",
    name: "Atelier Circle",
    tier: "Signature VIP",
    fee: "₹45,000 / year",
    badge: "Bespoke Care",
    features: [
      "Priority chair reservation with 24-hour notice",
      "Complimentary monthly Molecular Silk Gloss treatment",
      "15% privilege on all Peach Apothecary formulations",
      "Complimentary Champagne & artisan refreshments"
    ]
  },
  {
    id: "couturier",
    name: "Couturier Patron",
    tier: "Most Prestigious",
    fee: "₹1,20,000 / year",
    badge: "Unlimited Indulgence",
    features: [
      "Guaranteed same-day VIP chair allocation with Eshivi",
      "Dedicated Private Dressing Suite for all appointments",
      "Full hair & makeup styling for up to 4 major galas/events",
      "Lead Creative Director personal service guarantee",
      "Direct WhatsApp access to Eshivi & master team"
    ],
    recommended: true
  },
  {
    id: "royal-crown",
    name: "The Royal Crown",
    tier: "Heirloom Bridal & Society",
    fee: "₹2,50,000 / bespoke",
    badge: "By Invitation Only",
    features: [
      "Full bridal wedding week entourage management (up to 12 guests)",
      "On-location destination wedding escort anywhere in India or globally",
      "Custom bespoke fragrance & hair elixir formulated in France",
      "Private salon buyout access for you and your bridal party"
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "Eshivi treated my bridal updo as an architectural masterpiece. My heavy zardozi dupatta stayed anchored for 14 hours without a single pull or bobby-pin slip.",
    author: "Radhika Singhania",
    occasion: "Royal Wedding at Taj Falaknuma",
    rating: 5
  },
  {
    quote: "The molecular silk treatment completely transformed my bleached strands into liquid glass. Under studio flash, the subtle peach highlights look like liquid couture.",
    author: "Meera Kapoor",
    occasion: "Filmfare Red Carpet 2026",
    rating: 5
  },
  {
    quote: "The private suite in Manauri, Prayagraj is unrivaled. True daylight bulbs, unhurried master artists, and vintage champagne. Pure luxury under Eshivi's direction.",
    author: "Devika Rao",
    occasion: "High-Society Gala Patron",
    rating: 5
  }
];

export const PRESS_ACCOLADES = [
  { outlet: "VOGUE", quote: "The gold standard of couture hair diagnostics and royal bridal styling in Uttar Pradesh." },
  { outlet: "HARPER'S BAZAAR", quote: "Where trichology science meets Paris couture aesthetics." },
  { outlet: "ELLE", quote: "Peach Salon's paparazzi-proof gala formulation is the secret behind Prayagraj and NCR's most radiant red carpets." },
  { outlet: "FEMINA", quote: "An heirloom-grade sanctuary for discerning brides." }
];

export const INITIAL_SERVICES_LIST = [
  { id: "s1", name: "Molecular Liquid-Silk Restoration & Gloss", duration: "120 mins", price: 8500, category: "Hair Science" },
  { id: "s2", name: "HD 4K Airbrush Glass Skin Makeup", duration: "90 mins", price: 12500, category: "Makeup Artistry" },
  { id: "s3", name: "24K Gold Leaf & Champagne Foil Eye Artistry", duration: "75 mins", price: 9500, category: "Makeup Artistry" },
  { id: "s4", name: "Bespoke Peach-Platinum Balayage & Thermal Sculpt", duration: "180 mins", price: 14500, category: "Hair Science" },
  { id: "s5", name: "The Imperial Bridal Trial (Airbrush + Updo)", duration: "180 mins", price: 18000, category: "Royal Bridal" },
  { id: "s6", name: "Grand Wedding Day Styling (Private Suite + Veil Anchor)", duration: "240 mins", price: 45000, category: "Royal Bridal" },
  { id: "s7", name: "Bridal Entourage Styling (Per Guest)", duration: "75 mins", price: 9500, category: "Royal Bridal" },
  { id: "s8", name: "Met Gala Architectural Bun & Flash Prep", duration: "120 mins", price: 16500, category: "Galas & Events" },
  { id: "s9", name: "Old Hollywood Couture Waves & Evening Makeup", duration: "105 mins", price: 13500, category: "Galas & Events" },
  { id: "s10", name: "Red Carpet On-Location VIP Escort", duration: "300 mins", price: 35000, category: "Galas & Events" }
];

export const SERVICES_LIST = INITIAL_SERVICES_LIST;
export const APOTHECARY_PRODUCTS = INITIAL_PRODUCTS;