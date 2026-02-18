import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 🔹 Local
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads-hotel/**",
      },

      // 🔹 Produção (Railway)
      {
        protocol: "https",
        hostname: "dnchotel-production.up.railway.app",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "dnchotel-production.up.railway.app",
        pathname: "/uploads-hotel/**",
      },
    ],
  },
};

export default nextConfig;
