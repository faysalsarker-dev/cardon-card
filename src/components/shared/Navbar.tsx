import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { Facebook, Instagram } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-100">
      <div className={cn(
        "w-full h-full pt-18.5 pb-5 transition-all duration-400",
        isScrolled ? "bg-black/90" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end relative z-20">
            <Link to="/" className="max-w-36.5">
              <img className="w-full h-auto" src="/carbon.png" alt="Carbon" />
            </Link>
            
            <button 
              onClick={toggleMenu}
              className={cn(
                "flex flex-col items-end justify-center cursor-pointer transition-transform duration-300 w-11.5 h-11.5",
                isMenuOpen && "rotate-90"
              )}
            >
              <div className={cn(
                "h-1 bg-white transition-all duration-300",
                isMenuOpen ? "w-8 rotate-45 translate-x-0.75 translate-y-3 rounded-full" : "w-11.5"
              )} />
              <div className={cn(
                "h-1 w-8 mt-1.5 bg-white transition-opacity duration-300",
                isMenuOpen && "opacity-0"
              )} />
              <div className={cn(
                "h-1 w-8 mt-1.5 bg-white transition-all duration-300",
                isMenuOpen && "-rotate-45 translate-x-0.5 -translate-y-2.75 rounded-full"
              )} />
            </button>
          </div>
        </div>
        
        <div className={cn(
          "h-screen fixed right-0 top-0 bottom-0 overflow-hidden bg-black/30 backdrop-blur-[90px] z-12 transition-all duration-500",
          "before:content-[''] before:block before:absolute before:right-0 before:top-0 before:left-0 before:h-50 before:z-10",
          "before:bg-linear-to-b before:from-black before:via-black before:to-transparent",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}>
          <div className={cn(
            "transition-transform duration-500 max-h-full h-full w-full pt-45 pl-25 pr-15",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}>
            <div className="flex flex-col items-end min-h-full pt-17 max-w-100 pb-22.25">
              <ul className="flex flex-col items-end">
                {[
                  { to: '/design-your-own', label: 'Design My Own' },
                  { to: '/best-sellers', label: 'Pre-made designs' },
                  { to: '/how-it-work', label: 'How it works' },
                  { to: '/support', label: 'Contact' },
                  { to: '/faq', label: 'FAQ' }
                ].map((item, i) => (
                  <li key={i} className={cn("text-right", i > 0 && "mt-8")}>
                    <Link 
                      to={item.to}
                      onClick={toggleMenu}
                      className="font-bold text-4xl leading-none tracking-tight capitalize text-white transition-opacity duration-300 opacity-50 hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col items-end w-full">
                <div className="flex justify-end items-center mt-28">
                  {[
                    { href: 'https://www.tiktok.com/@carboncoskins', icon: '🎵', alt: 'Tiktok' },
                    { href: 'https://www.facebook.com/carboncoskins', icon: Facebook, alt: 'Facebook' },
                    { href: 'https://www.instagram.com/carboncoskins/', icon: Instagram, alt: 'Instagram' }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      title={social.alt}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={social.href}
                      className={cn("w-9 h-9 transition-opacity duration-300 opacity-50 hover:opacity-100 flex items-center justify-center", i > 0 && "ml-12.5")}
                    >
                      {typeof social.icon === 'string' ? (
                        <span className="text-2xl">{social.icon}</span>
                      ) : (
                        <social.icon className="w-full h-full text-white" />
                      )}
                    </a>
                  ))}
                </div>
                <div className="block w-full min-w-72.5 h-px bg-white/15 mt-12.25" />
                <Link 
                  to="/"
                  onClick={toggleMenu}
                  className="font-normal text-[17px] leading-6.5 text-right text-white opacity-50 hover:opacity-100 mt-8 block"
                >
                  Terms and conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
