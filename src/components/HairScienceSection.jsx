import React, { useState } from 'react';
import { PILLARS, TEXTURE_DIAGNOSTICS } from '../data/salonData';
import { Sparkles, CheckCircle2, Sliders, Dna, Clock, Sun, Shield, Film } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function HairScienceSection({ onOpenBooking }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [selectedTexture, setSelectedTexture] = useState(TEXTURE_DIAGNOSTICS[0]);
  const [viewTab, setViewTab] = useState('slider'); // 'slider' | 'video'
  const pillar = PILLARS[0];

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <section id="hair" className="py-20 md:py-28 bg-[#0D0B0A] text-[#FBF3EC] relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* Interactive Before & After Transformation Slider + 10s Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF3EC] font-medium">
              Molecular Reconstruction &amp; Liquid Silk Sheen
            </h3>
            <p className="text-sm sm:text-base text-[#D1C2BA] leading-relaxed">
              Every service opens with a consultation under calibrated 5500K daylight bulbs. We diagnose porosity, elasticity, and melanin composition before formulating custom plant-based lipid bonds.
            </p>

            <div className="space-y-4 pt-2">
              {pillar.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#1F1916] border border-[#D4AF37]/20">
                  <div className="p-1 rounded-full bg-[#EE9A70]/20 text-[#EE9A70] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#F3E5AB]">{item.label}</h4>
                    <p className="text-xs text-[#D1C2BA] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking('Molecular Liquid-Silk Restoration & Gloss')}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0D0B0A] px-6 py-3.5 rounded-sm text-xs sm:text-sm font-serif font-bold tracking-wide shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Book Molecular Restoration
              </button>
            </div>
          </div>

          {/* Visual Showcase (Tabs for Interactive Slider vs 10s Macro Video) */}
          <div className="lg:col-span-6">
            <div className="bg-[#161210] p-3 sm:p-4 rounded-2xl shadow-2xl border border-[#D4AF37]/30">
              
              <div className="flex items-center justify-between mb-3 px-1 text-xs">
                <span className="font-modern uppercase tracking-wider font-semibold text-[#EE9A70]">
                  {viewTab === 'slider' ? 'Interactive Cuticle Split' : '10s Macro Slow-Motion'}
                </span>
                
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setViewTab('slider')}
                    className={`px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      viewTab === 'slider' ? 'bg-[#EE9A70] text-[#0D0B0A] font-bold' : 'bg-white/10 text-[#D1C2BA]'
                    }`}
                  >
                    Before/After
                  </button>
                  <button
                    onClick={() => setViewTab('video')}
                    className={`px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      viewTab === 'video' ? 'bg-[#EE9A70] text-[#0D0B0A] font-bold' : 'bg-white/10 text-[#D1C2BA]'
                    }`}
                  >
                    <Film className="w-3 h-3" /> 10s Video
                  </button>
                </div>
              </div>

              {viewTab === 'slider' ? (
                <div 
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none border border-[#D4AF37]/30 shadow-inner"
                  onMouseMove={handleSliderMove}
                  onTouchMove={handleTouchMove}
                >
                  {/* AFTER IMAGE (Background Layer) */}
                  <img 
                    src={pillar.afterImage} 
                    alt="Liquid Silk Hair Texture After Treatment"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute top-3 right-3 bg-[#0D0B0A]/85 text-[#F3E5AB] px-2.5 py-1 rounded text-[11px] font-modern uppercase tracking-wider font-semibold z-10 backdrop-blur-xs border border-[#D4AF37]/30">
                    After · Liquid Silk Glass
                  </div>

                  {/* BEFORE IMAGE (Clipped Layer) */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img 
                      src={pillar.beforeImage} 
                      alt="Natural Hair Texture Before Treatment"
                      className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-3 left-3 bg-[#1F1916]/90 text-[#FBF3EC] px-2.5 py-1 rounded text-[11px] font-modern uppercase tracking-wider font-semibold z-10 shadow-sm border border-[#D4AF37]/30">
                      Before · Depleted Cuticle
                    </div>
                  </div>

                  {/* Divider Line & Handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-[#EE9A70] shadow-[0_0_12px_rgba(238,154,112,0.9)] z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0D0B0A] border-2 border-[#EE9A70] flex items-center justify-center text-[#FBF3EC] shadow-lg">
                      <Sliders className="w-3.5 h-3.5 text-[#EE9A70]" />
                    </div>
                  </div>
                </div>
              ) : (
                <VideoPlayer 
                  videoUrl={pillar.videoUrl}
                  posterUrl={pillar.image}
                  title="Liquid Silk Sheen & Platinum Peach Highlights"
                  badge="10s Macro Motion"
                />
              )}

              {/* Prompt Blueprint Metadata */}
              <div className="mt-4 p-3 bg-[#1F1916] rounded-lg text-xs border border-[#D4AF37]/25 font-modern">
                <span className="font-semibold text-[#EE9A70] block mb-1">📸 AI Blueprint Reference:</span>
                <p className="text-[#D1C2BA] italic">
                  "{pillar.photoPrompt.slice(0, 160)}..."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Texture Diagnostic Explorer Tabs */}
        <div className="mt-16 pt-12 border-t border-[#D4AF37]/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-modern uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              Trichology Diagnostic System
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF3EC] mt-1 font-medium">
              Explore Your Texture Architecture
            </h3>
          </div>

          {/* Texture Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {TEXTURE_DIAGNOSTICS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTexture(item)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedTexture.id === item.id
                    ? 'bg-[#EE9A70] text-[#0D0B0A] font-bold shadow-lg shadow-[#EE9A70]/20'
                    : 'bg-[#1F1916] text-[#FBF3EC] hover:bg-[#2A221E] border border-[#D4AF37]/30'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Active Diagnostic Detail Card with 10s Video */}
          <div className="bg-[#1F1916] rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <VideoPlayer 
                videoUrl={selectedTexture.videoUrl} 
                posterUrl={selectedTexture.image} 
                title={selectedTexture.name}
                badge="10s Texture Video"
              />
            </div>
            
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-modern uppercase tracking-wider font-semibold text-[#EE9A70]">
                  {selectedTexture.type}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#F3E5AB] bg-[#0D0B0A] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  {selectedTexture.duration}
                </span>
              </div>

              <h4 className="font-serif text-2xl text-[#FBF3EC] font-medium">
                {selectedTexture.treatment}
              </h4>

              <p className="text-sm text-[#D1C2BA] leading-relaxed">
                {selectedTexture.desc}
              </p>

              <div className="flex items-center gap-6 pt-2 border-t border-[#D4AF37]/20 text-xs">
                <div>
                  <span className="text-[#D1C2BA]/70 block">Refraction Index</span>
                  <span className="font-serif font-bold text-sm text-[#F3E5AB]">{selectedTexture.shineLevel}</span>
                </div>
                <div>
                  <span className="text-[#D1C2BA]/70 block">Take-Home Cycle</span>
                  <span className="font-serif font-bold text-sm text-[#F3E5AB]">12 Weeks Retention</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(selectedTexture.treatment)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0D0B0A] hover:bg-[#F3E5AB] px-5 py-2.5 rounded-sm text-xs font-serif font-bold tracking-wide shadow transition-colors cursor-pointer"
              >
                Reserve Treatment for {selectedTexture.name}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
