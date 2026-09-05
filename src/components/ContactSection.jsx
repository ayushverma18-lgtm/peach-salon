import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, MessageSquare, Send, CheckCircle2, Heart, Calendar, Sparkles } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { api } from '../services/api';

export default function ContactSection({ siteSettings, onAddBooking, servicesList, bridalPackages }) {
  const revealRef = useScrollReveal();

  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    service: 'Classic Bridal Makeup',
    date: '',
    time: '11:00 AM',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const availableServices = [
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
    'General Studio Consultation'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.clientName.trim() || !formData.phone.trim() || !formData.date) {
      setErrorMsg('Please fill in your name, phone number, and preferred date.');
      return;
    }

    // Phone number basic validation
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createBooking(formData);
      if (res.success) {
        setSuccess(true);
        if (onAddBooking) {
          onAddBooking(res.booking || { id: 'BK-' + Date.now(), ...formData, status: 'Received' });
        }
        setFormData({
          clientName: '',
          phone: '',
          service: 'Classic Bridal Makeup',
          date: '',
          time: '11:00 AM',
          message: ''
        });
      } else {
        setErrorMsg(res.error || 'Failed to submit appointment inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-b border-[#EFE3DF]">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-soft text-xs font-sans font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#C4727F]" />
            <span>Visit Us in Manauri</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D2424] font-bold tracking-tight">
            Contact &amp; Appointment Inquiries
          </h2>
          
          <p className="text-sm sm:text-base text-[#5C4E4D] font-sans leading-relaxed">
            Send us your preferred date and requirements. Eshvi will connect with you directly to finalize your consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Exact Location, Timings & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="studio-card p-6 sm:p-7 rounded-2xl space-y-6 bg-[#FFF9F7]">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-wider text-[#C4727F] font-bold block mb-1">
                  Flagship Studio Location
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                  Peach Salon &bull; Manauri
                </h3>
              </div>

              {/* Exact Address */}
              <div className="flex items-start gap-3.5 text-xs sm:text-sm text-[#5C4E4D] font-sans">
                <div className="p-2 rounded-lg bg-[#FDF1ED] text-[#C4727F] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#2D2424] block font-semibold">Full Studio Address:</strong>
                  <p className="mt-0.5 leading-relaxed">
                    {siteSettings?.address || "Near New SBI Branch, Public Inter College, Manauri, Prayagraj, Uttar Pradesh - 212208"}
                  </p>
                  <span className="text-[11px] text-[#8E7C7A] block mt-1">
                    Landmark: Near New SBI Branch, Public Inter College
                  </span>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3.5 text-xs sm:text-sm text-[#5C4E4D] font-sans">
                <div className="p-2 rounded-lg bg-[#FDF1ED] text-[#C4727F] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#2D2424] block font-semibold">Opening Hours:</strong>
                  <p className="mt-0.5 font-medium text-[#C4727F]">
                    {siteSettings?.hours || "Sunday–Saturday, 10:00 AM–7:00 PM"}
                  </p>
                  <span className="text-[11px] text-[#8E7C7A] block mt-0.5">
                    Open all 7 days for bridal bookings &amp; appointments
                  </span>
                </div>
              </div>

              {/* Direct Phone / WhatsApp */}
              <div className="flex items-start gap-3.5 text-xs sm:text-sm text-[#5C4E4D] font-sans">
                <div className="p-2 rounded-lg bg-[#FDF1ED] text-[#C4727F] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#2D2424] block font-semibold">Phone &amp; WhatsApp:</strong>
                  <p className="mt-0.5">
                    {siteSettings?.phone || "+91 98390 12345"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 text-xs sm:text-sm text-[#5C4E4D] font-sans">
                <div className="p-2 rounded-lg bg-[#FDF1ED] text-[#C4727F] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#2D2424] block font-semibold">Email:</strong>
                  <p className="mt-0.5">
                    {siteSettings?.email || "contact@peachsalon.in"}
                  </p>
                </div>
              </div>

              {/* Director Note */}
              <div className="pt-2 border-t border-[#EFE3DF] text-xs text-[#6E5E5C] font-sans">
                Director: <strong className="text-[#2D2424]">{siteSettings?.director || "Eshvi"}</strong> (Lead Bridal Artist)
              </div>
            </div>

          </div>

          {/* Right Column: Appointment Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="studio-card p-6 sm:p-8 rounded-2xl bg-white border border-[#EFE3DF] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#2D2424] mb-1">
                Book Your Appointment
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans mb-6">
                Fill out the details below and we will confirm your slot.
              </p>

              {success ? (
                <div className="p-6 rounded-xl bg-[#FDF3EF] border border-[#E8CAC4] text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-[#C4727F] text-white flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#2D2424]">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C4E4D] font-sans max-w-md mx-auto leading-relaxed">
                    Thank you! Your appointment inquiry has been received at Peach Salon, Manauri. Eshvi will contact you shortly to confirm your booking and details.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-secondary px-5 py-2 rounded-lg text-xs font-sans font-semibold mt-2 cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-sans">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Client Name */}
                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                        Your Full Name *
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

                    {/* Phone Number */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                        Selected Service *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm text-[#2D2424] focus:outline-none focus:border-[#C4727F]"
                      >
                        {availableServices.map((srv, idx) => (
                          <option key={idx} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date */}
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

                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                      Preferred Time Slot (Studio Hours: 10:00 AM – 7:00 PM)
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

                  {/* Message / Outfit & Function Notes */}
                  <div>
                    <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase tracking-wider mb-1">
                      Function Details or Special Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the ceremony, outfit colors, or specific look you are looking for..."
                      className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm text-[#2D2424] focus:outline-none focus:border-[#C4727F]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-primary py-3.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <span>Sending Inquiry...</span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Submit Appointment Inquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-[#8E7C7A] mt-2 font-sans">
                      Appointments are confirmed following direct discussion with our director Eshvi.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
