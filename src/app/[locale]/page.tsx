import {
  Hero,
  MagicWorks,
  TopRatedBooks,
  SectionDivider,
  PrincessSection,
  KidSection,
  CareerAdventure,
  FaqSection,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFEFC]">
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
      </main>
    </div>
  );
}
