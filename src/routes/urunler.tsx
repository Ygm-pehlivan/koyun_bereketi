import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/site/ProductCard";
import { PageHeader, meta } from "@/components/site/PageHeader";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/urunler")({
  head: () => meta("Köy Ürünlerimiz ve Fiyatları | Köyün Bereketi", "Köy peyniri, köy sütü, köy yumurtası, tereyağı ve süt ekşimeği fiyatları. Sepete ekleyin veya WhatsApp ile sipariş verin."),
  component: () => (
    <>
      <PageHeader title="Doğallığı Sofranıza Taşıyın" subtitle="Köyün Bereketi ürünlerini keşfedin." />
      <section className="mx-auto max-w-6xl px-4 py-16"><ProductGrid products={PRODUCTS} /></section>
    </>
  ),
});
