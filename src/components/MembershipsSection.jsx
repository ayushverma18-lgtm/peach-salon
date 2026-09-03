import React from 'react';
import { MEMBERSHIP_TIERS } from '../data/salonData';
import { Crown, Sparkles, Check, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function MembershipsSection({ onOpenBooking }) {
  const revealRef = useScrollReveal();

  return (
    <section id="memberships" className="py-20 md:py-28 bg-[#14100E] text-[#FBF3EC] relative border-b border-[#D4AF37]/25">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#D4AF37] font-futuristic italic text-lg font-bold">08</span>
            <span className="h-px w-8 bg-[#D4AF37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-futuristic font-semibold text-[#EE9A70]">
              VIP Circle
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] font-medium">
            The Peach Circle
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D1C2BA] font-sans">
            Bespoke privileges, guaranteed chair availability, and private suite buyouts for discerning patrons.
          </p>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_TIERS.map(tier => (
            <div 
              key={tier.id}
              className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative futuristic-card ${
                tier.recommended 
                  ? 'bg-gradient-to-b from-[#241713] to-[#14100E] text-[#FBF3EC] shadow-2xl border-2 border-[#D4AF37] scale-105 z-10' 
                  : 'bg-[#1A1412] text-[#FBF3EC] border border-[#D4AF37]/25 shadow-xl'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#EE9A70] text-[#0A0807] text-[10px] font-futuristic uppercase tracking-[0.2em] font-bold px-4 py-1 rounded-full shadow-lg">
                  Most Prestigious
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-xs font-futuristic uppercase tracking-wider font-bold ${tier.recommended ? 'text-[#EE9A70]' : 'text-[#D4AF37]'}`}>
                      {tier.tier}
                    </span>
                    <h3 className="font-serif text-2xl font-medium mt-1">
                      {tier.name}
                    </h3>
                  </div>
                  <Crown className={`w-5 h-5 ${tier.recommended ? 'text-[#EE9A70]' : 'text-[#D4AF37]'}`} />
                </div>

                <div className="py-2">
                  <span className="font-futuristic text-3xl font-bold text-[#F3E5AB]">
                    {tier.fee}
                  </span>
                  <span className="text-xs block mt-1 text-[#D1C2BA]/70 font-futuristic">
                    {tier.badge}
                  </span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-[#D4AF37]/20 text-xs">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className={`p-0.5 rounded-full mt-0.5 ${tier.recommended ? 'bg-[#EE9A70] text-[#0A0807]' : 'bg-[#D4AF37] text-[#0A0807]'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-[#D1C2BA] font-sans">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onOpenBooking(`Membership Inquiry: ${tier.name}`)}
                  className={`w-full py-3.5 rounded-sm text-xs font-futuristic font-bold uppercase tracking-[0.15em] shadow-lg transition-all cursor-pointer ${
                    tier.recommended
                      ? 'bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0807]'
                      : 'bg-[#0A0807] hover:bg-[#241B18] text-[#F3E5AB] border border-[#D4AF37]/40'
                  }`}
                >
                  Inquire for {tier.name}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
