import OrnateBorder from "@/components/modules/home/order/OrnateBorder";
import ChipSVG from "@/components/modules/home/order/ChipSVG";
import ElegantBorder from "@/components/modules/home/order/ElegantBorder";
import type { CardState, ColorKey, DragPos, Side } from "@/pages/order/OrderPage";
import { useCallback, useRef } from "react";
import { GripHorizontal } from "lucide-react";
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

const CARD_BASE: Record<ColorKey, string> = {
  black:       "#0c0c0c",
  gold:        "#7a4e00",
  silver:      "#5a5a5a",
  rose:        "#6b2030",
  split:       "#111",
  holographic: "#111",
};




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





export default function CardFace({
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
