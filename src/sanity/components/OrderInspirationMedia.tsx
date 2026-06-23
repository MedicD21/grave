import { useEffect, useState } from "react";
import { useClient } from "sanity";
import { urlForImage } from "../lib/image";

// Preview thumbnail for an order: looks up the gallery design whose title
// matches the order's "Inspired by" value and shows its photo, so Kami sees
// the referenced wreath at a glance in the Order requests list.
export function OrderInspirationMedia({ wreath }: { wreath?: string }) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const title = wreath?.trim();
    if (!title) return;
    let active = true;
    client
      .fetch<{ image?: unknown } | null>(
        `*[_type == "galleryImage" && title == $title && defined(image.asset._ref)][0]{ image }`,
        { title },
      )
      .then((doc) => {
        if (!active || !doc?.image) return;
        setUrl(
          urlForImage(doc.image).width(80).height(80).fit("crop").url(),
        );
      })
      .catch(() => {
        /* best-effort thumbnail; falls back to the default icon */
      });
    return () => {
      active = false;
    };
  }, [client, wreath]);

  if (!url) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
