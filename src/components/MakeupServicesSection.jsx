import React from 'react';
import { Sparkles, Calendar, Check, Heart, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function MakeupServicesSection({ onOpenBooking, makeupServices }) {
  const revealRef = useScrollReveal();

  const services = makeupServices && makeupServices.length > 0 ? makeupServices : [
    {
      id: "mu-natural",
      name: "Natural Makeup",
      price: null,
      description: "A fresh and subtle makeup look focusing on an even skin tone, soft eye definition, and a natural lip colour for daily elegance or intimate family gatherings."
    },
    {
      id: "mu-soft-glam",
      name: "Soft Glam Makeup",
      price: null,
      description: "A radiant makeup style with gentle eye blending, soft glow on the high points of the face, and balanced tones for pre-wedding functions and festivities."
    },
    {
      id: "mu-engagement",
      name: "Engagement Makeup",
      price: null,
      description: "A graceful makeup look tailored to complement engagement attires with elegant eye styling, luminous base, and lasting comfort throughout the function."
    },
    {
      id: "mu-party",
      name: "Party Makeup",
      price: null,
      description: "A neat and vibrant makeup finish designed for wedding guests, family celebrations, sangeet, and festive get-togethers."
    },
    {
      id: "mu-velvet",
      name: "Velvet Makeup",
      price: null,
      description: "A soft, smooth and elegant makeup look with a comfortable-looking base, balanced eye makeup, subtle contouring and a refined finish. Suitable for functions where the customer wants a polished but not overly dramatic look."
    },
    {
      id: "mu-cocktail-glam",
      name: "Cocktail Glam Makeup",
      price: null,
      description: "A slightly more glamorous evening makeup look with defined eyes, polished skin, balanced contouring and a stylish finish suitable for cocktail functions, evening parties and celebrations."
    }
  ];

  return (
    <section id="makeup" className="py-16 md:py-24 bg-white border-b border-[#EFE3DF]">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-soft text-xs font-sans font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C4727F]" />
            <span>Occasion &amp; Event Artistry</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D2424] font-bold tracking-tight">
            Makeup Services
          </h2>
          
          <p className="text-sm sm:text-base text-[#5C4E4D] font-sans leading-relaxed">
            From subtle natural daytime looks to elegant party and evening glam, each makeup service is tailored for your special occasion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(s => s.active !== false).map((service) => (
            <div 
              key={service.id}
              className="studio-card p-6 flex flex-col justify-between space-y-5 rounded-2xl hover:border-[#C4727F]/60 transition-all bg-[#FFFDFD]"
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
