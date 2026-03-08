import { getTranslations } from "next-intl/server";
import { IoIosArrowDown } from "react-icons/io";

export async function FaqSection() {
  const t = await getTranslations("faq");

    const faqItems = [
    { q: "q1", a: "a1" },
    { q: "q2", a: "a2" },
    { q: "q3", a: "a3" },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-19 md:px-8">
      <h2 className="text-center text-2xl font-bold text-accent md:text-4xl">
        {t("title")}
      </h2>

      <div className="mt-8 space-y-3">
        {faqItems.map((item, i) => (
          <details
            key={i}
            className="group  border-b border-b-[#D9D9D9] p-5 transition-all duration-300 open:backdrop-blur-[20.875px] open:shadow-[0px_0.8px_0px_0px_#FFFFFF_inset]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="text-base font-medium text-[#83003D]">
                {t(item.q)}
              </span>

              <IoIosArrowDown
                size={20}
                className="transition-transform duration-300 group-open:rotate-180 text-[#83003D]"
              />
            </summary>

            {/* smooth animation */}
            <div className="grid grid-rows-[0fr] transition-all duration-300 group-open:grid-rows-[1fr]">
              <p className="overflow-hidden pt-3 text-sm text-stone-600">
                {t(item.a)}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}