import React, { useState } from 'react';
import { PILLARS, BRIDAL_TIMELINE } from '../data/salonData';
import { Crown, Sparkles, Heart, Users, Calculator, Check, ArrowRight, Shield } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function BridalCoutureSection({ onOpenBooking }) {
  const pillar = PILLARS[2];
  const [bridesmaids, setBridesmaids] = useState(2);
  const [includeFamily, setIncludeFamily] = useState(true);
  const [includePreWeddingTrial, setIncludePreWeddingTrial] = useState(true);

  // Estimator Calculation
  const brideBase = 45000;
  const trialFee = includePreWeddingTrial ? 18000 : 0;
  const bridesmaidFee = bridesmaids * 9500;
  const familyFee = includeFamily ? 16000 : 0;
  const totalEstimate = brideBase + trialFee + bridesmaidFee + familyFee;

  return (
    <section id="bridal" className="py-20 md:py-28 bg-[#0D0B0A] text-[#FBF3EC] relative border-b border-[#D4AF37]/25">
      
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#EE9A70]/10 rounded-full blur-3xl pointer-events-none" />

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

        {/* Feature Hero Grid with 10-Second Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <VideoPlayer 
              videoUrl={pillar.videoUrl}
              posterUrl={pillar.image}
              title="The Vintage Gold-Gilded Vanity Bridal Reveal"
              badge="10s Cinematic Bridal Motion"
            />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F1916] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 text-[#EE9A70]" />
              Heirloom 3-Fitting Protocol
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF3EC] font-medium leading-snug">
              Three fittings. One serene, unhurried wedding morning.
            </h3>

            <p className="text-sm sm:text-base text-[#D1C2BA] leading-relaxed">
              Your trial takes place under identical light temperatures to your wedding venue. We photograph your silhouette from 360 degrees with your exact veil weight and jewelry so you feel absolute calm on the day.
            </p>

            <div className="space-y-4 pt-2">
              {pillar.highlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#1F1916] border border-[#D4AF37]/25 space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-serif text-base font-semibold text-[#F3E5AB]">{item.label}</h5>
                    <span className="text-[10px] text-[#EE9A70] font-modern uppercase tracking-wider font-semibold">Peach Protocol</span>
                  </div>
                  <p className="text-xs text-[#D1C2BA] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenBooking('The Imperial Bridal Trial (Airbrush + Updo)')}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0D0B0A] px-6 py-3.5 rounded-sm text-xs sm:text-sm font-serif font-bold tracking-wide shadow-lg transition-all cursor-pointer"
              >
                <Crown className="w-4 h-4 text-[#0D0B0A]" />
                Book Imperial Bridal Consultation
              </button>
            </div>
          </div>

        </div>

        {/* 3-Step Heirloom Bridal Timeline */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-modern uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              The Journey to the Aisle
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF3EC] mt-1 font-medium">
              The Peach Bridal Roadmap
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {BRIDAL_TIMELINE.map((step, idx) => (
              <div 
                key={idx} 
                className="p-6 sm:p-7 rounded-xl bg-[#161210] border-t-4 border-t-[#EE9A70] border-x border-b border-[#D4AF37]/25 shadow-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif italic text-2xl text-[#EE9A70] font-semibold">{step.step}</span>
                    <span className="text-[10px] font-modern uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-[#1F1916] text-[#F3E5AB] border border-[#D4AF37]/30">
                      {step.timeframe}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-medium text-[#FBF3EC]">
                    {step.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#D1C2BA] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#D1C2BA]">
                  <span className="font-medium text-[#EE9A70]">{step.badge}</span>
                  <span className="text-[11px]">{step.phase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Bridal Party Package Estimator */}
        <div className="bg-[#161210] text-[#FBF3EC] rounded-2xl p-6 sm:p-10 border border-[#D4AF37]/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EE9A70]/20 text-[#EE9A70] text-xs font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                Interactive Party Estimator
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FBF3EC]">
                Custom Bridal Entourage Calculator
              </h3>
              
              <p className="text-xs sm:text-sm text-[#D1C2BA] leading-relaxed">
                Estimate full wedding day styling for yourself, your bridesmaids, and family members with dedicated Senior Artists and private suite access in Lucknow.
              </p>

              <div className="space-y-4 pt-2">
                {/* Bridesmaids Counter */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#1F1916] border border-[#D4AF37]/20">
                  <div className="text-xs">
                    <span className="font-semibold block text-sm text-[#FBF3EC]">Bridesmaids / Attendants (₹9,500 each)</span>
                    <span className="text-[#D1C2BA]/70">Full hair architecture + HD evening makeup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setBridesmaids(Math.max(0, bridesmaids - 1))}
                      className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-lg flex items-center justify-center font-bold cursor-pointer"
                    >-</button>
                    <span className="font-serif text-lg font-bold w-6 text-center text-[#EE9A70]">{bridesmaids}</span>
                    <button 
                      onClick={() => setBridesmaids(bridesmaids + 1)}
                      className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-lg flex items-center justify-center font-bold cursor-pointer"
                    >+</button>
                  </div>
                </div>

                {/* Trial Checkbox */}
                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#1F1916] border border-[#D4AF37]/20 cursor-pointer">
                  <div className="text-xs">
                    <span className="font-semibold block text-sm text-[#FBF3EC]">Include 3-Hour Architectural Trial (₹18,000)</span>
                    <span className="text-[#D1C2BA]/70">Flash testing, veil placement, 2 look tests</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={includePreWeddingTrial} 
                    onChange={(e) => setIncludePreWeddingTrial(e.target.checked)}
                    className="w-5 h-5 accent-[#EE9A70] rounded cursor-pointer"
                  />
                </label>

                {/* Mother of Bride / Family */}
                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#1F1916] border border-[#D4AF37]/20 cursor-pointer">
                  <div className="text-xs">
                    <span className="font-semibold block text-sm text-[#FBF3EC]">Mother of the Bride VIP Styling (₹16,000)</span>
                    <span className="text-[#D1C2BA]/70">Lifting blow-dry + anti-fatigue glowing makeup</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={includeFamily} 
                    onChange={(e) => setIncludeFamily(e.target.checked)}
                    className="w-5 h-5 accent-[#EE9A70] rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Total Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#2D171B] to-[#14100E] p-6 sm:p-7 rounded-xl border border-[#EE9A70]/40 text-center space-y-4 shadow-2xl">
              <span className="text-xs uppercase tracking-widest text-[#EE9A70] font-modern font-semibold">
                Estimated Investment
              </span>
              
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
                ₹{totalEstimate.toLocaleString('en-IN')}
              </div>
              
              <p className="text-[11px] text-[#D1C2BA]/80">
                Includes Private Bridal Suite, Champagne Service, Master Artist &amp; Entourage Stylists.
              </p>

              <button
                onClick={() => onOpenBooking(`Grand Bridal Package (${bridesmaids} bridesmaids, trial: ${includePreWeddingTrial ? 'Yes' : 'No'})`)}
                className="w-full py-3.5 rounded-sm bg-[#EE9A70] hover:bg-[#F6C6A8] text-[#0D0B0A] font-serif font-bold text-sm tracking-wide shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Reserve Bridal Date with This Setup
              </button>

              <p className="text-[10px] text-[#D1C2BA]/60 italic">
                *Final invoice adjusted during in-person bridal consultation.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
