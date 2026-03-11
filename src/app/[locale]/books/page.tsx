import { getTranslations } from "next-intl/server";
import { books } from "@/lib/books";
import { BooksGrid } from "./BooksGrid";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("books");

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 sm:py-24 px-4 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 -left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] font-seasons">
            {t("browseBooks.title")}
          </h1>
          <p className="text-lg sm:text-xl text-[#6F6F6F] font-medium leading-relaxed">
            {t("browseBooks.subtitle")}
          </p>
        </div>

        {/* Client Component for animations */}
        <BooksGrid books={books} locale={locale} />
      </div>
    </div>
  );
}
