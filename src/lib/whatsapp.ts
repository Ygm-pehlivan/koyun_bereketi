import { lineTotal, totalAmount, type Product } from "./products";

const WA_NUMBER = "905308935088";
export const INSTAGRAM_URL = "https://www.instagram.com/koyunbereketi/";

export const waLink = (text?: string) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const GENERAL_MESSAGE =
  "Merhaba, Köyün Bereketi ürünleri hakkında bilgi almak ve sipariş vermek istiyorum.";

export function productMessage(p: Product, qty: number): string {
  const total = lineTotal(p.price, qty);
  if (p.id === "yumurta") {
    return `Merhaba, Köyün Bereketi'nden köy yumurtası sipariş vermek istiyorum. Adet fiyatı 12 TL. Sipariş vermek istediğim adet: ${qty}. Toplam: ${total} TL.`;
  }
  const base = `Merhaba, Köyün Bereketi'nden ${p.messageName} sipariş vermek istiyorum. ${p.unitLabel} fiyatı ${p.price} TL.`;
  const detail = ` Sipariş miktarı: ${qty} × ${p.unitLabel} (${totalAmount(p, qty)}). Toplam: ${total} TL.`;
  const tail = p.id === "peynir" ? " Sipariş hakkında bilgi alabilir miyim?" : "";
  return base + detail + tail;
}

export type OrderLine = { product: Product; qty: number };
export type OrderForm = {
  name: string;
  phone: string;
  method: "Yerel Teslimat" | "Kargo ile Gönderim" | "";
  il: string;
  ilce: string;
  adres: string;
  note: string;
};

export function validateOrder(f: OrderForm, lines: OrderLine[]): string[] {
  const e: string[] = [];
  if (lines.length === 0) e.push("Sepetiniz boş.");
  if (!f.name.trim()) e.push("Ad soyad gerekli.");
  if (f.phone.replace(/\D/g, "").length < 10) e.push("Geçerli bir telefon numarası girin.");
  if (!f.method) e.push("Teslimat yöntemi seçin.");
  if (!f.il.trim()) e.push("İl gerekli.");
  if (!f.ilce.trim()) e.push("İlçe gerekli.");
  if (!f.adres.trim()) e.push("Açık adres gerekli.");
  return e;
}

export function orderMessage(f: OrderForm, lines: OrderLine[]): string {
  const items = lines
    .map(
      ({ product: p, qty }) =>
        `- ${p.name}: ${qty} × ${p.unitLabel} (${totalAmount(p, qty)}) — birim fiyat ${p.price} TL — ara toplam ${lineTotal(p.price, qty)} TL`,
    )
    .join("\n");
  const sum = lines.reduce((s, l) => s + lineTotal(l.product.price, l.qty), 0);
  return `Merhaba, Köyün Bereketi üzerinden sipariş vermek istiyorum.

SİPARİŞ DETAYLARI
${items}

Ürünler toplamı: ${sum} TL

Teslimat yöntemi: ${f.method}

Ad Soyad: ${f.name.trim()}

Telefon: ${f.phone.trim()}

Adres: ${f.adres.trim()}, ${f.ilce.trim()} / ${f.il.trim()}

Sipariş notu: ${f.note.trim() || "-"}

Teslimat veya kargo ücreti hakkında bilgi rica ederim.

Teşekkürler.`;
}
