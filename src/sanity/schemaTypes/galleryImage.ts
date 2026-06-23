import { defineField, defineType } from "sanity";
import { categories } from "@/data/products";

// A wreath / gallery design — every piece Kami shows off lives here, whether
// it's a past creation or a design someone can order. Upload a photo, name it,
// optionally mark it orderable with a starting price, and optionally feature it
// on the home page.
export const galleryImage = defineType({
  name: "galleryImage",
  title: "Wreath / Gallery design",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'Name of this design (e.g. "Easter Bunnies Set"). Shown on the card and pre-fills the "Inspired by" field on the order form.',
    }),
    defineField({
      name: "caption",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A short note about this piece (optional).",
    }),
    defineField({
      name: "orderable",
      title: "Available to order?",
      type: "boolean",
      description:
        'When on, this design shows a "from $" price and an "Order this" link that starts a custom order inspired by it.',
      initialValue: false,
    }),
    defineField({
      name: "priceFrom",
      title: "Starting price ($)",
      type: "number",
      description:
        'The "from" price shown on the card. Final pricing is confirmed with the customer — customizations may add to this.',
      validation: (r) => r.min(0),
      hidden: ({ parent }) => !parent?.orderable,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Pick an existing category or type a brand-new one — new categories are added automatically and will show up as a gallery filter.",
      // Suggestions only — not strict, so Kami can also type a new category.
      options: {
        list: [...categories],
      },
    }),
    defineField({
      name: "featured",
      title: "Feature on home page?",
      type: "boolean",
      description:
        "When on, this design also appears in the highlights section on the home page.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers show first. Optional.",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      caption: "caption",
      subtitle: "category",
      media: "image",
    },
    prepare({ title, caption, subtitle, media }) {
      return { title: title || caption || "Gallery photo", subtitle, media };
    },
  },
});
