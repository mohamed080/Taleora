// components/faq-section.tsx  ← server component stays async
import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "./faq-accordion";

const faqKeys = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
];

export async function FaqSection() {
  const t = await getTranslations("faq");

  // Resolve translations server-side
  const items = faqKeys.map(({ q, a }) => ({
    q: t(q),
    a: t(a),
  }));

  return (
    <section className="mx-auto max-w-4xl px-4 py-19 md:px-8">
      <h2 className="text-center text-2xl font-bold text-accent md:text-4xl">
        {t("title")}
      </h2>

      <FaqAccordion items={items} />
    </section>
  );
}