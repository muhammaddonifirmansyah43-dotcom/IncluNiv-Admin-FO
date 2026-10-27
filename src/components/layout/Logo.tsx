import Image from "next/image";

type LogoProps = {
  compact?: boolean;
};

export default function Logo({
  compact = false,
}: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/incluniv-logo.png"
        alt="Logo Incluniv"
        width={38}
        height={38}
        priority
      />

      {!compact && (
        <div className="min-w-0">
          <p className="text-sm font-bold tracking-wide text-[#0F2D5B]">
            INCLUNIV
          </p>
          <p className="text-[10px] text-slate-500">
            Layanan Pendampingan
          </p>
        </div>
      )}
    </div>
  );
}