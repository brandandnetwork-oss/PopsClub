/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Reveal, RevealStagger, RevealItem } from './anim';
import logoUrl from '@/assets/logo.png';

interface FeedViewProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L', extraWarm: boolean, extraCookies: boolean) => void;
  onApplyPromo: () => void;
  promoApplied: boolean;
  setActiveTab: (tab: string) => void;
}

export default function FeedView({
  onSelectProduct,
  onAddToCart,
  onApplyPromo,
  promoApplied,
  setActiveTab
}: FeedViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sweet' | 'salty' | 'gourmet'>('all');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  // Parallax ligero de la imagen del hero: se desplaza unos px en vertical según
  // el scroll. Solo transform (GPU). Desactivado con prefers-reduced-motion.
  const reduceMotion = useReducedMotion();
  const heroImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroImageRef,
    offset: ['start end', 'end start'],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Filter logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const topVentas = PRODUCTS.slice(0, 3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setTimeout(() => {
        setEmailSubscribed(false);
        setEmailInput('');
      }, 5000);
    }
  };

  const categoriesList = [
    { id: 'all', label: 'TODOS' },
    { id: 'sweet', label: 'DULCES' },
    { id: 'salty', label: 'SALADOS' },
    { id: 'gourmet', label: 'GOURMET' }
  ] as const;

  return (
    <div className="space-y-12">
      
      {/* 1. Hero Section Showcase */}
      <Reveal as="section" className="relative pt-12 pb-16 px-4 md:px-8 overflow-hidden bg-surface-container rounded-3xl border-4 border-black block-shadow-lg">
        {/* Drip overlay at bottom of dark banner */}
        <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-block bg-tertiary text-on-tertiary px-4 py-1.5 font-mono text-xs font-bold rounded-lg border-2 border-black rotate-[-2deg] block-shadow select-none">
              100% ADICTIVO
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-black text-primary leading-none tracking-tighter uppercase drop-shadow-[4px_4px_0_#000]">
              EXPLOSIÓN DE <br />
              <span className="text-secondary-container">SABOR URBANO</span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Elevamos el snack clásico al siguiente nivel. Popcorn artesanal con ingredientes premium y la energía de la calle. ¿Estás listo para el club?
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('flavors')}
                className="press-pop bg-primary text-on-primary font-display font-black tracking-tight text-lg md:text-xl px-8 py-4 rounded-xl border-4 border-black block-shadow hover:bg-secondary-container hover:text-black transition-all cursor-pointer"
              >
                Ver Sabores
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('join-club-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="press-pop bg-background text-primary font-display font-black tracking-tight text-lg md:text-xl border-4 border-black px-8 py-4 rounded-xl block-shadow hover:bg-surface-container-high transition-all cursor-pointer"
              >
                Únete al Club
              </button>
            </div>
          </div>

          <motion.div
            ref={heroImageRef}
            style={reduceMotion ? undefined : { y: heroParallaxY }}
            className="lg:col-span-12 xl:col-span-5 relative group mt-4 lg:mt-0"
          >
            <div className="absolute -inset-4 bg-primary-container rounded-3xl blur-3xl opacity-20 pointer-events-none" />
            <img 
              alt="Popcorn Products Showcase" 
              className="w-full h-auto rounded-3xl border-8 border-black block-shadow rotate-[1.5deg] group-hover:rotate-0 transition-transform duration-500 max-h-[380px] object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfyiNYZkMgPtn_PTV7ubRKz-Q4NhzwtZixWr1TdV0wJlQCldpZAsu0e_EK3gXOSS_0EKfoZ-Fx58GOUT7O029c0YSQINgdM2trdUg2rwml5wgg382x4PbGQ0xZ0Le7f6rrtz_XKkuWD0dMwomi3ICj1n4PV7cvm_0hqgr9m-Plm6wyrWulV_QfogOakXpzj79ENlp0s-udctZQCDk45i-4VocCKLkCu6B3lWA8GLVLCaSGZXEGUnFoMYPq7RKREFfA_hQcn_QUXkk"
            />
            {/* Animated badges */}
            <div className="absolute -top-6 -right-6 p-4 animate-bounce select-none">
              <span className="material-symbols-outlined text-tertiary text-6xl drop-shadow-[3px_3px_0_#000]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
            </div>
          </motion.div>
        </div>
      </Reveal>

      {/* 2. Interactive Search & Categorization */}
      <Reveal as="section" className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
          
          {/* Search bar inputs */}
          <div className="flex-1 relative bg-surface-container border-4 border-primary rounded-2xl block-shadow flex items-center px-4 py-1">
            <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="BUSCAR TU VICIO..."
              className="bg-transparent border-none focus:ring-0 text-on-background w-full font-mono font-bold placeholder:text-surface-container-highest uppercase tracking-widest focus:outline-hidden py-3"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-primary hover:text-white font-bold p-1"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Filtering Category Chips */}
          <div className="flex gap-2 items-center overflow-x-auto pb-1" id="category-chips">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`press-pop px-5 py-3 rounded-xl border-2 border-black font-mono text-xs font-bold uppercase tracking-tighter block-shadow whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-secondary text-on-secondary scale-105'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </Reveal>

      {/* 3. Top Ventas Section Horizontal Slider */}
      <Reveal as="section" className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary italic tracking-tight drop-shadow-[2px_2px_0_#000]">
            TOP VENTAS
          </h2>
          <span className="font-mono text-xs text-tertiary uppercase tracking-widest bg-black px-3 py-1 border-2 border-black rounded-md block-shadow">
            BEST OF THE METRO
          </span>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topVentas.map((prod) => (
            <RevealItem
              key={`top-${prod.id}`}
              className="bg-surface-container border-4 border-black rounded-2xl block-shadow p-5 relative overflow-hidden group flex flex-col justify-between"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                  {prod.isHot && (
                    <span className="bg-tertiary text-on-tertiary font-mono text-xs font-bold px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0_#000] rotate-[-5deg] block">
                      HOT!
                    </span>
                  )}
                  {prod.isBestSeller && (
                    <span className="bg-primary text-on-primary font-mono text-xs font-bold px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0_#000] rotate-[3deg] block">
                      TOP!
                    </span>
                  )}
                </div>

                {/* Image holder with interactive grow on hover */}
                <div 
                  onClick={() => onSelectProduct(prod)}
                  className="h-48 w-full flex items-center justify-center mb-4 overflow-hidden rounded-xl border-2 border-black bg-black cursor-pointer"
                >
                  <img 
                    alt={prod.name}
                    className="h-full w-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-300"
                    src={prod.image}
                  />
                </div>

                <div 
                  onClick={() => onSelectProduct(prod)}
                  className="cursor-pointer space-y-1 block"
                >
                  <p className="font-display text-xl font-bold uppercase text-on-background group-hover:text-primary transition-colors">
                    {prod.name}
                  </p>
                  <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                    {prod.tag}
                  </p>
                  <p className="font-sans text-xs text-on-surface-variant line-clamp-2 mt-1">
                    {prod.desc}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 pt-3 border-t-2 border-neutral-800">
                <span className="font-display text-2xl font-black text-secondary">
                  €{prod.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onAddToCart(prod, 'M', false, false)}
                  className="press-pop bg-primary text-on-primary p-3 border-2 border-black rounded-lg block-shadow active:translate-y-1 hover:bg-secondary hover:text-black transition-all cursor-pointer flex items-center justify-center"
                  title="Añadir directo tamaño mediano"
                >
                  <span className="material-symbols-outlined text-lg leading-none font-bold">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </Reveal>

      {/* 4. Nuestros Sabores List */}
      <Reveal as="section" className="space-y-6" id="sabores-completo">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-secondary italic tracking-tight drop-shadow-[2px_2px_0_#000]">
          NUESTROS SABORES
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="bg-surface-container border-4 border-dashed border-neutral-700 rounded-2xl p-8 text-center text-on-surface-variant font-sans">
            <span className="material-symbols-outlined text-4xl text-neutral-600 block mb-2">
              fmd_bad
            </span>
            No se encontraron sabores con los filtros actuales. ¡Prueba otro término!
          </div>
        ) : (
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((prod) => (
              <RevealItem
                key={prod.id}
                className="bg-surface-container-low border-4 border-black rounded-2xl p-4 flex flex-col sm:flex-row gap-4 block-shadow relative overflow-hidden group hover:border-primary transition-all"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Visual Thumbnail */}
                <div 
                  onClick={() => onSelectProduct(prod)}
                  className="w-full sm:w-32 h-32 flex-shrink-0 bg-surface-container-highest rounded-xl border-2 border-black overflow-hidden bg-black cursor-pointer"
                >
                  <img 
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    src={prod.image}
                  />
                </div>

                {/* Details */}
                <div className="flex-grow flex flex-col justify-between text-left space-y-2">
                  <div 
                    onClick={() => onSelectProduct(prod)}
                    className="cursor-pointer space-y-1"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-display text-lg font-black uppercase text-primary group-hover:text-secondary transition-colors leading-none">
                        {prod.name}
                      </h3>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-neutral-700 bg-black text-on-surface-variant uppercase">
                        {prod.category}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-2">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-display text-xl font-extrabold text-tertiary">
                      €{prod.price.toFixed(2)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectProduct(prod)}
                        className="press-pop bg-surface-container-high hover:bg-neutral-800 text-on-background px-3 py-1.5 border-2 border-black rounded-lg font-mono text-[10px] uppercase font-bold tracking-tighter cursor-pointer"
                      >
                        Personalizar
                      </button>
                      <button
                        onClick={() => onAddToCart(prod, 'M', false, false)}
                        className="press-pop bg-secondary text-on-secondary px-4 py-1.5 border-2 border-black rounded-lg font-mono text-[11px] uppercase font-bold tracking-tighter block-shadow active:translate-y-1 hover:bg-[#a6edff] transition-all cursor-pointer"
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        )}
      </Reveal>

      {/* 5. Promotional Claim Sticker Code */}
      <Reveal as="section" className="py-2">
        <div className="bg-primary-container border-4 border-black p-6 rounded-2xl sticker-rotation-left block-shadow relative overflow-hidden">
          <div className="absolute -top-3 -right-3 animate-ping opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-black text-8xl">celebration</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary font-bold animate-pulse">
                  local_activity
                </span>
                <span className="font-mono text-xs uppercase font-bold text-tertiary tracking-widest">
                  OFERTA STREET
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl text-white uppercase italic tracking-tighter leading-none font-black drop-shadow-[2px_2px_0_#131313]">
                PROMO PACK
              </h3>
              <p className="font-display text-lg md:text-2xl text-secondary-container uppercase font-extrabold tracking-tight mt-1">
                LLEVATE 3 CUBOS Y PAGA 2
              </p>
              <p className="font-sans text-xs text-white/80 mt-1 max-w-md">
                ¡Se aplica de forma automática al Checkout! Llena tu bolsa con tres cubos creados con pasión y el de menor precio te saldrá gratis.
              </p>
            </div>

            <div>
              <button
                onClick={onApplyPromo}
                disabled={promoApplied}
                className={`px-8 py-4 rounded-xl border-4 border-black font-display text-lg font-black uppercase tracking-tight block-shadow transition-all cursor-pointer ${
                  promoApplied
                    ? 'bg-neutral-800 text-neutral-400 border-neutral-600 line-through cursor-not-allowed shadow-none'
                    : 'press-pop bg-black text-primary hover:text-white border-primary-container'
                }`}
              >
                {promoApplied ? 'PROMO ACTIVADA' : 'RECLAMAR OFERTA'}
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 6. Iconic Packaging Banner Showcase */}
      <Reveal as="section" className="py-8 px-5 bg-surface-container rounded-3xl border-4 border-black block-shadow relative overflow-hidden" id="street-packaging">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-12 -translate-y-12">
          <span className="material-symbols-outlined text-[240px] text-secondary">
            brush
          </span>
        </div>

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="text-center space-y-2">
            <span className="font-mono text-tertiary text-xs uppercase tracking-widest bg-black px-3 py-1 rounded">
              LATEST PACK DESIGNS
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-on-background uppercase tracking-tight drop-shadow-[2px_2px_0_#000] pt-2">
              PACKAGING ICONIC
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto">
              Nuestros envases no son basura, son piezas de colección. Diseñados por la comunidad de street-artists locales para que los lleves con orgullo por la ciudad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" id="design-points">
            
            {/* Box Image column with stickers */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary rotate-3 rounded-2xl opacity-10 blur-xl pointer-events-none" />
              <div className="bg-black p-6 rounded-3xl border-4 border-black block-shadow sticker-rotation-left">
                <img 
                  alt="POPS Black Box" 
                  className="w-full h-auto rounded-xl border-4 border-neutral-800 object-cover max-h-[300px]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6BdRJdkaVXd1ZVFYum4CUDvHdNz-6WaE-uoGeyHs-CfyYR0gWdnoiewnyC7cMzcJ9G_WrI-GIVoHXfKkSoWNPlXgWH3gkMmrtB7TOAiXgSLQXuDwXAW8rIncBA-VeSwNYJquEpYnGXc5U890zV_cnqotFYaNzxNIFE-MwssAWb5Mbj-PYwDFRNy_PpH9dZ7Jvh9Ep-_kfkqAefRYS_WKRkdRLuO04ULiBjWqDO-PrOQVedR9X3ttgkjnUv7l_op73xB4OXvvz81E"
                />
                <div className="mt-4 flex flex-wrap justify-between items-center gap-x-3 gap-y-2 font-mono">
                  <span className="shrink-0 whitespace-nowrap text-[10px] text-primary tracking-widest uppercase bg-neutral-900 border border-primary px-2 py-1 rounded">
                    EDICIÓN LIMITADA
                  </span>
                  <span className="text-sm font-black text-tertiary uppercase text-right">
                    STREET BOX x COMUNIDAD
                  </span>
                </div>
              </div>
            </div>

            {/* Explanations Column */}
            <div className="space-y-4">
              
              <div className="bg-background p-4 rounded-xl border-2 border-black block-shadow flex gap-4 items-start hover:scale-[1.02] transition-transform">
                <div className="bg-tertiary p-2 rounded-lg border-2 border-black text-on-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl font-bold">eco</span>
                </div>
                <div className="text-left">
                  <h4 className="font-display text-base font-bold text-primary">Sostenibilidad Urbana</h4>
                  <p className="font-sans text-xs text-on-surface-variant">Materiales 100% reciclables biodegradables y tintas vegetales de soja. Cuidamos el barrio tanto como el sabor.</p>
                </div>
              </div>

              <div className="bg-background p-4 rounded-xl border-2 border-black block-shadow flex gap-4 items-start hover:scale-[1.02] transition-transform">
                <div className="bg-secondary-container p-2 rounded-lg border-2 border-black text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl font-bold">design_services</span>
                </div>
                <div className="text-left">
                  <h4 className="font-display text-base font-bold text-secondary">Street Art Collabs</h4>
                  <p className="font-sans text-xs text-on-surface-variant">Cada trimestre, un graffitero local de Madrid o Berlín rediseña nuestras latas y cajas. Colecciónalas todas.</p>
                </div>
              </div>

              <div className="bg-background p-4 rounded-xl border-2 border-black block-shadow flex gap-4 items-start hover:scale-[1.02] transition-transform">
                <div className="bg-primary-container p-2 rounded-lg border-2 border-black text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </div>
                <div className="text-left">
                  <h4 className="font-display text-base font-bold text-tertiary">Regala el Club</h4>
                  <p className="font-sans text-xs text-on-surface-variant">Nuestros packs de regalo incluyen pegatinas exclusivas de colección y códigos con el link a las playlists secretas del club.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </Reveal>

      {/* 7. Join the Club Newsletter Form */}
      <Reveal as="section" className="py-12 px-4 bg-background relative overflow-hidden rounded-2xl border-4 border-black" id="join-club-section">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffaced 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-block px-5 py-1.5 bg-black border-2 border-primary text-primary font-display font-black text-sm uppercase rounded-full shadow-[0_0_15px_rgba(255,172,237,0.3)] select-none rotate-[2deg]">
            #POPSCLUBFAM
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-black text-on-background uppercase tracking-tight leading-none">
            ÚNETE AL CLUB
          </h2>
          
          <p className="font-sans text-sm md:text-base text-on-surface-variant">
            Acceso exclusivo a nuevos sabores secretos en la ciudad, invitaciones para eventos clandestinos de skate y arte urbano, y códigos de descuento que solo los miembros conocen.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3 sm:space-y-0 sm:flex gap-3">
            <input 
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="TU EMAIL AQUÍ..."
              className="w-full flex-grow bg-surface-container-low border-4 border-black text-on-background font-mono text-xs p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-black block-shadow"
            />
            <button 
              type="submit"
              className="press-pop w-full sm:w-auto bg-tertiary text-on-tertiary font-display font-black text-base px-8 py-3 rounded-xl border-4 border-black block-shadow hover:bg-lime-400 active:translate-y-1 transition-all cursor-pointer whitespace-nowrap"
            >
              ENTRAR
            </button>
          </form>

          <p className="font-mono text-[10px] text-on-surface-variant uppercase">
            Prometemos no ser pesados, solo sabrosos.
          </p>

          <AnimatePresence>
            {emailSubscribed && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black/80 backdrop-blur-md p-4 rounded-xl border-2 border-tertiary inline-block text-tertiary mt-4 font-mono text-xs font-bold"
              >
                🎉 ¡BIENVENIDO LEYENDA! Te acabamos de enviar un mail con tu cupón secreto.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* 8. Bento Social Grid Feed */}
      <Reveal as="section" className="space-y-6">
        <div className="text-left">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">STREET EXCLUSIVES</p>
          <h2 className="font-display text-3xl font-extrabold text-on-background uppercase italic drop-shadow-[2px_2px_0_#000]">
            INSTACRUZ DEL CLUB
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
          
          <div className="aspect-square rounded-2xl border-4 border-black overflow-hidden block-shadow rotate-[-3deg] hover:rotate-0 transition-transform duration-300 relative group">
            <img 
              alt="Social 1" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCumLn0a-NQlgjrXOOP3n9Z6seONgvzl397mXSYbMab_l45I10GygOcX9b4u70kc9s8Jxpi3I3hjFWCrQpYGj0Dz06H9oZ93pLlQTJfgGMpgVXyaXSkXvgz6V09yKu9NcJWJ6dldWhnhF4JKvnulOWKyzQt3g5lCLg-xFtguBDbZqwE2I4qmjm1R9Yd1ZiAD-V6_Dz6M3ny2-OwFOY4TqRstG5L989fXjRjXDkTdlT60rLSdfYpng47oncRTzpintEgFrxg0dpiVSY"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="font-mono text-xs text-white bg-black/80 px-2 py-1 rounded border border-white">#MADRID</span>
            </div>
          </div>

          <div className="aspect-square rounded-2xl border-4 border-black overflow-hidden block-shadow translate-y-3 sm:translate-y-6 hover:translate-y-0 transition-transform duration-300 relative group">
            <img 
              alt="Social 2" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpBoXEz12rOPGiwhwkFw3h3z8je1T-0-u6kZWMgew0BcKMxCi_Z4re4sH0IBgAoVp3pVjHSTyL-zsz8vw_AqOmgUqwvC_80YV7Wigbasr28sos3hpHo6pv7FS2yqoz0Z_5BwSiTSKKGp_9Txi9Tr2v2CXBYoBgTIPnrn9Y65UfSjCrIFROOZpqtpKBvJeC_z17vlcXqtJPOhXv0kScrms8N9SIVQgv7OpR6xZMyI0Q5PPFsggf1wn_rXnW-GiWP97Xku3hexWzcjk"
            />
            <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="font-mono text-xs text-white bg-black/80 px-2 py-1 rounded border border-white">#SKATE</span>
            </div>
          </div>

          <div className="aspect-square rounded-2xl border-4 border-black overflow-hidden block-shadow rotate-[3deg] hover:rotate-0 transition-transform duration-300 relative group">
            <img 
              alt="Social 3" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAaV5R_IuvRBOeRfgeUTpTF5ZZ0JKPVl3xMq0b7XKPg6rfP4eUgmhqKlQgCHxSvmmsYhHEUHVRLjgka3F-o8-wkkNVX7c1lRD7qEgJDE4GvjvzCNHNxrgaDlsmVcAOyVju2lDn0brjpYOtHaYjqtW4W0Uk2rsPo6MCk9x7kS5HhD_k2rfj-uDJw0dlaXEmJDBOLv096a-AYr5dajHMaiKfsAMBfW89ds6s_VmrMpiBxY7v3Ziovw8X68fcGi_GLMAuiDrvFRqWrk4"
            />
            <div className="absolute inset-0 bg-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="font-mono text-xs text-white bg-black/80 px-2 py-1 rounded border border-white">#GRAFFITI</span>
            </div>
          </div>

          <div className="aspect-square rounded-2xl border-4 border-black overflow-hidden block-shadow -translate-y-3 sm:-translate-y-6 hover:translate-y-0 transition-transform duration-300 relative group">
            <img 
              alt="Social 4" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT_ZsAxgbEJPSm2f15vLC0GZy6VKv3-zavoxiHc4otZwenvjU41BQSjMr7XwwGghHxZlpU7QOMtUtdhnYzLijSl-m8lU4J6DOhE1Llpd9STgRpNR2UsGTaXQXj133EZ9fNow07TZukHKpM_FIZPkB_t8uokUPfyGE8SymcNt7h06cDJboFXSWZRIFybaB_58v734WkcrZaNB7wLlqWJihM622jdWbwql3ANcu5naurQKlqD5U1khp2ZflBBIYPe2QsrZepxsyu58Y"
            />
            <div className="absolute inset-0 bg-[#000]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="font-mono text-xs text-white bg-black/80 px-2 py-1 rounded border border-white">#STREETSTYLE</span>
            </div>
          </div>

        </div>
      </Reveal>

      {/* 9. Footers identical to specification */}
      <Reveal as="footer" className="bg-surface-container-highest pt-16 pb-10 rounded-t-3xl border-t-8 border-black">
        <div className="px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
            
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <img
                  alt="POPS CLUB Logo"
                  className="h-24 w-auto"
                  src={logoUrl}
                />
              </div>
              
              <p className="font-sans text-sm text-on-surface-variant max-w-sm">
                La revolución de las palomitas premium ha llegado. No es solo comida de cine, es cultura urbana y energía adictiva en cada bocado.
              </p>
              
              <div className="flex gap-4">
                {[
                  { icon: 'alternate_email', border: 'border-primary', text: 'text-primary' },
                  { icon: 'share', border: 'border-secondary', text: 'text-secondary' },
                  { icon: 'public', border: 'border-tertiary', text: 'text-tertiary' }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href="#logo-container" 
                    className={`w-12 h-12 bg-black border-2 ${social.border} ${social.text} rounded-xl flex items-center justify-center hover:scale-110 active:translate-y-1 block-shadow cursor-pointer`}
                  >
                    <span className="material-symbols-outlined">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs text-on-background uppercase tracking-widest mb-6">
                Explora
              </h4>
              <ul className="space-y-3 font-sans text-xs text-on-surface-variant">
                <li><a onClick={() => setActiveTab('flavors')} className="inline-block hover:text-primary hover:translate-x-1 transition-all cursor-pointer">Nuestros Sabores</a></li>
                <li><a onClick={() => {
                  const el = document.getElementById('street-packaging');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }} className="inline-block hover:text-primary hover:translate-x-1 transition-all cursor-pointer">Packaging</a></li>
                <li><a className="inline-block hover:text-primary hover:translate-x-1 transition-all cursor-pointer opacity-70">Ubicaciones (Madrid/Barcelona)</a></li>
                <li><a className="inline-block hover:text-primary hover:translate-x-1 transition-all cursor-pointer opacity-70">Shop Online</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-on-background uppercase tracking-widest mb-6">
                Soporte
              </h4>
              <ul className="space-y-3 font-sans text-xs text-on-surface-variant">
                <li><a className="inline-block hover:text-primary hover:translate-x-1 transition-all cursor-pointer opacity-70">Envíos</a></li>
                <li><a className="inline-block hover:text-primary hover:translate-x-1 transition-all cursor-pointer opacity-70">Contacto</a></li>
                <li><a className="inline-block hover:text-primary hover:translate-x-1 transition-all cursor-pointer opacity-70">Preguntas Frecuentes</a></li>
                <li><a className="inline-block hover:text-primary hover:translate-x-1 transition-all cursor-pointer opacity-70">Privacidad & Términos</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="font-mono text-[10px] text-on-surface-variant uppercase">
              © 2026 POPS CLUB. HECHO CON PASIÓN, ARTE CALLEJERO Y AZÚCAR.
            </p>
            <div className="flex gap-6 font-mono text-[10px] text-on-surface-variant uppercase">
              <a href="#logo-container" className="hover:underline">TÉRMINOS</a>
              <a href="#logo-container" className="hover:underline">POLÍTICA DE COOKIES</a>
            </div>
          </div>

        </div>
      </Reveal>

    </div>
  );
}
