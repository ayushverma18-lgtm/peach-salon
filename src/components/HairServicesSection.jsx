import React from 'react';
import { Calendar, Check, Sparkles, Scissors, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function HairServicesSection({ onOpenBooking, hairServices }) {
  const revealRef = useScrollReveal();

  const services = hairServices && hairServices.length > 0 ? hairServices : [
    {
      id: "hair-bridal-styling",
      name: "Bridal Hair Styling",
      price: null,
      description: "Hair styling planned according to the bridal outfit, jewellery and overall makeup look."
    },
    {
      id: "hair-bridal-bun",
      name: "Bridal Bun",
      price: null,
      description: "A neat bridal bun suitable for traditional bridal hairstyles and hair accessories."
    },
    {
      id: "hair-open-styling",
      name: "Open Hair Styling",
      price: null,
      description: "Styled open hair with a clean and polished finish suitable for engagement and party looks."
    },
    {
      id: "hair-soft-curls",
      name: "Soft Curls",
      price: null,
      description: "Soft curls for a simple and elegant look."
    },
    {
      id: "hair-waves",
      name: "Waves",
      price: null,
      description: "Loose waves for a relaxed and polished appearance."
    },
    {
      id: "hair-party-hairstyling",
      name: "Party Hairstyling",
      price: null,
      description: "Hairstyling suitable for parties, family functions and celebrations."
    }
  ];

  return (
    <section id="hair" className="py-16 md:py-24 bg-[#FFF9F7] border-b border-[#EFE3DF]">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-soft text-xs font-sans font-semibold">
            <Scissors className="w-3.5 h-3.5 text-[#C4727F]" />
            <span>Dedicated Hair Styling Studio</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D2424] font-bold tracking-tight">
            Hair Services
          </h2>
          
          <p className="text-sm sm:text-base text-[#5C4E4D] font-sans leading-relaxed">
            Neat bridal buns, graceful waves, and custom occasion styling designed to stay secure and complement your outfit and jewellery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(s => s.active !== false).map((service) => (
            <div 
              key={service.id}
              className="studio-card p-6 flex flex-col justify-between space-y-5 rounded-2xl hover:border-[#C4727F]/60 transition-all bg-white"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold text-[#2D2424]">
                    {service.name}
                  </h3>
                </div>

                <div className="inline-block font-sans text-xs font-bold text-[#C4727F] bg-[#FDF1ED] px-2.5 py-1 rounded-md">
                  {service.price ? `₹${Number(service.price).toLocaleString('en-IN')}` : 'Price on request'}
                </div>

                <p className="text-xs sm:text-sm text-[#5C4E4D] font-sans leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5ECE8]">
                <button
                  onClick={() => onOpenBooking(service.name)}
                  className="w-full btn-secondary py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C4727F]" />
                  <span>Book {service.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
