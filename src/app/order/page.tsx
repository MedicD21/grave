import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Order a Custom Wreath",
  description:
    "Request a one-of-a-kind handmade wreath from Wreath Whimsy by Kami. Tell us your season, colors, size, and occasion.",
};

export default function OrderPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <p className="eyebrow text-base">Let&apos;s make something</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-ink">
          Order a custom wreath
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-soft">
          Fill in as much as you know — even a vibe is plenty to start. Kami
          will reach out to finalize the design, timing, and price. There&apos;s
          no payment or commitment yet.
        </p>
      </div>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-line bg-cream p-9 text-center text-ink-soft">
              Loading the order form…
            </div>
          }
        >
          <OrderForm />
        </Suspense>
      </div>
    </section>
  );
}
