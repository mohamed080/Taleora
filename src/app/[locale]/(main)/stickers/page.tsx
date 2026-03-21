import { books } from "@/lib/books";
import PromoBanner from "@/components/shared/PromoBanner";
import { BooksGrid } from "@/components/shared/BooksGrid";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <PromoBanner />

      <div className="min-h-screen py-16 sm:py-24 px-4 overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute -top-40 -right-40 w-70 h-70 sm:w-96 sm:h-96 bg-primary rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-70 h-70 sm:w-96 sm:h-96 bg-secondary rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Client Component for animations */}
          <BooksGrid books={books} locale={locale} />
        </div>
      </div>
    </>
  );
}
