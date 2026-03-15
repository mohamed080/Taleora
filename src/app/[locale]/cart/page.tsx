import { getTranslations } from "next-intl/server";
import { CartWrapper } from "./CartWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  const { locale = "en" } = await params;
  const t = await getTranslations("books");

  return (
    <section className="px-4 py-14 sm:py-20 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <CartWrapper
          locale={locale}
          title={t("cart.title")}
          continueShopping={t("cart.continueShopping")}
          continueShoppingHref={`/${locale}/books`}
        />
      </div>
    </section>
  );
}
