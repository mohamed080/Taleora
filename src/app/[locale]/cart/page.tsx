"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"

export default function Page() {
  const params = useParams() as { locale?: string }
  const locale = params?.locale ?? "en"
  const t = useTranslations("books")
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("taleora_cart")
    if (stored) {
      try {
        setCart(JSON.parse(stored))
      } catch {
        setCart([])
      }
    }
  }, [])

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + (item.totalPrice ?? 0), 0),
    [cart]
  )

  if (!cart.length) {
    return (
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold mb-4">{t("cart.emptyTitle")}</h1>
          <p className="text-gray mb-6">{t("cart.emptyDescription")}</p>
          <Link
            href={`/${locale}/books`}
            className="inline-flex rounded-lg bg-primary px-6 py-3 text-white"
          >
            {t("cart.browse")}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">{t("cart.orderSummary")}</h1>

        <div className="space-y-6">
          {cart.map((item, idx) => (
            <div key={idx} className="rounded-3xl border border-muted p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-lg font-semibold">{item.name || t("cart.unnamed")}</p>
                  <p className="text-sm text-gray">{t("cart.bookId")}: {item.bookId}</p>
                  <p className="text-sm text-gray">{t("cart.total")}: EGP {item.totalPrice}</p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/books`}
                    className="inline-flex items-center rounded-lg bg-muted px-4 py-2 text-sm"
                  >
                    {t("cart.continueShopping")}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-muted p-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">{t("cart.total")}</span>
              <span className="text-lg font-bold">EGP {total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
