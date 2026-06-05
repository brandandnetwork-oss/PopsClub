/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Servidor de producción minimalista para Hostinger (Node.js hosting).
 * Solo sirve los ficheros estáticos compilados por Vite en /dist y
 * redirige cualquier ruta al index.html para que React Router funcione.
 * No contiene lógica de negocio — la app es 100 % front-end.
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Servir los assets de Vite con caché agresiva (hash en el nombre de fichero)
app.use(
  '/assets',
  express.static(join(__dirname, 'dist', 'assets'), {
    maxAge: '1y',
    immutable: true,
  })
);

// Resto de ficheros estáticos (favicon, robots.txt…)
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback: cualquier ruta devuelve index.html
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`POPS CLUB · producción · puerto ${PORT}`);
});
