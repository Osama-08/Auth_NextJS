import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optional — use only if you want to skip TS errors too
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
