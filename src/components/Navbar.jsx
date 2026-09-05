import React, { useState } from 'react';
import { Calendar, Menu, X, MapPin, Clock, Lock, Sparkles, Phone } from 'lucide-react';

export default function Navbar({ onOpenBooking, siteSettings, onOpenAdmin, activePage, setActivePage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Bridal Makeup', id: 'bridal', href: '#bridal' },
    { name: 'Makeup', id: 'makeup', href: '#makeup' },
    { name: 'Hair', id: 'hair', href: '#hair' },
    { name: 'Add-Ons', id: 'addons', href: '#addons' },
    { name: 'Gallery', id: 'gallery', href: '#gallery' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];

  const handleNavClick = (id, e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (setActivePage) {
      setActivePage(id);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EFE3DF] text-[#2D2424] transition-all shadow-xs">
      {/* Top Header Bar for Local Studio Info */}
      <div className="bg-[#FDF3EF] border-b border-[#EFE3DF] py-1.5 px-4 text-xs font-sans text-[#6E5E5C]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-[#C4727F] animate-pulse"></span>
            <span className="font-medium text-[#2D2424]">
              {siteSettings?.statusMessage || "Studio Open in Manauri, Prayagraj · 10:00 AM – 7:00 PM (All 7 Days)"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[11px] text-[#6E5E5C]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C4727F]" />
              {siteSettings?.hours || "Sunday–Saturday, 10:00 AM–7:00 PM"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C4727F]" />
              Manauri, Prayagraj
            </span>
            <span>•</span>
            <button 
              onClick={onOpenAdmin}
              className="text-[#C4727F] hover:text-[#B25F6C] font-medium flex items-center gap-1 cursor-pointer transition-colors"
              title="Admin Dashboard"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Panel</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Wordmark */}
          <a href="#home" onClick={(e) => handleNavClick('home', e)} className="flex flex-col group">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2D2424] leading-tight group-hover:text-[#C4727F] transition-colors">
              {siteSettings?.name || "PEACH SALON"}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] font-sans font-semibold text-[#C4727F] -mt-0.5">
              {siteSettings?.subtitle || "Bridal Makeup & Hair Studio"}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-sans font-semibold tracking-wide uppercase text-[#5C4E4D]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] hover:text-[#C4727F] ${
                  activePage === link.id 
                    ? 'text-[#C4727F] font-bold after:w-full after:bg-[#C4727F]' 
                    : 'after:w-0 after:bg-[#C4727F] hover:after:w-full after:transition-all'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            
            {/* Quick Contact Button */}
            {siteSettings?.phone && (
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="hidden xl:inline-flex items-center gap-1.5 text-xs text-[#5C4E4D] hover:text-[#C4727F] px-3 py-2 rounded-lg border border-[#EFE3DF] bg-[#FFF9F7] font-sans font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C4727F]" />
                <span>{siteSettings.phone}</span>
              </a>
            )}

            {/* Book Appointment CTA Button */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 btn-primary px-5 py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Appointment
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#2D2424] hover:bg-[#FDF3EF] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#EFE3DF] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3 text-sm font-sans font-medium tracking-wide uppercase text-[#5C4E4D]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`py-2 border-b border-[#FDF3EF] transition-colors ${
                  activePage === link.id ? 'text-[#C4727F] font-bold' : 'hover:text-[#C4727F]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 btn-primary py-3 rounded-lg text-xs font-sans font-bold uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment at Studio
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenAdmin();
              }}
              className="w-full inline-flex items-center justify-center gap-2 btn-secondary py-2.5 rounded-lg text-xs font-sans font-medium"
            >
              <Lock className="w-3.5 h-3.5 text-[#C4727F]" />
              Admin Dashboard (Eshvi)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
