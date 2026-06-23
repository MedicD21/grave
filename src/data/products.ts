// ── Product / wreath catalog ──────────────────────────────────────────────
// To add a new wreath: copy one entry below, give it a unique `id`, drop the
// photo into /public/wreaths/, and point `image` at it. That's it — it will
// automatically appear in the gallery and the "featured" section on the home
// page if `featured: true`.
//
// `category` powers the gallery filter chips. Add new categories freely.
//
// These wreaths are made for gravestones and memorials, so categories are
// organized by season and occasion of remembrance.

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  // Path relative to /public, e.g. "/wreaths/spring-remembrance.jpg".
  // Falls back to a tasteful placeholder if the file is missing.
  image?: string;
  // Starting price in USD. Custom pieces are quoted, so this is a "from".
  priceFrom?: number;
  featured?: boolean;
};

export const categories = [
  "Spring",
  "Summer",
  "Fall",
  "Winter",
  "Christmas",
  "Everyday",
  "In Memoriam",
] as const;

export type ProductCategory = (typeof categories)[number];

export const products: Product[] = [
  {
    id: "spring-remembrance",
    name: "Spring Remembrance",
    category: "Spring",
    description:
      "Soft pastel blooms, tulips, and fresh greenery to bring gentle new life to a resting place as the seasons turn.",
    priceFrom: 65,
    featured: true,
  },
  {
    id: "summer-garden-tribute",
    name: "Summer Garden Tribute",
    category: "Summer",
    description:
      "Bright daisies, roses, and trailing ivy — a warm, sunlit tribute that holds up beautifully through the summer months.",
    priceFrom: 70,
    featured: true,
  },
  {
    id: "autumn-everlasting",
    name: "Autumn Everlasting",
    category: "Fall",
    description:
      "Burnished maples, wheat, and berry sprigs in rich harvest tones — a comforting touch of fall for a cherished memorial.",
    priceFrom: 72,
    featured: true,
  },
  {
    id: "winter-peace",
    name: "Winter Peace",
    category: "Winter",
    description:
      "Frosted pine, eucalyptus, and silver-brushed pinecones — a serene, snow-kissed wreath to keep watch through winter.",
    priceFrom: 75,
  },
  {
    id: "christmas-in-loving-memory",
    name: "Christmas in Loving Memory",
    category: "Christmas",
    description:
      "Lush evergreen, cranberry clusters, and a hand-tied bow, made to keep a loved one part of the holidays they cherished.",
    priceFrom: 85,
    featured: true,
  },
  {
    id: "everyday-grace",
    name: "Everyday Grace",
    category: "Everyday",
    description:
      "A soft, seasonless eucalyptus and white-bloom wreath — a quietly beautiful tribute that suits any time of year.",
    priceFrom: 55,
  },
  {
    id: "lavender-comfort",
    name: "Lavender Comfort",
    category: "Everyday",
    description:
      "Dried lavender and cotton stems for a calming, peaceful piece that lasts season after season.",
    priceFrom: 60,
  },
  {
    id: "forever-loved-personalized",
    name: "Forever Loved (Personalized)",
    category: "In Memoriam",
    description:
      "Designed around their favorite colors and flowers, with an optional name or ribbon — a one-of-a-kind keepsake of remembrance.",
    priceFrom: 80,
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);
