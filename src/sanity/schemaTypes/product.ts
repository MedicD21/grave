import { defineField, defineType } from "sanity";

// A wreath product. Kami fills this in from the Studio — name, photo, price,
// category — and it appears on the site automatically.
export const product = defineType({
  name: "product",
  title: "Wreath",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Wreath name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (web address)",
      type: "slug",
      description: "Used in links. Click 'Generate' from the name.",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      description: "A square photo looks best. Drag a file here to upload.",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Spring",
          "Summer",
          "Fall",
          "Winter",
          "Christmas",
          "Everyday",
          "In Memoriam",
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "priceFrom",
      title: "Starting price ($)",
      type: "number",
      description: "Shown as 'from $XX'. Leave blank to hide pricing.",
    }),
    defineField({
      name: "featured",
      title: "Feature on home page?",
      type: "boolean",
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
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
