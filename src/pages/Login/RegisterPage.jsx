"use client";
import * as React from "react";
import { MarketingPanel } from "./MarketingPanel";
import { RegisterForm } from "./RegisterForm";

const RegisterPage = () => {
  return (
    <main className="flex min-h-screen max-md:flex-col">
      <MarketingPanel />
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;