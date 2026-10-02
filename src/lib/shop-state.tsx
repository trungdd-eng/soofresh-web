"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  sku: string;
  name: string;
  priceIdr: number;
  image: string;
  qty: number;
};

export type Address = {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  line1: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
};

export type Customer = {
  email: string;
  name: string;
  phone: string;
  provider: "email" | "google";
  profileComplete: boolean;
  addresses: Address[];
};

type ShopContextValue = {
  ready: boolean;
  customer: Customer | null;
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  signIn: (customer: Customer) => void;
  updateCustomer: (patch: Partial<Customer>) => void;
  signOut: () => void;
  addItem: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);
const SESSION_KEY = "soofresh-session";
const CART_KEY = "soofresh-cart";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      const storedCart = localStorage.getItem(CART_KEY);
      if (session) setCustomer(JSON.parse(session) as Customer);
      if (storedCart) setCart(JSON.parse(storedCart) as CartLine[]);
    } catch {
      /* ignore broken local data */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (customer) localStorage.setItem(SESSION_KEY, JSON.stringify(customer));
    else localStorage.removeItem(SESSION_KEY);
  }, [customer, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const value = useMemo<ShopContextValue>(() => {
    const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
    const cartTotal = cart.reduce((sum, line) => sum + line.qty * line.priceIdr, 0);
    return {
      ready,
      customer,
      cart,
      cartCount,
      cartTotal,
      signIn: (next) => setCustomer(next),
      updateCustomer: (patch) =>
        setCustomer((current) => (current ? { ...current, ...patch } : current)),
      signOut: () => setCustomer(null),
      addItem: (line, qty = 1) =>
        setCart((current) => {
          const existing = current.find((item) => item.sku === line.sku);
          if (existing) {
            return current.map((item) =>
              item.sku === line.sku ? { ...item, qty: item.qty + qty } : item,
            );
          }
          return [...current, { ...line, qty }];
        }),
      setQty: (sku, qty) =>
        setCart((current) =>
          qty <= 0
            ? current.filter((item) => item.sku !== sku)
            : current.map((item) => (item.sku === sku ? { ...item, qty } : item)),
        ),
      clearCart: () => setCart([]),
    };
  }, [ready, customer, cart]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside ShopProvider");
  return value;
}
