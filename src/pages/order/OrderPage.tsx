// import { useState, useRef } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/components/ui/select";
// import { Trash2, Plus, GripHorizontal } from "lucide-react";
// import CardFace from "@/components/modules/home/order/CardFace";
// import { TabChooseMetal, TabEditInfo, TabLogoText } from "@/components/modules/home/order/TabsContent";


// export type Side = "front" | "back";
// export type ColorKey = "black" | "gold" | "silver" | "rose" | "split" | "holographic";
// export type BorderKey = "none" | "elegant" | "ornate";

// export interface DragPos { x: number; y: number }

// export interface CardState {
//   holderName: string;
//   cardNumberSide: Side;
//   cardNameSide: Side;
//   nameFrontPos: DragPos;
//   nameBackPos: DragPos;
//   comment: string;
//   color: ColorKey;
//   border: BorderKey;
//   customTexts: { id: string; text: string; fontSize: number; pos: DragPos }[];
//   logo: string | null;
//   logoPos: DragPos;
// }






// const BASE_PRICE = 125;
// const COLOR_EXTRA: Record<ColorKey, number> = {
//   black: 0, gold: 15, silver: 15, rose: 15, split: 15, holographic: 15,
// };






// // ─── Tab 1 ────────────────────────────────────────────────────────────────────



// // ─── Tab 2 ────────────────────────────────────────────────────────────────────



// // ─── Price Summary ────────────────────────────────────────────────────────────

// function PriceSummary({ state }: { state: CardState }) {
//   const colorExtra = COLOR_EXTRA[state.color];
//   const total = BASE_PRICE + colorExtra;
//   return (
//     <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 space-y-2">
//       {colorExtra > 0 && (
//         <div className="flex justify-between text-sm text-zinc-400">
//           <span>Color Upgrade</span><span>+${colorExtra} USD</span>
//         </div>
//       )}
//       <div className="flex justify-between text-sm text-zinc-400">
//         <span>Card</span><span>${BASE_PRICE} USD</span>
//       </div>
//       <div className="border-t border-zinc-700 pt-2 flex justify-between font-bold text-white">
//         <span>Total (USD)</span><span>${total} USD</span>
//       </div>
//     </div>
//   );
// }

// // ─── Root ─────────────────────────────────────────────────────────────────────

// export default function OrderPage() {
//   const [state, setState] = useState<CardState>({
//     holderName: "",
//     cardNumberSide: "front",
//     cardNameSide: "front",
//     nameFrontPos: { x: 22, y: 155 },
//     nameBackPos:  { x: 22, y: 155 },
//     logoPos:      { x: 260, y: 14 },
//     comment: "",
//     color: "black",
//     border: "elegant",
//     customTexts: [],
//     logo: null,
//   });

//   const onChange = (patch: Partial<CardState>) =>
//     setState((prev) => ({ ...prev, ...patch }));

//   return (
//     <div className="min-h-screen bg-white text-gray-600"
//       style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>

//       {/* Header */}
//       <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
//         <span className="text-2xl font-black tracking-tight text-white">Carbon</span>
//         <div className="flex items-center gap-3">
//           <span className="border border-zinc-700 rounded-full px-3 py-1 text-xs text-zinc-400 bg-zinc-900">
//             🇺🇸 USD
//           </span>
//           <button className="flex flex-col gap-1.5 p-1">
//             <div className="w-5 h-0.5 bg-zinc-400 rounded" />
//             <div className="w-5 h-0.5 bg-zinc-400 rounded" />
//             <div className="w-5 h-0.5 bg-zinc-400 rounded" />
//           </button>
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

//         {/* Left — Both cards */}
//         <div className="space-y-7">
//           <div className="space-y-2">
    
//             <CardFace state={state} side="front" onChange={onChange} />
//           </div>
//           <div className="space-y-2">
           
//             <CardFace state={state} side="back" onChange={onChange} />
//           </div>
//         </div>

//         {/* Right — Controls */}
//         <div className="space-y-5 lg:sticky lg:top-8 border-l-2  border-t-2 ">
//           <Tabs className="" defaultValue="">
            
//             <div className="h-28 bg-white flex justify-center items-center px-4">
// <TabsList className="w-full bg-white-50  border border-zinc-700 p-1 rounded-xl grid grid-cols-3 h-12 ">
//               <TabsTrigger value="info"
//                 className="rounded-lg text-xs font-semibold data-[state=active]:bg-black data-[state=active]:text-black text-zinc-400 transition-all">
//                 Edit Card Info
//               </TabsTrigger>
//               <TabsTrigger value="metal"
//                 className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 transition-all">
//                 Choose Metal
//               </TabsTrigger>
//               <TabsTrigger value="logo"
//                 className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 transition-all">
//                 Add Logo / Text
//               </TabsTrigger>
//             </TabsList>
//             </div>

//             <TabsContent value="info"  className="mt-5"><TabEditInfo    state={state} onChange={onChange} /></TabsContent>
//             <TabsContent value="metal" className="mt-5"><TabChooseMetal state={state} onChange={onChange} /></TabsContent>
//             <TabsContent value="logo"  className="mt-5"><TabLogoText    state={state} onChange={onChange} /></TabsContent>
//           </Tabs>

//           <PriceSummary state={state} />

//           <button className="w-full py-4 bg-white text-black text-base font-bold rounded-xl tracking-wide hover:bg-zinc-100 transition-colors">
//             Create Order →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CardFace from "@/components/modules/home/order/CardFace";
import { Menu } from "lucide-react";
import { TabChooseMetal, TabEditInfo, TabLogoText } from "@/components/modules/home/order/TabsContent";

// Types remain the same as your original code
export type Side = "front" | "back";
export type ColorKey = "black" | "gold" | "silver" | "rose" | "split" | "holographic";
export type BorderKey = "none" | "elegant" | "ornate";
export interface DragPos { x: number; y: number }
export interface CardState {
  holderName: string; cardNumberSide: Side; cardNameSide: Side;
  nameFrontPos: DragPos; nameBackPos: DragPos; comment: string;
  color: ColorKey; border: BorderKey; logo: string | null; logoPos: DragPos;
  customTexts: { id: string; text: string; fontSize: number; pos: DragPos }[];
}

const BASE_PRICE = 125;
const COLORS: { key: ColorKey; label: string; price: number; swatch: string }[] = [
  { key: "gold", label: "Gold", price: 15, swatch: "conic-gradient(from 180deg at 50% 50%, #E7C05F 0deg, #F9F0B2 120deg, #9C7122 240deg, #E7C05F 360deg)" },
  { key: "holographic", label: "Holographic", price: 15, swatch: "linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA, #F472B6)" },
];

// --- Refactored Price Summary (Clean Light Style) ---
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
  const [state, setState] = useState<CardState>({
    holderName: "", cardNumberSide: "front", cardNameSide: "front",
    nameFrontPos: { x: 22, y: 155 }, nameBackPos: { x: 22, y: 155 },
    logoPos: { x: 260, y: 14 }, comment: "", color: "black",
    border: "ornate", customTexts: [], logo: null,
  });

  const onChange = (patch: Partial<CardState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      
      {/* --- Header (Updated to White/Light Style) --- */}
      <header className="border-b border-zinc-100 bg-[#F9F9F9] px-8 py-5 flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tighter text-black">Carbon</span>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border border-zinc-200 rounded-full px-4 py-1.5 bg-white text-sm font-medium shadow-sm">
            <span>🇺🇸</span>
            <span className="text-zinc-700">USD</span>
            <span className="text-[10px] text-zinc-400">▼</span>
          </div>
          <Menu className="w-8 h-8 text-black cursor-pointer" strokeWidth={2.5} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6  grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left - Previews */}
        <div className="space-y-12 mt-5">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <CardFace state={state} side="front" onChange={onChange} />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl opacity-90">
            <CardFace state={state} side="back" onChange={onChange} />
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

      {/* Help Bubble (Bottom Left) */}
      <button className=" flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2.5 rounded-full shadow-lg text-sm font-bold hover:bg-zinc-50">
        <div className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">?</div>
        Help
      </button>
    </div>
  );
}