import { notFound } from "next/navigation"

import { BookDetail } from "@/components/book/BookDetail"
import { getStickerById } from "@/lib/books"
import { MagicWorksCenter } from "@/components/book/MagicWorksCenter"

type PageProps = {
  params: Promise<{
    locale: string
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params

  const stickers = getStickerById(Number(id))
  if (!stickers) return notFound()

  return (
    <div>
      <BookDetail book={stickers} locale={locale} namespace="stickers" />
      <MagicWorksCenter />
    </div>
  )
}

