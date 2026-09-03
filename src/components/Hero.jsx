import React from 'react';
import { Sparkles, Calendar, ArrowRight, Award, ShieldCheck, Star, Film } from 'lucide-react';
import heroImg from '../assets/hero_indian_couture.jpg';
import VideoPlayer from './VideoPlayer';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Hero({ onOpenBooking, onOpenArchitect, salonInfo }) {
  const revealRef = useScrollReveal();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#D4AF37]/25 bg-[#0A0807] text-[#FBF3EC]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#EE9A70]/15 via-[#D4AF37]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#241118]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1412] border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-futuristic font-semibold uppercase tracking-[0.25em] shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EE9A70] animate-ping"></span>
              Vogue Beauty Honors 2026 Nominee • {salonInfo?.locationShort || "Manauri, Prayagraj"}
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#FBF3EC] leading-[1.05]">
              Hair &amp; Makeup, tailored <br className="hidden sm:inline" />
              <em className="italic gold-shimmer font-serif not-italic">like couture.</em>
            </h1>

            {/* Lede Narrative */}
            <p className="font-sans text-base sm:text-lg text-[#D1C2BA] max-w-2xl leading-relaxed">
              Peach Salon treats every commission as an heirloom artwork — calibrated for defined Indian bone structure, warm undertones, and the milestone stage you need to carry. Featuring 100MP daylight diagnostics and 4K airbrush chemistry.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0807] px-7 py-4 rounded-sm text-xs font-futuristic font-bold uppercase tracking-[0.15em] shadow-xl shadow-[#D4AF37]/15 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0A0807]" />
                Reserve a Chair in Prayagraj
              </button>

              <button
                onClick={() => onOpenArchitect()}
                className="inline-flex items-center justify-center gap-2 bg-[#1A1412] hover:bg-[#241B18] text-[#FBF3EC] px-6 py-4 rounded-sm text-xs font-futuristic font-medium uppercase tracking-[0.15em] border border-[#D4AF37]/40 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#EE9A70]" />
                AI Look Architect
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Quick Trust Pillars */}
            <div className="pt-6 border-t border-[#D4AF37]/20 grid grid-cols-3 gap-4 sm:gap-6 text-xs text-[#D1C2BA]">
              <div className="space-y-1">
                <span className="block font-futuristic text-lg sm:text-xl font-bold text-[#F3E5AB]">100MP</span>
                <span className="text-[11px] sm:text-xs text-[#D1C2BA]/80">Daylight bulb diagnostics</span>
              </div>
              <div className="space-y-1">
                <span className="block font-futuristic text-lg sm:text-xl font-bold text-[#F3E5AB]">3-Fitting</span>
                <span className="text-[11px] sm:text-xs text-[#D1C2BA]/80">Heirloom bridal protocol</span>
              </div>
              <div className="space-y-1">
                <span className="block font-futuristic text-lg sm:text-xl font-bold text-[#F3E5AB]">16-Hour</span>
                <span className="text-[11px] sm:text-xs text-[#D1C2BA]/80">Paparazzi-proof hold</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column (10-Second Looping Video Reel + Indian Model Poster) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Luxury Frame Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#1A1412] to-[#0A0807] p-2 sm:p-3">
                
                <VideoPlayer 
                  videoUrl="https://assets.mixkit.co/videos/preview/mixkit-glamorous-woman-in-a-golden-dress-41588-large.mp4"
                  posterUrl={heroImg}
                  title="Indian Model Sculpted Face Cut & Liquid-Silk Sheen"
                  badge="10s Cinematic Model Reel"
                />

                {/* Animated Golden Thread Path Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
                  <svg viewBox="0 0 420 420" fill="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="heroThreadGradient" x1="0" y1="0" x2="420" y2="420" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#EE9A70" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                    </defs>
                    <path 
                      className="thread-path" 
                      d="M30 60 C 140 10, 180 140, 90 190 C 10 235, 60 330, 170 300 C 260 275, 250 175, 340 165 C 390 159, 400 220, 380 260 C 355 310, 260 340, 260 390" 
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

              </div>

              {/* Decorative Floating Accolade Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#14100E] text-[#FBF3EC] p-3.5 sm:p-4 rounded-lg shadow-2xl border border-[#D4AF37]/50 flex items-center gap-3 animate-float max-w-xs z-20">
                <div className="p-2 bg-[#EE9A70]/20 rounded-full text-[#EE9A70]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-serif italic text-[#F3E5AB]">"Hair styled with architectural rigor."</p>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-semibold font-futuristic">— Harper's Bazaar</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
