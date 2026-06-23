import Link from "next/link";
import { site, nav } from "@/data/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = 2024; // updated on the server build; year-agnostic copy below

  return (
    <footer className="mt-24 border-t border-line bg-cream-deep/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            {site.tagline}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-terracotta">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
            Say hello
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-terracotta"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
            Custom tributes
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Have someone special in mind? Tell Kami their favorite colors,
            flowers, and the season.
          </p>
          <Link
            href="/order"
            className="mt-4 inline-block rounded-full border border-sage-deep px-4 py-1.5 text-sm text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream"
          >
            Start your order →
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-ink-soft sm:flex-row">
          <p>
            © {year}–present {site.name}. Handmade with love.
          </p>
          <p className="eyebrow not-italic">In loving memory, one stem at a time.</p>
        </div>
      </div>
    </footer>
  );
}
