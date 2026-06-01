/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Data and types
import { Product, CartItem, UserProfile, PopBadge, PastOrder } from './types';
import { PRODUCTS, INITIAL_PROFILE, INITIAL_BADGES, INITIAL_ORDERS } from './data';

// Subcomponents
import Header from './components/Header';
import FeedView from './components/FeedView';
import CustomizerView from './components/CustomizerView';
import ProfileView from './components/ProfileView';
import CartSidebar from './components/CartSidebar';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('feed'); // feed, flavors, rewards
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Profile & loyalty state
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [badges, setBadges] = useState<PopBadge[]>(INITIAL_BADGES);
  const [pastOrders, setPastOrders] = useState<PastOrder[]>(INITIAL_ORDERS);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Add customized/standard items to cart
  const handleAddToCart = (
    product: Product,
    size: 'S' | 'M' | 'L' = 'M',
    extraWarm: boolean = false,
    extraCookies: boolean = false
  ) => {
    // Generate unique composite run-time key for cart combinations
    const cartId = `${product.id}-${size}-${extraWarm ? 'w' : 'x'}-${extraCookies ? 'c' : 'x'}`;
    
    // Calculate single price
    let itemPrice = product.price;
    if (size === 'S') itemPrice -= 1.00;
    if (size === 'L') itemPrice += 1.50;
    if (extraWarm) itemPrice += 1.50;
    if (extraCookies) itemPrice += 1.50;

    const existingIndex = cartItems.findIndex((item) => item.cartId === cartId);
    let updatedCart = [...cartItems];

    if (existingIndex > -1) {
      // Stack quantities
      updatedCart[existingIndex].quantity += 1;
      triggerToast(`¡Añadido otro cubo de ${product.name} al carrito!`);
    } else {
      // Add custom unique combo
      const newItem: CartItem = {
        cartId,
        product,
        selectedSize: size,
        extraWarmCaramel: extraWarm,
        extraCookies: extraCookies,
        quantity: 1,
        totalPrice: Number(itemPrice.toFixed(2))
      };
      updatedCart.push(newItem);
      triggerToast(`🛍️ ¡${product.name} (${size}) añadido a tu bolsa!`);
    }

    setCartItems(updatedCart);
    setSelectedProduct(null); // Close customizer layout if open
  };

  const handleApplyPromo = () => {
    setPromoApplied(true);
    triggerToast('🎉 ¡CUPÓN PROMO PACK 3-FOR-2 APLICADO!');
  };

  // Cart quantity changes
  const handleQuantityChange = (cartId: string, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.cartId === cartId) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, nextQty) };
      }
      return item;
    });
    setCartItems(updated);
  };

  const handleRemoveItem = (cartId: string) => {
    const updated = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updated);
    triggerToast('Cubo removido de tu bolsa');
  };

  // Dynamic reorder parser logic
  const handleReorder = (orderText: string) => {
    // Parser pattern for quantity and names, e.g. "2x Madrid Caramel Bucket"
    const matchCaramel = orderText.includes('Madrid Caramel');
    const matchCookies = orderText.includes('Cookies & Cream');
    
    if (matchCaramel) {
      const prod = PRODUCTS.find(p => p.id === 'madrid-caramel');
      if (prod) handleAddToCart(prod, 'M', false, false);
    }
    if (matchCookies) {
      const prod = PRODUCTS.find(p => p.id === 'cookies-cream');
      if (prod) handleAddToCart(prod, 'M', false, false);
    }

    setIsCartOpen(true);
    triggerToast('🔄 ¡Pedido histórico restaurado e inyectado al Checkout!');
  };

  const handleUpdatePoints = (newPoints: number) => {
    setProfile({
      ...profile,
      points: newPoints,
      xpEarned: newPoints
    });
    triggerToast('🌟 ¡Puntos de fidelidad sincronizados con tu QR VIP!');
  };

  const handleSetProfileName = (newName: string) => {
    setProfile({ ...profile, name: newName });
    triggerToast(`Nombre de perfil actualizado a: ${newName}`);
  };

  // Count items total for header count badge
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-on-background font-sans relative">
      
      {/* Persistent Navigation Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null); // reset customizer context on change
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => {
          setActiveTab('rewards');
          setSelectedProduct(null);
        }}
      />

      {/* Main body content section with top margin buffer */}
      <main className="pt-24 pb-28 px-4 md:px-8 max-w-7xl mx-auto min-h-[calc(100vh-160px)]">
        
        {/* Render detailed product customizer overlay if product is selected */}
        {selectedProduct ? (
          <CustomizerView 
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <div>
            {/* Standard tabs */}
            {activeTab === 'feed' && (
              <FeedView 
                onSelectProduct={setSelectedProduct}
                onAddToCart={handleAddToCart}
                onApplyPromo={handleApplyPromo}
                promoApplied={promoApplied}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'flavors' && (
              <div className="space-y-8 text-left">
                <div className="space-y-1">
                  <p className="font-mono text-xs text-primary uppercase tracking-widest bg-black px-3 py-1.5 rounded inline-block">THE FULL STREET EXTRAS</p>
                  <h1 className="font-display text-4xl md:text-6xl font-black text-on-background uppercase tracking-tight italic drop-shadow-[3px_3px_0_#000] pt-2">
                    CARTA DE SABORES
                  </h1>
                  <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-3xl leading-relaxed">
                    Personaliza cada cubo como te dé la gana. Añade capas infinitas de chocolate caramelizado derretido, trozos extra crujientes de galleta o déjalo salado con parmesano de trufa.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="complete-flavors-grid pb-12">
                  {PRODUCTS.map((prod) => (
                    <div 
                      key={`card-${prod.id}`}
                      className="bg-surface-container border-4 border-black rounded-2xl block-shadow p-5 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Thumbnail overlay */}
                        <div 
                          onClick={() => setSelectedProduct(prod)}
                          className="h-44 w-full bg-black rounded-xl border-2 border-black overflow-hidden relative cursor-pointer"
                        >
                          <img 
                            className="w-full h-full object-cover group-hover:scale-108 transition-all" 
                            src={prod.image} 
                            alt={prod.name} 
                          />
                          {prod.isHot && (
                            <span className="absolute top-2 left-2 bg-tertiary text-on-tertiary border border-black text-[9px] font-mono font-bold uppercase rounded px-1.5 py-0.5 shadow-[1px_1px_0_#000]">
                              HOT
                            </span>
                          )}
                        </div>

                        <div className="mt-4 text-left space-y-1 select-none">
                          <h3 className="font-display text-lg font-black uppercase text-primary">
                            {prod.name}
                          </h3>
                          <p className="font-mono text-[9px] text-[#8c8c8c] uppercase tracking-widest">
                            {prod.tag}
                          </p>
                          <p className="font-sans text-xs text-on-surface-variant line-clamp-2 pt-1 leading-relaxed">
                            {prod.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-5 items-center justify-between border-t border-neutral-800 pt-3">
                        <span className="font-display text-2xl font-black text-secondary">
                          €{prod.price.toFixed(2)}
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedProduct(prod)}
                            className="bg-surface-container-high hover:bg-neutral-800 text-white font-mono text-[10px] uppercase font-bold py-2 px-3 border border-neutral-700 rounded-lg cursor-pointer transition-colors"
                          >
                            Custom
                          </button>
                          <button
                            onClick={() => handleAddToCart(prod, 'M', false, false)}
                            className="bg-primary text-on-primary font-mono text-[10px] uppercase font-bold py-2 px-3 border-2 border-black rounded-lg block-shadow active:translate-y-0.5 cursor-pointer"
                          >
                            Añadir M
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <ProfileView 
                profile={profile}
                badges={badges}
                pastOrders={pastOrders}
                onUpdatePoints={handleUpdatePoints}
                onReorder={handleReorder}
                onSetProfileName={handleSetProfileName}
              />
            )}
          </div>
        )}

      </main>

      {/* Floating Checkout trigger for Desktop layout */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-secondary text-on-secondary rounded-2xl border-4 border-black shadow-[4px_4px_0_0_#000] hover:scale-110 active:scale-95 transition-all z-40 neon-glow-pink flex items-center justify-center cursor-pointer animate-pulse"
          id="btn-floating-cart"
          title="Ver bolsa de compras"
        >
          <span className="material-symbols-outlined text-3xl font-bold">
            shopping_cart
          </span>
          <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[11px] font-bold w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
            {totalCartCount}
          </span>
        </button>
      )}

      {/* Shopping Cart Drawer Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onSetCartItems={setCartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        promoApplied={promoApplied}
        onApplyPromo={handleApplyPromo}
        onClearCart={() => {
          setCartItems([]);
          setPromoApplied(false);
        }}
      />

      {/* Bottom Navigation Bar for Mobile viewport layouts matching layout indicator */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-black bg-surface-container rounded-t-2xl md:hidden h-20 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.3)]"
        id="mobile-bottom-tabs"
      >
        <div className="flex justify-around items-center h-full w-full px-2">
          {[
            { id: 'feed', label: 'Feed', icon: 'grid_view' },
            { id: 'flavors', label: 'Flavors', icon: 'local_pizza' },
            { id: 'rewards', label: 'Rewards', icon: 'stars' }
          ].map((tab) => {
            const isActive = activeTab === tab.id && !selectedProduct;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedProduct(null);
                }}
                className={`flex flex-col items-center justify-center py-2 px-3 transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-primary text-on-primary rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000] -translate-y-1'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined leading-none text-2xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {tab.icon}
                </span>
                <span className="font-mono text-[9px] uppercase font-bold tracking-tight mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Reactive notifications banner toast element */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-8 md:right-auto md:max-w-sm z-[120] bg-black text-white p-4 rounded-xl border-4 border-primary block-shadow font-mono text-xs font-bold text-left flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-primary text-xl animate-bounce">
              info
            </span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
