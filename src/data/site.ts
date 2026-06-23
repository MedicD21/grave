// ── Central site configuration ────────────────────────────────────────────
// Edit this file to update contact info, social links, and global copy.
// Keeping everything here means non-developers can update most of the site
// without touching component code.

export const site = {
  name: "Wreath Whimsy by Kami",
  shortName: "Wreath Whimsy",
  tagline:
    "Handcrafted memorial wreaths, made to honor the ones we hold close.",
  description:
    "Custom, handmade gravestone and memorial wreaths — thoughtfully created one stem at a time by Kami to keep a loved one's memory beautiful through every season.",
  // Canonical production URL (no trailing slash). Update when a custom domain
  // is added. Used for SEO metadata, the sitemap, and social-share previews.
  url: "https://wreathwhimsy.vercel.app",
  email: "wreath.whimsy2024@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61571279514211",
  // Set to a real Instagram/TikTok later, or leave empty to hide.
  instagram: "",
  // Used in the contact + order confirmation copy.
  responseTime: "1–2 days",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Order Custom", href: "/order" },
  { label: "Contact", href: "/contact" },
] as const;
