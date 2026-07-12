import path from "node:path";

import type { NextConfig } from "next";

import { loadRedirects } from "./lib/redirects";

const isDev = process.env.NODE_ENV === "development";
const isBuild = process.argv.includes("build");
const redirectsPath = path.join(process.cwd(), "redirects.json");

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  import("velite").then(({ build }) =>
    build({ watch: isDev, clean: !isDev }),
  );
}

const nextConfig: NextConfig = {
  async redirects() {
    return loadRedirects(redirectsPath);
  },
};

export default nextConfig;
