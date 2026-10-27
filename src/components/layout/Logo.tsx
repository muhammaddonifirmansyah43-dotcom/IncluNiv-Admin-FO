
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex h-[65px] w-[65px] shrink-0 items-center justify-center">
      <Image
        src="/images/incluniv-logo.png"
        alt="Logo Incluniv"
        width={65}
        height={65}
        priority
        className="h-[65px] w-[65px] shrink-0 object-contain"
      />
    </div>
  );
}
