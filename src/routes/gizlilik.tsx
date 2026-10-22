import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { meta } from "@/components/site/PageHeader";

export const Route = createFileRoute("/gizlilik")({
  head: () => meta("Gizlilik Politikası | Köyün Bereketi", "Köyün Bereketi gizlilik politikası."),
  component: () => (
    <LegalPage
      title="Gizlilik Politikası"
      sections={[
        ["Toplanan Bilgiler", "Sipariş formuna girdiğiniz ad, telefon ve adres bilgileri sitede saklanmaz; yalnızca sizin göndereceğiniz WhatsApp mesajına eklenir. Sepetiniz yalnızca kendi tarayıcınızda tutulur."],
        ["Bilgilerin Kullanımı", "WhatsApp üzerinden ilettiğiniz bilgiler yalnızca siparişinizin hazırlanması ve teslimi için kullanılır. [İşletme ek açıklamaları]"],
        ["İletişim", "Gizlilikle ilgili sorularınız için WhatsApp üzerinden bize ulaşabilirsiniz."],
      ]}
    />
  ),
});
