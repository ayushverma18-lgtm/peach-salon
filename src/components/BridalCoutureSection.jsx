import React, { useState } from 'react';
import { PILLARS, BRIDAL_TIMELINE } from '../data/salonData';
import { Sparkles, Calendar, Heart, Shield, Clock, Plus, Minus, Check } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import useScrollReveal from '../hooks/useScrollReveal';

export default function BridalCoutureSection({ onOpenBooking }) {
  const [bridalGuests, setBridalGuests] = useState(4);
  const [includeTrial, setIncludeTrial] = useState(true);
  const [includeMom, setIncludeMom] = useState(true);
  const pillar = PILLARS[2];
  const revealRef = useScrollReveal();

  const baseBridePrice = 45000;
  const perGuestPrice = 9500;
  const trialPrice = 18000;
  const momPrice = 12500;

  const calculateTotal = () => {
    let total = baseBridePrice + (bridalGuests * perGuestPrice);
    if (includeTrial) total += trialPrice;
    if (includeMom) total += momPrice;
    return total;
  };

  return (
    <section id="bridal" className="py-20 md:py-28 bg-[#14100E] text-[#FBF3EC] relative border-b border-[#D4AF37]/20">
      
      {/* Background Decorative Radial Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#D4AF37] font-futuristic italic text-lg font-bold">{pillar.num}</span>
            <span className="h-px w-8 bg-[#D4AF37]/60"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-futuristic font-semibold text-[#EE9A70]">
              {pillar.tag}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] leading-tight font-medium">
            {pillar.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D1C2BA] leading-relaxed font-sans">
            {pillar.description}
          </p>
        </div>

        {/* 2-Column Feature Showcase with 10s Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF3EC] font-medium">
              Heirloom Updo Architecture &amp; Veil Weight Distribution
            </h3>
            <p className="text-sm sm:text-base text-[#D1C2BA] leading-relaxed font-sans">
              Indian heritage dupattas and zardozi lehengas often weigh 4 to 8 kilograms. Our structural anchoring pins balance the dupatta weight across the crown without pulling a single delicate front hairline.
            </p>

            <div className="space-y-4 pt-2">
              {pillar.highlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#1A1412] border border-[#D4AF37]/20 space-y-1 futuristic-card">
                  <span className="text-xs font-futuristic font-bold text-[#EE9A70] block uppercase tracking-wider">{item.label}</span>
                  <p className="text-xs text-[#D1C2BA] leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking('Imperial Royal Bridal Consultation')}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0807] px-6 py-3.5 rounded-sm text-xs font-futuristic font-bold uppercase tracking-[0.15em] shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Reserve Bridal Suite in Manauri
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <VideoPlayer 
              videoUrl={pillar.videoUrl}
              posterUrl={pillar.image}
              title="Royal Indian Bride Reveal in Vintage Gold-Gilded Mirror"
              badge="10s Royal Bridal Video"
            />
          </div>

        </div>

        {/* 3-Fitting Roadmap Timeline */}
        <div className="mt-16 pt-12 border-t border-[#D4AF37]/20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-futuristic uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              The 3-Fitting Protocol
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF3EC] mt-1 font-medium">
              Your Bridal Journey Roadmap
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRIDAL_TIMELINE.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#1A1412] border border-[#D4AF37]/25 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-[#EE9A70] transition-colors relative futuristic-card"
              >
                <div className="flex justify-between items-center">
                  <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0A0807] flex items-center justify-center font-futuristic text-xs font-bold">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-futuristic uppercase tracking-wider text-[#EE9A70] font-semibold bg-[#0A0807] px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    {item.timeframe}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-futuristic uppercase tracking-widest text-[#D4AF37] font-semibold block">
                    {item.phase}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-[#FBF3EC] mt-1">
                    {item.title}
                  </h4>
                </div>

                <p className="text-xs text-[#D1C2BA] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Bridal Package Price Estimator */}
        <div className="mt-16 bg-[#1A1412] rounded-2xl border border-[#D4AF37]/35 p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto futuristic-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#D4AF37]/20 gap-4">
            <div>
              <span className="text-[11px] font-futuristic uppercase tracking-widest text-[#EE9A70] font-bold block">
                Live Pricing Engine
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#FBF3EC] font-medium mt-1">
                Estimate Your Bridal Entourage Suite
              </h4>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs text-[#D1C2BA]/70 block font-futuristic uppercase">Estimated Package</span>
              <span className="font-futuristic text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
                ₹{calculateTotal().toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-[#D4AF37]/20">
            {/* Bridesmaid Counter */}
            <div className="space-y-2">
              <label className="text-xs font-futuristic uppercase tracking-wider text-[#D4AF37] font-bold block">
                Bridesmaids / Sisters
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBridalGuests(Math.max(0, bridalGuests - 1))}
                  className="w-9 h-9 rounded-lg bg-[#0A0807] border border-[#D4AF37]/30 flex items-center justify-center text-[#FBF3EC] hover:bg-white/10 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-futuristic text-lg font-bold text-[#FBF3EC] w-8 text-center">{bridalGuests}</span>
                <button
                  onClick={() => setBridalGuests(bridalGuests + 1)}
                  className="w-9 h-9 rounded-lg bg-[#0A0807] border border-[#D4AF37]/30 flex items-center justify-center text-[#FBF3EC] hover:bg-white/10 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[11px] text-[#D1C2BA]/70 block font-futuristic">₹9,500 per guest</span>
            </div>

            {/* Trial Checkbox */}
            <div className="space-y-2">
              <label className="text-xs font-futuristic uppercase tracking-wider text-[#D4AF37] font-bold block">
                Pre-Wedding Trial
              </label>
              <button
                onClick={() => setIncludeTrial(!includeTrial)}
                className={`w-full p-2.5 rounded-lg border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                  includeTrial 
                    ? 'bg-[#0A0807] border-[#EE9A70] text-[#EE9A70]' 
                    : 'bg-[#0A0807]/50 border-[#D4AF37]/20 text-[#D1C2BA]'
                }`}
              >
                <span>3-Hour Lighting Trial</span>
                <span className="font-futuristic font-bold">{includeTrial ? '✓ Included' : '+₹18,000'}</span>
              </button>
            </div>

            {/* Mother of Bride */}
            <div className="space-y-2">
              <label className="text-xs font-futuristic uppercase tracking-wider text-[#D4AF37] font-bold block">
                Mother of the Bride
              </label>
              <button
                onClick={() => setIncludeMom(!includeMom)}
                className={`w-full p-2.5 rounded-lg border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                  includeMom 
                    ? 'bg-[#0A0807] border-[#EE9A70] text-[#EE9A70]' 
                    : 'bg-[#0A0807]/50 border-[#D4AF37]/20 text-[#D1C2BA]'
                }`}
              >
                <span>Full Haute Styling</span>
                <span className="font-futuristic font-bold">{includeMom ? '✓ Included' : '+₹12,500'}</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#D1C2BA]/80 font-sans">
              *Includes dedicated private dressing suite, champagne service, and lead artist on-set attendance.
            </span>
            <button
              onClick={() => onOpenBooking(`Custom Bridal Package for ${bridalGuests + 1} Guests (Est: ₹${calculateTotal().toLocaleString('en-IN')})`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0807] px-6 py-3 rounded-sm text-xs font-futuristic font-bold uppercase tracking-[0.15em] shadow-lg cursor-pointer"
            >
              Lock In This Package
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
