import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/mattlieberis" : "",
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
