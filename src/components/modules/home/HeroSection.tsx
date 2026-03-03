import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin outside the component
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Ensure video is paused so it only moves via GSAP
    video.pause();
    video.currentTime = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%", // Scroll distance (more % = slower playback)
        pin: true,     // Keeps the section stuck while video plays
        scrub: 1,      // Smoothly catches up to scroll position (removes jitter)
        anticipatePin: 1,
      },
    });

    // Animate the video time
    tl.to(video, {
      currentTime: video.duration || 1,
      ease: "none",
    });

    // Optional: Fade out text as video finishes
    tl.to(".hero-content", { opacity: 0, y: -50, ease: "power1.inOut" }, 0.5);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <div className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative">
        <video
          ref={videoRef}
          src="/heroVideo.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover -z-10 "
        />
        
        {/* Content Wrapper for animation */}
        <div className="hero-content z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mb-8 text-white">
            Contactless Metal <br /> Credit & Debit Cards
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-base font-medium">
              Design Your Own
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 text-base font-medium text-white border-white hover:bg-white hover:text-black">
              Pre-made designs
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;