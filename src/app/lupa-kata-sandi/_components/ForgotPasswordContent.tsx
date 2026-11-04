"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import BackToLoginLink from "./BackToLoginLink";
import ForgotPasswordHeader from "./ForgotPasswordHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

export default function ForgotPasswordContent() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <AuthCard className="max-w-[400px]">
        <ForgotPasswordSuccess />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <BackToLoginLink />
      <ForgotPasswordHeader />
      <ForgotPasswordForm onSuccess={() => setSubmitted(true)} />
    </AuthCard>
  );
}