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
  error
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
        className={`mt-1 px-4 py-3 w-full text-lg rounded-lg border border-solid ${
          error ? 'border-red-500' : 'border-neutral-200'
        } text-gray-500 focus:outline-none focus:ring-1 ${
          error ? 'focus:ring-red-500' : 'focus:ring-[#12496b]'
        }`}
        id={id}
        type={type}
        aria-required={required}
        aria-invalid={!!error}
        aria-errormessage={error ? `${id}-error` : undefined}
        placeholder={placeholder}
        required={required}
        value={value}
        onInput={(e) => onChange(e.target.value)}
      />
      {error && (
        <p 
          id={`${id}-error`} 
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
};
