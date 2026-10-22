import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatTL, lineTotal, totalAmount, type Product } from "@/lib/products";
import { productMessage, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background">
      <button type="button" aria-label={`${label} azalt`} onClick={() => onChange(Math.max(1, value - 1))} className="p-2 text-primary hover:text-accent"><Minus className="size-4" /></button>
      <input
        aria-label={`${label} miktar`}
        inputMode="numeric"
        value={value}
        onChange={(e) => { const n = parseInt(e.target.value.replace(/\D/g, ""), 10); onChange(Number.isFinite(n) && n > 0 ? Math.min(n, 999) : 1); }}
        className="w-10 bg-transparent text-center font-semibold outline-none"
      />
      <button type="button" aria-label={`${label} artır`} onClick={() => onChange(Math.min(999, value + 1))} className="p-2 text-primary hover:text-accent"><Plus className="size-4" /></button>
    </div>
  );
}

export function ProductCard({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl text-primary">{p.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-3xl font-semibold text-earth">{formatTL(p.price)}</span>
          <span className="text-sm text-muted-foreground">/ {p.unitLabel}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <QtyStepper value={qty} onChange={setQty} label={p.name} />
          <div className="text-right text-xs text-muted-foreground">
            {totalAmount(p, qty)}<br /><span className="text-sm font-semibold text-foreground">{formatTL(lineTotal(p.price, qty))}</span>
          </div>
        </div>
        <Button className="mt-4 rounded-full" onClick={() => { add(p.id, qty); toast.success(`${p.name} sepete eklendi`); }}>Sepete Ekle</Button>
        <Button asChild variant="whatsapp" className="mt-2 rounded-full">
          <a href={waLink(productMessage(p, qty))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4" /> WhatsApp ile Sipariş Ver</a>
        </Button>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
