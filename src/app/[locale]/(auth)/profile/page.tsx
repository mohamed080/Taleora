import ProfileWrapper from "./ProfileWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log(locale);

  return (
    <section className="mx-auto max-w-6xl">
        <ProfileWrapper locale={locale}  />
    </section>
  );
}
