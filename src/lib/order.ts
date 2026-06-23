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
  "Holiday / Christmas",
  "Year-round",
  "Not sure yet",
];

export const sizes = [
  'Small (~16")',
  'Medium (~20")',
  'Large (~24")',
  'Extra large (28"+)',
  "Help me choose",
];

export const deliveryOptions = ["Local pickup", "Local delivery", "Shipping"];

// Builds a clean, readable email body from an order — reused for the
// mailto: fallback so orders can reach Kami even before email infra is set up.
export function formatOrderEmail(o: OrderPayload): string {
  const lines = [
    "New custom wreath request 🌿",
    "",
    `Name: ${o.name}`,
    `Email: ${o.email}`,
    o.phone ? `Phone: ${o.phone}` : null,
    "",
    o.wreath ? `Inspired by: ${o.wreath}` : null,
    `Season: ${o.season}`,
    `Size: ${o.size}`,
    o.colors ? `Colors / theme: ${o.colors}` : null,
    o.occasion ? `Occasion: ${o.occasion}` : null,
    o.budget ? `Budget: ${o.budget}` : null,
    o.dueDate ? `Needed by: ${o.dueDate}` : null,
    `Delivery: ${o.delivery}`,
    "",
    o.details ? `Details:\n${o.details}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}
