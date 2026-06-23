import Link from "next/link";
import type { GalleryPhoto } from "@/sanity/lib/queries";

// Deterministic soft gradient per category so placeholder cards still feel
// intentional and varied before real photos are added.
const categoryTint: Record<string, string> = {
  Spring: "from-rose/30 to-sage/20",
  Summer: "from-gold/30 to-terracotta/20",
  Fall: "from-terracotta/30 to-gold/25",
  Winter: "from-sage/25 to-cream-deep",
  Christmas: "from-terracotta/30 to-sage-deep/25",
  Everyday: "from-sage/25 to-rose/20",
  "In Memoriam": "from-rose/30 to-gold/20",
};

// One card for every wreath / gallery design. Shows the photo (or a tasteful
// placeholder), a heading, description, and — when the design is orderable —
// a "from $" price and an "Order this" link that starts a custom order.
export function WreathCard({ design }: { design: GalleryPhoto }) {
  const tint = categoryTint[design.category ?? ""] ?? "from-sage/20 to-rose/20";
  const heading = design.title || design.caption;
  const inspiredBy = design.title || design.caption;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        {design.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={design.url}
            srcSet={design.srcSet}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            alt={heading || "Wreath by Kami"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // Placeholder until a real photo is added
          <div
            className={`flex h-full w-full items-center justify-center bg-linear-to-br ${tint}`}
          >
            <span
              aria-hidden
              className="text-6xl text-ink/30 transition-transform duration-700 group-hover:rotate-45"
            >
              ❀
            </span>
          </div>
        )}
        {design.category && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-sage-deep backdrop-blur">
            {design.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {heading && (
          <h3 className="font-display text-lg font-semibold text-ink">
            {heading}
          </h3>
        )}
        {design.title && design.caption && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
            {design.caption}
          </p>
        )}
        {design.orderable && (
          <div className="mt-4 flex items-center justify-between">
            {design.priceFrom != null && (
              <span className="text-sm text-ink-soft">
                from{" "}
                <span className="font-display text-base text-terracotta">
                  ${design.priceFrom}
                </span>
              </span>
            )}
            <Link
              href={{
                pathname: "/order",
                query: inspiredBy ? { wreath: inspiredBy } : undefined,
              }}
              className="text-sm font-medium text-sage-deep underline decoration-dotted underline-offset-4 hover:text-terracotta"
            >
              Order this →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
