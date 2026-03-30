"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { books, stickers } from "@/lib/books";
import { RiBookShelfFill } from "react-icons/ri";
import { GrUndo } from "react-icons/gr";
import { IoLibrarySharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";

const tabs = [
  { key: "stickers", label: "tabs.stickers", icon: "/images/noticeboard.svg" },
  { key: "books", label: "tabs.books", icon: RiBookShelfFill },
] as const;

const finishedOrders = {
  books: [
    {
      id: "book-finished-1",
      key: "book1",
      status: "delivered",
      actions: ["downloadPdf", "reOrder"],
    },
    {
      id: "book-finished-2",
      key: "book2",
      status: "confirmed",
      actions: ["downloadPdf", "reOrder"],
    },
  ],
  stickers: [
    {
      id: "sticker-finished-1",
      key: "sticker1",
      status: "delivered",
      actions: ["downloadPdf", "reOrder"],
    },
    {
      id: "sticker-finished-2",
      key: "sticker2",
      status: "confirmed",
      actions: ["downloadPdf", "reOrder"],
    },
  ],
};

const incompleteOrders = {
  books: [
    {
      id: "book-incomplete-1",
      key: "book1",
      actions: ["exploreBooks", "completeOrder"],
    },
  ],
  stickers: [
    {
      id: "sticker-incomplete-1",
      key: "sticker1",
      actions: ["exploreBooks", "completeOrder"],
    },
  ],
};

export default function Page() {
  const t = useTranslations("library");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<"books" | "stickers">("stickers");

  const items = activeTab === "books" ? books : stickers;
  const itemT = useTranslations(activeTab === "books" ? "books" : "stickers");
  const finished = finishedOrders[activeTab];
  const incomplete = incompleteOrders[activeTab];

  const getActionHref = (action: string, itemId: string | number) => {
    switch (action) {
      case "downloadPdf":
        
      case "reOrder":
        return `/${locale}/books/${itemId}/customize`;
      case "completeOrder":
        return `/${locale}/books/${itemId}`;
      case "exploreBooks":
        return `/${locale}/books`;
      default:
        return `/${locale}`;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 overflow-hidden relative">
      <FadeIn className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-10">
            <Button asChild size="lg" className="px-4 h-10 text-sm">
              <Link href={`/${locale}`}>
                <GrUndo className="size-5.5" />
                {t("backHome")}
              </Link>
            </Button>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] inline-flex gap-2">
                <IoLibrarySharp className="text-primary" />
                {t("title")}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-[#6F6F6F]">
                {t("subtitle")}
              </p>
            </div>
          </div>
          {/* tabs group */}
          <div className="flex rounded-full border border-[#DCDCDC] bg-[#F1F1F1] shadow-[0px_4px_4.1px_0px_#B7B7B740_inset] p-2 sm:p-3 sm:w-66.25 ms-auto justify-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <Button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  variant={isActive ? "gradient" : "outline"}
                  className={`flex items-center gap-2 rounded-full sm:px-4! sm:py-5! duration-300 ${isActive ? "text-base" : "text-[#828282]"} font-semibold!`}
                >
                  {tab.key === "books" ? (
                    <RiBookShelfFill className="h-5! w-5!" />
                  ) : (
                    <Image
                      src={tab.icon}
                      alt="stickers"
                      width={20}
                      height={20}
                      className={isActive ? "brightness-0 invert" : ""}
                    />
                  )}
                  {t(tab.label)}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          <SlideUp delay={0.05} className="rounded-[32px] border border-[#EFE8FB] bg-white p-6 shadow-[0_10px_40px_rgba(222,140,243,0.12)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  {t("finishedOrders")}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#0F172A]">
                  {t("readySectionTitle")}
                </h2>
              </div>
              <p className="max-w-xl text-sm text-[#6F6F6F]">
                {t("readySectionSubtitle")}
              </p>
            </div>

            <StaggerContainer delayChildren={0.08} className="mt-8 grid gap-4 lg:grid-cols-2">
              {finished.map((order) => {
                const item =
                  items.find((item) => item.key === order.key) ?? items[0];
                return (
                  <StaggerItem
                    key={order.id}
                    className="rounded-[30px] border border-[#ffecfd] bg-[#ffecfd] p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="relative w-full sm:w-36 md:w-40 aspect-square sm:aspect-auto sm:h-36 md:h-40 shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FAF5FF]">
                        <Image
                          src={item.image}
                          alt={itemT(`${item.key}.title`)}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#101828]">
                          {itemT(`${item.key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm text-[#667085]">
                          {itemT(`${item.key}.subtitle`)}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[#475467]">
                          <span className="rounded-full bg-[#EEF9F6] px-3 py-1 text-emerald-700">
                            {t(order.status)}
                          </span>
                          <span>
                            {t("personalizedOn", { date: "02 Oct 2025" })}
                          </span>
                        </div>
                        <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                          {order.actions.map((action) => (
                            <Button
                              key={action}
                              asChild
                              variant={
                                action === "reOrder"
                                  ? "gradient"
                                  : "gradientOutline"
                              }
                              size="lg"
                              className="h-9 sm:h-9.5 text-xs sm:text-sm flex-1 sm:flex-none"
                            >
                              <Link href={getActionHref(action, item.id)}>
                              {t(action)}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </SlideUp>

          <SlideUp delay={0.12} className="space-y-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  {t("incompleteOrders")}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#101828]">
                  {t("readyToRestock")}
                </h2>
              </div>
            </div>

            <StaggerContainer delayChildren={0.1} className="grid gap-4 md:grid-cols-2">
              {incomplete.map((order) => {
                const item =
                  items.find((item) => item.key === order.key) ?? items[0];
                return (
                  <StaggerItem
                    key={order.id}
                    className="rounded-[30px] border border-[#ffecfd] bg-white p-4 sm:p-6 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Image */}
                      <div className="relative w-full sm:w-36 md:w-40 aspect-square sm:aspect-auto sm:h-36 md:h-40 shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FAF5FF]">
                        <Image
                          src={item.image}
                          alt={itemT(`${item.key}.title`)}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-[#101828] truncate">
                            {itemT(`${item.key}.title`)}
                          </h3>
                          <p className="mt-1 sm:mt-2 text-sm text-[#667085] line-clamp-2">
                            {itemT(`${item.key}.subtitle`)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                          {order.actions.map((action) => (
                            <Button
                              asChild
                              key={action}
                              variant={
                                action === "completeOrder"
                                  ? "gradient"
                                  : "gradientOutline"
                              }
                              size="lg"
                              className="h-9 sm:h-9.5 text-xs sm:text-sm flex-1 sm:flex-none"
                            >
                              <Link href={getActionHref(action, item.id)}>
                                {t(action)}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </SlideUp>

          <SlideUp delay={0.18} className="rounded-[32px] border border-[#EAE2FF] bg-white p-6 shadow-[0_20px_40px_rgba(188,139,255,0.12)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  {t("suggestionsLabel")}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#101828]">
                  {t("restockTitle")}
                </h2>
              </div>
              <Button asChild variant="default" size="lg" className="px-4 py-5">
                <Link
                  href={`/${locale}${activeTab === "books" ? "/books" : "/stickers"} `}
                >
                  {t("continueShopping")}
                </Link>
              </Button>
            </div>

            <StaggerContainer delayChildren={0.12} className="mt-8 grid gap-4 xl:grid-cols-3">
              {items.slice(0, 3).map((item) => (
                <StaggerItem
                  key={item.id}
                  className="rounded-[28px] border border-[#ffecfd] p-6 shadow-sm"
                >
                  <div className="relative h-52 overflow-hidden rounded-3xl bg-[#ffecfd]">
                    <Image
                      src={item.image}
                      alt={itemT(`${item.key}.title`)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-5 space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray">
                      {itemT(`${item.key}.age`)}
                    </p>
                    <h3 className="text-xl font-semibold text-[#101828]">
                      {itemT(`${item.key}.title`)}
                    </h3>
                    <p className="text-sm text-[#667085]">
                      {itemT(`${item.key}.subtitle`)}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <div className="flex items-center gap-1 text-[#F5C15E] shadow-md rounded-full px-2 py-1 text-base sm:text-lg">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar className="opacity-30" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray font-medium">
                        Over 10k sold
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="text-lg font-bold text-[#101828]">
                        {item.price}
                      </span>
                      <Button
                        asChild
                        variant="gradient"
                        size="lg"
                        className="h-10 px-4"
                      >
                        <Link href={`/${locale}/books/${item.id}`}>
                          {t("personalize")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </SlideUp>
        </div>
      </FadeIn>
    </div>
  );
}
