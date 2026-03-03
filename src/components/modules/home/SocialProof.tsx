const logos = ["FOX", "USA TODAY", "Benzinga", "MarketWatch"];

const SocialProof = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-widest mb-8">
          As featured on
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-xl md:text-2xl font-bold text-muted-foreground/50 tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
