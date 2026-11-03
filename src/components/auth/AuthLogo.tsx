import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="mb-2 flex justify-center">
      <Image
        src="/images/incluniv-logo.png"
        alt="Logo Incluniv"
        width={150}
        height={150}
        priority
        className="h-[150px] w-[150px] object-contain"
      />
    </div>
  );
}