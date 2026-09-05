import React from 'react';
import { Sparkles, Heart, CheckCircle2, MapPin, User, ShieldCheck } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function AboutSection({ onOpenBooking, aboutSettings, siteSettings }) {
  const revealRef = useScrollReveal();

  const directorName = aboutSettings?.directorName || siteSettings?.director || "Eshvi";
  const aboutImage = aboutSettings?.image || "/images/about.jpg";

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-[#EFE3DF]">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Real Photo of Studio / Work */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#EFE3DF] shadow-md bg-[#FFF5F2] p-2.5">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                <img
                  src={aboutImage}
                  alt={`Director ${directorName} at Peach Salon Manauri`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/bridal.jpg';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2424]/80 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#FCEEE9] font-semibold block">
                    Lead Bridal Artist
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {directorName}
                  </h3>
                  <p className="text-xs text-[#EADBD7] font-sans">
                    Director, Peach Salon &bull; Manauri
                  </p>
                </div>
              </div>

              {/* Location Badge under Image */}
              <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#6E5E5C] font-sans">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C4727F]" />
                  Manauri, Prayagraj
                </span>
                <span className="text-[#C4727F] font-semibold">
                  Personalized Bridal Care
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: About Description & Studio Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-soft text-xs font-sans font-semibold">
              <User className="w-3.5 h-3.5 text-[#C4727F]" />
              <span>About Director &amp; Studio</span>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2424] font-bold tracking-tight">
                {aboutSettings?.heading || "Welcome to Peach Salon & Studio"}
              </h2>
              <p className="text-sm font-sans font-medium text-[#C4727F]">
                {aboutSettings?.subtitle || "Creating natural, comfortable, and memorable bridal looks in Manauri, Prayagraj."}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4 text-sm sm:text-base text-[#5C4E4D] font-sans leading-relaxed">
              <p>
                {aboutSettings?.description || "Welcome to Peach Salon, a dedicated bridal makeup and hair studio situated near the New SBI Branch in Manauri, Prayagraj. Founded and directed by Eshvi, our studio focuses on creating clean, elegant, and personalized bridal and occasion looks. We believe in enhancing each client's natural beauty with thoughtful techniques and quality products."}
              </p>
              <p>
                {aboutSettings?.directorBio || "With a focus on neat hair styling, durable makeup finishes, and patient consultations, Eshvi works closely with every bride to understand her wedding outfit, jewellery, and personal preferences, ensuring she feels confident and radiant throughout her special day."}
              </p>
            </div>

            {/* Studio Pillars / Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF] space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#FDF3EF] flex items-center justify-center text-[#C4727F]">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2D2424]">Personalized</h4>
                <p className="text-xs text-[#6E5E5C] font-sans leading-relaxed">
                  Tailored styling to suit your unique features and outfit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF] space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#FDF3EF] flex items-center justify-center text-[#C4727F]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2D2424]">Hygiene First</h4>
                <p className="text-xs text-[#6E5E5C] font-sans leading-relaxed">
                  Clean brushes, premium products, and safe skin application.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#EFE3DF] space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#FDF3EF] flex items-center justify-center text-[#C4727F]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2D2424]">Punctual Service</h4>
                <p className="text-xs text-[#6E5E5C] font-sans leading-relaxed">
                  Carefully planned schedules so your wedding day runs smoothly.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenBooking(`Consultation with ${directorName}`)}
                className="btn-primary px-6 py-3 rounded-lg text-xs font-sans font-bold uppercase tracking-wider shadow-xs cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Schedule a Consultation with {directorName}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
