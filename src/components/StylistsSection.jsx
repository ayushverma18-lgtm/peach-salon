import React from 'react';
import { MASTER_STYLISTS } from '../data/salonData';
import { Award, Calendar, Sparkles, Star } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function StylistsSection({ onOpenBooking }) {
  const revealRef = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-[#0A0807] text-[#FBF3EC] relative border-b border-[#D4AF37]/25">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#D4AF37] font-futuristic italic text-lg font-bold">07</span>
            <span className="h-px w-8 bg-[#D4AF37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-futuristic font-semibold text-[#EE9A70]">
              Creative Direction
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] font-medium">
            Master Artists &amp; Directors
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D1C2BA] font-sans">
            Trained at Vidal Sassoon London and Paris Haute Couture week, our resident directors supervise every formula, airbrush layer, and structural cut.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MASTER_STYLISTS.map(stylist => (
            <div 
              key={stylist.id}
              className="bg-[#14100E] rounded-2xl border border-[#D4AF37]/30 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#EE9A70] transition-colors futuristic-card"
            >
              <div>
                <div className="aspect-[4/4] overflow-hidden relative">
                  <img 
                    src={stylist.image} 
                    alt={stylist.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807]/95 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-[#FBF3EC]">
                    <span className="text-[10px] font-futuristic uppercase tracking-wider text-[#EE9A70] font-semibold block">
                      {stylist.experience}
                    </span>
                    <h3 className="font-serif text-xl font-medium">
                      {stylist.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1412] text-xs font-futuristic font-semibold text-[#EE9A70] border border-[#D4AF37]/30">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {stylist.role}
                  </div>

                  <p className="text-xs text-[#D1C2BA] leading-relaxed font-sans">
                    <strong className="text-[#F3E5AB] font-futuristic">Signature Specialty:</strong> {stylist.specialty}
                  </p>

                  <div className="p-3 bg-[#1A1412] rounded-lg text-xs border border-white/10 text-[#F8DFCB] font-serif italic">
                    "{stylist.accolades}"
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenBooking(`Consultation with ${stylist.name}`)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0A0807] hover:bg-[#F3E5AB] py-3 rounded-sm text-xs font-futuristic font-bold uppercase tracking-[0.15em] shadow-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Reserve Chair with {stylist.name.split(' ')[0]}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
