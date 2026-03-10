

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { bestSellersService } from '../../services/bestSellersService';

export default function BestSellers() {
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [finishes, setFinishes] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [cats, prods, fins] = await Promise.all([
                    bestSellersService.getCategories(),
                    bestSellersService.getProducts(),
                    bestSellersService.getFinishes(),
                ]);
                setCategories(cats);
                setProducts(prods);
                setFinishes(fins);
            } catch (error) {
                console.error('Failed to load best sellers data:', error);
            }
        };

        loadData();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 md:mt-20 mt-10">
            {/* Header */}
            <header className="pt-16 pb-8 text-center px-4">
                <h1 className="text-5xl md:text-[77px] font-bold tracking-tight mb-4">Best Sellers</h1>
                <p className="text-white text-[22px] font-semibold">Select one of our Best Sellers, add your name and checkout!</p>
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
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`relative flex flex-col items-center justify-center p-6 rounded-md border border-[#abb8c3]/20 transition-all duration-300 w-[178px] h-[191px]`}
                            >
                                <span className="absolute top-2 left-2 text-[10px] font-bold bg-white text-black px-1.5 py-0.5 rounded-full">
                                    {cat.count}
                                </span>
                                <div className={`mb-3 transition-transform duration-300 hover:bg-white bg-gray-900 w-20 h-20 rounded-full flex justify-center items-center`}>
                                    {/* {cat.icon} */}
                                    <img className='w-10 h-10' src={cat.icon} alt="icon" />
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
                    const category = categories.find(c => c.id === catId);
                    const categoryProducts = products.filter(p => p.category === catId);

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
                                    {finishes.map((finish) => (
                                        <button
                                            key={finish.id}
                                            className={`w-6 h-6 rounded-full ${finish.color} border border-white/10 hover:scale-110 transition-transform cursor-pointer`}
                                            title={finish.id}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {categoryProducts.map((product) => (
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
                                            <div className="absolute top-1/2 left-8 -translate-y-1/2 w-12 h-10 bg-linear-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-md opacity-90 shadow-inner">
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
                                <button className="px-[32px] py-[12px] text-[32px] rounded-full border border-white font-bold text-sm transition-colors">
                                    {catId === 'anime' ? 'See Less' : 'Load More'}
                                </button>
                            </div>
                        </section>
                    );
                })}

            </main>

         
        </div>
    );
}

