
import {
  User,
  Accessibility,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

function InfoItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-[#E2EAF5] bg-[#F8FAFF] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-2 break-words text-sm font-semibold leading-relaxed text-[#17345F]">
        {children}
      </div>
    </div>
  );
}

export default function DataDiri() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
      {/* Informasi Profil Akademik */}
      <section className="h-full rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F0FF] text-[#3B82F6]">
            <User size={20} aria-hidden="true" />
          </span>

          <div>
            <h2 className="text-base font-bold text-[#17345F]">
              Informasi Profil Akademik
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Data induk mahasiswa berdasarkan pangkalan data INCLUNIV.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem label="Nama Lengkap">
              Ahmad Macheda
            </InfoItem>

            <InfoItem label="Nomor Induk Mahasiswa">
              25314707000065
            </InfoItem>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem label="Program Studi">
              Teknologi Informasi
            </InfoItem>

            <InfoItem label="Fakultas">
              Fakultas Vokasi
            </InfoItem>
          </div>

          <InfoItem label="Jenis Disabilitas">
            <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Tuna Daksa (Mobilitas Bawah)
            </span>
          </InfoItem>

          <InfoItem label="Email">
            <span className="inline-flex items-center gap-2 text-[#3478C8]">
              <Mail size={15} aria-hidden="true" />
              ahmad.macheda@student.univ.ac.id
            </span>
          </InfoItem>

          <div className="rounded-xl border border-[#E2EAF5] bg-[#F8FAFF] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Kontak & WhatsApp
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-3 text-sm font-semibold text-[#17345F]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Phone size={15} aria-hidden="true" />
                </span>
                +62 812-3456-7890
              </span>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 self-center items-center gap-2 rounded-lg bg-[#DDF5E7] px-3 text-xs font-medium text-[#16834A] transition hover:bg-[#CBEED9]"
              >
                <MessageCircle size={15} aria-hidden="true" />
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Kebutuhan Dukungan */}
      <section className="h-full rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E8] text-[#F97316]">
            <Accessibility size={20} aria-hidden="true" />
          </span>

          <div>
            <h2 className="text-base font-bold text-[#17345F]">
              Kebutuhan Dukungan
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Protokol pendampingan mahasiswa.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-[#E2EAF5] bg-[#F8FAFF] p-4">
          <p className="text-xs font-bold text-[#17345F]">
            Spesifikasi Kebutuhan Pendampingan
          </p>

          <p className="mt-2 break-words text-sm leading-relaxed text-slate-600">
            Membutuhkan bantuan mobilitas saat berpindah antar
            ruang kelas kuliah, akses ramp atau gedung, serta
            pendampingan untuk aksesibilitas laboratorium komputer
            dan fasilitas kampus utama.
          </p>
        </div>
      </section>
    </div>
  );
}
