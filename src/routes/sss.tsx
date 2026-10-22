import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader, meta } from "@/components/site/PageHeader";

export const Route = createFileRoute("/sss")({
  head: () => meta("Sıkça Sorulan Sorular | Köyün Bereketi", "Sipariş, teslimat, kargo, ödeme ve saklama koşulları hakkında sıkça sorulan sorular."),
  component: Faq,
});

// İşletme sahibi bu yanıtları kendi koşullarına göre düzenleyebilir.
const FAQ = [
  ["Köyün Bereketi ürünlerini nasıl sipariş verebilirim?", "Ürünleri sepete ekleyip sepet sayfasındaki formu doldurarak siparişinizi WhatsApp üzerinden iletebilirsiniz. Dilerseniz her ürünün altındaki “WhatsApp ile Sipariş Ver” butonunu da kullanabilirsiniz."],
  ["WhatsApp üzerinden sipariş verebilir miyim?", "Evet. Ürün kartlarının altındaki WhatsApp butonları, seçtiğiniz ürün ve miktarla hazırlanmış bir mesajla sohbeti açar. Mesajı WhatsApp içinde sizin göndermeniz gerekir."],
  ["Yerel teslimat seçeneği var mı?", "Sipariş formunda yerel teslimatı seçebilirsiniz. Teslimat bölgesi sipariş sırasında işletme tarafından teyit edilecektir."],
  ["Kargo ile gönderim yapılıyor mu?", "Sipariş formunda kargo ile gönderimi seçebilirsiniz. Kargo ücreti ve gönderim koşulları sipariş onayında bildirilecektir."],
  ["Teslimat ve kargo ücretleri nasıl belirleniyor?", "Teslimat ve kargo ücretleri sipariş sırasında işletme tarafından bildirilir; sitede otomatik olarak eklenmez."],
  ["Hangi ödeme yöntemleri geçerli?", "Ödeme yöntemleri sipariş sırasında WhatsApp üzerinden işletme tarafından bildirilecektir. Sitede çevrim içi ödeme alınmamaktadır."],
  ["Ürünlerin saklama koşulları nelerdir?", "Saklama koşulları hakkında bilgi almak için WhatsApp üzerinden bize ulaşabilirsiniz."],
];

function Faq() {
  return (
    <>
      <PageHeader title="Sıkça Sorulan Sorular" />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6 shadow-soft">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={i} value={`q${i}`}>
              <AccordionTrigger className="text-left font-display text-lg text-primary">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
