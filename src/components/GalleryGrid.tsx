"use client";

import { useState } from "react";
import { categories, type Product } from "@/data/products";
import type { GalleryPhoto } from "@/sanity/lib/queries";
import { WreathCard } from "./WreathCard";

export function GalleryGrid({
  products,
  photos = [],
}: {
  products: Product[];
  photos?: GalleryPhoto[];
}) {
  const [active, setActive] = useState<string>("All");

  const filteredProducts =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  const filteredPhotos =
    active === "All" ? photos : photos.filter((p) => p.category === active);

  const chips = ["All", ...categories];
  const isEmpty = filteredProducts.length === 0 && filteredPhotos.length === 0;

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

      {isEmpty ? (
        <p className="mt-16 text-center text-ink-soft">
          No wreaths in this category yet — check back soon. 🌿
        </p>
      ) : (
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => (
            <WreathCard key={p.id} product={p} />
          ))}

          {/* Gallery-only photos (no price / order link) */}
          {filteredPhotos.map((photo) => (
            <figure
              key={photo.id}
              className="group overflow-hidden rounded-3xl border border-line bg-cream shadow-sm"
            >
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || "Wreath by Kami"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {photo.caption && (
                <figcaption className="p-5 text-sm leading-relaxed text-ink-soft">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
