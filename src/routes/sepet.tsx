import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppIcon } from "@/components/site/Icons";
import { QtyStepper } from "@/components/site/ProductCard";
import { PageHeader, meta } from "@/components/site/PageHeader";
import { useCart } from "@/lib/cart";
import { formatTL, lineTotal, totalAmount } from "@/lib/products";
import { orderMessage, validateOrder, waLink, type OrderForm } from "@/lib/whatsapp";

export const Route = createFileRoute("/sepet")({
  head: () => meta("Sepetim | Köyün Bereketi", "Sepetinizdeki köy ürünlerini kontrol edin ve siparişinizi WhatsApp ile iletin."),
  component: Cart,
});

const EMPTY: OrderForm = { name: "", phone: "", method: "", il: "", ilce: "", adres: "", note: "" };

function Cart() {
  const { lines, total, setQty, remove, clear } = useCart();
  const [f, setF] = useState<OrderForm>(EMPTY);
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const set = (k: keyof OrderForm) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateOrder(f, lines);
    setErrors(errs);
    if (errs.length) return;
    window.open(waLink(orderMessage(f, lines)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (lines.length === 0)
    return (
      <>
        <PageHeader title="Sepetim" />
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <p className="text-lg text-muted-foreground">Sepetiniz şu anda boş.</p>
          <Button asChild size="lg" className="mt-6"><Link to="/urunler">Alışverişe Başla</Link></Button>
        </div>
      </>
    );

  return (
    <>
      <PageHeader title="Sepetim" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.3fr_1fr]">
        <section className="space-y-4">
          {lines.map(({ product: p, qty }) => (
            <div key={p.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <img src={p.image} alt={p.name} width={96} height={96} className="size-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl text-primary">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{formatTL(p.price)} / {p.unitLabel} · Toplam {totalAmount(p, qty)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <QtyStepper value={qty} onChange={(n) => setQty(p.id, n)} label={p.name} />
                  <span className="w-20 text-right font-semibold">{formatTL(lineTotal(p.price, qty))}</span>
                  <button onClick={() => remove(p.id)} aria-label={`${p.name} sil`} className="text-destructive"><Trash2 className="size-5" /></button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-2xl bg-secondary p-5">
            <span className="font-display text-xl">Ürünler toplamı</span>
            <span className="font-display text-3xl font-semibold text-earth">{formatTL(total)}</span>
          </div>
          <p className="text-sm text-muted-foreground">Teslimat veya kargo ücreti varsa toplama dahil değildir; sipariş sırasında bildirilecektir.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-full"><Link to="/urunler">Alışverişe Devam Et</Link></Button>
            <Button variant="ghost" className="rounded-full" onClick={clear}>Ürünleri Temizle</Button>
          </div>
        </section>

        <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-2xl text-primary">Sipariş Bilgileri</h2>
          <div><Label htmlFor="name">Ad Soyad *</Label><Input id="name" value={f.name} onChange={set("name")} /></div>
          <div><Label htmlFor="phone">Telefon *</Label><Input id="phone" type="tel" value={f.phone} onChange={set("phone")} /></div>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Teslimat yöntemi *</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["Yerel Teslimat", "Kargo ile Gönderim"] as const).map((m) => (
                <button type="button" key={m} onClick={() => setF({ ...f, method: m })}
                  className={`rounded-xl border p-3 text-sm font-medium transition ${f.method === m ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
                  {m}
                </button>
              ))}
            </div>
            {f.method === "Yerel Teslimat" && <p className="mt-2 text-xs text-muted-foreground">Teslimat bölgesi ve varsa teslimat ücreti sipariş sırasında işletme tarafından teyit edilecektir.</p>}
            {f.method === "Kargo ile Gönderim" && <p className="mt-2 text-xs text-muted-foreground">Kargo ücreti ve gönderim koşulları sipariş onayında bildirilecektir.</p>}
          </fieldset>
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="il">İl *</Label><Input id="il" value={f.il} onChange={set("il")} /></div>
            <div><Label htmlFor="ilce">İlçe *</Label><Input id="ilce" value={f.ilce} onChange={set("ilce")} /></div>
          </div>
          <div><Label htmlFor="adres">Açık adres *</Label><Textarea id="adres" value={f.adres} onChange={set("adres")} /></div>
          <div><Label htmlFor="note">Sipariş notu</Label><Textarea id="note" value={f.note} onChange={set("note")} /></div>
          {errors.length > 0 && (
            <ul role="alert" className="list-disc rounded-xl bg-destructive/10 p-3 pl-7 text-sm text-destructive">
              {errors.map((e) => <li key={e}>{e}</li>)}
            </ul>
          )}
          <Button type="submit" variant="whatsapp" size="lg" className="w-full"><WhatsAppIcon /> WhatsApp ile Sipariş Ver</Button>
          <p className="text-xs text-muted-foreground">
            {sent ? "WhatsApp açıldı. Siparişinizin iletilmesi için mesajı WhatsApp içinde göndermeyi unutmayın." : "Butona tıklayınca sipariş mesajınız WhatsApp'ta hazırlanır; siparişin iletilmesi için mesajı sizin göndermeniz gerekir."}
          </p>
        </form>
      </div>
    </>
  );
}
