import foxLogo from "@/assets/images/featured-fox.svg";
import usaTodayLogo from "@/assets/images/featured-usa-today.svg";
import benzingaLogo from "@/assets/images/featured-benzinga.svg";
import marketWatchLogo from "@/assets/images/featured-market-watch.svg";

const Featured = () => {
  return (
    <section className="py-20 md:py-20 md:pb-37.5 bg-black">
      <div className="relative text-center before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:block before:h-px before:bg-white/15">
        <div className="relative inline-block font-bold text-2xl leading-none text-white text-center bg-black px-2.5">
          As featured on
        </div>
      </div>
      
      <div className=" mx-auto">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between w-full max-w-224.5 mx-auto py-6 px-3.75 gap-7.5 md:gap-0">
          <div className="flex-[0_0_45%] md:flex-initial text-center md:text-left">
            <img src={foxLogo} alt="Fox" className="max-w-full h-auto opacity-70 transition-opacity duration-300 hover:opacity-100" />
          </div>
          <div className="flex-[0_0_45%] md:flex-initial text-center md:text-left">
            <img src={usaTodayLogo} alt="USA Today" className="max-w-full h-auto opacity-70 transition-opacity duration-300 hover:opacity-100" />
          </div>
          <div className="flex-[0_0_45%] md:flex-initial text-center md:text-left">
            <img src={benzingaLogo} alt="Benzinga" className="max-w-full h-auto opacity-70 transition-opacity duration-300 hover:opacity-100" />
          </div>
          <div className="flex-[0_0_45%] md:flex-initial text-center md:text-left">
            <img src={marketWatchLogo} alt="MarketWatch" className="max-w-full h-auto opacity-70 transition-opacity duration-300 hover:opacity-100" />
          </div>
        </div>
      </div>
      
      <div className="block w-full h-px bg-white/15"></div>
    </section>
  );
};

export default Featured;
