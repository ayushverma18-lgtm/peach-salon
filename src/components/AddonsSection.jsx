import React from 'react';
import { PlusCircle, Calendar, Coffee, Sparkles, Check, Shirt } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function AddonsSection({ onOpenBooking, addons }) {
  const revealRef = useScrollReveal();

  const addOnList = addons && addons.length > 0 ? addons : [
    {
      id: "addon-dressing",
      name: "Private Dressing, Outfit & Footwear",
      price: 1200,
      description: "Assistance with outfit draping, dupatta setting, jewellery fixing, and footwear adjustment in our dedicated dressing area.",
      active: true
    },
    {
      id: "addon-kahwa",
      name: "Kashmiri Kahwa Service & Cocktail",
      price: 700,
      description: "Traditional warm Kashmiri kahwa beverage service prepared for the bride and client during styling.",
      active: true
    }
  ];

  return (
    <section id="addons" className="py-14 md:py-20 bg-white border-b border-[#EFE3DF]">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-soft text-xs font-sans font-semibold">
            <PlusCircle className="w-3.5 h-3.5 text-[#C4727F]" />
            <span>Studio Add-On Services</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2424] font-bold tracking-tight">
            Comfort &amp; Styling Add-Ons
          </h2>
          
          <p className="text-xs sm:text-sm text-[#5C4E4D] font-sans leading-relaxed">
            Optional services available to enhance your preparation and comfort during your appointment at Peach Salon.
          </p>
        </div>

        {/* Add-On Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {addOnList.filter(a => a.active !== false).map((addon) => (
            <div 
              key={addon.id}
              className="studio-card p-6 rounded-2xl flex flex-col justify-between space-y-4 bg-[#FFFDFD] border border-[#EFE3DF] hover:border-[#C4727F]/50 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#FDF1ED] text-[#C4727F]">
                      {addon.name.toLowerCase().includes('dressing') ? (
                        <Shirt className="w-5 h-5" />
                      ) : (
                        <Coffee className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#2D2424]">
                        {addon.name}
                      </h3>
                      <span className="font-serif text-lg font-bold text-[#C4727F]">
                        ₹{Number(addon.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5C4E4D] font-sans leading-relaxed">
                  {addon.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5ECE8]">
                <button
                  onClick={() => onOpenBooking(`Add-On: ${addon.name}`)}
                  className="w-full btn-secondary py-2 rounded-lg text-xs font-sans font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#C4727F]" />
                  <span>Add to Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
