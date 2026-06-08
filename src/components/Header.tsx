/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import logoUrl from '@/assets/logo.png';

interface HeaderProps {
  /** Página activa, para resaltar la opción actual. */
  page: 'home' | 'unete';
  /** Ir al inicio (logo / opción Home). */
  onHome: () => void;
  /** Ir a la página "Únete" (formulario de contacto). */
  onJoinClub: () => void;
}

export default function Header({ page, onHome, onJoinClub }: HeaderProps) {
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

        {/* Opciones del header: Home + Únete (visibles en todos los tamaños) */}
        <div className="flex gap-3 sm:gap-5 items-center" id="header-nav">
          <button
            onClick={onHome}
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer ${
              page === 'home'
                ? 'text-tertiary border-b-2 border-tertiary pb-1 scale-105'
                : 'text-on-background hover:text-secondary hover:scale-105'
            }`}
          >
            Home
          </button>

          <button
            onClick={onJoinClub}
            className={`press-pop flex items-center gap-2 font-mono text-xs uppercase font-bold px-4 py-2 border-2 border-black rounded-lg block-shadow transition-all cursor-pointer ${
              page === 'unete'
                ? 'bg-tertiary text-on-tertiary'
                : 'bg-primary-container text-on-primary-container hover:bg-[#ff55eb]'
            }`}
          >
            <span>Únete</span>
            <span className="material-symbols-outlined text-sm font-bold">favorite</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
