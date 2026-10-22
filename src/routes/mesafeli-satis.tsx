import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { meta } from "@/components/site/PageHeader";

export const Route = createFileRoute("/mesafeli-satis")({
  head: () => meta("Mesafeli Satış ve İade Koşulları | Köyün Bereketi", "Köyün Bereketi mesafeli satış ve iade koşulları."),
  component: () => (
    <LegalPage
      title="Mesafeli Satış ve İade Koşulları"
      sections={[
        ["Taraflar", "Satıcı: [İşletme unvanı, adres, vergi bilgileri]. Alıcı: Siparişi veren müşteri."],
        ["Sipariş ve Onay", "Siparişler WhatsApp üzerinden iletilir ve işletme tarafından onaylandıktan sonra kesinleşir. Teslimat ve kargo ücretleri onay sırasında bildirilir."],
        ["Teslimat", "[Teslimat bölgeleri, süreleri ve koşulları]"],
        ["İade ve Cayma Hakkı", "Çabuk bozulabilen gıda ürünlerinde cayma hakkı mevzuat gereği sınırlı olabilir. [İşletmenin iade koşulları]"],
      ]}
    />
  ),
});
