import path from "node:path";
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
import { loadRedirects } from "./lib/redirects";

export default async function configure(phase: string): Promise<NextConfig> {
  if (!process.env.VELITE_STARTED && [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD].includes(phase)) {
    process.env.VELITE_STARTED = "1";
    const { build } = await import("velite");
    await build({ watch: phase === PHASE_DEVELOPMENT_SERVER, clean: phase === PHASE_PRODUCTION_BUILD });
  }
  return {
    experimental: { cpus: 2 },
    async redirects() { return loadRedirects(path.join(process.cwd(), "redirects.json")); },
  };
}
