/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Variantes de animación compartidas para toda la app.
 *
 * Reglas de rendimiento:
 *  - Solo animamos `transform` (x / y / scale) y `opacity` → GPU, sin reflow.
 *  - Nada de animar width/height/top/left aquí.
 *
 * Estas variantes las consumen los wrappers de `anim/` (Reveal, RevealStagger…).
 */
import type { Variants, Transition } from 'motion/react';

/** Curva y duración base, coherente con el resto de transiciones de la web. */
export const EASE_OUT: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1], // easeOutExpo suave
};

/** Fade + slide hacia arriba: el reveal por defecto al entrar en viewport. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: EASE_OUT },
};

/** Fade + slide desde la izquierda (útil para textos / columnas laterales). */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: EASE_OUT },
};

/** Fade + slide desde la derecha. */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: EASE_OUT },
};

/** Aparición con un leve "pop" de escala (para tarjetas / badges). */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: EASE_OUT },
};

/**
 * Contenedor para animaciones escalonadas (stagger).
 * Sus hijos heredan el `visible` y se disparan en cascada.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Variante "reducida": sin desplazamiento ni escala, solo opacidad.
 * Se usa cuando el usuario tiene activado `prefers-reduced-motion`.
 */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/** Igual que `staggerContainer` pero con cascada casi imperceptible. */
export const staggerContainerReduced: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.02 } },
};

/** Configuración de viewport compartida: anima una sola vez al entrar. */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;
