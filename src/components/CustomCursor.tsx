/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * <CustomCursor> — reemplaza el puntero nativo por la palomita de la marca.
 *
 * Comportamiento:
 *  - Sigue al ratón con un *spring* suave (sensación premium, no a saltos).
 *  - Crece al pasar por elementos interactivos (botones, enlaces, inputs…).
 *  - Hace un pequeño "pop" (encoge) al pulsar.
 *  - Se desvanece cuando el ratón sale de la ventana.
 *
 * Rendimiento: solo anima `transform` (x/y/scale) vía MotionValues (GPU),
 * nunca top/left → sin reflows. El elemento tiene `pointer-events: none`,
 * así que jamás bloquea clics.
 *
 * Accesibilidad / robustez:
 *  - Solo se activa con puntero fino (`pointer: fine`): en móvil/táctil no
 *    renderiza nada ni oculta el cursor del sistema.
 *  - Con `prefers-reduced-motion` el seguimiento es instantáneo (sin lag) y
 *    sin escalados, pero la palomita sigue visible.
 */
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import cursorUrl from '@/assets/cursor.png';

/** Tamaño base del cursor en px. */
const SIZE = 60;

/** Selector de elementos que se consideran "interactivos" (cursor crece). */
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], .cursor-pointer, [onclick]';

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  // Solo activamos el cursor custom si hay un puntero fino (ratón/trackpad).
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Posición cruda del ratón (centro de la palomita).
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Suavizado tipo muelle. Con reduced-motion lo dejamos prácticamente rígido.
  const springConfig = reduceMotion
    ? { stiffness: 1500, damping: 90 }
    : { stiffness: 500, damping: 35, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Detecta puntero fino y reacciona a cambios (p. ej. conectar un ratón).
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // setVisible(true) es idempotente: React descarta el re-render si no cambia.
      setVisible(true);
      // ¿El cursor está sobre algo interactivo? → crece.
      const target = e.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    document.documentElement.addEventListener('mouseenter', handleEnter);

    // Oculta el cursor nativo mientras el custom está activo.
    document.documentElement.classList.add('cursor-hidden');

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      document.documentElement.removeEventListener('mouseenter', handleEnter);
      document.documentElement.classList.remove('cursor-hidden');
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  // Escala según estado (desactivada con reduced-motion).
  const scale = reduceMotion ? 1 : pressed ? 0.8 : hovering ? 1.35 : 1;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] select-none"
      style={{
        x,
        y,
        width: SIZE,
        height: SIZE,
        // Centra la palomita en la punta real del ratón (margen estático, sin
        // tocar el transform que queda libre para x/y/scale).
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
      }}
      animate={{ scale, opacity: visible ? 1 : 0 }}
      transition={{ scale: { duration: 0.18 }, opacity: { duration: 0.2 } }}
    >
      <img
        src={cursorUrl}
        alt=""
        draggable={false}
        className="h-full w-full object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,0.35)]"
      />
    </motion.div>
  );
}
