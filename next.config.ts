import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/matt-lieber-is" : "",
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
