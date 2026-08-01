import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import MobileQuickActions from "@/components/MobileQuickActions";
import Philosophy from "@/components/Philosophy";
import Proof from "@/components/Proof";
import Signatures from "@/components/Signatures";
import Visit from "@/components/Visit";

/**
 * Section order is a deliberate rhythm of light → dark → light so the
 * art-directed hero can hand off into a clear visit funnel:
 *
 *   Hero            light (brand canvas + food sculpture)
 *   Signatures      dark  (single-dish theatre)
 *   Menu            light (unboxed editorial menu)
 *   Philosophy      brass (story, kaapi, community)
 *   Proof           terracotta (monumental rating + real atmosphere)
 *   Visit           dark  (+ map)
 *   FAQ             light
 *   Footer          dark
 */
export default function Home() {
  return (
    <>
      <Header />
      <MobileQuickActions />
      <main id="main-content">
        <Hero />
        <Signatures />
        <Menu />
        <Philosophy />
        <Proof />
        <Visit />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
