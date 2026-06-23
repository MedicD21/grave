"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/data/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[0.95rem] transition-colors hover:text-terracotta ${
                  active ? "text-terracotta" : "text-ink-soft"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-terracotta" />
                )}
              </Link>
            );
          })}
          <Link
            href="/order"
            className="rounded-full bg-sage-deep px-5 py-2 text-sm font-medium text-cream shadow-sm transition-all hover:bg-ink hover:shadow-md"
          >
            Order a Wreath
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 pb-4 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-ink-soft hover:bg-cream-deep hover:text-terracotta"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
