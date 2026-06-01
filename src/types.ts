/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  tag: string;
  desc: string;
  price: number; // Base price for M size
  image: string;
  isHot?: boolean;
  isBestSeller?: boolean;
  category: 'sweet' | 'salty' | 'gourmet';
}

export interface CartItem {
  cartId: string; // unique ID representing item + customization combination
  product: Product;
  selectedSize: 'S' | 'M' | 'L';
  extraWarmCaramel: boolean;
  extraCookies: boolean;
  quantity: number;
  totalPrice: number;
}

export interface PopBadge {
  id: string;
  name: string;
  icon: string; // Material Symbols name
  unlocked: boolean;
  description: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

export interface PastOrder {
  id: string;
  itemsDescription: string;
  date: string;
  pointsAwarded: number;
  totalPrice: number;
  image: string;
}

export interface UserProfile {
  name: string;
  tier: string;
  memberSince: string;
  avatar: string;
  points: number;
  xpEarned: number;
  nextFreeBucketAt: number;
}
