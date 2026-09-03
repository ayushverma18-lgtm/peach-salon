import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HairScienceSection from './components/HairScienceSection';
import MakeupArtistrySection from './components/MakeupArtistrySection';
import BridalCoutureSection from './components/BridalCoutureSection';
import GalaEventsSection from './components/GalaEventsSection';
import AIBeautyArchitect from './components/AIBeautyArchitect';
import HauteLookbook from './components/HauteLookbook';
import PeachApothecary from './components/PeachApothecary';
import StylistsSection from './components/StylistsSection';
import MembershipsSection from './components/MembershipsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CartDrawer from './components/CartDrawer';
import AdminPortal from './components/AdminPortal';
import useAmbientAudio from './components/AudioSynthesizer';
import { INITIAL_SALON_INFO, INITIAL_SERVICES_LIST, INITIAL_PRODUCTS } from './data/salonData';
import { api } from './services/api';

export default function App() {
  // Dynamic Salon Info (Owner: Eshivi, Address: Manauri, Prayagraj)
  const [salonInfo, setSalonInfo] = useState(() => {
    const saved = localStorage.getItem('peach_salon_info');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SALON_INFO;
  });

  // Dynamic Services & Pricing
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('peach_salon_services');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SERVICES_LIST;
  });

  // Dynamic Apothecary Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('peach_salon_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  // Dynamic Bookings Log
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('peach_salon_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  // Initial Sync from Express + Firebase API
  useEffect(() => {
    async function syncBackendData() {
      try {
        const cloudSettings = await api.getSettings();
        if (cloudSettings) {
          setSalonInfo(cloudSettings);
        }
        const cloudBookings = await api.getBookings();
        if (cloudBookings && cloudBookings.length > 0) {
          setBookings(cloudBookings);
        }
      } catch (err) {
        console.warn('Initial backend sync notice:', err.message);
      }
    }
    syncBackendData();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('peach_salon_info', JSON.stringify(salonInfo));
  }, [salonInfo]);

  useEffect(() => {
    localStorage.setItem('peach_salon_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('peach_salon_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('peach_salon_bookings', JSON.stringify(bookings));
  }, [bookings]);

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

  // Ambient audio synthesizer
  useAmbientAudio(isMuted);

  const handleOpenBooking = (serviceName = '') => {
    setSelectedServiceForBooking(serviceName);
    setBookingOpen(true);
  };

  const handleOpenArchitect = () => {
    const el = document.getElementById('architect');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Booking handlers
  const handleAddBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleDeleteBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleClearAllBookings = () => {
    if (window.confirm('Are you sure you want to clear all client bookings?')) {
      setBookings([]);
    }
  };

  // Owner Update Handlers
  const handleUpdateSalonInfo = (newInfo) => {
    setSalonInfo(newInfo);
  };

  const handleUpdateServicePrice = (serviceId, newPrice) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, price: newPrice } : s))
    );
  };

  const handleUpdateProductPrice = (productId, newPrice) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0807] text-[#FBF3EC] flex flex-col font-sans selection:bg-[#EE9A70]/30 selection:text-white">
      
      {/* Sticky Haute Navbar */}
      <Navbar 
        onOpenBooking={handleOpenBooking}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        isMuted={isMuted}
        toggleAudio={() => setIsMuted(!isMuted)}
        salonInfo={salonInfo}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section with 10s Video */}
        <Hero 
          onOpenBooking={handleOpenBooking} 
          onOpenArchitect={handleOpenArchitect} 
          salonInfo={salonInfo}
        />

        {/* 2. Pillar 1: Hair Science & High-End Textures */}
        <HairScienceSection onOpenBooking={handleOpenBooking} />

        {/* 3. Pillar 2: Haute Makeup Artistry & Skin Couture */}
        <MakeupArtistrySection onOpenBooking={handleOpenBooking} />

        {/* 4. Pillar 3: Royal Bridal Couture */}
        <BridalCoutureSection onOpenBooking={handleOpenBooking} />

        {/* 5. Pillar 4: High-Society Galas & Milestone Functions */}
        <GalaEventsSection onOpenBooking={handleOpenBooking} />

        {/* 6. AI Bespoke Beauty Architect */}
        <AIBeautyArchitect onOpenBooking={handleOpenBooking} />

        {/* 7. Haute Lookbook & Cinematic Gallery */}
        <HauteLookbook onOpenBooking={handleOpenBooking} />

        {/* 8. The Peach Apothecary */}
        <PeachApothecary onAddToCart={handleAddToCart} products={products} />

        {/* 9. Master Stylists & Directors */}
        <StylistsSection onOpenBooking={handleOpenBooking} />

        {/* 10. VIP Membership Circle */}
        <MembershipsSection onOpenBooking={handleOpenBooking} />

        {/* 11. Press Accolades & Testimonials */}
        <TestimonialsSection />
      </main>

      {/* 12. Flagship Footer */}
      <Footer 
        onOpenBooking={handleOpenBooking} 
        salonInfo={salonInfo}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Booking Modal (With Clear & Cancel/Delete Actions connected to API) */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedServiceForBooking}
        salonInfo={salonInfo}
        services={services}
        onAddBooking={handleAddBooking}
        onDeleteBooking={handleDeleteBooking}
      />

      {/* Apothecary Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Private Owner Edit Portal (For Eshivi - Express & Firebase Connected) */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        salonInfo={salonInfo}
        onUpdateSalonInfo={handleUpdateSalonInfo}
        bookings={bookings}
        onDeleteBooking={handleDeleteBooking}
        onClearAllBookings={handleClearAllBookings}
        services={services}
        onUpdateServicePrice={handleUpdateServicePrice}
        products={products}
        onUpdateProductPrice={handleUpdateProductPrice}
      />

    </div>
  );
}
