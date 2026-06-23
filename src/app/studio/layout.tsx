import Link from "next/link";

// Bare full-screen wrapper for the Sanity Studio. No site header/footer — the
// studio owns the whole viewport so its internal scrolling works correctly.
// A small floating link sits in the bottom-left (clear of Sanity's own UI) to
// get back to the public site.
export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div style={{ height: "100dvh" }}>
      {children}
      <Link
        href="/"
        className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3.5 py-2 text-sm font-medium text-ink shadow-lg ring-1 ring-black/10 backdrop-blur transition-colors hover:bg-cream"
      >
        <span aria-hidden>←</span> Back to site
      </Link>
    </div>
  );
}
