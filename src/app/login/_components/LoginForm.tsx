"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { validateAdminLogin } from "@/lib/auth";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import LoginHelperRow from "./LoginHelperRow";
import LoginSubmitButton from "./LoginSubmitButton";

type FormErrors = {
  username?: string;
  password?: string;
  form?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: FormErrors = {};
    if (!username.trim()) next.username = "Username wajib diisi.";
    if (!password) next.password = "Password wajib diisi.";

    if (next.username || next.password) {
      setErrors(next);
      return;
    }

    if (!validateAdminLogin(username, password)) {
      setErrors({ form: "Username atau password salah." });
      return;
    }

    setErrors({});
    setLoading(true);
    router.push("/dashboard");
  }

  const usernameInvalid = Boolean(errors.username || errors.form);
  const passwordInvalid = Boolean(errors.password || errors.form);
  const message = errors.username ?? errors.password ?? errors.form;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <UsernameField
        value={username}
        invalid={usernameInvalid}
        onChange={(value) => {
          setUsername(value);
          setErrors({});
        }}
      />

      <PasswordField
        value={password}
        invalid={passwordInvalid}
        onChange={(value) => {
          setPassword(value);
          setErrors({});
        }}
      />

      <LoginHelperRow error={message} />
      <LoginSubmitButton loading={loading} />
    </form>
  );
}