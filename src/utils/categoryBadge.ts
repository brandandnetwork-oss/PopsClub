/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** Texto en español para cada categoría de producto. */
export const CATEGORY_LABEL: Record<string, string> = {
  sweet:   'DULCE',
  salty:   'SALADO',
  gourmet: 'GOURMET',
};

/**
 * Clases Tailwind para el badge de categoría.
 * Usa los colores del sistema: pink (primary) para dulce,
 * cyan (secondary) para salado, lime (tertiary) para gourmet.
 */
export const CATEGORY_CLASSES: Record<string, string> = {
  sweet:   'bg-primary text-on-primary border-primary',
  salty:   'bg-secondary text-on-secondary border-secondary',
  gourmet: 'bg-tertiary text-on-tertiary border-tertiary',
};
