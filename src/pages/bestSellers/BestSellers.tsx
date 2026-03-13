import { useState, useRef } from 'react';
import { 
  Dices, 
  Star, 
  MoreHorizontal, 
  Headphones, 
  Gem, 
  Bitcoin, 
  PawPrint, 
  Building2, 
  Trophy, 
  Palette,
  Play,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import circuitImg from '../../assets/images/circuit.png';
import productsData from '../data/products.json';

// Dynamically import all images from cardImages folder
const imageModules = import.meta.glob('../../assets/cardImages/*.webp', { eager: true });

// Create a mapping of filename to image path
const imageMap: Record<string, string> = {};
Object.entries(imageModules).forEach(([path, module]) => {
  const filename = path.split('/').pop() || '';
  imageMap[filename] = (module as { default: string }).default;
});

// Dynamically import all color images
const colorImageModules = import.meta.glob('../../assets/colorsImages/*', { eager: true });

// Create a mapping of color name to image path
const colorImageMap: Record<string, string> = {};
Object.entries(colorImageModules).forEach(([path, module]) => {
  const filename = path.split('/').pop() || '';
  const colorName = filename.split('.')[0]; // Remove extension
  colorImageMap[colorName] = (module as { default: string }).default;
});


// Mapping icon names to components
const IconMap: Record<string, any> = {
  Dices,
  Star,
  MoreHorizontal,
  Headphones,
  Gem,
  Bitcoin,
  PawPrint,
  Building2,
  Trophy,
  Palette,
  Play
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
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const totalItems = productsData.categories.length;
    
    if (direction === 'right') {
      if (scrollIndex + 7 < totalItems) {
        setScrollIndex(prev => prev + 1);
      }
    } else {
      if (scrollIndex > 0) {
        setScrollIndex(prev => prev - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
  
      <main className="max-w-7xl mx-auto px-6 pb-12 pt-40" >
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Best Sellers</h1>
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto">
            Select one of our Best Sellers, add your name and checkout!
          </p>
          {/* <p>
             Select one of our Best Sellers, add your name and checkout!
          </p> */}
        </header>

        {/* Category Quick Navigation (Horizontal Bar) */}
        <section className="mb-24 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Explore by Category</h2>
            <div className="flex gap-3">
              <button 
                onClick={() => handleScroll('left')}
                disabled={scrollIndex === 0}
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white"
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={() => handleScroll('right')}
                disabled={scrollIndex + 7 >= productsData.categories.length}
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              animate={{ x: `-${scrollIndex * (100 / 7)}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
              className="flex gap-4"
            >
              {productsData.categories.map((cat) => {
                const Icon = IconMap[cat.icon];
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="flex-none w-[calc((100%-6*1rem)/7)] aspect-[0.85/1] bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center gap-6 transition-all duration-300 group hover:border-white/20 hover:bg-[#111111] relative"
                  >
                    {/* Count Badge */}
                    <div className="absolute top-3 left-3 w-6 h-6 bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center">
                      {cat.count}
                    </div>

                    {/* Icon Circle */}
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110">
                      <Icon size={28} className="text-white/80 group-hover:text-white" />
                    </div>

                    {/* Name */}
                    <span className="text-[12px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors text-center">
                      {cat.name}
                    </span>
                  </a>
                );
              })}
            </motion.div>
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
                  
                  {/* Color Filter */}
                  <div className="flex gap-1.5">
                    {['gold', 'silver', 'rose', 'black', 'rainbow', 'blackgold'].map((color) => (
                      <div 
                        key={color} 
                        className="w-10 h-10 rounded-full border border-white/10 cursor-pointer hover:scale-110 transition-transform overflow-hidden"
                      >
                        <img 
                          src={colorImageMap[color]} 
                          alt={color}
                          className="w-full h-full object-cover"
                        />
                      </div>
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
                        className="group relative aspect-[1.6/1] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer"
                      >
                        {/* Background Image with Opacity on Hover */}
                        <img 
                          src={imageMap[item.image]} 
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-50 transition-all duration-500"
                        />
                        
                        {/* Card Details (Circuit Image) */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-center">
                          <img 
                            src={circuitImg} 
                            alt="circuit"
                            className="w-12 h-10 object-cover rounded-md shadow-lg"
                          />
                        </div>

                        {/* Hover Overlay with Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="px-8 py-2.5 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
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
