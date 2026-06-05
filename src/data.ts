/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, PopBadge, PastOrder, UserProfile } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'caramelo',
    name: 'Caramelo',
    tag: 'EL CLÁSICO DE LA CALLE',
    desc: 'Palomitas bañadas en caramelo artesanal dorado con un toque irresistible de vainilla. El sabor que lo empezó todo.',
    price: 5.90,
    image: '/productos/caramelo.webp',
    isBestSeller: true,
    category: 'sweet'
  },
  {
    id: 'caramelo-salado',
    name: 'Caramelo Salado',
    tag: 'DULCE CON ACTITUD',
    desc: 'La tensión perfecta entre el caramelo suave y la sal marina gruesa. Adictivo desde el primer bocado.',
    price: 5.90,
    image: '/productos/caramelo-salado.webp',
    isHot: true,
    category: 'sweet'
  },
  {
    id: 'chocolate-belga',
    name: 'Chocolate Belga',
    tag: 'LUJO EN CADA PALOMITA',
    desc: 'Cobertura de auténtico chocolate belga fundido sobre palomitas crujientes. Puro placer sin disculpas.',
    price: 6.50,
    image: '/productos/chocolate-belga.webp',
    category: 'sweet'
  },
  {
    id: 'canela',
    name: 'Canela',
    tag: 'ESPECIAS DE BARRIO',
    desc: 'Palomitas con un generoso toque de canela de Ceilán y azúcar moreno. Calidez urbana en cada puñado.',
    price: 5.50,
    image: '/productos/canela.webp',
    category: 'sweet'
  },
  {
    id: 'nubes',
    name: 'Nubes',
    tag: 'NUBE DE AZÚCAR PURO',
    desc: 'Palomitas con cobertura de marshmallow esponjoso. Tan ligeras como una nube, tan irresistibles como el azúcar.',
    price: 5.90,
    image: '/productos/nubes.webp',
    isBestSeller: true,
    category: 'sweet'
  },
  {
    id: 'manzana',
    name: 'Manzana',
    tag: 'FRUTA CON CARÁCTER',
    desc: 'El sabor de la manzana verde ácida y la manzana roja dulce fundidos sobre palomitas crujientes.',
    price: 5.50,
    image: '/productos/manzana.webp',
    category: 'sweet'
  },
  {
    id: 'frutas-del-bosque',
    name: 'Frutas del Bosque',
    tag: 'EXPLOSIÓN SILVESTRE',
    desc: 'Frambuesa, mora y arándano en una cobertura intensa y frutal. El bosque llega a la ciudad.',
    price: 5.90,
    image: '/productos/frutas-del-bosque.webp',
    category: 'sweet'
  },
  {
    id: 'mojito',
    name: 'Mojito',
    tag: 'CÓCTEL STREET',
    desc: 'Lima fresca, menta y un toque dulce. La vibra de la terraza en formato palomita. Sin alcohol, con toda la actitud.',
    price: 6.00,
    image: '/productos/mojito.webp',
    isHot: true,
    category: 'sweet'
  },
  {
    id: 'mantequilla',
    name: 'Mantequilla',
    tag: 'EL ORIGINAL DE SIEMPRE',
    desc: 'Palomitas con mantequilla de verdad, punto justo de sal. El clásico de cine elevado a nivel gourmet.',
    price: 4.90,
    image: '/productos/mantequilla.webp',
    category: 'salty'
  },
  {
    id: 'punto-de-sal',
    name: 'Punto de Sal',
    tag: 'MINIMALISMO SALADO',
    desc: 'Solo sal marina gruesa y la mejor palomita. La pureza del sabor sin artificios. Para los que saben.',
    price: 4.50,
    image: '/productos/punto-de-sal.webp',
    category: 'salty'
  },
  {
    id: 'queso',
    name: 'Queso',
    tag: 'CHEESE POWER',
    desc: 'Cobertura de queso cheddar intenso con un punto de pimentón. El snack salado definitivo de la cultura pop.',
    price: 5.50,
    image: '/productos/queso.webp',
    isHot: true,
    category: 'salty'
  },
  {
    id: 'jamon',
    name: 'Jamón',
    tag: 'ORGULLO IBÉRICO',
    desc: 'El sabor del jamón serrano en formato palomita. Un bocado audaz, profundo y muy español.',
    price: 5.90,
    image: '/productos/jamon.webp',
    category: 'salty'
  },
  {
    id: 'chili',
    name: 'Chili',
    tag: 'FUEGO EN LA BOCA',
    desc: 'Picante progresivo con chili rojo y un punto de lima. Para los que buscan el límite del sabor.',
    price: 5.50,
    image: '/productos/chili.webp',
    isHot: true,
    category: 'salty'
  },
  {
    id: 'tex-mex',
    name: 'Tex-Mex',
    tag: 'FRONTERA SIN LÍMITES',
    desc: 'Mezcla de especias texanas y mexicanas: comino, ajo, jalapeño y pimentón ahumado. Pura fusión callejera.',
    price: 5.90,
    image: '/productos/tex-mex.webp',
    isHot: true,
    category: 'salty'
  },
  {
    id: 'seleccion-espanola',
    name: 'Selección Española',
    tag: 'LO MEJOR DE CADA CASA',
    desc: 'El pack definitivo con una mezcla de los sabores más votados por la comunidad Pops Club. Edición especial.',
    price: 7.50,
    image: '/productos/seleccion-espanola.webp',
    isBestSeller: true,
    category: 'gourmet'
  }
];

export const INITIAL_BADGES: PopBadge[] = [
  {
    id: 'hot-streak',
    name: 'Hot Streak',
    icon: 'local_fire_department',
    unlocked: true,
    description: 'Visited Pops Club 3 weeks in a row!',
    color: 'secondary'
  },
  {
    id: 'flavor-fanatic',
    name: 'Flavor Fanatic',
    icon: 'icecream',
    unlocked: true,
    description: 'Tried 5 different flavors of street popcorn!',
    color: 'primary'
  },
  {
    id: 'party-starter',
    name: 'Party Starter',
    icon: 'celebration',
    unlocked: true,
    description: 'Ordered a Mega Box for delivery!',
    color: 'tertiary'
  },
  {
    id: 'neon-legend',
    name: 'Neon Legend',
    icon: 'lock',
    unlocked: false,
    description: 'Reach Elite level with 5,000 Pops points',
    color: 'primary'
  }
];

export const INITIAL_ORDERS: PastOrder[] = [
  {
    id: 'POPS-9921',
    itemsDescription: '2x Madrid Caramel Bucket',
    date: 'Oct 24, 2023',
    pointsAwarded: 245,
    totalPrice: 24.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDmHqKKpkaQixN_efvHNc4stOMSS1VPCbC1jy1KAeYL9y6mqz56iDVQ_5Cd5y-GFWpFHL_UbQo8mbirH8ZDgDzD60wm3_uLBFSoQxEi1GhUuL6KGTlgCw78QUrAprW-S8zT0rTHXAGqDFNwBSZC8VnIWCWdt-8a4x5aEBElaNhYrKCqocb__912SXe1XF5TsFU0c9VdhsPOOe1pYwU2M-9Q3n5vhANFt5XXAL9Kf9OnE0C_ZZXsElkyILDTaNwJmg3S_m7A8ndIyA'
  },
  {
    id: 'POPS-9840',
    itemsDescription: '1x Cookies & Cream Mega',
    date: 'Oct 12, 2023',
    pointsAwarded: 149,
    totalPrice: 14.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIzFcnPUNmko9bD_RTfx3tqGMX4YdleIjIQxMsmecYd3s9-RbETnDPW3Ih3V40lOcNE6Bz6yKNd1FlaDheX4TVpII3BwzHLQqyLNbXFEsYoU8hNrHIq_mpxD7wGaTT69d_dbc0vwDHMlPLXCNMKnrMN0cdiQoJwrS97FZY6B4oMNIXvGt5-pXsR1pr02ttbVU9vkpN1k3xUjkL3f0j_5DxPRirN23gc5A7N5oFGHE-M2CzU7BGryC-DA4tQdIcTHNET1CDfvmoNb4'
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Leo J.',
  tier: 'POPS VIP',
  memberSince: 'JUNE 2023',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdhel8bl4FIaddIzefaOs4YTdwCBs7y33rybUzlZKKsZCgC8GOsgdwwFAYWGczp3xvNfM3uaPjs04c7hYVNwi5xaimDKT_yQUoQ3_uvUcAFUgy03VraWRnx1kvw2nukMs7e9-CIAGoG9JekxCfRkRJnDs6kXVzHOLS98VTYSvwrz0KJqhnYnkwOtZmKCqb6Op4bDKf4RO6mDrdp7khwEUHGQXgHu7xWqFZd_0IEeIfhBfL_PEXqsWNkGF2zklBtBnntkfkm9QrXlI',
  points: 4250,
  xpEarned: 4250,
  nextFreeBucketAt: 1000
};
