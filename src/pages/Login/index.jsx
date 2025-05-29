"use client";
import * as React from "react";
import { MarketingPanel } from "./MarketingPanel";
import { LoginForm } from "./LoginForm";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen max-md:flex-col">
      <MarketingPanel />
      <LoginForm />
    </main>
  );
};

export default LoginPage;
