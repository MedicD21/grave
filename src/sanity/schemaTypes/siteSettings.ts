import { defineField, defineType } from "sanity";

// Site-wide settings Kami controls from the Studio. Currently holds the
// announcement banner (e.g. "Booking Christmas wreaths through Dec 1").
// This is a singleton — there should only ever be one of these documents.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "bannerEnabled",
      title: "Show announcement banner?",
      type: "boolean",
      description:
        "Turn on to show a message bar across the top of every page.",
      initialValue: false,
    }),
    defineField({
      name: "bannerText",
      title: "Announcement message",
      type: "string",
      description:
        'e.g. "Now booking Christmas wreaths through Dec 1" or "Orders paused until Jan 5".',
      hidden: ({ parent }) => !parent?.bannerEnabled,
    }),
  ],
  preview: {
    select: { enabled: "bannerEnabled", text: "bannerText" },
    prepare({ enabled, text }) {
      return {
        title: "Site settings",
        subtitle: enabled
          ? `Banner ON — ${text || "(no message set)"}`
          : "Banner off",
      };
    },
  },
});
