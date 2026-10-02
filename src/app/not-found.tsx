import { LeafMark } from "@/components/leaf-mark";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper px-5 text-center text-ink">
      <div>
        <LeafMark className="mx-auto h-10 w-10" />
        <p className="mt-6 text-sm tracking-[0.2em] uppercase">404</p>
        <h1 className="mt-3 text-4xl font-medium">This page is not in the facility.</h1>
        <a href="/id" className="mt-8 inline-flex bg-brand px-4 py-3 text-sm text-white">
          SooFresh
        </a>
      </div>
    </div>
  );
}
