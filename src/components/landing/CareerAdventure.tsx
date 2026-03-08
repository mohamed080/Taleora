import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

const careers = [
  {
    key: "fireFighter",
    image: "/images/fire-fighter.png",
    arrowSrc: "/images/arrow-1.svg",
  },
  {
    key: "policeOfficer",
    image: "/images/police-officer.png",
    arrowSrc: "/images/arrow-2.svg",
  },
  {
    key: "doctor",
    image: "/images/doctor.png",
    arrowSrc: "/images/arrow-3.svg",
  },
  {
    key: "pilot",
    image: "/images/pilot.png",
    arrowSrc: "/images/arrow-4.svg",
  },
];

export async function CareerAdventure() {
  const t = await getTranslations("careerAdventure");
  const locale = await getLocale();

  return (
    <section className="mx-auto max-w-5xl px-4 pt-15 text-center">
      <h1 className="mb-1 text-4xl font-bold text-accent px-20">
        {t("title")}
      </h1>
      <p className="mb-5 text-xl font-medium text-gray">{t("subtitle")}</p>

      <div className="mx-auto mt-8 max-w-5xl">
        {/* Desktop */}
        <div className="hidden sm:flex flex-col items-center gap-0">
          {/* Top: Child avatar */}
          <div className="rounded-full border-[7px] border-[#FFB24B] bg-white">
            <Image
              src="/images/kid-1.png"
              alt="Child"
              width={185}
              height={185}
              className="rounded-full object-cover"
              draggable={false}
            />
          </div>

          {/* Arrows row */}
          <div className="flex w-full justify-around px-40 -mb-10">
            {careers.map((career) => (
              <Image
                key={career.key}
                src={career.arrowSrc}
                alt="arrow"
                width={100}
                height={90}
                draggable={false}
              />
            ))}
          </div>

          {/* Careers row */}
          <div className="flex w-full justify-around items-start px-4 relative">
            {careers.map((career, index) => (
              <div
                key={career.key}
                className={`flex flex-col items-center gap-2 ${
                  index === 1 || index === 2 ? "mt-20" : ""
                }`}
              >
                <div className="rounded-full border-[7px] border-[#FFB24B] bg-white">
                  <Image
                    src={career.image}
                    alt={career.key}
                    width={140}
                    height={140}
                    className="rounded-full object-cover"
                    draggable={false}
                  />
                </div>
                <p className="text-center text-xl font-bold text-black">
                  {t(`careers.${career.key}`)}
                </p>
              </div>
            ))}
          </div>
         
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-2 gap-6 sm:hidden">
          <div className="col-span-2 flex justify-center">
            <div className="rounded-full border-[7px] border-[#FFB24B] bg-white">
              <Image
                src="/images/kid-1.png"
                alt="Child"
                width={140}
                height={140}
                className="rounded-full object-cover"
                draggable={false}
              />
            </div>
          </div>
          {careers.map((career) => (
            <div key={career.key} className="flex flex-col items-center gap-2">
              <div className="rounded-full border-[6px] border-[#FFB24B] bg-white">
                <Image
                  src={career.image}
                  alt={career.key}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                  draggable={false}
                />
              </div>
              <p className="text-center text-lg font-bold text-black">
                {t(`careers.${career.key}`)}
              </p>
            </div>
          ))}
        </div>

         <Button
            asChild
            className="px-13 py-6 text-right mt-10"
            variant="gradient"
            size="default"
          >
            <Link href={`/${locale}/books/explore`}>{t("explore")}</Link>
          </Button>
      </div>
    </section>
  );
}
