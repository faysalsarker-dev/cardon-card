/**
 * Best Sellers data service
 * Manages fetching and caching of categories, products, and finishes
 */

import { sessionStorage } from '../utils/sessionStorage';

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface Finish {
  id: string;
  color: string;
}

const SESSION_KEYS = {
  CATEGORIES: 'bestSellers_categories',
  PRODUCTS: 'bestSellers_products',
  FINISHES: 'bestSellers_finishes',
};

// Mock data - can be replaced with API calls
const MOCK_CATEGORIES: Category[] = [
  { id: 'anime', name: 'Anime', count: 21, icon: 'https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/categories/icon-anime.svg' },
  { id: 'high-rollers', name: 'High Rollers', count: 9, icon: 'https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/categories/icon-high-rollers.svg' },
  { id: 'star-signs', name: 'Star Signs', count: 12, icon: 'https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/categories/icon-star-signs.svg' },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 'a1', title: 'Zero Two', image: 'https://picsum.photos/seed/anime1/600/400', category: 'anime' },
  { id: 'a2', title: 'Anime Titties', image: 'https://picsum.photos/seed/anime2/600/400', category: 'anime' },
  { id: 'a3', title: 'Goku', image: 'https://picsum.photos/seed/anime3/600/400', category: 'anime' },
  { id: 'a4', title: 'Blue Eyes White Dragon', image: 'https://picsum.photos/seed/anime4/600/400', category: 'anime' },
  { id: 'a5', title: 'Naruto', image: 'https://picsum.photos/seed/anime5/600/400', category: 'anime' },
  { id: 'a6', title: 'Charizard', image: 'https://picsum.photos/seed/anime6/600/400', category: 'anime' },
  { id: 'h1', title: 'Skull Cards', image: 'https://picsum.photos/seed/cards1/600/400', category: 'high-rollers' },
  { id: 'h2', title: 'Ace of Spades', image: 'https://picsum.photos/seed/cards2/600/400', category: 'high-rollers' },
  { id: 'h3', title: 'Golden Dice', image: 'https://picsum.photos/seed/cards3/600/400', category: 'high-rollers' },
  { id: 'h4', title: 'King of Hearts', image: 'https://picsum.photos/seed/cards4/600/400', category: 'high-rollers' },
  { id: 'h5', title: 'Joker Gold', image: 'https://picsum.photos/seed/cards5/600/400', category: 'high-rollers' },
  { id: 'h6', title: 'Holographic King', image: 'https://picsum.photos/seed/cards6/600/400', category: 'high-rollers' },
  { id: 's1', title: 'Aquarius', image: 'https://picsum.photos/seed/star1/600/400', category: 'star-signs' },
  { id: 's2', title: 'Aries', image: 'https://picsum.photos/seed/star2/600/400', category: 'star-signs' },
  { id: 's3', title: 'Cancer', image: 'https://picsum.photos/seed/star3/600/400', category: 'star-signs' },
  { id: 's4', title: 'Capricorn', image: 'https://picsum.photos/seed/star4/600/400', category: 'star-signs' },
  { id: 's5', title: 'Gemini', image: 'https://picsum.photos/seed/star5/600/400', category: 'star-signs' },
  { id: 's6', title: 'Leo', image: 'https://picsum.photos/seed/star6/600/400', category: 'star-signs' },
];

const MOCK_FINISHES: Finish[] = [
  { id: 'black', color: 'bg-zinc-800' },
  { id: 'gold', color: 'bg-yellow-500' },
  { id: 'silver', color: 'bg-zinc-400' },
  { id: 'rose', color: 'bg-rose-400' },
  { id: 'holographic', color: 'bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400' },
];

const bestSellersService = {
  getCategories: async (): Promise<Category[]> => {
    const cached = sessionStorage.get<Category[]>(SESSION_KEYS.CATEGORIES);
    if (cached) return cached;

    const data = MOCK_CATEGORIES;
    sessionStorage.set(SESSION_KEYS.CATEGORIES, data);
    return data;
  },

  getProducts: async (): Promise<Product[]> => {
    const cached = sessionStorage.get<Product[]>(SESSION_KEYS.PRODUCTS);
    if (cached) return cached;

    const data = MOCK_PRODUCTS;
    sessionStorage.set(SESSION_KEYS.PRODUCTS, data);
    return data;
  },

  getFinishes: async (): Promise<Finish[]> => {
    const cached = sessionStorage.get<Finish[]>(SESSION_KEYS.FINISHES);
    if (cached) return cached;

    const data = MOCK_FINISHES;
    sessionStorage.set(SESSION_KEYS.FINISHES, data);
    return data;
  },

  clearCache: () => {
    sessionStorage.remove(SESSION_KEYS.CATEGORIES);
    sessionStorage.remove(SESSION_KEYS.PRODUCTS);
    sessionStorage.remove(SESSION_KEYS.FINISHES);
  },
};

export { bestSellersService };
