import { describe, expect, it } from "vitest";
import { PRODUCTS, getProduct, lineTotal, totalAmount } from "./products";
import { orderMessage, productMessage, validateOrder, waLink } from "./whatsapp";

const p = (id: string) => getProduct(id)!;

describe("fiyatlar", () => {
  it("ürün fiyatları doğru", () => {
    expect(Object.fromEntries(PRODUCTS.map((x) => [x.id, x.price]))).toEqual({
      peynir: 500, sut: 250, yumurta: 12, tereyagi: 800, eksimek: 300,
    });
  });
  it("2 süt paketi = 10 litre, 500 TL", () => {
    expect(totalAmount(p("sut"), 2)).toBe("10 litre");
    expect(lineTotal(250, 2)).toBe(500);
  });
  it("5 yumurta = 60 TL", () => expect(lineTotal(12, 5)).toBe(60));
});

describe("whatsapp", () => {
  it("numarayla wa.me bağlantısı ve kodlanmış mesaj", () => {
    expect(waLink("a b")).toBe("https://wa.me/905308935088?text=a%20b");
  });
  it("yumurta mesajı seçilen adedi içerir", () => {
    expect(productMessage(p("yumurta"), 5)).toContain("Sipariş vermek istediğim adet: 5");
  });
  it("eksik form gönderilemez", () => {
    const f = { name: "", phone: "", method: "" as const, il: "", ilce: "", adres: "", note: "" };
    expect(validateOrder(f, [{ product: p("sut"), qty: 1 }]).length).toBeGreaterThan(0);
  });
  it("sipariş mesajında toplam var, kargo ücreti eklenmez", () => {
    const f = { name: "A", phone: "05551112233", method: "Kargo ile Gönderim" as const, il: "X", ilce: "Y", adres: "Z", note: "" };
    const lines = [{ product: p("sut"), qty: 2 }, { product: p("yumurta"), qty: 5 }];
    expect(validateOrder(f, lines)).toEqual([]);
    expect(orderMessage(f, lines)).toContain("Ürünler toplamı: 560 TL");
  });
});
