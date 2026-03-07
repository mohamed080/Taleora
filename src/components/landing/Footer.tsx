import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-orange-100 bg-[#fff8ec]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-serif text-3xl text-rose-500">{t("brand")}</p>
          <p className="mt-2 text-sm text-stone-600">{t("brandLine")}</p>
        </div>
        <div>
          <h3 className="font-semibold text-stone-800">{t("explore")}</h3>
          <ul className="mt-2 space-y-1 text-sm text-stone-600">
            <li>{t("exploreLinks.library")}</li>
            <li>{t("exploreLinks.paths")}</li>
            <li>{t("exploreLinks.parents")}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-stone-800">{t("community")}</h3>
          <ul className="mt-2 space-y-1 text-sm text-stone-600">
            <li>{t("communityLinks.events")}</li>
            <li>{t("communityLinks.talks")}</li>
            <li>{t("communityLinks.newsletter")}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-stone-800">{t("contact")}</h3>
          <ul className="mt-2 space-y-1 text-sm text-stone-600">
            <li>{t("contactLines.email")}</li>
            <li>{t("contactLines.phone")}</li>
            <li>{t("contactLines.hours")}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
