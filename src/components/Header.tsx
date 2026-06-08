/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import logoUrl from '@/assets/logo.png';

interface HeaderProps {
  /** Volver al inicio (logo / enlace Home). */
  onHome: () => void;
  /** Desplazar a la sección de sabores. */
  onSabores: () => void;
  /** Desplazar al formulario "Únete al Club". */
  onJoinClub: () => void;
}

export default function Header({ onHome, onSabores, onJoinClub }: HeaderProps) {
  const navLinks = [
    { label: 'Home', onClick: onHome },
    { label: 'Sabores', onClick: onSabores },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black bg-background shadow-[0_4px_0_0_#000]">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto">

        {/* Brand Logo */}
        <div
          onClick={onHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="logo-container"
        >
          <img
            alt="POPS CLUB Logo"
            className="h-12 md:h-14 w-auto group-hover:scale-110 active:scale-95 transition-all duration-200"
            src={logoUrl}
          />
        </div>

        {/* Desktop Navigation Links (anclas de la propia landing) */}
        <div className="hidden md:flex gap-8 items-center" id="desktop-menu">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="font-mono text-xs uppercase tracking-widest text-on-background hover:text-secondary hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Join Club CTA */}
        <button
          onClick={onJoinClub}
          className="press-pop flex items-center gap-2 bg-primary-container text-on-primary-container font-mono text-xs uppercase font-bold px-4 py-2 border-2 border-black rounded-lg block-shadow hover:bg-[#ff55eb] transition-all cursor-pointer"
        >
          <span className="hidden sm:inline">Únete</span>
          <span className="material-symbols-outlined text-sm font-bold">favorite</span>
        </button>

      </div>
    </nav>
  );
}
