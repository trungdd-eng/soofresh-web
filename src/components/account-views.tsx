"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { formatIdr, getSite } from "@/content/site";
import { Link, useRouter } from "@/i18n/navigation";
import { useShop, type Address } from "@/lib/shop-state";

function copyFor(locale: string) {
  return locale === "en"
    ? {
        profile: "Profile",
        addresses: "Addresses",
        security: "Sign-in & security",
        orders: "Orders",
        signOut: "Sign out",
        saved: "Profile updated",
        confirm: "Sign out of SooFresh?",
        stay: "Stay",
        leave: "Sign out",
        need: "Sign in to see this page.",
        name: "Full name",
        phone: "Phone",
        save: "Save",
        emptyAddress: "No shipping address yet.",
        add: "Add address",
        added: "Address saved",
        updated: "Address updated",
        defaulted: "Default address updated",
        makeDefault: "Set as default",
        sessions: "Active sessions",
        thisDevice: "This browser",
        jakarta: "Jakarta",
        password: "Update password",
        code: "Email code",
        emptyOrders: "No orders yet.",
        shop: "Browse the harvest",
      }
    : {
        profile: "Profil",
        addresses: "Alamat",
        security: "Masuk & keamanan",
        orders: "Pesanan",
        signOut: "Keluar",
        saved: "Profil diperbarui",
        confirm: "Keluar dari SooFresh?",
        stay: "Tetap di sini",
        leave: "Keluar",
        need: "Masuk untuk melihat halaman ini.",
        name: "Nama lengkap",
        phone: "Telepon",
        save: "Simpan",
        emptyAddress: "Belum ada alamat pengiriman.",
        add: "Tambah alamat",
        added: "Alamat tersimpan",
        updated: "Alamat diperbarui",
        defaulted: "Alamat utama diperbarui",
        makeDefault: "Jadikan utama",
        sessions: "Sesi aktif",
        thisDevice: "Peramban ini",
        jakarta: "Jakarta",
        password: "Perbarui kata sandi",
        code: "Kode email",
        emptyOrders: "Belum ada pesanan.",
        shop: "Lihat panen",
      };
}

export function AccountFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const copy = copyFor(locale);
  const { customer, ready, signOut } = useShop();
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (ready && customer && !customer.profileComplete) router.push("/complete-profile");
  }, [ready, customer, router]);

  if (!ready) return null;
  if (!customer) {
    return (
      <p className="px-5 pt-36">
        {copy.need}{" "}
        <Link href="/sign-in" className="text-brand">
          →
        </Link>
      </p>
    );
  }
  if (!customer.profileComplete) return null;

  const links = [
    ["/account", copy.profile],
    ["/account/addresses", copy.addresses],
    ["/account/security", copy.security],
    ["/account/orders", copy.orders],
  ] as const;

  return (
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-28 pb-20 md:grid-cols-[220px_1fr] md:px-16 md:pt-36">
      <aside className="space-y-3 text-sm">
        <p className="text-muted">{customer.email}</p>
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="block hover:text-brand">
            {label}
          </Link>
        ))}
        <button type="button" className="text-left" onClick={() => setConfirm(true)}>
          {copy.signOut}
        </button>
      </aside>
      <div>{children}</div>
      {confirm ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-5">
          <div className="w-full max-w-sm bg-paper p-6">
            <p>{copy.confirm}</p>
            <div className="mt-6 flex gap-3">
              <button type="button" className="border border-line px-4 py-2 text-sm" onClick={() => setConfirm(false)}>
                {copy.stay}
              </button>
              <button
                type="button"
                className="bg-brand px-4 py-2 text-sm text-white"
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
              >
                {copy.leave}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <p className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-ink px-4 py-3 text-sm text-white">
      {message}
    </p>
  );
}

export function ProfileView() {
  const locale = useLocale();
  const copy = copyFor(locale);
  const { customer, updateCustomer } = useShop();
  const [name, setName] = useState(customer?.name ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [toast, setToast] = useState("");

  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        updateCustomer({ name, phone });
        setToast(copy.saved);
        window.setTimeout(() => setToast(""), 2400);
      }}
    >
      <h1 className="text-3xl font-medium">{copy.profile}</h1>
      <input className="w-full border border-line bg-white px-3 py-3" value={name} onChange={(event) => setName(event.target.value)} aria-label={copy.name} />
      <input className="w-full border border-line bg-white px-3 py-3" value={phone} onChange={(event) => setPhone(event.target.value)} aria-label={copy.phone} />
      <button type="submit" className="bg-brand px-4 py-3 text-sm text-white">
        {copy.save}
      </button>
      {toast ? <Toast message={toast} /> : null}
    </form>
  );
}

const blank = {
  label: "Home",
  recipient: "",
  phone: "",
  line1: "",
  district: "",
  city: "",
  province: "DKI Jakarta",
  postalCode: "",
};

export function AddressesView() {
  const locale = useLocale();
  const copy = copyFor(locale);
  const { customer, updateCustomer } = useShop();
  const addresses = customer?.addresses ?? [];
  const [editing, setEditing] = useState<Address | null>(null);
  const [toast, setToast] = useState("");

  function save(address: Address, isNew: boolean) {
    const next = isNew
      ? [...addresses.map((item) => ({ ...item, isDefault: address.isDefault ? false : item.isDefault })), address]
      : addresses.map((item) =>
          item.id === address.id
            ? address
            : { ...item, isDefault: address.isDefault ? false : item.isDefault },
        );
    updateCustomer({ addresses: next });
    setEditing(null);
    setToast(isNew ? copy.added : copy.updated);
    window.setTimeout(() => setToast(""), 2400);
  }

  return (
    <div>
      <h1 className="text-3xl font-medium">{copy.addresses}</h1>
      {addresses.length === 0 && !editing ? (
        <p className="mt-6 text-muted">{copy.emptyAddress}</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {addresses.map((address) => (
            <li key={address.id} className="border border-line bg-white p-4 text-sm">
              <p>
                {address.recipient} {address.isDefault ? "· default" : ""}
              </p>
              <p className="text-muted">
                {address.line1}, {address.district}, {address.city}, {address.province} {address.postalCode}
              </p>
              <div className="mt-3 flex gap-3">
                <button type="button" onClick={() => setEditing(address)}>
                  Edit
                </button>
                {!address.isDefault ? (
                  <button
                    type="button"
                    onClick={() => {
                      updateCustomer({
                        addresses: addresses.map((item) => ({
                          ...item,
                          isDefault: item.id === address.id,
                        })),
                      });
                      setToast(copy.defaulted);
                      window.setTimeout(() => setToast(""), 2400);
                    }}
                  >
                    {copy.makeDefault}
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        className="mt-6 border border-ink/20 px-4 py-2 text-sm"
        onClick={() =>
          setEditing({
            id: crypto.randomUUID(),
            isDefault: addresses.length === 0,
            ...blank,
            recipient: customer?.name ?? "",
            phone: customer?.phone ?? "",
          })
        }
      >
        {copy.add}
      </button>
      {editing ? (
        <AddressForm
          address={editing}
          isNew={!addresses.some((item) => item.id === editing.id)}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      ) : null}
      {toast ? <Toast message={toast} /> : null}
    </div>
  );
}

function AddressForm({
  address,
  isNew,
  onSave,
  onCancel,
}: {
  address: Address;
  isNew: boolean;
  onSave: (address: Address, isNew: boolean) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(address);
  const set = (key: keyof Address, value: string | boolean) =>
    setDraft((current) => ({ ...current, [key]: value }));

  return (
    <form
      className="mt-6 grid max-w-lg gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft, isNew);
      }}
    >
      {(["recipient", "phone", "line1", "district", "city", "province", "postalCode"] as const).map((key) => (
        <input
          key={key}
          required
          className="border border-line bg-white px-3 py-3"
          value={String(draft[key])}
          onChange={(event) => set(key, event.target.value)}
          aria-label={key}
        />
      ))}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={draft.isDefault}
          onChange={(event) => set("isDefault", event.target.checked)}
        />
        Default
      </label>
      <div className="flex gap-3">
        <button type="submit" className="bg-brand px-4 py-2 text-sm text-white">
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export function SecurityView() {
  const locale = useLocale();
  const copy = copyFor(locale);
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-medium">{copy.security}</h1>
      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (code.trim().length !== 6) return;
          setDone(true);
        }}
      >
        <p className="text-sm text-muted">{copy.password}</p>
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder={copy.code}
          className="w-full border border-line bg-white px-3 py-3"
        />
        <button type="submit" disabled={code.length !== 6} className="bg-brand px-4 py-3 text-sm text-white disabled:bg-brand/40">
          {copy.password}
        </button>
        {done ? <p className="text-sm text-brand">OK</p> : null}
      </form>
      <h2 className="mt-10 text-lg">{copy.sessions}</h2>
      <p className="mt-2 border border-line bg-white p-4 text-sm">
        {copy.thisDevice} · {copy.jakarta}
      </p>
    </div>
  );
}

export function OrdersView() {
  const locale = useLocale();
  const copy = copyFor(locale);
  const orders = getSite(locale).orders;

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-medium">{copy.orders}</h1>
        <p className="mt-4">{copy.emptyOrders}</p>
        <Link href="/products" className="mt-4 inline-flex text-brand">
          {copy.shop}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-medium">{copy.orders}</h1>
      <ul className="mt-6 divide-y divide-line border border-line bg-white">
        {orders.map((order) => (
          <li key={order.number}>
            <Link href={`/account/orders/${order.number}`} className="flex items-center justify-between p-4 text-sm">
              <span>
                {order.number}
                <span className="mt-1 block text-muted">{order.placed}</span>
              </span>
              <span className="text-brand">{order.status}</span>
              <span>{formatIdr(order.totalIdr, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OrderDetailView({ number }: { number: string }) {
  const locale = useLocale();
  const order = getSite(locale).orders.find((item) => item.number === number);
  if (!order) return <p>404</p>;

  return (
    <div>
      <p className="text-sm text-muted">{order.placed}</p>
      <h1 className="mt-2 text-3xl font-medium">{order.number}</h1>
      <ol className="mt-8 space-y-4">
        {order.timeline.map((step) => (
          <li key={step.status} className="flex gap-3 text-sm">
            <span className={`mt-1 h-2.5 w-2.5 rounded-full ${step.current ? "bg-brand" : "bg-line"}`} />
            <span>
              <span className={step.current ? "text-ink" : "text-muted"}>{step.status}</span>
              {step.date ? <span className="mt-1 block text-muted">{step.date}</span> : null}
            </span>
          </li>
        ))}
      </ol>
      <ul className="mt-8 text-sm">
        {order.items.map((item) => (
          <li key={item.name}>
            {item.name} × {item.qty} · {formatIdr(item.unitPriceIdr, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}
