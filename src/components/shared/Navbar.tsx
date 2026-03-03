import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent text-primary">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
       <Logo/>
        <Button variant="ghost" size="icon" className="text-foreground">
          <Menu className="h-6 w-6 text-primary" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
