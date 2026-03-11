
// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardLIfecycle.css';
import { useRef, useEffect } from 'react';

function CardLIfecycle() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      step: 'Step 1',
      title: 'Your card comes to life',
      description: "Create your own Custom Design or choose from one of our Best Sellers. Once you have chosen your design complete the order details."
    },
    {
      step: 'Step 2',
      title: 'Your card comes to life',
      description: 'Freeze / Lock your card and ship it to us.'
    },
    {
      step: 'Step 3',
      title: 'Your card comes to life',
      description: "We begin working on your card straight away. This means that when your card arrives, we can simply complete the transfer process."
    },
    {
      step: 'Step 4',
      title: 'Your card comes to life',
      description: 'We ship both your old and new metal cards back within 1-2 days with tracked shipping.'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    arrows: false,
    customPaging: () => (
      <div className="custom-dot"></div>
    )
  };

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el || !videoRef.current) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height + windowH;
      const gone = windowH - rect.top;
      const p = Math.min(Math.max(gone / total, 0), 1);
      videoRef.current.currentTime = p * (videoRef.current.duration || 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="slider_section animation-element" ref={sectionRef}>
      <div className="container">
        <div className="slider__row">
          <div className="slider_img_wrapper sliders_col">
            <div className="palm_img_video">
              <video 
                ref={videoRef}
                src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/video/video-1.mp4?1" 
                muted 
                playsInline
              />
            </div>
            <div className="img palm__img">
              <img 
                src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/palm_2.webp" 
                alt="Palm" 
              />
            </div>
          </div>
          <div className="slider__wrapper sliders_col">
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <div className="slide" key={index}>
                  <div className="text_col">
                    <h2 className='w-62.5'>{slide.title}</h2>
                    <p><strong>{slide.step}</strong>{slide.description}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardLIfecycle;
