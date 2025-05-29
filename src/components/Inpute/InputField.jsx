"use client";
import * as React from "react";

export const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="mb-2 font-medium text-md text-gray-500"
      >
        {label}
      </label>
      <input
        className="mt-1 px-4 py-3 w-full text-lg rounded-lg border border-solid border-neutral-200 text-gray-500"
        id={id}
        type={type}
        aria-required={required}
        placeholder={placeholder}
        required={required}
        value={value}
        onInput={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
