import { useState, useEffect } from "react";
import bclubRb from "@/assets/images/bclub-rb.webp";
import mclubG from "@/assets/images/mclub-g.webp";
import blackImg from "@/assets/images/black.webp";
import silverImg from "@/assets/images/silver.webp";
import circuit from "@/assets/images/circuit.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  { id: 0, title: "Millionaire Card", image: bclubRb, buttonLabel: "ADD TO CART" },
  { id: 1, title: "Royal King", image: mclubG, buttonLabel: "ADD TO CART" },
  { id: 2, title: "Black Edition", image: blackImg, buttonLabel: "ADD TO CART" },
  { id: 3, title: "Silver Edition", image: silverImg, buttonLabel: "ADD TO CART" },
  { id: 4, title: "Silver Edition 2", image: mclubG, buttonLabel: "ADD TO CART" },
  { id: 5, title: "Silver Edition 3", image: bclubRb, buttonLabel: "ADD TO CART" },
  { id: 6, title: "Silver Edition 4", image: silverImg, buttonLabel: "ADD TO CART" },
];

export default function MyBestSellers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  let touchStartX = 0;

  const goNext = () => activeIndex < cards.length - 1 && setActiveIndex(activeIndex + 1);
  const goPrev = () => activeIndex > 0 && setActiveIndex(activeIndex - 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) goNext();
    if (touchEndX - touchStartX > 50) goPrev();
  };

  const getRelativeIndex = (index: number) => index - activeIndex;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-24 md:pt-20 md:pb-30 bg-black">
      <div className="mx-auto">
        <div className="w-full text-center">
          <h2 className="text-[45px] md:text-6xl lg:text-7xl font-bold text-white">
            Best Sellers
          </h2>
          <p className="mt-4 md:mt-6 text-[18px] md:text-[21px] text-white font-medium md:w-full w-[45%] mx-auto">
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
            className="hidden md:inline-flex cursor-pointer absolute left-1/2 -translate-x-97.5 top-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors z-20 disabled:opacity-30 disabled:cursor-not-allowed"
          >

            <ChevronLeft size={64} strokeWidth={0.75} />
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === cards.length - 1}
            aria-label="Next card"
            className="hidden md:inline-flex cursor-pointer absolute left-1/2 translate-x-85 top-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors z-20 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={64} strokeWidth={0.75} />
          </button>

          <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="relative h-45 md:h-75 flex items-center justify-center">
              {cards.map((card, index) => {
                const rel = getRelativeIndex(index);

                let translateX = 0;
                let scale = 1;
                let opacity = 1;

                if (rel === -1) {
                  translateX = -142;
                  scale = isMobile ? 0.95 : 0.80;
                  opacity = 0.6;
                } else if (rel === 1) {
                  translateX = 142;
                  scale = isMobile ? 0.95 : 0.80;
                  opacity = 0.6;
                } else if (rel === 0) {
                  scale = isMobile ? 1.40 : 1;
                } else if (rel < -1) {
                  translateX = -200;
                  scale = 0.7;
                  opacity = 0;
                } else if (rel > 1) {
                  translateX = 200;
                  scale = 0.7;
                  opacity = 0;
                }

                return (
                  <div
                    key={card.id}
                    className="absolute left-1/2 cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                    style={{
                      transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale})`,
                      opacity,
                      transition: "transform 500ms ease-in-out, opacity 500ms ease-in-out",
                      pointerEvents: rel === 0 ? "auto" : "none",
                      zIndex: rel === 0 ? 2 : 1,
                    }}
                  >
                    <div className="max-w-125 rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-black/40">
                      {index === cards.length - 1 ? (
                        <div className="md:w-125 w-52.5 h-32 md:h-75 border py-2 border-gray-700/70 rounded-2xl flex justify-center items-center">
                          <a className="md:text-4xl text-xl text-white font-bold cursor-pointer" href="/best-sellers">View More</a>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-auto block"
                          />
                          <img 
                            src={circuit} 
                            alt="" 
                            className="absolute left-10 top-1/2 -translate-y-1/2 w-20 h-14"
                          />
                        </div>
                      )}
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
              className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex justify-center pb-8">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-7 pt-7 pb-8 text-2xl font-medium border-2 border-white/80 text-white hover:bg-white hover:text-black"
          >
            {cards[activeIndex].buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

