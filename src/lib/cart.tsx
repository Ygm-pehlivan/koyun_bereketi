import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, lineTotal, type Product } from "./products";

type Items = Record<string, number>;
type Ctx = {
  lines: { product: Product; qty: number }[];
  count: number;
  total: number;
  add: (id: string, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "koyun-bereketi-sepet";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Items>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const value = useMemo<Ctx>(() => {
    const lines = PRODUCTS.filter((p) => items[p.id] > 0).map((p) => ({ product: p, qty: items[p.id] }));
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + lineTotal(l.product.price, l.qty), 0),
      add: (id, qty) => setItems((s) => ({ ...s, [id]: (s[id] ?? 0) + Math.max(1, Math.floor(qty)) })),
      setQty: (id, qty) =>
        setItems((s) => {
          const n = { ...s };
          if (qty <= 0) delete n[id];
          else n[id] = Math.floor(qty);
          return n;
        }),
      remove: (id) => setItems(({ [id]: _, ...rest }) => rest),
      clear: () => setItems({}),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
