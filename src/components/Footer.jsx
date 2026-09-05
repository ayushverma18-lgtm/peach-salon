import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp, Lock, Heart, Calendar } from 'lucide-react';

export default function Footer({ onOpenBooking, siteSettings, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF0ED] text-[#2D2424] pt-16 pb-10 border-t border-[#EFE3DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E8CAC4]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#2D2424] leading-tight block">
              {siteSettings?.name || "PEACH SALON"}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C4727F] font-sans font-bold block -mt-2">
              {siteSettings?.subtitle || "Bridal Makeup & Hair Studio"}
            </span>
            <p className="text-xs sm:text-sm text-[#5C4E4D] max-w-sm leading-relaxed font-sans">
              Founded and directed by <strong className="text-[#2D2424] font-semibold">{siteSettings?.director || "Eshvi"}</strong>. Dedicated to providing graceful, personalized bridal makeup, HD finishes, and hair styling services in Manauri, Prayagraj.
            </p>
            <div className="pt-1">
              <button
                onClick={() => onOpenBooking()}
                className="btn-primary px-5 py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book an Appointment
              </button>
            </div>
          </div>

          {/* Location & Timings */}
          <div className="lg:col-span-4 space-y-3.5 text-xs text-[#5C4E4D] font-sans">
            <h4 className="font-serif text-base text-[#2D2424] font-bold mb-3">
              Studio Location &amp; Hours
            </h4>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C4727F] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {siteSettings?.address || "Near New SBI Branch, Public Inter College, Manauri, Prayagraj, Uttar Pradesh - 212208"}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#C4727F] shrink-0" />
              <span className="font-medium text-[#2D2424]">
                {siteSettings?.hours || "Sunday–Saturday, 10:00 AM–7:00 PM"}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#C4727F] shrink-0" />
              <span>Contact / WhatsApp: {siteSettings?.phone || "+91 98390 12345"}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C4727F] shrink-0" />
              <span>{siteSettings?.email || "contact@peachsalon.in"}</span>
            </div>
          </div>

          {/* Quick Links & Admin Access */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif text-base text-[#2D2424] font-bold mb-3">
              Quick Navigation
            </h4>
            
            <ul className="space-y-2 text-xs text-[#5C4E4D] font-sans">
              <li><a href="#home" className="hover:text-[#C4727F] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#C4727F] transition-colors">About Eshvi</a></li>
              <li><a href="#bridal" className="hover:text-[#C4727F] transition-colors">Bridal Makeup Packages</a></li>
              <li><a href="#makeup" className="hover:text-[#C4727F] transition-colors">Makeup Services</a></li>
              <li><a href="#hair" className="hover:text-[#C4727F] transition-colors">Hair Services</a></li>
              <li><a href="#addons" className="hover:text-[#C4727F] transition-colors">Add-On Services</a></li>
              <li><a href="#gallery" className="hover:text-[#C4727F] transition-colors">Client Gallery</a></li>
              <li><a href="#contact" className="hover:text-[#C4727F] transition-colors">Contact &amp; Location</a></li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-[#C4727F] hover:text-[#B25F6C] border border-[#E8CAC4] px-3 py-1.5 rounded-lg bg-white transition-colors cursor-pointer font-sans font-medium"
              >
                <Lock className="w-3.5 h-3.5 text-[#C4727F]" />
                Admin Dashboard (Eshvi)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E7C7A] font-sans">
          <p>© {new Date().getFullYear()} PEACH SALON &bull; Manauri, Prayagraj. Directed by Eshvi. All appointments subject to confirmation.</p>

          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white border border-[#E8CAC4] hover:bg-[#FDF3EF] text-[#2D2424] transition-colors cursor-pointer flex items-center gap-1 font-medium"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#C4727F]" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
