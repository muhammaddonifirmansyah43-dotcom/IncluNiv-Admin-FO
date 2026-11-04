import AuthLogo from "@/components/auth/AuthLogo";

export default function ForgotPasswordHeader() {
  return (
    <>
      <AuthLogo />

      <div className="mb-6 text-center">
        <h1 className="text-[32px] font-extrabold leading-tight text-[#171717]">
          Lupa kata sandi?
        </h1>
        <p className="mx-auto mt-2 max-w-[300px] text-[14px] leading-relaxed text-[#31435D]">
          Masukkan username atau email yang terdaftar pada akun Anda.
        </p>
      </div>
    </>
  );
}