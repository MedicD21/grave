"use client";

// ── Sanity Studio configuration ───────────────────────────────────────────
// This powers the visual admin at /studio where Kami manages wreaths,
// gallery photos, and order requests.

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  title: "Wreath Whimsy Studio",
  plugins: [
    // Custom structure: friendly grouping for a non-technical user.
    structureTool({
      structure: (S) =>
        S.list()
          .title("Wreath Whimsy")
          .items([
            S.listItem()
              .title("🌿 Wreaths & gallery designs")
              .child(
                S.documentTypeList("galleryImage").title(
                  "Wreaths & gallery designs",
                ),
              ),
            S.listItem()
              .title("✉️ Order requests")
              .child(
                S.documentTypeList("order")
                  .title("Order requests")
                  .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
              ),
          ]),
    }),
    // Vision lets you test queries — handy for developers, harmless for Kami.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
