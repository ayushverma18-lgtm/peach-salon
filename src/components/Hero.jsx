import React, { useState } from 'react';
import { Calendar, Sparkles, MapPin, Clock, ArrowRight, Heart, CheckCircle2, Play, Volume2, VolumeX } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Hero({ onOpenBooking, siteSettings, homeSettings }) {
  const revealRef = useScrollReveal();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoSrc = homeSettings?.videoUrl || '/videos/peach-salon.mp4';
  const posterImg = homeSettings?.heroImage || '/images/bridal.jpg';

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#FFF5F2] via-[#FFF9F7] to-[#FFFFFF] border-b border-[#EFE3DF] overflow-hidden">
      
      {/* Background Decorative Soft Peach Radial Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FCEEE9] rounded-full filter blur-3xl opacity-60 pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F8E8E4] rounded-full filter blur-3xl opacity-50 pointer-events-none -ml-20 -mb-20"></div>

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal-on-scroll">
        
        {/* Main Grid: Introduction & Real Video/Photo Showcase */}
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

          {/* Right Column: Real 10-Second Video / Real Bridal Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#EFE3DF] bg-white shadow-md p-2.5">
              
              {/* Media Container with 4:5 / 16:9 Aspect Ratio */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#FDF3EF]">
                
                {/* Real Video Element (Muted by default, Loop, PlaysInline) */}
                <video
                  src={videoSrc}
                  poster={posterImg}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to poster image if video not yet provided
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Fallback Image Layer if video is not available */}
                <img
                  src={posterImg}
                  alt="Peach Salon Indian Bridal Makeup in Manauri Prayagraj"
                  className="w-full h-full object-cover"
                  style={{ display: 'none' }}
                  onLoad={(e) => {
                    // Ensures clean display
                  }}
                />

                {/* Subtle Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2424]/80 via-transparent to-black/10 pointer-events-none"></div>

                {/* Sound & Video Controls */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-[#2D2424] backdrop-blur-xs transition-colors cursor-pointer shadow-xs"
                    title={isMuted ? "Unmute video" : "Mute video"}
                    aria-label="Toggle audio"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C4727F]" />}
                  </button>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C4727F]/90 text-[11px] font-sans font-medium mb-1.5">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Real Bridal Work by Eshvi</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    Peach Salon &bull; Manauri, Prayagraj
                  </h3>
                  <p className="text-xs text-white/90 font-sans mt-0.5">
                    Traditional &amp; HD Bridal Styling
                  </p>
                </div>

              </div>

              {/* Micro Information Bar under Showcase */}
              <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#6E5E5C] font-sans">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#C4727F]" />
                  10:00 AM – 7:00 PM Daily
                </span>
                <span className="text-[#C4727F] font-semibold">
                  Prior Consultation Recommended
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
