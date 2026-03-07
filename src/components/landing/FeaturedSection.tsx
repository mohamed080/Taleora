import { featuredBooks } from "@/data/homeData";
import { BookCard } from "./BookCard";

export function FeaturedSection() {
  return (
    <section className="bg-[#fff8ec] py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl text-rose-500 md:text-4xl">Top Rated Favorites</h2>
          <a href="#" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            See all books
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredBooks.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
