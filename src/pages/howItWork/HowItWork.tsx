import React from "react";
import FinancialSafety from "@/components/modules/home/FinancialSafety";

// ─── Marquee Component ─────────────────────────────────────────────────────
function Marquee({
  children,
  direction = "left",
  speed = 28,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}

// ─── Card Variants ─────────────────────────────────────────────────────────
type CardVariant =
  | "gold-spade"
  | "bitcoin-dark"
  | "silver-pattern"
  | "gold-dragon"
  | "gold-stripe";

function CreditCard({ variant }: { variant: CardVariant }) {
  const configs: Record<CardVariant, { bg: string; overlay: React.ReactNode }> = {
    "gold-spade": {
      bg: "linear-gradient(135deg, #d4a017 0%, #f5d060 35%, #b8860b 65%, #e8c040 100%)",
      overlay: (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 32 40" width="30" height="38" className="opacity-30">
            <path
              fill="#000"
              d="M16 1C16 1 1 11 1 21c0 6 5.5 9.5 13 5.5 0 5-2 9-4.5 12h11C18 35.5 16 31.5 16 26.5 23.5 30.5 31 27 31 21 31 11 16 1 16 1z"
            />
          </svg>
        </div>
      ),
    },
    "bitcoin-dark": {
      bg: "linear-gradient(135deg, #1e1e1e 0%, #2e2e2e 50%, #181818 100%)",
      overlay: (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[28px] text-white/13 font-serif">₿</span>
        </div>
      ),
    },
    "silver-pattern": {
      bg: "linear-gradient(135deg, #808080 0%, #c0c0c0 40%, #909090 70%, #b0b0b0 100%)",
      overlay: (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,transparent,transparent 5px,rgba(255,255,255,0.07) 5px,rgba(255,255,255,0.07) 10px)",
          }}
        />
      ),
    },
    "gold-dragon": {
      bg: "linear-gradient(135deg, #7a5c0f 0%, #c9a227 35%, #f0ca50 60%, #9a7020 100%)",
      overlay: (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(30deg,transparent,transparent 4px,rgba(0,0,0,0.1) 4px,rgba(0,0,0,0.1) 8px)",
          }}
        />
      ),
    },
    "gold-stripe": {
      bg: "linear-gradient(135deg, #c9a227 0%, #fad84a 40%, #c08820 70%, #ffd700 100%)",
      overlay: (
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg,transparent 0,transparent 8px,rgba(0,0,0,0.07) 8px,rgba(0,0,0,0.07) 9px)",
          }}
        />
      ),
    },
  };

  const { bg, overlay } = configs[variant];

  return (
    <div
      className="w-27.5 h-17.5 rounded-lg shrink-0 relative overflow-hidden border border-white/10 flex flex-col justify-between p-1.5"
      style={{ background: bg }}
    >
      {overlay}
      {/* Chip */}
      <div className="relative z-10">
        <svg width="28" height="20" viewBox="0 0 36 24" fill="none">
          <rect x="0.5" y="0.5" width="35" height="23" rx="3" fill="#b8a060" stroke="#8a6f30" strokeWidth="1" />
          <rect x="12" y="0.5" width="12" height="23" fill="#c9b070" stroke="#8a6f30" strokeWidth="0.5" />
          <rect x="0.5" y="8" width="35" height="8" fill="#c9b070" stroke="#8a6f30" strokeWidth="0.5" />
          <rect x="12" y="8" width="12" height="8" fill="#d4b87a" stroke="#8a6f30" strokeWidth="0.5" />
        </svg>
      </div>
      {/* Bottom row */}
      <div className="relative z-10 flex justify-between items-end">
        <div className="flex gap-[3px]">
          {[0, 1, 2, 3].map((g) => (
            <div key={g} className="flex gap-[1.5px]">
              {[0, 1, 2, 3].map((d) => (
                <div key={d} className="w-[1.5px] h-[1.5px] rounded-full bg-black/30" />
              ))}
            </div>
          ))}
        </div>
        <span className="text-[8px] text-black/25 tracking-[-2px]"></span>
      </div>
    </div>
  );
}

// ─── Chip Photo Component ──────────────────────────────────────────────────
function ChipPhoto({ size = 64 }: { size?: number }) {
  return (
    <div
      className="rounded-lg border border-[#555] flex items-center justify-center relative overflow-hidden shrink-0"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(145deg, #7a7a7a 0%, #c8c8c8 30%, #a0a0a0 55%, #888 100%)",
      }}
    >
      <svg width={size - 8} height={size - 8} viewBox="0 0 56 56" fill="none">
        <rect x="1" y="1" width="54" height="54" rx="5" stroke="#666" strokeWidth="1.5" fill="none" />
        <rect x="1" y="18" width="54" height="7" fill="rgba(80,60,30,0.25)" />
        <rect x="1" y="31" width="54" height="7" fill="rgba(80,60,30,0.25)" />
        <rect x="18" y="1" width="7" height="54" fill="rgba(80,60,30,0.25)" />
        <rect x="31" y="1" width="7" height="54" fill="rgba(80,60,30,0.25)" />
        <rect x="18" y="18" width="20" height="20" rx="2" fill="rgba(100,75,30,0.4)" stroke="#777" strokeWidth="0.5" />
        <line x1="1" y1="9" x2="55" y2="9" stroke="#777" strokeWidth="0.4" />
        <line x1="1" y1="47" x2="55" y2="47" stroke="#777" strokeWidth="0.4" />
        <line x1="9" y1="1" x2="9" y2="55" stroke="#777" strokeWidth="0.4" />
        <line x1="47" y1="1" x2="47" y2="55" stroke="#777" strokeWidth="0.4" />
        <rect x="1" y="1" width="54" height="18" fill="rgba(255,255,255,0.06)" rx="5" />
      </svg>
    </div>
  );
}

// ─── Card Rows ─────────────────────────────────────────────────────────────
const topRow: CardVariant[] = [
  "gold-spade", "bitcoin-dark", "silver-pattern", "gold-dragon", "gold-stripe", "gold-spade",
];
const bottomRow: CardVariant[] = [
  "gold-dragon", "gold-stripe", "gold-spade", "bitcoin-dark", "silver-pattern", "gold-dragon",
];

// ─── Main Component ────────────────────────────────────────────────────────
export default function HowToWork() {
  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div className="bg-black text-white font-['Inter',sans-serif] min-h-screen py-16">
        {/* ══ HOW TO WORK SECTION ═══════════════════════════════════════════ */}
        <div className="max-w-140 mx-auto px-4">
          <h1 className="text-[38px] font-black text-center mb-9 tracking-tight">
            How To Work
          </h1>

          {/* STEP 1 */}
          <div className="bg-[#1c1c1c] rounded-[10px] p-4 mb-2.5">
            <p className="text-[11px] font-bold text-[#999] uppercase tracking-wider">
              STEP 1: &nbsp;<span className="text-white text-[13px] font-semibold normal-case tracking-normal">Choose your card design</span>
            </p>
            <div className="flex flex-col gap-2.5 my-3.5 overflow-hidden">
              <Marquee direction="left" speed={28}>
                {topRow.map((v, i) => <CreditCard key={i} variant={v} />)}
              </Marquee>
              <Marquee direction="right" speed={28}>
                {bottomRow.map((v, i) => <CreditCard key={i} variant={v} />)}
              </Marquee>
            </div>
            <p className="text-xs text-[#888]">
              <span className="underline text-[#ccc] cursor-pointer">
                Choose your card design
              </span>{" "}
              and upload your logo.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="bg-[#1c1c1c] rounded-[10px] p-4 mb-2.5">
            <p className="text-[11px] font-bold text-[#999] uppercase tracking-wider">
              STEP 2: &nbsp;<span className="text-white text-[13px] font-semibold normal-case tracking-normal">Complete order details</span>
            </p>
          </div>

          {/* STEP 3 */}
          <div className="bg-[#1c1c1c] rounded-[10px] p-4 mb-2.5">
            <p className="text-[11px] font-bold text-[#999] uppercase tracking-wider">
              STEP 3: &nbsp;<span className="text-white text-[13px] font-semibold normal-case tracking-normal">'Freeze' your card</span>
            </p>
            <p className="text-[13px] text-[#888] leading-[1.65] mt-1.5">
              'Freeze' your card for safety measures and Ship it to us.
            </p>
          </div>

          {/* STEP 4 */}
          <div className="bg-[#1c1c1c] rounded-[10px] p-4 mb-2.5">
            <p className="text-[11px] font-bold text-[#999] uppercase tracking-wider">
              STEP 4: &nbsp;<span className="text-white text-[13px] font-semibold normal-case tracking-normal">We start working on your design</span>
            </p>
            <p className="text-[13px] text-[#888] leading-[1.65] mt-1.5">
              We start working on your design straight away so that we can carry out the
              transfer process the day your card arrives.
              <br />
              We laser engrave your design along with your important card details.
            </p>
          </div>

          {/* STEP 5 */}
          <div className="bg-[#1c1c1c] rounded-[10px] p-4">
            <p className="text-[11px] font-bold text-[#999] uppercase tracking-wider">
              STEP 5: &nbsp;<span className="text-white text-[13px] font-semibold normal-case tracking-normal">We send you your new card</span>
            </p>
            <p className="text-[13px] text-[#888] leading-[1.65] mt-1.5">
              We send you your new card along with your old plastic card.
            </p>
          </div>
        </div>

        {/* ══ IMPORTANT INFORMATION ═════════════════════════════════════════ */}
        <div className="max-w-140 mx-auto px-4 py-10 pb-12">
          <p className="text-[13px] font-bold text-white pb-2.5 border-b border-[#2a2a2a] mb-5">
            Important information
          </p>

          {/* Contactless Payments */}
          <div className="flex items-center gap-1 mb-3.5">
            <span className="text-[13px] text-white">Contactless Payments</span>
            <span className="text-base text-[#bbb] tracking-[-3px] ml-0.5"></span>
          </div>

          {/* 4 Compatible Chips */}
          <div className="flex gap-3.5 mb-3.5 flex-wrap">
            {[0, 1, 2, 3].map((i) => <ChipPhoto key={i} size={66} />)}
          </div>

          <p className="text-[13px] text-[#888] leading-[1.65] mb-8">
            We can upgrade cards with these exact chips to a metal contactless payment card.
            Please note: if your exact chip is not on this list, your card will not work for
            contactless payments. However you will still be able to insert, swipe and use
            Apple / Samsung pay.
          </p>

          {/* Divider */}
          <div className="border-t border-[#2a2a2a] mb-4.5" />

          {/* Non-compatible Chips */}
          <div className="flex items-center gap-1.5 mb-3.5">
            <span className="text-[13px] text-white">Non-compatible Chips</span>
            <span className="w-4 h-4 border border-[#888] rounded-full inline-flex items-center justify-center text-[10px] text-[#888] shrink-0">
              i
            </span>
          </div>

          {/* 3×2 Non-compatible Chips */}
          <div className="grid grid-cols-3 gap-3.5 mb-3.5" style={{ gridTemplateColumns: "repeat(3, 66px)" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => <ChipPhoto key={i} size={66} />)}
          </div>

          <p className="text-[13px] text-[#888] leading-[1.65]">
            We are unable to customize cards with these chips. Please contact us if you're
            not sure about your chip type.
          </p>
        </div>

        {/* ══ FINANCIAL SAFETY SECTION ══════════════════════════════════════ */}
        <FinancialSafety />
      </div>
    </>
  );
}
