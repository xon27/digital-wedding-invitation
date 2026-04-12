import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Hostinger / root: GITHUB_REPO_BASE=/ or unset with default below. GitHub Pages: CI sets GITHUB_REPO_BASE=/repo-name/. */
const rawBase =
  process.env.GITHUB_REPO_BASE || "/digital-wedding-invitation/";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

export default defineConfig({
  base,
  plugins: [react()],
});
