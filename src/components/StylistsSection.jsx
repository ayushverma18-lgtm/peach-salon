import React from 'react';
import { MASTER_STYLISTS } from '../data/salonData';
import { Award, Calendar, Sparkles, Star } from 'lucide-react';

export default function StylistsSection({ onOpenBooking }) {
  return (
    <section className="py-20 md:py-28 bg-[#0D0B0A] text-[#FBF3EC] relative border-b border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#D4AF37] font-serif italic text-lg">07</span>
            <span className="h-px w-8 bg-[#D4AF37]"></span>
            <span className="text-xs uppercase tracking-widest font-modern font-semibold text-[#EE9A70]">
              Creative Direction
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] font-medium">
            Master Artists &amp; Directors
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D1C2BA]">
            Trained at Vidal Sassoon London and Paris Haute Couture week, our resident directors supervise every formula, airbrush layer, and structural cut.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MASTER_STYLISTS.map(stylist => (
            <div 
              key={stylist.id}
              className="bg-[#161210] rounded-2xl border border-[#D4AF37]/30 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#EE9A70] transition-colors"
            >
              <div>
                <div className="aspect-[4/4] overflow-hidden relative">
                  <img 
                    src={stylist.image} 
                    alt={stylist.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/95 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-[#FBF3EC]">
                    <span className="text-[10px] font-modern uppercase tracking-wider text-[#EE9A70] font-semibold block">
                      {stylist.experience}
                    </span>
                    <h3 className="font-serif text-xl font-medium">
                      {stylist.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F1916] text-xs font-semibold text-[#EE9A70] border border-[#D4AF37]/30">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {stylist.role}
                  </div>

                  <p className="text-xs text-[#D1C2BA] leading-relaxed">
                    <strong className="text-[#F3E5AB]">Signature Specialty:</strong> {stylist.specialty}
                  </p>

                  <div className="p-3 bg-[#1F1916] rounded-lg text-xs border border-white/10 text-[#F8DFCB] font-serif italic">
                    "{stylist.accolades}"
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenBooking(`Consultation with ${stylist.name}`)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0D0B0A] hover:bg-[#F3E5AB] py-3 rounded-sm text-xs font-serif font-bold tracking-wide shadow-lg transition-colors cursor-pointer"
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
