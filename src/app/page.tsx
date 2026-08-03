import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Pain } from "@/components/pain";
import { Comparison } from "@/components/comparison";
import { About, Audience } from "@/components/about";
import { Founder } from "@/components/founder";
import { Stack } from "@/components/stack";
import { Pricing } from "@/components/pricing";
import { Closing, Footer } from "@/components/closing";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Founder />
        <Pain />
        <Comparison />
        <About />
        <Audience />
        <Stack />
        <Pricing />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
