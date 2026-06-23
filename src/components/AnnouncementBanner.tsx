import { getSiteSettings } from "@/sanity/lib/queries";

// Site-wide announcement bar. Kami toggles it on/off and sets the message in
// the Studio under "Site settings". Renders nothing when disabled or empty.
export async function AnnouncementBanner() {
  const settings = await getSiteSettings();
  if (!settings.bannerEnabled || !settings.bannerText?.trim()) return null;

  return (
    <div className="bg-sage-deep px-4 py-2 text-center text-sm font-medium text-cream">
      {settings.bannerText}
    </div>
  );
}
