/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * <PopcornRain> — al hacer scroll / deslizar, caen palomitas por los laterales
 * de la pantalla, sin saturar.
 *
 * Implementación: un <canvas> a pantalla completa (fixed, pointer-events:none).
 * Toda la animación vive en el canvas vía requestAnimationFrame, así que NO
 * provoca re-renders de React ni reflows del DOM (máximo rendimiento).
 *
 * "Sin saturar" se garantiza con:
 *  - Tope máximo de partículas vivas (MAX_PARTICLES).
 *  - Emisión proporcional a la distancia scrolleada (1 palomita cada
 *    SCROLL_STEP px), no por cada evento de scroll.
 *  - Las palomitas solo nacen en bandas laterales (no en el centro).
 *  - El bucle rAF se detiene cuando no quedan partículas (0% CPU en reposo).
 *
 * Accesibilidad: con prefers-reduced-motion el efecto se desactiva por completo.
 */
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import popUrl from '@/assets/pop.png';

/** Nº máximo de palomitas vivas a la vez (evita saturar). */
const MAX_PARTICLES = 42;
/** Cada cuántos px de scroll acumulado nace una palomita. */
const SCROLL_STEP = 55;
/** Aceleración de caída (px/frame²). */
const GRAVITY = 0.14;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  opacity: number;
  /** Empieza a desvanecerse cuando supera esta altura. */
  fadeFrom: number;
}

export default function PopcornRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = popUrl;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR por rendimiento
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    let rafId = 0;
    let running = false;

    // Crea una palomita en una banda lateral (izquierda o derecha).
    const spawn = () => {
      if (particles.length >= MAX_PARTICLES || width === 0) return;
      const fromLeft = Math.random() < 0.5;
      // Banda lateral: 2%–14% del borde correspondiente.
      const band = (0.02 + Math.random() * 0.12) * width;
      const x = fromLeft ? band : width - band;
      const size = 26 + Math.random() * 22; // 26–48 px
      particles.push({
        x,
        y: -size - Math.random() * 80, // arranca por encima del borde
        vx: (fromLeft ? 1 : -1) * (0.15 + Math.random() * 0.35), // leve hacia el centro
        vy: 0.6 + Math.random() * 1.2,
        size,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.08,
        opacity: 0.9,
        fadeFrom: height * 0.7,
      });
      ensureRunning();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        // Desvanecido suave en la parte baja.
        if (p.y > p.fadeFrom) {
          p.opacity = Math.max(0, p.opacity - 0.012);
        }
        // Eliminar si sale por abajo o ya es invisible.
        if (p.y - p.size > height || p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }
        if (img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }
      if (particles.length > 0) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false; // sin partículas → paramos el bucle (0% CPU)
      }
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Emisión proporcional a la distancia recorrida (scroll o swipe, en ambos
    // sentidos). No emite por cada evento, sino cada SCROLL_STEP px.
    let lastScrollY = window.scrollY;
    let acc = 0;
    const onScroll = () => {
      const y = window.scrollY;
      acc += Math.abs(y - lastScrollY);
      lastScrollY = y;
      while (acc >= SCROLL_STEP) {
        spawn();
        acc -= SCROLL_STEP;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
