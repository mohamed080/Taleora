import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export function MagicWorks() {
  const t = useTranslations("magicWorks");
  const locale = useLocale();

  const steps = [
    {
      icon: "/images/Literature.svg",
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
      alt: t("steps.step1.iconAlt"),
      bg: "bg-[#FEF9E3]",
    },
    {
      icon: "/images/Camera Intelligence.svg",
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
      alt: t("steps.step2.iconAlt"),
      bg: "bg-secondary",
    },
    {
      icon: "/images/Magic Crystal Ball.svg",
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
      alt: t("steps.step3.iconAlt"),
      bg: "bg-primary",
    },
  ];

  const isRtl = locale === "ar";

  return (
    <section className="relative py-10">
      <div className="mx-auto grid max-w-full gap-8 px-5 pl-0 md:grid-cols-10 md:items-center">
        <div
          className={`order-1 md:col-span-3 flex justify-center ${
            isRtl ? "md:order-2" : ""
          }`}
        >
          <div className="w-full max-w-75 md:max-w-none">
            <Image
              src="/images/magicwork-image.png"
              alt={t("title")}
              width={400}
              height={600}
              priority
              draggable={false}
              className="object-contain"
            />
          </div>
        </div>

        <div
          className={`relative order-2 md:col-span-7 ${isRtl ? "md:order-1" : ""}`}
        >
          <div className="absolute left-1/2 top-45 -translate-x-1/2 w-8/12 opacity-90">
            <Image
              src="/images/Line 1.svg"
              alt="Decorative line"
              width={1200}
              height={150}
              className="w-full"
              draggable={false}
            />
          </div>

          <h1 className="text-4xl font-bold text-accent text-center">
            {t("title")}
          </h1>
          <p className="text-gray font-medium text-xl mb-16 text-center">
            {t("subtitle")}
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col items-center gap-6  py-8"
              >
                <div
                  className={`rounded-md w-20 h-20 flex items-center justify-center rotate-12 ${step.bg}`}
                >
                  <Image
                    src={step.icon}
                    alt={step.alt}
                    width={54}
                    height={54}
                    draggable={false}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-black text-center mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray font-medium text-sm text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}