export default function ElegantBorder() {
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