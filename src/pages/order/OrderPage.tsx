

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CardFace from "@/components/modules/home/order/CardFace";
import { TabChooseMetal, TabEditInfo, TabLogoText } from "@/components/modules/home/order/TabsContent";
import { Link } from "react-router";

// Types remain the same as your original code
export type Side = "front" | "back";
export type ColorKey = "black" | "gold" | "silver" | "rose" | "split" | "holographic";
export type BorderKey = "none" | "elegant" | "ornate";
export interface DragPos { x: number; y: number }
export interface CardState {
  holderName: string; cardNumberSide: Side; cardNameSide: Side;
  nameFrontPos: DragPos; nameBackPos: DragPos; comment: string;
  color: ColorKey; border: BorderKey; logo: string | null; logoPos: DragPos;
  logoSize: number;
  customTexts: { id: string; text: string; fontSize: number; pos: DragPos }[];
}

const BASE_PRICE = 125;


function PriceSummary({ state }: { state: CardState }) {
  const colorPrice = state.color === "black" ? 0 : 15;
  const total = BASE_PRICE + colorPrice;
  return (
    <div className="py-4 space-y-3 border-t border-zinc-100">
      <div className="flex justify-between items-center text-sm text-zinc-500">
        <span>Card</span>
        <span className="font-medium text-black">${BASE_PRICE} USD</span>
      </div>
      <div className="flex justify-between items-center pt-2">
        <span className="text-sm font-medium text-zinc-500">Total (USD)</span>
        <span className="text-lg font-bold text-black">${total} USD</span>
      </div>
    </div>
  );
}

export default function OrderPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const template = searchParams.get('template');


  const [state, setState] = useState<CardState>({
    holderName: "", cardNumberSide: "front", cardNameSide: "front",
    nameFrontPos: { x: 30, y: 255 }, nameBackPos: { x: 30, y: 255 },
    logoPos: { x: 260, y: 14 }, comment: "", color: "black",
    logoSize: 40,
    border: "ornate", customTexts: [], logo: null,
  });

  const onChange = (patch: Partial<CardState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      
      {/* --- Header (Updated to White/Light Style) --- */}
      <header className="border-b border-zinc-100 bg-[#F4F4F4] px-8 py-5 flex items-center justify-between">
        <Link to="/" className="logo img header_logo_img">
             
              <img 
                className="w-36" 
                src="https://carboncoskins.com/wp-content/themes/catapulta-carbon/images/logo_black.svg" 
                alt="Carbon" 
              />
            </Link>
   <div className={`open_menu   toggle_menu_button ${menuOpen ? 'active' : ''}`} onClick={()=> setMenuOpen(!menuOpen)}>
              <div className="bg-black!"></div>
              <div className="bg-black!"></div>
              <div className="bg-black!"></div>
            </div>
      </header>







<div className={`hidden_menu bg-black! ${menuOpen ? 'active' : ''}`}>
          <div className="-scrollbar menu_scroll">
            <div className="container hidden_menu__container">
              <ul className="menu__list -opacity_hover">
                <li><Link to="/order" onClick={()=> setMenuOpen(false)}>Design My Own</Link></li>
                <li><Link to="/best-sellers" onClick={()=> setMenuOpen(false)}>Pre-made designs</Link></li>
                <li><Link to="/how-it-work" onClick={()=> setMenuOpen(false)}>How it works</Link></li>
                <li><Link to="/support" onClick={()=> setMenuOpen(false)}>Contact</Link></li>
                <li><Link to="/faq" onClick={()=> setMenuOpen(false)}>FAQ</Link></li>
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





      <main className="max-w-7xl mx-auto px-6  grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left - Previews */}
        <div className="space-y-12 mt-5">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <CardFace state={state} side="front" onChange={onChange} template={template} />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl opacity-90">
            <CardFace state={state} side="back" onChange={onChange} template={template} />
          </div>
        </div>

     
        <div className="flex flex-col h-full border-l-2 ">
  <Tabs defaultValue="info" className="w-full ">
<TabsList className="w-full py-6 bg-white border border-zinc-200  h-[72px] rounded-[24px] mb-10 shadow-sm m-4">
  <TabsTrigger 
    value="info" 
    className="flex-1 h-full rounded-[18px] text-[16px] font-bold transition-all tracking-tight
               data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white 
               data-[state=active]:shadow-lg
               data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:text-zinc-800"
  >
    Edit Card Info
  </TabsTrigger>
  
  <TabsTrigger 
    value="metal" 
    className="flex-1 h-full rounded-[18px] text-[16px] font-bold transition-all tracking-tight
               data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white 
               data-[state=active]:shadow-lg
               data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:text-zinc-800"
  >
    Choose Metal
  </TabsTrigger>

  <TabsTrigger 
    value="logo" 
    className="flex-1 h-full rounded-[18px] text-[16px] font-bold transition-all tracking-tight
               data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white 
               data-[state=active]:shadow-lg
               data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:text-zinc-800"
  >
    Add Logo / Text
  </TabsTrigger>
</TabsList>
<div className="border-t-2 p-4">
  <TabsContent value="info" className="mt-0 outline-none ">
      <TabEditInfo state={state} onChange={onChange} />
    </TabsContent>
    <TabsContent value="metal" className="mt-0 outline-none">
      <TabChooseMetal state={state} onChange={onChange} />
    </TabsContent>
    <TabsContent value="logo" className="mt-0 outline-none">
      <TabLogoText state={state} onChange={onChange} />
    </TabsContent>
 

</div>
    {/* Content Area */}
  
  </Tabs>

  {/* Bottom Price Summary and Button */}
  <div className="pt-8 px-4">
    <PriceSummary state={state} />
    <button className="w-full mt-6 py-5 bg-[#111] text-white text-lg font-bold rounded-2xl tracking-tight hover:bg-black transition-all flex items-center justify-center gap-2">
      Create Order <span className="text-xl">→</span>
    </button>
  </div>
</div>
      </main>

    
    </div>
  );
}