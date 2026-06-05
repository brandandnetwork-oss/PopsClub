/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Product } from '../types';

interface CustomizerViewProps {
  product: Product;
  onBack: () => void;
  /** Called when the user clicks the "Únete al Club" CTA. */
  onJoinClub: () => void;
}

export default function CustomizerView({
  product,
  onBack,
  onJoinClub
}: CustomizerViewProps) {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [warmCaramel, setWarmCaramel] = useState(false);
  const [extraCookies, setExtraCookies] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(product.price);

  // Dynamic price calculation
  useEffect(() => {
    let price = product.price;
    
    // Size offsets
    if (selectedSize === 'S') {
      price -= 1.00; // Small is 1 euro cheaper
    } else if (selectedSize === 'L') {
      price += 1.50; // Large is 1.50 euros more
    }
    
    // Modifiers or Extra drips
    if (warmCaramel) {
      price += 1.50;
    }
    if (extraCookies) {
      price += 1.50;
    }
    
    setCurrentPrice(Number(price.toFixed(2)));
  }, [selectedSize, warmCaramel, extraCookies, product.price]);


  return (
    <div className="max-w-[520px] mx-auto text-left space-y-8 pb-12">
      
      {/* Back button header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="flex items-center justify-center p-3 rounded-xl border-2 border-black bg-surface-container hover:bg-neutral-800 text-primary active:scale-95 transition-all cursor-pointer"
          id="btn-customizer-back"
        >
          <span className="material-symbols-outlined font-black">
            arrow_back_ios_new
          </span>
        </button>
        <span className="font-mono text-xs uppercase text-on-surface-variant font-bold tracking-widest">
          Volver a Sabores
        </span>
      </div>

      {/* Main product card showcase with rotating sticker style */}
      <section className="relative mt-4 mb-4 transform -rotate-1">
        <div className="relative bg-secondary-container p-2.5 rounded-2xl border-4 border-black block-shadow overflow-hidden">
          <img 
            className="w-full h-[360px] object-cover rounded-xl border-2 border-black" 
            alt={product.name}
            src={product.image}
          />
          {product.isBestSeller && (
            <div className="absolute top-4 right-4 bg-primary text-on-primary font-mono text-xs font-bold px-4 py-2 rounded-full border-2 border-black block-shadow flex items-center gap-2 select-none">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              BEST SELLER
            </div>
          )}
        </div>

        {/* Floating background decorative doodles matching screenshot */}
        <div className="absolute -top-5 -left-5 text-tertiary transform -rotate-12 animate-pulse select-none">
          <span className="material-symbols-outlined text-5xl drop-shadow-[2px_2px_0_#000]" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
        </div>
        <div className="absolute -bottom-5 -right-3 text-primary transform rotate-12 select-none">
          <span className="material-symbols-outlined text-6xl drop-shadow-[2px_2px_0_#000]" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
        </div>
      </section>

      {/* Product Information header display */}
      <section className="space-y-2">
        <div className="inline-block px-3 py-1 bg-black border border-primary text-primary font-mono text-[10px] rounded uppercase tracking-wider">
          {product.tag}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary uppercase tracking-tighter italic drop-shadow-[2px_2px_0_#000]">
          {product.name}
        </h1>
        <p className="font-sans text-sm text-on-surface-variant md:text-base leading-relaxed">
          {product.desc}
        </p>
      </section>

      {/* Urban badges information list block matching image */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-surface-container p-3 rounded-xl border-2 border-black block-shadow flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-tertiary text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
          <span className="font-mono text-[11px] uppercase text-tertiary font-bold tracking-tight">
            100% Adictivo
          </span>
        </div>

        <div className="bg-surface-container p-3 rounded-xl border-2 border-black block-shadow flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-primary text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
          <span className="font-mono text-[11px] uppercase text-primary font-bold tracking-tight">
            Para Compartir
          </span>
        </div>

        <div className="bg-surface-container p-3 rounded-xl border-2 border-black block-shadow flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-secondary text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            crown
          </span>
          <span className="font-mono text-[11px] uppercase text-secondary font-bold tracking-tight">
            Premium Quality
          </span>
        </div>

        <div className="bg-surface-container p-3 rounded-xl border-2 border-black block-shadow flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-on-background text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            restaurant
          </span>
          <span className="font-mono text-[11px] uppercase text-on-background font-bold tracking-tight">
            Hecho al Momento
          </span>
        </div>
      </section>

      {/* Customize Container Block Form */}
      <section className="space-y-6 pt-3 border-t-2 border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 bg-tertiary rounded-full"></div>
          <h2 className="font-display text-2xl font-black uppercase text-on-background tracking-tight italic">
            Customize Bucket
          </h2>
        </div>

        <div className="space-y-6" id="custom-form">
          
          {/* Size interactive selectors */}
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-on-surface-variant font-bold tracking-wider block">
              Tamaño del Cubo
            </label>
            <div className="flex gap-3">
              {[
                { size: 'S', label: 'LIT (S)', desc: '-€1.00' },
                { size: 'M', label: 'GOAT (M)', desc: 'Base Price' },
                { size: 'L', label: 'ULTRA (L)', desc: '+€1.50' }
              ].map((opt) => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => setSelectedSize(opt.size as 'S' | 'M' | 'L')}
                  className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 cursor-pointer select-none transition-all duration-150 ${
                    selectedSize === opt.size
                      ? 'border-primary bg-primary/10 text-primary block-shadow scale-[1.02]'
                      : 'border-black bg-surface-container text-on-surface hover:bg-neutral-800'
                  }`}
                >
                  <span className="font-mono text-xs font-black">{opt.label}</span>
                  <span className="text-[10px] opacity-75">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Drips Checkbox Modifier */}
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-on-surface-variant font-bold tracking-wider block">
              Extra Drip (+ €1.50 cada uno)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="drips-toggle-options">
              
              {/* Extra Warm Caramel */}
              <div 
                onClick={() => setWarmCaramel(!warmCaramel)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer select-none transition-all group ${
                  warmCaramel 
                    ? 'border-tertiary bg-tertiary/10 text-tertiary block-shadow' 
                    : 'border-black bg-surface-container text-on-surface'
                }`}
              >
                <span className="font-mono text-xs font-bold transition-colors">
                  Warm Caramel
                </span>
                <div className={`w-6 h-6 border-2 border-black rounded-lg flex items-center justify-center transition-colors ${
                  warmCaramel ? 'bg-tertiary' : 'bg-background'
                }`}>
                  <span className={`material-symbols-outlined text-[16px] text-black font-black transition-opacity ${
                    warmCaramel ? 'opacity-100' : 'opacity-0'
                  }`}>
                    check
                  </span>
                </div>
              </div>

              {/* Extra Cookies */}
              <div 
                onClick={() => setExtraCookies(!extraCookies)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer select-none transition-all group ${
                  extraCookies 
                    ? 'border-tertiary bg-tertiary/10 text-tertiary block-shadow' 
                    : 'border-black bg-surface-container text-on-surface'
                }`}
              >
                <span className="font-mono text-xs font-bold transition-colors">
                  Extra Cookies
                </span>
                <div className={`w-6 h-6 border-2 border-black rounded-lg flex items-center justify-center transition-colors ${
                  extraCookies ? 'bg-tertiary' : 'bg-background'
                }`}>
                  <span className={`material-symbols-outlined text-[16px] text-black font-black transition-opacity ${
                    extraCookies ? 'opacity-100' : 'opacity-0'
                  }`}>
                    check
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Handdrawn SVG Divider in custom options block */}
          <div className="py-4 flex justify-center opacity-70">
            <svg fill="none" height="20" viewBox="0 0 200 20" width="200" xmlns="http://www.w3.org/2000/svg">
              <path className="stroke-primary" d="M0 10C20 5 40 15 60 10C80 5 100 15 120 10C140 5 160 15 180 10C190 7.5 200 10 200 10" strokeLinecap="round" strokeWidth="3"></path>
              <circle className="fill-tertiary" cx="30" cy="15" r="3.5"></circle>
              <circle className="fill-secondary" cx="170" cy="5" r="3.5"></circle>
            </svg>
          </div>

        </div>
      </section>

      {/* Price + join club CTA */}
      <section className="bg-surface-container p-4 rounded-2xl border-4 border-black block-shadow relative">
        <div className="flex justify-between items-center gap-4">
          <div className="text-left font-mono">
            <span className="text-[10px] text-on-surface-variant block uppercase">Precio orientativo</span>
            <span className="text-3xl font-black text-tertiary block">
              {currentPrice.toFixed(2).replace('.', ',')} €
            </span>
          </div>

          <button
            onClick={onJoinClub}
            className="press-pop flex-1 bg-primary text-on-primary font-display font-black text-sm md:text-base tracking-tight uppercase py-3.5 rounded-xl border-4 border-black block-shadow hover:bg-secondary hover:text-black transition-all cursor-pointer flex items-center justify-center gap-3"
          >
            <span>Únete al Club</span>
            <span className="material-symbols-outlined text-xl font-bold">favorite</span>
          </button>
        </div>
      </section>

    </div>
  );
}
