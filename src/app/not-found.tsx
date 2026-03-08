import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import "./globals.css";


type Props = { params?: { locale?: string } };

export default function NotFound({ params }: Props) {
  const t = useTranslations("notFound");
  const locale = params?.locale;
  const homeHref = locale ? `/${locale}` : "/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-5 shadow-sm shadow-primary/30 animate__animated animate__pulse animate__infinite">
          <AlertTriangle className="h-12 w-12 text-primary" />
        </div>
        <p className="text-sm font-semibold tracking-widest text-secondary/80 uppercase animate__animated animate__fadeInDown">
          {t("badge")}
        </p>
        <h1 className="mt-4 text-[clamp(3rem,6vw,5.5rem)] font-bold leading-tight text-foreground animate__animated animate__rubberBand">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray max-w-md mx-auto animate__animated animate__fadeInUp">
          {t("subtitle")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray max-w-md mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          {t("description")}
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            variant="gradient"
            asChild
            className="animate__animated animate__fadeInUp animate__delay-150 text-base px-7 py-5 font-medium"
          >
            <Link href={homeHref}>
              <Home className="mr-2" />
              {t("backHome")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
