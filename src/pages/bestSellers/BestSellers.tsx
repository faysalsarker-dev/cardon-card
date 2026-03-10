// import React from 'react'

// export default function BestSellers() {
//   return (
//     <div>BestSellers</div>
//   )
// }

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    User,
    Dices,
    Star,
    MoreHorizontal,
    Headphones,
    Gem,
    Bitcoin,
    PawPrint,
    Search
} from 'lucide-react';
import { motion } from 'motion/react';

// Types
interface Category {
    id: string;
    name: string;
    count: number;
    icon: string;
}

interface Product {
    id: string;
    title: string;
    image: string;
    category: string;
}

// Mock Data
const CATEGORIES: Category[] = [
    { id: 'anime', name: 'Anime', count: 21, icon: 'https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/categories/icon-anime.svg' },
    { id: 'high-rollers', name: 'High Rollers', count: 9, icon: "https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/categories/icon-high-rollers.svg" },
    { id: 'star-signs', name: 'Star Signs', count: 12, icon: "https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/categories/icon-star-signs.svg" }
];

const PRODUCTS: Product[] = [
    // Anime
    { id: 'a1', title: 'Zero Two', image: 'https://picsum.photos/seed/anime1/600/400', category: 'anime' },
    { id: 'a2', title: 'Anime Titties', image: 'https://picsum.photos/seed/anime2/600/400', category: 'anime' },
    { id: 'a3', title: 'Goku', image: 'https://picsum.photos/seed/anime3/600/400', category: 'anime' },
    { id: 'a4', title: 'Blue Eyes White Dragon', image: 'https://picsum.photos/seed/anime4/600/400', category: 'anime' },
    { id: 'a5', title: 'Naruto', image: 'https://picsum.photos/seed/anime5/600/400', category: 'anime' },
    { id: 'a6', title: 'Charizard', image: 'https://picsum.photos/seed/anime6/600/400', category: 'anime' },

    // High Rollers
    { id: 'h1', title: 'Skull Cards', image: 'https://picsum.photos/seed/cards1/600/400', category: 'high-rollers' },
    { id: 'h2', title: 'Ace of Spades', image: 'https://picsum.photos/seed/cards2/600/400', category: 'high-rollers' },
    { id: 'h3', title: 'Golden Dice', image: 'https://picsum.photos/seed/cards3/600/400', category: 'high-rollers' },
    { id: 'h4', title: 'King of Hearts', image: 'https://picsum.photos/seed/cards4/600/400', category: 'high-rollers' },
    { id: 'h5', title: 'Joker Gold', image: 'https://picsum.photos/seed/cards5/600/400', category: 'high-rollers' },
    { id: 'h6', title: 'Holographic King', image: 'https://picsum.photos/seed/cards6/600/400', category: 'high-rollers' },

    // Star Signs
    { id: 's1', title: 'Aquarius', image: 'https://picsum.photos/seed/star1/600/400', category: 'star-signs' },
    { id: 's2', title: 'Aries', image: 'https://picsum.photos/seed/star2/600/400', category: 'star-signs' },
    { id: 's3', title: 'Cancer', image: 'https://picsum.photos/seed/star3/600/400', category: 'star-signs' },
    { id: 's4', title: 'Capricorn', image: 'https://picsum.photos/seed/star4/600/400', category: 'star-signs' },
    { id: 's5', title: 'Gemini', image: 'https://picsum.photos/seed/star5/600/400', category: 'star-signs' },
    { id: 's6', title: 'Leo', image: 'https://picsum.photos/seed/star6/600/400', category: 'star-signs' },
];

const FINISHES = [
    { id: 'black', color: 'bg-zinc-800' },
    { id: 'gold', color: 'bg-yellow-500' },
    { id: 'silver', color: 'bg-zinc-400' },
    { id: 'rose', color: 'bg-rose-400' },
    { id: 'holographic', color: 'bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400' },
];

export default function BestSellers() {
    const [activeCategory, setActiveCategory] = useState('anime');

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 md:mt-20 mt-10">
            {/* Header */}
            <header className="pt-16 pb-8 text-center px-4">
                <h1 className="text-5xl md:text-[77px] font-bold tracking-tight mb-4">Best Sellers</h1>
                <p className="text-[#fff] text-[22px] font-semibold">Select one of our Best Sellers, add your name and checkout!</p>
            </header>

            <main className="max-w-7xl mx-auto px-4 pb-24 space-y-20">

                {/* Explore by Category */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div className='w-full'>
                            <h2 className="text-[32px] font-semibold">Explore by Category</h2>
                            <div className='w-full h-[1px] bg-gray-600 mt-2'></div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                className={`relative flex flex-col items-center justify-center p-6 rounded-md border border-[#abb8c3]/20 transition-all duration-300 w-[178px] h-[191px]`}
                            >
                                <span className="absolute top-2 left-2 text-[10px] font-bold bg-white text-black px-1.5 py-0.5 rounded-full">
                                    {cat.count}
                                </span>
                                <div className={`mb-3 transition-transform duration-300 hover:bg-white bg-gray-900 w-[80px] h-[80px] rounded-full flex justify-center items-center`}>
                                    {/* {cat.icon} */}
                                    <img className='w-[40px] h-[40px]' src={cat.icon} alt="icon" />
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider`}>
                                    {cat.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Product Sections */}
                {['anime', 'high-rollers', 'star-signs'].map((catId) => {
                    const category = CATEGORIES.find(c => c.id === catId);
                    const products = PRODUCTS.filter(p => p.category === catId);

                    return (
                        <section key={catId} className="space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="text-white">
                                        <img src={category?.icon} alt="icons" />
                                    </div>
                                    <h3 className="text-[32px] font-bold flex items-baseline gap-2">
                                        {category?.name}
                                        <span className="text-sm font-normal text-zinc-500">{category?.count} items</span>
                                    </h3>
                                </div>

                                <div className="flex items-center gap-2">
                                    {FINISHES.map((finish) => (
                                        <button
                                            key={finish.id}
                                            className={`w-6 h-6 rounded-full ${finish.color} border border-white/10 hover:scale-110 transition-transform cursor-pointer`}
                                            title={finish.id}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative aspect-[1.58/1] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover:border-zinc-600 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                            {/* Card Design */}
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                                referrerPolicy="no-referrer"
                                            />

                                            {/* Chip Overlay */}
                                            <div className="absolute top-1/2 left-8 -translate-y-1/2 w-12 h-10 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-md opacity-90 shadow-inner">
                                                <div className="absolute inset-1 border border-black/20 rounded-sm grid grid-cols-3 grid-rows-3 gap-px">
                                                    {[...Array(9)].map((_, i) => (
                                                        <div key={i} className="border border-black/10" />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                    Customize
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <h4 className="font-medium text-zinc-300 group-hover:text-white transition-colors">{product.title}</h4>
                                            <span className="text-sm text-zinc-500">$24.99</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center pt-8">
                                <button className="px-[32px] py-[12px] text-[32px] rounded-full border border-[#fff] font-bold text-sm transition-colors">
                                    {catId === 'anime' ? 'See Less' : 'Load More'}
                                </button>
                            </div>
                        </section>
                    );
                })}

            </main>

            {/* Footer / Search Button */}
            {/* <div className="fixed bottom-8 right-8">
                <button className="w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                    <Search className="w-6 h-6" />
                </button>
            </div> */}
        </div>
    );
}

