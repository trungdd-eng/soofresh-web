export function LeafMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M16 27c-6.2-4.4-10-9.2-10-14.2C6 7.6 10.2 4.2 16 4.2S26 7.6 26 12.8C26 17.8 22.2 22.6 16 27Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M16 27V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M16 16.5c-2.2-.6-3.8-1.8-4.8-3.2M16 20c2.4-.7 4.2-2 5.4-3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
