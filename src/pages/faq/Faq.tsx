/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    id: 'general',
    title: 'General Questions',
    items: [
      {
        question: 'Will My New Metal Card Work?',
        answer: 'Yes, your new metal card is designed to work exactly like your original card. We transfer the EMV chip and magnetic stripe data to ensure full compatibility with POS terminals and ATMs worldwide.',
      },
      {
        question: 'Is It Safe?',
        answer: 'Security is our top priority. We do not store any of your card information. The process is performed in a secure environment, and your original card is returned to you or destroyed based on your preference.',
      },
      {
        question: 'How Long Does the Process Take?',
        answer: 'Once we receive your card, the conversion process typically takes 1-2 business days. Shipping times vary depending on your location and the shipping method selected.',
      },
      {
        question: 'What happens if my card is lost or stolen?',
        answer: 'If your metal card is lost or stolen, you should contact your bank immediately to freeze the account, just as you would with a standard plastic card.',
      },
      {
        question: 'Will my card work in ATM machines?',
        answer: 'Yes, our metal cards are engineered to be the same thickness as standard plastic cards, ensuring they work seamlessly in most ATM machines.',
      },
      {
        question: 'What can I Have on my Custom Card?',
        answer: 'You can have almost anything! From simple text and logos to intricate custom designs. Our laser engraving process allows for high-precision detailing.',
      },
      {
        question: 'Is my card compatible?',
        answer: 'Most credit and debit cards with a standard EMV chip are compatible. If you are unsure, feel free to contact our support team with a photo of your card.',
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping',
    items: [
      {
        question: 'Where do you Ship?',
        answer: 'We offer worldwide shipping. Whether you are in the US, Europe, Asia, or anywhere else, we can get your custom metal card to you.',
      },
      {
        question: 'How Much Does Shipping Cost?',
        answer: 'Shipping costs vary by location. We offer standard and express options. You can see the exact shipping cost at checkout before finalizing your order.',
      },
      {
        question: 'Shipping times?',
        answer: 'Domestic shipping usually takes 3-5 business days, while international shipping can take 7-14 business days depending on customs and local postal services.',
      },
    ],
  },
  {
    id: 'creating',
    title: 'Creating',
    items: [
      {
        question: 'Choosing a design?',
        answer: 'You can browse our gallery of pre-made designs or use our online builder to create something unique. You can also upload your own vector files for a truly custom look.',
      },
      {
        question: 'Where are you located?',
        answer: 'We are headquartered in the United States, where all our card conversions and custom engravings are performed by our expert technicians.',
      },
      {
        question: 'Uploading Your Logo',
        answer: 'For the best results, please upload your logo in a high-resolution vector format (AI, EPS, or SVG). We also accept high-quality PNG and JPG files.',
      },
    ],
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
  key?: React.Key;
}

const AccordionItem = ({ item, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className={`border border-white/10 rounded-lg overflow-hidden mb-10 transition-colors ${
      isOpen ? 'bg-neutral-800' : 'bg-black/40'
    }`}>
      <button
        onClick={onClick}
        className="w-full px-3 md:px-6 py-3 md:py-5 flex items-center justify-between text-left transition-colors cursor-pointer"
      >
        <span className="text-base md:text-lg lg:text-[24px] font-medium text-white/90">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-3 md:px-6 pb-4 md:pb-6 text-sm md:text-base lg:text-[20px] leading-relaxed text-white/60">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<Record<string, Set<number>>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const toggleItem = (categoryId: string, index: number) => {
    setOpenItems((prev) => {
      const currentOpen = prev[categoryId] || new Set();
      const newOpen = new Set(currentOpen);
      if (newOpen.has(index)) {
        newOpen.delete(index);
      } else {
        newOpen.add(index);
      }
      return { ...prev, [categoryId]: newOpen };
    });
  };

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setActiveCategory(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const category of FAQ_DATA) {
        const element = sectionRefs.current[category.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      {/* Header */}
      <header className="pt-12 md:pt-24 pb-6 md:pb-10 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl lg:text-7xl mt-4 md:mt-10 font-bold tracking-tight mb-2 md:mb-4"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/50 text-xs md:text-sm lg:text-[21px] pt-1 md:pt-2 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2"
        >
          If your questions are not covered below, email us at{' '}
          <a 
            href="mailto:info@carboncoskins.com" 
            className="text-white underline underline-offset-4 hover:text-white/80 transition-colors"
          >
            info@carboncoskins.com
          </a>
        </motion.p>
      </header>

      <main className="max-w-6xl mx-auto px-3 md:px-6 pb-16 flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-24 relative">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block md:w-64 shrink-0">
          <nav className="sticky top-12 space-y-1 relative">
            <div className="absolute left-0  top-0 bottom-0 w-1 bg-white/20" />
            {FAQ_DATA.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className={`w-full text-left px-4 py-2 text-[13px] font-semibold transition-all relative flex items-center group ${
                  activeCategory === category.id 
                    ? 'text-white' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {activeCategory === category.id && (
                  <motion.div 
                    layoutId="activeBar"
                    className="absolute left-0 w-1 h-12 bg-white"
                  />
                )}
                <span className={activeCategory === category.id ? 'translate-x-2 text-[21px]' : 'group-hover:translate-x-1 transition-transform text-[21px]'}>
                  {category.title}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* FAQ Content */}
        <div className="w-full md:w-auto space-y-10">
          {FAQ_DATA.map((category) => (
            <section 
              key={category.id} 
              id={category.id}
              ref={(el) => { sectionRefs.current[category.id] = el; }}
              className="scroll-mt-24"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8 tracking-tight">{category.title}</h2>
              <div className="space-y-1">
                {category.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    item={item}
                    isOpen={(openItems[category.id] || new Set()).has(index)}
                    onClick={() => toggleItem(category.id, index)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

    </div>
  );
}
