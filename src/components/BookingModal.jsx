import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Phone, Mail, Crown, Wine, Droplets, Download, ArrowRight, Trash2, RotateCcw, AlertCircle, Loader2 } from 'lucide-react';
import { MASTER_STYLISTS } from '../data/salonData';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose, initialService, salonInfo, services, onAddBooking, onDeleteBooking }) {
  const [service, setService] = useState(initialService || (services && services[0]?.name) || "Molecular Liquid-Silk Restoration & Gloss");
  const [stylist, setStylist] = useState(MASTER_STYLISTS[0].name);
  
  // Default tomorrow date, ensuring not a Sunday
  const getNextAvailableDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) { // Sunday -> move to Monday
      d.setDate(d.getDate() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(getNextAvailableDate);
  const [time, setTime] = useState('11:00 AM');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [suiteUpgrade, setSuiteUpgrade] = useState(false);
  const [champagneService, setChampagneService] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState(null);
  const [sundayError, setSundayError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Operating Hours: 10:00 AM – 6:00 PM (Monday – Saturday)
  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:15 PM', '05:00 PM'
  ];

  const handleDateChange = (e) => {
    const selected = e.target.value;
    const dayOfWeek = new Date(selected).getDay();
    if (dayOfWeek === 0) {
      setSundayError(true);
    } else {
      setSundayError(false);
      setDate(selected);
    }
  };

  const handleClearForm = () => {
    setClientName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setSuiteUpgrade(false);
    setChampagneService(false);
    setSundayError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sundayError) {
      alert('Peach Salon is closed on Sundays. Please select Monday through Saturday (10:00 AM – 6:00 PM).');
      return;
    }

    setLoading(true);

    const bookingPayload = {
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
    };

    try {
      // 1. Post to Express + Firebase API Endpoint
      const response = await api.createBooking(bookingPayload);
      const savedBooking = response.booking || {
        id: 'BK-' + Date.now(),
        ...bookingPayload,
        createdAt: new Date().toISOString()
      };

      onAddBooking(savedBooking);
      setCreatedBookingId(savedBooking.id);
      setIsSubmitted(true);

      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#EE9A70', '#F3E5AB', '#FFFFFF']
      });
    } catch (err) {
      console.error('Error submitting booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubmittedBooking = async () => {
    if (createdBookingId) {
      await api.deleteBooking(createdBookingId);
      onDeleteBooking(createdBookingId);
    }
    handleClearForm();
    setIsSubmitted(false);
    onClose();
  };

  const downloadCalendarEvent = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Peach Salon//Atelier Appointment//EN
BEGIN:VEVENT
SUMMARY:Peach Salon Appointment - ${service}
DESCRIPTION:Atelier reservation with ${stylist} (Owner: ${salonInfo.owner}). Location: ${salonInfo.address}. Notes: ${notes || 'None'}
DTSTART:${date.replace(/-/g, '')}T110000
DTEND:${date.replace(/-/g, '')}T130000
LOCATION:${salonInfo.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `PeachSalon_Appointment_${date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070605]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#14100E] text-[#FBF3EC] rounded-2xl max-w-2xl w-full border border-[#D4AF37]/40 shadow-2xl relative p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto futuristic-card">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#D1C2BA] hover:text-[#FBF3EC] rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 pb-4 border-b border-[#D4AF37]/25 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-futuristic uppercase tracking-[0.25em] text-[#EE9A70] font-bold">
                    Bespoke Appointment Concierge
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FBF3EC]">
                  Reserve Your Chair in Prayagraj
                </h3>
                <p className="text-xs text-[#D1C2BA] mt-1 font-sans">
                  Flagship Atelier: {salonInfo.address} · {salonInfo.timingShort} (Closed Sundays)
                </p>
              </div>

              {/* Clear Details button */}
              {(clientName || phone || notes) && (
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="inline-flex items-center gap-1 text-[11px] font-futuristic uppercase tracking-wider text-[#EE9A70] hover:text-white border border-[#EE9A70]/40 px-2.5 py-1 rounded bg-[#1A1412] transition-colors cursor-pointer"
                  title="Clear all entered details"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-futuristic font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                  Select Haute Commission or Treatment
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#0A0807] border border-[#D4AF37]/40 font-serif text-sm text-[#FBF3EC] focus:outline-none focus:border-[#EE9A70]"
                  required
                >
                  {(services || []).map(s => (
                    <option key={s.id} value={s.name} className="bg-[#14100E]">
                      {s.name} ({s.duration} · ₹{s.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                  <option value="Bespoke Royal Bridal Package by Eshivi" className="bg-[#14100E]">
                    Bespoke Royal Bridal Package by Eshivi (By Consultation)
                  </option>
                </select>
              </div>

              {/* Master Stylist Preference */}
              <div>
                <label className="block text-xs font-futuristic font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                  Preferred Creative Director / Stylist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MASTER_STYLISTS.map(s => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setStylist(s.name)}
                      className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                        stylist === s.name
                          ? 'bg-[#241B18] border-[#EE9A70] shadow-md ring-1 ring-[#EE9A70]'
                          : 'bg-[#1A1412] border-[#D4AF37]/20 hover:bg-[#241B18]/60'
                      }`}
                    >
                      <span className="font-serif font-bold text-xs text-[#FBF3EC] block">{s.name}</span>
                      <span className="text-[10px] text-[#D1C2BA] block leading-tight font-futuristic">{s.role.split('&')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-futuristic font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                    Appointment Date (Mon–Sat)
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2.5 rounded-lg bg-[#0A0807] border border-[#D4AF37]/40 text-sm text-[#FBF3EC] focus:outline-none focus:border-[#EE9A70] font-futuristic"
                    required
                  />
                  {sundayError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Peach Salon is closed on Sundays. Please select another day.</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-futuristic font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                    Preferred Time Slot (10 AM – 6 PM)
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-[#0A0807] border border-[#D4AF37]/40 text-sm text-[#FBF3EC] focus:outline-none focus:border-[#EE9A70] font-futuristic"
                  >
                    {timeSlots.map((slot, i) => (
                      <option key={i} value={slot} className="bg-[#14100E]">{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* VIP Upgrades */}
              <div className="p-3.5 rounded-xl bg-[#1A1412] border border-[#D4AF37]/30 space-y-2.5">
                <span className="text-[11px] font-futuristic uppercase tracking-wider font-bold text-[#EE9A70] block">
                  VIP Atelier Upgrades (Optional)
                </span>
                
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="flex items-center gap-2 text-[#FBF3EC]">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Private Gold-Gilded Dressing Suite in Manauri (+₹4,500)
                  </span>
                  <input 
                    type="checkbox" 
                    checked={suiteUpgrade} 
                    onChange={(e) => setSuiteUpgrade(e.target.checked)}
                    className="accent-[#EE9A70] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="flex items-center gap-2 text-[#FBF3EC]">
                    <Wine className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Artisan High-Tea &amp; Kashmiri Kahwa Service (+₹2,500)
                  </span>
                  <input 
                    type="checkbox" 
                    checked={champagneService} 
                    onChange={(e) => setChampagneService(e.target.checked)}
                    className="accent-[#EE9A70] w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>

              {/* Client Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-futuristic font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Radhika Singhania"
                    className="w-full p-2.5 rounded-lg bg-[#0A0807] border border-[#D4AF37]/40 text-sm text-[#FBF3EC] focus:outline-none focus:border-[#EE9A70]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-futuristic font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98390 XXXXX"
                    className="w-full p-2.5 rounded-lg bg-[#0A0807] border border-[#D4AF37]/40 text-sm text-[#FBF3EC] focus:outline-none focus:border-[#EE9A70] font-futuristic"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-futuristic font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  Special Notes / Occasion Details (Optional)
                </label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Bridal consultation with Eshivi, bringing heirloom jewelry..."
                  className="w-full p-2.5 rounded-lg bg-[#0A0807] border border-[#D4AF37]/40 text-xs text-[#FBF3EC] focus:outline-none focus:border-[#EE9A70] font-sans"
                ></textarea>
              </div>

              {/* Submit & Reset Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 rounded-sm bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0807] font-futuristic font-bold text-xs uppercase tracking-[0.15em] shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {loading ? 'Transmitting to Atelier...' : 'Confirm Atelier Appointment Request'}
                </button>

                <button
                  type="button"
                  onClick={handleClearForm}
                  className="px-4 py-4 rounded-sm bg-[#1A1412] hover:bg-[#241B18] text-[#D1C2BA] border border-[#D4AF37]/30 text-xs transition-colors cursor-pointer"
                  title="Reset form"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* CONFIRMATION SCREEN WITH CANCEL / DELETE BUTTON */
          <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#EE9A70]/20 text-[#EE9A70] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-futuristic uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                Appointment Reserved in Firebase &amp; Atelier
              </span>
              <h3 className="font-serif text-3xl font-medium text-[#FBF3EC] mt-1">
                Your Chair is Prepared, {clientName || 'Valued Patron'}
              </h3>
              <p className="text-xs sm:text-sm text-[#D1C2BA] max-w-md mx-auto mt-2 font-sans">
                Our Concierge &amp; Founder Eshivi will contact you at <strong className="text-[#F3E5AB] font-futuristic">{phone}</strong> to confirm your formula in Manauri.
              </p>
            </div>

            {/* Appointment Summary Receipt Card */}
            <div className="bg-[#1A1412] border border-[#D4AF37]/30 rounded-xl p-5 text-left text-xs space-y-2 max-w-md mx-auto futuristic-card">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#D1C2BA]/70">Booking ID:</span>
                <span className="font-futuristic font-bold text-[#EE9A70]">{createdBookingId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#D1C2BA]/70">Service:</span>
                <span className="font-bold text-[#F3E5AB]">{service}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#D1C2BA]/70">Lead Artist:</span>
                <span className="font-bold text-[#FBF3EC]">{stylist}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#D1C2BA]/70">Scheduled For:</span>
                <span className="font-futuristic font-bold text-[#FBF3EC]">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#D1C2BA]/70">Location:</span>
                <span className="text-[#EE9A70] font-medium">{salonInfo.address}</span>
              </div>
            </div>

            {/* Action Buttons: Add to Calendar, Delete/Cancel, Return */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={downloadCalendarEvent}
                className="inline-flex items-center gap-2 bg-[#0A0807] border border-[#D4AF37]/40 text-[#FBF3EC] px-4 py-2.5 rounded text-xs font-futuristic font-medium hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#EE9A70]" />
                Add to Calendar
              </button>

              <button
                onClick={handleDeleteSubmittedBooking}
                className="inline-flex items-center gap-1.5 bg-red-950/70 border border-red-500/40 text-red-200 px-4 py-2.5 rounded text-xs font-futuristic font-medium hover:bg-red-900 transition-colors cursor-pointer"
                title="Cancel or delete this appointment"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Cancel / Delete Booking
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0A0807] font-futuristic font-bold uppercase tracking-wider px-5 py-2.5 rounded text-xs hover:bg-[#F3E5AB] transition-colors cursor-pointer"
              >
                Return to Atelier
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
