import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.back-bone.dev" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/backbone/:path*",
        destination: "https://api.back-bone.dev/v1/:path*",
      },
    ];
  },
};

export default nextConfig;