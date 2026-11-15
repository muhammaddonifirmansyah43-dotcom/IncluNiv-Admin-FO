
import { Mail, MessageCircle, Phone } from "lucide-react";
import InfoField from "./InfoField";

type Props = {
  email: string;
  whatsapp: string;
};

export default function ContactCard({ email, whatsapp }: Props) {
  const waNumber = whatsapp.replace(/\D/g, "");

  return (
    <>
      <InfoField label="Email">
        <span className="inline-flex items-center gap-2 text-[#3478C8]">
          <Mail size={15} aria-hidden="true" />
          {email}
        </span>
      </InfoField>

      <div className="rounded-xl border border-[#E2EBF8] bg-[#F8FAFF] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Kontak & WhatsApp
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-3 text-sm font-semibold text-[#17345F]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-[#16834A]">
              <Phone size={15} aria-hidden="true" />
            </span>
            {whatsapp}
          </span>

          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 self-center items-center gap-2 rounded-lg bg-[#DDF5E7] px-3 text-xs font-medium text-[#16834A] transition hover:bg-[#CBEED9]"
          >
            <MessageCircle size={15} aria-hidden="true" />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
