import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-[#fff3df]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:px-8 md:py-16">
        <div>
          <p className="mb-2 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
            {t("badge")}
          </p>
          <h1 className="font-serif text-5xl leading-tight text-rose-500 md:text-7xl">{t("title")}</h1>
          <p className="mt-3 max-w-md text-base text-stone-700 md:text-lg">{t("subtitle")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-orange-400 px-5 py-2 font-semibold text-white transition hover:bg-orange-500">
              {t("explore")}
            </button>
            <button className="rounded-full border border-orange-300 px-5 py-2 font-semibold text-orange-700 transition hover:bg-orange-50">
              {t("watch")}
            </button>
          </div>
        </div>
        <div className="relative mx-auto h-72 w-full max-w-md rounded-[2rem] border border-orange-100 bg-gradient-to-br from-amber-200 via-orange-100 to-rose-200 p-6 shadow-lg">
          <div className="absolute -left-4 top-8 text-4xl">?</div>
          <div className="absolute -right-4 bottom-8 text-4xl">??</div>
          <div className="flex h-full items-center justify-center rounded-[1.5rem] border-2 border-dashed border-rose-300 bg-white/70">
            <p className="max-w-[14rem] text-center text-sm font-medium text-stone-700">
              {t("placeholder")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
