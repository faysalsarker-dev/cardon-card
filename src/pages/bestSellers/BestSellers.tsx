import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Ghost, 
  Dices, 
  Star, 
  LayoutGrid, 
  Music, 
  Crown, 
  Bitcoin, 
  PawPrint, 
  Building2, 
  Trophy, 
  Palette,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import productsData from '../data/products.json';

// Mapping icon names to components
const IconMap: Record<string, any> = {
  Ghost,
  Dices,
  Star,
  LayoutGrid,
  Music,
  Crown,
  Bitcoin,
  PawPrint,
  Building2,
  Trophy,
  Palette
};

interface CardItem {
  id: string;
  title: string;
  image: string;
  color: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
  items: CardItem[];
}

export default function BestSellers() {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
    

      <main className="max-w-7xl mx-auto px-6 pb-12 pt-40">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Best Sellers</h1>
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto">
            Select one of our Best Sellers, add your name and checkout!
          </p>
        </header>

        {/* Category Quick Navigation (Horizontal Bar) */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">Explore by Category</h2>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scroll('right')} className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
            {productsData.categories.map((cat) => {
              const Icon = IconMap[cat.icon];
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="flex flex-col items-center gap-3 min-w-[100px] p-4 rounded-2xl transition-all duration-300 group hover:bg-white/5"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center transition-colors group-hover:border-white/20">
                      <Icon size={20} className="text-white/40 group-hover:text-white/60" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cat.count}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tighter text-white/40 group-hover:text-white/60">
                    {cat.name}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Vertical Category Sections */}
        <div className="space-y-32">
          {productsData.categories.map((category: Category) => {
            const isExpanded = expandedCategories[category.id];
            const visibleItems = isExpanded ? category.items : category.items.slice(0, 6);
            const Icon = IconMap[category.icon];

            return (
              <section key={category.id} id={category.id} className="scroll-mt-24">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className="p-2 bg-white/5 rounded-lg">
                        <Icon size={20} />
                      </div>
                    )}
                    <h3 className="text-2xl font-bold tracking-tight flex items-baseline gap-2">
                      {category.name}
                      <span className="text-sm font-normal text-white/30">{category.count} items</span>
                    </h3>
                  </div>
                  
                  {/* Color Filter Mockup */}
                  <div className="flex gap-1.5">
                    {['gold', 'silver', 'rose', 'black', 'holo'].map((color) => (
                      <div 
                        key={color} 
                        className={`w-4 h-4 rounded-full border border-white/10 cursor-pointer hover:scale-110 transition-transform ${
                          color === 'gold' ? 'bg-yellow-500' :
                          color === 'silver' ? 'bg-gray-400' :
                          color === 'rose' ? 'bg-rose-400' :
                          color === 'black' ? 'bg-zinc-800' :
                          'bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Card Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {visibleItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                        className="group relative aspect-[1.6/1] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer"
                      >
                        <img 
                          src={item.image} 
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        
                        <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent">
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-8 bg-gradient-to-br from-yellow-600 to-yellow-200 rounded-md opacity-80" />
                            <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Carbon</div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-sm font-medium tracking-widest text-white/90 uppercase drop-shadow-lg">
                              {item.title}
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-white/30" />
                              ))}
                              <span className="text-[10px] font-mono text-white/40">4242</span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                          <button onClick={() => navigate('/design-your-own')} className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Customize
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Load More / See Less Button */}
                {category.items.length > 6 && (
                  <div className="mt-12 flex justify-center">
                    <button 
                      onClick={() => toggleCategory(category.id)}
                      className="px-10 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                    >
                      {isExpanded ? 'See Less' : 'Load More'}
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>



      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
