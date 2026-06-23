"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/data/site";
import {
  seasons,
  sizes,
  deliveryOptions,
  formatOrderEmail,
  type OrderPayload,
} from "@/lib/order";

type Status = "idle" | "sending" | "done" | "error";

const fieldClass =
  "w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-ink outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/30 placeholder:text-ink-soft/50";
const labelClass = "block text-sm font-medium text-ink mb-1.5";

export function OrderForm() {
  const params = useSearchParams();
  const presetWreath = params.get("wreath") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries(),
    ) as unknown as OrderPayload;

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "Something went wrong. Please try again.");
        return;
      }

      // If the server couldn't auto-email yet, open the customer's mail app so
      // the order still reaches Kami immediately.
      if (json.delivered === false) {
        const subject = encodeURIComponent(`Wreath order from ${data.name}`);
        const bodyText = encodeURIComponent(formatOrderEmail(data));
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${bodyText}`;
      }

      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network hiccup — please try again or email Kami directly.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-sage/50 bg-cream-deep/40 p-10 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-deep text-3xl text-cream">
          ✓
        </div>
        <h2 className="mt-5 font-display text-3xl font-semibold text-ink">
          Your request is on its way
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Thank you for trusting Kami with something so meaningful. She&apos;ll
          be in touch within {site.responseTime} to talk gently through the
          details and pricing. 🌿
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-sage-deep px-6 py-2.5 text-sm font-medium text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream"
        >
          Submit another order
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-cream p-6 shadow-sm sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name <span className="text-terracotta">*</span>
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="text-terracotta">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone <span className="text-ink-soft/60">(optional)</span>
          </label>
          <input id="phone" name="phone" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="wreath">
            Inspired by a design?
          </label>
          <input
            id="wreath"
            name="wreath"
            defaultValue={presetWreath}
            placeholder="e.g. Harvest Amber"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="season">
            Season / theme <span className="text-terracotta">*</span>
          </label>
          <select id="season" name="season" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Choose one…
            </option>
            {seasons.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="size">
            Size <span className="text-terracotta">*</span>
          </label>
          <select id="size" name="size" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Choose one…
            </option>
            {sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="colors">
            Their favorite colors or flowers
          </label>
          <input
            id="colors"
            name="colors"
            placeholder="e.g. roses, sage & blush, sunflowers"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="occasion">
            In memory of
          </label>
          <input
            id="occasion"
            name="occasion"
            placeholder="e.g. a name, or 'my mother'"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="budget">
            Budget range
          </label>
          <input
            id="budget"
            name="budget"
            placeholder="e.g. $60–80"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="dueDate">
            Needed by
          </label>
          <input id="dueDate" name="dueDate" type="date" className={fieldClass} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="delivery">
            Delivery method <span className="text-terracotta">*</span>
          </label>
          <select
            id="delivery"
            name="delivery"
            required
            className={fieldClass}
            defaultValue=""
          >
            <option value="" disabled>
              Choose one…
            </option>
            {deliveryOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="details">
            Tell Kami more
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            placeholder="Anything you'd like Kami to know — a photo you'll send over, a special flower they loved, or what this tribute means to you…"
            className={`${fieldClass} resize-y`}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {message}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-terracotta px-8 py-3 font-medium text-cream shadow-md transition-all hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send my request"}
        </button>
        <p className="text-sm text-ink-soft">
          No payment now — Kami confirms details &amp; pricing first.
        </p>
      </div>
    </form>
  );
}
