import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative bg-[#fff3df] min-h-[calc(100vh-68px)] grid items-center">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:px-8 md:py-16">
        <div>
          <Image
            src="/images/hero-logo.png"
            alt="Taleora Logo"
            width={580}
            height={174}
            draggable={false}
            className="mb-3"
            priority
          />
          <h1 className="text-lg leading-tight text-accent md:text-[26px]">
            {t.rich("title", {
              hero: (chunks) => (
                <span className="bg-[linear-gradient(132.78deg,#FF6DCA_37.86%,#FFB24B_86.43%)] bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <div className="mt-6 flex items-center flex-wrap gap-8">
            <Button asChild variant="default" size="lg" className="px-7! py-5!">
              <Link href={`/${locale}/login`}>{t("view")}</Link>
            </Button>
            <div className="flex items-center gap-1">
              <Image
                src="/images/protect.svg"
                alt="Protect Shield image"
                width={20}
                height={20}
              />
              <p className="text-primary text-base font-semibold">
                {t("private")}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-8 hidden md:block ${locale === "ar" ? "left-0" : "right-0"}`}
        >
          <Image
            src="/images/hero-image.png"
            alt="Hero Image"
            width={680}
            height={500}
            priority
            draggable={false}
            className="object-contain"
          />
        </div>
        <div className="absolute -top-8 right-0">
          <Image
            src="/images/shape-top-right.svg"
            alt="Star Shape image"
            width={220}
            height={400}
            priority
            draggable={false}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0">
          {" "}
          <Image
            src="/images/shape-bottom-left.svg"
            alt="Star Shape image"
            width={120}
            height={330}
            priority
            draggable={false}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
