/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, PopBadge, PastOrder, Product } from '../types';
import { PRODUCTS } from '../data';
import {
  Reveal,
  RevealStagger,
  RevealItem,
  AnimatedCounter,
  AnimatedProgressBar,
} from './anim';

interface ProfileViewProps {
  profile: UserProfile;
  badges: PopBadge[];
  pastOrders: PastOrder[];
  onUpdatePoints: (newPoints: number) => void;
  onReorder: (orderDescription: string) => void;
  onSetProfileName: (newName: string) => void;
}

export default function ProfileView({
  profile,
  badges,
  pastOrders,
  onUpdatePoints,
  onReorder,
  onSetProfileName
}: ProfileViewProps) {
  const [showQR, setShowQR] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [selectedBadge, setSelectedBadge] = useState<PopBadge | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      onSetProfileName(editName.trim());
      setShowEdit(false);
    }
  };

  return (
    <div className="space-y-8 max-w-[620px] mx-auto text-left pb-16">
      
      {/* 1. Header Profile segment */}
      <Reveal as="header" className="relative flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8 bg-surface-container rounded-3xl border-4 border-black block-shadow-lg">
        {/* Avatar with Crown sticker */}
        <div className="relative">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-black overflow-hidden bg-primary block-shadow relative">
            <img 
              alt="User Profile avatar de Leo" 
              className="w-full h-full object-cover" 
              src={profile.avatar}
            />
          </div>
          <div className="absolute -top-4 -right-2 transform rotate-12 select-none">
            <span className="material-symbols-outlined text-tertiary text-5xl drop-shadow-[2px_2px_0_#000]" style={{ fontVariationSettings: "'FILL' 1" }}>
              crown
            </span>
          </div>
        </div>

        <div className="text-center sm:text-left flex-1 space-y-1">
          <h1 className="font-display text-2xl sm:text-4xl font-black italic uppercase tracking-tighter text-primary">
            {profile.tier}: {profile.name}
          </h1>
          <p className="font-mono text-xs text-secondary uppercase tracking-widest">
            MEMBER SINCE {profile.memberSince}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setShowEdit(true)}
          className="press-pop bg-tertiary hover:bg-lime-400 text-on-tertiary px-6 py-2.5 rounded-xl border-4 border-black block-shadow active:translate-y-1 font-mono text-xs uppercase font-bold cursor-pointer"
        >
          Edit Profile
        </button>
      </Reveal>

      {/* 2. Interactive Loyalty Card section */}
      <Reveal className="bg-primary-container p-6 sm:p-8 rounded-3xl border-4 border-black block-shadow relative overflow-hidden flex flex-col justify-between">
        
        {/* Sparks background ornament decoration */}
        <div className="absolute -top-6 -right-6 opacity-25 select-none pointer-events-none">
          <span className="material-symbols-outlined text-white text-[120px]">
            auto_awesome
          </span>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-white uppercase italic font-bold drop-shadow-[2px_2px_0_#131313]">
                Pops Points
              </h2>
              <div className="flex items-baseline gap-2">
                <AnimatedCounter
                  value={profile.points}
                  className="font-display text-5xl sm:text-7xl font-black text-white drop-shadow-[4px_4px_0_0_#131313]"
                />
                <span className="font-mono text-[10px] text-white uppercase opacity-90 font-bold">
                  XP EARNED
                </span>
              </div>
            </div>

            <div className="bg-black text-primary px-3 py-1.5 rounded-lg border-2 border-primary font-mono text-[9px] uppercase font-bold tracking-widest sticker-rotation-right select-none">
              ELITE STATUS
            </div>
          </div>

          {/* Dripping Paint Progress Bar widget */}
          <div className="space-y-3">
            <div className="flex justify-between items-end font-mono text-[11px] text-white uppercase font-bold">
              <span>PROGRESO AL PRÓXIMO CUBO GRATIS</span>
              <span className="tracking-widest">750 / 1000 PT</span>
            </div>
            
            <div className="h-8 w-full bg-black rounded-lg border-2 border-black overflow-hidden relative">
              <AnimatedProgressBar percent={75} className="h-full bg-tertiary relative">
                {/* Simulated dripping progress edge */}
                <div className="absolute right-0 top-0 h-full w-4 bg-tertiary overflow-visible">
                  <div className="absolute top-full left-0 w-2 h-4 bg-tertiary rounded-b-full"></div>
                  <div className="absolute top-full left-2 w-1.5 h-2.5 bg-tertiary rounded-b-full"></div>
                </div>
              </AnimatedProgressBar>
            </div>
            <p className="font-sans text-xs text-white italic">
              "¡Solo te faltan 250 puntos para conseguir tu Cubo de Madrid Caramel gratis!"
            </p>
          </div>
        </div>

        {/* Action controls inside the card */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button 
            onClick={() => setShowQR(true)}
            className="press-pop flex-shrink-0 bg-secondary hover:bg-[#aef5ff] text-on-secondary px-5 py-3 rounded-xl border-4 border-black block-shadow font-mono text-xs uppercase tracking-tight font-black flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">qr_code_2</span>
            Scan in Store
          </button>
          
          <button 
            onClick={() => {
              onUpdatePoints(profile.points + 250);
              // micro reward trigger points
            }}
            className="press-pop flex-shrink-0 bg-black text-primary hover:text-white px-5 py-3 rounded-xl border-4 border-black block-shadow font-mono text-xs uppercase tracking-tight font-black flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">redeem</span>
            Claim Code (+250 XP)
          </button>
        </div>

      </Reveal>

      {/* 3. POP BADGES Collection */}
      <Reveal className="bg-surface-container-high p-6 rounded-3xl border-4 border-black block-shadow flex flex-col">
        <h3 className="font-display text-2xl text-tertiary italic uppercase font-extrabold mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
            stars
          </span>
          Pop Badges
        </h3>

        <RevealStagger className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((badge) => (
            <RevealItem
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.96 }}
              className={`group flex flex-col items-center justify-center p-4 bg-background border-2 rounded-xl block-shadow transition-all cursor-pointer ${
                badge.unlocked
                  ? 'border-black opacity-100'
                  : 'border-neutral-800 border-dashed opacity-55'
              }`}
            >
              <div className={`text-4xl mb-2 group-hover:scale-115 transition-transform ${
                badge.unlocked
                  ? badge.color === 'primary' ? 'text-primary' : badge.color === 'secondary' ? 'text-secondary' : 'text-tertiary'
                  : 'text-neutral-700'
              }`}>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: badge.unlocked ? "'FILL' 1" : "'FILL' 0" }}>
                  {badge.icon}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase text-center font-bold text-on-surface line-clamp-1">
                {badge.name}
              </span>
            </RevealItem>
          ))}
        </RevealStagger>

        <button
          onClick={() => {
            alert("¡Seguiremos añadiendo insignias con cada colaboración mensual de street art!");
          }}
          className="mt-5 w-full text-secondary font-mono text-[10px] uppercase tracking-widest text-center hover:underline cursor-pointer"
        >
          Ver todas las 24 insignias del club
        </button>
      </Reveal>

      {/* 4. PAST ORDER HISTORY LIST */}
      <Reveal className="space-y-4">
        <div className="flex items-end justify-between px-2">
          <h3 className="font-display text-2xl text-on-background italic uppercase font-extrabold">
            Historial de Pedidos
          </h3>
          <span className="font-mono text-[10px] text-primary uppercase font-bold">
            últimos 3 meses
          </span>
        </div>

        <RevealStagger className="space-y-3">
          {pastOrders.map((order) => (
            <RevealItem
              key={order.id}
              whileHover={{ x: 6 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-surface-container border-4 border-black rounded-2xl block-shadow transition-transform text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-black border-2 border-primary rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    alt={order.itemsDescription}
                    className="w-full h-full object-cover opacity-85" 
                    src={order.image}
                  />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-black text-on-surface">
                    {order.itemsDescription}
                  </h4>
                  <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-tight">
                    {order.date} • {order.id}
                  </p>
                </div>
              </div>

              <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-6 sm:pl-4">
                <div className="text-left sm:text-right">
                  <span className="block font-display text-lg font-black text-tertiary">
                    €{order.totalPrice.toFixed(2)}
                  </span>
                  <span className="font-mono text-[10px] text-secondary uppercase font-bold">
                    +{order.pointsAwarded} PTS
                  </span>
                </div>
                
                <button
                  onClick={() => onReorder(order.itemsDescription)}
                  className="press-pop bg-black hover:bg-neutral-800 text-white p-2 border-2 border-white rounded-lg active:scale-95 transition-all text-xs font-mono uppercase font-black cursor-pointer flex items-center gap-1.5"
                  title="Pedir de nuevo"
                >
                  <span className="material-symbols-outlined text-sm font-bold">
                    cycle
                  </span>
                  Reorder
                </button>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </Reveal>

      {/* 5. MODAL OVERLAYS */}
      <AnimatePresence>
        {/* QR Scanner modal popup */}
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface-container border-4 border-black rounded-3xl p-6 md:p-8 max-w-sm w-full text-center space-y-6 block-shadow-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
                  VIP PASS ACTIVE
                </span>
                <button 
                  onClick={() => setShowQR(false)}
                  className="text-white hover:text-primary font-mono text-xs cursor-pointer"
                >
                  [ X ] Cerrar
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl text-tertiary uppercase font-black italic tracking-tight">
                  ESCANEAR EN TIENDA
                </h3>
                <p className="font-sans text-xs text-on-surface-variant">
                  Enseña este código VIP en nuestros locales de Madrid o Barcelona para acumular puntos o canjear tus cubos gratis.
                </p>
              </div>

              {/* Barcode/QR wrapper */}
              <div className="bg-white p-4 rounded-2xl inline-block border-4 border-black block-shadow relative group">
                <div className="h-44 w-44 flex items-center justify-center bg-white">
                  {/* Real, highly rendered scanning QR element */}
                  <div className="relative">
                    <img
                      alt="POPS CLUB QR PASS"
                      className="w-40 h-40 object-contain"
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=POPSCLUB-VIP-LEOJ&color=131313&bgcolor=ffffff"
                    />
                  </div>
                </div>
              </div>

              <p className="font-mono text-[10px] text-primary uppercase font-bold animate-pulse">
                ID DE CLIENTE: LEOJ-92212
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Profile Editing modal */}
        {showEdit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface-container border-4 border-black rounded-3xl p-6 max-w-sm w-full text-left space-y-6 block-shadow-lg"
            >
              <h3 className="font-display text-xl text-primary font-black uppercase italic">
                Editar Perfil VIP
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase text-on-surface-variant font-bold block">
                    Nombre del VIP
                  </label>
                  <input 
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Escribe tu alias..."
                    className="w-full bg-background border-2 border-black text-on-background font-mono text-xs p-3.5 rounded-xl focus:ring-2 focus:ring-primary focus:border-black block-shadow"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="px-4 py-2 hover:bg-neutral-800 rounded-lg text-xs font-mono uppercase text-white cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-tertiary text-on-tertiary px-5 py-2.5 rounded-xl border-2 border-black block-shadow font-mono text-xs uppercase font-bold cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Individual Badge Details Explanation Pop Up */}
        {selectedBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface-container border-4 border-black rounded-3xl p-6 max-w-sm w-full text-center space-y-5 block-shadow-lg"
            >
              <div className="flex justify-center text-5xl">
                <span className={`material-symbols-outlined text-5xl ${
                  selectedBadge.unlocked
                    ? selectedBadge.color === 'primary' ? 'text-primary' : selectedBadge.color === 'secondary' ? 'text-secondary' : 'text-tertiary'
                    : 'text-neutral-700'
                }`} style={{ fontVariationSettings: selectedBadge.unlocked ? "'FILL' 1" : "'FILL' 0" }}>
                  {selectedBadge.icon}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl text-white font-extrabold uppercase">
                  {selectedBadge.name}
                </h3>
                <span className={`font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded border inline-block ${
                  selectedBadge.unlocked ? 'border-tertiary text-tertiary bg-tertiary/10' : 'border-neutral-700 text-neutral-400 bg-neutral-900'
                }`}>
                  {selectedBadge.unlocked ? 'DESBLOQUEADO' : 'BLOQUEADO'}
                </span>
              </div>

              <p className="font-sans text-xs text-on-surface-variant">
                {selectedBadge.description}
              </p>

              <button
                onClick={() => setSelectedBadge(null)}
                className="bg-black hover:bg-neutral-800 text-white w-full py-2.5 rounded-xl border-2 border-black font-mono text-xs uppercase cursor-pointer"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
