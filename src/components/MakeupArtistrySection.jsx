import React, { useState } from 'react';
import { PILLARS, MAKEUP_TYPES } from '../data/salonData';
import { Sparkles, CheckCircle2, Clock, Eye, Sparkle, ShieldCheck, ArrowRight } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import useScrollReveal from '../hooks/useScrollReveal';

export default function MakeupArtistrySection({ onOpenBooking }) {
  const [selectedStyle, setSelectedStyle] = useState(MAKEUP_TYPES[0]);
  const pillar = PILLARS[1];
  const revealRef = useScrollReveal();

  return (
    <section id="makeup" className="py-20 md:py-28 bg-[#0A0807] text-[#FBF3EC] relative border-b border-[#D4AF37]/20">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
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
              4K Studio Flash-Proof Radiance &amp; 24K Gold Leaf
            </h3>
            <p className="text-sm sm:text-base text-[#D1C2BA] leading-relaxed font-sans">
              Indian skin tones possess rich warm undertones and sculpted bone structure. We avoid heavy pancake foundations, using micro-atomized airbrush veils infused with Kashmiri saffron and low-micron silica to eliminate flashback.
            </p>

            <div className="space-y-4 pt-2">
              {pillar.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#14100E] border border-[#D4AF37]/20 futuristic-card">
                  <div className="p-1 rounded-full bg-[#EE9A70]/20 text-[#EE9A70] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-futuristic text-sm font-bold text-[#F3E5AB]">{item.label}</h4>
                    <p className="text-xs text-[#D1C2BA] mt-0.5 font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking('HD 4K Airbrush Glass Skin Makeup')}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0807] px-6 py-3.5 rounded-sm text-xs font-futuristic font-bold uppercase tracking-[0.15em] shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Reserve Haute Makeup Session
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <VideoPlayer 
              videoUrl={pillar.videoUrl}
              posterUrl={pillar.image}
              title="24K Gold Shimmer & 4K Airbrush Skin Application"
              badge="10s 4K Macro Beauty"
            />
          </div>

        </div>

        {/* 4 Signature Haute Makeup Categories */}
        <div className="mt-16 pt-12 border-t border-[#D4AF37]/20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-futuristic uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              Haute Artistry Menu
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF3EC] mt-1 font-medium">
              Signature Makeup Formulations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MAKEUP_TYPES.map((type) => (
              <div
                key={type.id}
                className="bg-[#14100E] rounded-2xl border border-[#D4AF37]/30 overflow-hidden shadow-xl hover:border-[#EE9A70] transition-all flex flex-col justify-between group futuristic-card"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={type.image} 
                      alt={type.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-transparent to-transparent opacity-80" />
                    
                    <span className="absolute top-3 left-3 bg-[#0A0807]/90 text-[#EE9A70] text-[10px] font-futuristic uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/30 backdrop-blur-xs">
                      {type.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-xs font-futuristic font-bold text-[#F3E5AB]">{type.price}</span>
                      <span className="text-[11px] font-futuristic text-[#D1C2BA]/80 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" /> {type.duration}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#FBF3EC] group-hover:text-[#EE9A70] transition-colors">
                      {type.name}
                    </h4>

                    <p className="text-xs text-[#D1C2BA] leading-relaxed font-sans line-clamp-3">
                      {type.description}
                    </p>

                    <ul className="pt-2 border-t border-[#D4AF37]/15 space-y-1.5 text-[11px] text-[#D1C2BA]">
                      {type.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#EE9A70]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenBooking(type.name)}
                    className="w-full py-2.5 rounded-sm bg-[#1A1412] hover:bg-[#EE9A70] hover:text-[#0A0807] text-[#F3E5AB] border border-[#D4AF37]/30 text-xs font-futuristic font-bold uppercase tracking-[0.1em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Reserve Look</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
