/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import logoUrl from '@/assets/logo.png';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProfile: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
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
            className="h-12 md:h-14 w-auto group-hover:scale-110 active:scale-95 transition-all duration-200"
            src={logoUrl}
          />
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

        {/* Header actions */}
        <div className="flex gap-3 items-center" id="header-action-container">
          {/* User Account / Rewards Button */}
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

          {/* Join Club CTA */}
          <button
            onClick={() => {
              setActiveTab('feed');
              setTimeout(() => {
                document.getElementById('join-club-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 80);
            }}
            className="press-pop flex items-center gap-2 bg-primary-container text-on-primary-container font-mono text-xs uppercase font-bold px-4 py-2 border-2 border-black rounded-lg block-shadow hover:bg-[#ff55eb] transition-all cursor-pointer"
          >
            <span className="hidden sm:inline">Únete</span>
            <span className="material-symbols-outlined text-sm font-bold">
              favorite
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
}
