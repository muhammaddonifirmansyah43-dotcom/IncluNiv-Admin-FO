import { Mail } from "lucide-react";
import LoginField from "./LoginField";

type Props = {
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
};

export default function EmailField({ value, invalid, onChange }: Props) {
  return (
    <LoginField id="email" label="Email" icon={Mail} invalid={invalid}>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Masukkan email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid}
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#17345F] outline-none placeholder:text-slate-400"
      />
    </LoginField>
  );
}
