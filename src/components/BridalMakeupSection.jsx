import React from 'react';
import { Sparkles, Calendar, Check, Heart, ShieldCheck, HelpCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function BridalMakeupSection({ onOpenBooking, bridalPackages }) {
  const revealRef = useScrollReveal();

  const packages = bridalPackages && bridalPackages.length > 0 ? bridalPackages : [
    {
      id: "bridal-classic",
      name: "Classic Bridal Makeup",
      price: 12000,
      description: "A traditional bridal makeup look with a clean base, defined eyes, suitable bridal colours, neat brows, soft contouring and a polished finish. The look should be elegant and comfortable for wedding functions.",
      features: [
        "Clean & comfortable bridal base",
        "Traditional defined eye styling & neat brows",
        "Suitable bridal lip colour & soft blush",
        "Dupatta setting & basic jewellery fixing",
        "Polished finish suitable for wedding ceremonies"
      ],
      image: "/images/bridal.jpg",
      active: true
    },
    {
      id: "bridal-hd",
      name: "HD Bridal Makeup",
      price: 15000,
      description: "A refined HD makeup look with a smooth and natural-looking base, detailed eye makeup, soft contouring, balanced blush and a polished finish suitable for bridal photography and wedding ceremonies.",
      features: [
        "Smooth High-Definition natural base",
        "Detailed bridal eye makeup & lashes",
        "Balanced contouring & soft radiant blush",
        "Complete dupatta draping & jewellery fixing",
        "Optimized for bridal photography & video"
      ],
      recommended: true,
      image: "/images/bridal.jpg",
      active: true
    },
    {
      id: "bridal-airbrush",
      name: "Airbrush Makeup",
      price: 20000,
      description: "A lightweight airbrush makeup finish designed for a smooth and even appearance. It includes detailed eye makeup, balanced face makeup and a polished bridal finish suitable for long wedding functions and photography.",
      features: [
        "Lightweight micro-mist airbrush finish",
        "Ultra-even, weightless skin coverage",
        "Detailed eye makeup with custom lashes",
        "High durability for long wedding functions",
        "Complete bridal styling & jewellery setting"
      ],
      image: "/images/bridal.jpg",
      active: true
    }
  ];

  return (
    <section id="bridal" className="py-16 md:py-24 bg-[#FFF9F7] border-b border-[#EFE3DF]">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-soft text-xs font-sans font-semibold">
            <Heart className="w-3.5 h-3.5 text-[#C4727F]" />
            <span>Dedicated Bridal Studio in Manauri</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D2424] font-bold tracking-tight">
            Bridal Makeup Packages
          </h2>
          
          <p className="text-sm sm:text-base text-[#5C4E4D] font-sans leading-relaxed">
            Thoughtfully planned bridal makeup tailored to your wedding outfit, jewellery, and personal comfort. Directed and supervised by Eshvi.
          </p>
        </div>

        {/* Real Bridal Photography Showcase & Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.filter(p => p.active !== false).map((pkg) => (
            <div 
              key={pkg.id}
              className={`studio-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                pkg.recommended 
                  ? 'border-2 border-[#C4727F] bg-white shadow-lg lg:-translate-y-2' 
                  : 'bg-white'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C4727F] text-white text-[11px] font-sans uppercase tracking-wider font-bold px-4 py-1 rounded-full shadow-xs">
                  Most Popular
                </div>
              )}

              <div className="space-y-5">
                
                {/* Package Header */}
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                    {pkg.name}
                  </h3>
                  <div className="mt-2.5 flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl sm:text-3.5xl font-bold text-[#C4727F]">
                      {pkg.price ? `₹${Number(pkg.price).toLocaleString('en-IN')}` : 'Price on request'}
                    </span>
                    <span className="text-xs text-[#8E7C7A] font-sans">/ full bridal session</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5C4E4D] font-sans leading-relaxed pt-1">
                  {pkg.description}
                </p>

                {/* Real Bridal Image Preview if provided */}
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#FDF3EF] border border-[#EFE3DF]">
                  <img
                    src={pkg.image || "/images/bridal.jpg"}
                    alt={`${pkg.name} at Peach Salon Manauri, Prayagraj`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/bridal.jpg';
                    }}
                  />
                </div>

                {/* Features List */}
                <div className="pt-2 border-t border-[#F5ECE8] space-y-2.5 text-xs text-[#5C4E4D] font-sans">
                  {(pkg.features || [
                    "Complete base & contouring",
                    "Detailed eye styling & brows",
                    "Dupatta draping & setting",
                    "Jewellery fixing assistance"
                  ]).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="p-0.5 rounded-full bg-[#FDF1ED] text-[#C4727F] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-[#F5ECE8]">
                <button
                  onClick={() => onOpenBooking(pkg.name)}
                  className={`w-full py-3 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    pkg.recommended 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book {pkg.name}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Realistic Consultation Notice */}
        <div className="mt-12 p-5 rounded-2xl bg-white border border-[#EFE3DF] text-center max-w-2xl mx-auto space-y-1.5 shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-xs font-sans font-semibold text-[#C4727F]">
            <HelpCircle className="w-4 h-4" />
            <span>Bridal Consultation Recommendation</span>
          </div>
          <p className="text-xs text-[#6E5E5C] font-sans leading-relaxed">
            We recommend booking your bridal date at least 2–4 weeks in advance for wedding season in Prayagraj to secure your preferred timing with Eshvi.
          </p>
        </div>

      </div>
    </section>
  );
}
