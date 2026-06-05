/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Animaciones escalonadas (stagger) para grids y listas.
 *
 *   <RevealStagger className="grid ...">
 *     {items.map(i => <RevealItem key={i.id}>...</RevealItem>)}
 *   </RevealStagger>
 *
 * El contenedor entra en viewport y dispara a sus hijos en cascada.
 * Respeta `prefers-reduced-motion`: cascada casi nula + fade simple.
 */
import {
  motion,
  useReducedMotion,
  type Variants,
  type TargetAndTransition,
} from 'motion/react';
import type { ReactNode, ElementType, MouseEventHandler } from 'react';
import {
  staggerContainer,
  staggerContainerReduced,
  popIn,
  fadeOnly,
  VIEWPORT_ONCE,
} from './variants';

interface RevealStaggerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /**
   * Si es true, dispara la cascada al montar en vez de al entrar en viewport.
   * Para listas que aparecen tras una acción del usuario (filtros) y podrían
   * quedar fuera de pantalla — así no se quedan invisibles.
   */
  instant?: boolean;
}

/** Contenedor que orquesta la cascada de sus <RevealItem>. */
export function RevealStagger({
  children,
  as = 'div',
  className,
  id,
  instant = false,
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      id={id}
      className={className}
      variants={reduceMotion ? staggerContainerReduced : staggerContainer}
      initial="hidden"
      {...(instant
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: VIEWPORT_ONCE })}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  /** Variante de entrada del item. Por defecto: popIn (escala + slide). */
  variants?: Variants;
  as?: ElementType;
  className?: string;
  /** Microinteracción al pasar el ratón (se ignora con reduced-motion). */
  whileHover?: TargetAndTransition;
  /** Microinteracción al pulsar (se ignora con reduced-motion). */
  whileTap?: TargetAndTransition;
  /** Handler de clic opcional (p. ej. tarjetas seleccionables). */
  onClick?: MouseEventHandler;
}

/** Hijo individual de <RevealStagger>; hereda el estado del contenedor. */
export function RevealItem({
  children,
  variants = popIn,
  as = 'div',
  className,
  whileHover,
  whileTap,
  onClick,
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={reduceMotion ? fadeOnly : variants}
      whileHover={reduceMotion ? undefined : whileHover}
      whileTap={reduceMotion ? undefined : whileTap}
      onClick={onClick}
    >
      {children}
    </MotionTag>
  );
}
