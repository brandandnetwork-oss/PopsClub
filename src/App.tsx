/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

import { Product } from './types';

import Header from './components/Header';
import FeedView from './components/FeedView';
import CustomizerView from './components/CustomizerView';
import UneteView from './components/UneteView';
import CustomCursor from './components/CustomCursor';
import PopcornRain from './components/PopcornRain';

type Page = 'home' | 'unete';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  // En la home, abrir la ficha de un producto.
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * Vuelve a la home (cerrando la ficha de producto) y desplaza a una sección.
   * Sin `id` sube arriba del todo.
   */
  const goHome = (id?: string) => {
    setPage('home');
    setSelectedProduct(null);
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Esperamos un tick a que la home vuelva a montarse si veníamos de otra vista.
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  /** Abre la página "Únete" (formulario de contacto). */
  const goUnete = () => {
    setPage('unete');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans relative">

      {/* Cursor personalizado de la marca (palomita) — global, solo con ratón */}
      <CustomCursor />

      {/* Lluvia de palomitas por los laterales al hacer scroll / deslizar */}
      <PopcornRain />

      <Header
        onHome={() => goHome()}
        onSabores={() => goHome('sabores-completo')}
        onJoinClub={goUnete}
      />

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-[calc(100vh-160px)]">
        {page === 'unete' ? (
          <UneteView onBack={() => goHome()} />
        ) : selectedProduct ? (
          <CustomizerView
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onJoinClub={goUnete}
          />
        ) : (
          <FeedView onSelectProduct={setSelectedProduct} onJoinClub={goUnete} />
        )}
      </main>

    </div>
  );
}
