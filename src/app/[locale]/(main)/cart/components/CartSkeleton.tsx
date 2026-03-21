import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-7 lg:grid-cols-[60%_40%]">
          <div className="space-y-6 rounded-3xl border border-[#F4F4F4] p-8 shadow-md">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-muted p-6 flex flex-col gap-4"
                >
                  <div className="flex gap-4">
                    <Skeleton className="h-20 w-14 rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 rounded-3xl border border-[#F4F4F4] p-8 shadow-md">
            <Skeleton className="h-10 w-56 mx-auto" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
