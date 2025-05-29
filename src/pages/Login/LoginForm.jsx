"use client";
import * as React from "react";
import { useState } from "react";
import { InputField } from "../../components/Inpute/InputField";
import { PasswordInput } from "../../components/Inpute/PasswordInput";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="flex flex-col flex-1 justify-center items-center p-10 max-md:px-5 max-md:py-8">
      <div className="w-full max-w-[400px]">
        <img
          src="https://example.com/logo.png"
          alt="IRMA Logo"
          className="mb-10 h-[50px]"
        />
        <h2 className="mb-4 text-5xl font-semibold text-gray-500">
          Welcome Back
        </h2>
        <p className="mb-8 text-lg text-gray-500">
          Kindly fill in your details to sign in to your account
        </p>
        {error && (
          <div className="mb-4 p-3 text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={setEmail}
            required
          />
          <PasswordInput
            id="password"
            label="Password"
            placeholder="************"
            value={password}
            onChange={setPassword}
            required
            forgotPasswordLink="#"
          />
          <button
            className="p-3.5 w-full text-base font-medium bg-[#12496b] hover:bg-[#0f3a55] rounded-lg cursor-pointer border-none duration-200 text-white transition-colors"
            type="submit"
          >
            Login
          </button>

          <p className="mt-6 text-md text-center text-gray-500">
            <span>Don't have an account?</span>
            <a
              className="font-medium text-md text-blue-800 no-underline"
              href="#"
            >
              {" "}
              Register{" "}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};
