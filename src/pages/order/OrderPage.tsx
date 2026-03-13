import { useState, useRef, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, GripHorizontal } from "lucide-react";
import circuitImg from '../../assets/images/circuit.png';

// ─── Types ────────────────────────────────────────────────────────────────────

type Side = "front" | "back";
type ColorKey = "black" | "gold" | "silver" | "rose" | "split" | "holographic";
type BorderKey = "none" | "elegant" | "ornate";

interface DragPos { x: number; y: number }

interface CardState {
  holderName: string;
  cardNumberSide: Side;
  cardNameSide: Side;
  nameFrontPos: DragPos;
  nameBackPos: DragPos;
  comment: string;
  color: ColorKey;
  border: BorderKey;
  customTexts: { id: string; text: string; fontSize: number; pos: DragPos }[];
  logo: string | null;
  logoPos: DragPos;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS: { key: ColorKey; label: string; price: number; swatch: string }[] = [
  { key: "black",       label: "Black",       price: 0,  swatch: "radial-gradient(circle at 35% 35%, #666, #111)" },
  { key: "gold",        label: "Gold",        price: 15, swatch: "radial-gradient(circle at 35% 35%, #ffe97d, #b8860b)" },
  { key: "silver",      label: "Silver",      price: 15, swatch: "radial-gradient(circle at 35% 35%, #f0f0f0, #888)" },
  { key: "rose",        label: "Rose Gold",   price: 15, swatch: "radial-gradient(circle at 35% 35%, #ffd6dc, #b56576)" },
  { key: "split",       label: "Split",       price: 15, swatch: "linear-gradient(135deg, #ffe97d 50%, #111 50%)" },
  { key: "holographic", label: "Holographic", price: 15, swatch: "linear-gradient(135deg, #f0f, #0ff, #0f0, #ff0, #f0f)" },
];

// ── Card background: base color + radial bloom (lighter center-right, dark edges) ──
const CARD_BASE: Record<ColorKey, string> = {
  black:       "#0c0c0c",
  gold:        "#7a4e00",
  silver:      "#5a5a5a",
  rose:        "#6b2030",
  split:       "#111",
  holographic: "#111",
};

// The bloom is a multi-stop radial that sits on top of the base
// mimicking the photography-style lighting in the reference image
const CARD_BLOOM: Record<ColorKey, string> = {
  black: `
    radial-gradient(ellipse 80% 60% at 68% 38%, rgba(100,100,100,0.70) 0%, rgba(55,55,55,0.35) 30%, rgba(10,10,10,0.0) 65%),
    radial-gradient(ellipse 100% 100% at 50% 50%, #1e1e1e 0%, #0d0d0d 55%, #050505 100%)
  `,
  gold: `
    radial-gradient(ellipse 80% 60% at 68% 38%, rgba(255,240,130,0.75) 0%, rgba(210,160,30,0.4) 35%, rgba(100,60,0,0.0) 65%),
    radial-gradient(ellipse 100% 100% at 50% 50%, #c8880a 0%, #7a4e00 55%, #3a2200 100%)
  `,
  silver: `
    radial-gradient(ellipse 80% 60% at 68% 38%, rgba(255,255,255,0.75) 0%, rgba(190,190,190,0.4) 35%, rgba(80,80,80,0.0) 65%),
    radial-gradient(ellipse 100% 100% at 50% 50%, #d0d0d0 0%, #909090 55%, #555 100%)
  `,
  rose: `
    radial-gradient(ellipse 80% 60% at 68% 38%, rgba(255,200,210,0.70) 0%, rgba(200,120,140,0.4) 35%, rgba(80,20,40,0.0) 65%),
    radial-gradient(ellipse 100% 100% at 50% 50%, #c06070 0%, #8a3040 55%, #4a1020 100%)
  `,
  split: `linear-gradient(135deg, #ffe97d 50%, #111 50%)`,
  holographic: `linear-gradient(135deg, #f0f 0%, #0ff 25%, #0f0 50%, #ff0 75%, #f0f 100%)`,
};

const TEXT_COLOR: Record<ColorKey, string> = {
  black:       "#b8b8b8",
  gold:        "#2a1500",
  silver:      "#222",
  rose:        "#fff",
  split:       "#fff",
  holographic: "#111",
};

const BASE_PRICE = 125;
const COLOR_EXTRA: Record<ColorKey, number> = {
  black: 0, gold: 15, silver: 15, rose: 15, split: 15, holographic: 15,
};

// ─── Drag Hook ────────────────────────────────────────────────────────────────

function useDrag(
  containerRef: React.RefObject<HTMLDivElement>,
  pos: DragPos,
  onUpdate: (pos: DragPos) => void,
  padRight = 120,
  padBottom = 30
) {
  const dragging = useRef(false);
  const offset = useRef<DragPos>({ x: 0, y: 0 });

  return useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragging.current = true;
      offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      const onMove = (ev: MouseEvent) => {
        if (!dragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        onUpdate({
          x: Math.min(Math.max(ev.clientX - offset.current.x, 6), rect.width - padRight),
          y: Math.min(Math.max(ev.clientY - offset.current.y, 6), rect.height - padBottom),
        });
      };
      const onUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pos, onUpdate, containerRef, padRight, padBottom]
  );
}

// ─── Draggable Wrapper ────────────────────────────────────────────────────────

function Draggable({
  pos, containerRef, onUpdate, padRight = 120, padBottom = 30, children,
}: {
  pos: DragPos;
  containerRef: React.RefObject<HTMLDivElement>;
  onUpdate: (p: DragPos) => void;
  padRight?: number;
  padBottom?: number;
  children: React.ReactNode;
}) {
  const onMouseDown = useDrag(containerRef, pos, onUpdate, padRight, padBottom);
  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute flex items-center gap-1 group"
      style={{ left: pos.x, top: pos.y, cursor: "grab", userSelect: "none" }}
    >
      <GripHorizontal
        size={9}
        className="opacity-0 group-hover:opacity-50 transition-opacity shrink-0 text-white"
      />
      {children}
    </div>
  );
}

// ─── Borders ──────────────────────────────────────────────────────────────────

function ElegantBorder() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none p-3"
      viewBox="0 0 860 540" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="840" height="520" rx="12" ry="12"
        fill="none" stroke="rgba(210,210,210,0.85)" strokeWidth="5" />
      <rect x="22" y="22" width="816" height="496" rx="8" ry="8"
        fill="none" stroke="rgba(180,180,180,0.45)" strokeWidth="2" />
      <path d="M10 90 L10 10 L90 10" fill="none" stroke="rgba(235,235,235,0.95)" strokeWidth="8" strokeLinecap="square" />
      <path d="M770 10 L850 10 L850 90" fill="none" stroke="rgba(235,235,235,0.95)" strokeWidth="8" strokeLinecap="square" />
      <path d="M10 450 L10 530 L90 530" fill="none" stroke="rgba(235,235,235,0.95)" strokeWidth="8" strokeLinecap="square" />
      <path d="M770 530 L850 530 L850 450" fill="none" stroke="rgba(235,235,235,0.95)" strokeWidth="8" strokeLinecap="square" />
      <circle cx="22" cy="22" r="4" fill="rgba(220,220,220,0.8)" />
      <circle cx="838" cy="22" r="4" fill="rgba(220,220,220,0.8)" />
      <circle cx="22" cy="518" r="4" fill="rgba(220,220,220,0.8)" />
      <circle cx="838" cy="518" r="4" fill="rgba(220,220,220,0.8)" />
    </svg>
  );
}

function OrnateBorder() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none p-3"
      viewBox="0 0 860 540" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="fH" x="0" y="0" width="28" height="22" patternUnits="userSpaceOnUse">
          <ellipse cx="14" cy="11" rx="11" ry="7" fill="none" stroke="rgba(205,205,205,0.85)" strokeWidth="1.6" />
          <ellipse cx="14" cy="11" rx="6" ry="3.5" fill="rgba(190,190,190,0.3)" stroke="rgba(215,215,215,0.6)" strokeWidth="1" />
          <circle cx="14" cy="11" r="1.5" fill="rgba(225,225,225,0.85)" />
        </pattern>
        <pattern id="fV" x="0" y="0" width="22" height="28" patternUnits="userSpaceOnUse">
          <ellipse cx="11" cy="14" rx="7" ry="11" fill="none" stroke="rgba(205,205,205,0.85)" strokeWidth="1.6" />
          <ellipse cx="11" cy="14" rx="3.5" ry="6" fill="rgba(190,190,190,0.3)" stroke="rgba(215,215,215,0.6)" strokeWidth="1" />
          <circle cx="11" cy="14" r="1.5" fill="rgba(225,225,225,0.85)" />
        </pattern>
      </defs>
      <rect x="6"   y="6"   width="848" height="24" fill="url(#fH)" />
      <rect x="6"   y="510" width="848" height="24" fill="url(#fH)" />
      <rect x="6"   y="6"   width="24"  height="528" fill="url(#fV)" />
      <rect x="830" y="6"   width="24"  height="528" fill="url(#fV)" />
      <rect x="6" y="6" width="848" height="528" rx="10" ry="10"
        fill="none" stroke="rgba(205,205,205,0.65)" strokeWidth="3" />
      <rect x="30" y="30" width="800" height="480" rx="6" ry="6"
        fill="none" stroke="rgba(180,180,180,0.35)" strokeWidth="1.5" />
      {([[28,28],[832,28],[28,512],[832,512]] as [number,number][]).map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="18" fill="none" stroke="rgba(215,215,215,0.8)" strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="10" fill="rgba(190,190,190,0.28)" stroke="rgba(205,205,205,0.65)" strokeWidth="1.8" />
          <circle cx={cx} cy={cy} r="4"  fill="rgba(225,225,225,0.9)" />
          <line x1={cx-22} y1={cy} x2={cx-12} y2={cy} stroke="rgba(205,205,205,0.75)" strokeWidth="2" />
          <line x1={cx+12} y1={cy} x2={cx+22} y2={cy} stroke="rgba(205,205,205,0.75)" strokeWidth="2" />
          <line x1={cx} y1={cy-22} x2={cx} y2={cy-12} stroke="rgba(205,205,205,0.75)" strokeWidth="2" />
          <line x1={cx} y1={cy+12} x2={cx} y2={cy+22} stroke="rgba(205,205,205,0.75)" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

// ─── Photo-realistic Chip ─────────────────────────────────────────────────────
// Built entirely with SVG gradients to replicate the exact look in the reference.

function ChipSVG() {
  return (
    <div>
        <img src={circuitImg} alt="" />
    </div>
  );
}

// ─── Card Face ────────────────────────────────────────────────────────────────

function CardFace({
  state,
  side,
  onChange,
}: {
  state: CardState;
  side: Side;
  onChange?: (p: Partial<CardState>) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFront = side === "front";
  const canDrag  = !!onChange; // both sides draggable when onChange provided
  const showNumber = state.cardNumberSide === side;
  const showName   = state.cardNameSide   === side;
  const tc = TEXT_COLOR[state.color];
  const namePos = isFront ? state.nameFrontPos : state.nameBackPos;

  const setNamePos = onChange
    ? (pos: DragPos) =>
        onChange(isFront ? { nameFrontPos: pos } : { nameBackPos: pos })
    : undefined;

  return (
    <div
      ref={cardRef}
      className="relative w-full select-none overflow-hidden"
      style={{
        aspectRatio: "1.586",
        background: CARD_BLOOM[state.color],
        backgroundColor: CARD_BASE[state.color],
        borderRadius: "20px",
        boxShadow: "0 32px 90px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.55)",
      }}
    >
      {/* ── Noise texture for the metallic brushed look ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
        mixBlendMode: "overlay",
        opacity: 0.6,
      }} />

      {/* ── Decorative frame (front only) ── */}
      {isFront && state.border === "elegant" && <ElegantBorder />}
      {isFront && state.border === "ornate"  && <OrnateBorder />}

      {/* ── Chip (front only) ── */}
      {isFront && (
        <div className="absolute top-25 left-15" style={{width: "12%", aspectRatio: "56/44" }}>
          <ChipSVG />
        </div>
      )}

      {/* ── Magnetic stripe (back only) ── */}
      {!isFront && (
        <div className="absolute" style={{
          top: "14%", left: 0, right: 0, height: "21%",
          background: "linear-gradient(180deg,#060606 0%,#1a1a1a 40%,#1a1a1a 60%,#060606 100%)",
        }} />
      )}

      {/* ── Card number ── */}
      {showNumber && (
        <div
          className="absolute text-2xl font-extrabold"
          style={{
            left: isFront ? "25%" : "6%",
            top: "45%",
            fontFamily: "'Courier New', 'OCR A Extended', monospace",
            color: tc,
            opacity: 0.78,
            fontWeight: 400,
          }}
        >
          0000 0000 0000 0000
        </div>
      )}

      {/* ── Expiry (front only, when number is front) ── */}
      {isFront && showNumber && (
   <div
  className="absolute flex items-end gap-2"
  style={{ left: "30%", top: "60%", color: tc, opacity: 0.7 }}
>
  {/* VALID THRU */}
  <div className="flex flex-col text-[8px] leading-[10px] tracking-wide">
    <span>VALID</span>
    <span>THRU</span>
  </div>

  {/* Date */}
  <div className="text-[22px] leading-none font-light tracking-wider">
    55/55
  </div>
</div>
      )}

      {/* ── Cardholder name (draggable on both sides) ── */}
      {showName && canDrag && setNamePos ? (
        <Draggable
          pos={namePos}
          containerRef={cardRef}
          onUpdate={setNamePos}
          padRight={180}
          padBottom={30}
        >
          <span style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontSize: "clamp(10px, 2vw, 16px)",
            letterSpacing: "0.08em",
            color: tc,
            opacity: 0.82,
            whiteSpace: "nowrap",
            fontStyle: "italic",
            textTransform: "capitalize",
          }}>
            {state.holderName || "(Name Here)"}
          </span>
        </Draggable>
      ) : showName ? (
        <div
          className="absolute"
          style={{
            left: namePos.x,
            top: namePos.y,
            fontFamily: "'Times New Roman', Georgia, serif",
            fontSize: "clamp(10px, 2vw, 16px)",
            letterSpacing: "0.08em",
            color: tc,
            opacity: 0.82,
            whiteSpace: "nowrap",
            fontStyle: "italic",
            textTransform: "capitalize",
          }}
        >
          {state.holderName || "(Name Here)"}
        </div>
      ) : null}

      {/* ── Logo (draggable, front only) ── */}
      {state.logo && isFront && canDrag && (
        <Draggable
          pos={state.logoPos}
          containerRef={cardRef}
          onUpdate={(pos) => onChange!({ logoPos: pos })}
          padRight={80}
          padBottom={36}
        >
          <img src={state.logo} alt="Logo" style={{
            width: "clamp(36px, 7vw, 60px)",
            height: "clamp(18px, 3.5vw, 30px)",
            objectFit: "contain",
            opacity: 0.92,
          }} />
        </Draggable>
      )}
      {state.logo && isFront && !canDrag && (
        <div className="absolute" style={{ left: state.logoPos.x, top: state.logoPos.y }}>
          <img src={state.logo} alt="Logo" style={{
            width: "clamp(36px, 7vw, 60px)",
            height: "clamp(18px, 3.5vw, 30px)",
            objectFit: "contain", opacity: 0.92,
          }} />
        </div>
      )}

      {/* ── Custom texts (draggable, front only) ── */}
      {state.customTexts.map((t) =>
        isFront && canDrag ? (
          <Draggable
            key={t.id}
            pos={t.pos}
            containerRef={cardRef}
            onUpdate={(pos) =>
              onChange!({
                customTexts: state.customTexts.map((ct) =>
                  ct.id === t.id ? { ...ct, pos } : ct
                ),
              })
            }
            padRight={130}
            padBottom={22}
          >
            <span style={{
              fontFamily: "'Times New Roman', Georgia, serif",
              fontSize: t.fontSize,
              color: tc,
              opacity: 0.82,
              whiteSpace: "nowrap",
            }}>
              {t.text || "(Enter Text)"}
            </span>
          </Draggable>
        ) : isFront ? (
          <div key={t.id} className="absolute" style={{
            left: t.pos.x, top: t.pos.y,
            fontFamily: "'Times New Roman', Georgia, serif",
            fontSize: t.fontSize, color: tc, opacity: 0.8, whiteSpace: "nowrap",
          }}>
            {t.text || "(Enter Text)"}
          </div>
        ) : null
      )}

      {/* ── Side watermark ── */}
      <div className="absolute" style={{
        bottom: 7, right: 12,
        fontFamily: "sans-serif",
        fontSize: "clamp(5px, 0.75vw, 7px)",
        color: tc, opacity: 0.18,
        letterSpacing: "0.22em", textTransform: "uppercase",
      }}>
        {side}
      </div>
    </div>
  );
}

// ─── Tab 1 ────────────────────────────────────────────────────────────────────

function TabEditInfo({ state, onChange }: {
  state: CardState; onChange: (p: Partial<CardState>) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
          Card Holder Name ({state.holderName.length}/26)
        </Label>
        <Input maxLength={26} placeholder="(Name Here)" value={state.holderName}
          onChange={(e) => onChange({ holderName: e.target.value })}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-zinc-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
            Card Number On
          </Label>
          <Select value={state.cardNumberSide}
            onValueChange={(v) => onChange({ cardNumberSide: v as Side })}>
            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectItem value="front">Front</SelectItem>
              <SelectItem value="back">Back</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
            Card Name On
          </Label>
          <Select value={state.cardNameSide}
            onValueChange={(v) => onChange({ cardNameSide: v as Side })}>
            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectItem value="front">Front</SelectItem>
              <SelectItem value="back">Back</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 flex items-start gap-2">
        <GripHorizontal size={13} className="mt-0.5 shrink-0 text-zinc-400" />
        <p className="text-xs text-zinc-400">
          Hover any element on the card preview and drag it to reposition. The name is draggable on both <span className="text-white font-semibold">front</span> and <span className="text-white font-semibold">back</span>.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">Comment</Label>
        <Textarea placeholder="Add a comment..." value={state.comment}
          onChange={(e) => onChange({ comment: e.target.value })}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 resize-none h-20" />
      </div>
    </div>
  );
}

// ─── Tab 2 ────────────────────────────────────────────────────────────────────

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

function TabChooseMetal({ state, onChange }: {
  state: CardState; onChange: (p: Partial<CardState>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-3 block">Color</Label>
        <div className="grid grid-cols-3 gap-3">
          {COLORS.map((c) => (
            <button key={c.key} onClick={() => onChange({ color: c.key })}
              className={`flex flex-col items-center gap-2 p-2.5 rounded-xl border transition-all ${
                state.color === c.key
                  ? "border-white bg-zinc-800"
                  : "border-zinc-700 hover:border-zinc-500 bg-zinc-900"
              }`}>
              <div className="w-10 h-10 rounded-full" style={{
                background: c.swatch,
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.3)",
              }} />
              <span className="text-xs text-zinc-300 font-medium">{c.label}</span>
              <span className="text-xs text-zinc-500">+${c.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-3 block">Card Frame</Label>
        <div className="grid grid-cols-3 gap-3">
          {BORDER_OPTIONS.map((b) => (
            <button key={b.key} onClick={() => onChange({ border: b.key })}
              className={`flex flex-col items-center gap-2.5 p-3 rounded-xl border transition-all ${
                state.border === b.key
                  ? "border-white bg-zinc-800"
                  : "border-zinc-700 hover:border-zinc-500 bg-zinc-900"
              }`}>
              {b.preview}
              <span className="text-xs text-zinc-300 font-medium">{b.label}</span>
              <span className="text-xs text-zinc-500">+$0</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3 ────────────────────────────────────────────────────────────────────

function TabLogoText({ state, onChange }: {
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
            <button onClick={() => removeText(t.id)} className="text-zinc-500 hover:text-red-400 transition-colors">
              <Trash2 size={15} />
            </button>
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
                <input type="number" min={8} max={32} value={t.fontSize}
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

      <Button variant="outline" onClick={addText}
        className="w-full border-dashed border-zinc-600 text-zinc-400 hover:text-white hover:border-zinc-400 bg-transparent">
        <Plus size={14} className="mr-2" /> Add Custom Text
      </Button>

      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center text-zinc-400">
              <Plus size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Add Custom Logo</p>
              <p className="text-xs text-zinc-500">Drag on front to reposition</p>
            </div>
          </div>
          {state.logo && (
            <button onClick={() => onChange({ logo: null })} className="text-zinc-500 hover:text-red-400 transition-colors">
              <Trash2 size={15} />
            </button>
          )}
        </div>
        {state.logo && (
          <img src={state.logo} alt="Logo preview"
            className="w-full h-20 object-contain rounded-lg border border-zinc-700" />
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
        <Button onClick={() => fileRef.current?.click()}
          className="w-full bg-zinc-700 hover:bg-zinc-600 text-white border-0">
          {state.logo ? "Replace Logo" : "Add Logo"}
        </Button>
      </div>
    </div>
  );
}

// ─── Price Summary ────────────────────────────────────────────────────────────

function PriceSummary({ state }: { state: CardState }) {
  const colorExtra = COLOR_EXTRA[state.color];
  const total = BASE_PRICE + colorExtra;
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 space-y-2">
      {colorExtra > 0 && (
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Color Upgrade</span><span>+${colorExtra} USD</span>
        </div>
      )}
      <div className="flex justify-between text-sm text-zinc-400">
        <span>Card</span><span>${BASE_PRICE} USD</span>
      </div>
      <div className="border-t border-zinc-700 pt-2 flex justify-between font-bold text-white">
        <span>Total (USD)</span><span>${total} USD</span>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function OrderPage() {
  const [state, setState] = useState<CardState>({
    holderName: "",
    cardNumberSide: "front",
    cardNameSide: "front",
    nameFrontPos: { x: 22, y: 155 },
    nameBackPos:  { x: 22, y: 155 },
    logoPos:      { x: 260, y: 14 },
    comment: "",
    color: "black",
    border: "elegant",
    customTexts: [],
    logo: null,
  });

  const onChange = (patch: Partial<CardState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  return (
    <div className="min-h-screen bg-zinc-950 text-white"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
        <span className="text-2xl font-black tracking-tight text-white">Carbon</span>
        <div className="flex items-center gap-3">
          <span className="border border-zinc-700 rounded-full px-3 py-1 text-xs text-zinc-400 bg-zinc-900">
            🇺🇸 USD
          </span>
          <button className="flex flex-col gap-1.5 p-1">
            <div className="w-5 h-0.5 bg-zinc-400 rounded" />
            <div className="w-5 h-0.5 bg-zinc-400 rounded" />
            <div className="w-5 h-0.5 bg-zinc-400 rounded" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Left — Both cards */}
        <div className="space-y-7">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500">Front</p>
              <span className="text-xs text-zinc-600">— hover elements to drag</span>
            </div>
            <CardFace state={state} side="front" onChange={onChange} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500">Back</p>
              {state.cardNameSide === "back" && (
                <span className="text-xs text-zinc-600">— drag name to reposition</span>
              )}
            </div>
            <CardFace state={state} side="back" onChange={onChange} />
          </div>
        </div>

        {/* Right — Controls */}
        <div className="space-y-5 lg:sticky lg:top-8">
          <Tabs defaultValue="info">
            <TabsList className="w-full bg-zinc-900 border border-zinc-700 p-1 rounded-xl grid grid-cols-3">
              <TabsTrigger value="info"
                className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 transition-all">
                Edit Card Info
              </TabsTrigger>
              <TabsTrigger value="metal"
                className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 transition-all">
                Choose Metal
              </TabsTrigger>
              <TabsTrigger value="logo"
                className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 transition-all">
                Add Logo / Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info"  className="mt-5"><TabEditInfo    state={state} onChange={onChange} /></TabsContent>
            <TabsContent value="metal" className="mt-5"><TabChooseMetal state={state} onChange={onChange} /></TabsContent>
            <TabsContent value="logo"  className="mt-5"><TabLogoText    state={state} onChange={onChange} /></TabsContent>
          </Tabs>

          <PriceSummary state={state} />

          <button className="w-full py-4 bg-white text-black text-base font-bold rounded-xl tracking-wide hover:bg-zinc-100 transition-colors">
            Create Order →
          </button>
        </div>
      </div>
    </div>
  );
}