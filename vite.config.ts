import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

// Plain Vite + TanStack Start config for local development and self-hosted
// deployment. The Nitro preset auto-switches to "vercel" when building on
// Vercel's platform (detected via the VERCEL env var it sets), and falls
// back to the portable "node-server" preset everywhere else — including
// your local machine. To target a different host manually (Netlify,
// Cloudflare, etc.), see https://nitro.build/deploy for the preset list.
const nitroPreset = process.env["VERCEL"] ? "vercel" : "node-server";

export default defineConfig({
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    nitro({ preset: nitroPreset }),
    viteReact(),
  ],
});
