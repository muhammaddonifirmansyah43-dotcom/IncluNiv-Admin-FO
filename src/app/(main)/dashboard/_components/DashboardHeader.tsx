export default function DashboardHeader() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Selamat datang kembali, Admin!
          </h1>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#3B82F6]">
            Pusat Layanan Disabilitas
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          Monitoring pendampingan dan ketersediaan relawan inklusi mahasiswa difabel.
        </p>
      </div>
    </section>
  );
}