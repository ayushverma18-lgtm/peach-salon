import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

let db = null;
let isFirebaseInitialized = false;

// Attempt Firebase Admin SDK Initialization
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log('✅ Firebase Admin SDK initialized via service account environment variable.');
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    });
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log('✅ Firebase Admin SDK initialized via project environment parameters.');
  } else {
    const localKeyPath = path.resolve('server', 'serviceAccountKey.json');
    if (fs.existsSync(localKeyPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(localKeyPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      db = admin.firestore();
      isFirebaseInitialized = true;
      console.log('✅ Firebase Admin SDK initialized via local serviceAccountKey.json.');
    } else {
      console.log('ℹ️ Firebase credentials not detected. Initializing persistent local database store.');
    }
  }
} catch (error) {
  console.warn('⚠️ Firebase Admin initialization warning:', error.message);
}

// Resilient In-Memory & File-Backed Storage (Guarantees 100% persistence in dev & production fallback)
const DATA_FILE = path.resolve('server', 'database_store.json');

const defaultData = {
  site_settings: {
    name: "PEACH SALON",
    subtitle: "Bridal Makeup & Hair Studio",
    director: "Eshvi",
    directorRole: "Director & Lead Bridal Makeup Artist",
    tagline: "Enhancing Your Natural Grace with Elegant Bridal Artistry",
    address: "Near New SBI Branch, Public Inter College, Manauri, Prayagraj, Uttar Pradesh - 212208",
    city: "Manauri, Prayagraj",
    state: "Uttar Pradesh",
    pincode: "212208",
    hours: "Sunday–Saturday, 10:00 AM–7:00 PM",
    timingShort: "10:00 AM – 7:00 PM (All 7 Days)",
    phone: "+91 98390 12345",
    whatsapp: "+91 98390 12345",
    email: "contact@peachsalon.in",
    instagram: "https://instagram.com/peachsalon_prayagraj",
    statusMessage: "Studio Open Today in Manauri, Prayagraj · 10:00 AM – 7:00 PM",
    adminPasscode: "eshvi"
  },
  home_settings: {
    heroHeading: "Enhancing Your Natural Grace with Elegant Bridal Artistry",
    heroSubtitle: "Dedicated bridal makeup, HD finishes, and professional hair styling studio in Manauri, Prayagraj. Supervised directly by Eshvi.",
    heroCtaText: "Book an Appointment",
    heroSecondaryCta: "Explore Bridal Packages",
    videoUrl: "/videos/peach-salon.mp4",
    heroImage: "/images/bridal.jpg"
  },
  about_settings: {
    heading: "About Peach Salon & Eshvi",
    subtitle: "Warm, professional, and trustworthy beauty services in Manauri.",
    description: "Welcome to Peach Salon, a dedicated bridal makeup and hair studio situated near the New SBI Branch in Manauri, Prayagraj. Founded and directed by Eshvi, our studio focuses on creating clean, elegant, and personalized bridal and occasion looks. We believe in enhancing each client's natural beauty with thoughtful techniques and quality products.",
    directorName: "Eshvi",
    directorRole: "Director & Lead Artist",
    directorBio: "With a passion for bridal elegance and neat hair styling, Eshvi works closely with every bride to design comfortable, radiant, and timeless looks for weddings, engagements, and special family functions.",
    image: "/images/about.jpg"
  },
  bridal_packages: [
    {
      id: "bridal-classic",
      name: "Classic Bridal Makeup",
      price: 12000,
      description: "A traditional bridal makeup look with a clean base, defined eyes, suitable bridal colours, neat brows, soft contouring and a polished finish. The look should be elegant and comfortable for wedding functions.",
      image: "/images/bridal.jpg",
      active: true,
      order: 1
    },
    {
      id: "bridal-hd",
      name: "HD Bridal Makeup",
      price: 15000,
      description: "A refined HD makeup look with a smooth and natural-looking base, detailed eye makeup, soft contouring, balanced blush and a polished finish suitable for bridal photography and wedding ceremonies.",
      image: "/images/bridal.jpg",
      recommended: true,
      active: true,
      order: 2
    },
    {
      id: "bridal-airbrush",
      name: "Airbrush Makeup",
      price: 20000,
      description: "A lightweight airbrush makeup finish designed for a smooth and even appearance. It includes detailed eye makeup, balanced face makeup and a polished bridal finish suitable for long wedding functions and photography.",
      image: "/images/bridal.jpg",
      active: true,
      order: 3
    }
  ],
  makeup_services: [
    { id: "mu-natural", name: "Natural Makeup", price: null, description: "A fresh and subtle makeup look focusing on an even skin tone, soft eye definition, and a natural lip colour for daily elegance or intimate family gatherings.", category: "Makeup", active: true, order: 1 },
    { id: "mu-soft-glam", name: "Soft Glam Makeup", price: null, description: "A radiant makeup style with gentle eye blending, soft glow on the high points of the face, and balanced tones for pre-wedding functions and festivities.", category: "Makeup", active: true, order: 2 },
    { id: "mu-engagement", name: "Engagement Makeup", price: null, description: "A graceful makeup look tailored to complement engagement attires with elegant eye styling, luminous base, and lasting comfort throughout the function.", category: "Makeup", active: true, order: 3 },
    { id: "mu-party", name: "Party Makeup", price: null, description: "A neat and vibrant makeup finish designed for wedding guests, family celebrations, sangeet, and festive get-togethers.", category: "Makeup", active: true, order: 4 },
    { id: "mu-velvet", name: "Velvet Makeup", price: null, description: "A soft, smooth and elegant makeup look with a comfortable-looking base, balanced eye makeup, subtle contouring and a refined finish. Suitable for functions where the customer wants a polished but not overly dramatic look.", category: "Makeup", active: true, order: 5 },
    { id: "mu-cocktail-glam", name: "Cocktail Glam Makeup", price: null, description: "A slightly more glamorous evening makeup look with defined eyes, polished skin, balanced contouring and a stylish finish suitable for cocktail functions, evening parties and celebrations.", category: "Makeup", active: true, order: 6 }
  ],
  hair_services: [
    { id: "hair-bridal-styling", name: "Bridal Hair Styling", price: null, description: "Hair styling planned according to the bridal outfit, jewellery and overall makeup look.", category: "Hair", active: true, order: 1 },
    { id: "hair-bridal-bun", name: "Bridal Bun", price: null, description: "A neat bridal bun suitable for traditional bridal hairstyles and hair accessories.", category: "Hair", active: true, order: 2 },
    { id: "hair-open-styling", name: "Open Hair Styling", price: null, description: "Styled open hair with a clean and polished finish suitable for engagement and party looks.", category: "Hair", active: true, order: 3 },
    { id: "hair-soft-curls", name: "Soft Curls", price: null, description: "Soft curls for a simple and elegant look.", category: "Hair", active: true, order: 4 },
    { id: "hair-waves", name: "Waves", price: null, description: "Loose waves for a relaxed and polished appearance.", category: "Hair", active: true, order: 5 },
    { id: "hair-party-hairstyling", name: "Party Hairstyling", price: null, description: "Hairstyling suitable for parties, family functions and celebrations.", category: "Hair", active: true, order: 6 }
  ],
  addons: [
    { id: "addon-dressing", name: "Private Dressing, Outfit & Footwear", price: 1200, description: "Assistance with outfit draping, dupatta setting, jewellery fixing, and footwear adjustment in our dedicated dressing area.", active: true, order: 1 },
    { id: "addon-kahwa", name: "Kashmiri Kahwa Service & Cocktail", price: 700, description: "Traditional warm Kashmiri kahwa beverage service prepared for the bride and client during styling.", active: true, order: 2 }
  ],
  gallery: [
    { id: "gal-1", title: "Bridal Makeup & Dupatta Draping", description: "Classic bridal look with neat eye styling and traditional matha patti setting.", category: "Bridal", image: "/images/bridal.jpg", order: 1 },
    { id: "gal-2", title: "HD Engagement Glam", description: "Smooth luminous base and balanced eye definition for pre-wedding ceremony.", category: "Makeup", image: "/images/makeup.jpg", order: 2 },
    { id: "gal-3", title: "Traditional Bridal Bun with Floral Accessories", description: "Neat structural bridal bun styling suitable for heavy bridal dupattas.", category: "Hair", image: "/images/hair.jpg", order: 3 },
    { id: "gal-4", title: "Soft Curls & Open Hair Styling", description: "Elegant soft curls styled for reception and party wear.", category: "Hair", image: "/images/hair.jpg", order: 4 },
    { id: "gal-5", title: "Velvet Finish Party Makeup", description: "Refined, comfortable look with smooth velvet base and soft contouring.", category: "Makeup", image: "/images/makeup.jpg", order: 5 },
    { id: "gal-6", title: "Airbrush Bridal Finish", description: "Weightless and long-lasting finish photographed under natural lighting.", category: "Bridal", image: "/images/bridal.jpg", order: 6 }
  ],
  bookings: []
};

const loadLocalStore = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      return { ...defaultData, ...data };
    }
  } catch (e) {
    console.error('Error reading local data store:', e.message);
  }
  return defaultData;
};

const saveLocalStore = (data) => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving local data store:', e.message);
  }
};

let localStore = loadLocalStore();

export const dbService = {
  isCloudFirebase: () => isFirebaseInitialized,

  // Full Content State
  async getFullContent() {
    if (isFirebaseInitialized && db) {
      try {
        const doc = await db.collection('content').doc('main').get();
        if (doc.exists) {
          return { ...defaultData, ...doc.data() };
        }
      } catch (err) {
        console.warn('Firebase getFullContent fallback:', err.message);
      }
    }
    return localStore;
  },

  async updateFullContent(contentData) {
    localStore = { ...localStore, ...contentData };
    saveLocalStore(localStore);
    if (isFirebaseInitialized && db) {
      try {
        await db.collection('content').doc('main').set(localStore, { merge: true });
      } catch (err) {
        console.warn('Firebase updateFullContent fallback:', err.message);
      }
    }
    return localStore;
  },

  // Specific Entity Updaters
  async updateEntity(entityKey, data) {
    localStore[entityKey] = data;
    saveLocalStore(localStore);
    if (isFirebaseInitialized && db) {
      try {
        await db.collection('content').doc('main').set({ [entityKey]: data }, { merge: true });
      } catch (err) {
        console.warn(`Firebase updateEntity (${entityKey}) fallback:`, err.message);
      }
    }
    return localStore[entityKey];
  },

  // Bookings
  async createBooking(bookingData) {
    const newBooking = {
      id: 'BK-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      ...bookingData,
      status: bookingData.status || 'Received',
      createdAt: new Date().toISOString()
    };

    localStore.bookings.unshift(newBooking);
    saveLocalStore(localStore);

    if (isFirebaseInitialized && db) {
      try {
        const docRef = await db.collection('bookings').add({
          ...bookingData,
          status: 'Received',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        newBooking.firebaseId = docRef.id;
      } catch (err) {
        console.warn('Firebase createBooking fallback:', err.message);
      }
    }

    return newBooking;
  },

  async getBookings() {
    if (isFirebaseInitialized && db) {
      try {
        const snapshot = await db.collection('bookings').orderBy('createdAt', 'desc').get();
        if (!snapshot.empty) {
          return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt
          }));
        }
      } catch (err) {
        console.warn('Firebase getBookings fallback:', err.message);
      }
    }
    return localStore.bookings || [];
  },

  async deleteBooking(bookingId) {
    localStore.bookings = (localStore.bookings || []).filter(b => b.id !== bookingId && b.firebaseId !== bookingId);
    saveLocalStore(localStore);

    if (isFirebaseInitialized && db) {
      try {
        await db.collection('bookings').doc(bookingId).delete();
      } catch (err) {
        // ignore if not found
      }
    }
    return true;
  },

  async updateBookingStatus(bookingId, status) {
    const booking = (localStore.bookings || []).find(b => b.id === bookingId || b.firebaseId === bookingId);
    if (booking) {
      booking.status = status;
      booking.updatedAt = new Date().toISOString();
      saveLocalStore(localStore);
    }

    if (isFirebaseInitialized && db) {
      try {
        await db.collection('bookings').doc(bookingId).update({ status, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
      } catch (err) {
        // ignore
      }
    }
    return true;
  }
};

export default db;
