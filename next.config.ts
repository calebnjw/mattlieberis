import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";
const isProd = true;

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/mattlieberis" : "",
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
  },
};

console.log("NEXT CONFIG: ", nextConfig);
export default nextConfig;
