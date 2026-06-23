import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email ${site.email} or message us on Facebook.`,
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <div className="text-center">
        <p className="eyebrow text-base">Say hello</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-ink">
          We&apos;re here to help
        </h1>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink-soft">
          Questions, a special request, or simply not sure where to start? Kami
          would be honored to help you remember someone you love. Expect a warm
          reply within {site.responseTime}.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <a
          href={`mailto:${site.email}`}
          className="group rounded-3xl border border-line bg-cream p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="grid h-14 w-14 place-items-center rounded-full bg-rose/20 text-2xl">
            ✉️
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">
            Email
          </h2>
          <p className="mt-1 text-ink-soft">Best for memorial wreath details.</p>
          <p className="mt-3 font-medium text-terracotta group-hover:underline">
            {site.email}
          </p>
        </a>

        <a
          href={site.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-3xl border border-line bg-cream p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="grid h-14 w-14 place-items-center rounded-full bg-sage/20 text-2xl">
            👍
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">
            Facebook
          </h2>
          <p className="mt-1 text-ink-soft">
            See the latest pieces and message Kami directly.
          </p>
          <p className="mt-3 font-medium text-terracotta group-hover:underline">
            Visit the page →
          </p>
        </a>
      </div>

      <div className="mt-10 rounded-3xl border border-dashed border-sage/50 bg-cream-deep/40 p-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Ready to begin a tribute?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          The order form walks you through everything Kami needs, at your own
          pace.
        </p>
        <Link
          href="/order"
          className="mt-6 inline-block rounded-full bg-terracotta px-7 py-3 font-medium text-cream shadow-md transition-colors hover:bg-ink"
        >
          Order a custom wreath
        </Link>
      </div>
    </section>
  );
}
