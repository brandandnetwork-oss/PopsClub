/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, PopBadge, PastOrder, UserProfile } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'cookies-cream',
    name: 'Cookies & Cream',
    tag: 'EXPLOSIÓN DE CHOCOLATE BLANCO',
    desc: 'White chocolate drizzle meets crushed midnight cocoa cookies. It\'s not just popcorn, it\'s a street legend.',
    price: 6.20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-v2k1KUC3su3l6Uofssw11ZPvhRudhKuR04uaLm-tgDZpuNO0c1pn5H_9KRUtfr8l6n5oVS0vaw1f9r1qtCuj7QWbCKCiAr9W_72sv15KEXBOXA4a_wHL5da0uS_xsFISWmvnMDdSDU6O7-y0eBTAB57BhcPpUPLEK3NLk31Qja6z62bxXmdxY2vo2_KF8GAo8Ldiu4Jslkbw2trTfj6ETOPHQpJ4d3dADYo7-j2zFdzByP84Z8i43YKwzALpJg7PF32_p1FUDEs',
    isBestSeller: true,
    category: 'sweet'
  },
  {
    id: 'madrid-caramel',
    name: 'Madrid Caramel',
    tag: 'EL CLÁSICO REINVENTADO',
    desc: 'Artisanal golden, gooey caramel-coated popcorn with subtle sea salt crystals. Sweet, salty, addictive.',
    price: 5.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHr9h-q8iF6ybh_hvo9DsOUZCiJ8FkZY5E-eMkxIcWf10Y_5N9MNLFQu5TBNn9OnM4HLdGSo-ifPVpRl99TFF_WHdlvI-SKCcxGpNKD8gTdBcbCELdlOo1qk7xs8KYJsvWFoH-OMxSObqzOjJ1ZEcKbKFnefwk3Lyz9XMeG_wdzpq9NaDQI_bqi3jgjuIZiG0cFLN-Dibb7rF6v90xZpuA0cw87SHTIxWZ8izR1sx2Ol64YA4PZ4nDWpYUcLvTH0VdZ5pJ9jaOMV4',
    isHot: true,
    category: 'sweet'
  },
  {
    id: 'choco-lovers',
    name: 'Choco Lovers',
    tag: 'CHOCOLATE + CACAO PURO',
    desc: 'Double glazed in rich milk chocolate and premium dark cocoa powder. The ultimate chocolate high.',
    price: 6.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4RMXHAOTKBwQKoCoqMDVcSdIozfDCWv-hwQqwWNVm341F5qGzP7JkbO9G4T8QnqNmancP8dDFCAvWN5kaeWrG96HKeIb1mODtit8fBkirUEiVDQlkqnJr33GZfqcfk5aufrRxwypsVAZK1hmmeRRHz_Fh1TdQmd8UiII8epf7PlQE7qp58GFusV3aA-5Ihha6ptSwOU41Dd9MbOdb-f1iID92ldTeK_2J1mTQK1l-nhlFa7CerbopVNU1g6rCyF_IQwPoG0e-AZc',
    category: 'sweet'
  },
  {
    id: 'trufa-parmesano',
    name: 'Trufa Parmesan',
    tag: 'GOURMET STREET STYLE',
    desc: 'High-contrast salted white popcorn dusted in Italian black truffle oil and freshly grated pure Parmigiano-Reggiano.',
    price: 7.20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsCF7ji4vCegRzYYPFDjBIVC9XWp7HBajqHZiLm-UBxjg2e1zS4BWMx05ZY-7ZMi3-Hc1a9VEw2qVGUp_3X6sYgtqpW04C4i385gGhMQV8Eo4zDVvj3XJOVXCbKPsv6IC-vT9H245wOuel7JruMWBN72usAcZExfOoTo1sH1ggmNWNnYLFNyJ_15-39MEYA6s73XQMUIZKEinOeE9od2e75P9MUjty8nwaZgN4YB__JOtnUOaaW-Xa-CAvcMczlRwXTVFkcXTKKW4',
    isHot: true,
    category: 'gourmet'
  },
  {
    id: 'matcha-white',
    name: 'Matcha White',
    tag: 'EQUILIBRIO ZEN URBANO',
    desc: 'Vibrant green matcha white chocolate popcorn with ceremonial-grade organic Japanese green tea powder.',
    price: 6.80,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUifBItmmXYok_Gkf-SfjhatdYcUZkS9eRZCQm1c2ko79Kp9t80OVSg0iZp7SvNr-_z_nB6tBz1adYDPL4391Vv0_Tp7hUoO1saz0Ja80Sz8G42BEgZKJUu_pUEDTijVqihA5BBuEVIzIXhPCIMx61hWW_OYmXvfEU4GrjRQWJFFMQtu4FG9ykziaw2L7OWdC8WuRn6avgfc6VBn7ZmI-bEgLM_DjeCDv5o9hdoz6vRWWPDwwpJvbdKBH0CQzgwOE0NO8R3wkD3BI',
    category: 'gourmet'
  },
  {
    id: 'lotus-biscoff',
    name: 'Lotus Biscoff',
    tag: 'ADICCIÓN DEL REINO UNIDO',
    desc: 'Sweet, spiced speculoos cookie crumbles swirled with velvety melted biscoff cookie butter drizzle.',
    price: 6.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVz_LjTpRIUxyiuaNfYBS_3nCrhR0Ry21Ls0bxSctXav_lwR4LfYFQpLEvdeVP3FktW1f90jBHFTnFSfeWIKPqSDyyD6WieMEQJHjUjY_QFPhimfI0FeNS_BAMNnOD1Di1p44HAAgM98SrItGGgF9FsCh6qrEX7ZX8CFmUPe0yBvtGkGMaQ-fnxoLMQYX55bv7k2KvhCKHkfgEBgYLlVmEkcIR5y99m31blv3SR3sEN0_WnKW1hoxF8fnORhD246VUcTp8DpSQOlY',
    isHot: true,
    category: 'sweet'
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
