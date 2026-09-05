import React, { useState, useEffect } from 'react';
import { 
  Lock, X, Save, Plus, Trash2, Edit3, Image as ImageIcon, Video, CheckCircle2, 
  AlertCircle, LayoutDashboard, Settings, Home, User, Sparkles, Scissors, 
  PlusCircle, Calendar, Shield, Upload, Eye, EyeOff, RefreshCw, Phone, MessageSquare
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminPortal({
  isOpen,
  onClose,
  fullContent,
  onUpdateFullContent
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('ps_admin_auth') === 'true';
  });

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Admin Sidebar Tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Working State for Admin edits (Cloned from fullContent)
  const [content, setContent] = useState(fullContent || {});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);

  // Sync content when fullContent changes from parent
  useEffect(() => {
    if (fullContent) {
      setContent(JSON.parse(JSON.stringify(fullContent)));
    }
  }, [fullContent]);

  if (!isOpen) return null;

  // 1. Admin Authentication Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await api.adminLogin(passcode);
      if (res.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('ps_admin_auth', 'true');
        setPasscode('');
      } else {
        setAuthError(res.error || 'Incorrect passcode. Please try again.');
      }
    } catch (err) {
      setAuthError('Authentication failed. Please verify server connection.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ps_admin_auth');
  };

  // 2. Global Save Handler (Updates full website & database)
  const handleSaveAll = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const res = await api.updateContent(content);
      if (res.success) {
        setSaveSuccess(true);
        if (onUpdateFullContent) {
          onUpdateFullContent(content);
        }
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(res.error || 'Failed to save changes.');
      }
    } catch (err) {
      setSaveError(err.message || 'Error updating content.');
    } finally {
      setSaving(false);
    }
  };

  // 3. Image Upload Helper
  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result;
      if (base64Data) {
        try {
          const res = await api.uploadMedia(base64Data, file.name);
          if (res.success && res.url) {
            callback(res.url);
          } else {
            callback(base64Data);
          }
        } catch (err) {
          callback(base64Data);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // 4. Password Change Handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      alert('New password must be at least 4 characters.');
      return;
    }

    try {
      const res = await api.changePassword(currentPassword, newPassword);
      if (res.success) {
        setPassChangeSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setTimeout(() => setPassChangeSuccess(false), 3000);
      } else {
        alert(res.error || 'Failed to change password.');
      }
    } catch (err) {
      alert('Error updating password.');
    }
  };

  // 5. Booking Action Handlers
  const handleBookingStatus = async (id, status) => {
    await api.updateBookingStatus(id, status);
    setContent(prev => ({
      ...prev,
      bookings: (prev.bookings || []).map(b => b.id === id ? { ...b, status } : b)
    }));
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm('Delete this booking inquiry permanently?')) {
      await api.deleteBooking(id);
      setContent(prev => ({
        ...prev,
        bookings: (prev.bookings || []).filter(b => b.id !== id)
      }));
    }
  };

  // Sub-tabs list
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'settings', label: 'Business & Info', icon: Settings },
    { id: 'home', label: 'Home & Media', icon: Home },
    { id: 'about', label: 'About Eshvi', icon: User },
    { id: 'bridal', label: 'Bridal Packages', icon: Sparkles },
    { id: 'makeup', label: 'Makeup Services', icon: Sparkles },
    { id: 'hair', label: 'Hair Services', icon: Scissors },
    { id: 'addons', label: 'Add-Ons', icon: PlusCircle },
    { id: 'gallery', label: 'Client Gallery', icon: ImageIcon },
    { id: 'bookings', label: `Bookings (${content.bookings?.length || 0})`, icon: Calendar },
    { id: 'security', label: 'Passcode & Security', icon: Shield },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2424]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white text-[#2D2424] rounded-2xl max-w-6xl w-full border border-[#EFE3DF] shadow-2xl relative my-4 max-h-[95vh] flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[#EFE3DF] flex items-center justify-between bg-[#FDF3EF]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C4727F] text-white flex items-center justify-center font-bold">
              PS
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2D2424]">
                Peach Salon Management Dashboard
              </h2>
              <span className="text-[11px] text-[#6E5E5C] font-sans">
                Director: Eshvi &bull; Manauri, Prayagraj Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="btn-primary px-4 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>{saving ? 'Saving...' : 'Save Live Changes'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-[#6E5E5C] hover:text-[#2D2424] rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Notification Banners */}
        {saveSuccess && (
          <div className="bg-green-50 border-b border-green-200 px-6 py-2.5 text-xs text-green-800 font-sans font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>All changes have been saved and synchronized with your live website!</span>
          </div>
        )}
        {saveError && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-2.5 text-xs text-red-800 font-sans font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {!isAuthenticated ? (
          /* ========================================================= */
          /* 1. SECURE ADMIN LOGIN SCREEN (PROTECTED ROUTE)             */
          /* ========================================================= */
          <div className="p-8 sm:p-14 max-w-md mx-auto w-full text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#FDF1ED] text-[#C4727F] flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-sans uppercase tracking-wider font-bold text-[#C4727F] block">
                Authorized Access Only
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2D2424] mt-1">
                Eshvi's Admin Portal
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans mt-1.5">
                Enter your secret studio passcode to edit packages, services, gallery, and client bookings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Secret Passcode"
                  className="w-full p-3 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-sm text-center tracking-[0.2em] font-sans font-bold focus:outline-none focus:border-[#C4727F]"
                  required
                  autoFocus
                />
                {authError && (
                  <span className="text-xs text-red-600 block mt-2 font-sans font-medium">
                    {authError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full btn-primary py-3.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                {authLoading ? 'Verifying...' : 'Unlock Studio Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* ========================================================= */
          /* 2. AUTHENTICATED DASHBOARD WITH SIDEBAR & SECTIONS        */
          /* ========================================================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-[#FFF9F7] border-b md:border-b-0 md:border-r border-[#EFE3DF] p-3 space-y-1 overflow-y-auto shrink-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-sans font-semibold transition-colors cursor-pointer text-left ${
                      active 
                        ? 'bg-[#C4727F] text-white shadow-xs' 
                        : 'text-[#5C4E4D] hover:bg-[#FDF3EF]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-[#EFE3DF]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-sans text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Dashboard</span>
                </button>
              </div>
            </aside>

            {/* Main Tab Content Area */}
            <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-white">
              
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                      Studio Overview
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                      Welcome to your website management cockpit. You can update any text, package, or image.
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF]">
                      <span className="text-[11px] font-sans uppercase font-bold text-[#C4727F] block">
                        Client Bookings
                      </span>
                      <span className="font-serif text-3xl font-bold text-[#2D2424] mt-1 block">
                        {content.bookings?.length || 0}
                      </span>
                      <span className="text-[11px] text-[#8E7C7A]">Inquiries received</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF]">
                      <span className="text-[11px] font-sans uppercase font-bold text-[#C4727F] block">
                        Bridal Packages
                      </span>
                      <span className="font-serif text-3xl font-bold text-[#2D2424] mt-1 block">
                        {content.bridal_packages?.length || 3}
                      </span>
                      <span className="text-[11px] text-[#8E7C7A]">Classic, HD, Airbrush</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF]">
                      <span className="text-[11px] font-sans uppercase font-bold text-[#C4727F] block">
                        Makeup &amp; Hair Services
                      </span>
                      <span className="font-serif text-3xl font-bold text-[#2D2424] mt-1 block">
                        {(content.makeup_services?.length || 6) + (content.hair_services?.length || 6)}
                      </span>
                      <span className="text-[11px] text-[#8E7C7A]">Active service listings</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF]">
                      <span className="text-[11px] font-sans uppercase font-bold text-[#C4727F] block">
                        Gallery Showcase
                      </span>
                      <span className="font-serif text-3xl font-bold text-[#2D2424] mt-1 block">
                        {content.gallery?.length || 6}
                      </span>
                      <span className="text-[11px] text-[#8E7C7A]">Real client photos</span>
                    </div>
                  </div>

                  {/* Quick Shortcuts */}
                  <div className="p-5 rounded-2xl bg-[#FDF3EF] border border-[#E8CAC4] space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#2D2424]">
                      Quick Studio Actions
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => setActiveTab('bridal')}
                        className="btn-secondary px-4 py-2 rounded-lg text-xs font-sans font-semibold cursor-pointer"
                      >
                        Edit Bridal Prices
                      </button>
                      <button
                        onClick={() => setActiveTab('gallery')}
                        className="btn-secondary px-4 py-2 rounded-lg text-xs font-sans font-semibold cursor-pointer"
                      >
                        Upload Real Photos
                      </button>
                      <button
                        onClick={() => setActiveTab('bookings')}
                        className="btn-secondary px-4 py-2 rounded-lg text-xs font-sans font-semibold cursor-pointer"
                      >
                        View Appointment Inquiries
                      </button>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className="btn-secondary px-4 py-2 rounded-lg text-xs font-sans font-semibold cursor-pointer"
                      >
                        Update Phone &amp; Address
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BUSINESS & SITE SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                      Business &amp; Studio Information
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                      Updates address, phone numbers, opening hours, and branding across the entire site.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={content.site_settings?.name || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, name: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={content.site_settings?.subtitle || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, subtitle: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Director Name
                      </label>
                      <input
                        type="text"
                        value={content.site_settings?.director || 'Eshvi'}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, director: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Director Role
                      </label>
                      <input
                        type="text"
                        value={content.site_settings?.directorRole || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, directorRole: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Full Address (Exact Location in Manauri)
                      </label>
                      <input
                        type="text"
                        value={content.site_settings?.address || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, address: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Opening Hours
                      </label>
                      <input
                        type="text"
                        value={content.site_settings?.hours || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, hours: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Phone &amp; WhatsApp
                      </label>
                      <input
                        type="text"
                        value={content.site_settings?.phone || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, phone: e.target.value, whatsapp: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={content.site_settings?.email || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, email: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Header Live Status Message
                      </label>
                      <input
                        type="text"
                        value={content.site_settings?.statusMessage || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          site_settings: { ...prev.site_settings, statusMessage: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: HOME & HERO MEDIA */}
              {activeTab === 'home' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                      Home Page &amp; Showcase Media
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                      Configure your main title, description, real 10-second video URL, and bridal poster.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Hero Main Heading
                      </label>
                      <input
                        type="text"
                        value={content.home_settings?.heroHeading || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          home_settings: { ...prev.home_settings, heroHeading: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Hero Description / Introduction
                      </label>
                      <textarea
                        rows={3}
                        value={content.home_settings?.heroSubtitle || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          home_settings: { ...prev.home_settings, heroSubtitle: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                          Primary CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={content.home_settings?.heroCtaText || ''}
                          onChange={(e) => setContent(prev => ({
                            ...prev,
                            home_settings: { ...prev.home_settings, heroCtaText: e.target.value }
                          }))}
                          className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                          Secondary CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={content.home_settings?.heroSecondaryCta || ''}
                          onChange={(e) => setContent(prev => ({
                            ...prev,
                            home_settings: { ...prev.home_settings, heroSecondaryCta: e.target.value }
                          }))}
                          className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Video and Image Paths */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF] space-y-2">
                        <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase">
                          🎥 Real 10-Second Video Source
                        </label>
                        <input
                          type="text"
                          value={content.home_settings?.videoUrl || ''}
                          onChange={(e) => setContent(prev => ({
                            ...prev,
                            home_settings: { ...prev.home_settings, videoUrl: e.target.value }
                          }))}
                          placeholder="/videos/peach-salon.mp4"
                          className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs"
                        />
                        <span className="text-[11px] text-[#8E7C7A] block">
                          Place your video in <code>/public/videos/peach-salon.mp4</code> or enter URL.
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF] space-y-2">
                        <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase">
                          🖼️ Real Bridal Poster / Hero Photo
                        </label>
                        <input
                          type="text"
                          value={content.home_settings?.heroImage || ''}
                          onChange={(e) => setContent(prev => ({
                            ...prev,
                            home_settings: { ...prev.home_settings, heroImage: e.target.value }
                          }))}
                          placeholder="/images/bridal.jpg"
                          className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs"
                        />
                        <div className="flex items-center gap-2">
                          <label className="btn-secondary px-3 py-1 rounded text-xs font-sans font-medium cursor-pointer inline-flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Upload Poster Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (url) => {
                                setContent(prev => ({
                                  ...prev,
                                  home_settings: { ...prev.home_settings, heroImage: url }
                                }));
                              })}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 4: ABOUT ESHVI */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                      About Section &amp; Director Bio
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                      Edit the narrative, philosophy, and director bio for Eshvi.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        About Heading
                      </label>
                      <input
                        type="text"
                        value={content.about_settings?.heading || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          about_settings: { ...prev.about_settings, heading: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Main About Description
                      </label>
                      <textarea
                        rows={4}
                        value={content.about_settings?.description || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          about_settings: { ...prev.about_settings, description: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Director Eshvi's Personal Bio
                      </label>
                      <textarea
                        rows={3}
                        value={content.about_settings?.directorBio || ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          about_settings: { ...prev.about_settings, directorBio: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        About Studio Photo Path
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={content.about_settings?.image || ''}
                          onChange={(e) => setContent(prev => ({
                            ...prev,
                            about_settings: { ...prev.about_settings, image: e.target.value }
                          }))}
                          className="flex-1 p-2 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs"
                        />
                        <label className="btn-secondary px-3 py-2 rounded-lg text-xs font-sans font-medium cursor-pointer inline-flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => {
                              setContent(prev => ({
                                ...prev,
                                about_settings: { ...prev.about_settings, image: url }
                              }));
                            })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BRIDAL PACKAGES */}
              {activeTab === 'bridal' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                        Bridal Makeup Packages (Classic, HD, Airbrush)
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                        Customize package names, exact prices, descriptions, and photos.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newPkg = {
                          id: 'bridal-' + Date.now(),
                          name: 'Custom Bridal Package',
                          price: 18000,
                          description: 'Custom bridal package description.',
                          image: '/images/bridal.jpg',
                          active: true,
                          order: (content.bridal_packages?.length || 0) + 1
                        };
                        setContent(prev => ({
                          ...prev,
                          bridal_packages: [...(prev.bridal_packages || []), newPkg]
                        }));
                      }}
                      className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-sans font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Package</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(content.bridal_packages || []).map((pkg, index) => (
                      <div key={pkg.id || index} className="p-5 rounded-xl border border-[#EFE3DF] bg-[#FFF9F7] space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-sans font-bold text-[#2D2424] uppercase mb-0.5">
                                Package Name
                              </label>
                              <input
                                type="text"
                                value={pkg.name}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setContent(prev => {
                                    const pkgs = [...(prev.bridal_packages || [])];
                                    pkgs[index].name = val;
                                    return { ...prev, bridal_packages: pkgs };
                                  });
                                }}
                                className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs font-bold"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-sans font-bold text-[#2D2424] uppercase mb-0.5">
                                Price (₹)
                              </label>
                              <input
                                type="number"
                                value={pkg.price || 0}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  setContent(prev => {
                                    const pkgs = [...(prev.bridal_packages || [])];
                                    pkgs[index].price = val;
                                    return { ...prev, bridal_packages: pkgs };
                                  });
                                }}
                                className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs font-bold text-[#C4727F]"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${pkg.name}?`)) {
                                setContent(prev => ({
                                  ...prev,
                                  bridal_packages: prev.bridal_packages.filter((_, i) => i !== index)
                                }));
                              }
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Package"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-sans font-bold text-[#2D2424] uppercase mb-0.5">
                            Package Description
                          </label>
                          <textarea
                            rows={2}
                            value={pkg.description || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent(prev => {
                                const pkgs = [...(prev.bridal_packages || [])];
                                pkgs[index].description = val;
                                return { ...prev, bridal_packages: pkgs };
                              });
                            }}
                            className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs"
                          />
                        </div>

                        {/* Image for Package */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={pkg.image || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent(prev => {
                                const pkgs = [...(prev.bridal_packages || [])];
                                pkgs[index].image = val;
                                return { ...prev, bridal_packages: pkgs };
                              });
                            }}
                            placeholder="/images/bridal.jpg"
                            className="flex-1 p-1.5 rounded bg-white border border-[#EFE3DF] text-xs"
                          />
                          <label className="btn-secondary px-2.5 py-1.5 rounded text-xs font-sans font-medium cursor-pointer inline-flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (url) => {
                                setContent(prev => {
                                  const pkgs = [...(prev.bridal_packages || [])];
                                  pkgs[index].image = url;
                                  return { ...prev, bridal_packages: pkgs };
                                });
                              })}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: MAKEUP SERVICES */}
              {activeTab === 'makeup' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                        Makeup Services (Natural, Velvet, Party, Cocktail)
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                        Edit prices or descriptions. Leave price empty to display "Price on request".
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newSrv = {
                          id: 'mu-' + Date.now(),
                          name: 'New Makeup Service',
                          price: null,
                          description: 'Custom makeup service description.',
                          category: 'Makeup',
                          active: true,
                          order: (content.makeup_services?.length || 0) + 1
                        };
                        setContent(prev => ({
                          ...prev,
                          makeup_services: [...(prev.makeup_services || []), newSrv]
                        }));
                      }}
                      className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-sans font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Makeup Service</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(content.makeup_services || []).map((srv, index) => (
                      <div key={srv.id || index} className="p-4 rounded-xl border border-[#EFE3DF] bg-[#FFF9F7] space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={srv.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent(prev => {
                                  const list = [...(prev.makeup_services || [])];
                                  list[index].name = val;
                                  return { ...prev, makeup_services: list };
                                });
                              }}
                              className="p-2 rounded bg-white border border-[#EFE3DF] text-xs font-bold"
                            />
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-[#6E5E5C]">₹</span>
                              <input
                                type="number"
                                value={srv.price !== null ? srv.price : ''}
                                placeholder="Leave blank for 'Price on request'"
                                onChange={(e) => {
                                  const val = e.target.value === '' ? null : parseInt(e.target.value) || 0;
                                  setContent(prev => {
                                    const list = [...(prev.makeup_services || [])];
                                    list[index].price = val;
                                    return { ...prev, makeup_services: list };
                                  });
                                }}
                                className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs font-bold text-[#C4727F]"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${srv.name}?`)) {
                                setContent(prev => ({
                                  ...prev,
                                  makeup_services: prev.makeup_services.filter((_, i) => i !== index)
                                }));
                              }
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={srv.description || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setContent(prev => {
                              const list = [...(prev.makeup_services || [])];
                              list[index].description = val;
                              return { ...prev, makeup_services: list };
                            });
                          }}
                          className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: HAIR SERVICES */}
              {activeTab === 'hair' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                        Hair Services (Separate Section)
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                        Bridal Bun, Open Hair Styling, Soft Curls, Waves, and Party Hairstyling.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newSrv = {
                          id: 'hair-' + Date.now(),
                          name: 'New Hair Service',
                          price: null,
                          description: 'Custom hair styling service description.',
                          category: 'Hair',
                          active: true,
                          order: (content.hair_services?.length || 0) + 1
                        };
                        setContent(prev => ({
                          ...prev,
                          hair_services: [...(prev.hair_services || []), newSrv]
                        }));
                      }}
                      className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-sans font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Hair Service</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(content.hair_services || []).map((srv, index) => (
                      <div key={srv.id || index} className="p-4 rounded-xl border border-[#EFE3DF] bg-[#FFF9F7] space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={srv.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent(prev => {
                                  const list = [...(prev.hair_services || [])];
                                  list[index].name = val;
                                  return { ...prev, hair_services: list };
                                });
                              }}
                              className="p-2 rounded bg-white border border-[#EFE3DF] text-xs font-bold"
                            />
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-[#6E5E5C]">₹</span>
                              <input
                                type="number"
                                value={srv.price !== null ? srv.price : ''}
                                placeholder="Leave blank for 'Price on request'"
                                onChange={(e) => {
                                  const val = e.target.value === '' ? null : parseInt(e.target.value) || 0;
                                  setContent(prev => {
                                    const list = [...(prev.hair_services || [])];
                                    list[index].price = val;
                                    return { ...prev, hair_services: list };
                                  });
                                }}
                                className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs font-bold text-[#C4727F]"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${srv.name}?`)) {
                                setContent(prev => ({
                                  ...prev,
                                  hair_services: prev.hair_services.filter((_, i) => i !== index)
                                }));
                              }
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={srv.description || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setContent(prev => {
                              const list = [...(prev.hair_services || [])];
                              list[index].description = val;
                              return { ...prev, hair_services: list };
                            });
                          }}
                          className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: ADD-ONS */}
              {activeTab === 'addons' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                        Add-On Services (Private Dressing &amp; Kashmiri Kahwa)
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                        Configure comfort services and pricing for brides and family members.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newAddon = {
                          id: 'addon-' + Date.now(),
                          name: 'New Add-On Service',
                          price: 1000,
                          description: 'Add-on service description.',
                          active: true,
                          order: (content.addons?.length || 0) + 1
                        };
                        setContent(prev => ({
                          ...prev,
                          addons: [...(prev.addons || []), newAddon]
                        }));
                      }}
                      className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-sans font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Add-On</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(content.addons || []).map((addon, index) => (
                      <div key={addon.id || index} className="p-4 rounded-xl border border-[#EFE3DF] bg-[#FFF9F7] space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={addon.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent(prev => {
                                  const list = [...(prev.addons || [])];
                                  list[index].name = val;
                                  return { ...prev, addons: list };
                                });
                              }}
                              className="p-2 rounded bg-white border border-[#EFE3DF] text-xs font-bold"
                            />
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-[#6E5E5C]">₹</span>
                              <input
                                type="number"
                                value={addon.price || 0}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  setContent(prev => {
                                    const list = [...(prev.addons || [])];
                                    list[index].price = val;
                                    return { ...prev, addons: list };
                                  });
                                }}
                                className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs font-bold text-[#C4727F]"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${addon.name}?`)) {
                                setContent(prev => ({
                                  ...prev,
                                  addons: prev.addons.filter((_, i) => i !== index)
                                }));
                              }
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={addon.description || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setContent(prev => {
                              const list = [...(prev.addons || [])];
                              list[index].description = val;
                              return { ...prev, addons: list };
                            });
                          }}
                          className="w-full p-2 rounded bg-white border border-[#EFE3DF] text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 9: GALLERY MANAGEMENT (UPLOAD / REPLACE / DELETE) */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                        Client Gallery Manager
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                        Upload real bridal and salon work photos. No stock/AI fantasy models.
                      </p>
                    </div>

                    <label className="btn-primary px-3.5 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer shadow-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => {
                          const newItem = {
                            id: 'gal-' + Date.now(),
                            title: 'New Bridal Transformation',
                            description: 'Styling completed at Peach Salon.',
                            category: 'Bridal',
                            image: url,
                            order: (content.gallery?.length || 0) + 1
                          };
                          setContent(prev => ({
                            ...prev,
                            gallery: [newItem, ...(prev.gallery || [])]
                          }));
                        })}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(content.gallery || []).map((item, index) => (
                      <div key={item.id || index} className="p-3.5 rounded-xl border border-[#EFE3DF] bg-[#FFF9F7] space-y-3">
                        <div className="aspect-[4/5] rounded-lg overflow-hidden bg-white relative border border-[#EFE3DF]">
                          <img
                            src={item.image || '/images/bridal.jpg'}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = '/images/bridal.jpg'; }}
                          />
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this photo?')) {
                                setContent(prev => ({
                                  ...prev,
                                  gallery: prev.gallery.filter((_, i) => i !== index)
                                }));
                              }
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-md shadow-xs hover:bg-red-700 transition-colors cursor-pointer"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent(prev => {
                                const list = [...(prev.gallery || [])];
                                list[index].title = val;
                                return { ...prev, gallery: list };
                              });
                            }}
                            placeholder="Title / Client look"
                            className="w-full p-1.5 rounded bg-white border border-[#EFE3DF] text-xs font-bold"
                          />

                          <select
                            value={item.category || 'Bridal'}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent(prev => {
                                const list = [...(prev.gallery || [])];
                                list[index].category = val;
                                return { ...prev, gallery: list };
                              });
                            }}
                            className="w-full p-1.5 rounded bg-white border border-[#EFE3DF] text-xs"
                          >
                            <option value="Bridal">Bridal Makeup</option>
                            <option value="Makeup">Occasion Makeup</option>
                            <option value="Hair">Hair Styling</option>
                          </select>

                          <textarea
                            rows={2}
                            value={item.description || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent(prev => {
                                const list = [...(prev.gallery || [])];
                                list[index].description = val;
                                return { ...prev, gallery: list };
                              });
                            }}
                            placeholder="Brief description"
                            className="w-full p-1.5 rounded bg-white border border-[#EFE3DF] text-xs"
                          />

                          <label className="w-full btn-secondary py-1.5 rounded text-[11px] font-sans font-semibold inline-flex items-center justify-center gap-1 cursor-pointer">
                            <Upload className="w-3 h-3" />
                            <span>Replace Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (url) => {
                                setContent(prev => {
                                  const list = [...(prev.gallery || [])];
                                  list[index].image = url;
                                  return { ...prev, gallery: list };
                                });
                              })}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 10: CLIENT BOOKING INQUIRIES */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                      Client Appointment Requests
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                      Appointments submitted via the website's booking form.
                    </p>
                  </div>

                  {(!content.bookings || content.bookings.length === 0) ? (
                    <div className="text-center py-12 bg-[#FFF9F7] rounded-xl border border-[#EFE3DF] space-y-2">
                      <Calendar className="w-10 h-10 text-[#C4727F] mx-auto opacity-70" />
                      <h4 className="font-serif text-base font-bold text-[#2D2424]">No Inquiries Yet</h4>
                      <p className="text-xs text-[#8E7C7A] font-sans">
                        When clients submit the appointment form, their requests will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.bookings.map((b) => (
                        <div key={b.id} className="p-4.5 rounded-xl border border-[#EFE3DF] bg-[#FFF9F7] space-y-3 relative">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-sans uppercase font-bold text-[#C4727F] block">
                                {b.date} at {b.time}
                              </span>
                              <h4 className="font-serif text-lg font-bold text-[#2D2424]">
                                {b.clientName}
                              </h4>
                              <a 
                                href={`tel:${b.phone?.replace(/\D/g, '')}`}
                                className="text-xs font-sans font-bold text-[#C4727F] hover:underline flex items-center gap-1 mt-0.5"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{b.phone}</span>
                              </a>
                            </div>

                            <button
                              onClick={() => handleDeleteBooking(b.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="p-2.5 rounded-lg bg-white border border-[#EFE3DF] text-xs space-y-1 font-sans">
                            <div className="flex justify-between">
                              <span className="text-[#6E5E5C]">Requested Service:</span>
                              <span className="font-semibold text-[#2D2424]">{b.service}</span>
                            </div>
                            {b.message && (
                              <div className="pt-1 text-[#6E5E5C] italic">
                                Note: "{b.message}"
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-1">
                            <span className={`text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full ${
                              b.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              b.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              Status: {b.status || 'Received'}
                            </span>

                            <div className="flex gap-1.5">
                              {b.status !== 'Confirmed' && (
                                <button
                                  onClick={() => handleBookingStatus(b.id, 'Confirmed')}
                                  className="btn-primary px-2.5 py-1 rounded text-[11px] font-sans font-semibold cursor-pointer"
                                >
                                  Confirm
                                </button>
                              )}
                              {b.status !== 'Completed' && (
                                <button
                                  onClick={() => handleBookingStatus(b.id, 'Completed')}
                                  className="btn-secondary px-2.5 py-1 rounded text-[11px] font-sans font-semibold cursor-pointer"
                                >
                                  Complete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 11: PASSCODE & SECURITY */}
              {activeTab === 'security' && (
                <div className="space-y-6 max-w-lg">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                      Admin Passcode &amp; Security
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5E5C] font-sans">
                      Change the secret passcode required to access this admin panel.
                    </p>
                  </div>

                  {passChangeSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 text-xs text-green-800 rounded-lg font-sans font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Passcode updated successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        Current Passcode
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current passcode"
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D2424] uppercase mb-1">
                        New Secret Passcode
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new passcode (min 4 chars)"
                        className="w-full p-2.5 rounded-lg bg-[#FFF9F7] border border-[#EFE3DF] text-xs sm:text-sm"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary px-6 py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Update Passcode
                    </button>
                  </form>
                </div>
              )}

            </main>

          </div>
        )}

      </div>
    </div>
  );
}
