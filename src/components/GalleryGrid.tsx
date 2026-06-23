"use client";

import { useState } from "react";
import { products, categories } from "@/data/products";
import { WreathCard } from "./WreathCard";

export function GalleryGrid() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  const chips = ["All", ...categories];

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
          {filtered.map((p) => (
            <WreathCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
