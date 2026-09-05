import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Filter, X, ZoomIn, Heart } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import hdRedBridalImg from '../assets/bridal_hd_red.jpg';
import emeraldBridalImg from '../assets/bridal_emerald_gold.jpg';
import hairHighlightsImg from '../assets/hair_highlights.jpg';
import hairFashionColorImg from '../assets/hair_fashion_color.jpg';
import hairGlobalColorImg from '../assets/hair_global_color.jpg';

export default function GallerySection({ onOpenBooking, galleryItems }) {
  const revealRef = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);

  const defaultItems = [
    {
      id: "gal-1",
      title: "Royal Red Zardozi HD Bridal Look",
      description: "Traditional royal red bridal makeup with high-definition smooth base, defined eyes, and matha patti setting.",
      category: "Bridal",
      image: hdRedBridalImg,
      fallback: hdRedBridalImg
    },
    {
      id: "gal-2",
      title: "Emerald Polki Heritage Bridal Styling",
      description: "Refined HD bridal finish with soft contouring, balanced blush, and traditional emerald necklace styling.",
      category: "Bridal",
      image: emeraldBridalImg,
      fallback: emeraldBridalImg
    },
    {
      id: "gal-3",
      title: "Dimensional Hair Highlights / Balayage",
      description: "Caramel and blonde balayage dimensional highlights with smooth blended gradient on dark hair.",
      category: "Hair",
      image: hairHighlightsImg,
      fallback: hairHighlightsImg
    },
    {
      id: "gal-4",
      title: "Rose Ombre Fashion Hair Colour",
      description: "Rich rose-tinted ombre fashion hair colour with smooth gloss and healthy shine.",
      category: "Hair",
      image: hairFashionColorImg,
      fallback: hairFashionColorImg
    },
    {
      id: "gal-5",
      title: "Glossy Mocha Global Hair Colour",
      description: "Full global mocha brown hair colour with deep root coverage and lustrous natural shine.",
      category: "Hair",
      image: hairGlobalColorImg,
      fallback: hairGlobalColorImg
    },
    {
      id: "gal-6",
      title: "Royal Bridal Matha Patti & Dupatta Draping",
      description: "Neat structural bridal bun styling suitable for heavy bridal dupattas and accessories.",
      category: "Bridal",
      image: hdRedBridalImg,
      fallback: hdRedBridalImg
    }
  ];

  // Helper to map known paths to imported assets
  const resolveGalleryImage = (imgSrc, title = '', category = '') => {
    if (!imgSrc) return hdRedBridalImg;
    const str = String(imgSrc).toLowerCase();
    const tStr = String(title).toLowerCase();

    if (str.includes('highlights') || tStr.includes('highlights') || tStr.includes('balayage')) {
      return hairHighlightsImg;
    }
    if (str.includes('fashion') || tStr.includes('fashion')) {
      return hairFashionColorImg;
    }
    if (str.includes('global') || tStr.includes('global')) {
      return hairGlobalColorImg;
    }
    if (str.includes('emerald') || tStr.includes('emerald')) {
      return emeraldBridalImg;
    }
    if (str.includes('red') || str.includes('hd') || category.toLowerCase() === 'bridal') {
      return hdRedBridalImg;
    }
    return imgSrc;
  };

  const rawList = (galleryItems && galleryItems.length > 0) ? galleryItems : defaultItems;

  const items = rawList.map((item, idx) => {
    const fallback = idx % 2 === 0 ? hdRedBridalImg : emeraldBridalImg;
    const resolved = resolveGalleryImage(item.image, item.title, item.category || '');
    return {
      ...item,
      image: resolved || fallback,
      fallback
    };
  });

  const categories = ['All', 'Bridal', 'Makeup', 'Hair'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#FFF9F7] border-b border-[#EFE3DF]">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-soft text-xs font-sans font-semibold">
            <ImageIcon className="w-3.5 h-3.5 text-[#C4727F]" />
            <span>Real Salon Work</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D2424] font-bold tracking-tight">
            Client Styling &amp; Hair Gallery
          </h2>
          
          <p className="text-sm sm:text-base text-[#5C4E4D] font-sans leading-relaxed">
            Real client bridal looks, hair colour transformations, and styling created at Peach Salon in Manauri, Prayagraj.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C4727F] text-white shadow-xs'
                  : 'bg-white text-[#5C4E4D] hover:bg-[#FDF3EF] border border-[#EFE3DF]'
              }`}
            >
              {cat === 'All' ? 'All Work' : cat === 'Bridal' ? 'Bridal Makeup' : cat === 'Makeup' ? 'Occasion Makeup' : 'Hair Colour & Styling'}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id || item.title}
              onClick={() => setPreviewImage(item)}
              className="group studio-card overflow-hidden rounded-2xl cursor-pointer bg-white transition-all duration-300"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-[#FDF3EF]">
                <img
                  src={item.image || item.fallback}
                  alt={item.title || "Peach Salon Bridal Styling in Prayagraj"}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = item.fallback || hdRedBridalImg;
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2424]/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#FCEEE9] font-bold block mb-1">
                    {item.category || "Hair & Makeup"}
                  </span>
                  <h4 className="font-serif font-bold text-base text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#EADBD7] font-sans mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs text-[#FCEEE9] font-medium">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to expand</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans uppercase tracking-wider font-semibold text-[#C4727F]">
                    {item.category}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2D2424] truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6E5E5C] font-sans line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="btn-primary px-7 py-3 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 shadow-xs"
          >
            <Heart className="w-3.5 h-3.5" />
            Book a Look from our Gallery
          </button>
        </div>

      </div>

      {/* Lightbox / Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-[#2D2424]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-[#EFE3DF]">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 text-[#2D2424] hover:bg-white transition-colors cursor-pointer shadow-xs"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/5] max-h-[65vh] overflow-hidden bg-[#FDF3EF]">
              <img
                src={previewImage.image || previewImage.fallback || hdRedBridalImg}
                alt={previewImage.title}
                className="w-full h-full object-contain bg-[#1F1918]"
              />
            </div>

            <div className="p-6 space-y-2 bg-white">
              <span className="text-xs font-sans uppercase tracking-wider font-semibold text-[#C4727F]">
                {previewImage.category} &bull; Peach Salon Manauri
              </span>
              <h3 className="font-serif text-xl font-bold text-[#2D2424]">
                {previewImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4E4D] font-sans leading-relaxed">
                {previewImage.description}
              </p>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => {
                    const title = previewImage.title;
                    setPreviewImage(null);
                    onOpenBooking(title);
                  }}
                  className="btn-primary px-5 py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Inquire for this Look
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
