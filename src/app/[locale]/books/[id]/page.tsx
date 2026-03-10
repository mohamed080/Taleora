import { notFound } from "next/navigation"

import { BookDetail } from "@/components/book/BookDetail"
import { getBookById } from "@/lib/books"
import { MagicWorksCenter } from "@/components/book/MagicWorksCenter"

type PageProps = {
  params: Promise<{
    locale: string
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
const { id, locale } = await params

  const book = getBookById(Number(id))
  if (!book) return notFound()

  return <div>
    <BookDetail book={book} locale={locale} />
    <MagicWorksCenter />
  </div>
}

