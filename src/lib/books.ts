export type Book = {
  id: number
  key: string
  image: string
  price: string
  features?: string[]
}

export const books: Book[] = [
  {
    id: 1,
    key: "book1",
    image: "/images/bookposter-1.png",
    price: "EGP 45",
    features: [
      "Perfect for kids ages 4 to 10 years old",
      "Inspires empathy, courage, and self-belief",
      "32 beautifully illustrated pages",
      "Preview available before ordering",
      "Free shipping to the U.S.",
    ],
  },
  {
    id: 2,
    key: "book2",
    image: "/images/bookposter-2.png",
    price: "EGP 45",
    features: [
      "Perfect for kids ages 4 to 10 years old",
      "Inspires empathy, courage, and self-belief",
      "32 beautifully illustrated pages",
      "Preview available before ordering",
      "Free shipping to the U.S.",
    ],
  },
  {
    id: 3,
    key: "book1",
    image: "/images/bookposter-1.png",
    price: "EGP 45",
    features: [
      "Perfect for kids ages 4 to 10 years old",
      "Inspires empathy, courage, and self-belief",
      "32 beautifully illustrated pages",
      "Preview available before ordering",
      "Free shipping to the U.S.",
    ],
  },
  {
    id: 4,
    key: "book2",
    image: "/images/bookposter-2.png",
    price: "EGP 45",
    features: [
      "Perfect for kids ages 4 to 10 years old",
      "Inspires empathy, courage, and self-belief",
      "32 beautifully illustrated pages",
      "Preview available before ordering",
      "Free shipping to the U.S.",
    ],
  },
]

export function getBookById(id?: string | string[] | number) {
  if (Array.isArray(id)) id = id[0]
  const parsed = Number(id)
  if (Number.isNaN(parsed)) return undefined
  return books.find((book) => book.id === parsed)
}
