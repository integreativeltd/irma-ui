"use client";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../components/Inpute/InputField";
import { PasswordInput } from "../../components/Inpute/PasswordInput";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      console.log('Starting registration...');
      const result = await register(email, password, name);
      console.log('Registration successful:', result);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed. Please try again.');
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
          Create Account
        </h2>
        <p className="mb-8 text-lg text-gray-500">
          Fill in your details to create your account
        </p>
        {error && (
          <div className="mb-4 p-3 text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} data-testid="register-form">
          <InputField
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={setName}
            required
          />
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
          />
          <button
            className="p-3.5 w-full text-base font-medium bg-[#12496b] hover:bg-[#0f3a55] rounded-lg cursor-pointer border-none duration-200 text-white transition-colors"
            type="submit"
          >
            Register
          </button>

          <p className="mt-6 text-md text-center text-gray-500">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-md text-blue-800 no-underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};