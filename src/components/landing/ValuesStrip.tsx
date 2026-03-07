import { values } from "@/data/homeData";

export function ValuesStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="text-center font-serif text-3xl text-amber-700 md:text-4xl">Our Core Values</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {values.map((item) => (
          <article key={item.title} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <p className="text-2xl">{item.icon}</p>
            <h3 className="mt-2 font-semibold text-stone-800">{item.title}</h3>
            <p className="mt-1 text-sm text-stone-600">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
