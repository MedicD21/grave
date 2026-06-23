import { groq } from "next-sanity";
import { client } from "./client";
import { urlForImage } from "./image";
import { products as fallbackProducts } from "@/data/products";

// ── Data access ───────────────────────────────────────────────────────────
// The public site reads every wreath / gallery design from a single Sanity
// type (galleryImage). If Sanity isn't configured yet (no project id), we
// gracefully fall back to the static products.ts list so the site never breaks
// during setup.

const sanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

// A wreath / gallery design, as the site renders it.
export type GalleryPhoto = {
  id: string;
  url?: string;
  title?: string;
  caption?: string;
  category?: string;
  orderable?: boolean;
  priceFrom?: number;
  featured?: boolean;
};

// Static fallback, mapped from the legacy products.ts list into the unified
// shape so empty/unconfigured states still look intentional.
const fallbackDesigns: GalleryPhoto[] = fallbackProducts.map((p) => ({
  id: p.id,
  url: p.image,
  title: p.name,
  caption: p.description,
  category: p.category,
  orderable: true,
  priceFrom: p.priceFrom,
  featured: p.featured,
}));

const GALLERY_QUERY = groq`*[_type == "galleryImage"] | order(order asc){
  _id, image, title, caption, category, orderable, priceFrom, featured
}`;

type SanityDesign = {
  _id: string;
  image?: { asset?: { _ref?: string } };
  title?: string;
  caption?: string;
  category?: string;
  orderable?: boolean;
  priceFrom?: number;
  featured?: boolean;
};

function toDesign(d: SanityDesign): GalleryPhoto {
  return {
    id: d._id,
    url: d.image?.asset?._ref
      ? urlForImage(d.image).width(800).height(800).fit("crop").url()
      : undefined,
    title: d.title,
    caption: d.caption,
    category: d.category,
    orderable: d.orderable,
    priceFrom: d.priceFrom,
    featured: d.featured,
  };
}

// Every design, in sort order. Used by the gallery.
export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!sanityConfigured) return fallbackDesigns;
  try {
    const data = await client.fetch<SanityDesign[]>(GALLERY_QUERY);
    return data.length ? data.map(toDesign) : fallbackDesigns;
  } catch {
    return fallbackDesigns;
  }
}

// The subset flagged to feature on the home page. Falls back to the first few
// so the home page never looks empty.
export async function getFeaturedDesigns(): Promise<GalleryPhoto[]> {
  const all = await getGalleryPhotos();
  const featured = all.filter((d) => d.featured);
  return featured.length ? featured : all.slice(0, 3);
}
