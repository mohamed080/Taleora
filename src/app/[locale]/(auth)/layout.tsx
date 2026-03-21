import { FadeIn } from "@/components/ui/animations";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Decorative background with subtle star shapes */}
      <div className="relative flex items-center justify-center overflow-hidden bg-[#FDFDFD] px-4 py-8 sm:py-10 min-h-[calc(100vh-70px)]">
        {/* Shape top right */}
        <FadeIn
          delay={0}
          duration={0.7}
          className="absolute -top-8 right-0 pointer-events-none z-10"
        >
          <Image
            src="/images/star-tr.svg"
            alt="Star Shape image"
            width={220}
            height={400}
            priority
            draggable={false}
            className="object-contain w-30 md:w-45 lg:w-55"
          />
        </FadeIn>

        {/* Shape bottom left */}
        <FadeIn
          delay={0}
          duration={0.7}
          className="absolute bottom-0 left-0 pointer-events-none"
        >
          <Image
            src="/images/star-bl.svg"
            alt="Star Shape image"
            width={120}
            height={330}
            priority
            draggable={false}
            className="object-contain w-17.5 md:w-25 lg:w-30"
          />
        </FadeIn>

        {/* Card container */}
        <div className="relative z-10 w-full max-w-120 rounded-[16px] bg-white px-6 py-8 shadow-[0_2px_24px_rgba(0,0,0,0.06)] sm:px-12 sm:py-9">
          {children}
        </div>
      </div>
    </>
  );
}
