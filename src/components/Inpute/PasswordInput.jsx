"use client";
import * as React from "react";
import { useState } from "react";

export const PasswordInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  forgotPasswordLink,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="mb-2 font-medium text-md text-gray-500"
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="px-4 py-3 pr-12 w-full text-base rounded-lg border border-solid border-neutral-200"
          id={id}
          aria-required={required}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          required={required}
          value={value}
          onInput={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-4 top-2/4 p-0 -translate-y-2/4 cursor-pointer border-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          onClick={togglePassword}
        >
          👁
        </button>
      </div>
      {forgotPasswordLink && (
        <div className="flex justify-end mt-2">
          <a
            className="text-sm text-gray-500 no-underline"
            href={forgotPasswordLink}
          >
            Forgot Password?
          </a>
        </div>
      )}
    </div>
  );
};
