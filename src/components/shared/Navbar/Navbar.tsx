import { useState } from 'react';
import { Link } from 'react-router';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'active' : ''}`}>
      <div className="header__blured">
        <div className="container px-4">
          <div className="header__visible">
            <Link to="/" className="logo img header_logo_img">
              <img 
                className="header_logo_white" 
                src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/logo_white.svg" 
                alt="Carbon" 
              />
              <img 
                className="header_logo_black" 
                src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/logo_black.svg" 
                alt="Carbon" 
              />
            </Link>
            <div className={`open_menu toggle_menu_button ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={`hidden_menu ${menuOpen ? 'active' : ''}`}>
          <div className="-scrollbar menu_scroll">
            <div className="container hidden_menu__container">
              <ul className="menu__list -opacity_hover">
                <li><Link to="/order" onClick={closeMenu}>Design My Own</Link></li>
                <li><Link to="/best-sellers" onClick={closeMenu}>Pre-made designs</Link></li>
                <li><Link to="/how-it-work" onClick={closeMenu}>How it works</Link></li>
                <li><Link to="/support" onClick={closeMenu}>Contact</Link></li>
                <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
              </ul>
              <div className="hidden_menu__footer">
                <div className="social_icon__list">
                  <a title="Tiktok" target="_blank" href="https://www.tiktok.com/@carboncoskins" className="img social_icon -opacity_hover">
                    <img src="https://carboncoskins.com/wp-content/uploads/2021/06/social_tiktok.svg" alt="Tiktok" />
                  </a>
                  <a title="Facebook" target="_blank" href="https://www.facebook.com/carboncoskins" className="img social_icon -opacity_hover">
                    <img src="https://carboncoskins.com/wp-content/uploads/2021/06/social_fb.svg" alt="Facebook" />
                  </a>
                  <a title="Instagram" target="_blank" href="https://www.instagram.com/carboncoskins/" className="img social_icon -opacity_hover">
                    <img src="https://carboncoskins.com/wp-content/uploads/2021/06/social_insta.svg" alt="Instagram" />
                  </a>
                </div>
                <div className="separator"></div>
                <a href="https://carboncoskins.com/terms-and-conditions/" className="terms_use -opacity_hover">Terms and conditions</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
