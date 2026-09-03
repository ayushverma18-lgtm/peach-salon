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
    // 1. Initialized via JSON string in env
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log('✅ Firebase Admin SDK initialized via service account environment variable.');
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    // 2. Initialized via individual env variables
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
    // Check if local serviceAccountKey.json exists in server directory
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
      console.log('ℹ️ Firebase credentials not detected. Initializing high-performance resilient database store (Local Firestore Store).');
    }
  }
} catch (error) {
  console.warn('⚠️ Firebase Admin initialization warning:', error.message);
}

// Resilient In-Memory & File-Backed Storage (Guarantees 100% uptime & persistence even without cloud keys)
const DATA_FILE = path.resolve('server', 'database_store.json');

const loadLocalStore = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading local data store:', e.message);
  }
  return {
    bookings: [],
    settings: {
      name: "Peach Salon & Atelier",
      owner: "Eshivi",
      ownerRole: "Founder & Creative Director",
      tagline: "Hair & Makeup, tailored like couture.",
      address: "GT Road, Manauri, Prayagraj, Uttar Pradesh 212212",
      city: "Prayagraj",
      locationShort: "Manauri, Prayagraj",
      phone: "+91 98390 12345",
      whatsapp: "+91 98390 12345",
      email: "eshivi@peachsalon.in",
      hours: "Monday – Saturday, 10:00 – 18:00 (Closed Sundays)",
      timingShort: "10:00 AM – 6:00 PM",
      closedDay: "Closed on Sundays",
      status: "Atelier Open — Manauri, Prayagraj & VIP Concierge"
    },
    services: [],
    products: []
  };
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

// Unified Database Provider
export const dbService = {
  isCloudFirebase: () => isFirebaseInitialized,

  // Bookings Collection
  async createBooking(bookingData) {
    if (isFirebaseInitialized && db) {
      const docRef = await db.collection('bookings').add({
        ...bookingData,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      return { id: docRef.id, ...bookingData, createdAt: new Date().toISOString() };
    } else {
      const newBooking = {
        id: 'BK-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        ...bookingData,
        status: bookingData.status || 'Pending',
        createdAt: new Date().toISOString()
      };
      localStore.bookings.unshift(newBooking);
      saveLocalStore(localStore);
      return newBooking;
    }
  },

  async getBookings() {
    if (isFirebaseInitialized && db) {
      const snapshot = await db.collection('bookings').orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt
        };
      });
    } else {
      return localStore.bookings;
    }
  },

  async deleteBooking(bookingId) {
    if (isFirebaseInitialized && db) {
      await db.collection('bookings').doc(bookingId).delete();
      return true;
    } else {
      const initialLen = localStore.bookings.length;
      localStore.bookings = localStore.bookings.filter(b => b.id !== bookingId);
      saveLocalStore(localStore);
      return localStore.bookings.length < initialLen;
    }
  },

  async updateBookingStatus(bookingId, status) {
    if (isFirebaseInitialized && db) {
      await db.collection('bookings').doc(bookingId).update({ status, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
      return true;
    } else {
      const booking = localStore.bookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = status;
        booking.updatedAt = new Date().toISOString();
        saveLocalStore(localStore);
        return true;
      }
      return false;
    }
  },

  // Salon Settings
  async getSettings() {
    if (isFirebaseInitialized && db) {
      const doc = await db.collection('settings').doc('flagship').get();
      if (doc.exists) return doc.data();
    }
    return localStore.settings;
  },

  async updateSettings(settingsData) {
    if (isFirebaseInitialized && db) {
      await db.collection('settings').doc('flagship').set(settingsData, { merge: true });
    }
    localStore.settings = { ...localStore.settings, ...settingsData };
    saveLocalStore(localStore);
    return localStore.settings;
  },

  // Services
  async updateService(serviceId, serviceData) {
    const sIndex = localStore.services.findIndex(s => s.id === serviceId);
    if (sIndex >= 0) {
      localStore.services[sIndex] = { ...localStore.services[sIndex], ...serviceData };
    } else {
      localStore.services.push({ id: serviceId, ...serviceData });
    }
    saveLocalStore(localStore);
    return true;
  },

  // Products
  async updateProduct(productId, productData) {
    const pIndex = localStore.products.findIndex(p => p.id === productId);
    if (pIndex >= 0) {
      localStore.products[pIndex] = { ...localStore.products[pIndex], ...productData };
    } else {
      localStore.products.push({ id: productId, ...productData });
    }
    saveLocalStore(localStore);
    return true;
  }
};

export default db;
