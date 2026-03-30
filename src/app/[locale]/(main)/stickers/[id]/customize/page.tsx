import { notFound } from "next/navigation";

import { BookCustomize } from "@/components/book/BookCustomize";
import { getStickerById } from "@/lib/books";

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;

  const sticker = getStickerById(Number(id));
  if (!sticker) return notFound();

  return <BookCustomize book={sticker} locale={locale} namespace="stickers" />;
}
