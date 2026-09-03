import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../data/salonData';
import { ShoppingBag, Star, Sparkles, Check, Droplets, Sparkle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function PeachApothecary({ onAddToCart, products }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedId, setAddedId] = useState(null);
  const revealRef = useScrollReveal();

  const productList = products || INITIAL_PRODUCTS;

  const categories = [
    { id: 'all', label: 'All Formulations' },
    { id: 'Makeup Couture', label: 'Makeup Couture' },
    { id: 'Hair Chemistry', label: 'Hair Chemistry' },
    { id: 'Skin Alchemy', label: 'Skin Alchemy' }
  ];

  const filteredProducts = activeCategory === 'all'
    ? productList
    : productList.filter(p => p.category === activeCategory);

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="apothecary" className="py-20 md:py-28 bg-[#14100E] text-[#FBF3EC] relative border-b border-[#D4AF37]/25">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#D4AF37] font-futuristic italic text-lg font-bold">06</span>
              <span className="h-px w-8 bg-[#D4AF37]"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-futuristic font-semibold text-[#EE9A70]">
                Hair &amp; Makeup Alchemy
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FBF3EC] font-medium">
              The Peach Apothecary
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#D1C2BA] max-w-xl font-sans">
              Take home the exact 24K gold radiance primers, HD airbrush foundation veils, and bio-mimetic keratin elixirs crafted for our atelier chairs.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-futuristic uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#EE9A70] text-[#0A0807] font-bold shadow-md shadow-[#EE9A70]/20'
                    : 'bg-[#1A1412] text-[#D1C2BA] hover:bg-[#241B18] border border-[#D4AF37]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="bg-[#1A1412] rounded-2xl border border-[#D4AF37]/30 overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#EE9A70] transition-all flex flex-col justify-between group futuristic-card"
            >
              <div>
                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden bg-[#0A0807] border-b border-[#D4AF37]/20">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-[#0A0807]/85 text-[#EE9A70] text-[10px] font-futuristic uppercase tracking-wider font-bold px-2.5 py-1 rounded-full backdrop-blur-xs border border-[#D4AF37]/30">
                    {product.tag}
                  </span>

                  <span className="absolute bottom-3 right-3 bg-[#1A1412]/90 text-[#F3E5AB] text-[11px] font-futuristic px-2 py-0.5 rounded shadow-sm border border-white/10">
                    {product.size}
                  </span>
                </div>

                {/* Info Area */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#D1C2BA]/70">
                    <span className="text-[#EE9A70] font-futuristic uppercase text-[10px] tracking-wider font-bold">{product.category}</span>
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-futuristic font-bold text-xs text-[#FBF3EC]">{product.rating}</span>
                      <span className="text-[10px] text-[#D1C2BA]/60">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#FBF3EC] leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#D1C2BA] leading-relaxed line-clamp-2 font-sans">
                    {product.desc}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] text-[#D4AF37] font-futuristic uppercase tracking-wider font-bold block">Key Actives:</span>
                    <p className="text-[11px] text-[#F3E5AB]/90 italic truncate font-sans">{product.keyIngredients}</p>
                  </div>
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/20">
                  <div>
                    <span className="text-[10px] text-[#D1C2BA]/70 block font-futuristic uppercase">Price</span>
                    <span className="font-futuristic text-lg font-bold text-[#F3E5AB]">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm text-xs font-futuristic font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      addedId === product.id 
                        ? 'bg-[#EE9A70] text-[#0A0807]' 
                        : 'bg-[#D4AF37] text-[#0A0807] hover:bg-[#F3E5AB]'
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
