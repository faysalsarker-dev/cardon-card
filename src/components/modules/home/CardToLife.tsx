import { useRef, useEffect, useState } from "react";
import palmHand from "@/assets/images/palm_2.webp";

function CardFront() {
  return (
    <div className="w-full h-full rounded-2xl relative overflow-hidden backface-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(180,130,20,0.15)]" style={{ background: "linear-gradient(135deg, #7a5c0a 0%, #c9940a 20%, #f5d060 45%, #d4a012 65%, #8a6510 85%, #f0c840 100%)" }}>
      <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(92deg, transparent 0, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)" }} />
      <div className="absolute top-7 left-7">
        <svg width="52" height="38" viewBox="0 0 52 38" fill="none">
          <rect x="0.5" y="0.5" width="51" height="37" rx="5" fill="#b89040" stroke="#8a6820" strokeWidth="1"/>
          <rect x="17" y="0.5" width="18" height="37" fill="#c9a050" stroke="#8a6820" strokeWidth="0.5"/>
          <rect x="0.5" y="12" width="51" height="13" fill="#c9a050" stroke="#8a6820" strokeWidth="0.5"/>
          <rect x="17" y="12" width="18" height="13" fill="#d4b060" stroke="#8a6820" strokeWidth="0.5"/>
        </svg>
      </div>
      <div className="absolute left-0 right-0 h-[18%]" style={{ top: "38%", background: "linear-gradient(180deg, #111 0%, #000 50%, #111 100%)" }} />
      <div className="absolute bottom-13.5 left-7 flex gap-4 font-mono text-[13px] tracking-[2px] text-black/50">
        {["0000","0000","0000","0000"].map((g, i) => <span key={i}>{g}</span>)}
      </div>
      <div className="absolute bottom-6.5 left-7 text-[11px] tracking-[3px] text-black/40 uppercase font-mono">CARBON CARD</div>
      <div className="absolute bottom-5.5 right-7 flex">
        <div className="w-8 h-8 rounded-full bg-black/35" />
        <div className="w-8 h-8 rounded-full bg-black/20 -ml-3.5" />
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="w-full h-full rounded-2xl absolute inset-0 backface-hidden overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)]" style={{ background: "linear-gradient(135deg, #111 0%, #1e1e1e 50%, #0a0a0a 100%)", transform: "rotateY(180deg)" }}>
      <div className="absolute left-0 right-0 h-[16%] bg-black" style={{ top: "20%" }} />
      <div className="absolute left-7 h-[10%] rounded-sm" style={{ top: "44%", right: "80px", background: "repeating-linear-gradient(90deg, #fff 0, #fff 8px, #ddd 8px, #ddd 16px)" }} />
      <div className="absolute right-7 h-[10%] w-12 bg-[#e8c040] rounded-sm flex items-center justify-center text-[10px] font-bold text-black" style={{ top: "44%" }}>CVV</div>
      <div className="absolute bottom-6 right-7 text-[10px] text-white/20 tracking-[2px] uppercase">carboncoskins.com</div>
    </div>
  );
}

// ─── Steps data ────────────────────────────────────────────────────────────
const steps = [
  {
    number: "Step 1",
    title: "Your Card\nComes To Life",
    desc: "Create your own Custom Design or choose from one of our Best Sellers. Once you have chosen your design complete the order details.",
  },
  {
    number: "Step 2",
    title: "Ship It\nTo Us",
    desc: "Freeze your card for safety measures then ship it to us securely. We'll begin working on your design the day it arrives.",
  },
  {
    number: "Step 3",
    title: "Laser\nEngraved",
    desc: "We laser engrave your custom design along with all your important card details onto a premium metal card body.",
  },
  {
    number: "Step 4",
    title: "Delivered\nTo Your Door",
    desc: "We send your new metal card back along with your original plastic card, packaged in discreet unbranded packaging.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────
export default function CardComesToLife() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0–1 through entire section
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress: 0 when top of section hits bottom of viewport, 1 when bottom of section hits top
      const total = rect.height + windowH;
      const gone = windowH - rect.top;
      const p = Math.min(Math.max(gone / total, 0), 1);
      setScrollProgress(p);
      // Active step from progress
      setActiveStep(Math.min(Math.floor(p * steps.length * 1.1), steps.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Card rotation: 0deg at start → 360deg (full flip) at end of scroll
  const rotateY = scrollProgress * 360;

  // Card float: slight vertical oscillation tied to scroll
  const floatY = Math.sin(scrollProgress * Math.PI * 2) * 18;

  // Card tilt (perspective tilt on X axis)
  const tiltX = -15 + scrollProgress * 10;

  const step = steps[activeStep];

  return (
    <section className="py-20 md:py-24 bg-black" ref={sectionRef}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <div className="w-full max-w-325 mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-20 items-center">

          <div className="flex items-center justify-center relative h-125">
            <div className="absolute w-75 h-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(180,130,10,0.12) 0%, transparent 70%)" }} />
            <div className="absolute top-7.5 left-1/2 w-70 h-44 transform-3d origin-center will-change-transform" style={{ transform: `translateX(-50%) translateY(${floatY}px) rotateX(${tiltX}deg) rotateY(${rotateY}deg)`, perspective: "1200px" }}>
              <div className="absolute inset-0 backface-hidden">
                <CardFront />
              </div>
              <CardBack />
            </div>
            <img
              src={palmHand}
              alt="Hand with card"
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-85 pointer-events-none select-none"
              style={{ filter: "drop-shadow(0 -20px 60px rgba(0,0,0,0.9))" }}
            />
          </div>

          <div className="pl-5">
            <div className="transition-opacity duration-300" key={activeStep}>
              <p className="text-sm font-semibold text-gray-500 mb-3 tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.number}</p>
              <h2 className="text-white mb-8 whitespace-pre-line tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 0.95 }}>{step.title}</h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-105 mb-12 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</p>
            </div>
            <div className="flex gap-2.5 items-center">
              {steps.map((_, i) => (
                <div key={i} className={`rounded transition-all duration-350 cursor-pointer ${i === activeStep ? "bg-white w-9 h-1.5" : "bg-gray-700 w-1.5 h-1.5"}`} />
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}