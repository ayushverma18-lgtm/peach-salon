import React from 'react';
import { Calendar, Check, Sparkles, Scissors, ArrowRight, Star } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import hairHighlightsImg from '../assets/hair_highlights.jpg';
import hairFashionColorImg from '../assets/hair_fashion_color.jpg';
import hairGlobalColorImg from '../assets/hair_global_color.jpg';

export default function HairServicesSection({ onOpenBooking, hairServices }) {
  const revealRef = useScrollReveal();

  const defaultServices = [
    {
      id: "hair-highlights",
      name: "Hair Highlights / Balayage",
      price: null,
      priceFormatted: "Price on request",
      description: "Dimensional hair highlights and modern balayage techniques customized to complement Indian hair tones with smooth, glossy blending.",
      image: hairHighlightsImg,
      featured: true,
      tag: "1st Photo Feature"
    },
    {
      id: "hair-fashion-color",
      name: "Fashion Hair Colour",
      price: null,
      priceFormatted: "Price on request",
      description: "Vibrant fashion shades, rose undertones, and ombre colouring using high-grade hair care products for radiant shine.",
      image: hairFashionColorImg,
      featured: true,
      tag: "2nd Photo Feature"
    },
    {
      id: "hair-global-color",
      name: "Global Hair Colour",
      price: null,
      priceFormatted: "Price on request",
      description: "Full global hair colouring from root to tip in rich mocha, chocolate, and natural tones with rich gloss and even coverage.",
      image: hairGlobalColorImg,
      featured: true,
      tag: "3rd Photo Feature"
    },
    {
      id: "hair-bridal-styling",
      name: "Bridal Hair Styling",
      price: null,
      description: "Hair styling planned according to the bridal outfit, jewellery and overall makeup look."
    },
    {
      id: "hair-bridal-bun",
      name: "Bridal Bun & Updos",
      price: null,
      description: "A neat bridal bun suitable for traditional bridal hairstyles, matha patti, and heavy dupatta setting."
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
      description: "Soft curls for a simple, natural and elegant occasion look."
    },
    {
      id: "hair-waves",
      name: "Waves & Styling",
      price: null,
      description: "Loose waves for a relaxed, bouncy and polished appearance."
    },
    {
      id: "hair-party-hairstyling",
      name: "Party Hairstyling",
      price: null,
      description: "Hairstyling suitable for parties, family functions and celebrations."
    }
  ];

  const rawServices = hairServices && hairServices.length > 0 ? hairServices : defaultServices;

  // Resolve image for each service
  const services = rawServices.map(service => {
    let resolvedImage = null;
    const nameLower = (service.name || '').toLowerCase();
    const idLower = (service.id || '').toLowerCase();

    if (idLower.includes('highlight') || nameLower.includes('highlight') || nameLower.includes('balayage')) {
      resolvedImage = hairHighlightsImg;
    } else if (idLower.includes('fashion') || nameLower.includes('fashion')) {
      resolvedImage = hairFashionColorImg;
    } else if (idLower.includes('global') || nameLower.includes('global')) {
      resolvedImage = hairGlobalColorImg;
    } else if (service.image && typeof service.image === 'string' && service.image.startsWith('data:')) {
      resolvedImage = service.image;
    }

    return {
      ...service,
      resolvedImage
    };
  });

  return (
    <section id="hair" className="py-16 md:py-24 bg-[#FFF9F7] border-b border-[#EFE3DF]">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-soft text-xs font-sans font-semibold">
            <Scissors className="w-3.5 h-3.5 text-[#C4727F]" />
            <span>Dedicated Hair Styling &amp; Colouring Studio</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D2424] font-bold tracking-tight">
            Hair Services &amp; Colour Studio
          </h2>
          
          <p className="text-sm sm:text-base text-[#5C4E4D] font-sans leading-relaxed">
            Dimensional highlights, vibrant fashion colors, rich global shades, and neat bridal hair styling crafted with premium hair care in Manauri, Prayagraj.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(s => s.active !== false).map((service) => {
            const hasImage = Boolean(service.resolvedImage);

            return (
              <div 
                key={service.id || service.name}
                className="studio-card overflow-hidden flex flex-col justify-between rounded-2xl hover:border-[#C4727F]/60 transition-all bg-white group"
              >
                <div>
                  {/* Photo Preview if service has an image */}
                  {hasImage ? (
                    <div className="aspect-[16/10] relative overflow-hidden bg-[#FDF3EF] border-b border-[#F5ECE8]">
                      <img 
                        src={service.resolvedImage} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#2D2424]/80 backdrop-blur-xs text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Real Studio Work
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl font-bold text-[#2D2424] group-hover:text-[#C4727F] transition-colors">
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
                </div>

                <div className="p-6 pt-0 border-t-0">
                  <button
                    onClick={() => onOpenBooking(service.name)}
                    className="w-full btn-secondary py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#C4727F] hover:text-white"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C4727F] group-hover:text-white" />
                    <span>Book {service.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
