// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
