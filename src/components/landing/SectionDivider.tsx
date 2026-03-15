import Image from "next/image";

export function SectionDivider() {
  return (
    <Image
      src="/images/section-divider.png"
      alt="Section Divider"
      width={1535}
      height={66}
      draggable={false}
      className="w-full h-10 md:h-13 lg:h-15"
    />
  );
}

export function SectionDividerSm() {
  return (
    <div className="flex w-full overflow-hidden">
      <Image
        src="/images/section-divider-1.png"
        alt="Section Divider"
        width={698}
        height={30}
        draggable={false}
        className="w-[45.97%] h-auto"
      />
      <Image
        src="/images/section-divider-2.png"
        alt="Section Divider"
        width={698}
        height={30}
        draggable={false}
        className="w-[45.97%] h-auto"
      />
      <Image
        src="/images/section-divider-3.png"
        alt="Section Divider"
        width={122}
        height={30}
        draggable={false}
        className="w-[8.06%] h-auto"
      />
    </div>
  );
}
