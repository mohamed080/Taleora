"use client";

import { useTranslations } from "next-intl";
import { HeadphonesIcon } from "lucide-react";

export default function SupportPage() {
  const t = useTranslations("support");

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6DCA]/10 to-[#FDC37A]/10">
        <HeadphonesIcon className="h-10 w-10 text-[#FF6DCA]" />
      </div>
      <h1 className="font-seasons text-3xl font-bold text-gray-800">{t("title")}</h1>
      <p className="mt-3 text-gray-500">{t("description")}</p>
    </div>
  );
}
