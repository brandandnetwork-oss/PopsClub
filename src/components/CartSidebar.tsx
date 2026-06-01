/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSetCartItems: (updatedItems: CartItem[]) => void;
  onQuantityChange: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  promoApplied: boolean;
  onApplyPromo: () => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onSetCartItems,
  onQuantityChange,
  onRemoveItem,
  promoApplied,
  onApplyPromo,
  onClearCart
}: CartSidebarProps) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<{ id: string; total: number; refund: number } | null>(null);

  // Totals calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  
  // Calculate Promo Pack 3-for-2 Discount
  // If promo is applied and we have 3 or more cubos, the cheapest item is completely free!
  let discount = 0;
  let totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  if (promoApplied && totalQuantity >= 3) {
    // Collect all prices of items in flat array
    const flatPrices: number[] = [];
    cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        flatPrices.push(item.totalPrice);
      }
    });
    // Sort ascendingly and get the cheapest one
    flatPrices.sort((a, b) => a - b);
    discount = flatPrices[0] || 0;
  }

  const finalTotal = Math.max(0, subtotal - discount);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Generate simulated order receipt parameters
    const randomId = 'POPS-' + Math.floor(1000 + Math.random() * 9000);
    setSuccessReceipt({
      id: randomId,
      total: Number(finalTotal.toFixed(2)),
      refund: Number(discount.toFixed(2))
    });
    setCheckoutSuccess(true);
  };

  const handleSuccessClose = () => {
    setCheckoutSuccess(false);
    setSuccessReceipt(null);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80] cursor-pointer"
          />

          {/* Right-Hand Sidebar wrapper */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[460px] bg-background border-l-4 border-black z-[90] flex flex-col justify-between shadow-[2px_0_15px_rgba(0,0,0,0.5)]"
          >
            {/* Sidebar header banner */}
            <div className="p-5 border-b-4 border-black bg-surface-container flex justify-between items-center text-left">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary font-bold">
                  shopping_bag
                </span>
                <span className="font-display text-xl font-black uppercase text-primary italic">
                  Tu Bolsa ({totalQuantity})
                </span>
              </div>
              <button 
                onClick={onClose}
                className="text-on-surface-variant hover:text-white font-mono text-xs cursor-pointer bg-black/40 px-3 py-1.5 border border-neutral-700 rounded-md"
              >
                [ Cerrar ]
              </button>
            </div>

            {/* Sidebar scrolling item list content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <span className="material-symbols-outlined text-6xl text-neutral-600 animate-pulse">
                    production_quantity_limits
                  </span>
                  <p className="font-mono text-xs uppercase text-on-surface-variant tracking-wider font-bold">
                    TU BOLSA ESTÁ VACÍA
                  </p>
                  <p className="font-sans text-xs text-neutral-500 max-w-xs mx-auto">
                    ¡Explora nuestros sabores premium y personaliza tu propio cubo con el mejor chocolate y caramelo!
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-block bg-primary text-black font-mono text-xs uppercase tracking-tight py-2.5 px-6 border-2 border-black rounded-lg block-shadow active:translate-y-1 font-bold cursor-pointer"
                  >
                    Elegir Sabores
                  </button>
                </div>
              ) : (
                <div className="space-y-3" id="cart-items-list-block">
                  {cartItems.map((item) => (
                    <div 
                      key={item.cartId} 
                      className="bg-surface-container-low border-2 border-black p-4 rounded-xl flex gap-3 relative block-shadow text-left"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-lg border border-black overflow-hidden bg-black flex-shrink-0">
                        <img 
                          alt={item.product.name} 
                          className="w-full h-full object-cover" 
                          src={item.product.image}
                        />
                      </div>

                      {/* Content column details */}
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-display text-sm font-black uppercase text-on-background line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button 
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-neutral-500 hover:text-red-400 cursor-pointer"
                            title="Quitar item"
                          >
                            <span className="material-symbols-outlined text-sm font-bold">
                              delete
                            </span>
                          </button>
                        </div>

                        {/* Custom attributes metadata */}
                        <div className="flex flex-wrap gap-1 font-mono text-[9px] text-on-surface-variant uppercase">
                          <span className="bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                            Tamaño: {item.selectedSize}
                          </span>
                          {item.extraWarmCaramel && (
                            <span className="bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 text-tertiary">
                              + Caramel Drip
                            </span>
                          )}
                          {item.extraCookies && (
                            <span className="bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 text-tertiary">
                              + Cookies Drip
                            </span>
                          )}
                        </div>

                        {/* Quantity Counter & Price modifiers */}
                        <div className="flex justify-between items-center pt-2">
                          <span className="font-display text-base font-bold text-secondary">
                            €{(item.totalPrice * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2.5 bg-background px-2.5 py-1 rounded-lg border border-neutral-800">
                            <button 
                              onClick={() => onQuantityChange(item.cartId, -1)}
                              className="text-primary hover:text-white font-black text-sm cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs text-white font-bold select-none min-w-[12px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => onQuantityChange(item.cartId, 1)}
                              className="text-primary hover:text-white font-black text-sm cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price calculation block at bottom */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t-4 border-black bg-surface-container space-y-4">
                
                {/* 3-for-2 Promo reminder status block */}
                {!promoApplied ? (
                  <div className="bg-black/40 p-3 rounded-xl border border-dashed border-primary flex justify-between items-center text-left">
                    <div className="space-y-0.5">
                      <p className="font-mono text-[10px] text-primary uppercase font-bold tracking-tight">
                        ¿TIENES EL CUPÓN PROMO?
                      </p>
                      <p className="font-sans text-[10px] text-neutral-400">
                        Aplica la promo 3-for-2 para conseguir tu cubo más barato gratis.
                      </p>
                    </div>
                    <button
                      onClick={onApplyPromo}
                      className="bg-primary hover:bg-[#ff86ed] text-black font-mono text-[9px] uppercase font-bold px-3 py-1.5 rounded-lg border border-black cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                ) : (
                  <div className="bg-tertiary/10 p-3 rounded-xl border border-tertiary text-left flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary animate-pulse font-bold">
                      check_circle
                    </span>
                    <div className="text-left font-mono text-[10px] text-tertiary font-bold uppercase">
                      PROMO PACK 3-FOR-2 ACTIVO! {totalQuantity < 3 && `(Agrega ${3 - totalQuantity} cubo/s más para activar el descuento)`}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 font-mono text-xs text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-tertiary font-bold">
                      <span>Descuento Promo 3-for-2</span>
                      <span>-€{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Envíos / Tasas</span>
                    <span className="text-tertiary tracking-widest font-bold font-mono">GRATIS</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-neutral-800 text-on-background">
                    <span className="font-display font-black text-sm uppercase">Total</span>
                    <span className="font-display text-2xl font-black text-primary">
                      €{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Primary Button action */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-tertiary text-on-tertiary font-display font-black text-base tracking-tight uppercase py-4 rounded-xl border-4 border-black block-shadow hover:bg-lime-400 active:translate-y-1 duration-150 transition-all flex items-center justify-center gap-3 cursor-pointer"
                  id="btn-sidebar-checkout"
                >
                  <span>Pagar Pedido</span>
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shopping_cart_checkout
                  </span>
                </button>
              </div>
            )}

          </motion.div>

          {/* Checkout success sticker popover */}
          <AnimatePresence>
            {checkoutSuccess && successReceipt && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4"
              >
                <motion.div 
                  initial={{ scale: 0.85, rotate: -2 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.85, rotate: -2 }}
                  className="bg-surface-container border-4 border-black p-6 md:p-8 rounded-3xl max-w-sm w-full text-center space-y-6 block-shadow-lg text-left"
                >
                  <div className="flex justify-center text-6xl text-tertiary select-none">
                    <span className="material-symbols-outlined text-7xl font-bold animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest bg-black px-3 py-1 rounded sticker-rotation-right inline-block">
                      PEDIDO RECIBIDO!
                    </span>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic tracking-tighter text-white pt-3">
                      #POPSCLUBFAM
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant">
                      ¡Acabas de unirte oficialmente a los reyes del sabor! Tus cubos premium se están preparando con azúcar, chocolate y trufa para ser enviados inmediatamente a tu domicilio.
                    </p>
                  </div>

                  {/* Receipt items container */}
                  <div className="bg-black p-4 rounded-xl border-2 border-neutral-800 font-mono text-[11px] space-y-2 text-on-surface-variant text-left">
                    <div className="flex justify-between">
                      <span>CÓDIGO DE PEDIDO:</span>
                      <span className="text-white font-bold">{successReceipt.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ESTADO:</span>
                      <span className="text-tertiary font-bold uppercase">PREPARANDO DRIP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MODO ENTREGA:</span>
                      <span className="text-white">STREET DELIVERY</span>
                    </div>
                    {successReceipt.refund > 0 && (
                      <div className="flex justify-between text-tertiary">
                        <span>OFERTA RECUPERADA:</span>
                        <span>-€{successReceipt.refund.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-neutral-800 pt-2 flex justify-between text-sm text-primary font-bold">
                      <span>TOTAL PAGADO:</span>
                      <span>€{successReceipt.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Micro interaction closing claim code */}
                  <button
                    onClick={handleSuccessClose}
                    className="w-full bg-primary text-on-primary font-mono text-xs uppercase tracking-widest font-black py-3 rounded-xl border-2 border-black block-shadow hover:bg-secondary hover:text-black cursor-pointer"
                  >
                    Seguir Comprando
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
