import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin outside the component
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

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
        end: "+=100%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Animate the video time and text/buttons simultaneously
    tl.to(video, {
      currentTime: video.duration || 1,
      ease: "none",
      duration: 1,
    }, 0);

    tl.to(".hero-content", { y: -600, ease: "none", duration: 1 }, 0);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full max-w-7xl mx-auto overflow-hidden mb-8">

      <div className="h-screen w-full flex flex-col items-center justify-end text-center px-6 relative">

        <video
          ref={videoRef}
          src="/heroVideo.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          style={{ width: "1080px", height: "700px", margin: "0 auto" }}
        />

        {/* Content Wrapper for animation */}
        <div className="hero-content z-10 flex flex-col items-center pb-16">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-7xl mb-8 text-white text-center">
            Contactless Metal Credit & Debit Cards
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-5 py-4 rounded-full text-black text-3xl bg-white">
              Design Your Own
            </button>

            <button className="px-5 py-4 rounded-full text-white text-3xl border border-white hover:bg-white hover:text-black">
              Pre-made designs
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;