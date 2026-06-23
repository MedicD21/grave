import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

// Refresh the announcement banner from Sanity at most once a minute.
export const revalidate = 60;

// Layout for the public marketing site — header + footer chrome around every
// page. The Sanity Studio at /studio lives outside this group so it can run
// full-screen without the site header/footer.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
