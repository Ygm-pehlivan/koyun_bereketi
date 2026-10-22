import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";

export const NAV = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/urunler", label: "Ürünlerimiz" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/sss", label: "Sıkça Sorulan Sorular" },
  { to: "/iletisim", label: "İletişim" },
] as const;

function CartLink({ onClick }: { onClick?: () => void }) {
  const { count } = useCart();
  return (
    <Link to="/sepet" onClick={onClick} className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90" aria-label={`Sepet, ${count} ürün`}>
      <ShoppingBasket className="size-4" /> Sepet
      <span className="grid min-w-5 place-items-center rounded-full bg-background px-1.5 text-xs font-bold text-primary">{count}</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="bg-primary py-1.5 text-center text-sm text-primary-foreground">Köyün doğallığı sofranızda!</div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-primary"><Logo /></Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="text-sm font-medium text-foreground/80 transition hover:text-primary data-[status=active]:text-primary data-[status=active]:underline underline-offset-8">
              {n.label}
            </Link>
          ))}
          <CartLink />
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <CartLink />
          <button onClick={() => setOpen(!open)} aria-label="Menü" className="rounded-md p-2 text-primary">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block border-b border-border/60 py-3 font-medium">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
