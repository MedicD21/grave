import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "@/components/GalleryGrid";
import { getProducts, getGalleryPhotos } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse handcrafted memorial and gravestone wreaths by Wreath Whimsy by Kami — spring, summer, fall, winter, Christmas, and everyday tributes.",
};

// Refresh gallery content from Sanity at most once a minute.
export const revalidate = 60;

export default async function GalleryPage() {
  const [products, photos] = await Promise.all([
    getProducts(),
    getGalleryPhotos(),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-base">A little look book</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-ink">
          The Memorial Wreath Gallery
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          A growing collection of past tributes and seasonal designs. See one
          that feels right? It can be recreated or reimagined in honor of your
          loved one.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        <GalleryGrid products={products} photos={photos} />
      </div>

      <div className="mt-20 rounded-3xl border border-dashed border-sage/50 bg-cream-deep/40 p-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Looking for something more personal?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          Nearly every wreath is made to order. Tell Kami about your loved one,
          and she&apos;ll create a tribute just for them.
        </p>
        <Link
          href="/order"
          className="mt-6 inline-block rounded-full bg-terracotta px-7 py-3 font-medium text-cream shadow-md transition-colors hover:bg-ink"
        >
          Start a custom order
        </Link>
      </div>
    </section>
  );
}
