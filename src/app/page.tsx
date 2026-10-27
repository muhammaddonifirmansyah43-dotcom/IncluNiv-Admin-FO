import Logo from "@/components/layout/Logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#E6F0FF] p-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <Logo />

        <h1 className="mt-8 text-2xl font-bold text-[#0F2D5B]">
          Masuk ke Incluniv
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Masuk untuk mengelola layanan pendampingan mahasiswa.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#3B82F6]"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#3B82F6]"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-[#3B82F6] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Masuk
          </button>
        </form>
      </section>
    </main>
  );
}