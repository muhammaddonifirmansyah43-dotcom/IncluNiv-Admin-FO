
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center">
      <Image
        src="/images/incluniv-logo.png"
        alt="Logo Incluniv"
        width={52}
        height={52}
        priority
        className="h-[52px] w-[52px] shrink-0 object-contain"
      />
    </div>
  );
}
