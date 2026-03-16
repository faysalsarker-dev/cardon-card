import OrnateBorder from "@/components/modules/home/order/OrnateBorder";
import ChipSVG from "@/components/modules/home/order/ChipSVG";
import ElegantBorder from "@/components/modules/home/order/ElegantBorder";
import type { CardState, ColorKey, DragPos, Side } from "@/pages/order/OrderPage";
import { useCallback, useRef } from "react";
import { GripHorizontal } from "lucide-react";

// Dynamically import all images from cardImages folder
const imageModules = import.meta.glob('../../../../assets/cardImages/*.webp', { eager: true });

// Create a mapping of filename to image path
const imageMap: Record<string, string> = {};
Object.entries(imageModules).forEach(([path, module]) => {
  const filename = path.split('/').pop() || '';
  imageMap[filename] = (module as { default: string }).default;
});


const CARD_BLOOM: Record<ColorKey, string> = {
  black: `
    radial-gradient(ellipse 120% 120% at 75% -10%, rgba(255,255,255,0.12) 0%, transparent 45%),
    radial-gradient(ellipse 100% 100% at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)
  `,
  gold: `
    radial-gradient(ellipse 150% 100% at 80% 10%, rgba(255,253,208,0.5) 0%, transparent 50%),
    radial-gradient(ellipse 100% 100% at 0% 100%, rgba(255,255,255,0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, #e7c05f 0%, #9c7122 100%)
  `,
  silver: `
    radial-gradient(ellipse 150% 100% at 80% 10%, rgba(255,255,255,0.6) 0%, transparent 50%),
    radial-gradient(ellipse 100% 100% at 0% 100%, rgba(255,255,255,0.3) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, #dcdcdc 0%, #808080 100%)
  `,
  rose: `
    radial-gradient(ellipse 150% 100% at 80% 10%, rgba(255,220,220,0.4) 0%, transparent 50%),
    radial-gradient(ellipse 100% 100% at 0% 100%, rgba(255,255,255,0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, #e5b2a9 0%, #b57e74 100%)
  `,
  split: `
    linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%),
    linear-gradient(135deg, #e7c05f 50%, #111111 50%)
  `,
  holographic: `
    linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 30%),
    linear-gradient(135deg, #ff00ff 0%, #00ffff 25%, #00ff00 50%, #ffff00 75%, #ff00ff 100%)
  `,
};





const TEXT_COLOR: Record<ColorKey, string> = {
  // A soft silver/white to pop against the dark brushed metal
  black: "#e0e0e0", 
  // Deep bronze/brown to look like it's stamped into the gold
  gold: "#4a3304", 
  // Dark charcoal to contrast against the bright silver sheen
  silver: "#333333", 
  // Soft cream/white for a luxury feel on the rose base
  rose: "#f8f0f0", 
  // Pure white to remain visible on the split design
  split: "#ffffff", 
  // Darkest gray for the rainbow holographic background
  holographic: "#1a1a1a", 
};

const CARD_BASE: Record<ColorKey, string> = {
  // Deepest black to ground the conic reflections
  black: "#050505", 
  // Mid-tone ochre to provide body under the gold sheen
  gold: "#9c7122", 
  // Solid neutral gray for the silver foundation
  silver: "#808080", 
  // Muted burgundy/rose to give depth to the pink highlights
  rose: "#8a4f46", 
  // Dark base for the split/holographic variants
  split: "#0a0a0a", 
  holographic: "#0a0a0a", 
};


function useDrag(
  containerRef: React.RefObject<HTMLDivElement | null>,
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





function Draggable({
  pos, containerRef, onUpdate, padRight = 120, padBottom = 30, children,
}: {
  pos: DragPos;
  containerRef: React.RefObject<HTMLDivElement | null>;
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





export default function CardFace({
  state,
  side,
  onChange,
  template
}: {
  state: CardState;
  side: Side;
  onChange?: (p: Partial<CardState>) => void;
  template?: string | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFront = side === "front";
  const canDrag  = !!onChange; 
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
      }}
    >
      {/* ── Template Background ── */}
      {template && imageMap[template] && (
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src={imageMap[template]} 
            alt="Card Template" 
            className="w-full h-full object-cover"
          />
        </div>
      )}






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
        <div className="absolute md:top-25 md:left-15    top-20 left-10" style={{width: "12%", aspectRatio: "56/44" }}>
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
          className="absolute lg:text-2xl font-extrabold"
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
  <div className="flex flex-col text-[8px] leading-2.5 tracking-wide">
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
            width: `${state.logoSize}px`,
            height: "auto",
            maxHeight: "60px",
            objectFit: "contain",
            opacity: 0.92,
          }} />
        </Draggable>
      )}
      {state.logo && isFront && !canDrag && (
        <div className="absolute" style={{ left: state.logoPos.x, top: state.logoPos.y }}>
          <img src={state.logo} alt="Logo" style={{
            width: `${state.logoSize}px`,
            height: "auto",
            maxHeight: "60px",
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
