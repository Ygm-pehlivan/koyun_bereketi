export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="currentColor" opacity="0.12" />
        <path d="M20 33V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        {[14, 19, 24].map((y) => (
          <g key={y} fill="currentColor">
            <ellipse cx="16" cy={y} rx="4" ry="2.2" transform={`rotate(-35 16 ${y})`} />
            <ellipse cx="24" cy={y} rx="4" ry="2.2" transform={`rotate(35 24 ${y})`} />
          </g>
        ))}
        <ellipse cx="20" cy="9" rx="2.2" ry="3.6" fill="currentColor" />
      </svg>
      <span className="font-display text-xl font-semibold leading-none tracking-tight">Köyün Bereketi</span>
    </span>
  );
}
