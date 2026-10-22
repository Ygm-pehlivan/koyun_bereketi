import { createFileRoute, Link } from "@tanstack/react-router";
import mera from "@/assets/mera.jpg";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { PageHeader, meta } from "@/components/site/PageHeader";

export const Route = createFileRoute("/hakkimizda")({
  head: () => meta("Köyün Bereketi Hakkında", "Köyün Bereketi'nin hikâyesi: köy ürünlerinin samimi lezzetini sofralarınıza taşıyoruz."),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader title="Köyün Bereketi Hikâyesi" />
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2">
        <img src={mera} alt="Yeşil merada inekler" loading="lazy" width={1280} height={960} className="rounded-3xl shadow-soft" />
        <div>
          <p className="font-display text-2xl leading-relaxed text-primary first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:text-earth">
            Köyün Bereketi olarak köy ürünlerinin samimi lezzetini sofralarınıza taşımayı amaçlıyoruz.
          </p>
          <p className="mt-5 text-muted-foreground">
            Peynir, süt, tereyağı, süt ekşimeği ve yumurta gibi ürünlerimizi keşfedin; sofralarınıza köy mutfağının sıcaklığını katın. Ürünlerimizi kolayca inceleyebileceğiniz ve siparişinizi doğrudan bize iletebileceğiniz samimi bir alışveriş deneyimi sunuyoruz.
          </p>
          <Button asChild size="lg" className="mt-8"><Link to="/urunler">Ürünlerimizi Keşfet</Link></Button>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <img src={hero} alt="Ahşap masada köy ürünleri" loading="lazy" width={1920} height={1088} className="h-80 w-full rounded-3xl object-cover shadow-soft" />
      </section>
    </>
  );
}
