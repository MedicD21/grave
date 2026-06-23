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
  // Responsive variants for <img srcset> so phones don't fetch the full image.
  srcSet?: string;
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

// Build an optimized square Sanity image URL at a given width.
function squareImageUrl(image: SanityDesign["image"], size: number) {
  return urlForImage(image!)
    .width(size)
    .height(size)
    .fit("crop")
    .auto("format") // serve WebP/AVIF to browsers that support it
    .quality(75)
    .url();
}

function toDesign(d: SanityDesign): GalleryPhoto {
  const hasImage = Boolean(d.image?.asset?._ref);
  return {
    id: d._id,
    url: hasImage ? squareImageUrl(d.image, 800) : undefined,
    srcSet: hasImage
      ? [400, 600, 800]
          .map((w) => `${squareImageUrl(d.image, w)} ${w}w`)
          .join(", ")
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
  } catch (err) {
    // Sanity is configured but the fetch failed (bad token, network, malformed
    // query). Log it so a real misconfiguration isn't silently masked by the
    // static fallback.
    console.error("[gallery] Sanity fetch failed, using fallback data:", err);
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

// ── Testimonials ───────────────────────────────────────────────────────────
export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location?: string;
};

const TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && featured == true] | order(order asc){
  _id, quote, author, location
}`;

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!sanityConfigured) return [];
  try {
    const data = await client.fetch<
      { _id: string; quote: string; author: string; location?: string }[]
    >(TESTIMONIALS_QUERY);
    return data.map((t) => ({
      id: t._id,
      quote: t.quote,
      author: t.author,
      location: t.location,
    }));
  } catch (err) {
    console.error("[testimonials] Sanity fetch failed:", err);
    return [];
  }
}

// ── Site settings (announcement banner) ────────────────────────────────────
export type SiteSettings = {
  bannerEnabled: boolean;
  bannerText?: string;
};

const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  bannerEnabled, bannerText
}`;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured) return { bannerEnabled: false };
  try {
    const data = await client.fetch<SiteSettings | null>(SETTINGS_QUERY);
    return data ?? { bannerEnabled: false };
  } catch (err) {
    console.error("[settings] Sanity fetch failed:", err);
    return { bannerEnabled: false };
  }
}
