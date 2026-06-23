// Shared order types + helpers used by both the form and the API route.

export type OrderPayload = {
  name: string;
  email: string;
  phone?: string;
  wreath?: string;
  season: string;
  size: string;
  colors?: string;
  occasion?: string;
  budget?: string;
  dueDate?: string;
  delivery: string;
  details?: string;
};

export const seasons = [
  "Spring",
  "Summer",
  "Fall",
  "Winter",
  "Christmas",
  "Year-round",
  "Not sure yet",
];

export const sizes = [
  'Small (~16") — saddle / single marker',
  'Medium (~20") — standard headstone',
  'Large (~24") — upright monument',
  'Extra large (28"+)',
  "Help me choose",
];

export const deliveryOptions = [
  "Local pickup",
  "Local delivery",
  "Placement at the gravesite",
  "Shipping",
];

// Builds a clean, readable email body from an order — reused for the
// mailto: fallback so orders can reach Kami even before email infra is set up.
export function formatOrderEmail(o: OrderPayload): string {
  const lines = [
    "New memorial wreath request 🌿",
    "",
    `Name: ${o.name}`,
    `Email: ${o.email}`,
    o.phone ? `Phone: ${o.phone}` : null,
    "",
    o.wreath ? `Inspired by: ${o.wreath}` : null,
    `Season: ${o.season}`,
    `Size: ${o.size}`,
    o.colors ? `Colors / flowers: ${o.colors}` : null,
    o.occasion ? `In memory of: ${o.occasion}` : null,
    o.budget ? `Budget: ${o.budget}` : null,
    o.dueDate ? `Needed by: ${o.dueDate}` : null,
    `Delivery: ${o.delivery}`,
    "",
    o.details ? `Details:\n${o.details}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}
