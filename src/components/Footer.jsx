import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, ArrowUp, Lock, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenBooking, salonInfo, onOpenAdmin }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050403] text-[#FBF3EC] pt-20 pb-12 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF37]/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-3xl font-medium tracking-tight text-[#FBF3EC] italic block">
              Peach Salon
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-futuristic font-bold block -mt-2">
              Atelier &amp; Haute Coiffure • Manauri, Prayagraj
            </span>
            <p className="text-xs sm:text-sm text-[#D1C2BA]/80 max-w-sm leading-relaxed font-sans">
              Founded &amp; directed by <strong className="text-[#F3E5AB] font-futuristic">{salonInfo?.owner || "Eshivi"}</strong>. Treating every head of hair and makeup commission as an heirloom artwork. Specialized in molecular texture reconstruction, royal bridal couture, and paparazzi-proof gala architecture.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0807] px-5 py-2.5 rounded-sm text-xs font-futuristic font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Reserve a Chair with Eshivi
              </button>
            </div>
          </div>

          {/* Location & Concierge */}
          <div className="lg:col-span-4 space-y-3 text-xs text-[#D1C2BA]">
            <h4 className="font-serif text-base text-[#F3E5AB] font-semibold mb-4">
              Flagship Atelier Location
            </h4>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#EE9A70] shrink-0 mt-0.5" />
              <span className="font-sans">{salonInfo?.address || "GT Road, Manauri, Prayagraj, Uttar Pradesh 212212"}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#EE9A70] shrink-0" />
              <span className="font-futuristic">{salonInfo?.hours || "Monday – Saturday, 10:00 – 18:00 (Closed Sundays)"}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#EE9A70] shrink-0" />
              <span className="font-futuristic">VIP Direct: {salonInfo?.phone || "+91 98390 12345"}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#EE9A70] shrink-0" />
              <span className="font-sans">{salonInfo?.email || "eshivi@peachsalon.in"}</span>
            </div>
          </div>

          {/* VIP Invitation Club (Newsletter) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-base text-[#F3E5AB] font-semibold">
              The Peach Gazette
            </h4>
            <p className="text-xs text-[#D1C2BA]/80 leading-relaxed font-sans">
              Receive private invitations to seasonal bridal previews, trichology clinical releases, and styling trunk shows in Prayagraj.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-[#14100E] border border-[#D4AF37]/30 rounded px-3 py-2 text-xs text-white placeholder:text-[#D1C2BA]/40 flex-1 focus:outline-none focus:border-[#EE9A70]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#EE9A70] hover:bg-[#F6C6A8] text-[#0A0807] p-2.5 rounded text-xs transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-[#EE9A70] block font-futuristic">
                  ✓ Thank you. You have been added to our private register.
                </span>
              )}
            </form>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs font-futuristic text-[#D4AF37]/80 hover:text-[#EE9A70] border border-[#D4AF37]/20 px-3 py-1.5 rounded bg-[#14100E] transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#EE9A70]" />
                Owner Portal (Eshivi's Edit Panel)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D1C2BA]/60">
          <p>© 2026 Peach Salon &amp; Atelier, Manauri, Prayagraj. Founded by Eshivi. All appointments are by prior consultation.</p>

          <div className="flex items-center gap-6 font-futuristic uppercase text-[11px]">
            <a href="#hair" className="hover:text-[#EE9A70] transition-colors">Hair Science</a>
            <a href="#makeup" className="hover:text-[#EE9A70] transition-colors">Makeup Lab</a>
            <a href="#bridal" className="hover:text-[#EE9A70] transition-colors">Royal Bridal</a>
            <a href="#galas" className="hover:text-[#EE9A70] transition-colors">Gala Events</a>
            <button 
              onClick={scrollToTop}
              className="p-2 rounded bg-white/10 hover:bg-white/20 text-[#FBF3EC] transition-colors cursor-pointer flex items-center gap-1"
              title="Return to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
