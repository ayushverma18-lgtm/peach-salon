import React, { useState } from 'react';
import { PILLARS, MAKEUP_TYPES } from '../data/salonData';
import { Sparkles, Check, Clock, Eye, Crown, ArrowRight, ShieldCheck } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function MakeupArtistrySection({ onOpenBooking }) {
  const pillar = PILLARS[1];
  const [selectedMakeup, setSelectedMakeup] = useState(MAKEUP_TYPES[0]);

  return (
    <section id="makeup" className="py-20 md:py-28 bg-[#14100E] relative border-b border-[#D4AF37]/20 text-[#FBF3EC]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#EE9A70]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#D4AF37] font-serif italic text-lg">{pillar.num}</span>
            <span className="h-px w-8 bg-[#D4AF37]/60"></span>
            <span className="text-xs uppercase tracking-widest font-modern font-semibold text-[#EE9A70]">
              {pillar.tag}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] leading-tight font-medium">
            {pillar.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D1C2BA] leading-relaxed">
            {pillar.description}
          </p>
        </div>

        {/* 10-Second Video Reel & Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: 10s Video Player */}
          <div className="lg:col-span-6">
            <VideoPlayer 
              videoUrl={pillar.videoUrl}
              posterUrl={pillar.image}
              title="Haute Airbrush & 24K Gold Glaze In Studio"
              badge="10s 4K Beauty Motion"
            />
          </div>

          {/* Right Column: Key Artistry Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EE9A70]/20 border border-[#EE9A70]/40 text-[#EE9A70] text-xs font-semibold">
              <Crown className="w-3.5 h-3.5" />
              Runway & Strobe-Light Calibration
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF3EC] font-medium leading-snug">
              Micro-atomized airbrush veils that never settle in lines.
            </h3>

            <p className="text-sm sm:text-base text-[#D1C2BA] leading-relaxed">
              We apply foundation at 12-micron droplet atomization under true 5600K studio key light. The finish creates an unbreakable sweat-proof, anti-glare barrier that moves like second skin through 16 hours of banquets and flash photography.
            </p>

            <div className="space-y-4 pt-2">
              {pillar.highlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#1F1916] border border-[#D4AF37]/25 space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-serif text-base font-semibold text-[#F3E5AB]">{item.label}</h5>
                    <span className="text-[10px] text-[#EE9A70] font-modern uppercase tracking-wider font-semibold">Couture Standard</span>
                  </div>
                  <p className="text-xs text-[#D1C2BA] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking('HD 4K Airbrush Glass Skin Makeup')}
                className="inline-flex items-center gap-2 bg-[#EE9A70] hover:bg-[#F6C6A8] text-[#0D0B0A] px-7 py-3.5 rounded-sm text-xs sm:text-sm font-serif font-bold tracking-wide shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Reserve Haute Makeup Session
              </button>
            </div>
          </div>

        </div>

        {/* Signature Makeup Types Showcase */}
        <div className="mt-12 pt-12 border-t border-[#D4AF37]/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-modern uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              Bespoke Palette Options
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF3EC] mt-1 font-medium">
              Explore 4 Signature Makeup Aesthetics
            </h3>
          </div>

          {/* Makeup Type Selection Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {MAKEUP_TYPES.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedMakeup(item)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedMakeup.id === item.id
                    ? 'bg-[#EE9A70] text-[#0D0B0A] font-bold shadow-lg shadow-[#EE9A70]/20'
                    : 'bg-[#1F1916] text-[#FBF3EC] hover:bg-[#2A221E] border border-[#D4AF37]/30'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Active Makeup Detail Card with 10s Video */}
          <div className="bg-[#1F1916] rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5">
              <VideoPlayer 
                videoUrl={selectedMakeup.videoUrl}
                posterUrl={selectedMakeup.image}
                title={selectedMakeup.name}
                badge="10s Makeup Video"
              />
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-modern uppercase tracking-wider font-semibold text-[#EE9A70]">
                  {selectedMakeup.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#F3E5AB] bg-[#0D0B0A] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  {selectedMakeup.duration}
                </span>
              </div>

              <h4 className="font-serif text-2xl text-[#FBF3EC] font-medium">
                {selectedMakeup.name}
              </h4>

              <p className="text-xs sm:text-sm text-[#D1C2BA] leading-relaxed">
                {selectedMakeup.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-[#D4AF37]/20">
                {selectedMakeup.keyPoints.map((kp, kpi) => (
                  <div key={kpi} className="flex items-center gap-2 text-xs text-[#F8DFCB]">
                    <Check className="w-3.5 h-3.5 text-[#EE9A70]" />
                    <span>{kp}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/20">
                <div>
                  <span className="text-[10px] text-[#D1C2BA] block">Investment</span>
                  <span className="font-serif text-xl font-bold text-[#F3E5AB]">{selectedMakeup.price}</span>
                </div>

                <button
                  onClick={() => onOpenBooking(selectedMakeup.name)}
                  className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0D0B0A] px-5 py-2.5 rounded-sm text-xs font-serif font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Reserve {selectedMakeup.name.split(' ')[0]}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
