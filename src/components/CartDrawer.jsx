import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'PEACHVIP' || promoCode.toUpperCase() === 'VOGUE2026') {
      const disc = Math.round(subtotal * 0.15);
      setDiscount(disc);
      setPromoApplied(true);
    } else {
      alert('Code not recognized. Use "PEACHVIP" for 15% privilege.');
    }
  };

  const handleCheckout = () => {
    setIsOrdered(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#EE9A70', '#F3E5AB']
    });
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070605]/85 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-[#161210] text-[#FBF3EC] w-full max-w-md h-full shadow-2xl border-l border-[#D4AF37]/35 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#0D0B0A]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#EE9A70]" />
            <h3 className="font-serif text-xl font-medium text-[#FBF3EC]">
              Apothecary Bag
            </h3>
            <span className="text-xs bg-[#EE9A70] text-[#0D0B0A] px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#D1C2BA] hover:text-[#FBF3EC] rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!isOrdered ? (
            cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1F1916] text-[#EE9A70] flex items-center justify-center mx-auto border border-[#D4AF37]/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg text-[#FBF3EC]">Your Apothecary Bag is Empty</h4>
                <p className="text-xs text-[#D1C2BA]/70 max-w-xs mx-auto">
                  Explore our cold-pressed 24K Liquid Peach Elixir, HD airbrush veils, and bio-mimetic keratin formulations.
                </p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-[#1F1916] border border-[#D4AF37]/20 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-[#D4AF37]/30" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-sm font-bold text-[#FBF3EC] truncate">{item.name}</h5>
                    <span className="text-xs text-[#F3E5AB] font-bold block mt-0.5">₹{item.price.toLocaleString('en-IN')}</span>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#D4AF37]/30 rounded bg-[#0D0B0A]">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 text-xs hover:bg-white/10 cursor-pointer text-[#FBF3EC]"
                        >-</button>
                        <span className="px-2 text-xs font-bold text-[#EE9A70]">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs hover:bg-white/10 cursor-pointer text-[#FBF3EC]"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#D1C2BA]/60 hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
              <CheckCircle2 className="w-14 h-14 text-[#EE9A70] mx-auto" />
              <h4 className="font-serif text-2xl font-medium text-[#FBF3EC]">Order Confirmed</h4>
              <p className="text-xs text-[#D1C2BA]">
                Your artisanal apothecary parcel is being packaged with fresh lavender tissue in Lucknow. Dispatch notification will arrive via SMS.
              </p>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {!isOrdered && cart.length > 0 && (
          <div className="p-6 border-t border-[#D4AF37]/25 bg-[#0D0B0A] space-y-4">
            
            {/* Promo Code input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Privilege Code (e.g. PEACHVIP)"
                className="flex-1 p-2 rounded border border-[#D4AF37]/30 text-xs bg-[#161210] text-[#FBF3EC] placeholder:text-[#D1C2BA]/40 uppercase focus:outline-none focus:border-[#EE9A70]"
              />
              <button type="submit" className="px-3 py-2 bg-[#D4AF37] text-[#0D0B0A] font-bold rounded text-xs cursor-pointer hover:bg-[#F3E5AB]">
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-xs text-[#D1C2BA]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-[#EE9A70] font-semibold">
                  <span>VIP Privilege Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Atelier Luxury Delivery (Lucknow &amp; NCR)</span>
                <span className="text-[#EE9A70] font-semibold">Complimentary</span>
              </div>
              <div className="flex justify-between font-serif text-base font-bold text-[#F3E5AB] pt-2 border-t border-[#D4AF37]/20">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0D0B0A] font-serif font-bold text-sm tracking-wide shadow-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Complete Apothecary Order
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
