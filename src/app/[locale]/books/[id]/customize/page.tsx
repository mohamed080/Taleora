import { notFound } from "next/navigation"

import { BookCustomize } from "@/components/book/BookCustomize"
import { getBookById } from "@/lib/books"

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

  return <BookCustomize book={book} locale={locale} />
}
