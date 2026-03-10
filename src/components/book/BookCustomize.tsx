"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineUpload,
  AiOutlineDelete,
} from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { Book } from "@/lib/books";

type BookCustomizeProps = {
  book: Book;
  locale: string;
};

const sliderImages = ["/images/book-cover-1.png", "/images/book-cover-2.png"];

function parsePrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export function BookCustomize({ book, locale }: BookCustomizeProps) {
  const t = useTranslations("books");
  const router = useRouter();
  const [childName, setChildName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [coverSturdy, setCoverSturdy] = useState(false);
  const [coverLuxury, setCoverLuxury] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const basePrice = useMemo(() => parsePrice(book.price), [book.price]);
  const coverPrice = useMemo(() => {
    let total = 0;
    if (coverSturdy) total += 10;
    if (coverLuxury) total += 20;
    return total;
  }, [coverSturdy, coverLuxury]);
  const totalPrice = useMemo(
    () => basePrice + coverPrice,
    [basePrice, coverPrice],
  );

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setPhotoFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    } else {
      setPhotoPreview(null);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("taleora_cart") ?? "[]");
    cart.push({
      bookId: book.id,
      name: childName,
      photo: photoPreview,
      cover: {
        sturdy: coverSturdy,
        luxury: coverLuxury,
      },
      totalPrice,
      date: new Date().toISOString(),
    });
    localStorage.setItem("taleora_cart", JSON.stringify(cart));
    router.push(`/${locale}/cart`);
  };

  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Left: Customization form */}
          <div className="space-y-6 rounded-3xl border border-[#F4F4F4] p-8 shadow-md ">
            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              {t(`${book.key}.title`)}
            </h4>

            <p className="text-sm sm:text-base text-[#2C2C2C] leading-tight">
              When kindness calls, even the smallest acts can change everything.
              In this enchanting personalized .
            </p>

            <label className="block mb-4">
              <span className="block text-sm sm:text-base font-semibold text-[#2C2C2C] mb-1 ">
                1. Child name
              </span>
              <input
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter child name"
                className="w-full rounded-lg border border-[#F4F4F4] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#2C2C2C]">
                  2. Child's Photo{" "}
                </span>
                {photoPreview ? (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="inline-flex items-center gap-2 text-sm text-warning"
                  >
                    <AiOutlineDelete /> Remove
                  </button>
                ) : null}
              </div>
              <label className="relative flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#FFB24B] px-4 py-10 text-center bg-[#FEF9E3]">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={onFileChange}
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/images/add-image.svg"
                      width={42}
                      height={42}
                      alt="Add image"
                    />
                  </div>
                  <p className="text-sm sm:text-base font-medium text-[#FFB24B]">Click or drag to upload your child photo</p>
                  <p className="text-xs sm:text-sm font-medium text-[#B3B3B3]">JPG, PNG, JPEG</p>
                </div>
              </label>

              {photoPreview ? (
                <div className="mt-4 rounded-xl border border-success/40 bg-success/10 p-4 text-sm text-success">
                  Photo uploaded successfully!
                </div>
              ) : null}
            </div>

            <div className="space-y-3">
              <span className="text-sm sm:text-base font-semibold text-[#2C2C2C]">
                3. Cover Material
                </span>
              <label className="flex items-center justify-between gap-3">
                <div>
                    <input
                      type="checkbox"
                      checked={coverSturdy}
                      onChange={(e) => setCoverSturdy(e.target.checked)}
                    />
                    <span>Sturdy paper cover (+EGP 10)</span>
                </div>
                <span className="text-sm sm:text-base  text-[#FFB24B]">22.29 EGP</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={coverLuxury}
                  onChange={(e) => setCoverLuxury(e.target.checked)}
                />
                <span>Luxury hardcover (+EGP 20)</span>
              </label>
            </div>

            <div className="rounded-2xl bg-muted/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray">Base price</span>
                <span className="font-semibold">EGP {basePrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray">Cover options</span>
                <span className="font-semibold">EGP {coverPrice}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-muted pt-3">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold">EGP {totalPrice}</span>
              </div>
            </div>

            <Button
              className="w-full py-5 text-sm sm:text-base"
              variant="gradient"
              size="lg"
              onClick={addToCart}
              disabled={!childName || !photoFile}
            >
              Add to cart
            </Button>
          </div>

          {/* Right: Preview */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-muted p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Book preview</h2>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide(
                        (s) =>
                          (s - 1 + sliderImages.length) % sliderImages.length,
                      )
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground"
                  >
                    <AiOutlineLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((s) => (s + 1) % sliderImages.length)
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground"
                  >
                    <AiOutlineRight />
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-black/5">
                <Image
                  src={sliderImages[activeSlide]}
                  alt="Book preview"
                  width={640}
                  height={740}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray">
                  Preview the book cover
                </p>
                <p className="text-xs text-gray">
                  Swipe left/right or use the arrows to change the view.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
