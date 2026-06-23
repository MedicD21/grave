import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Allow search engines on the public site, but keep the Sanity Studio admin
// and the order API out of the index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
