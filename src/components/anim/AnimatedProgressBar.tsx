/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * <AnimatedProgressBar> — rellena una barra de 0% → `percent`% al entrar en
 * viewport.
 *
 * Animamos `width` (en vez de `scaleX`) para que el contenido interno anclado
 * al borde derecho —p. ej. los "drips" de pintura— acompañe al frente sin
 * distorsionarse. Es un único elemento que anima una sola vez, así que el coste
 * de reflow es despreciable.
 *
 * Respeta `prefers-reduced-motion`: aparece ya rellena, sin animar.
 */
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { VIEWPORT_ONCE } from './variants';

interface AnimatedProgressBarProps {
  /** Porcentaje de relleno (0–100). */
  percent: number;
  /** Clases del relleno (color de fondo, etc.). */
  className?: string;
  children?: ReactNode;
}

export default function AnimatedProgressBar({
  percent,
  className,
  children,
}: AnimatedProgressBarProps) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, percent));
  const target = `${clamped}%`;

  return (
    <motion.div
      className={className}
      style={reduceMotion ? { width: target } : undefined}
      initial={reduceMotion ? false : { width: '0%' }}
      whileInView={reduceMotion ? undefined : { width: target }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
