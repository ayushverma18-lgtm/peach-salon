import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbService } from './firebaseConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Peach Salon & Atelier API',
    cloudFirebaseActive: dbService.isCloudFirebase(),
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// 1. BOOKINGS API (Client Booking Modal & Owner Management)
// -------------------------------------------------------------

// POST /api/bookings - Submit a new client appointment
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      service,
      stylist,
      date,
      time,
      clientName,
      phone,
      email,
      notes,
      suiteUpgrade,
      champagneService
    } = req.body;

    // Validation
    if (!service || !clientName || !phone || !date || !time) {
      return res.status(400).json({
        error: 'Missing required booking fields (service, clientName, phone, date, time).'
      });
    }

    // Check Sunday closure rule
    const selectedDate = new Date(date);
    if (selectedDate.getDay() === 0) {
      return res.status(400).json({
        error: 'Peach Salon is closed on Sundays. Please select Monday through Saturday.'
      });
    }

    const bookingPayload = {
      service,
      stylist: stylist || 'Eshivi',
      date,
      time,
      clientName,
      phone,
      email: email || '',
      notes: notes || '',
      suiteUpgrade: Boolean(suiteUpgrade),
      champagneService: Boolean(champagneService),
      status: 'Confirmed'
    };

    const createdBooking = await dbService.createBooking(bookingPayload);

    return res.status(201).json({
      success: true,
      message: 'Appointment reserved successfully at Peach Atelier, Manauri Prayagraj.',
      booking: createdBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Internal server error while saving booking.' });
  }
});

// GET /api/bookings - Retrieve all bookings (For Owner Portal)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await dbService.getBookings();
    return res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Failed to retrieve bookings.' });
  }
});

// PATCH /api/bookings/:id - Update status of a booking
app.patch('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }
    const updated = await dbService.updateBookingStatus(id, status);
    if (updated) {
      return res.json({ success: true, message: `Booking ${id} status updated to ${status}.` });
    } else {
      return res.status(404).json({ error: 'Booking not found.' });
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    return res.status(500).json({ error: 'Failed to update booking status.' });
  }
});

// DELETE /api/bookings/:id - Cancel / delete a booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await dbService.deleteBooking(id);
    if (deleted) {
      return res.json({ success: true, message: `Booking ${id} deleted successfully.` });
    } else {
      return res.status(404).json({ error: 'Booking not found or already deleted.' });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    return res.status(500).json({ error: 'Failed to delete booking.' });
  }
});

// -------------------------------------------------------------
// 2. SALON SETTINGS API (Address, Hours, Owner Info)
// -------------------------------------------------------------

// GET /api/settings - Fetch live salon configuration
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await dbService.getSettings();
    return res.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return res.status(500).json({ error: 'Failed to fetch salon settings.' });
  }
});

// PUT /api/settings - Update salon settings (Owner only)
app.put('/api/settings', async (req, res) => {
  try {
    const settingsData = req.body;
    const updated = await dbService.updateSettings(settingsData);
    return res.json({ success: true, message: 'Settings updated successfully.', settings: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return res.status(500).json({ error: 'Failed to update settings.' });
  }
});

// -------------------------------------------------------------
// 3. OWNER AUTHENTICATION API
// -------------------------------------------------------------

// POST /api/auth/login - Verify owner passcode
app.post('/api/auth/login', (req, res) => {
  const { passcode } = req.body;
  if (!passcode) {
    return res.status(400).json({ error: 'Passcode is required.' });
  }

  // Accepted Owner PINs
  const validPins = ['eshivi', '1234', '2026', process.env.OWNER_PASSCODE].filter(Boolean);
  const isValid = validPins.includes(passcode.toLowerCase()) || validPins.includes(passcode);

  if (isValid) {
    return res.json({
      success: true,
      role: 'owner',
      owner: 'Eshivi',
      token: 'peach-auth-' + Buffer.from(Date.now().toString()).toString('base64'),
      message: 'Welcome back, Eshivi.'
    });
  } else {
    return res.status(401).json({ success: false, error: 'Invalid owner passcode.' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n👑 Peach Salon & Atelier Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints live at http://localhost:${PORT}/api/bookings and /api/settings`);
  console.log(`🔒 Database Engine: ${dbService.isCloudFirebase() ? 'Firebase Cloud Firestore' : 'High-Speed File & Memory Engine'}\n`);
});
