import type { BookItem } from "@/data/homeData";

type BookCardProps = {
  book: BookItem;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
      <div className={`h-20 w-14 rounded-lg bg-gradient-to-br ${book.color} shadow-inner`} />
      <div>
        <h3 className="font-semibold text-stone-800">{book.title}</h3>
        <p className="text-sm text-stone-600">by {book.author}</p>
        <p className="mt-1 inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
          {book.level}
        </p>
      </div>
    </article>
  );
}
