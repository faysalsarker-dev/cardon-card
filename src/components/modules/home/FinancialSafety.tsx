interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: './sefty/icon_world.svg',
    title: 'Shipping',
    description: 'We only use secure and tracked shipping in discreet unbranded packaging.'
  },
  {
    icon: './sefty/icon_lamp.svg',
    title: 'Process',
    description: 'Our equipment is highly secure and does not store any personal or sensitive card information.'
  },
  {
    icon: './sefty/icon_protect.svg',
    title: 'Card Data',
    description: 'All payments are processed via our PCI compliant payment merchant.'
  }
];

const FinancialSafety = () => {
  return (
    <section className="pt-16 lg:pt-20 pb-12 lg:pb-20 w-full bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-4">Financial Safety</h2>
          <p className="text-xl lg:text-lg text-white/70 mb-14">Your financial safety is our priority.</p>
        </div>
        
        <div className="mt-28 lg:mt-16 w-full flex flex-wrap justify-center gap-10 lg:gap-8 md:p-0 p-3">
          {features.map((feature, index) => (
            <div 
              className="w-full max-w-99.75 flex flex-col items-start justify-start border border-[#222] rounded-[10px] relative min-h-53" 
              key={index}
            >
              <div className="md:h-20 h-12 absolute right-6 md:-top-10 -top-5">
                <img src={feature.icon} alt={feature.title} className="h-full w-auto" />
              </div>
              <div className="pt-8 pr-7 pb-5 pl-8">
                <h3 className="text-[32px] leading-10 text-white font-semibold">{feature.title}</h3>
                <p className="text-xl leading-8 text-white/50 mt-4">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialSafety;
