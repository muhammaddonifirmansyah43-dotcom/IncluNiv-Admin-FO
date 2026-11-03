import Image from "next/image";

export default function LoginBackground() {
  return (
    <>
      <Image
        src="/images/login-bg.jpeg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/[0.04]" />
    </>
  );
}