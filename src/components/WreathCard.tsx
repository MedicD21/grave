import Link from "next/link";
import type { Product } from "@/data/products";

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

export function WreathCard({ product }: { product: Product }) {
  const tint = categoryTint[product.category] ?? "from-sage/20 to-rose/20";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // Placeholder until a real photo is dropped into /public/wreaths
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${tint}`}
          >
            <span
              aria-hidden
              className="text-6xl text-ink/30 transition-transform duration-700 group-hover:rotate-45"
            >
              ❀
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-sage-deep backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          {product.priceFrom != null && (
            <span className="text-sm text-ink-soft">
              from{" "}
              <span className="font-display text-base text-terracotta">
                ${product.priceFrom}
              </span>
            </span>
          )}
          <Link
            href={{ pathname: "/order", query: { wreath: product.name } }}
            className="text-sm font-medium text-sage-deep underline decoration-dotted underline-offset-4 hover:text-terracotta"
          >
            Order this →
          </Link>
        </div>
      </div>
    </article>
  );
}
