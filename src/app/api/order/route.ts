import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";
import { formatOrderEmail, type OrderPayload } from "@/lib/order";

// ── Order intake endpoint ─────────────────────────────────────────────────
// Email delivery uses Resend IF the RESEND_API_KEY env var is set.
// Until that's configured, the order is still validated and logged, and the
// form falls back to opening the customer's email app (mailto). So orders are
// never lost — wiring up Resend just makes it automatic.
//
// To enable automatic emails:
//   1. Create a free account at resend.com and verify a sending domain.
//   2. Add to .env.local:  RESEND_API_KEY=re_xxxxxxxx
//   3. (Optional) ORDER_FROM_EMAIL="orders@yourdomain.com"

function isValid(body: Partial<OrderPayload>): body is OrderPayload {
  return Boolean(
    body.name?.trim() &&
      body.email?.trim() &&
      /\S+@\S+\.\S+/.test(body.email) &&
      body.season &&
      body.size &&
      body.delivery,
  );
}

export async function POST(req: Request) {
  let body: Partial<OrderPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, season, size, and delivery method." },
      { status: 422 },
    );
  }

  const emailBody = formatOrderEmail(body);

  // 1. Save the order to Sanity so Kami can manage it in the Studio. This is
  //    best-effort — if Sanity isn't configured yet, we just skip it.
  await saveOrderToSanity(body);

  // 2. Email Kami (if Resend is configured). Otherwise the client falls back
  //    to opening the customer's mail app.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[order] (no email provider configured)\n" + emailBody);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.ORDER_FROM_EMAIL || "Wreath Whimsy <onboarding@resend.dev>",
      to: site.email,
      replyTo: body.email,
      subject: `New wreath order from ${body.name}`,
      text: emailBody,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[order] email send failed:", err);
    // Still a success for the user — they'll get the mailto fallback.
    return NextResponse.json({ ok: true, delivered: false });
  }
}

async function saveOrderToSanity(body: OrderPayload) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
    return; // Sanity not set up yet — skip quietly.
  }
  try {
    const { writeClient } = await import("@/sanity/lib/client");
    await writeClient.create({
      _type: "order",
      status: "new",
      submittedAt: new Date().toISOString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      wreath: body.wreath,
      season: body.season,
      size: body.size,
      colors: body.colors,
      occasion: body.occasion,
      budget: body.budget,
      dueDate: body.dueDate,
      delivery: body.delivery,
      details: body.details,
    });
  } catch (err) {
    console.error("[order] failed to save to Sanity:", err);
  }
}
