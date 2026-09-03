import React, { useState } from 'react';
import { Sparkles, Calendar, ShoppingBag, Menu, X, Volume2, VolumeX, Shield, Lock } from 'lucide-react';

export default function Navbar({ onOpenBooking, cartCount, onOpenCart, isMuted, toggleAudio, salonInfo, onOpenAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Hair Science', href: '#hair' },
    { name: 'Makeup Lab', href: '#makeup' },
    { name: 'Royal Bridal', href: '#bridal' },
    { name: 'Galas & Events', href: '#galas' },
    { name: 'Look Architect', href: '#architect' },
    { name: 'Editorial Reels', href: '#lookbook' },
    { name: 'Apothecary', href: '#apothecary' },
    { name: 'VIP Circle', href: '#memberships' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0807]/92 backdrop-blur-md border-b border-[#D4AF37]/30 text-[#FBF3EC] transition-all">
      {/* Top micro ticker for live atelier status */}
      <div className="bg-[#14100E] border-b border-[#D4AF37]/20 py-1.5 px-4 text-xs font-futuristic text-[#D1C2BA]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EE9A70] animate-pulse"></span>
            <span className="text-[#F3E5AB] font-medium tracking-wide">
              {salonInfo?.status || "Atelier Open — Manauri, Prayagraj & VIP Concierge"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] text-[#D1C2BA]/80">
            <span>10:00 AM – 6:00 PM (Closed Sundays)</span>
            <span>•</span>
            <span>Founder: <strong className="text-[#F3E5AB] font-bold">{salonInfo?.owner || "Eshivi"}</strong></span>
            <span>•</span>
            <button 
              onClick={onOpenAdmin}
              className="text-[#EE9A70] hover:text-[#F3E5AB] flex items-center gap-1 cursor-pointer transition-colors"
              title="Owner Management Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#FBF3EC] italic leading-tight">
                Peach Salon
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] font-futuristic text-[#D4AF37] font-semibold -mt-0.5">
                Atelier • Manauri, Prayagraj
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[11px] font-futuristic font-semibold tracking-widest uppercase text-[#D1C2BA]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#EE9A70] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#EE9A70] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Audio Ambience Synthesizer Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full border border-[#D4AF37]/30 text-[#D1C2BA] hover:text-[#EE9A70] hover:border-[#EE9A70] transition-all bg-[#1A1412] cursor-pointer"
              title={isMuted ? "Unmute Ambient Lounge Chimes" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#EE9A70] animate-pulse" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full border border-[#D4AF37]/30 text-[#D1C2BA] hover:text-[#EE9A70] hover:border-[#EE9A70] transition-all bg-[#1A1412] cursor-pointer"
              title="View Apothecary Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EE9A70] text-[#0A0807] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Reserve Appointment CTA Button */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0807] px-5 py-2.5 rounded-sm text-xs font-futuristic font-bold uppercase tracking-wider transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0A0807]" />
              Reserve a Chair
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg text-[#FBF3EC] hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#14100E] border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3 text-xs font-futuristic uppercase tracking-wider text-[#D1C2BA]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="hover:text-[#EE9A70] transition-colors py-1.5 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0A0807] py-3 rounded-sm text-xs font-futuristic font-bold uppercase tracking-wider shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Chair in Prayagraj
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenAdmin();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1412] text-[#EE9A70] border border-[#D4AF37]/30 py-2.5 rounded-sm text-xs font-futuristic uppercase tracking-wider"
            >
              <Lock className="w-3.5 h-3.5" />
              Owner Portal (Eshivi)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
