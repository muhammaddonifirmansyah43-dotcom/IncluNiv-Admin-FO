import Image from "next/image";

export default function LoginHeader() {
  return (
    <>
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

      <div className="mb-7 text-center">
        <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#171717] sm:text-[35px]">
          Selamat datang
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#31435D]">
          Masuk untuk mengakses halaman admin IncluNiv
        </p>
      </div>
    </>
  );
}