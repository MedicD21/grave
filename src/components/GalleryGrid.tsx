"use client";

import { useState } from "react";
import { categories } from "@/data/products";
import type { GalleryPhoto } from "@/sanity/lib/queries";
import { WreathCard } from "./WreathCard";

export function GalleryGrid({ designs = [] }: { designs?: GalleryPhoto[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? designs
      : designs.filter((d) => d.category === active);

  // Known categories first (in their defined order), then any custom ones Kami
  // has typed on a design that aren't in the standard list — so new categories
  // show up as filter chips automatically.
  const usedCategories = designs
    .map((d) => d.category)
    .filter((c): c is string => Boolean(c));
  const customCategories = [...new Set(usedCategories)].filter(
    (c) => !categories.includes(c as (typeof categories)[number]),
  );
  const chips = ["All", ...categories, ...customCategories];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2.5">
        {chips.map((c) => {
          const on = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                on
                  ? "border-terracotta bg-terracotta text-cream shadow-sm"
                  : "border-line bg-cream text-ink-soft hover:border-sage hover:text-sage-deep"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink-soft">
          No wreaths in this category yet — check back soon. 🌿
        </p>
      ) : (
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <WreathCard key={d.id} design={d} />
          ))}
        </div>
      )}

      {/* Pricing disclaimer — shown whenever any orderable, priced item is visible */}
      {filtered.some((d) => d.orderable && d.priceFrom != null) && (
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-ink-soft/80">
          Prices marked &ldquo;from&rdquo; are starting estimates for a standard
          version of a design. Because every wreath is handmade to order,
          customizations, size changes, premium materials, and seasonal
          availability may affect the final price. Any such adjustments will be
          discussed and confirmed with you before your order is finalized. No
          payment is due until pricing is agreed upon.
        </p>
      )}
    </>
  );
}
