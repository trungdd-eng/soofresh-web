"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useRouter } from "@/i18n/navigation";
import { useShop, type Customer } from "@/lib/shop-state";

const emailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function SignInView({ mode }: { mode: "in" | "up" }) {
  const locale = useLocale();
  const router = useRouter();
  const { signIn } = useShop();
  const copy =
    locale === "en"
      ? {
          in: "Sign in",
          up: "Create account",
          email: "Email",
          password: "Password",
          google: "Continue with Google",
          switchIn: "Already have an account? Sign in",
          switchUp: "Create an account",
          badEmail: "Enter a valid email.",
          short: "Use at least 8 characters.",
        }
      : {
          in: "Masuk",
          up: "Buat akun",
          email: "Email",
          password: "Kata sandi",
          google: "Lanjutkan dengan Google",
          switchIn: "Sudah punya akun? Masuk",
          switchUp: "Buat akun",
          badEmail: "Masukkan email yang valid.",
          short: "Minimal 8 karakter.",
        };
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  function finish(provider: Customer["provider"], email: string) {
    if (provider === "google" || mode === "in") {
      signIn({
        email,
        name: "",
        phone: "",
        provider,
        profileComplete: provider === "google" ? false : mode === "in",
        addresses: [],
      });
      router.push(provider === "google" || mode === "up" ? "/complete-profile" : "/account");
      if (mode === "in" && provider === "email") router.push("/account");
      return;
    }
    sessionStorage.setItem("soofresh-pending-email", email);
    router.push("/verify");
  }

  return (
    <div className="mx-auto grid min-h-[80svh] max-w-[1440px] items-center gap-10 px-5 pt-24 md:grid-cols-2 md:px-16">
      <img src="/images/figma/flower.jpg" alt="" className="hidden h-[70vh] w-full object-cover md:block" />
      <form
        className="max-w-md space-y-4"
        onSubmit={form.handleSubmit((values) => finish("email", values.email))}
      >
        <h1 className="text-4xl font-medium">{mode === "in" ? copy.in : copy.up}</h1>
        <label className="block text-sm">
          <span className="text-muted">{copy.email}</span>
          <input className="mt-1 w-full border border-line bg-white px-3 py-3" {...form.register("email")} />
          {form.formState.errors.email ? (
            <span className="mt-1 block text-xs text-red-700">{copy.badEmail}</span>
          ) : null}
        </label>
        <label className="block text-sm">
          <span className="text-muted">{copy.password}</span>
          <input
            type="password"
            className="mt-1 w-full border border-line bg-white px-3 py-3"
            {...form.register("password")}
          />
          {form.formState.errors.password ? (
            <span className="mt-1 block text-xs text-red-700">{copy.short}</span>
          ) : null}
        </label>
        <button type="submit" className="bg-brand px-4 py-3 text-sm text-white">
          {mode === "in" ? copy.in : copy.up}
        </button>
        <button
          type="button"
          className="block w-full border border-line px-4 py-3 text-sm"
          onClick={() => finish("google", "google.user@soofresh.id")}
        >
          {copy.google}
        </button>
        <Link href={mode === "in" ? "/sign-up" : "/sign-in"} className="block text-sm text-brand">
          {mode === "in" ? copy.switchUp : copy.switchIn}
        </Link>
      </form>
    </div>
  );
}

export function VerifyView() {
  const locale = useLocale();
  const router = useRouter();
  const { signIn } = useShop();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const complete = digits.every((digit) => digit.length === 1);

  return (
    <div className="mx-auto max-w-md px-5 pt-36">
      <h1 className="text-4xl font-medium">{locale === "en" ? "Check your email" : "Periksa email Anda"}</h1>
      <p className="mt-3 text-sm text-muted">
        {locale === "en"
          ? "Enter the 6-digit code. Verify stays off until it is complete."
          : "Masukkan kode 6 digit. Verifikasi tetap mati sampai lengkap."}
      </p>
      <div className="mt-6 flex gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            inputMode="numeric"
            maxLength={1}
            value={digit}
            aria-label={`Digit ${index + 1}`}
            className={`h-14 w-12 border bg-white text-center text-xl ${
              digit ? "border-brand" : "border-line"
            }`}
            onChange={(event) => {
              const next = event.target.value.replace(/\D/g, "").slice(-1);
              setDigits((current) => current.map((item, itemIndex) => (itemIndex === index ? next : item)));
              const sibling = event.target.nextElementSibling as HTMLInputElement | null;
              if (next && sibling) sibling.focus();
            }}
          />
        ))}
      </div>
      <button
        type="button"
        disabled={!complete}
        className="mt-6 bg-brand px-4 py-3 text-sm text-white disabled:cursor-not-allowed disabled:bg-brand/40"
        onClick={() => {
          const email = sessionStorage.getItem("soofresh-pending-email") ?? "guest@soofresh.id";
          signIn({
            email,
            name: "",
            phone: "",
            provider: "email",
            profileComplete: false,
            addresses: [],
          });
          router.push("/complete-profile");
        }}
      >
        {locale === "en" ? "Verify" : "Verifikasi"}
      </button>
    </div>
  );
}

export function CompleteProfileView() {
  const locale = useLocale();
  const router = useRouter();
  const { customer, updateCustomer, ready } = useShop();
  const [name, setName] = useState(customer?.name ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");

  if (ready && !customer) {
    return (
      <p className="px-5 pt-36">
        <Link href="/sign-in">{locale === "en" ? "Sign in first" : "Masuk dulu"}</Link>
      </p>
    );
  }

  return (
    <form
      className="mx-auto max-w-md space-y-4 px-5 pt-36"
      onSubmit={(event) => {
        event.preventDefault();
        if (name.trim().length < 2 || phone.trim().length < 8) return;
        updateCustomer({ name: name.trim(), phone: phone.trim(), profileComplete: true });
        router.push("/account");
      }}
    >
      <h1 className="text-4xl font-medium">
        {locale === "en" ? "Complete your profile" : "Lengkapi profil"}
      </h1>
      <input
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={locale === "en" ? "Full name" : "Nama lengkap"}
        className="w-full border border-line bg-white px-3 py-3"
      />
      <input
        required
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder={locale === "en" ? "Phone" : "Telepon"}
        className="w-full border border-line bg-white px-3 py-3"
      />
      <button type="submit" className="bg-brand px-4 py-3 text-sm text-white">
        {locale === "en" ? "Continue" : "Lanjutkan"}
      </button>
    </form>
  );
}
