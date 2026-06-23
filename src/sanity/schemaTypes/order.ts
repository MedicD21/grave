import { defineField, defineType } from "sanity";

// Custom order requests submitted through the website's order form.
// These are created automatically by the /api/order route — Kami doesn't fill
// them in; she reviews them here and updates the status as she works.
export const order = defineType({
  name: "order",
  title: "Order request",
  type: "document",
  // Orders are read/managed, not hand-authored, so keep fields tidy & readOnly
  // where it makes sense.
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "🆕 New", value: "new" },
          { title: "💬 In touch", value: "contacted" },
          { title: "🧺 In progress", value: "in_progress" },
          { title: "✅ Completed", value: "completed" },
          { title: "🗂️ Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({ name: "name", title: "Customer name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({ name: "wreath", title: "Inspired by", type: "string", readOnly: true }),
    defineField({ name: "season", title: "Season / theme", type: "string", readOnly: true }),
    defineField({ name: "size", title: "Size", type: "string", readOnly: true }),
    defineField({ name: "colors", title: "Colors / flowers", type: "string", readOnly: true }),
    defineField({ name: "occasion", title: "In memory of", type: "string", readOnly: true }),
    defineField({ name: "budget", title: "Budget", type: "string", readOnly: true }),
    defineField({ name: "dueDate", title: "Needed by", type: "string", readOnly: true }),
    defineField({ name: "delivery", title: "Delivery method", type: "string", readOnly: true }),
    defineField({ name: "details", title: "Details", type: "text", rows: 4, readOnly: true }),
    defineField({
      name: "notes",
      title: "Private notes",
      type: "text",
      rows: 3,
      description: "Your own working notes — not visible to the customer.",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { name: "name", season: "season", status: "status", date: "submittedAt" },
    prepare({ name, season, status, date }) {
      const when = date ? new Date(date).toLocaleDateString() : "";
      const badge =
        status === "new"
          ? "🆕"
          : status === "completed"
            ? "✅"
            : status === "archived"
              ? "🗂️"
              : "💬";
      return {
        title: `${badge} ${name || "Order"}`,
        subtitle: [season, when].filter(Boolean).join(" · "),
      };
    },
  },
});
