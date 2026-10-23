import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, MessageCircle, UtensilsCrossed, Wheat } from "lucide-react";
import hero from "@/assets/hero.jpg";
import mera from "@/assets/mera.jpg";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/site/ProductCard";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/Icons";
import { meta } from "@/components/site/PageHeader";
import { PRODUCTS } from "@/lib/products";
import { GENERAL_MESSAGE, INSTAGRAM_URL, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Köyün Bereketi | Doğal Köy Ürünleri",
      "Köyün Bereketi ile köy peyniri, süt, yumurta, tereyağı ve süt ekşimeği ürünlerini keşfedin. Ürünlerimizi inceleyin ve WhatsApp üzerinden sipariş verin.",
    ),
  component: Index,
});

const FEATURES = [
  { icon: Wheat, title: "Köy Ürünleri", text: "Köy mutfağının sevilen lezzetleri." },
  { icon: UtensilsCrossed, title: "Sofranıza Lezzet", text: "Günlük sofralarınıza eşlik eden ürünler." },
  { icon: MessageCircle, title: "Kolay Sipariş", text: "WhatsApp üzerinden doğrudan iletişim." },
  { icon: HeartHandshake, title: "Samimi Hizmet", text: "Sorularınız için kolayca bize ulaşın." },
];

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Köy sofrası ve merada otlayan inekler" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="bg-hero-overlay absolute inset-0 -z-10" />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-20 text-primary-foreground">
          <p className="fade-up font-display italic opacity-90">Köyden Sofranıza, Doğallığın En Güzel Hali</p>
          <h1 className="fade-up mt-3 max-w-2xl text-5xl leading-[1.05] md:text-7xl">Köyün Bereketi Sofranızda!</h1>
          <p className="fade-up mt-5 max-w-xl text-lg opacity-90">
            Köy ürünlerinin samimi lezzetini keşfedin. Peynir, süt, tereyağı, süt ekşimeği ve yumurta ile sofralarınıza köyün sıcaklığını taşıyın.
          </p>
          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg"><a href="#urunler">Ürünlerimizi Keşfet</a></Button>
            <Button asChild variant="whatsapp" size="lg">
              <a href={waLink(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp ile İletişim</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-12 grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <f.icon className="size-7 text-accent" />
            <h3 className="mt-3 text-lg text-primary">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      <section id="urunler" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-4xl text-primary md:text-5xl">Doğallığı Sofranıza Taşıyın</h2>
          <p className="mt-2 text-muted-foreground">Köyün Bereketi ürünlerini keşfedin.</p>
        </div>
        <ProductGrid products={PRODUCTS} />
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <img src={mera} alt="Yeşil merada otlayan inekler" loading="lazy" width={1280} height={960} className="rounded-3xl shadow-soft" />
          <div>
            <h2 className="text-4xl text-primary">Köyün Bereketi Hikâyesi</h2>
            <p className="mt-4 text-muted-foreground">
              Köy ürünlerinin samimi lezzetini sofralarınıza taşımayı amaçlıyoruz. Ürünlerimizi kolayca inceleyebileceğiniz ve siparişinizi doğrudan bize iletebileceğiniz samimi bir alışveriş deneyimi sunuyoruz.
            </p>
            <Button asChild className="mt-6 rounded-full"><Link to="/hakkimizda">Hikâyemizi Okuyun</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <InstagramIcon className="mx-auto size-10 text-earth" />
        <h2 className="mt-3 text-4xl text-primary">Bizi Instagram'da Takip Edin</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">Köyün Bereketi'nden haberler ve ürünlerimiz için Instagram hesabımızı ziyaret edin.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {PRODUCTS.map((p) => (
            <a key={p.id} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="aspect-square overflow-hidden rounded-xl">
              <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition hover:scale-105" />
            </a>
          ))}
        </div>
        <Button asChild size="lg" className="mt-8">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon /> Instagram Hesabımızı Ziyaret Et</a>
        </Button>
      </section>
    </>
  );
}
