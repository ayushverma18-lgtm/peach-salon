import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, UserCheck, Clock, ShieldCheck, Heart } from 'lucide-react';
import { SERVICES_LIST, MASTER_STYLISTS } from '../data/salonData';

export default function AIBeautyArchitect({ onOpenBooking }) {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState('Royal Wedding / Bridal');
  const [hairType, setHairType] = useState('Color-Treated / Highlighted');
  const [aesthetic, setAesthetic] = useState('Liquid Silk & Glass Sheen');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const occasionsList = [
    { title: 'Royal Wedding / Bridal', desc: 'Heirloom veil anchoring, HD airbrush, diamond updo' },
    { title: 'Red Carpet Gala / Premiere', desc: 'Met gala sleek bun, paparazzi flash-proof radiance' },
    { title: 'Hair Science Reconstruction', desc: 'Molecular keratin repair, peach-platinum glaze' },
    { title: 'Haute Makeup & Skin Alchemy', desc: '24K gold foil eyelids, velvet matte ombre lips' }
  ];

  const hairTypesList = [
    { title: 'Fine & Straight', desc: 'Needs volumetric root lift & weightless gloss' },
    { title: 'Wavy to Medium Density', desc: 'Craves dimensional peach-platinum balayage' },
    { title: 'Coarse, Textured or Curly', desc: 'Demands deep botanical lipid hydration & curl bounce' },
    { title: 'Color-Treated / Highlighted', desc: 'Requires acidic pH 4.5 bond sealing & anti-brass glaze' }
  ];

  const aestheticsList = [
    { title: 'Liquid Silk & Glass Sheen', desc: 'Ultra-flat, mirror-reflective weightless movement' },
    { title: '24K Gold & Haute Bronze Glamour', desc: 'Edible gold foil eyelids with sculpted contouring' },
    { title: 'Sculpted Haute Architectural Bun', desc: 'Sharp, clean lines with diamond jewelry accents' },
    { title: 'Dewy Heirloom Romance', desc: 'Soft-focus face framing tendrils and radiant airbrush skin' }
  ];

  const handleGenerate = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCompleted(true);
    }, 1200);
  };

  const handleReset = () => {
    setStep(1);
    setCompleted(false);
  };

  // Determine intelligent match
  const getRecommendation = () => {
    if (occasion.includes('Bridal')) {
      return {
        service: 'The Imperial Bridal Trial & Grand Day Styling',
        stylist: MASTER_STYLISTS[1], // Zoya Qureshi
        duration: '240 mins',
        price: '₹45,000',
        formula: 'Airbrush Hydro-Glow + Silk Protein Dupatta Anchor + Kannauj Rose Mist',
        protocol: '3-Fitting Protocol with 5500K Studio Flash Validation'
      };
    } else if (occasion.includes('Gala')) {
      return {
        service: 'Met Gala Architectural Bun & Paparazzi Flash Prep',
        stylist: MASTER_STYLISTS[2], // Vikramaditya Sen
        duration: '120 mins',
        price: '₹16,500',
        formula: 'Anti-Flash Silica Setting + Cashmere Finishing Balm + Diamond Clip Anchor',
        protocol: '14-Hour High-Heat & Strobe Light Proof Finish'
      };
    } else if (occasion.includes('Makeup')) {
      return {
        service: '24K Gold Leaf & Champagne Foil Eye Artistry with HD Glass Skin',
        stylist: MASTER_STYLISTS[1], // Zoya Qureshi
        duration: '90 mins',
        price: '₹12,500',
        formula: '24K Gold Leaf Sheen + Micro-Airbrush Foundation + Velvet Matte Plum Lip',
        protocol: 'Zero-Flashback Silica Seal with 16-Hour Transfer Resistance'
      };
    } else {
      return {
        service: 'Molecular Liquid-Silk Restoration & Peach Platinum Gloss',
        stylist: MASTER_STYLISTS[0], // Aria Malhotra
        duration: '150 mins',
        price: '₹14,500',
        formula: 'Bio-Mimetic Polypeptides + pH 4.5 Acidic Peach Glaze + Thermal Ceramic Seal',
        protocol: 'Trichology Porosity Mapping with 12-Week Lamination Guarantee'
      };
    }
  };

  const rec = getRecommendation();

  return (
    <section id="architect" className="py-20 md:py-28 bg-[#0D0B0A] text-[#FBF3EC] relative border-b border-[#D4AF37]/25">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1916] border border-[#EE9A70]/50 text-[#EE9A70] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#EE9A70]" />
            AI Bespoke Beauty Matchmaker
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] font-medium">
            AI Look Architect
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D1C2BA]">
            Match your hair history, upcoming occasion, and aesthetic vision with our master artists and custom chemical formulations.
          </p>
        </div>

        {/* Interactive Wizard Card */}
        <div className="bg-[#161210] border border-[#D4AF37]/35 rounded-2xl shadow-2xl p-6 sm:p-10">
          
          {!completed ? (
            <div>
              {/* Step Progress Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#0D0B0A] flex items-center justify-center text-xs font-bold font-serif">
                    {step}
                  </span>
                  <span className="font-serif text-base text-[#FBF3EC] font-medium">
                    {step === 1 && 'Step 1: Select Your Milestone Occasion'}
                    {step === 2 && 'Step 2: Identify Your Hair & Skin State'}
                    {step === 3 && 'Step 3: Choose Your Desired Aesthetic Finish'}
                  </span>
                </div>
                <span className="text-xs text-[#D1C2BA]/70 font-modern">
                  Step {step} of 3
                </span>
              </div>

              {/* STEP 1: OCCASION */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">Where will you be seen?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {occasionsList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setOccasion(item.title)}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                          occasion === item.title 
                            ? 'bg-[#2A201A] border-[#EE9A70] shadow-lg ring-1 ring-[#EE9A70]' 
                            : 'bg-[#1F1916] border-[#D4AF37]/20 hover:bg-[#2A201A]/60'
                        }`}
                      >
                        <span className="font-serif font-semibold text-base text-[#FBF3EC] block mb-1">
                          {item.title}
                        </span>
                        <span className="text-xs text-[#D1C2BA] block">
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0D0B0A] px-6 py-3 rounded-sm text-xs font-serif font-bold tracking-wide shadow-lg hover:bg-[#F3E5AB] transition-colors cursor-pointer"
                    >
                      Next: Hair &amp; Skin State
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: HAIR TYPE */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">What is your current hair and skin state?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hairTypesList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHairType(item.title)}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                          hairType === item.title 
                            ? 'bg-[#2A201A] border-[#EE9A70] shadow-lg ring-1 ring-[#EE9A70]' 
                            : 'bg-[#1F1916] border-[#D4AF37]/20 hover:bg-[#2A201A]/60'
                        }`}
                      >
                        <span className="font-serif font-semibold text-base text-[#FBF3EC] block mb-1">
                          {item.title}
                        </span>
                        <span className="text-xs text-[#D1C2BA] block">
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-sm border border-[#D4AF37]/40 text-xs font-medium text-[#FBF3EC] hover:bg-white/10 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0D0B0A] px-6 py-3 rounded-sm text-xs font-serif font-bold tracking-wide shadow-lg hover:bg-[#F3E5AB] transition-colors cursor-pointer"
                    >
                      Next: Desired Finish
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: AESTHETIC FINISH */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">What is your dream reflection?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aestheticsList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAesthetic(item.title)}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                          aesthetic === item.title 
                            ? 'bg-[#2A201A] border-[#EE9A70] shadow-lg ring-1 ring-[#EE9A70]' 
                            : 'bg-[#1F1916] border-[#D4AF37]/20 hover:bg-[#2A201A]/60'
                        }`}
                      >
                        <span className="font-serif font-semibold text-base text-[#FBF3EC] block mb-1">
                          {item.title}
                        </span>
                        <span className="text-xs text-[#D1C2BA] block">
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-sm border border-[#D4AF37]/40 text-xs font-medium text-[#FBF3EC] hover:bg-white/10 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={isAnalyzing}
                      className="inline-flex items-center gap-2 bg-[#EE9A70] text-[#0D0B0A] px-7 py-3 rounded-sm text-xs font-serif font-bold tracking-wide shadow-xl hover:bg-[#F6C6A8] transition-colors cursor-pointer"
                    >
                      {isAnalyzing ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#0D0B0A] border-t-transparent rounded-full animate-spin"></span>
                          Architecting Bespoke Formula...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          Generate My Look Blueprint
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* COMPLETED RECOMMENDATION RESULT */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#D4AF37]/25 gap-2">
                <div>
                  <span className="text-[11px] font-modern uppercase tracking-widest text-[#EE9A70] font-bold block">
                    Tailored Diagnostic Result
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF3EC] font-medium">
                    {rec.service}
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-[#D1C2BA] hover:text-[#FBF3EC] border border-[#D4AF37]/30 px-3 py-1.5 rounded cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Retake Quiz
                </button>
              </div>

              {/* Stylist & Formula Match */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#1F1916] p-5 sm:p-6 rounded-xl border border-[#D4AF37]/30">
                
                {/* Stylist Card */}
                <div className="md:col-span-5 flex items-center gap-4 border-b md:border-b-0 md:border-r border-[#D4AF37]/25 pb-4 md:pb-0 md:pr-4">
                  <img 
                    src={rec.stylist.image} 
                    alt={rec.stylist.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#EE9A70]"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-modern tracking-wider text-[#D4AF37] font-semibold block">
                      Recommended Lead Artist
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#FBF3EC]">
                      {rec.stylist.name}
                    </h4>
                    <p className="text-xs text-[#D1C2BA]">
                      {rec.stylist.role}
                    </p>
                    <span className="text-[10px] text-[#EE9A70] font-semibold mt-1 block">
                      ★ {rec.stylist.accolades}
                    </span>
                  </div>
                </div>

                {/* Formula Specifications */}
                <div className="md:col-span-7 space-y-2 text-xs">
                  <div>
                    <span className="text-[#D4AF37] font-semibold block">Custom Chemical Formula:</span>
                    <p className="text-[#FBF3EC] font-medium">{rec.formula}</p>
                  </div>
                  <div>
                    <span className="text-[#D4AF37] font-semibold block">Protocol &amp; Diagnostics:</span>
                    <p className="text-[#D1C2BA]">{rec.protocol}</p>
                  </div>
                  <div className="flex items-center gap-4 pt-2 text-[#D1C2BA]">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {rec.duration}</span>
                    <span className="font-serif font-bold text-sm text-[#F3E5AB]">{rec.price}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-[#D1C2BA]/70 italic">
                  *Your quiz profile will be automatically forwarded to {rec.stylist.name}'s chair upon reservation.
                </p>
                <button
                  onClick={() => onOpenBooking(`${rec.service} with ${rec.stylist.name}`)}
                  className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0D0B0A] px-7 py-3.5 rounded-sm text-xs font-serif font-bold tracking-wide shadow-xl border border-[#D4AF37]/50 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Reserve This Look with {rec.stylist.name}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
