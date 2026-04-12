import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Hostinger / root: unset → "/". GitHub Pages: GITHUB_REPO_BASE=/repo-name/ in CI. */
const rawBase = process.env.GITHUB_REPO_BASE || "/";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

export default defineConfig({
  base: "/wd-invi/",
  plugins: [react()],
});
