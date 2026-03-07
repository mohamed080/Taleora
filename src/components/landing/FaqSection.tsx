const faqItems = [
  "How do I choose books for my child age?",
  "Do you provide printable reading plans?",
  "Can schools partner with Taleora?",
];

export function FaqSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h2 className="text-center font-serif text-3xl text-rose-500 md:text-4xl">Frequently Asked Questions</h2>
      <div className="mt-6 space-y-3">
        {faqItems.map((item) => (
          <details key={item} className="rounded-xl border border-orange-100 bg-white p-4">
            <summary className="cursor-pointer font-medium text-stone-800">{item}</summary>
            <p className="mt-2 text-sm text-stone-600">
              This is a placeholder response. Replace with your final content and any links to support pages.
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
