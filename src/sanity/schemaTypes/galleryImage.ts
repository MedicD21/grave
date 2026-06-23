import { defineField, defineType } from "sanity";

// Standalone gallery photos — past work Kami wants to show off that isn't a
// purchasable product. Upload a photo, give it a caption, done.
export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery photo",
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
      name: "caption",
      title: "Caption",
      type: "string",
      description: "A short note about this piece (optional).",
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
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
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
    select: { title: "caption", subtitle: "category", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Gallery photo", subtitle, media };
    },
  },
});
