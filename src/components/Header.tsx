/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenProfile
}: HeaderProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black bg-background shadow-[0_4px_0_0_#000]">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('feed')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="logo-container"
        >
          <img 
            alt="POPS CLUB Logo" 
            className="h-10 w-auto group-hover:scale-110 active:scale-95 transition-all duration-200" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArHR_FToh77xVaH190LrgEcnQqMf31hQ2vZ2ETrc6SiRasxPr97030G5V1klXOao1zRhbJrXQMwgyRxNa5jTGso9em8IWNBSIv_Nnk6sAjhwBwSIL6XnJ1MAI9xuRyneLWbsZffxATFJxH-azAPvwKyXhy3x6tpt4MZ8dEiKgP-in2ff7LKG28QiXfKE2VQI58ZpRt10cPg9nankco9pPlSlJMY7JIJoccOhOAztL551u7OAgxmhFCNguFBgbNUu7Ol6w_b3WqqG8"
          />
          <span className="font-display text-2xl md:text-3xl font-black text-primary italic tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,1)] group-hover:text-secondary transition-colors duration-200">
            POPS CLUB
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center" id="desktop-menu">
          {[
            { id: 'feed', label: 'Feed' },
            { id: 'flavors', label: 'Flavors' },
            { id: 'rewards', label: 'Rewards' }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                activeTab === link.id
                  ? 'text-tertiary border-b-2 border-tertiary pb-1 scale-105'
                  : 'text-on-background hover:text-secondary hover:scale-105'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Global Cart & Member Actions */}
        <div className="flex gap-3 items-center" id="header-action-container">
          {/* User Account Button */}
          <button 
            onClick={onOpenProfile}
            className="p-1 hover:scale-115 active:scale-90 transition-transform text-primary cursor-pointer flex items-center justify-center"
            id="btn-header-profile"
            aria-label="Perfil de usuario"
          >
            <span className="material-symbols-outlined text-3xl font-bold">
              account_circle
            </span>
          </button>

          {/* Cart Icon Button with Badges */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-primary-container text-on-primary-container font-mono text-xs uppercase font-bold px-4 py-2 border-2 border-black rounded-lg block-shadow active:translate-y-1 hover:bg-[#ff55eb] transition-all cursor-pointer"
            id="btn-header-cart"
          >
            <span className="hidden sm:inline">Carrito</span>
            <span className="material-symbols-outlined text-sm font-bold sm:hidden">
              shopping_cart
            </span>
            <AnimatePresence mode="popLayout">
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-tertiary text-on-tertiary text-[10px] w-5 h-5 rounded-full border border-black flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

      </div>
    </nav>
  );
}
