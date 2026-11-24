"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, isValidEmail } from "@/lib/auth";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import LoginHelperRow from "./LoginHelperRow";
import LoginSubmitButton from "./LoginSubmitButton";

type FormErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: FormErrors = {};

    if (!email.trim()) {
      next.email = "Email wajib diisi.";
    } else if (!isValidEmail(email)) {
      next.email = "Format email tidak valid.";
    }

    if (!password) {
      next.password = "Password wajib diisi.";
    }

    if (next.email || next.password) {
      setErrors(next);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await loginAdmin(email, password);
      router.push("/dashboard");
    } catch (error) {
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat login.",
      });
    } finally {
      setLoading(false);
    }
  }

  const emailInvalid = Boolean(errors.email || errors.form);
  const passwordInvalid = Boolean(errors.password || errors.form);
  const message = errors.email ?? errors.password ?? errors.form;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <EmailField
        value={email}
        invalid={emailInvalid}
        onChange={(value) => {
          setEmail(value);
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
