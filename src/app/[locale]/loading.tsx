import { LeafMark } from "@/components/leaf-mark";

export default function Loading() {
  return (
    <div className="grid min-h-[70svh] place-items-center pt-20">
      <div className="text-center">
        <LeafMark className="mx-auto h-10 w-10" />
        <p className="mt-4 text-sm tracking-[0.2em] uppercase">SooFresh</p>
      </div>
    </div>
  );
}
