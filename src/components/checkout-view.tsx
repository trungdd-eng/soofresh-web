"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatIdr, getSite } from "@/content/site";
import { Link, useRouter } from "@/i18n/navigation";
import { useShop } from "@/lib/shop-state";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  line1: z.string().min(4),
  district: z.string().min(2),
  city: z.string().min(2),
  province: z.string().min(2),
  postalCode: z.string().min(4),
  method: z.enum(["qris", "card"]),
  cardNumber: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export type DraftOrder = {
  number: string;
  email: string;
  name: string;
  method: "qris" | "card";
  totalIdr: number;
  lines: { name: string; qty: number; unitPriceIdr: number }[];
};

export const DRAFT_KEY = "soofresh-draft-order";

export function CheckoutView() {
  const locale = useLocale();
  const router = useRouter();
  const { cart, cartTotal, customer } = useShop();
  const shipping = cart.length ? getSite(locale).shippingIdr : 0;
  const total = cartTotal + shipping;
  const [method, setMethod] = useState<"qris" | "card">("qris");
  const [cardError, setCardError] = useState(false);
  const copy =
    locale === "en"
      ? {
          title: "Checkout",
          contact: "Contact",
          address: "Shipping address",
          pay: "Payment",
          qris: "QRIS",
          card: "Card",
          payNow: "Pay now",
          empty: "Add something before checkout.",
          cardHint: "16 digits",
          cardError: "Enter a 16-digit card number.",
          name: "Full name",
          email: "Email",
          phone: "Phone",
          line: "Address",
          district: "District",
          city: "City",
          province: "Province",
          postal: "Postal code",
        }
      : {
          title: "Checkout",
          contact: "Kontak",
          address: "Alamat pengiriman",
          pay: "Pembayaran",
          qris: "QRIS",
          card: "Kartu",
          payNow: "Bayar sekarang",
          empty: "Tambahkan sesuatu sebelum checkout.",
          cardHint: "16 digit",
          cardError: "Masukkan nomor kartu 16 digit.",
          name: "Nama lengkap",
          email: "Email",
          phone: "Telepon",
          line: "Alamat",
          district: "Kecamatan",
          city: "Kota",
          province: "Provinsi",
          postal: "Kode pos",
        };

  const defaultAddress = customer?.addresses.find((item) => item.isDefault) ?? customer?.addresses[0];
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer?.name ?? "",
      email: customer?.email ?? "",
      phone: customer?.phone ?? defaultAddress?.phone ?? "",
      line1: defaultAddress?.line1 ?? "",
      district: defaultAddress?.district ?? "",
      city: defaultAddress?.city ?? "",
      province: defaultAddress?.province ?? "",
      postalCode: defaultAddress?.postalCode ?? "",
      method: "qris",
    },
  });

  useEffect(() => {
    if (!customer) return;
    form.reset({
      ...form.getValues(),
      name: customer.name,
      email: customer.email,
      phone: customer.phone || defaultAddress?.phone || "",
      line1: defaultAddress?.line1 ?? "",
      district: defaultAddress?.district ?? "",
      city: defaultAddress?.city ?? "",
      province: defaultAddress?.province ?? "",
      postalCode: defaultAddress?.postalCode ?? "",
    });
  }, [customer, defaultAddress, form]);

  const qrCells = useMemo(
    () => Array.from({ length: 121 }, (_, index) => (index * 7 + total) % 3 !== 0),
    [total],
  );

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 pt-32">
        <p>{copy.empty}</p>
        <Link href="/products" className="mt-4 inline-flex text-brand">
          →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-28 pb-20 md:grid-cols-[1.1fr_0.9fr] md:px-16 md:pt-36">
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit((values) => {
          const digits = (values.cardNumber ?? "").replace(/\D/g, "");
          if (method === "card" && digits.length !== 16) {
            setCardError(true);
            return;
          }
          setCardError(false);
          const draft: DraftOrder = {
            number: `SF-${Math.floor(10000 + Math.random() * 89999)}`,
            email: values.email,
            name: values.name,
            method,
            totalIdr: total,
            lines: cart.map((line) => ({
              name: line.name,
              qty: line.qty,
              unitPriceIdr: line.priceIdr,
            })),
          };
          sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
          router.push("/checkout/processing");
        })}
      >
        <h1 className="text-4xl font-medium">{copy.title}</h1>
        <fieldset className="space-y-3">
          <legend className="text-sm text-muted">{copy.contact}</legend>
          <input className="w-full border border-line bg-white px-3 py-3" placeholder={copy.name} {...form.register("name")} />
          <input className="w-full border border-line bg-white px-3 py-3" placeholder={copy.email} {...form.register("email")} />
          <input className="w-full border border-line bg-white px-3 py-3" placeholder={copy.phone} {...form.register("phone")} />
        </fieldset>
        <fieldset className="space-y-3">
          <legend className="text-sm text-muted">{copy.address}</legend>
          <input className="w-full border border-line bg-white px-3 py-3" placeholder={copy.line} {...form.register("line1")} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="border border-line bg-white px-3 py-3" placeholder={copy.district} {...form.register("district")} />
            <input className="border border-line bg-white px-3 py-3" placeholder={copy.city} {...form.register("city")} />
            <input className="border border-line bg-white px-3 py-3" placeholder={copy.province} {...form.register("province")} />
            <input className="border border-line bg-white px-3 py-3" placeholder={copy.postal} {...form.register("postalCode")} />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm text-muted">{copy.pay}</legend>
          <div className="mt-3 flex gap-2">
            {(["qris", "card"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMethod(item)}
                className={`border px-4 py-2 text-sm ${method === item ? "border-ink bg-ink text-white" : "border-line"}`}
              >
                {copy[item]}
              </button>
            ))}
          </div>
          {method === "qris" ? (
            <div className="mt-4 inline-grid grid-cols-11 gap-0.5 bg-white p-3">
              {qrCells.map((on, index) => (
                <span key={index} className={`h-3 w-3 ${on ? "bg-ink" : "bg-white"}`} />
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <input
                inputMode="numeric"
                autoComplete="off"
                placeholder={copy.cardHint}
                className="w-full border border-line bg-white px-3 py-3"
                {...form.register("cardNumber")}
              />
              {cardError ? <p className="mt-2 text-sm text-red-700">{copy.cardError}</p> : null}
            </div>
          )}
        </fieldset>
        <button type="submit" className="bg-brand px-4 py-3 text-sm text-white">
          {copy.payNow}
        </button>
      </form>
      <aside className="h-fit bg-white p-5">
        <ul className="space-y-3 text-sm">
          {cart.map((line) => (
            <li key={line.sku} className="flex justify-between gap-4">
              <span>
                {line.name} × {line.qty}
              </span>
              <span>{formatIdr(line.priceIdr * line.qty, locale)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-line pt-4 text-lg">{formatIdr(total, locale)}</p>
      </aside>
    </div>
  );
}

export function ProcessingView() {
  const router = useRouter();
  const locale = useLocale();
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 8));
    }, 180);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const timeout = window.setTimeout(() => router.push("/checkout/success"), 400);
    return () => window.clearTimeout(timeout);
  }, [progress, router]);

  return (
    <div className="mx-auto max-w-lg px-5 pt-40">
      <p className="text-sm text-muted">{locale === "en" ? "Processing payment" : "Memproses pembayaran"}</p>
      <div className="mt-4 h-1 bg-line">
        <div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function SuccessView() {
  const locale = useLocale();
  const { clearCart } = useShop();
  const [draft, setDraft] = useState<DraftOrder | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (raw) setDraft(JSON.parse(raw) as DraftOrder);
    clearCart();
    // Clear the basket once when the confirmation screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = locale === "en" ? "Payment successful" : "Pembayaran berhasil";
  const body =
    locale === "en"
      ? "This is the confirmation screen. No charge was sent to a bank."
      : "Ini layar konfirmasi. Tidak ada tagihan yang dikirim ke bank.";

  return (
    <div className="mx-auto max-w-xl px-5 pt-32 pb-20">
      <p className="text-xs tracking-[0.18em] text-brand uppercase">SooFresh</p>
      <h1 className="mt-3 text-4xl font-medium">{title}</h1>
      <p className="mt-4 text-muted">{body}</p>
      {draft ? (
        <p className="mt-6 text-sm">
          {draft.number} · {formatIdr(draft.totalIdr, locale)} · {draft.method.toUpperCase()}
        </p>
      ) : null}
      <Link href="/account/orders" className="mt-8 inline-flex bg-brand px-4 py-3 text-sm text-white">
        {locale === "en" ? "View orders" : "Lihat pesanan"}
      </Link>
    </div>
  );
}
