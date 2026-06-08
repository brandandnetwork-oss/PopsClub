/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

import { Product } from './types';

import Header from './components/Header';
import FeedView from './components/FeedView';
import CustomizerView from './components/CustomizerView';
import CustomCursor from './components/CustomCursor';
import PopcornRain from './components/PopcornRain';

export default function App() {
  // Única landing page. Lo único "navegable" es abrir la ficha de un producto.
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * Cierra la ficha de producto (si está abierta) y desplaza a una sección de
   * la landing. Sin `id` vuelve arriba del todo.
   */
  const goToSection = (id?: string) => {
    setSelectedProduct(null);
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Esperamos un tick a que la landing vuelva a montarse si veníamos de la ficha.
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans relative">

      {/* Cursor personalizado de la marca (palomita) — global, solo con ratón */}
      <CustomCursor />

      {/* Lluvia de palomitas por los laterales al hacer scroll / deslizar */}
      <PopcornRain />

      <Header
        onHome={() => goToSection()}
        onSabores={() => goToSection('sabores-completo')}
        onJoinClub={() => goToSection('join-club-section')}
      />

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-[calc(100vh-160px)]">
        {selectedProduct ? (
          <CustomizerView
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onJoinClub={() => goToSection('join-club-section')}
          />
        ) : (
          <FeedView onSelectProduct={setSelectedProduct} />
        )}
      </main>

    </div>
  );
}
