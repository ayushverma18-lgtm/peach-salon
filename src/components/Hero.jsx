import React, { useState } from 'react';
import { Calendar, Sparkles, MapPin, Clock, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import heroBridalImg from '../assets/bridal_hd_red.jpg';

export default function Hero({ onOpenBooking, siteSettings, homeSettings }) {
  const revealRef = useScrollReveal();
  const [hasVideoError, setHasVideoError] = useState(false);

  const displayImage = homeSettings?.heroImage || heroBridalImg;

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#FFF5F2] via-[#FFF9F7] to-[#FFFFFF] border-b border-[#EFE3DF] overflow-hidden">
      
      {/* Background Decorative Soft Peach Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FCEEE9] rounded-full filter blur-3xl opacity-60 pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F8E8E4] rounded-full filter blur-3xl opacity-50 pointer-events-none -ml-20 -mb-20"></div>

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal-on-scroll">
        
        {/* Main Grid: Introduction & Real Photo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand & Service Information */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-soft text-xs font-sans font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#C4727F]" />
              <span>Manauri, Prayagraj</span>
              <span className="text-[#E8CAC4]">•</span>
              <span className="text-[#5C4E4D]">Directed by {siteSettings?.director || "Eshvi"}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl text-[#2D2424] font-bold leading-[1.18] tracking-tight">
                {homeSettings?.heroHeading || "Enhancing Your Natural Grace with Elegant Bridal Artistry"}
              </h1>
              
              <p className="text-base sm:text-lg text-[#5C4E4D] font-sans leading-relaxed max-w-2xl">
                {homeSettings?.heroSubtitle || "Welcome to Peach Salon, your trusted local bridal makeup and hair studio in Manauri, Prayagraj. We specialize in classic, HD, and airbrush bridal packages, radiant party looks, and neat hairstyles for every wedding ceremony."}
              </p>
            </div>

            {/* Key Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans text-[#5C4E4D]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4727F] shrink-0" />
                <span>Classic, HD &amp; Airbrush Bridal Makeup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4727F] shrink-0" />
                <span>Complete Hair Styling &amp; Buns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4727F] shrink-0" />
                <span>Open All 7 Days (10:00 AM – 7:00 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4727F] shrink-0" />
                <span>Personalized Consultation with Eshvi</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenBooking()}
                className="btn-primary px-7 py-3.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                {homeSettings?.heroCtaText || "Book an Appointment"}
              </button>

              <a
                href="#bridal"
                className="btn-secondary px-6 py-3.5 rounded-lg text-xs font-sans font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>View Bridal Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Location Note */}
            <div className="pt-3 flex items-start gap-2 text-xs text-[#8E7C7A] font-sans">
              <MapPin className="w-4 h-4 text-[#C4727F] shrink-0 mt-0.5" />
              <span>{siteSettings?.address || "Near New SBI Branch, Public Inter College, Manauri, Prayagraj, Uttar Pradesh - 212208"}</span>
            </div>

          </div>

          {/* Right Column: Real Bridal Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#EFE3DF] bg-white shadow-lg p-2.5">
              
              {/* Media Container with 4:5 Aspect Ratio */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#FDF3EF]">
                
                {/* Primary High-Resolution Real Bridal Photo */}
                <img
                  src={displayImage}
                  alt="Peach Salon Real Indian Bridal Makeup in Manauri Prayagraj"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = heroBridalImg;
                  }}
                />

                {/* Subtle Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2424]/85 via-black/10 to-transparent pointer-events-none"></div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C4727F] text-[11px] font-sans font-bold mb-1.5 shadow-xs">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Real Bridal Artistry by Eshvi</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    Peach Salon &bull; Manauri, Prayagraj
                  </h3>
                  <p className="text-xs text-white/95 font-sans mt-0.5">
                    Traditional, HD &amp; Royal Bridal Couture
                  </p>
                </div>

              </div>

              {/* Micro Information Bar under Showcase */}
              <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#6E5E5C] font-sans">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#C4727F]" />
                  10:00 AM – 7:00 PM (7 Days)
                </span>
                <span className="text-[#C4727F] font-bold">
                  Manauri Flagship Studio
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
