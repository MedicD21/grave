"use client";

import { useRouter } from "next/navigation";

// Secret studio entrance. Rendered as an unobtrusive character in the footer;
// clicking it prompts for a password before sending Kami to /studio.
//
// NOTE: this is obscurity, not security — the password lives in the client
// bundle and is easily found by anyone who looks. The real lock is Sanity's
// own login on the studio itself. The default password is "kami".
const STUDIO_PASSWORD = "kami";

export function StudioLink() {
  const router = useRouter();

  function handleClick() {
    const entry = window.prompt("Password");
    if (entry == null) return; // cancelled
    if (entry.trim().toLowerCase() === STUDIO_PASSWORD) {
      router.push("/studio");
    } else {
      window.alert("Incorrect password.");
    }
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label='Studio access'
      title=''
      className='cursor-default text-ink-soft transition-colors hover:text-terracotta'
    >
      Love
    </button>
  );
}
