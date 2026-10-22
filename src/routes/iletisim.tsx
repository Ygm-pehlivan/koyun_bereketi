import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/Icons";
import { PageHeader, meta } from "@/components/site/PageHeader";
import { GENERAL_MESSAGE, INSTAGRAM_URL, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/iletisim")({
  head: () => meta("Köyün Bereketi ile İletişim", "Ürünlerimiz hakkında bilgi almak ve sipariş vermek için WhatsApp üzerinden bize ulaşın."),
  component: () => (
    <>
      <PageHeader title="Bizimle İletişime Geçin" subtitle="Ürünlerimiz hakkında bilgi almak ve sipariş vermek için WhatsApp üzerinden bize ulaşabilirsiniz." />
      <section className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20">
        <Button asChild variant="whatsapp" size="lg" className="h-16 w-full text-lg">
          <a href={waLink(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-6" /> WhatsApp ile İletişim</a>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon /> Instagram Hesabımızı Ziyaret Et</a>
        </Button>
      </section>
    </>
  ),
});
