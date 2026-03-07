import {
  AuthorSpotlight,
  FaqSection,
  FeaturedSection,
  Footer,
  Header,
  Hero,
  SectionDivider,
  SplitShelves,
  ValuesStrip,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffef9]">
      <Header />
      <Hero />
      <ValuesStrip />
      <SectionDivider />
      <FeaturedSection />
      <SplitShelves />
      <SectionDivider />
      <AuthorSpotlight />
      <FaqSection />
      <SectionDivider />
      <Footer />
    </div>
  );
}
