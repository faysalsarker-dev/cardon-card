import { Link } from "react-router";
import Logo from "./Logo";

const services = [{name:"How it works",link:'/'}, {name:"Best sellers",link:'/best-sellers'},{ name:"Design Your Own",link:'/design-your-own'}];
const about = [ {name:"FAQ",link:'/faq'}];
const contact = [{"name":"Support",link:'/support'}, {"name":"Partnerships",link:'/partnerships'}, {"name":"Press",link:'/press'}];




const Footer = () => {
  return (
    <footer className="pt-16 pb-8 text-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo/>
            <p className="text-sm text-muted-foreground leading-relaxed mt-5">
            Custom metal credit & debit cards
            </p>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Our Services</h4>
            <ul className="space-y-5">
              {services.map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className=" text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
        <div>
            <h4 className="text-xl font-bold uppercase tracking-widest mb-4">About Us</h4>
            <ul className="space-y-5">
              {about.map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className=" text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-5">
              {contact.map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
        
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Carbon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
