# React + Vite
irma-admin-portal/
├── public/
│   └── index.html
├── src/
│
├── assets/                      # Images, logos, fonts
│
├── components/                 # Reusable UI components
│   ├── Button/
│   ├── Modal/
│   └── Table/
│
├── layouts/                    # Layouts for routes
│   ├── MainLayout.tsx         # Sidebar, header, footer
│   └── AuthLayout.tsx
│
├── pages/                      # Top-level route views
│   ├── Dashboard/
│   ├── Tenants/
│   ├── Taxpayers/
│   ├── Payments/
│   ├── Reports/
│   ├── Settings/
│   └── Login/
│
├── features/                   # Business logic modules
│   ├── taxpayers/
│   │   ├── api.ts              # Axios calls
│   │   ├── slice.ts            # Redux slice or Zustand store
│   │   └── hooks.ts
│   ├── payments/
│   ├── revenue/
│   └── users/
│
├── services/                   # Global services (e.g. auth, tenant resolver)
│   ├── api.ts
│   ├── authService.ts
│   └── notificationService.ts
│
├── routes/                     # React Router route definitions
│   └── index.tsx
│
├── utils/                      # Helper functions and formatters
│   ├── dateUtils.ts
│   ├── currencyFormatter.ts
│   └── tenantResolver.ts
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   └── useTenant.ts
│
├── context/                    # React context providers
│   ├── AuthContext.tsx
│   └── TenantContext.tsx
│
├── themes/                     # Styling themes per tenant
│   ├── firsTheme.ts
│   └── lagosTheme.ts
│
├── types/                      # TypeScript types and interfaces
│   └── index.d.ts
│
├── App.tsx                     # App entry point
├── index.tsx                   # ReactDOM entry
└── vite.config.ts / webpack.config.js

