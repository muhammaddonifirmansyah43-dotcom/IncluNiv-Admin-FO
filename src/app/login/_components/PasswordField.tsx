"use client";

import { useState } from "react";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import LoginField from "./LoginField";

type Props = {
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
};

export default function PasswordField({ value, invalid, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <LoginField
      id="password"
      label="Password"
      icon={LockKeyhole}
      invalid={invalid}
      trailing={
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
          className={`shrink-0 hover:text-[#17345F] ${
            invalid ? "text-red-500" : "text-slate-500"
          }`}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    >
      <input
        id="password"
        name="password"
        type={show ? "text" : "password"}
        autoComplete="current-password"
        placeholder="Masukkan password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid}
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#17345F] outline-none placeholder:text-slate-400"
      />
    </LoginField>
  );
}