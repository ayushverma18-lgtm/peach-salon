import React from 'react';
import { TESTIMONIALS, PRESS_ACCOLADES } from '../data/salonData';
import { Star, Quote, Award } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function TestimonialsSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-[#0A0807] text-[#FBF3EC] relative border-b border-[#D4AF37]/25">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Press Marquee Bar */}
        <div className="mb-20 pb-16 border-b border-[#D4AF37]/20">
          <span className="text-center block text-[11px] font-futuristic uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-8">
            As Featured In Global &amp; National Press
          </span>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRESS_ACCOLADES.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-[#14100E] border border-[#D4AF37]/20 text-center space-y-2 flex flex-col justify-between futuristic-card"
              >
                <span className="font-futuristic text-lg font-bold tracking-wider text-[#F3E5AB] block uppercase">
                  {item.outlet}
                </span>
                <p className="text-xs text-[#D1C2BA] italic leading-relaxed font-sans">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-futuristic uppercase tracking-[0.25em] text-[#EE9A70] font-semibold block mb-2">
            Heirloom Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] font-medium">
            Voices from the Chair
          </h2>
        </div>

        {/* Client Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, idx) => (
            <div 
              key={idx}
              className="bg-[#14100E] p-7 rounded-2xl border border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between space-y-6 hover:border-[#EE9A70] transition-colors futuristic-card"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif text-base sm:text-lg text-[#FBF3EC] italic leading-relaxed">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/20">
                <h4 className="font-serif font-bold text-sm text-[#F3E5AB]">
                  {review.author}
                </h4>
                <span className="text-xs text-[#D1C2BA]/70 font-futuristic">
                  {review.occasion}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
