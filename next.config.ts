import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
export const basePath = isProd ? "/mattlieberis" : "";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: basePath,
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
  },
};

console.log("NEXT CONFIG: ", nextConfig);
export default nextConfig;
