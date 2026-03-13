import { useEffect, useRef, useState } from 'react';
import './HeroSection.css';

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsReady(true);
    video.addEventListener('canplay', handleCanPlay);
    video.preload = 'metadata';

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const handleScroll = () => {
      if (!videoRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = 900;
      const scrollFraction = Math.min(scrollY / maxScroll, 1);

      videoRef.current.currentTime = videoRef.current.duration * scrollFraction;
      videoRef.current.style.opacity = scrollFraction >= 1 ? '0' : '1';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReady]);

  return (
    <section className="main_section">
      <div className="main_section_hero_video">
        <video
          ref={videoRef}
          src="./heroVideo.mp4"
          muted
          playsInline
          loop
        />
      </div>
      <div className="container">
        <h1 className="title_1 text-animation-element">Contactless Metal Credit & Debit Cards</h1>
        <p className="text_1 text-animation-element"></p>
        <div className="index-head-buttons">
          <div className="index-head-button">
            <a href="/order/" className="white_button text-animation-element">Design Your Own</a>
          </div>
          <div className="index-head-button">
            <a href="/best-sellers/" className="white_button -black text-animation-element">Pre-made designs</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
