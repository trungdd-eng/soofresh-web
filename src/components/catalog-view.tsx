"use client";

import { useMemo, useState } from "react";
import { formatIdr, getSite, type Product } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { useShop } from "@/lib/shop-state";

function ProductCard({
  product,
  locale,
  addLabel,
  soldLabel,
}: {
  product: Product;
  locale: string;
  addLabel: string;
  soldLabel: string;
}) {
  const { addItem } = useShop();
  const [qty, setQty] = useState(1);
  const soldOut = product.stock <= 0;

  return (
    <article className={`bg-white ${soldOut ? "opacity-45" : ""}`}>
      <img src={product.image} alt="" className="aspect-square w-full object-cover" />
      <div className="p-4">
        <h2 className="text-lg">{product.name}</h2>
        <p className="mt-1 text-sm text-muted">{product.summary}</p>
        <p className="mt-3 text-sm">{formatIdr(product.priceIdr, locale)}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex border border-line">
            <button
              type="button"
              className="px-3 py-2"
              disabled={soldOut}
              onClick={() => setQty((value) => Math.max(1, value - 1))}
            >
              −
            </button>
            <span className="min-w-8 py-2 text-center text-sm">{qty}</span>
            <button
              type="button"
              className="px-3 py-2"
              disabled={soldOut}
              onClick={() => setQty((value) => value + 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            disabled={soldOut}
            className="bg-brand px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-brand/30"
            onClick={() =>
              addItem(
                {
                  sku: product.sku,
                  name: product.name,
                  priceIdr: product.priceIdr,
                  image: product.image,
                },
                qty,
              )
            }
          >
            {soldOut ? soldLabel : addLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

export function CatalogView({ locale }: { locale: string }) {
  const site = getSite(locale);
  const copy =
    locale === "en"
      ? {
          title: "The harvest, packed",
          lede: "Prices in rupiah. Sold-out stays visible and cannot be added.",
          add: "Add to basket",
          sold: "Sold out",
          more: "Load more",
          empty: "Nothing is packed this week.",
        }
      : {
          title: "Panen yang sudah dikemas",
          lede: "Harga dalam rupiah. Yang habis tetap terlihat dan tidak bisa ditambahkan.",
          add: "Tambah ke keranjang",
          sold: "Habis",
          more: "Muat lagi",
          empty: "Tidak ada yang dikemas minggu ini.",
        };
  const [visible, setVisible] = useState(4);
  const products = useMemo(() => site.products.slice(0, visible), [site.products, visible]);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-16 md:pt-36">
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">{copy.title}</h1>
      <p className="mt-4 max-w-xl text-muted">{copy.lede}</p>
      {products.length === 0 ? (
        <p className="mt-16 text-muted">{copy.empty}</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.sku}
              product={product}
              locale={locale}
              addLabel={copy.add}
              soldLabel={copy.sold}
            />
          ))}
        </div>
      )}
      {visible < site.products.length ? (
        <button
          type="button"
          className="mt-10 border border-ink/20 px-4 py-3 text-sm"
          onClick={() => setVisible((value) => value + 3)}
        >
          {copy.more}
        </button>
      ) : null}
      <p className="mt-8 text-sm">
        <Link href="/basket" className="text-brand">
          {locale === "en" ? "View basket" : "Lihat keranjang"} →
        </Link>
      </p>
    </div>
  );
}
