import './Featured.css';

function FeaturedSection() {
  return (
    <section className="featured-section">
      <div className="featured-section-top-border">
        <div className="featured-section-title">As featured on</div>
      </div>
      <div className="featured-section-container">
        <div className="featured-section-container-item">
          <img 
            src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/main-featured/featured-fox.svg" 
            alt="Fox" 
          />
        </div>
        <div className="featured-section-container-item">
          <img 
            src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/main-featured/featured-usa-today.svg" 
            alt="USA Today" 
          />
        </div>
        <div className="featured-section-container-item">
          <img 
            src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/main-featured/featured-benzinga.svg" 
            alt="Benzinga" 
          />
        </div>
        <div className="featured-section-container-item">
          <img 
            src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/main-featured/featured-market-watch.svg" 
            alt="MarketWatch" 
          />
        </div>
      </div>
      <div className="featured-section-bottom-border"></div>
    </section>
  );
}

export default FeaturedSection;
