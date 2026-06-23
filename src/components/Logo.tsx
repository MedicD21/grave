import Link from "next/link";
import { site } from "@/data/site";

/**
 * LOGO PLACEHOLDER
 * ----------------
 * Kami: when your official logo is ready, drop the image file into
 * /public (e.g. /public/logo.png) and replace the <span className="wreath-mark">
 * block below with:
 *
 *   <img src="/logo.png" alt="Wreath Whimsy by Kami" className="h-12 w-auto" />
 *
 * Everything else (link wrapper, sizing) can stay the same.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      {/* Decorative wreath mark — stand-in until the real logo arrives */}
      <span
        aria-hidden
        className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-dashed border-sage text-sage transition-transform duration-500 group-hover:rotate-180"
      >
        <span className="text-lg">❀</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            {site.shortName}
          </span>
          <span className="eyebrow text-[0.7rem]">by Kami</span>
        </span>
      )}
    </Link>
  );
}
