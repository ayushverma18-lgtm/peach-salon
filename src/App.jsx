import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import BridalMakeupSection from './components/BridalMakeupSection';
import MakeupServicesSection from './components/MakeupServicesSection';
import HairServicesSection from './components/HairServicesSection';
import AddonsSection from './components/AddonsSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminPortal from './components/AdminPortal';
import { 
  INITIAL_SITE_SETTINGS, 
  INITIAL_HOME_SETTINGS, 
  INITIAL_ABOUT_SETTINGS, 
  INITIAL_BRIDAL_PACKAGES, 
  INITIAL_MAKEUP_SERVICES, 
  INITIAL_HAIR_SERVICES, 
  INITIAL_ADDONS, 
  INITIAL_GALLERY_ITEMS 
} from './data/salonData';
import { api } from './services/api';

export default function App() {
  // Master Content State
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('peach_salon_full_content');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      site_settings: INITIAL_SITE_SETTINGS,
      home_settings: INITIAL_HOME_SETTINGS,
      about_settings: INITIAL_ABOUT_SETTINGS,
      bridal_packages: INITIAL_BRIDAL_PACKAGES,
      makeup_services: INITIAL_MAKEUP_SERVICES,
      hair_services: INITIAL_HAIR_SERVICES,
      addons: INITIAL_ADDONS,
      gallery: INITIAL_GALLERY_ITEMS,
      bookings: []
    };
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');

  // Initial Data Sync from Express & Firebase Database
  useEffect(() => {
    async function loadBackendContent() {
      try {
        const cloudContent = await api.getContent();
        if (cloudContent) {
          setContent(prev => ({
            ...prev,
            ...cloudContent,
            site_settings: { ...prev.site_settings, ...(cloudContent.site_settings || {}) },
            home_settings: { ...prev.home_settings, ...(cloudContent.home_settings || {}) },
            about_settings: { ...prev.about_settings, ...(cloudContent.about_settings || {}) },
            bridal_packages: cloudContent.bridal_packages || prev.bridal_packages,
            makeup_services: cloudContent.makeup_services || prev.makeup_services,
            hair_services: cloudContent.hair_services || prev.hair_services,
            addons: cloudContent.addons || prev.addons,
            gallery: cloudContent.gallery || prev.gallery,
            bookings: cloudContent.bookings || prev.bookings
          }));
        }
      } catch (err) {
        console.warn('Backend hydration notice:', err.message);
      }
    }
    loadBackendContent();

    // Check if URL is /admin or #admin
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setAdminOpen(true);
    }
  }, []);

  // Save to localStorage when content updates
  useEffect(() => {
    localStorage.setItem('peach_salon_full_content', JSON.stringify(content));
  }, [content]);

  // Secret Owner Hotkey: Ctrl + Shift + E or Ctrl + Shift + O
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e' || e.key === 'O' || e.key === 'o')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenBooking = (serviceName = '') => {
    setSelectedServiceForBooking(serviceName);
    setBookingOpen(true);
  };

  const handleAddBooking = (newBooking) => {
    setContent(prev => ({
      ...prev,
      bookings: [newBooking, ...(prev.bookings || [])]
    }));
  };

  const handleUpdateFullContent = (newContent) => {
    setContent(newContent);
  };

  const siteSettings = content.site_settings || INITIAL_SITE_SETTINGS;
  const homeSettings = content.home_settings || INITIAL_HOME_SETTINGS;
  const aboutSettings = content.about_settings || INITIAL_ABOUT_SETTINGS;
  const bridalPackages = content.bridal_packages || INITIAL_BRIDAL_PACKAGES;
  const makeupServices = content.makeup_services || INITIAL_MAKEUP_SERVICES;
  const hairServices = content.hair_services || INITIAL_HAIR_SERVICES;
  const addons = content.addons || INITIAL_ADDONS;
  const galleryItems = content.gallery || INITIAL_GALLERY_ITEMS;

  return (
    <div className="min-h-screen bg-[#FFF9F7] text-[#2D2424] flex flex-col font-sans selection:bg-[#E8A598]/30 selection:text-[#2D2424]">
      
      {/* 1. Header Navigation Bar */}
      <Navbar 
        onOpenBooking={handleOpenBooking}
        siteSettings={siteSettings}
        onOpenAdmin={() => setAdminOpen(true)}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="flex-1">
        
        {/* 2. Home Hero Section (Real 10-Second Video, Intro, CTAs) */}
        <Hero 
          onOpenBooking={handleOpenBooking}
          siteSettings={siteSettings}
          homeSettings={homeSettings}
        />

        {/* 3. About Eshvi & Studio Section */}
        <AboutSection 
          onOpenBooking={handleOpenBooking}
          aboutSettings={aboutSettings}
          siteSettings={siteSettings}
        />

        {/* 4. Dedicated Bridal Makeup Packages (Classic ₹12k, HD ₹15k, Airbrush ₹20k) */}
        <BridalMakeupSection 
          onOpenBooking={handleOpenBooking}
          bridalPackages={bridalPackages}
        />

        {/* 5. Dedicated Makeup Services (Natural, Soft Glam, Velvet, Cocktail Glam, Party) */}
        <MakeupServicesSection 
          onOpenBooking={handleOpenBooking}
          makeupServices={makeupServices}
        />

        {/* 6. Dedicated Hair Services (Bridal Hair, Bun, Open, Soft Curls, Waves, Party) */}
        <HairServicesSection 
          onOpenBooking={handleOpenBooking}
          hairServices={hairServices}
        />

        {/* 7. Add-On Services (Private Dressing ₹1,200, Kashmiri Kahwa ₹700) */}
        <AddonsSection 
          onOpenBooking={handleOpenBooking}
          addons={addons}
        />

        {/* 8. Real Client Gallery (Real Bridal & Styling Transformations) */}
        <GallerySection 
          onOpenBooking={handleOpenBooking}
          galleryItems={galleryItems}
        />

        {/* 9. Contact & Booking Form (Exact Manauri Address & 10 AM - 7 PM Timings) */}
        <ContactSection 
          siteSettings={siteSettings}
          onAddBooking={handleAddBooking}
          bridalPackages={bridalPackages}
          servicesList={makeupServices}
        />

      </main>

      {/* 10. Studio Footer */}
      <Footer 
        onOpenBooking={handleOpenBooking}
        siteSettings={siteSettings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* 11. Quick Booking Modal Dialog */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedServiceForBooking}
        siteSettings={siteSettings}
        onAddBooking={handleAddBooking}
      />

      {/* 12. Complete Admin Portal (Eshvi's Dashboard for Site & Packages) */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        fullContent={content}
        onUpdateFullContent={handleUpdateFullContent}
      />

    </div>
  );
}
