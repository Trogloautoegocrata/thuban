import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "api.back-bone.dev"],
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
