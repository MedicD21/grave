import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Order a Custom Wreath",
  description:
    "Request a one-of-a-kind handmade memorial wreath from Wreath Whimsy by Kami. Tell us about your loved one — their season, colors, and the headstone it's for.",
};

export default function OrderPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <p className="eyebrow text-base">A tribute, made by hand</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-ink">
          Order a memorial wreath
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-soft">
          Fill in as much as feels right — even a few details are plenty to
          start. Kami will reach out to gently finalize the design, timing, and
          price. There&apos;s no payment or commitment yet.
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
