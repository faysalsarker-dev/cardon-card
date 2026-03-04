import { useState } from "react";
import { Button } from "@/components/ui/button";
import arrowPrev from "@/assets/images/prev.svg";
import arrowNext from "@/assets/images/next.svg";
import bclubRb from "@/assets/images/bclub-rb.webp";
import mclubG from "@/assets/images/mclub-g.webp";
import blackImg from "@/assets/images/black.webp";
import silverImg from "@/assets/images/silver.webp";

const cards = [
  { id: 0, title: "Millionaire Card", image: bclubRb, buttonLabel: "ADD TO CART" },
  { id: 1, title: "Royal King", image: mclubG, buttonLabel: "ADD TO CART" },
  { id: 2, title: "Black Edition", image: blackImg, buttonLabel: "ADD TO CART" },
  { id: 3, title: "Silver Edition", image: silverImg, buttonLabel: "ADD TO CART" },
];

export default function MyBestSellers() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => activeIndex < cards.length - 1 && setActiveIndex(activeIndex + 1);
  const goPrev = () => activeIndex > 0 && setActiveIndex(activeIndex - 1);

  const activeCard = cards[activeIndex];

  const getRelativeIndex = (index: number) => {
    const offset = index - activeIndex;
    if (offset === 0) return 0;
    if (offset === 1) return 1;
    if (offset === -1) return -1;
    return 99;
  };

  return (
    <section className="py-32 md:py-40 bg-black">
      <div className="mx-auto">
        <div className="w-full text-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">
            Best Sellers
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/70">
            Select one of our Best Sellers, add your name and checkout!
          </p>
        </div>

        <div className="relative mt-16 md:mt-20 mb-8">
          {/* Slider arrows */}
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Previous card"
            className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 w-10 h-10 hover:bg-white/10 transition-colors z-10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img src={arrowPrev} alt="Previous" className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === cards.length - 1}
            aria-label="Next card"
            className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 w-10 h-10 hover:bg-white/10 transition-colors z-10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img src={arrowNext} alt="Next" className="w-4 h-4" />
          </button>

          <div className="overflow-hidden">
            <div className="relative h-[600px] flex items-center justify-center">
              {cards.map((card, index) => {
                const rel = getRelativeIndex(index);
                const isHidden = rel === 99;

                let translateX = 0;
                if (rel === -1) translateX = -120;
                if (rel === 1) translateX = 120;

                const scale = rel === 0 ? 1 : 0.85;
                const opacity = isHidden ? 0 : rel === 0 ? 1 : 0.6;

                return (
                  <div
                    key={card.id}
                    className="absolute left-1/2 cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                    style={{
                      transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale})`,
                      opacity,
                      transition: "all 500ms ease-in-out",
                      pointerEvents: isHidden ? "none" : "auto",
                      zIndex: rel === 0 ? 2 : 1,
                    }}
                  >
                    <div className="max-w-[480px] rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-black/40">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex justify-center pb-8">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-10 py-6 text-base font-medium border-white/80 text-white hover:bg-white hover:text-black"
          >
            {activeCard.buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

