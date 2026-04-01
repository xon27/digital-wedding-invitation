import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Hostinger / custom domain at root: leave unset → base "/"
 * GitHub Pages project site: set GITHUB_REPO_BASE=/your-repo-name/ when building (see .github/workflows)
 */
const rawBase = process.env.GITHUB_REPO_BASE || "/";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

export default defineConfig({
  plugins: [react()],
  base,
});
