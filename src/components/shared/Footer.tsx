import { Link } from "react-router";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="mt-34 pt-6  pb-13 bg-background">
      <div className=" max-w-7xl mx-auto px-4">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left pb-25.5 border-b border-border/15 gap-6 lg:gap-8">
          <div className="mb-10 lg:mb-0">
            <Link to="/" className="h-9.25 w-42.5 max-w-[167.3px] block">
              <Logo />
            </Link>
            <p className="text-base text-muted-foreground mt-11.25 lg:mt-5">Custom metal credit & debit cards</p>
          </div>
          
          <div className="flex justify-center lg:justify-start items-start flex-wrap lg:flex-nowrap mb-10 lg:mb-0 gap-8 lg:gap-10">
            <div className="hidden lg:flex justify-start items-start gap-10">
              <div className="flex justify-start items-start flex-col min-w-45">
                <h4 className="font-bold text-2xl leading-8 text-primary">Our services</h4>
                <ul className="mt-10">
                  <li className="mb-6 last:mb-0"><Link to="/how-it-work" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">How it works</Link></li>
                  <li className="mb-6 last:mb-0"><a href="/best-sellers" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">Best sellers</a></li>
                  <li className="mb-6 last:mb-0"><Link to="/order" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">Design Your Own</Link></li>
                </ul>
              </div>
              
              <div className="flex justify-start items-start flex-col min-w-45">
                <h4 className="font-bold text-2xl leading-8 text-primary">About us</h4>
                <ul className="mt-10">
                  <li className="mb-6 last:mb-0"><Link to="/faq" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">FAQ</Link></li>
                  <li className="mb-6 last:mb-0"><a href="/terms-and-conditions#privacy" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">Privacy policy</a></li>
                  <li className="mb-6 last:mb-0"><a href="/terms-and-conditions" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">Terms & conditions</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex lg:hidden justify-start items-start flex-col min-w-45 mb-5">
              <ul className="mt-10">
                <li className="mb-6 last:mb-0"><Link to="/how-it-work" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">How it works</Link></li>
                <li className="mb-6 last:mb-0"><a href="/best-sellers" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">Best sellers</a></li>
                <li className="mb-6 last:mb-0"><Link to="/order" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">Design Your Own</Link></li>
                <li className="mb-6 last:mb-0"><Link to="/faq" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">FAQ</Link></li>
              </ul>
            </div>
            
            <div className="flex justify-start items-start flex-col min-w-45">
              <h4 className="font-bold text-2xl leading-8 text-primary">Contact</h4>
              <ul className="mt-10">
                <li className="mb-6 last:mb-0"><a href="mailto:info@carboncoskins.com" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">info@carboncoskins.com</a></li>
                <li className="mb-6 last:mb-0"><a href="tel:+61450596920" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">+61 450 596 920</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex lg:flex-col gap-2 lg:gap-4">
            <a title="Tiktok" target="_blank" href="https://www.tiktok.com/@carboncoskins" className="opacity-50 transition-opacity duration-400 hover:opacity-100 block lg:mt-0 lg:not-first:mt-12.5" rel="noreferrer">
              <img src="/src/assets/images/social_tiktok.svg" alt="Tiktok" />
            </a>
            <a title="Facebook" target="_blank" href="https://www.facebook.com/carboncoskins" className="opacity-50 transition-opacity duration-400 hover:opacity-100 block lg:mt-0 lg:not-first:mt-12.5" rel="noreferrer">
              <img src="/src/assets/images/social_fb.svg" alt="Facebook" />
            </a>
            <a title="Instagram" target="_blank" href="https://www.instagram.com/carboncoskins/" className="opacity-50 transition-opacity duration-400 hover:opacity-100 block lg:mt-0 lg:not-first:mt-12.5" rel="noreferrer">
              <img src="/src/assets/images/social_insta.svg" alt="Instagram" />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end w-full pt-8 pr-0 lg:pr-7 gap-5 lg:gap-0">
          <div className="text-base leading-4 tracking-[0.01em] capitalize text-muted-foreground/80">
            © 2026 carbonCoskins. All rights reserved.
          </div>
          
          <div className="flex lg:hidden">
            <ul>
              <li className="mb-6 last:mb-0"><a href="/terms-and-conditions" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">Terms & conditions</a></li>
              <li className="mb-6 last:mb-0"><a href="/terms-and-conditions#privacy" className="block text-base leading-6 text-muted-foreground hover:text-primary transition-colors duration-300">Privacy policy</a></li>
            </ul>
          </div>
          
          <a target="_blank" href="https://catapulta.agency/" className="flex justify-start items-end opacity-40 hover:opacity-100" rel="noreferrer">
            <span className="block text-[17px] leading-6.5 text-primary">Made by</span>
            <span className="block w-[79.35px] h-[20.6px] ml-5.5 bg-[url('data:image/svg+xml,%3Csvg%20width=%2780%27%20height=%2721%27%20viewBox=%270%200%2080%2021%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M63.9528%2015.2585V11.6536L47.8351%2011.6536V15.2585H53.1233V20.7138H58.6646V15.2585L63.9528%2015.2585Z%27%20fill=%27white%27/%3E%3Cpath%20d=%27M48.8845%204.19391V0.588989L32.7668%200.588989V4.19391L38.055%204.19391V9.64923L43.5964%209.64923V4.19391L48.8845%204.19391Z%27%20fill=%27white%27/%3E%3Cpath%20d=%27M68.9872%2011.6536L63.381%2020.7138H68.52L68.9503%2019.8866H73.5852L74.0032%2020.7138H79.4987L73.9049%2011.6536H68.9872ZM70.315%2017.2604L71.2862%2015.3696L72.2452%2017.2604H70.315Z%27%20fill=%27white%27/%3E%3Cpath%20d=%27M53.919%200.588989L48.3128%209.64923H53.4518L53.8821%208.82199H58.517L58.935%209.64923H64.4305L58.8366%200.588989L53.919%200.588989ZM55.2467%206.19583L56.218%204.305L57.1769%206.19583L55.2467%206.19583Z%27%20fill=%27white%27/%3E%3Cpath%20d=%27M22.8277%200.588989L17.2216%209.64923H22.3605L22.7908%208.82199H27.4257L27.8437%209.64923H33.3393L27.7454%200.588989L22.8277%200.588989ZM24.1555%206.19583L25.1267%204.305L26.0857%206.19583L24.1555%206.19583Z%27%20fill=%27white%27/%3E%3Cpath%20d=%27M48.407%2020.7138V17.4836H41.3262V11.6536H36.1041V20.7138H48.407Z%27%20fill=%27white%27/%3E%3Cpath%20d=%27M16.458%2015.3433C16.458%2012.6778%2015.0356%2011.6536%2011.6327%2011.6536L0.149536%2011.6536L0.149536%2020.7138H5.3869L5.3869%2019.2694L11.6859%2019.2694C14.9293%2019.2694%2016.458%2018.0614%2016.458%2015.3433ZM5.3869%2014.5161L9.78499%2014.5161C10.8883%2014.5161%2011.2206%2014.6999%2011.2206%2015.4352C11.2206%2016.1574%2010.7819%2016.4069%209.83816%2016.4069L5.3869%2016.4069V14.5161Z%27%20fill=%27white%27/%3E%3Cpath%20d=%27M18.0791%2011.6536V16.6913C18.0791%2019.6477%2020.5483%2020.9999%2026.138%2020.9999C32.2451%2020.9999%2034.1968%2019.6212%2034.1968%2016.6913V11.6536H28.9657V15.8959C28.9657%2017.3409%2028.1823%2017.7121%2026.138%2017.7121C24.5845%2017.7121%2023.3102%2017.3409%2023.3102%2015.8959V11.6536H18.0791Z%27%20fill=%27white%27/%3E%3Cpath%20d=%27M16.4911%205.6018L11.3132%205.6018C11.247%206.68456%2010.4524%206.89583%208.38652%206.89583C6.01607%206.89583%205.36718%206.65815%205.36718%205.16606C5.36718%203.60795%206.01607%203.40988%208.38652%203.40988C10.4524%203.40988%2011.141%203.58154%2011.247%204.40021L16.3984%204.40021C16.0408%201.54807%2014.6901%200.399292%208.38652%200.399292C2.34783%200.399292%200.149536%201.3236%200.149536%205.16606C0.149536%208.85007%202.16243%209.90642%208.38652%209.90642C15.2198%209.90642%2016.1203%208.59919%2016.4911%205.6018Z%27%20fill=%27white%27/%3E%3C/svg%3E')] bg-contain bg-no-repeat"></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
