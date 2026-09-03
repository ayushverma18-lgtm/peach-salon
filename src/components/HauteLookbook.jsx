import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../data/salonData';
import { Camera, Sparkles, X, Info, Calendar, ArrowRight, Eye, Film } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function HauteLookbook({ onOpenBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeFilter === 'all' 
    ? LOOKBOOK_ITEMS 
    : LOOKBOOK_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section id="lookbook" className="py-20 md:py-28 bg-[#0D0B0A] text-[#FBF3EC] relative border-b border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#D4AF37] font-serif italic text-lg">05</span>
              <span className="h-px w-8 bg-[#D4AF37]"></span>
              <span className="text-xs uppercase tracking-widest font-modern font-semibold text-[#EE9A70]">
                Editorial Archive
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] font-medium">
              Haute Lookbook &amp; Video Reels
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#D1C2BA] max-w-xl">
              A curated photographic &amp; video record of our signature commissions, calibrated with Midjourney v6 and 8K cinematic lighting aesthetics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Commissions' },
              { id: 'hair-science', label: 'Hair Science' },
              { id: 'makeup', label: 'Haute Makeup' },
              { id: 'bridal', label: 'Royal Bridal' },
              { id: 'gala', label: 'Gala & Red Carpet' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#EE9A70] text-[#0D0B0A] font-bold shadow-lg shadow-[#EE9A70]/20'
                    : 'bg-[#1F1916] text-[#D1C2BA] hover:bg-[#2A201A] border border-[#D4AF37]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-[#161210] rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-xl hover:shadow-2xl hover:border-[#EE9A70] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/90 via-transparent to-black/30 opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Floating video/prompt button indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D0B0A]/80 text-[#EE9A70] backdrop-blur-md border border-[#D4AF37]/30 text-[10px] font-modern font-semibold uppercase tracking-wider">
                  <Film className="w-3 h-3 text-[#EE9A70]" />
                  <span>10s Motion</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-[#FBF3EC] space-y-1">
                  <span className="text-[10px] font-modern uppercase tracking-wider text-[#EE9A70] font-semibold">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-medium leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs text-[#D1C2BA] block pt-1">
                    By {item.artist}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#1F1916] border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#D1C2BA]">
                <span className="truncate max-w-[190px]">{item.specs}</span>
                <span className="text-[#EE9A70] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Reel &amp; Prompt <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Blueprint Modal with 10s Video */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-[#0D0B0A]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-[#161210] text-[#FBF3EC] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#D4AF37]/40 shadow-2xl relative p-6 sm:p-8">
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 text-[#D1C2BA] hover:text-[#FBF3EC] rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-2">
                <div className="md:col-span-6">
                  <VideoPlayer 
                    videoUrl={selectedItem.videoUrl}
                    posterUrl={selectedItem.image}
                    title={selectedItem.title}
                    badge="10s 4K Motion Reel"
                  />
                </div>

                <div className="md:col-span-6 space-y-4">
                  <div>
                    <span className="text-xs font-modern uppercase tracking-widest text-[#EE9A70] font-bold">
                      {selectedItem.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FBF3EC] mt-1">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs text-[#D1C2BA] mt-1">
                      Stylist Commission: <strong className="text-[#F3E5AB]">{selectedItem.artist}</strong>
                    </p>
                  </div>

                  {/* AI Production Blueprint Prompt Box */}
                  <div className="p-4 rounded-xl bg-[#1F1916] border border-[#D4AF37]/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#EE9A70]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Midjourney v6 / Sora Generation Prompt Blueprint</span>
                    </div>
                    <p className="text-xs text-[#D1C2BA] font-mono bg-[#0D0B0A] p-3 rounded border border-white/10 leading-relaxed select-all">
                      {selectedItem.prompt}
                    </p>
                  </div>

                  {/* Technical Specs */}
                  <div className="space-y-1 text-xs text-[#D1C2BA] border-t border-[#D4AF37]/25 pt-3">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#D1C2BA]/70">Camera &amp; Lens</span>
                      <span className="font-medium text-[#FBF3EC]">{selectedItem.specs}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#D1C2BA]/70">Lighting Rig</span>
                      <span className="font-medium text-[#FBF3EC]">Calibrated 5600K True Daylight Key</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#D1C2BA]/70">Finishing Chemistry</span>
                      <span className="font-medium text-[#FBF3EC]">24K Liquid Peach Elixir + HD Airbrush Seal</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        const styleTitle = selectedItem.title;
                        setSelectedItem(null);
                        onOpenBooking(`Recreate Look: ${styleTitle}`);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0D0B0A] py-3.5 rounded-sm text-xs font-serif font-bold tracking-wide shadow-lg transition-colors cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#0D0B0A]" />
                      Reserve Chair for This Exact Look
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
