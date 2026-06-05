/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * <AnimatedCounter> — cuenta desde 0 (o `from`) hasta `value` cuando entra en
 * el viewport. Efecto "dopamínico" clásico para cifras destacadas.
 *
 * - No anima layout: solo actualiza el textContent vía un MotionValue.
 * - Respeta `prefers-reduced-motion`: muestra el valor final directamente.
 * - Re-anima si `value` cambia (p. ej. al sumar puntos), pero el reveal inicial
 *   solo ocurre una vez al entrar en pantalla.
 */
import { useEffect, useRef } from 'react';
import {
  useMotionValue,
  useInView,
  useReducedMotion,
  animate,
} from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  from?: number;
  /** Duración del conteo en segundos. */
  duration?: number;
  /** Formatea el número (p. ej. miles con separador). */
  format?: (n: number) => string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  from = 0,
  duration = 1.4,
  format = (n) => Math.round(n).toLocaleString(),
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(from);
  // Guarda el último valor "asentado" para animar incrementos posteriores.
  const lastValue = useRef(from);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Sin movimiento o aún fuera de pantalla: pintamos el valor final/estable.
    if (reduceMotion) {
      node.textContent = format(value);
      lastValue.current = value;
      return;
    }
    if (!inView) {
      node.textContent = format(from);
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    lastValue.current = value;
    return () => controls.stop();
  }, [inView, value, from, duration, reduceMotion, format, motionValue]);

  return <span ref={ref} className={className}>{format(from)}</span>;
}
