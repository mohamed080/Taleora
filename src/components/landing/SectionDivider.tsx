import Image from "next/image";

export function SectionDivider() {
  return (
    <Image
      src="/images/section-divider.png"
      alt="Section Divider"
      width={1920}
      height={0}
      draggable={false}
      className="h-15"
    />
  );
}

export function SectionDividerSm() {
  return (
   <div className="flex">
     <Image
       src="/images/section-divider-1.png"
       alt="Section Divider"
       width={1920}
       height={0}
       draggable={false}
       className="h-7.5"
     />
     <Image
       src="/images/section-divider-2.png"
       alt="Section Divider"
       width={1920}
       height={0}
       draggable={false}
       className="h-7.5"
     />
     <Image
       src="/images/section-divider-3.png"
       alt="Section Divider"
       width={1920}
       height={0}
       draggable={false}
       className="h-7.5"
     />
   </div>
    
  );
}