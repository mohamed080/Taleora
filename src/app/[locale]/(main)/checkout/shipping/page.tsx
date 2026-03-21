import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GrUndo } from "react-icons/gr";
import { ShippingClient } from "./ShippingClient";

type ShippingPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: ShippingPageProps) {
  const { locale } = await params;
  const t = await getTranslations("books");

  return (
    <section className="px-4 py-10 sm:py-14 bg-[#FAFAFA] min-h-screen">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Back button */}
        <div>
          <Button asChild size="lg" className="px-4 h-10 text-sm">
            <Link href={`/${locale}/cart`}>
              <GrUndo className="size-5.5" />
              {t("cart.continueShopping")}
            </Link>
          </Button>
        </div>

        {/* Client boundaries for React state & Framer Motion */}
        <ShippingClient />
      </div>
    </section>
  );
}