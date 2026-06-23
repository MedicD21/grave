import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Read-only client for fetching content on the public site.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast, cached reads for the public site
});

// Write client for server-side actions (creating order documents).
// Uses a secret token — never imported into client components.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
