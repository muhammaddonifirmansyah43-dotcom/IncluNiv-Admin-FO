
"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import BackToLoginLink from "./BackToLoginLink";
import ForgotPasswordHeader from "./ForgotPasswordHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

export default function ForgotPasswordContent() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <AuthCard className="max-w-[510px]">
      {submitted ? (
        <ForgotPasswordSuccess />
      ) : (
        <>
          <BackToLoginLink />
          <ForgotPasswordHeader />

          <ForgotPasswordForm
            onSuccess={() => setSubmitted(true)}
          />
        </>
      )}
    </AuthCard>
  );
}
