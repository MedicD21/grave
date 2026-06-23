import type { MetadataRoute } from "next";
import { site, nav } from "@/data/site";

// Lists the public pages for search engines. Driven by the nav config, so new
// top-level pages added there are included automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: item.href === "/gallery" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
