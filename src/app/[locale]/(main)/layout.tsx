import { Footer, SectionDividerSm } from "@/components/landing";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SectionDividerSm />
      <Footer />
    </>
  );
}
