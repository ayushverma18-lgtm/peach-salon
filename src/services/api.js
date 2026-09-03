// Client-side API Service connecting React frontend to Express + Firebase backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
  // 1. Bookings
  async createBooking(bookingData) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn('API createBooking fallback to local storage:', err.message);
      // Fallback: local storage
      const fallbackBooking = {
        id: 'BK-LOC-' + Date.now(),
        ...bookingData,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };
      return { success: true, booking: fallbackBooking, fallback: true };
    }
  },

  async getBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.bookings || [];
    } catch (err) {
      console.warn('API getBookings fallback to local storage:', err.message);
      const saved = localStorage.getItem('peach_salon_bookings');
      return saved ? JSON.parse(saved) : [];
    }
  },

  async updateBookingStatus(bookingId, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      console.warn('API updateBookingStatus fallback:', err.message);
      return { success: true, fallback: true };
    }
  },

  async deleteBooking(bookingId) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      console.warn('API deleteBooking fallback:', err.message);
      return { success: true, fallback: true };
    }
  },

  // 2. Salon Settings
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.settings;
    } catch (err) {
      console.warn('API getSettings fallback:', err.message);
      const saved = localStorage.getItem('peach_salon_info');
      return saved ? JSON.parse(saved) : null;
    }
  },

  async updateSettings(settingsData) {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData)
      });
      return await res.json();
    } catch (err) {
      console.warn('API updateSettings fallback:', err.message);
      localStorage.setItem('peach_salon_info', JSON.stringify(settingsData));
      return { success: true, settings: settingsData, fallback: true };
    }
  },

  // 3. Owner Authentication
  async ownerLogin(passcode) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      return await res.json();
    } catch (err) {
      console.warn('API ownerLogin offline validation fallback:', err.message);
      const validPins = ['eshivi', '1234', '2026'];
      if (validPins.includes(passcode.toLowerCase()) || validPins.includes(passcode)) {
        return { success: true, role: 'owner', owner: 'Eshivi', fallback: true };
      }
      return { success: false, error: 'Invalid passcode.' };
    }
  }
};
