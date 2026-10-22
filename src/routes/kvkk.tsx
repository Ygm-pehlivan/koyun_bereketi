import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { meta } from "@/components/site/PageHeader";

export const Route = createFileRoute("/kvkk")({
  head: () => meta("KVKK Aydınlatma Metni | Köyün Bereketi", "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni."),
  component: () => (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      sections={[
        ["Veri Sorumlusu", "[İşletme unvanı], [adres], [vergi dairesi / numarası]"],
        ["İşlenen Kişisel Veriler", "Ad soyad, telefon numarası ve teslimat adresi; siparişinizi WhatsApp üzerinden ilettiğinizde işlenir."],
        ["İşleme Amaçları", "Siparişin alınması, hazırlanması, teslimatı ve sizinle iletişim kurulması."],
        ["Haklarınız", "KVKK'nın 11. maddesi kapsamındaki haklarınız için [başvuru yöntemi] üzerinden başvurabilirsiniz."],
      ]}
    />
  ),
});
