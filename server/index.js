import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { dbService } from './firebaseConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure public upload directories exist
const uploadDir = path.resolve('public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads serving
app.use('/uploads', express.static(uploadDir));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Peach Salon — Bridal Makeup & Hair Studio API',
    location: 'Manauri, Prayagraj',
    director: 'Eshvi',
    cloudFirebaseActive: dbService.isCloudFirebase(),
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// 1. FULL CONTENT & ENTITY MANAGEMENT API (For Admin & Frontend)
// -------------------------------------------------------------

// GET /api/content - Retrieve all active website content
app.get('/api/content', async (req, res) => {
  try {
    const content = await dbService.getFullContent();
    return res.json({ success: true, content });
  } catch (error) {
    console.error('Error fetching content:', error);
    return res.status(500).json({ error: 'Failed to retrieve website content.' });
  }
});

// PUT /api/content - Update full or partial website content (Admin)
app.put('/api/content', async (req, res) => {
  try {
    const updatedContent = await dbService.updateFullContent(req.body);
    return res.json({ success: true, message: 'Content synchronized successfully.', content: updatedContent });
  } catch (error) {
    console.error('Error updating content:', error);
    return res.status(500).json({ error: 'Failed to update content.' });
  }
});

// PUT /api/entity/:key - Update a specific entity (e.g. bridal_packages, site_settings, gallery)
app.put('/api/entity/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const updated = await dbService.updateEntity(key, req.body);
    return res.json({ success: true, message: `${key} updated successfully.`, data: updated });
  } catch (error) {
    console.error(`Error updating entity ${req.params.key}:`, error);
    return res.status(500).json({ error: `Failed to update ${req.params.key}.` });
  }
});

// -------------------------------------------------------------
// 2. APPOINTMENT BOOKINGS API
// -------------------------------------------------------------

// POST /api/bookings - Submit client appointment inquiry
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      clientName,
      phone,
      service,
      date,
      time,
      message,
      selectedAddons
    } = req.body;

    // Validation
    if (!clientName || !phone || !service || !date) {
      return res.status(400).json({
        error: 'Please fill all required fields: Name, Phone Number, Service, and Date.'
      });
    }

    const bookingPayload = {
      clientName: clientName.trim(),
      phone: phone.trim(),
      service,
      date,
      time: time || '11:00 AM',
      message: message || '',
      selectedAddons: selectedAddons || [],
      status: 'Received'
    };

    const createdBooking = await dbService.createBooking(bookingPayload);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your appointment inquiry has been received at Peach Salon, Manauri.',
      booking: createdBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Internal server error while saving booking.' });
  }
});

// GET /api/bookings - Retrieve all client bookings (Admin)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await dbService.getBookings();
    return res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Failed to retrieve bookings.' });
  }
});

// DELETE /api/bookings/:id - Delete booking inquiry (Admin)
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await dbService.deleteBooking(id);
    return res.json({ success: true, message: `Booking ${id} deleted.` });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return res.status(500).json({ error: 'Failed to delete booking.' });
  }
});

// PATCH /api/bookings/:id - Update booking status (e.g. Confirmed, Completed, Cancelled)
app.patch('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await dbService.updateBookingStatus(id, status);
    return res.json({ success: true, message: `Booking status updated to ${status}.` });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ error: 'Failed to update status.' });
  }
});

// -------------------------------------------------------------
// 3. SECURE ADMIN AUTHENTICATION
// -------------------------------------------------------------

// POST /api/auth/login - Verify admin passcode
app.post('/api/auth/login', async (req, res) => {
  const { passcode } = req.body;
  if (!passcode) {
    return res.status(400).json({ error: 'Passcode is required.' });
  }

  try {
    const content = await dbService.getFullContent();
    const storedPass = content?.site_settings?.adminPasscode || process.env.ADMIN_PASSCODE || 'eshvi';

    // Allow configured passcode or fallback 'eshvi' / '1234'
    const validCodes = [storedPass.toLowerCase(), 'eshvi', '1234'].filter(Boolean);
    const isValid = validCodes.includes(passcode.toLowerCase()) || validCodes.includes(passcode);

    if (isValid) {
      const token = 'ps-auth-' + Buffer.from(Date.now().toString()).toString('base64');
      return res.json({
        success: true,
        role: 'admin',
        director: 'Eshvi',
        token,
        message: 'Authentication successful. Welcome, Eshvi.'
      });
    } else {
      return res.status(401).json({ success: false, error: 'Incorrect passcode. Please try again.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Authentication service error.' });
  }
});

// POST /api/auth/change-password - Change admin passcode
app.post('/api/auth/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'New passcode must be at least 4 characters.' });
  }

  try {
    const content = await dbService.getFullContent();
    const currentStored = content?.site_settings?.adminPasscode || 'eshvi';

    if (currentPassword && currentPassword !== currentStored && currentPassword !== 'eshvi' && currentPassword !== '1234') {
      return res.status(401).json({ error: 'Current passcode does not match.' });
    }

    content.site_settings.adminPasscode = newPassword;
    await dbService.updateEntity('site_settings', content.site_settings);

    return res.json({ success: true, message: 'Passcode updated successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update passcode.' });
  }
});

// -------------------------------------------------------------
// 4. MEDIA UPLOAD API (Images & Media)
// -------------------------------------------------------------

// POST /api/upload - Handle base64 image or media upload
app.post('/api/upload', (req, res) => {
  try {
    const { imageBase64, fileName } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'No image data provided.' });
    }

    // Extract base64 format and data
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // If it's already a URL or standard path, return it directly
      return res.json({ success: true, url: imageBase64 });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const ext = mimeType.split('/')[1] || 'jpg';
    const cleanFileName = (fileName ? fileName.replace(/[^a-zA-Z0-9_-]/g, '') : 'img') + '-' + Date.now() + '.' + ext;
    const filePath = path.join(uploadDir, cleanFileName);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const publicUrl = `/uploads/${cleanFileName}`;
    return res.json({ success: true, url: publicUrl, fileName: cleanFileName });
  } catch (error) {
    console.error('Error saving upload:', error);
    return res.status(500).json({ error: 'Failed to process file upload.' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n🌸 PEACH SALON — Bridal Makeup & Hair Studio Backend running on http://localhost:${PORT}`);
  console.log(`📍 Studio: Near New SBI Branch, Public Inter College, Manauri, Prayagraj (212208)`);
  console.log(`👑 Director: Eshvi | Opening Hours: 10:00 AM – 7:00 PM (All 7 Days)\n`);
});
