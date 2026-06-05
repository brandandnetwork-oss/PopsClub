/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * <Reveal> — revela su contenido con fade + slide cuando entra en el viewport.
 *
 * Usa `whileInView` de Framer Motion (Intersection Observer por debajo) con
 * `once: true`, así que cada elemento se anima una sola vez y no re-dispara al
 * volver a scrollear.
 *
 * Respeta `prefers-reduced-motion`: si está activo, cae a un fade simple
 * (sin desplazamiento) para no provocar mareo/vestibular discomfort.
 */
import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode, ElementType } from 'react';
import { fadeUp, fadeOnly, VIEWPORT_ONCE } from './variants';

interface RevealProps {
  children: ReactNode;
  /** Variante a usar cuando NO hay reduced-motion. Por defecto: fadeUp. */
  variants?: Variants;
  /** Retardo extra (s) antes de iniciar la animación. */
  delay?: number;
  /** Etiqueta HTML a renderizar (div, section, li…). */
  as?: ElementType;
  className?: string;
  id?: string;
  /**
   * Si es true, anima al montar en vez de al entrar en viewport. Útil para
   * contenido que aparece como respuesta a una acción del usuario (p. ej. al
   * filtrar) y que puede quedar fuera de pantalla: así no se queda invisible.
   */
  instant?: boolean;
}

export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  as = 'div',
  className,
  id,
  instant = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  // Con reduced-motion forzamos un fade plano; sin él, la variante elegida.
  const activeVariants = reduceMotion ? fadeOnly : variants;

  return (
    <MotionTag
      id={id}
      className={className}
      variants={activeVariants}
      initial="hidden"
      {...(instant
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: VIEWPORT_ONCE })}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
