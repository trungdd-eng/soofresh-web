export function LeafMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M16 5.5c4.2 5.2 8.5 8 11.5 8.8C23.2 15.6 19.6 19 17.2 24 15.2 18.6 11.4 15.2 6.2 14.2 10.4 13 13.6 9.6 16 5.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path d="M16 14.2v12.3M12.2 26.8h7.6" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}
