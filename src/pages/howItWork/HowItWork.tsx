/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Wifi, Info } from 'lucide-react';
import FinancialSafety from '@/components/modules/home/FinancialSafety';
import card1 from '@/assets/images/card1.webp';
import card2 from '@/assets/images/card2.webp';
import card3 from '@/assets/images/card3.webp';
import card4 from '@/assets/images/card4.webp';
import card5 from '@/assets/images/card5.webp';
import card6 from '@/assets/images/card6.webp';
import card7 from '@/assets/images/card7.webp';
import card8 from '@/assets/images/card8.webp';
import card9 from '@/assets/images/card9.webp';
import card10 from '@/assets/images/card10.webp';
import circuit from '@/assets/images/circuit.png';
import newContactlessChips from '@/assets/images/new-contactless-chips-1.png';
import chipsNon from '@/assets/images/chips2-non.jpg';

const CardMarquee = ({ direction = 'left', images }: { direction?: 'left' | 'right', images: string[] }) => {
  const cardWidth = 208;
  const distance = images.length * cardWidth;

  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex gap-2 sm:gap-4"
        animate={{ x: direction === 'left' ? [0, -distance] : [-distance, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...images, ...images, ...images].map((src, idx) => (
          <div key={`${idx}-${idx % images.length}`} className="relative w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 rounded-xl overflow-hidden border border-white/10 shadow-2xl shrink-0">
            <img 
              src={src} 
              alt="Card Design" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <img 
              src={circuit} 
              alt="" 
              className="absolute left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 w-5 h-4 sm:w-6 sm:h-5 md:w-7 md:h-5"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function HowItWork() {
  const row1Images = [card1, card2, card3, card4, card5];
  const row2Images = [card6, card7, card8, card9, card10];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-center mb-16 sm:mb-24 md:mb-32 mt-6 sm:mt-10 tracking-tight">
          How It Works
        </h1>

        <div className="space-y-8 sm:space-y-10 md:space-y-14">
          {/* STEP 1 */}
          <section className="bg-neutral-800/80 border border-white/10 rounded-2xl p-4 sm:p-6 overflow-hidden">
            <h2 className="text-base sm:text-lg md:text-[21px] font-semibold tracking-wider text-white mb-4">
              <span className='font-bold text-white/40'>STEP 1:</span> Choose your card design
            </h2>
            <div className="space-y-2 mb-6">
              <CardMarquee direction="right" images={row1Images} />
              <CardMarquee direction="left" images={row2Images} />
            </div>
            <p className="text-base sm:text-lg md:text-[21px] text-white/50 font-semibold border-t border-white/10 pt-4">
              <span className="underline cursor-pointer hover:text-white transition-colors">Choose your card design</span> and upload your logo.
            </p>
          </section>

          {/* STEP 2 */}
          <section className="bg-neutral-800/80 border border-white/10 rounded-2xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg md:text-[21px] font-semibold tracking-wider text-white mb-2">
             <span className='font-bold text-white/40'>STEP 2:</span> Complete order details.
            </h2>
          
          </section>

          {/* STEP 3 */}
          <section className="bg-neutral-800/80 border border-white/10 rounded-2xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg md:text-[21px] font-semibold uppercase tracking-wider text-white mb-2">
             <span className='font-bold text-white/40'>STEP 3:</span> 'Freeze' your card
            </h2>
            <p className="text-base sm:text-lg md:text-[21px] text-white/50">
              'Freeze' your card for safety measures and Ship it to us.
            </p>
          </section>

          {/* STEP 4 */}
          <section className="bg-neutral-800/80 border border-white/10 rounded-2xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg md:text-[21px] font-semibold uppercase tracking-wider text-white mb-2">
             <span className='font-bold text-white/40'>STEP 4:</span> We start working on your design
            </h2>
            <p className="text-base sm:text-lg md:text-[21px] text-white/50">
              We start working on your design straight away so that we can carry out the transfer process the day your card arrives. We laser engrave your design along with your important card details.
            </p>
          </section>

          {/* STEP 5 */}
          <section className="bg-neutral-800/80 border border-white/10 rounded-2xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg md:text-[21px] font-semibold uppercase tracking-wider text-white mb-2">
             <span className='font-bold text-white/40'>STEP 5:</span> We send you your new card
            </h2>
            <p className="text-base sm:text-lg md:text-[21px] text-white/50">
              We send you your new card along with your old plastic card.
            </p>
          </section>
        </div>

        {/* IMPORTANT INFORMATION */}
        <div className="mt-12 sm:mt-16 md:mt-20 space-y-8 sm:space-y-10 md:space-y-12">
          <div>
            <h3 className="text-base sm:text-lg md:text-[21px] text-white/50 font-semibold mb-6">Important information</h3>
            <div className="h-px bg-neutral-800/80 w-full mb-8" />
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base sm:text-lg md:text-[21px] text-white/50 font-sm">Contactless Payments</span>
              <Wifi className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>

            <img 
              src={newContactlessChips} 
              alt="Contactless Chips" 
              className="w-full rounded-lg mb-4"
              referrerPolicy="no-referrer"
            />

            <p className="text-base sm:text-lg md:text-[21px] text-white/80 leading-relaxed">
              We can upgrade cards with these exact chips to a metal contactless payment card. Please note: if your exact chip is not on this list, your card will not work for contactless payments. However you will still be able to insert, swipe and use Apple / Samsung pay.
            </p>
          </div>

          <div className="pt-8 border-t border-neutral-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base sm:text-lg md:text-[21px] text-white/50 font-medium">Non-compatible Chips</span>
              <Info className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>

            <img 
              src={chipsNon} 
              alt="Non-compatible Chips" 
              className="w-full rounded-lg mb-4"
              referrerPolicy="no-referrer"
            />

            <p className="text-base sm:text-lg md:text-[21px] text-white/80 leading-relaxed">
              We are unable to customize cards with these chips. Please contact us if you're not sure about your chip type.
            </p>
          </div>
        </div>

       
      </div>
    <div className='mt-20 sm:mt-28 md:mt-40'>
         <FinancialSafety />
    </div>
    </div>
  );
}
