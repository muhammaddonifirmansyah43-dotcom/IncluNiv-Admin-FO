import { UserRound } from "lucide-react";
import LoginField from "./LoginField";

type Props = {
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
};

export default function UsernameField({ value, invalid, onChange }: Props) {
  return (
    <LoginField id="username" label="Username" icon={UserRound} invalid={invalid}>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        placeholder="Masukkan username"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid}
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#17345F] outline-none placeholder:text-slate-400"
      />
    </LoginField>
  );
}