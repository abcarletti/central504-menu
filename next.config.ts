import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  // Solo usar output standalone en producción
  ...(process.env.NODE_ENV === "production" && { output: "standalone" }),
};

export default nextConfig;
