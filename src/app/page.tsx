import CommunityTable from "@/components/CommunityTable";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Kaapi from "@/components/Kaapi";
import Menu from "@/components/Menu";
import Posts from "@/components/Posts";
import Reels from "@/components/Reels";
import Signatures from "@/components/Signatures";
import Story from "@/components/Story";
import Visit from "@/components/Visit";

/**
 * Section order is a deliberate rhythm of dark → light → dark so the
 * page has breathing room, rather than one flat cream scroll:
 *
 *   Hero            dark  (video)
 *   Story           light
 *   Signatures      light-deep (floating dishes)
 *   Menu            dark  (the card, as a bright object on maroon)
 *   Kaapi           light
 *   CommunityTable  terracotta
 *   Reels           light-deep
 *   Posts           light
 *   Visit           dark  (+ map)
 *   FAQ             light
 *   Footer          dark
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Signatures />
        <Menu />
        <Kaapi />
        <CommunityTable />
        <Reels />
        <Posts />
        <Visit />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
