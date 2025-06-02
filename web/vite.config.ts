import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  appType: "spa",
  base: "/static",
  plugins: [
    react(),
    tsconfigPaths(),
    TanStackRouterVite({
      routesDirectory: resolve(import.meta.dirname, "src/pages"),
      generatedRouteTree: resolve(import.meta.dirname, "src/router", "router.gen.ts"),
      quoteStyle: "double",
      semicolons: true,
      disableTypes: false,
      addExtensions: false,
      disableLogging: false,
      disableManifestGeneration: false,
      routeFileIgnorePattern: "components",
      indexToken: "index",
      routeToken: "route",
      enableRouteGeneration: true,
      autoCodeSplitting: true,
      routeTreeFileHeader: [
        "/* eslint-disable */",
        "// @ts-nocheck",
        "// noinspection JSUnusedGlobalSymbols",
      ],
    }),
  ],
  css: {
    transformer: "postcss",
    modules: {
      scopeBehaviour: "local",
      localsConvention: "camelCaseOnly",
      exportGlobals: true,
      hashPrefix: "vef",
    },
  },
  build: {
    assetsInlineLimit: 10240,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2048,
    minify: true,
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              name: "react",
              test: /react(?:-dom)?/,
            },
            {
              name: "vender",
            },
          ],
        },
      },
    },
  },
  server: {
    port: 3002,
    open: true,
  },
});
