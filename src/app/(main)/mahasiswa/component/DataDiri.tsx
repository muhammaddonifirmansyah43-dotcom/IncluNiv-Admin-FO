
import {
  User,
  Accessibility,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-[#F7F9FC] p-3">
      <p className="mb-2 text-[10px] text-gray-400">{label}</p>
      <p className="text-xs font-semibold text-[#0F2D5B]">
        {value}
      </p>
    </div>
  );
}

export default function DataDiri() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

      {/* Informasi Profil Akademik */}
      <div className="rounded-xl bg-white p-5 shadow-sm lg:col-span-2">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-500">
            <User size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0F2D5B]">
              Informasi Profil Akademik
            </h3>
            <p className="text-[10px] text-gray-400">
              Data induk mahasiswa berdasarkan pangkalan data INCLUNIV
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoItem label="NAMA LENGKAP" value="Ahmad Macheda" />
          <InfoItem label="NOMOR INDUK MAHASISWA" value="25314707000065" />
          <InfoItem label="PROGRAM STUDI" value="Teknologi Informasi" />
          <InfoItem label="FAKULTAS" value="Fakultas Vokasi" />

          <div className="rounded-lg bg-[#F7F9FC] p-3 sm:col-span-2">
            <p className="mb-2 text-[10px] text-gray-400">
              JENIS DISABILITAS & ALAT BANTU
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] text-orange-600">
                Tuna Daksa (Mobilitas Bawah)
              </span>
              <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] text-blue-600">
                Kursi Roda Manual & Elektrik
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-[#F7F9FC] p-3 sm:col-span-2">
            <p className="mb-2 text-[10px] text-gray-400">EMAIL</p>
            <p className="flex items-center gap-2 text-xs text-blue-600">
              <Mail size={13} />
              ahmad.macheda@student.univ.ac.id
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F9FC] p-3 sm:col-span-2">
            <p className="mb-2 text-[10px] text-gray-400">
              KONTAK & WHATSAPP
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-xs text-gray-700">
                <Phone size={13} />
                +62 812-3456-7890
              </p>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1.5 text-[10px] text-emerald-600"
              >
                <MessageCircle size={12} />
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Kebutuhan Dukungan */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-orange-50 p-2 text-orange-500">
            <Accessibility size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0F2D5B]">
              Kebutuhan Dukungan
            </h3>
            <p className="text-[10px] text-gray-400">
              Protokol pendampingan mahasiswa
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
          <p className="mb-2 text-xs font-semibold text-blue-600">
            Spesifikasi Kebutuhan Pendampingan
          </p>

          <p className="text-xs leading-relaxed text-gray-600">
            Membutuhkan bantuan mobilitas saat berpindah antar
            ruang kelas kuliah, akses ramp atau gedung, serta
            pendampingan untuk aksesibilitas laboratorium komputer
            dan fasilitas kampus utama.
          </p>
        </div>
      </div>
    </div>
  );
}
