import { LeafMark } from "@/components/leaf-mark";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="grid min-h-[80svh] place-items-center px-5 pt-20 text-center">
      <div>
        <LeafMark className="mx-auto h-10 w-10" />
        <p className="mt-6 text-sm tracking-[0.2em] text-muted uppercase">404</p>
        <h1 className="mt-3 text-4xl font-medium">This page is not in the facility.</h1>
        <Link href="/" className="mt-8 inline-flex bg-brand px-4 py-3 text-sm text-white">
          Back home
        </Link>
      </div>
    </div>
  );
}
