import { createElement } from "react";
import { defineField, defineType } from "sanity";
import {
  Zap,
  MessageCircle,
  Tool,
  CheckCircle,
  Archive,
} from "@deemlol/next-icons";

// Colored status icon shown as the order's thumbnail in the list, so Kami can
// scan order states at a glance.
const STATUS_ICON: Record<string, { icon: typeof Zap; color: string }> = {
  new: { icon: Zap, color: "#FFC000" },
  contacted: { icon: MessageCircle, color: "#3b82f6" },
  in_progress: { icon: Tool, color: "#ec4899" },
  completed: { icon: CheckCircle, color: "#bffb4f" },
  archived: { icon: Archive, color: "#ef4444" },
};

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
          { title: "New Order", value: "new" },
          { title: "In touch", value: "contacted" },
          { title: "In progress", value: "in_progress" },
          { title: "Completed", value: "completed" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "paymentCollected",
      title: "Payment collected?",
      type: "boolean",
      description:
        "Turn on once payment has been received — tracked separately from the order's status.",
      initialValue: false,
    }),
    defineField({
      name: "name",
      title: "Customer name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "wreath",
      title: "Inspired by",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "season",
      title: "Season / theme",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "colors",
      title: "Colors / flowers",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "occasion",
      title: "In memory of",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "budget",
      title: "Budget",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "dueDate",
      title: "Needed by",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "delivery",
      title: "Delivery method",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "text",
      rows: 4,
      readOnly: true,
    }),
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
    select: {
      name: "name",
      season: "season",
      status: "status",
      date: "submittedAt",
      paid: "paymentCollected",
    },
    prepare({ name, season, status, date, paid }) {
      const when = date ? new Date(date).toLocaleDateString() : "";
      const entry = STATUS_ICON[status as string] ?? STATUS_ICON.new;
      return {
        title: `${name || "Order"}${paid ? " · paid" : ""}`,
        subtitle: [season, when].filter(Boolean).join(" · "),
        // Colored status icon as the list thumbnail for at-a-glance sorting.
        media: createElement(entry.icon, {
          color: entry.color,
          strokeWidth: 1.5,
        }),
      };
    },
  },
});
