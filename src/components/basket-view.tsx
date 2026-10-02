"use client";

import { formatIdr, getSite } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { useShop } from "@/lib/shop-state";

export function BasketView({ locale }: { locale: string }) {
  const { cart, cartTotal, setQty } = useShop();
  const shipping = cart.length ? getSite(locale).shippingIdr : 0;
  const copy =
    locale === "en"
      ? {
          title: "Basket",
          empty: "Your basket is empty.",
          back: "Back to the harvest",
          add: "Add another product",
          checkout: "Proceed to checkout",
          subtotal: "Subtotal",
          shipping: "Shipping",
          total: "Total",
        }
      : {
          title: "Keranjang",
          empty: "Keranjang Anda kosong.",
          back: "Kembali ke panen",
          add: "Tambah produk lain",
          checkout: "Lanjut ke pembayaran",
          subtotal: "Subtotal",
          shipping: "Ongkir",
          total: "Total",
        };

  return (
    <div className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:px-8 md:pt-36">
      <h1 className="text-4xl font-medium">{copy.title}</h1>
      {cart.length === 0 ? (
        <div className="mt-12 border border-line bg-white p-8">
          <p>{copy.empty}</p>
          <Link href="/products" className="mt-6 inline-flex bg-brand px-4 py-3 text-sm text-white">
            {copy.back}
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-line border border-line bg-white">
            {cart.map((line) => (
              <li key={line.sku} className="flex gap-4 p-4">
                <img src={line.image} alt="" className="h-20 w-20 object-cover" />
                <div className="flex-1">
                  <p>{line.name}</p>
                  <p className="text-sm text-muted">{formatIdr(line.priceIdr, locale)}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <button type="button" onClick={() => setQty(line.sku, line.qty - 1)}>
                      −
                    </button>
                    <span>{line.qty}</span>
                    <button type="button" onClick={() => setQty(line.sku, line.qty + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <p className="text-sm">{formatIdr(line.priceIdr * line.qty, locale)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>{copy.subtotal}</dt>
              <dd>{formatIdr(cartTotal, locale)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy.shipping}</dt>
              <dd>{formatIdr(shipping, locale)}</dd>
            </div>
            <div className="flex justify-between text-base">
              <dt>{copy.total}</dt>
              <dd>{formatIdr(cartTotal + shipping, locale)}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="border border-ink/20 px-4 py-3 text-sm">
              {copy.add}
            </Link>
            <Link href="/checkout" className="bg-brand px-4 py-3 text-sm text-white">
              {copy.checkout}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
