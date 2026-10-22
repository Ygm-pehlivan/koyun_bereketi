import peynir from "@/assets/peynir.jpg";
import sut from "@/assets/sut.jpg";
import yumurta from "@/assets/yumurta.jpg";
import tereyagi from "@/assets/tereyagi.jpg";
import eksimek from "@/assets/eksimek.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  /** Fiyat, tam sayı TL (kuruş hatası olmaması için tam sayı tutulur) */
  price: number;
  /** Bir satış biriminin gösterimi, ör. "1 kg", "5 litre", "1 adet" */
  unitLabel: string;
  /** Bir birimdeki miktar ve ölçü (toplam miktar hesaplamak için) */
  unitAmount: number;
  unitMeasure: "kg" | "litre" | "adet";
  image: string;
  /** WhatsApp mesajında kullanılacak ürün adı (küçük harf) */
  messageName: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "peynir",
    name: "Köy Peyniri",
    description: "Kahvaltı sofralarına ve günlük öğünlere eşlik eden köy peyniri.",
    price: 500,
    unitLabel: "1 kg",
    unitAmount: 1,
    unitMeasure: "kg",
    image: peynir,
    messageName: "köy peyniri",
  },
  {
    id: "sut",
    name: "Köy Sütü",
    description: "Sofralara köy lezzetini taşıyan süt.",
    price: 250,
    unitLabel: "5 litre",
    unitAmount: 5,
    unitMeasure: "litre",
    image: sut,
    messageName: "köy sütü",
  },
  {
    id: "yumurta",
    name: "Köy Yumurtası",
    description: "Kahvaltıların ve günlük tariflerin vazgeçilmez lezzeti.",
    price: 12,
    unitLabel: "1 adet",
    unitAmount: 1,
    unitMeasure: "adet",
    image: yumurta,
    messageName: "köy yumurtası",
  },
  {
    id: "tereyagi",
    name: "Köy Tereyağı",
    description: "Kahvaltılara ve yemeklere eşlik eden geleneksel tereyağı lezzeti.",
    price: 800,
    unitLabel: "1 kg",
    unitAmount: 1,
    unitMeasure: "kg",
    image: tereyagi,
    messageName: "köy tereyağı",
  },
  {
    id: "eksimek",
    name: "Süt Ekşimeği",
    description: "Geleneksel köy mutfağının sevilen lezzetlerinden biri.",
    price: 300,
    unitLabel: "1 kg",
    unitAmount: 1,
    unitMeasure: "kg",
    image: eksimek,
    messageName: "süt ekşimeği",
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const lineTotal = (price: number, qty: number) => Math.round(price) * Math.max(0, Math.floor(qty));

export const totalAmount = (p: Pick<Product, "unitAmount" | "unitMeasure">, qty: number) =>
  `${p.unitAmount * qty} ${p.unitMeasure}`;

export const formatTL = (n: number) => `${n.toLocaleString("tr-TR")} ₺`;
