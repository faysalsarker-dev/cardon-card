import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BorderKey, CardState, ColorKey, Side } from "@/pages/order/OrderPage";
import {  Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import { CreditCard } from "lucide-react";






const BORDER_OPTIONS: { key: BorderKey; label: string; preview: React.ReactNode }[] = [
  {
    key: "none", label: "None",
    preview: <div className="w-12 h-8 bg-zinc-700 rounded" />,
  },
  {
    key: "elegant", label: "Elegant",
    preview: (
      <div className="w-12 h-8 bg-zinc-800 rounded relative overflow-hidden">
        <svg viewBox="0 0 48 30" className="absolute inset-0 w-full h-full">
          <rect x="2" y="2" width="44" height="26" rx="2" fill="none" stroke="rgba(210,210,210,0.9)" strokeWidth="2" />
          <rect x="5" y="5" width="38" height="20" rx="1" fill="none" stroke="rgba(170,170,170,0.4)" strokeWidth="0.8" />
          <path d="M2 9 L2 2 L9 2"  fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="square" />
          <path d="M39 2 L46 2 L46 9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="square" />
          <path d="M2 21 L2 28 L9 28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="square" />
          <path d="M39 28 L46 28 L46 21" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </div>
    ),
  },
  {
    key: "ornate", label: "Ornate",
    preview: (
      <div className="w-12 h-8 bg-zinc-800 rounded relative overflow-hidden">
        <svg viewBox="0 0 48 30" className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="pH2" x="0" y="0" width="8" height="5" patternUnits="userSpaceOnUse">
              <ellipse cx="4" cy="2.5" rx="3" ry="1.8" fill="none" stroke="rgba(205,205,205,0.88)" strokeWidth="0.8" />
              <circle cx="4" cy="2.5" r="0.8" fill="rgba(225,225,225,0.75)" />
            </pattern>
            <pattern id="pV2" x="0" y="0" width="5" height="8" patternUnits="userSpaceOnUse">
              <ellipse cx="2.5" cy="4" rx="1.8" ry="3" fill="none" stroke="rgba(205,205,205,0.88)" strokeWidth="0.8" />
              <circle cx="2.5" cy="4" r="0.8" fill="rgba(225,225,225,0.75)" />
            </pattern>
          </defs>
          <rect x="1" y="1"  width="46" height="6"  fill="url(#pH2)" />
          <rect x="1" y="23" width="46" height="6"  fill="url(#pH2)" />
          <rect x="1" y="1"  width="6"  height="28" fill="url(#pV2)" />
          <rect x="41" y="1" width="6"  height="28" fill="url(#pV2)" />
          <rect x="1" y="1" width="46" height="28" rx="2" fill="none" stroke="rgba(195,195,195,0.7)" strokeWidth="1.2" />
          <circle cx="4" cy="4"   r="3" fill="none" stroke="rgba(225,225,225,0.85)" strokeWidth="1" />
          <circle cx="44" cy="4"  r="3" fill="none" stroke="rgba(225,225,225,0.85)" strokeWidth="1" />
          <circle cx="4" cy="26"  r="3" fill="none" stroke="rgba(225,225,225,0.85)" strokeWidth="1" />
          <circle cx="44" cy="26" r="3" fill="none" stroke="rgba(225,225,225,0.85)" strokeWidth="1" />
        </svg>
      </div>
    ),
  },
];













export function TabEditInfo({ state, onChange }: {
  state: CardState; onChange: (p: Partial<CardState>) => void;
}) {
  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label className="text-sm font-medium text-zinc-400">
          Card Holder Name ({state.holderName.length}/26)
        </Label>
        <Input 
          maxLength={26} 
          placeholder="(Name Here)" 
          value={state.holderName}
          onChange={(e) => onChange({ holderName: e.target.value })}
          className="h-14 rounded-2xl border-zinc-200 bg-white px-5 text-base font-bold text-black placeholder:text-zinc-300 focus-visible:ring-1 focus-visible:ring-black" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3 w-full ">
          <Label className="text-sm font-medium text-zinc-400">Card Number On:</Label>
          <Select  value={state.cardNumberSide} onValueChange={(v) => onChange({ cardNumberSide: v as Side })}>
            <SelectTrigger className="h-18 w-full rounded-lg p-6 border-zinc-200 bg-white text-sm font-bold text-black focus:ring-0">
              <div className="flex items-center gap-2">
                <CreditCard size={18} strokeWidth={2.5} />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="front">Front</SelectItem>
              <SelectItem value="back">Back</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-zinc-400">Card Name On:</Label>
          <Select value={state.cardNameSide} onValueChange={(v) => onChange({ cardNameSide: v as Side })}>
            <SelectTrigger className="h-18 w-full rounded-lg p-6 border-zinc-200 bg-white px-4 text-sm font-bold text-black focus:ring-0">
              <div className="flex items-center gap-2">
                <CreditCard size={18} strokeWidth={2.5} />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="front">Front</SelectItem>
              <SelectItem value="back">Back</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

const COLORS: { key: ColorKey; label: string; price: number; swatch: string }[] = [
  { key: "black", label: "Black", price: 0, swatch: "conic-gradient(from 180deg at 50% 50%, #111 0deg, #444 120deg, #000 240deg, #111 360deg)" },
  { key: "gold", label: "Gold", price: 15, swatch: "conic-gradient(from 180deg at 50% 50%, #E7C05F 0deg, #F9F0B2 120deg, #9C7122 240deg, #E7C05F 360deg)" },
  { key: "silver", label: "Silver", price: 15, swatch: "conic-gradient(from 180deg at 50% 50%, #C0C0C0 0deg, #FFFFFF 120deg, #808080 240deg, #C0C0C0 360deg)" },
  { key: "rose", label: "Rose", price: 15, swatch: "conic-gradient(from 180deg at 50% 50%, #E5B2A9 0deg, #FFDED8 120deg, #B57E74 240deg, #E5B2A9 360deg)" },
];

export function TabChooseMetal({ state, onChange }: { state: CardState; onChange: (p: Partial<CardState>) => void }) {
  return (
    <div className="grid grid-cols-2 gap-8 pt-4">
      {/* Color Column */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-zinc-400">Color</Label>
        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
          {COLORS.map((c) => (
            <div key={c.key} className="flex flex-col items-center gap-2">
              <button
                onClick={() => onChange({ color: c.key })}
                className={`w-12 h-12 rounded-full p-1 transition-all ${state.color === c.key ? 'ring-2 ring-black ring-offset-2' : 'ring-1 ring-transparent'}`}
                style={{ background: c.swatch }}
              />
              <span className="text-[11px] font-bold text-zinc-400">+${c.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border Column */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-zinc-400">Border</Label>
        <div className="flex gap-4">
          {BORDER_OPTIONS.map((b) => (
            <div key={b.key} className="flex flex-col items-center gap-2">
              <button
                onClick={() => onChange({ border: b.key })}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all ${state.border === b.key ? 'border-black bg-zinc-50' : 'border-zinc-200'}`}
              >
                {/* Simplified SVG icons as seen in your image */}
                {b.key === 'elegant' ? (
                   <div className="w-8 h-5 border border-black rounded-sm relative">
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-black" />
                   </div>
                ) : <div className="w-8 h-5 border border-zinc-300 rounded-sm" />}
              </button>
              <span className="text-[11px] font-bold text-zinc-400">+$0</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export function TabLogoText({ state, onChange }: {
  state: CardState; onChange: (p: Partial<CardState>) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const addText = () =>
    onChange({
      customTexts: [
        ...state.customTexts,
        { id: crypto.randomUUID(), text: "", fontSize: 15, pos: { x: 30, y: 90 } },
      ],
    });

  const updateText = (id: string, patch: Partial<{ text: string; fontSize: number }>) =>
    onChange({ customTexts: state.customTexts.map((t) => t.id === id ? { ...t, ...patch } : t) });

  const removeText = (id: string) =>
    onChange({ customTexts: state.customTexts.filter((t) => t.id !== id) });

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange({ logo: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {state.customTexts.map((t) => (
        <div key={t.id} className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center text-xs font-bold text-zinc-300">TXT</div>
              <div>
                <p className="text-sm font-medium text-white">Custom Text</p>
                <p className="text-xs text-zinc-500">Drag on front to reposition</p>
              </div>
            </div>
            <Button onClick={() => removeText(t.id)} className="text-zinc-500 hover:text-red-400 transition-colors">
              <Trash2 size={15} />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <Label className="text-xs text-zinc-400">Text ({t.text.length}/26)</Label>
              <Input maxLength={26} placeholder="(Enter Text)" value={t.text}
                onChange={(e) => updateText(t.id, { text: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-zinc-400">Size</Label>
              <div className="flex items-center border border-zinc-700 rounded-md overflow-hidden bg-zinc-800">
                <Input type="number" min={8} max={32} value={t.fontSize}
                  onChange={(e) => updateText(t.id, { fontSize: Number(e.target.value) })}
                  className="w-full bg-transparent text-white text-sm px-2 py-2 outline-none" />
                <div className="flex flex-col border-l border-zinc-700">
                  <button onClick={() => updateText(t.id, { fontSize: Math.min(32, t.fontSize + 1) })}
                    className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-zinc-700 text-xs leading-none">▲</button>
                  <button onClick={() => updateText(t.id, { fontSize: Math.max(8, t.fontSize - 1) })}
                    className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-zinc-700 text-xs leading-none border-t border-zinc-700">▼</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

   

  <Button  onClick={addText}  className="w-full group h-28 flex items-center justify-start gap-5 p-6 rounded-3xl border border-zinc-300 bg-white group-hover:border-zinc-500 transition-all text-left ">
        <div className="w-14 h-18 bg-zinc-200 rounded-xl flex items-center justify-center border border-zinc-100 font-bold text-zinc-400 text-sm group-hover:border-zinc-400 transition-all">
           TXT
         </div>
         <div>
           <h4 className="text-base font-bold text-black">Add custom Text</h4>
           <p className="text-sm text-zinc-400">Add / Edit text</p>
         </div>
       </Button>


<div className="space-y-4 pt-4">
  {/* The Main Action Card */}
  <div className="relative group">
    <button
      onClick={() => fileRef.current?.click()}
      className="w-full h-32 flex items-center gap-6 p-6 rounded-[32px] border border-zinc-200 bg-white 
                 hover:border-zinc-400 hover:shadow-md transition-all text-left outline-none"
    >
      {/* Icon Box with Group Hover */}
      <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center border border-zinc-50 
                      group-hover:bg-zinc-200 group-hover:border-zinc-300 transition-all">
        <Plus size={24} className="text-zinc-400 group-hover:text-black transition-colors" />
      </div>

      <div className="flex-1">
        <h4 className="text-[17px] font-bold text-black tracking-tight">Add custom logo</h4>
        <p className="text-sm font-medium text-zinc-400 mt-0.5">Upload image</p>
      </div>
    </button>

    {/* Trash Button - Only shows if logo exists */}
    {state.logo && (
      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          onChange({ logo: null });
        }}
        className="absolute top-4 right-6 p-2 text-zinc-300 hover:text-red-500 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    )}
  </div>

  {/* Logo Preview Section */}
  {state.logo && (
    <div className="mt-4 p-4 rounded-[24px] border border-dashed border-zinc-200 bg-zinc-50/50">
      <img 
        src={state.logo} 
        alt="Logo preview"
        className="w-full h-32 object-contain rounded-xl" 
      />
      <p className="text-center text-[11px] font-bold text-zinc-400 mt-3 uppercase tracking-widest">
        Current Preview
      </p>
    </div>
  )}

  {/* Hidden Input */}
  <input 
    ref={fileRef} 
    type="file" 
    accept="image/*" 
    className="hidden" 
    onChange={handleLogo} 
  />
</div>



    </div>
  );
}