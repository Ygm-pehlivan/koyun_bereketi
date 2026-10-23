import logoUrl from "@/assets/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoUrl}
        alt="Köyün Bereketi logosu"
        width={48}
        height={48}
        className="size-11 shrink-0 rounded-xl object-cover"
      />
      <span className="font-display text-xl font-semibold leading-none tracking-tight">
        Köyün Bereketi
      </span>
    </span>
  );
}
