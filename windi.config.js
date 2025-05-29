import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {}, // Extend the default theme if needed
  },
  plugins: [], // Add any Windicss plugins if required
});