import { useRef, useEffect, useState } from "react";
import palmHand from "@/assets/images/palm_2.webp";



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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
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
      setActiveStep(Math.min(Math.floor(p * steps.length), steps.length - 1));
      
      if (videoRef.current && videoRef.current.duration) {
        videoRef.current.currentTime = Math.min(p * videoRef.current.duration, videoRef.current.duration);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Video float: slight vertical oscillation tied to scroll
  const floatY = Math.sin(scrollProgress * Math.PI * 1.3) * 18;

  const step = steps[activeStep];

  return (
    <section className="py-20 md:py-20 bg-black" ref={sectionRef}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <div className="w-full max-w-325 mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-20 items-center">

          <div className="flex items-center justify-center relative h-125">
            <div className="absolute w-75 h-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(180,130,10,0.12) 0%, transparent 70%)" }} />
            <video
              ref={videoRef}
              src="/cardvideo.mp4"
              muted
              className="absolute rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] will-change-transform"
              style={{ width: "338px", height: "338px", bottom: "180px", left: "50%", transform: `translateX(-50%) translateY(${floatY}px)` }}
            />
            <img
              src={palmHand}
              alt="Hand with video"
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 pointer-events-none select-none"
              style={{ width: "550px", height: "172px", filter: "drop-shadow(0 -20px 60px rgba(0,0,0,0.9))" }}
            />
          </div>

          <div className="pl-5">
            <h2 className="text-white mb-8 whitespace-pre-line tracking-wide font-bold text-3xl md:text-4xl w-1/2 leading-tight">Your Card
Comes To Life</h2>
            <div className="transition-opacity duration-300" key={activeStep}>
              <p className="text-[21px] font-bold text-white/50 mb-3 tracking-wider font-dm-sans">{step.number}</p>
              <p className="text-[21px] text-white/50 leading-relaxed max-w-105 mb-20 font-semibold font-dm-sans">{step.desc}</p>
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