import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { BrandLockup } from "@/components/brand-mark";
import { StoryIntro } from "@/components/story-intro";
import { InTheBox } from "@/components/box-carousel";
import { FounderPhoto } from "@/components/founder-photo";
import { Control, Explain, ForWhom } from "@/components/story-sections";
import { CTA_LABEL, WaitlistCard, WHATSAPP_GROUP } from "@/components/ui";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <StoryIntro />
        <Explain />
        <Control />
        <ForWhom />
        <InTheBox />
        <FounderPhoto />
        <section id="fila" className="bg-background px-6 pt-4 pb-28 md:px-12 md:pt-8 md:pb-24">
          <div className="mx-auto max-w-xl">
            <WaitlistCard />
          </div>
        </section>
      </main>
      <footer className="border-t border-line bg-background px-6 py-10 pb-28 md:px-12 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <BrandLockup className="opacity-90" />
          <p className="text-sm text-paper/50">© 2026 SÓC.IA</p>
        </div>
      </footer>
      <a
        href={WHATSAPP_GROUP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-4 bottom-4 z-40 flex min-h-12 items-center justify-center rounded-[var(--radius-btn)] bg-accent px-4 py-3 text-center text-sm font-medium text-accent-fg md:hidden"
      >
        {CTA_LABEL}
      </a>
    </>
  );
}
