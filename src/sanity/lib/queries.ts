import { groq } from "next-sanity";
import { client } from "./client";
import { urlForImage } from "./image";
import type { Product } from "@/data/products";
import { products as fallbackProducts } from "@/data/products";

// ── Data access ───────────────────────────────────────────────────────────
// The public site reads wreaths from Sanity. If Sanity isn't configured yet
// (no project id), we gracefully fall back to the static products.ts list so
// the site never breaks during setup.

const sanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

type SanityProduct = {
  _id: string;
  name: string;
  slug?: string;
  image?: { asset?: { _ref?: string } };
  category: Product["category"];
  description: string;
  priceFrom?: number;
  featured?: boolean;
};

const PRODUCTS_QUERY = groq`*[_type == "product"] | order(order asc, name asc){
  _id, name, "slug": slug.current, image, category, description, priceFrom, featured
}`;

function toProduct(p: SanityProduct): Product {
  return {
    id: p.slug || p._id,
    name: p.name,
    category: p.category,
    description: p.description,
    priceFrom: p.priceFrom,
    featured: p.featured,
    image: p.image?.asset?._ref
      ? urlForImage(p.image).width(800).height(800).fit("crop").url()
      : undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!sanityConfigured) return fallbackProducts;
  try {
    const data = await client.fetch<SanityProduct[]>(PRODUCTS_QUERY);
    return data.length ? data.map(toProduct) : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  // If nothing is flagged featured yet, show the first few so the home page
  // never looks empty.
  return featured.length ? featured : all.slice(0, 3);
}

// ── Gallery photos ────────────────────────────────────────────────────────
export type GalleryPhoto = {
  id: string;
  url: string;
  caption?: string;
  category?: string;
};

const GALLERY_QUERY = groq`*[_type == "galleryImage"] | order(order asc){
  _id, image, caption, category
}`;

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!sanityConfigured) return [];
  try {
    const data = await client.fetch<
      { _id: string; image: { asset?: { _ref?: string } }; caption?: string; category?: string }[]
    >(GALLERY_QUERY);
    return data
      .filter((d) => d.image?.asset?._ref)
      .map((d) => ({
        id: d._id,
        url: urlForImage(d.image).width(800).height(800).fit("crop").url(),
        caption: d.caption,
        category: d.category,
      }));
  } catch {
    return [];
  }
}
