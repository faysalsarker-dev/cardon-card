

export default function OrnateBorder() {
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