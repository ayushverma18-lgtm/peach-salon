import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Phone, MapPin, Heart, AlertCircle, Trash2 } from 'lucide-react';
import { api } from '../services/api';

export default function BookingModal({
  isOpen,
  onClose,
  initialService = '',
  siteSettings,
  onAddBooking
}) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    service: 'Classic Bridal Makeup',
    date: '',
    time: '11:00 AM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    'Classic Bridal Makeup (₹12,000)',
    'HD Bridal Makeup (₹15,000)',
    'Airbrush Makeup (₹20,000)',
    'Natural Makeup',
    'Soft Glam Makeup',
    'Engagement Makeup',
    'Party Makeup',
    'Velvet Makeup',
    'Cocktail Glam Makeup',
    'Bridal Hair Styling',
    'Bridal Bun',
    'Open Hair Styling',
    'Soft Curls',
    'Waves',
    'Party Hairstyling',
    'Private Dressing & Outfit Setting (₹1,200)',
    'Kashmiri Kahwa Service & Cocktail (₹700)',
    'General Studio Consultation'
  ];

  useEffect(() => {
    if (initialService) {
      const match = servicesList.find(s => s.toLowerCase().includes(initialService.toLowerCase()));
      setFormData(prev => ({
        ...prev,
        service: match || initialService
      }));
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.clientName.trim() || !formData.phone.trim() || !formData.date) {
      setErrorMessage('Please fill in your name, mobile number, and preferred date.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.createBooking(formData);
      if (res.success) {
        setSuccess(true);
        if (onAddBooking) {
          onAddBooking(res.booking || { id: 'BK-' + Date.now(), ...formData, status: 'Received' });
        }
      } else {
        setErrorMessage(res.error || 'Failed to submit appointment inquiry.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      clientName: '',
      phone: '',
      service: 'Classic Bridal Makeup',
      date: '',
      time: '11:00 AM',
      message: ''
    });
    setErrorMessage('');
    setSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2424]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white text-[#2D2424] rounded-2xl max-w-xl w-full border border-[#EFE3DF] shadow-2xl relative p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6E5E5C] hover:text-[#2D2424] rounded-full hover:bg-[#FDF3EF] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          /* SUCCESS CONFIRMATION SCREEN */
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-[#FDF1ED] text-[#C4727F] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#C4727F] font-bold block">
                Inquiry Received
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2D2424] mt-1">
                Thank You, {formData.clientName || 'Guest'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4E4D] font-sans mt-2 leading-relaxed">
                Your appointment request for <strong>{formData.service}</strong> on <strong>{formData.date} at {formData.time}</strong> has been logged at Peach Salon, Manauri.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9F7] rounded-xl border border-[#EFE3DF] text-xs text-[#6E5E5C] font-sans space-y-1 text-left">
              <div className="flex justify-between">
                <span>Studio Location:</span>
                <span className="font-semibold text-[#2D2424]">Manauri, Prayagraj</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <span className="font-semibold text-[#2D2424]">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Director &amp; Lead:</span>
                <span className="font-semibold text-[#2D2424]">Eshvi</span>
              </div>
            </div>

            <div className="pt-3 flex gap-2 justify-center">
              <button
                onClick={handleReset}
                className="btn-secondary px-5 py-2.5 rounded-lg text-xs font-sans font-semibold cursor-pointer"
              >
                New Appointment
              </button>
              <button
                onClick={onClose}
                className="btn-primary px-6 py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* APPOINTMENT INQUIRY FORM */
          <div className="space-y-5">
            
            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-soft text-[11px] font-sans font-semibold mb-2">
                <MapPin className="w-3 h-3 text-[#C4727F]" />
                <span>Manauri, Prayagraj &bull; Open 10 AM – 7 PM</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2424]">
                Book Studio Appointment
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans mt-1">
                Schedule your bridal or makeup session with director Eshvi.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-lg font-sans flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm text-[#2D2424] focus:outline-none focus:border-[#C4727F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98390 12345"
                    className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm text-[#2D2424] focus:outline-none focus:border-[#C4727F]"
                    required
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                  Select Service *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm text-[#2D2424] focus:outline-none focus:border-[#C4727F]"
                >
                  {servicesList.map((srv, idx) => (
                    <option key={idx} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm text-[#2D2424] focus:outline-none focus:border-[#C4727F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm text-[#2D2424] focus:outline-none focus:border-[#C4727F]"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">01:00 PM</option>
                    <option value="2:00 PM">02:00 PM</option>
                    <option value="3:00 PM">03:00 PM</option>
                    <option value="4:00 PM">04:00 PM</option>
                    <option value="5:00 PM">05:00 PM</option>
                    <option value="6:00 PM">06:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                  Function or Outfit Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Special requests, outfit colour, etc."
                  className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs text-[#2D2424] focus:outline-none focus:border-[#C4727F]"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 text-xs text-[#6E5E5C] hover:text-[#2D2424] font-sans font-medium transition-colors cursor-pointer"
                >
                  Clear Details
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-6 py-3 rounded-lg text-xs font-sans font-bold uppercase tracking-wider shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Appointment Request</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
