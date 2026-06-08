/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * ⚙️  CONFIGURACIÓN DEL ENVÍO (1 minuto, gratis):
 *   1. Entra en https://web3forms.com e introduce TU email.
 *   2. Te dan una "Access Key" gratuita al instante (sin registro).
 *   3. Pega esa clave aquí abajo.
 * Los mensajes del formulario llegarán a ese email. Web3Forms oculta tu
 * dirección (no aparece en el código de la web) e incluye anti-spam.
 */
const WEB3FORMS_ACCESS_KEY = 'REEMPLAZA_CON_TU_ACCESS_KEY';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface UneteViewProps {
  onBack: () => void;
}

export default function UneteView({ onBack }: UneteViewProps) {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');

    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'Nuevo contacto desde POPS CLUB');
    formData.append('from_name', 'Web POPS CLUB');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full bg-surface-container-low border-4 border-black text-on-background font-mono text-xs p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-black block-shadow placeholder:text-surface-container-highest';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto text-left pb-12"
    >
      {/* Botón volver */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="press-pop flex items-center justify-center p-3 rounded-xl border-2 border-black bg-surface-container hover:bg-neutral-800 text-primary active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined font-black">arrow_back_ios_new</span>
        </button>
        <span className="font-mono text-xs uppercase text-on-surface-variant font-bold tracking-widest">
          Volver al inicio
        </span>
      </div>

      {/* Cabecera */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-block px-5 py-1.5 bg-black border-2 border-primary text-primary font-display font-black text-sm uppercase rounded-full shadow-[0_0_15px_rgba(255,172,237,0.3)] select-none rotate-[2deg]">
          #POPSCLUBFAM
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-black text-on-background uppercase tracking-tight leading-none drop-shadow-[3px_3px_0_#000]">
          ÚNETE AL CLUB
        </h1>
        <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-xl mx-auto">
          ¿Quieres ser socio, abrir un punto de venta, colaborar en un evento o
          simplemente saludarnos? Escríbenos y te respondemos enseguida.
        </p>
      </div>

      {/* Estado de éxito */}
      {status === 'success' ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-tertiary/10 border-4 border-tertiary rounded-3xl p-8 text-center space-y-4 block-shadow"
        >
          <span className="material-symbols-outlined text-tertiary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <h2 className="font-display text-2xl text-tertiary font-black uppercase italic">
            ¡Mensaje enviado!
          </h2>
          <p className="font-sans text-sm text-on-surface-variant">
            Gracias por escribirnos. Te contestaremos lo antes posible. 🍿
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="press-pop bg-black text-primary hover:text-white px-6 py-3 rounded-xl border-2 border-black font-mono text-xs uppercase font-bold cursor-pointer mt-2"
          >
            Enviar otro mensaje
          </button>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container border-4 border-black rounded-3xl p-6 md:p-8 space-y-5 block-shadow-lg"
        >
          {/* Honeypot anti-spam (oculto) */}
          <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase text-on-surface-variant font-bold block">
                Nombre *
              </label>
              <input name="nombre" type="text" required placeholder="Tu nombre" className={inputBase} />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase text-on-surface-variant font-bold block">
                Email *
              </label>
              <input name="email" type="email" required placeholder="tu@email.com" className={inputBase} />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase text-on-surface-variant font-bold block">
                Teléfono
              </label>
              <input name="telefono" type="tel" placeholder="Opcional" className={inputBase} />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase text-on-surface-variant font-bold block">
                Ciudad
              </label>
              <input name="ciudad" type="text" placeholder="Opcional" className={inputBase} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-on-surface-variant font-bold block">
              Motivo *
            </label>
            <select name="motivo" required defaultValue="" className={`${inputBase} cursor-pointer`}>
              <option value="" disabled>Elige una opción…</option>
              <option value="Quiero ser socio">Quiero ser socio del club</option>
              <option value="Punto de venta / distribución">Punto de venta / distribución</option>
              <option value="Colaboración / eventos">Colaboración / eventos</option>
              <option value="Consulta general">Consulta general</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-on-surface-variant font-bold block">
              Mensaje *
            </label>
            <textarea
              name="mensaje"
              required
              rows={5}
              placeholder="Cuéntanos en qué podemos ayudarte…"
              className={`${inputBase} resize-y`}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input name="acepto" type="checkbox" required className="mt-1 w-5 h-5 accent-primary cursor-pointer" />
            <span className="font-sans text-xs text-on-surface-variant">
              Acepto que POPS CLUB use mis datos para responder a mi consulta.
            </span>
          </label>

          {status === 'error' && (
            <p className="font-mono text-xs text-red-400 font-bold">
              Ups, algo falló al enviar. Inténtalo de nuevo en un momento.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="press-pop w-full bg-tertiary text-on-tertiary font-display font-black text-base uppercase tracking-tight py-4 rounded-xl border-4 border-black block-shadow hover:bg-lime-400 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
            <span className="material-symbols-outlined text-xl font-bold">send</span>
          </button>
        </form>
      )}
    </motion.div>
  );
}
