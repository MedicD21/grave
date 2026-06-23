import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { getFeaturedDesigns, getTestimonials } from "@/sanity/lib/queries";
import { WreathCard } from "@/components/WreathCard";

// Re-fetch from Sanity at most once a minute so new wreaths appear without a
// redeploy (and the page still serves fast from cache).
export const revalidate = 60;

export default async function Home() {
  const [featuredDesigns, testimonials] = await Promise.all([
    getFeaturedDesigns(),
    getTestimonials(),
  ]);
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className='relative overflow-hidden'>
        {/* Decorative oversized wreath ring drifting behind the hero */}
        <div
          aria-hidden
          className='pointer-events-none absolute -right-32 -top-24 hidden h-[34rem] w-[34rem] rounded-full border-[3px] border-dashed border-sage/30 lg:block animate-spin-slow'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute -left-20 top-40 hidden h-72 w-72 rounded-full border-2 border-dotted border-rose/40 lg:block'
        />

        <div className='mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28'>
          <div>
            <p
              className='eyebrow animate-float-in text-base'
              style={{ animationDelay: "0.05s" }}
            >
              Handcrafted memorial wreaths
            </p>
            <h1
              className='animate-float-in mt-4 font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-7xl'
              style={{ animationDelay: "0.15s" }}
            >
              Keep their
              <br />
              memory{" "}
              <span className='relative whitespace-nowrap text-terracotta'>
                blooming
                <svg
                  aria-hidden
                  viewBox='0 0 200 12'
                  className='absolute -bottom-2 left-0 w-full text-rose'
                  preserveAspectRatio='none'
                >
                  <path
                    d='M2 9 C 50 2, 150 2, 198 8'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                </svg>
              </span>
            </h1>
            <p
              className='animate-float-in mt-7 max-w-md text-lg leading-relaxed text-ink-soft'
              style={{ animationDelay: "0.3s" }}
            >
              {site.description} Every piece is one of a kind — thoughtfully
              designed around the person you&apos;re remembering and the season
              ahead.
            </p>
            <div
              className='animate-float-in mt-9 flex flex-wrap gap-4'
              style={{ animationDelay: "0.45s" }}
            >
              <Link
                href='/order'
                className='rounded-full bg-terracotta px-7 py-3 font-medium text-cream shadow-md transition-all hover:bg-ink hover:shadow-lg'
              >
                Order a memorial wreath
              </Link>
              <Link
                href='/gallery'
                className='rounded-full border border-sage-deep px-7 py-3 font-medium text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream'
              >
                Browse the gallery
              </Link>
            </div>
          </div>

          {/* Hero ornament — the logo, swaying gently */}
          <div className='relative mx-auto grid h-80 w-80 place-items-center sm:h-96 sm:w-96'>
            <div className='absolute inset-0 rounded-full bg-linear-to-br from-rose/25 via-cream-deep to-sage/25' />
            <div className='animate-sway grid h-64 w-64 place-items-center overflow-hidden rounded-full bg-cream/60 shadow-sm sm:h-72 sm:w-72'>
              <Image
                src='/logo.png'
                alt='Wreath Whimsy by Kami'
                width={288}
                height={288}
                priority
                className='h-full w-full object-cover'
              />
            </div>
            <span className='eyebrow absolute -bottom-2 rounded-full bg-cream px-4 py-1 text-sm shadow-sm not-italic'>
              made by hand
            </span>
          </div>
        </div>
      </section>

      {/* ── Featured wreaths ─────────────────────────────────────────────── */}
      <section className='mx-auto max-w-6xl px-5 py-16'>
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div>
            <p className='eyebrow text-base'>A few favorites</p>
            <h2 className='mt-1 font-display text-4xl font-semibold text-ink'>
              Tributes made with care
            </h2>
          </div>
          <Link
            href='/gallery'
            className='text-sm font-medium text-sage-deep underline decoration-dotted underline-offset-4 hover:text-terracotta'
          >
            See the whole gallery →
          </Link>
        </div>

        <div className='mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3'>
          {featuredDesigns.map((d) => (
            <WreathCard key={d.id} design={d} />
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className='bg-cream-deep/50 py-20'>
        <div className='mx-auto max-w-6xl px-5'>
          <p className='eyebrow text-center text-base'>Gentle & personal</p>
          <h2 className='mt-1 text-center font-display text-4xl font-semibold text-ink'>
            How a memorial wreath comes to life
          </h2>

          <div className='mt-14 grid gap-8 md:grid-cols-3'>
            {[
              {
                n: "01",
                t: "Share their story",
                d: "Tell Kami about your loved one — their favorite colors, flowers, the season, and the feeling you'd like to capture. The order form makes it easy.",
              },
              {
                n: "02",
                t: "We design together",
                d: "Kami plans the wreath and confirms the details and quote with you — gently and without pressure.",
              },
              {
                n: "03",
                t: "Handcrafted with care",
                d: "Your one-of-a-kind tribute is built by hand, then ready for pickup, delivery, or placement at the resting place.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className='relative rounded-3xl border border-line bg-cream p-7 shadow-sm'
              >
                <span className='font-display text-5xl font-semibold text-rose/60'>
                  {step.n}
                </span>
                <h3 className='mt-3 font-display text-xl font-semibold text-ink'>
                  {step.t}
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-ink-soft'>
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className='bg-cream-deep/50 py-20'>
          <div className='mx-auto max-w-5xl px-5'>
            <p className='eyebrow text-center text-base'>Kind words</p>
            <h2 className='mt-1 text-center font-display text-4xl font-semibold text-ink'>
              From families we&apos;ve served
            </h2>
            <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {testimonials.map((t) => (
                <figure
                  key={t.id}
                  className='flex flex-col rounded-3xl border border-line bg-cream p-6 shadow-sm'
                >
                  <span aria-hidden className='font-display text-4xl text-terracotta/40'>
                    &ldquo;
                  </span>
                  <blockquote className='-mt-2 flex-1 leading-relaxed text-ink-soft'>
                    {t.quote}
                  </blockquote>
                  <figcaption className='mt-4 text-sm font-medium text-ink'>
                    {t.author}
                    {t.location && (
                      <span className='font-normal text-ink-soft'>
                        {" "}
                        · {t.location}
                      </span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── About / meet Kami ────────────────────────────────────────────── */}
      <section className='mx-auto max-w-5xl px-5 py-20'>
        <div className='grid items-center gap-10 rounded-[2.5rem] border border-line bg-linear-to-br from-cream to-cream-deep p-8 sm:p-12 md:grid-cols-[0.8fr_1.2fr]'>
          <div className='relative mx-auto grid h-56 w-56 place-items-center rounded-full border-4 border-dashed border-terracotta/40 bg-cream'>
            <span className='text-6xl'>🌿</span>
            <span className='eyebrow absolute -bottom-3 rounded-full bg-cream px-3 py-1 text-xs shadow-sm not-italic'>
              meet the maker
            </span>
          </div>
          <div>
            <h2 className='font-display text-3xl font-semibold text-ink'>
              Hi, I&apos;m Kami
            </h2>
            <p className='mt-4 leading-relaxed text-ink-soft'>
              What started as a love of flowers grew into {site.shortName} — a
              little studio where I handcraft memorial wreaths one stem at a
              time. I believe a resting place should feel cared for and full of
              beauty, and it&apos;s an honor to help you remember someone you
              love through every season.
            </p>
            <div className='mt-6 flex flex-wrap gap-4'>
              <Link
                href='/contact'
                className='rounded-full bg-sage-deep px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-ink'
              >
                Get in touch
              </Link>
              <a
                href={site.facebook}
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-full border border-line px-6 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-terracotta hover:text-terracotta'
              >
                Follow on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
