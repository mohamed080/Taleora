import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaRegCopyright } from "react-icons/fa";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-orange-100 bg-[#FEF9E3]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-8">
        <div>
          <Image
            src="/images/footer-logo.svg"
            alt="Taleora Logo"
            width={270}
            height={100}
            draggable={false}
          />
        </div>
        <div>
          <h4 className="font-medium text-lg text-primary">{t("product")}</h4>
          <ul className="mt-5 space-y-2 text-base font-medium text-[#FFB24B]">
            <li>{t("productLinks.feature")}</li>
            <li>{t("productLinks.apiintegration")}</li>
            <li>{t("productLinks.pricing")}</li>
            <li>{t("productLinks.faq")}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-lg text-primary">{t("info")}</h4>
          <ul className="mt-5 space-y-2 text-base font-medium text-[#FFB24B]">
            <li>{t("infoLinks.privacypolicy")}</li>
            <li>{t("infoLinks.terms")}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-lg text-primary">{t("contact")}</h4>
          <ul className="mt-5 space-y-2 text-base font-medium text-[#FFB24B]">
            <li>{t("contactLines.address")}</li>
            <li>{t("contactLines.email")}</li>
            <li>{t("contactLines.phone")}</li>
            <li>{t("contactLines.phone2")}</li>
          </ul>
        </div>
      </div>
      {/* <Copyright /> */}
      <div className="border-t border-t-primary text-center">
        <p className="py-3 text-base text-primary flex justify-center items-center
         gap-2" >
          <FaRegCopyright />
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
