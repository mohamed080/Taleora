"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

export default function Page() {
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
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray mb-6">Add a book first to create an order summary.</p>
          <Link href="/en/books" className="inline-flex rounded-lg bg-primary px-6 py-3 text-white">
            Browse books
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

        <div className="space-y-6">
          {cart.map((item, idx) => (
            <div key={idx} className="rounded-3xl border border-muted p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-lg font-semibold">{item.name || "Unnamed"}</p>
                  <p className="text-sm text-gray">Book ID: {item.bookId}</p>
                  <p className="text-sm text-gray">Total: EGP {item.totalPrice}</p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/en/books"
                    className="inline-flex items-center rounded-lg bg-muted px-4 py-2 text-sm"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-muted p-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold">EGP {total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
