import React from 'react';
import { PILLARS, GALA_OCCASIONS } from '../data/salonData';
import { Sparkles, Camera, Flame, Wine, ShieldCheck, ArrowRight } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import useScrollReveal from '../hooks/useScrollReveal';

export default function GalaEventsSection({ onOpenBooking }) {
  const pillar = PILLARS[3];
  const revealRef = useScrollReveal();

  return (
    <section id="galas" className="py-20 md:py-28 bg-[#14100E] text-[#FBF3EC] relative overflow-hidden border-b border-[#D4AF37]/30">
      
      {/* Ambient background lighting */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#EE9A70]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#D4AF37] font-futuristic italic text-lg font-bold">{pillar.num}</span>
            <span className="h-px w-8 bg-[#EE9A70]/60"></span>
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

        {/* Editorial Quote & Paparazzi Proof Features with 10s Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-6">
            <blockquote className="font-serif text-2xl sm:text-3xl italic text-[#FBF3EC] leading-snug border-l-2 border-[#EE9A70] pl-6">
              "We don't style for the first hour of an evening. We style for the last one."
            </blockquote>

            <p className="text-sm sm:text-base text-[#D1C2BA] leading-relaxed font-sans">
              For black-tie galas, film festival premieres, and high-society milestone functions in Prayagraj, Lucknow and Delhi, your hair and makeup must withstand paparazzi direct flash, heat from chandeliers, and energetic ballroom dancing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillar.highlights.map((h, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#1A1412] border border-[#D4AF37]/25 space-y-1 futuristic-card">
                  <span className="text-xs font-futuristic font-bold text-[#EE9A70] block uppercase tracking-wider">{h.label}</span>
                  <p className="text-[11px] text-[#D1C2BA] leading-normal font-sans">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <VideoPlayer 
              videoUrl={pillar.videoUrl}
              posterUrl={pillar.image}
              title="Penthouse Ballroom & Paparazzi Red Carpet Glamour"
              badge="10s Gala Runway Motion"
            />
          </div>

        </div>

        {/* Milestone Occasion Cards Grid */}
        <div className="mt-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-futuristic uppercase tracking-[0.25em] text-[#EE9A70] font-semibold block">
              Bespoke Event Styling Suites
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF3EC] mt-1 font-medium">
              Select Your Evening Occasion
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALA_OCCASIONS.map((occ, idx) => (
              <div 
                key={idx} 
                className="bg-[#1A1412] border border-[#D4AF37]/30 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-[#EE9A70] transition-colors shadow-xl group futuristic-card"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-futuristic uppercase tracking-[0.2em] text-[#EE9A70] font-bold block">
                    {occ.duration}
                  </span>
                  
                  <h4 className="font-serif text-lg font-medium text-[#FBF3EC] group-hover:text-[#EE9A70] transition-colors">
                    {occ.title}
                  </h4>
                  
                  <p className="text-xs text-[#D1C2BA] italic font-serif">
                    "{occ.vibe}"
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-[#D4AF37]/20 text-xs text-[#D1C2BA]">
                    {occ.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#EE9A70]" />
                        <span className="text-[11px] font-sans">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
                  <span className="font-futuristic text-base font-bold text-[#F3E5AB]">{occ.price}</span>
                  <button
                    onClick={() => onOpenBooking(occ.title)}
                    className="p-2 rounded bg-[#EE9A70]/20 hover:bg-[#EE9A70] text-[#EE9A70] hover:text-[#0A0807] transition-colors cursor-pointer"
                    title="Reserve this look"
                  >
                    <ArrowRight className="w-4 h-4" />
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
