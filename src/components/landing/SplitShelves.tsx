import { fictionBooks, lifeBooks } from "@/data/homeData";
import { BookCard } from "./BookCard";

export function SplitShelves() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-rose-500">Books for Your Little One</h2>
          <p className="mt-2 text-sm text-stone-600">Stories crafted to build imagination and reading confidence.</p>
          <div className="mt-4 grid gap-4">
            {fictionBooks.map((book) => (
              <BookCard key={book.title} book={book} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-serif text-3xl text-cyan-700">Books for Your Little Future</h2>
          <p className="mt-2 text-sm text-stone-600">Titles that reinforce values, empathy, and practical life skills.</p>
          <div className="mt-4 grid gap-4">
            {lifeBooks.map((book) => (
              <BookCard key={book.title} book={book} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
