// components/career-adventure.tsx  ← server component stays async
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import {
  CareerAdventureDesktop,
  CareerAdventureMobile,
} from "./career-adventure-animations";

const careersData = [
  { key: "fireFighter",   image: "/images/fire-fighter.png",  arrowSrc: "/images/arrow-1.svg" },
  { key: "policeOfficer", image: "/images/police-officer.png", arrowSrc: "/images/arrow-2.svg" },
  { key: "doctor",        image: "/images/doctor.png",         arrowSrc: "/images/arrow-3.svg" },
  { key: "pilot",         image: "/images/pilot.png",          arrowSrc: "/images/arrow-4.svg" },
];

export async function CareerAdventure() {
  const t = await getTranslations("careerAdventure");
  const locale = await getLocale();

  // Resolve labels server-side so client components stay pure
  const careers = careersData.map((c) => ({
    ...c,
    label: t(`careers.${c.key}`),
  }));

  return (
    <section className="mx-auto max-w-5xl px-4 pt-15 text-center">
      {/* Heading */}
      <h1 className="mb-1 text-3xl sm:text-4xl font-bold text-accent px-4 sm:px-20">
        {t("title")}
      </h1>
      <p className="mb-5 text-lg sm:text-xl font-medium text-gray">
        {t("subtitle")}
      </p>

      <div className="mx-auto mt-8 max-w-5xl">
        {/* Desktop animated layout */}
        <CareerAdventureDesktop careers={careers} />

        {/* Mobile animated layout */}
        <CareerAdventureMobile careers={careers} />

        {/* CTA */}
        <Button
          asChild
          className="px-9 sm:px-13 py-5 sm:py-6 mt-10"
          variant="gradient"
          size="default"
        >
          <Link href={`/${locale}/books/explore`}>{t("explore")}</Link>
        </Button>
      </div>
    </section>
  );
}