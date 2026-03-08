import {
  Header,
  Hero,
  MagicWorks,
  TopRatedBooks,
  SectionDivider,
  PrincessSection,
  KidSection,
  CareerAdventure,
  FaqSection,
  Footer,
  SectionDividerSm,
} from "@/components/landing";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFEFC]">
      <Header />
      <main>
        <Hero />
        <MagicWorks />
        <TopRatedBooks />
        <SectionDivider />
        <PrincessSection />
        <KidSection />
        <SectionDivider />
        <CareerAdventure />
        <FaqSection />
        <SectionDividerSm />
      </main>
      <Footer />
    </div>
  );
}
