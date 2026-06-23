import { defineField, defineType } from "sanity";

// A short quote from a happy customer, shown on the home page. Kami adds these
// in the Studio — no code needed.
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "What they said",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Their name",
      type: "string",
      description: "First name and last initial is plenty, e.g. “Sarah M.”",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Optional — e.g. a town or “a longtime customer”.",
    }),
    defineField({
      name: "featured",
      title: "Show on home page?",
      type: "boolean",
      description: "Turn on the ones you'd like shown on the home page.",
      initialValue: true,
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
    select: { title: "author", subtitle: "quote" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Testimonial",
        subtitle: subtitle
          ? `“${subtitle.slice(0, 60)}${subtitle.length > 60 ? "…" : ""}”`
          : "",
      };
    },
  },
});
