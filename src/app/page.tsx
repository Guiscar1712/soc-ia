import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { BrandLockup } from "@/components/brand-mark";
import { StoryIntro } from "@/components/story-intro";
import { InTheBox } from "@/components/box-carousel";
import { FounderPhoto } from "@/components/founder-photo";
import { Explain } from "@/components/story-sections";
import { Faq, FinalCall, Offer } from "@/components/offer";
import { FloatingCta } from "@/components/floating-cta";
import { CheckoutTracking } from "@/components/checkout-tracking";

export default function Home() {
  return (
    <>
      <CheckoutTracking />
      <SmoothScroll />
      <Nav />
      <main>
        <StoryIntro />
        <Explain />
        <InTheBox />
        <FounderPhoto />
        <Offer />
        <Faq />
        <FinalCall />
      </main>
      <footer className="border-t border-line bg-background px-6 py-10 pb-28 md:px-12 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <BrandLockup className="opacity-90" />
          <p className="text-sm font-normal text-paper/55">© 2026 SÓC.IA</p>
        </div>
      </footer>
      <FloatingCta />
    </>
  );
}
