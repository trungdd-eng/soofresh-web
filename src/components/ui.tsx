import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  children: ReactNode;
}) {
  const styles = {
    solid: "bg-brand text-white hover:bg-brand-dark disabled:bg-brand/40",
    outline: "border border-ink/20 bg-transparent text-ink hover:border-ink",
    ghost: "bg-transparent text-ink hover:bg-black/5",
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm tracking-wide transition disabled:cursor-not-allowed ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TextField({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        className="w-full border border-line bg-white px-3 py-3 text-ink outline-none transition focus:border-brand"
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

export function TextArea({
  label,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <textarea
        className="min-h-32 w-full border border-line bg-white px-3 py-3 text-ink outline-none transition focus:border-brand"
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mx-auto max-w-[1440px] px-5 pt-28 pb-10 md:px-16 md:pt-36">
      {kicker ? (
        <p className="mb-3 text-xs tracking-[0.18em] text-brand uppercase">{kicker}</p>
      ) : null}
      <h1 className="max-w-3xl text-4xl leading-tight font-medium tracking-tight md:text-6xl">
        {title}
      </h1>
      {lede ? <p className="mt-5 max-w-2xl text-lg text-bronze">{lede}</p> : null}
    </header>
  );
}
