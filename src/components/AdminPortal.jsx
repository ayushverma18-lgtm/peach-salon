import React, { useState } from 'react';
import { X, Lock, Key, Save, Trash2, CheckCircle2, ShieldAlert, Calendar, Clock, MapPin, Phone, User, Plus, Sparkles, RefreshCw, Eye } from 'lucide-react';

export default function AdminPortal({
  isOpen,
  onClose,
  salonInfo,
  onUpdateSalonInfo,
  bookings,
  onDeleteBooking,
  onClearAllBookings,
  services,
  onUpdateServicePrice,
  products,
  onUpdateProductPrice
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'settings' | 'services' | 'products'
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State for Salon Settings
  const [formData, setFormData] = useState({
    name: salonInfo.name,
    owner: salonInfo.owner,
    ownerRole: salonInfo.ownerRole,
    address: salonInfo.address,
    locationShort: salonInfo.locationShort,
    phone: salonInfo.phone,
    whatsapp: salonInfo.whatsapp,
    email: salonInfo.email,
    hours: salonInfo.hours,
    timingShort: salonInfo.timingShort,
    closedDay: salonInfo.closedDay,
    status: salonInfo.status,
  });

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Default Owner PINs: 'eshivi' or '1234' or '2026'
    if (passcode.toLowerCase() === 'eshivi' || passcode === '1234' || passcode === '2026') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateSalonInfo(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070605]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#161210] text-[#FBF3EC] rounded-2xl max-w-4xl w-full border border-[#D4AF37]/50 shadow-2xl relative p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#D1C2BA] hover:text-[#FBF3EC] rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* LOGIN SCREEN FOR OWNER (ESHIVI) */
          <div className="text-center py-10 space-y-6 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#1F1916] text-[#EE9A70] flex items-center justify-center mx-auto border border-[#D4AF37]/40 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-modern uppercase tracking-widest text-[#D4AF37] font-bold block">
                Owner Access Only
              </span>
              <h3 className="font-serif text-3xl font-medium text-[#FBF3EC] mt-1">
                Eshivi's Atelier Portal
              </h3>
              <p className="text-xs text-[#D1C2BA] mt-2 leading-relaxed">
                This management area is private to the owner. Customers cannot access or edit site settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Owner PIN / Password (e.g. eshivi)"
                  className="w-full p-3 rounded-lg bg-[#0D0B0A] border border-[#D4AF37]/40 text-sm text-[#FBF3EC] text-center tracking-widest focus:outline-none focus:border-[#EE9A70]"
                  required
                />
                {authError && (
                  <span className="text-xs text-red-400 block mt-1.5 font-medium">
                    Incorrect Passcode. Try 'eshivi' or '1234'.
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0D0B0A] font-serif font-bold text-sm tracking-wide shadow-xl transition-all cursor-pointer"
              >
                Unlock Management Dashboard
              </button>
            </form>

            <div className="p-3 bg-[#1F1916] rounded-lg border border-white/10 text-[11px] text-[#D1C2BA]/70">
              💡 Passcode hint for demo: <code className="text-[#EE9A70] font-bold">eshivi</code> or <code className="text-[#EE9A70] font-bold">1234</code>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED MANAGEMENT DASHBOARD */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D4AF37]/30 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-modern uppercase tracking-widest text-[#EE9A70] font-bold">
                    Authenticated as Owner ({salonInfo.owner})
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FBF3EC] mt-0.5">
                  Atelier Control Center
                </h3>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'bookings', label: `Client Bookings (${bookings.length})` },
                  { id: 'settings', label: 'Salon Details & Hours' },
                  { id: 'services', label: 'Pricing & Services' },
                  { id: 'products', label: 'Apothecary' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#EE9A70] text-[#0D0B0A] font-bold shadow-md'
                        : 'bg-[#1F1916] text-[#D1C2BA] hover:bg-white/10 border border-[#D4AF37]/25'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB 1: CLIENT BOOKINGS & APPOINTMENT MANAGER */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-xl font-medium text-[#FBF3EC]">
                      Client Appointment Requests
                    </h4>
                    <p className="text-xs text-[#D1C2BA]">
                      View, confirm, or delete client requests entered on the website.
                    </p>
                  </div>

                  {bookings.length > 0 && (
                    <button
                      onClick={onClearAllBookings}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-xs text-red-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear All Bookings
                    </button>
                  )}
                </div>

                {bookings.length === 0 ? (
                  <div className="text-center py-12 bg-[#1F1916] rounded-xl border border-white/10 space-y-2">
                    <Calendar className="w-10 h-10 text-[#D4AF37] mx-auto opacity-70" />
                    <h5 className="font-serif text-lg text-[#FBF3EC]">No active appointment requests</h5>
                    <p className="text-xs text-[#D1C2BA]/70">
                      When customers submit the "Reserve a Chair" form, their appointment will appear here instantly.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookings.map((b) => (
                      <div 
                        key={b.id}
                        className="bg-[#1F1916] border border-[#D4AF37]/30 rounded-xl p-4.5 space-y-3 relative group hover:border-[#EE9A70] transition-colors shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-modern uppercase tracking-wider text-[#EE9A70] font-bold block">
                              {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'New Request'}
                            </span>
                            <h5 className="font-serif text-lg font-bold text-[#FBF3EC]">
                              {b.clientName || 'Anonymous Guest'}
                            </h5>
                            <span className="text-xs text-[#D4AF37] font-medium block">
                              📞 {b.phone}
                            </span>
                          </div>

                          <button
                            onClick={() => onDeleteBooking(b.id)}
                            className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-300 hover:text-red-100 border border-red-500/30 transition-colors cursor-pointer"
                            title="Delete this appointment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1 text-xs text-[#D1C2BA] bg-[#0D0B0A] p-2.5 rounded-lg border border-white/5">
                          <div className="flex justify-between">
                            <span className="text-[#D1C2BA]/70">Service:</span>
                            <span className="font-semibold text-[#F3E5AB] truncate max-w-[200px]">{b.service}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#D1C2BA]/70">Date &amp; Time:</span>
                            <span className="text-[#FBF3EC]">{b.date} at {b.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#D1C2BA]/70">Stylist:</span>
                            <span className="text-[#FBF3EC]">{b.stylist}</span>
                          </div>
                          {b.notes && (
                            <div className="pt-1 text-[11px] text-[#EE9A70] italic">
                              Note: "{b.notes}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SALON DETAILS & HOURS SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-xl font-medium text-[#FBF3EC]">
                      Edit Flagship Details &amp; Operational Hours
                    </h4>
                    <p className="text-xs text-[#D1C2BA]">
                      Update address, owner details, and working hours. Changes save immediately to the live website.
                    </p>
                  </div>
                  {saveSuccess && (
                    <span className="text-xs bg-green-950/80 border border-green-500 text-green-300 px-3 py-1 rounded-full flex items-center gap-1 font-semibold animate-in zoom-in-95">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Changes Saved Live!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                      Salon Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#0D0B0A] border border-[#D4AF37]/40 text-xs text-[#FBF3EC]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      value={formData.owner}
                      onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#0D0B0A] border border-[#D4AF37]/40 text-xs text-[#FBF3EC]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                      Full Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#0D0B0A] border border-[#D4AF37]/40 text-xs text-[#FBF3EC]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                      Operating Hours (Timing)
                    </label>
                    <input
                      type="text"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      placeholder="e.g. Monday – Saturday, 10:00 – 18:00 (Closed Sundays)"
                      className="w-full p-2.5 rounded-lg bg-[#0D0B0A] border border-[#D4AF37]/40 text-xs text-[#FBF3EC]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                      Weekly Off / Closed Day
                    </label>
                    <input
                      type="text"
                      value={formData.closedDay}
                      onChange={(e) => setFormData({ ...formData, closedDay: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#0D0B0A] border border-[#D4AF37]/40 text-xs text-[#FBF3EC]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#0D0B0A] border border-[#D4AF37]/40 text-xs text-[#FBF3EC]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                      Header Status Ticker
                    </label>
                    <input
                      type="text"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#0D0B0A] border border-[#D4AF37]/40 text-xs text-[#FBF3EC]"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0D0B0A] px-6 py-3 rounded-sm text-xs font-serif font-bold tracking-wide shadow-xl cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Save &amp; Update Live Website
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: SERVICES & PRICING */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif text-xl font-medium text-[#FBF3EC]">
                    Service Menu &amp; Price Customizer
                  </h4>
                  <p className="text-xs text-[#D1C2BA]">
                    Edit pricing and durations for your salon services.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {services.map((s) => (
                    <div key={s.id} className="p-3 bg-[#1F1916] rounded-lg border border-[#D4AF37]/20 flex items-center justify-between gap-4">
                      <div>
                        <h6 className="font-serif text-sm font-bold text-[#FBF3EC]">{s.name}</h6>
                        <span className="text-[11px] text-[#EE9A70]">{s.category} · {s.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#D1C2BA]">₹</span>
                        <input
                          type="number"
                          value={s.price}
                          onChange={(e) => onUpdateServicePrice(s.id, parseInt(e.target.value) || 0)}
                          className="w-24 p-1.5 text-xs bg-[#0D0B0A] border border-[#D4AF37]/40 rounded text-[#F3E5AB] font-bold text-right"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: APOTHECARY PRODUCTS */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif text-xl font-medium text-[#FBF3EC]">
                    Apothecary Product Pricing
                  </h4>
                  <p className="text-xs text-[#D1C2BA]">
                    Update retail prices for luxury bottles and jars.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.map((p) => (
                    <div key={p.id} className="p-3 bg-[#1F1916] rounded-lg border border-[#D4AF37]/20 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h6 className="font-serif text-xs font-bold text-[#FBF3EC] truncate">{p.name}</h6>
                        <span className="text-[10px] text-[#D1C2BA]/70">{p.size}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#D1C2BA]">₹</span>
                        <input
                          type="number"
                          value={p.price}
                          onChange={(e) => onUpdateProductPrice(p.id, parseInt(e.target.value) || 0)}
                          className="w-20 p-1.5 text-xs bg-[#0D0B0A] border border-[#D4AF37]/40 rounded text-[#F3E5AB] font-bold text-right"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
